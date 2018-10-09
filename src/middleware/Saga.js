/* @flow */

// Fetch
import { fetchDefinitions, searchDefinitions, fetchEtymology, searchEtymology, fetchNav } from "./LSFetch";

// Redux Saga
import { put } from "redux-saga/effects";

import { takeEvery } from "redux-saga/effects";

// constants
import {
  LOAD_DEFINITIONS,
  LOAD_ETYMOLOGY,
  ETYMOLOGY_LOADED,
  LOAD_NAV,
  FETCHING,
  SEARCH_DEFINITIONS,
  SEARCH_ETYMOLOGY,
  NAV_LOADED
} from "../actions/Actions";

// Probably don't need caching but we'll see

// AsyncStorage
//import { AsyncStorage } from 'react-native';

// uuid
const uuidv4 = require("uuid/v4");

export function* loadNavSaga(
  loadNavigationAction: Object
): Generator<Promise<Object>, any, any> {
  try {
    const engNav = yield fetchNav("en");
    const frNav = yield fetchNav("fr");
    yield put({ type: NAV_LOADED, nav: { en: engNav, fr: frNav } });
  } catch (error) {
    console.log(error);
  }
}

/*
 * Generator function used to yield a saga that retrieves a set of definitions from the API
 * @param {Object} [loadDefinitionsAction = {type: LOAD_DEFINITIONS, definitionQuery: {language: 'en', letter: 'a', range:'a-g'}]
 *
 */
export function* loadDefinitionsSaga(
  loadDefinitionsAction: Object
): Generator<Promise<Object>, any, any> {
  const { language, letter, range } = loadDefinitionsAction.definitionQuery;
  try {
    yield put({
      type: "FETCHING",
      fetching: true
    });
    let definitionResults = yield fetchDefinitions(language, letter, range);
    let results = {};
    results.searchResults = false;
    if (!definitionResults.hasOwnProperty("message")) {
      let uuid = uuidv4();
      results.cacheInfo = {};
      results.cacheInfo[range] = uuid;
      localStorage.setItem(uuid, JSON.stringify(definitionResults));
    } else {
      definitionResults.error = true;
    }
    results.definitions = definitionResults;
    yield put({
      type: "DEFINITIONS_LOADED",
      results: results
    });
    yield put({
      type: "FETCHING",
      fetching: false
    });
  } catch (error) {
    console.log(error);
  }
}

export function* loadEtymologySaga(loadEtymologyAction: Object) {
  try {
    const { language, letter } = loadEtymologyAction.etymologyQuery
    yield put({ type: FETCHING, fetching: true });
    const etymo = yield fetchEtymology(language, letter);
    if (etymo.hasOwnProperty('message')) etymo.error = true;
    yield put({ type: ETYMOLOGY_LOADED, etymology: etymo })
    yield put({ type: FETCHING, fetching: false });
  } catch(error) {
    console.log(error);
  }
}

export function* searchEtymologySaga(searchEtymologyAction: Object): Generator <any, any, any> {
  try {
    const { language, term } = searchEtymologyAction;
    yield put({ type: FETCHING, fetching: true });
    const etymo = yield searchEtymology(language, term);
    if (etymo.hasOwnProperty('message')) etymo.error = true;
    yield put({ type: ETYMOLOGY_LOADED, etymology: etymo });
    yield put({ type: FETCHING, fetching: false });
  } catch(error) {
    console.log(error);
  }
}

export function* searchDefinitionsSaga(
  searchDefinitionsAction: Object
): Generator<Promise<Object>, any, any> {
  let { language, term } = searchDefinitionsAction;
  try {
    let results = {};
    yield put({
      type: "FETCHING",
      fetching: true
    });
    let definitions = yield searchDefinitions(language, term);
    if (definitions.hasOwnProperty("message")) {
      definitions.error = true;
    }
    results.definitions = definitions;
    yield put({
      type: "DEFINITIONS_LOADED",
      results: results
    });
    yield put({
      type: "TOGGLE_SEARCH_RESULT_DISPLAY",
      toggle: true
    });
    yield put({
      type: "FETCHING",
      fetching: false
    });
  } catch (error) {
    console.log(error);
  }
}

export function* loadDefinitionsFromCacheSaga(
  action: Object
): Generator<Promise<Object>, any, any> {
  try {
    const cachedDefinitionResults = yield localStorage.getItem(action.uuid);
    let results = {};
    results.cacheInfo = {};
    results.definitions = JSON.parse(cachedDefinitionResults);
    yield put({
      type: "DEFINITIONS_LOADED",
      results: results
    });
  } catch (error) {
    console.log(error);
  }
}

export function* flushDefinitionsCacheSaga(
  action: Object
): Generator<Promise<Object>, any, any> {
  try {
    const cacheCleared = yield localStorage.getAllKeys().then(keys => {
      if (keys) {
        return localStorage.multiRemove(keys).then(errors => {
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
      yield put({
        type: "DEFINITIONS_CACHE_CLEARED"
      });
      yield put(action.callbackAction);
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchForLoadNav(): Generator<any, any, any> {
  yield takeEvery(LOAD_NAV, loadNavSaga);
}

/*
 * Generator function used to listen for all LOAD_DEFINITIONS dispatches and route them to loadDefinitionsSaga
 *
 */
export function* watchForLoadDefinitions(): Generator<any, any, any> {
  yield takeEvery("LOAD_DEFINITIONS", loadDefinitionsSaga);
}

export function* watchForLoadEtymology(): Generator<any, any, any> {
  yield takeEvery(LOAD_ETYMOLOGY, loadEtymologySaga);
}

/*
 * Generator function used to listen for all LOAD_DEFINITIONS_FROM_CACHE dispatches and route them to loadDefinitionsSaga
 *
 */
export function* watchForLoadDefinitionsFromCache(): Generator<any, any, any> {
  yield takeEvery("LOAD_DEFINITIONS_FROM_CACHE", loadDefinitionsFromCacheSaga);
}

/*
 * Generator function used to listen for all FLUSH_DEFINITIONS_CACHE dispatches and route them to loadDefinitionsSaga
 *
 */
export function* watchForFlushDefinitionsCache(): Generator<any, any, any> {
  yield takeEvery("FLUSH_DEFINITIONS_CACHE", flushDefinitionsCacheSaga);
}

export function* watchForSearchDefinitions(): Generator<any, any, any> {
  yield takeEvery("SEARCH_DEFINITIONS", searchDefinitionsSaga);
}

export function* watchForSearchEtymology(): Generator<any, any, any> {
  yield takeEvery(SEARCH_ETYMOLOGY, searchEtymologySaga);
}
/*
 * Generator function that initializes all of our 'watch' sagas
 *
 */
export default function* rootSaga(): Generator<any, any, any> {
  yield [
    watchForLoadNav(),
    watchForLoadDefinitions(),
    watchForLoadEtymology(),
    watchForLoadDefinitionsFromCache(),
    watchForFlushDefinitionsCache(),
    watchForSearchDefinitions(),
    watchForSearchEtymology(),
  ];
}
