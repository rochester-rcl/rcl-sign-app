/* @flow */

// Fetch
import { fetchDefinitions } from './LSFetch';

// Redux Saga
import { put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';

/*
* Generator function used to yield a saga that retrieves a set of definitions from the API
* @param {Object} [loadDefinitionsAction = {type: LOAD_DEFINITIONS, definitionQuery: {language: 'en', letter: 'a', range:'a-g'}]
*
*/
export function* loadDefinitionsSaga(loadDefinitionsAction: Object): Generator<Promise<Object>, any, any> {
  const { language, letter, range } = loadDefinitionsAction.definitionQuery;
  try {
    const definitionResults: Object = yield fetchDefinitions(language, letter, range);
    yield put({ type: 'DEFINITIONS_LOADED', definitions: definitionResults});
  } catch (error) {
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
* Generator function that initializes all of our 'watch' sagas
*
*/
export default function* rootSaga(): Generator<any, any, any> {
  yield [
    watchForLoadDefinitions(),
  ];
}
