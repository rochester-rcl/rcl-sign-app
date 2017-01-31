/* @flow */

const defaultState: Object = {
  definitions: [],
  language: 'en', // defaults to English, for now
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
      return {
        ...state,
        definitions: action.definitions,
      }

    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.language,
      }

    default:
      return state;
  }
}
