/* @flow */

// Endpoint
import { LSFBaseEndpoint, LSFSearchEndpoint, LSF_NAV_ENDPOINT, LSF_ETYMO_ENDPOINT, LSF_ETYMO_SEARCH_ENDPOINT } from '../utils/Constants';

export function fetchDefinitions(language: string, letter: string, range: string): Promise {
  const endpoint: string = LSFBaseEndpoint + language + '/' + letter + '/' + range;
  return fetch(endpoint).then((response) => {
    return response.json().then((definitions) => {
        return definitions;
    });
  });
}

export function fetchEtymology(language: string, letter: string): Promise {
  const endpoint: string = LSF_ETYMO_ENDPOINT + language + '/' + letter;
  return fetch(endpoint).then((response) => response.json().then((etymo) => etymo));
}

export function searchDefinitions(language: string, term: string): Promise {
  let endpoint: string = LSFSearchEndpoint + language + '/' + term;
  return fetch(endpoint).then((response) => {
    return response.json().then((definitions) => {
      return definitions;
    });
  });
}

export function searchEtymology(language: string, term: string): Promise {
  const endpoint: string = LSF_ETYMO_SEARCH_ENDPOINT + language + '/' + term;
  return fetch(endpoint).then((response) => response.json().then((etymo) => etymo));
}

export function fetchNav(language: string): Promise {
  const endpoint: string = LSF_NAV_ENDPOINT + language;
  return fetch(endpoint).then((response) => response.json().then((nav) => nav));
}
