export const LSFBaseEndpoint =
  'https://projects.lib.rochester.edu/lsf-asl/wp-json/lsf-rest/v1/definitions/';

export const LSFSearchEndpoint =
  'https://projects.lib.rochester.edu/lsf-asl/wp-json/lsf-rest/v1/search/';

export const Alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
export const LETTER_RANGE = ['a-g', 'h-m', 'n-r', 's-z'];
export const STORAGE_DEFINITIONS_KEY = 'asl-lsf-app-definitions';
export const STORAGE_DOWNLOADS_KEY = 'asl-lsf-app-downloads';
export const LANGUAGES = ['en', 'fr'];

export function definitionKeys() {
  const keys = [];
  for (let i = 0; i < Alphabet.length; i++) {
    const letter = Alphabet[i];
    for (let j = 0; j < LETTER_RANGE.length; j++) {
      const range = LETTER_RANGE[j];
      for (let k = 0; k < LANGUAGES.length; k++) {
        const lang = LANGUAGES[k];
        const key = `${STORAGE_DEFINITIONS_KEY}-${lang}-${letter}-${range}`;
        keys.push(key);
      }
    }
  }
  return keys;
}

export function createDefinitionsCacheKey(language, letter, range) {
  return `${STORAGE_DEFINITIONS_KEY}-${language}-${letter}-${range}`;
}
