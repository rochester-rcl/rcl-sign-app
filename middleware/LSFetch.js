/* @flow */

// Endpoint
import { LSFBaseEndpoint } from '../utils/Constants';

export function fetchDefinitions(language: string, letter: string, range: string): Object{
  let endpoint: string = LSFBaseEndpoint + language + '/' + letter + '/' + range;
  return fetch(endpoint).then((response) => {
    return response.json().then((definitions) => {
        return definitions;
    });
  });
}
