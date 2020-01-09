export const DOWNLOAD_FILE = 'DOWNLOAD_FILE';
export const FILE_DOWNLOADED = 'FILE_DOWNLOADED';
export const READ_CACHE = 'READ_CACHE';
export const CACHE_READ = 'CACHE_READ';
export const ONLINE_STATUS_UPDATED = 'ONLINE_STATUS_UPDATED';
export const SUBSCRIBE_ONLINE_STATUS_LISTENER =
  'SUBSCRIBE_ONLINE_STATUS_LISTENER';

export function downloadFile(url) {
  return {
    url: url,
    type: DOWNLOAD_FILE,
  };
}

export function readCache() {
  return {
    type: READ_CACHE,
  };
}

export function listenForOnlineStatus() {
  return {
    type: SUBSCRIBE_ONLINE_STATUS_LISTENER,
  };
}
