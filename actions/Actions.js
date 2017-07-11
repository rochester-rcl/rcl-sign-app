/* @flow */

// Constants for our actions
export const LOAD_DEFINITIONS = 'LOAD_DEFINITIONS';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const LOAD_DEFINITIONS_FROM_CACHE = 'LOAD_DEFINITIONS_FROM_CACHE';
export const FLUSH_DEFINITIONS_CACHE = 'FLUSH_DEFINITIONS_CACHE';

/*
* Pure function used to dispatch an API call for definitions
* @param {Object} [definitionQuery={language: 'en', letter: 'a', range:'a-g'}]
* @ return {Object}
*/
export function loadDefinitionsAction(definitionQuery: Object): Object {
  return {
    type: LOAD_DEFINITIONS,
    definitionQuery: definitionQuery,
  }
}

export function loadDefinitionsFromCacheAction(uuid: string): Object {
  return {
    type: LOAD_DEFINITIONS_FROM_CACHE,
    uuid: uuid,
  }
}

export function flushDefinitionsCacheAction(callbackAction: Object): Object {
  return {
    type: FLUSH_DEFINITIONS_CACHE,
    callbackAction: callbackAction,
  }
}

/*
* Pure function used to dispatch an action to change the current language set in the application state
* @param {String} language='en'
* @return {Object}
*/
export function setAppLanguageAction(language: string): Object {
  return {
    type: SET_LANGUAGE,
    language: language,
  }
}
