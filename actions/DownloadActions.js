export const DOWNLOAD_FILE = 'DOWNLOAD_FILE';
export const FILE_DOWNLOADED = 'FILE_DOWNLOADED';
export const FILE_DOWNLOAD_PENDING = 'FILE_DOWNLOAD_PENDING';
export const FILE_DOWNLOAD_ERROR = 'FILE_DOWNLOAD_ERROR';
export const ALL_DOWNLOADS_COMPLETE = 'ALL_DOWNLOADS_COMPLETE';
export const OFFLINE_DOWNLOADS_MAP_LOADED = 'OFFLINE_DOWNLOADS_MAP_LOADED';
export const READ_CACHE = 'READ_CACHE';
export const CACHE_READ = 'CACHE_READ';
export const CACHE_UPDATED = 'CACHE_UPDATED';
export const QUERY_OFFLINE_DEFINITIONS = 'QUERY_CACHED_DEFINITIONS';
export const OFFLINE_DEFINITIONS_QUERIED = 'OFFLINE_DEFINITIONS_QUERIED';
export const ONLINE_STATUS_UPDATED = 'ONLINE_STATUS_UPDATED';
export const SUBSCRIBE_ONLINE_STATUS_LISTENER =
  'SUBSCRIBE_ONLINE_STATUS_LISTENER';

export function downloadDefinition(definition) {
  return {
    definition: definition,
    type: DOWNLOAD_FILE,
  };
}

export function loadOfflineDefinitions(definitionQuery = null) {
  return {
    type: READ_CACHE,
    definitionQuery: definitionQuery
  };
}

export function queryOfflineDefinitions(definitionQuery) {
  return {
    type: QUERY_OFFLINE_DEFINITIONS,
    definitionQuery: definitionQuery,
  };
}

export function listenForOnlineStatus() {
  return {
    type: SUBSCRIBE_ONLINE_STATUS_LISTENER,
  };
}
