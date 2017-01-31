/* @flow */

// Constants for our actions
export const LOAD_DEFINITIONS = 'LOAD_DEFINITIONS';
export const SET_LANGUAGE = 'SET_LANGUAGE';

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
