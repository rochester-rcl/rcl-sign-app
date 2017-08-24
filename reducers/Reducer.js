/* @flow */

const defaultState: Object = {

  definitions: [],
  language: 'en', // defaults to English, for now
   /* an array of uuids that gets flushed every time we change a letter. Each uuid
   corresponds to a range in the current range, stored in AsyncStorage. The saga
   checks AsyncStorage storage for the definitions before it sends a request */
  definitionsCache: {},
  fetchingDefinitions: false,
  videoModal: {
    en: {
      url: null,
      title: null,
    },
    fr: {
      url: null,
      title: null,
    },
    display: false
  },
  videoLoaded: false,
  searchResults: false
}

/*
* Our application's reducer function that handles all the state changes.
* Must return a copy of the state that has the new mutations - we shouldn't
* mutate the state in place.
* @param {Object} state - our application's state tree
* @ return {Object} the updated copy of our application's state
*/
export default function lsfReducer(state: Object = defaultState, action: Object): Object {
  switch (action.type) {
    case 'DEFINITIONS_LOADED':
      let results = action.results;
      let definitions = results.definitions;
      let cacheInfo = results.cacheInfo ? results.cacheInfo : state.definitionsCache;
      if (!definitions) {
        definitions = ['No definitions found',];
      }
      return {
        ...state,
        definitions: definitions,
        definitionsCache: {...state.definitionsCache, ...cacheInfo}
      }

    case 'DEFINITIONS_CACHE_CLEARED':
      return {
        ...state,
        definitionsCache: {},
      }

    case 'FETCHING_DEFINITIONS':
      return {
        ...state,
        fetchingDefinitions: action.fetchingDefinitions,
      }

    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.language,
      }

    case 'TOGGLE_VIDEO_MODAL':
      return {
        ...state,
        videoModal: action.videoModal,
      }

    case 'TOGGLE_SEARCH_RESULT_DISPLAY':
      return {
        ...state,
        searchResults: action.toggle,
      }

    case 'LAYOUT_CHANGED':
      return {
        ...state,
        layoutAspect: action.layoutAspect,
      }

    default:
      return state;
  }
}
