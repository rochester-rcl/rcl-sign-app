/* @flow */

// Fetch
import {fetchDefinitions, searchDefinitions} from './LSFetch';

// Redux Saga
import {put, takeEvery, all, fork} from 'redux-saga/effects';

// AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

// keys
import {STORAGE_DEFINITIONS_KEY, definitionKeys} from '../utils/Constants';

// Other sagas
import OfflineDownloadSaga from './OfflineDownloadSaga';

/*
 * Generator function used to yield a saga that retrieves a set of definitions from the API
 * @param {Object} [loadDefinitionsAction = {type: LOAD_DEFINITIONS, definitionQuery: {language: 'en', letter: 'a', range:'a-g'}]
 *
 */
export function* loadDefinitionsSaga(loadDefinitionsAction) {
  const {language, letter, range} = loadDefinitionsAction.definitionQuery;
  try {
    yield put({type: 'FETCHING_DEFINITIONS', fetchingDefinitions: true});
    let definitionResults = yield fetchDefinitions(language, letter, range);
    let results = {};
    results.searchResults = false;
    if (!definitionResults.hasOwnProperty('message')) {
      results.cacheInfo = {};
      const id = `${STORAGE_DEFINITIONS_KEY}-${language}-${letter}-${range}`;
      results.cacheInfo[range] = id;
      AsyncStorage.setItem(id, JSON.stringify(definitionResults));
    } else {
      definitionResults.error = true;
    }
    results.definitions = definitionResults;
    yield put({type: 'DEFINITIONS_LOADED', results: results});
    yield put({type: 'FETCHING_DEFINITIONS', fetchingDefinitions: false});
  } catch (error) {
    console.log(error);
  }
}

export function* searchDefinitionsSaga(searchDefinitionsAction) {
  let {language, term} = searchDefinitionsAction;
  try {
    let results = {};
    yield put({type: 'FETCHING_DEFINITIONS', fetchingDefinitions: true});
    let definitions = yield searchDefinitions(language, term);
    if (definitions.hasOwnProperty('message')) {
      definitions.error = true;
    }
    results.definitions = definitions;
    yield put({type: 'DEFINITIONS_LOADED', results: results});
    yield put({type: 'TOGGLE_SEARCH_RESULT_DISPLAY', toggle: true});
    yield put({type: 'FETCHING_DEFINITIONS', fetchingDefinitions: false});
  } catch (error) {
    console.log(error);
  }
}

export function* loadDefinitionsFromCacheSaga(action) {
  try {
    const cachedDefinitionResults = yield AsyncStorage.getItem(action.id);
    let results = {};
    results.cacheInfo = {};
    results.definitions = JSON.parse(cachedDefinitionResults);
    yield put({type: 'DEFINITIONS_LOADED', results: results});
  } catch (error) {
    console.log(error);
  }
}

export function* flushDefinitionsCacheSaga(action) {
  // DO WE EVEN USE THIS?
  try {
    const cacheCleared = yield AsyncStorage.multiRemove(definitionKeys()).then(
      errors => {
        if (!errors) {
          return true;
        } else {
          return false;
        }
      },
    );
    if (cacheCleared) {
      yield put({type: 'DEFINITIONS_CACHE_CLEARED'});
      yield put(action.callbackAction);
    }
  } catch (error) {
    console.log(error);
  }
}

/*
 * Generator function used to listen for all LOAD_DEFINITIONS dispatches and route them to loadDefinitionsSaga
 *
 */
export function* watchForLoadDefinitions() {
  yield takeEvery('LOAD_DEFINITIONS', loadDefinitionsSaga);
}

/*
 * Generator function used to listen for all LOAD_DEFINITIONS_FROM_CACHE dispatches and route them to loadDefinitionsSaga
 *
 */
export function* watchForLoadDefinitionsFromCache() {
  yield takeEvery('LOAD_DEFINITIONS_FROM_CACHE', loadDefinitionsFromCacheSaga);
}

/*
 * Generator function used to listen for all FLUSH_DEFINITIONS_CACHE dispatches and route them to loadDefinitionsSaga
 *
 */
export function* watchForFlushDefinitionsCache() {
  yield takeEvery('FLUSH_DEFINITIONS_CACHE', flushDefinitionsCacheSaga);
}

export function* watchForSearchDefinitions() {
  yield takeEvery('SEARCH_DEFINITIONS', searchDefinitionsSaga);
}

/*
 * Generator function that initializes all of our 'watch' sagas
 *
 */
export default function* rootSaga() {
  yield all([
    watchForLoadDefinitions(),
    watchForLoadDefinitionsFromCache(),
    watchForFlushDefinitionsCache(),
    watchForSearchDefinitions(),
    fork(OfflineDownloadSaga),
  ]);
}
