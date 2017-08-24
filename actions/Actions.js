/* @flow */

/*
  TODO
  1) implement search action
  2) convert all instances of action types to constants
*/

// Constants for our actions
export const LOAD_DEFINITIONS = 'LOAD_DEFINITIONS';
export const SEARCH_DEFINITIONS = 'SEARCH_DEFINITIONS';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const LOAD_DEFINITIONS_FROM_CACHE = 'LOAD_DEFINITIONS_FROM_CACHE';
export const FLUSH_DEFINITIONS_CACHE = 'FLUSH_DEFINITIONS_CACHE';
export const TOGGLE_VIDEO_MODAL = 'TOGGLE_VIDEO_MODAL';
export const TOGGLE_SEARCH_RESULT_DISPLAY = 'TOGGLE_SEARCH_RESULT_DISPLAY';
export const LAYOUT_CHANGED = 'LAYOUT_CHANGED';


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

export function searchDefinitionsAction(language: string, term: string): Object {
  return {
    type: SEARCH_DEFINITIONS,
    language: language,
    term: term,
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

export function toggleVideoModalAction(videos: Object, display: boolean): Object {
  return {
    type: TOGGLE_VIDEO_MODAL,
    videoModal: {
      en: videos.en,
      fr: videos.fr,
      display: display,
    }
  }
}

export function updateLayoutAspectAction(layoutAspect: string): Object {
  return {
    type: LAYOUT_CHANGED,
    layoutAspect: layoutAspect,
  }
}

export function toggleSearchResultsDisplay(toggle: boolean): Object {
  return {
    type: TOGGLE_SEARCH_RESULT_DISPLAY,
    toggle: toggle,
  }
}
