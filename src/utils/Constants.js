/* @flow */
export const BASENAME: string = 'lsf-asl-app';
export const LSFBaseEndpoint: string =
  "https://projects.lib.rochester.edu/lsf-asl_dev/wp-json/lsf-rest/v1/definitions/";

export const LSFSearchEndpoint: string =
  "https://projects.lib.rochester.edu/lsf-asl_dev/wp-json/lsf-rest/v1/search/";

// TODO CHANGE THIS TO PROD ON PROD
export const LSF_NAV_ENDPOINT: string =
  "https://projects.lib.rochester.edu/lsf-asl_dev/wp-json/lsf-rest/v1/nav/";

// TODO CHANGE THIS TO PROD ON PROD
export const LSF_ETYMO_ENDPOINT: string =
  "https://projects.lib.rochester.edu/lsf-asl_dev/wp-json/lsf-rest/v1/etymo/";

// TODO CHANGE THIS TO PROD ON PROD
export const LSF_ETYMO_SEARCH_ENDPOINT: string =
  "https://projects.lib.rochester.edu/lsf-asl_dev/wp-json/lsf-rest/v1/search-etymo/";

export const Alphabet: Array<string> = [
  "0-9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

// Range
export const A_TO_G: string = "a-g";
export const H_TO_M: string = "h-m";
export const N_TO_R: string = "n-r";
export const S_TO_Z: string = "s-z";

export const LETTER_RANGES: Array<string> = [A_TO_G, H_TO_M, N_TO_R, S_TO_Z];

export const LETTER_RANGE_MAP = {
  A_TO_G: A_TO_G,
  H_TO_M: H_TO_M,
  N_TO_R: N_TO_R,
  S_TO_Z: S_TO_Z,
}

export const Range: Object = {
  aToG: {
    letters: ["a", "b", "c", "d", "e", "f", "g"],
    string: A_TO_G
  },
  hToM: {
    letters: ["h", "i", "j", "k", "l", "m"],
    string: H_TO_M
  },
  nToR: {
    letters: ["n", "o", "p", "q", "r"],
    string: N_TO_R
  },
  sToZ: {
    letters: ["s", "t", "u", "v", "w", "x", "y", "z"],
    string: S_TO_Z
  }
};

export const AlphabetMap: List<string> = [
  { key: "A", value: "a", text: "A" },
  { key: "B", value: "b", text: "B" },
  { key: "C", value: "c", text: "C" },
  { key: "D", value: "d", text: "D" },
  { key: "E", value: "e", text: "E" },
  { key: "F", value: "f", text: "F" },
  { key: "G", value: "g", text: "G" },
  { key: "H", value: "h", text: "H" },
  { key: "I", value: "i", text: "I" },
  { key: "J", value: "j", text: "J" },
  { key: "K", value: "k", text: "K" },
  { key: "L", value: "l", text: "L" },
  { key: "M", value: "m", text: "M" },
  { key: "N", value: "n", text: "N" },
  { key: "O", value: "o", text: "O" },
  { key: "P", value: "p", text: "P" },
  { key: "Q", value: "q", text: "Q" },
  { key: "R", value: "r", text: "R" },
  { key: "S", value: "s", text: "S" },
  { key: "T", value: "t", text: "T" },
  { key: "U", value: "u", text: "U" },
  { key: "V", value: "v", text: "V" },
  { key: "W", value: "w", text: "W" },
  { key: "X", value: "x", text: "X" },
  { key: "Y", value: "y", text: "Y" },
  { key: "Z", value: "z", text: "Z" }
];
