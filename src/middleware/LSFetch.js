/* @flow */

// Endpoint
import { LSFBaseEndpoint, LSFSearchEndpoint, LSF_NAV_ENDPOINT } from '../utils/Constants';

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
  return fetch(endpoint).then((response) => {
    return response.json().then((definitions) => {
      return definitions;
    });
  });
}

export function fetchNav(language: string): Object {
  const endpoint: string = LSF_NAV_ENDPOINT + language;
  return fetch(endpoint).then((response) => response.json().then((nav) => nav));
}
