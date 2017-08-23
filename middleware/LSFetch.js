/* @flow */

// Endpoint
import { LSFBaseEndpoint, LSFSearchEndpoint } from '../utils/Constants';

export function fetchDefinitions(language: string, letter: string, range: string): Object{
  let endpoint: string = LSFBaseEndpoint + language + '/' + letter + '/' + range;
  return fetch(endpoint).then((response) => {
    return response.json().then((definitions) => {
        return definitions;
    });
  });
}

export function searchDefinitions(language: string, term: string): Object {
  let endpoint: string = LSFSearchEndpoint + language + '/' + term;
  console.log(endpoint);
  return fetch(endpoint).then((response) => {
    return response.json().then((definitions) => {
      return definitions;
    });
  });
}
