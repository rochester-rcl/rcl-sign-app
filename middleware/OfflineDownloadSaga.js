// Redux Saga
import {put, all, takeEvery, call, fork, take} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';

// AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

// NetInfo
import NetInfo from '@react-native-community/netinfo';

// FS
import RNFS, {downloadFile} from 'react-native-fs';

// Utils
import {takeLeading} from './Saga';

// Actions
import {
  ONLINE_STATUS_UPDATED,
  SUBSCRIBE_ONLINE_STATUS_LISTENER,
  DOWNLOAD_FILE,
  FILE_DOWNLOAD_PENDING,
  FILE_DOWNLOADED,
  ALL_DOWNLOADS_COMPLETE,
  FILE_DOWNLOAD_ERROR,
} from '../actions/DownloadActions';

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
  // THE ID IS THE ENGLISH ONE
  const {definitionId} = en;

  const doDownload = term => {
    const {videoUrl, language} = term;
    const ext = getExt(videoUrl);
    const filePath = `${RNFS.CachesDirectoryPath}/${language}-${definitionId}.${ext}`;
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
        path: filePath,
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
  return Promise.all([doDownload(en), doDownload(fr)]);
}

function createDownloadProgressChannel(definition) {
  const channel = eventChannel(emit => {
    downloadDefinition(definition, emit)
      .then(values => {
        const success = values.every(info => info.status === true);
        const {id} = values[0];
        if (success) {
          emit({
            type: ALL_DOWNLOADS_COMPLETE,
            id: id,
            fileData: values
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

function* downloadDefinitionSaga(action) {
  const {definition} = action;
  const channel = createDownloadProgressChannel(definition);
  while (true) {
    const downloadStatus = yield take(channel);
    yield put(downloadStatus);
    if (downloadStatus.type === ALL_DOWNLOADS_COMPLETE) {
      console.log(downloadStatus.fileData);
      const cloned = {...definition};
      console.log(cloned);
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

export default function* offlineDownloadSaga() {
  yield all([watchForOnlineStatuSubscription(), watchForDownloadDefinition()]);
}
