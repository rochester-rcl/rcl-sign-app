/* @flow */

// Endpoint
import {
  LSFBaseEndpoint,
  LSFSearchEndpoint,
  definitionKeys,
} from '../utils/Constants';

import lodash from 'lodash';

export function fetchDefinitions(language, letter, range) {
  let endpoint = LSFBaseEndpoint + language + '/' + letter + '/' + range;
  return fetch(endpoint).then(prepareDefinitionResults);
}

export function searchDefinitions(language, term) {
  let endpoint = LSFSearchEndpoint + language + '/' + term;
  return fetch(endpoint).then(prepareDefinitionResults);
}

function prepareDefinitionResults(response) {
  return response.json().then(definitions => toCamelCase(definitions));
}

function toCamelCase(definitions) {
  const convertedKeys = {};
  const convert = val => {
    let converted;
    if (typeof val === 'object' && val !== null) {
      converted = {...val};
      Object.keys(val).forEach(key => {
        const v = val[key];
        if (key.includes('_')) {
          if (!convertedKeys[key]) {
            convertedKeys[key] = lodash.camelCase(key);
          }
          converted[convertedKeys[key]] = convert(v);
          delete converted[key];
        } else {
          converted[key] = convert(v);
        }
      });
    } else {
      converted = val;
    }
    return converted;
  };
  return definitions.map(convert);
}
