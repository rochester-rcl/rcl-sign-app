/* @flow */

import * as Actions from '../actions/Actions';

// constants
import { A_TO_G } from '../utils/Constants';

const defaultState: Object = {
  nav: null,
  definitions: [],
  etymology: [],
  language: null, // defaults to English, for now
   /* an array of uuids that gets flushed every time we change a letter. Each uuid
   corresponds to a range in the current range, stored in AsyncStorage. The saga
   checks AsyncStorage storage for the definitions before it sends a request */
  definitionsCache: {},
  fetching: false,
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
  etymoModal: {
    engEtymology: null,
    frEtymology: null,
    display: false
  },
  videoLoaded: false,
  searchResults: false,
  introText: {
    en: {
      intro: "Thank you for choosing the LSF-ASL dictionary app developed at the University of Rochester, NY USA",
      instructions: [
        "Choose your search language by clicking on one of the flags.",
        "Click on a letter to see a listing of entries alphabetically.",
        "Use the search box to search for a specific term.",
      ],
      contact: {
        message: "You will see videos of both the LSF and ASL sign for the entry you choose.",
        link: {
          message: "To contact us, please tap ",
          address: "lsfaslrochester@gmail.com",
        }
      },
    },

    fr: {
      intro: "Je vous remercie d’avoir choisi l’app dictionnaire de LSF-ASL développé à l’Université de Rochester, NY USA.",
      instructions: [
        "Choisissez votre langue de recherche en cliquant sur un des drapeaux.",
        "Cliquez sur une lettre pour voir une liste d’entrées par ordre alphabétique.",
        "Utiliser la zone de recherche pour rechercher un terme spécifique.",
      ],
      contact: {
        message: "Vous pourrez voir des vidéos pour le signe LSF et ASL que vous choisissez.",
        link: {
          message: "Pour nous contacter, veuillez cliquer sur ",
          address: "lsfaslrochester@gmail.com",
        }
      },
    },
  }
}

// TODO replace all action creators with constants

/*
* Our application's reducer function that handles all the state changes.
* Must return a copy of the state that has the new mutations - we shouldn't
* mutate the state in place.
* @param {Object} state - our application's state tree
* @ return {Object} the updated copy of our application's state
*/
export default function lsfReducer(state: Object = defaultState, action: Object): Object {
  switch (action.type) {

    case Actions.NAV_LOADED:
      return {
        ...state,
        nav: action.nav
      }

    case Actions.DEFINITIONS_LOADED:
      let results = action.results;
      let definitions = results.definitions;
      let cacheInfo = results.cacheInfo ? results.cacheInfo : state.definitionsCache;
      return {
        ...state,
        definitions: definitions,
        definitionsCache: {...state.definitionsCache, ...cacheInfo}
      }

    case Actions.ETYMOLOGY_LOADED:
      return {
        ...state,
        etymology: action.etymology,
      }

    case Actions.DEFINITIONS_CACHE_CLEARED:
      return {
        ...state,
        definitionsCache: {},
      }

    case Actions.FETCHING:
      return {
        ...state,
        fetching: action.fetching,
      }

    case Actions.SET_LANGUAGE:
      return {
        ...state,
        language: action.language,
      }

    case Actions.TOGGLE_VIDEO_MODAL:
      return {
        ...state,
        videoModal: action.videoModal,
      }

    case Actions.TOGGLE_ETYMO_MODAL:
      return {
        ...state,
        etymoModal: action.etymoModal,
      }

    case Actions.TOGGLE_SEARCH_RESULT_DISPLAY:
      return {
        ...state,
        searchResults: action.toggle,
      }

    case Actions.LAYOUT_CHANGED:
      return {
        ...state,
        layoutAspect: action.layoutAspect,
      }

    default:
      return state;
  }
}
