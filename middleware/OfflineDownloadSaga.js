// Redux Saga
import {
  put,
  all,
  takeEvery,
  call,
  fork,
  take,
  select,
} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';

// AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

// NetInfo
import NetInfo from '@react-native-community/netinfo';

// FS
import RNFS from 'react-native-fs';

// Utils
import {takeLeading} from './Saga';
import lodash from 'lodash';

// Actions
import {
  ONLINE_STATUS_UPDATED,
  SUBSCRIBE_ONLINE_STATUS_LISTENER,
  DOWNLOAD_FILE,
  FILE_DOWNLOAD_PENDING,
  FILE_DOWNLOADED,
  ALL_DOWNLOADS_COMPLETE,
  FILE_DOWNLOAD_ERROR,
  OFFLINE_DOWNLOADS_MAP_LOADED,
  CACHE_UPDATED,
  CACHE_READ,
  READ_CACHE,
  QUERY_OFFLINE_DEFINITIONS,
  OFFLINE_DEFINITIONS_QUERIED,
} from '../actions/DownloadActions';

import {STORAGE_DOWNLOADS_KEY} from '../utils/Constants';

// Loads all definitions from cache
export function* loadOfflineDefinitionsFromCache(action) {
  try {
    const definitions = yield getCachedDefinitions();
    yield put({type: CACHE_READ, definitions: definitions});
    if (definitions) {
      const downloadsMap = definitions.reduce((a, b) => {
        a[b.en.definitionId] = FILE_DOWNLOADED;
        return a;
      }, {});
      yield put({
        type: OFFLINE_DOWNLOADS_MAP_LOADED,
        offlineDownloadsMap: downloadsMap,
      });
      const { definitionQuery } = action;
      if (definitionQuery) {
        yield queryOfflineDefinitions(action);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

function definitionsSelector(definitions, query) {
  // TODO need to load based on language - i.e. cant filter
  // english definition with letter "a" and french language with letter "a"
  const {language, letter, range} = query;
  const errorMessage = {
    error: true,
    message: `No offline definitions saved for letter ${letter} with range ${range}`,
  };
  if (definitions) {
    const filtered = definitions.filter(definition => {
      const d = definition[language];
      const dLetter = d.letter.toLowerCase();
      const dRange = d.letterRange.toLowerCase().replace('to', '-');
      if (dLetter === letter && dRange === range) return true;
      return false;
    });
    if (filtered.length > 0) return filtered;
  }
  return errorMessage;
}

export function* queryOfflineDefinitions(action) {
  yield put({type: 'FETCHING_DEFINITIONS', fetchingDefinitions: true});
  const {definitionQuery} = action;
  const selector = state => {
    return definitionsSelector(
      state.offlineModeState.definitions,
      definitionQuery,
    );
  };
  
  const results = yield select(selector);
  yield put({type: 'FETCHING_DEFINITIONS', fetchingDefinitions: false});
  yield put({type: OFFLINE_DEFINITIONS_QUERIED, definitions: results});
}

function createNetInfoProgressChannel() {
  return eventChannel(emit => {
    const unsubscribe = NetInfo.addEventListener(state => {
      emit({type: ONLINE_STATUS_UPDATED, status: state.isInternetReachable});
    });
    return unsubscribe;
  });
}

function getExt(url) {
  const filename = url.split('/').pop();
  return filename.split('.')[1];
}

function downloadDefinition(definition, emit) {
  const {en, fr} = definition;
  // THE ID IS en.definitionId
  const {definitionId} = en;

  const doDownload = (term, key) => {
    const {videoUrl, language} = term;
    const ext = getExt(videoUrl);
    const filePath = `${RNFS.DocumentDirectoryPath}/${language}-${definitionId}.${ext}`;
    const begin = downloadResult => {
      emit({
        type: FILE_DOWNLOAD_PENDING,
        jobId: downloadResult.jobId,
        id: definitionId,
      });
    };
    const handleResult = downloadResult => {
      const {statusCode} = downloadResult;
      let status = true;
      if (statusCode >= 200 && statusCode < 300) {
        emit({
          type: FILE_DOWNLOADED,
          language: language,
        });
      } else {
        status = false;
        emit({
          type: FILE_DOWNLOAD_ERROR,
          language: language,
        });
      }
      return Promise.resolve({
        status: status,
        id: definitionId,
        language: language,
        videoUrl: `file://${filePath}`,
        key: key,
      });
    };
    const downloadOptions = {
      fromUrl: videoUrl,
      toFile: filePath,
      begin: begin,
    };
    const {promise} = RNFS.downloadFile(downloadOptions);
    return promise.then(handleResult);
  };

  const reduceDownload = values => {
    const obj = values.reduce(
      (a, b) => {
        const {key, status, ...rest} = b;
        a[key] = rest;
        if (a.status !== status) {
          a.status = status;
        }
        return a;
      },
      {status: false},
    );
    return obj;
  };
  return Promise.all([doDownload(en, 'en'), doDownload(fr, 'fr')]).then(
    reduceDownload,
  );
}

function createDownloadProgressChannel(definition) {
  const channel = eventChannel(emit => {
    downloadDefinition(definition, emit)
      .then(downloadInfo => {
        const {status, ...rest} = downloadInfo;
        if (status) {
          emit({
            type: ALL_DOWNLOADS_COMPLETE,
            id: rest.en.id,
            info: rest,
          });
        } else {
          // some failure state that gets emitted
        }
        emit(END);
      })
      .catch(error => console.error(error));
    return () => {
      console.log('unsubscribed from download channel');
    };
  });
  return channel;
}

function* getCachedDefinitions() {
  const cached = yield AsyncStorage.getItem(STORAGE_DOWNLOADS_KEY);
  if (cached) {
    const data = JSON.parse(cached);
    return data;
  }
  return null;
}

function* setCachedDefinitions(definitions) {
  let status, saved;
  try {
    yield AsyncStorage.setItem(
      STORAGE_DOWNLOADS_KEY,
      JSON.stringify(definitions),
    );
    status = true;
    saved = definitions;
  } catch (error) {
    status = false;
    saved = null;
  }
  return {status: status, definitions: saved};
}

function* updateCachedDefinitions(id, definition, prevDefinitions = null) {
  const toUpdate = prevDefinitions
    ? prevDefinitions
    : yield getCachedDefinitions();
  const index = yield findCachedDefinitionIndex(id, toUpdate);
  if (index > -1) {
    toUpdate[index] = definition;
  } else {
    toUpdate.push(definition);
  }
  return yield setCachedDefinitions(toUpdate);
}

function* findCachedDefinitionIndex(id, prevDefinitions = null) {
  const definitions = prevDefinitions
    ? prevDefinitions
    : yield getCachedDefinitions();
  return definitions.findIndex(definition => definition.en.definitionId === id);
}

function* downloadDefinitionSaga(action) {
  const {definition} = action;
  const channel = createDownloadProgressChannel(definition);
  while (true) {
    const downloadStatus = yield take(channel);
    yield put(downloadStatus);
    const {type, info, id} = downloadStatus;
    if (type === ALL_DOWNLOADS_COMPLETE) {
      yield put({type: type, id: id});
      const merged = lodash.merge(definition, info);
      // cache the newly downloaded definition
      const cached = yield getCachedDefinitions();
      let status, definitions;
      if (cached) {
        ({status, definitions} = yield updateCachedDefinitions(
          id,
          merged,
          cached,
        ));
      } else {
        ({status, definitions} = yield setCachedDefinitions([merged]));
      }
      if (status) {
        yield put({type: CACHE_UPDATED, definitions: definitions});
      }
    }
  }
}

function* listenForOnlineStatus() {
  const channel = yield createNetInfoProgressChannel();
  while (true) {
    const status = yield take(channel);
    yield put(status);
  }
}

function* watchForDownloadDefinition() {
  yield takeEvery(DOWNLOAD_FILE, downloadDefinitionSaga);
}

function* watchForOnlineStatuSubscription() {
  yield takeLeading(SUBSCRIBE_ONLINE_STATUS_LISTENER, listenForOnlineStatus);
}

function* watchForLoadOfflineDefinitionsFromCache() {
  yield takeEvery(READ_CACHE, loadOfflineDefinitionsFromCache);
}

function* watchForQueryOfflineDefinitions() {
  yield takeEvery(QUERY_OFFLINE_DEFINITIONS, queryOfflineDefinitions);
}

export default function* offlineDownloadSaga() {
  yield all([
    watchForOnlineStatuSubscription(),
    watchForDownloadDefinition(),
    watchForLoadOfflineDefinitionsFromCache(),
    watchForQueryOfflineDefinitions(),
  ]);
}
