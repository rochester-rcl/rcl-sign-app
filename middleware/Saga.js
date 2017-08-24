/* @flow */

// Fetch
import { fetchDefinitions, searchDefinitions } from './LSFetch';

// Redux Saga
import { put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

// AsyncStorage
import { AsyncStorage } from 'react-native';

// uuid
const uuidv4 = require('uuid/v4');

/*
* Generator function used to yield a saga that retrieves a set of definitions from the API
* @param {Object} [loadDefinitionsAction = {type: LOAD_DEFINITIONS, definitionQuery: {language: 'en', letter: 'a', range:'a-g'}]
*
*/
export function* loadDefinitionsSaga(loadDefinitionsAction: Object): Generator<Promise<Object>, any, any> {
  const { language, letter, range } = loadDefinitionsAction.definitionQuery;
  try {
    yield put({ type: 'FETCHING_DEFINITIONS', fetchingDefinitions: true });
    let definitionResults = yield fetchDefinitions(language, letter, range);
    let results = {};
    results.searchResults = false;
    if (!definitionResults.hasOwnProperty('message')) {
      let uuid = uuidv4();
      results.cacheInfo = {};
      results.cacheInfo[range] = uuid;
      AsyncStorage.setItem(uuid, JSON.stringify(definitionResults));
    } else {
      definitionResults.error = true;
    }
    results.definitions = definitionResults;
    yield put({ type: 'DEFINITIONS_LOADED', results: results });
    yield put({ type: 'FETCHING_DEFINITIONS', fetchingDefinitions: false });
  } catch (error) {
    console.log(error);
  }
}

export function* searchDefinitionsSaga(searchDefinitionsAction: Object): Generator<Promise<Object>, any, any> {
  let { language, term } = searchDefinitionsAction;
  try {
    let results = {};
    yield put({ type: 'FETCHING_DEFINITIONS', fetchingDefinitions: true });
    results.definitions = yield searchDefinitions(language, term);
    yield put({ type: 'DEFINITIONS_LOADED', results: results });
    yield put({ type: 'TOGGLE_SEARCH_RESULT_DISPLAY', toggle: true });
    yield put({ type: 'FETCHING_DEFINITIONS', fetchingDefinitions: false });
  } catch(error) {
    console.log(error);
  }
}

export function* loadDefinitionsFromCacheSaga(action: Object): Generator<Promise<Object>, any, any> {
  try {
    const cachedDefinitionResults = yield AsyncStorage.getItem(action.uuid);
    let results = {};
    results.cacheInfo = {};
    results.definitions = JSON.parse(cachedDefinitionResults);
    yield put({ type: 'DEFINITIONS_LOADED', results: results });
  } catch(error) {
    console.log(error);
  }
}

export function* flushDefinitionsCacheSaga(action: Object): Generator<Promise<Object>, any, any> {
  try {
    const cacheCleared = yield AsyncStorage.getAllKeys().then((keys) => {
          if (keys) {
            return AsyncStorage.multiRemove(keys).then((errors) => {
              if (!errors) {
                return true;
              } else {
                return false;
              }
            });
          } else {
            return false;
          }
      });
    if (cacheCleared) {
      yield put({ type: 'DEFINITIONS_CACHE_CLEARED' });
      yield put(action.callbackAction);
    }
  } catch(error) {
    console.log(error);
  }
}

/*
* Generator function used to listen for all LOAD_DEFINITIONS dispatches and route them to loadDefinitionsSaga
*
*/
export function* watchForLoadDefinitions(): Generator<any, any, any> {
  yield takeEvery('LOAD_DEFINITIONS', loadDefinitionsSaga);
}

/*
* Generator function used to listen for all LOAD_DEFINITIONS_FROM_CACHE dispatches and route them to loadDefinitionsSaga
*
*/
export function* watchForLoadDefinitionsFromCache(): Generator<any, any, any> {
  yield takeEvery('LOAD_DEFINITIONS_FROM_CACHE', loadDefinitionsFromCacheSaga);
}

/*
* Generator function used to listen for all FLUSH_DEFINITIONS_CACHE dispatches and route them to loadDefinitionsSaga
*
*/
export function* watchForFlushDefinitionsCache(): Generator<any, any, any> {
  yield takeEvery('FLUSH_DEFINITIONS_CACHE', flushDefinitionsCacheSaga);
}

export function* watchForSearchDefinitions(): Generator<any, any, any> {
  yield takeEvery('SEARCH_DEFINITIONS', searchDefinitionsSaga);
}

/*
* Generator function that initializes all of our 'watch' sagas
*
*/
export default function* rootSaga(): Generator<any, any, any> {
  yield [
    watchForLoadDefinitions(),
    watchForLoadDefinitionsFromCache(),
    watchForFlushDefinitionsCache(),
    watchForSearchDefinitions(),
  ];
}
