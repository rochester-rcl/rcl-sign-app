import {
  ALL_DOWNLOADS_COMPLETE,
  FILE_DOWNLOAD_PENDING,
  FILE_DOWNLOADED,
  CACHE_READ,
  QUERY_CACHED_DEFINITIONS,
  ONLINE_STATUS_UPDATED,
  DOWNLOAD_FILE,
  CACHE_UPDATED,
} from '../actions/DownloadActions';

const defaultState = {
  offlineDownloadsMap: {},
  definitions: [],
  filteredDefinitions: [],
  offline: false,
  status: DOWNLOAD_FILE,
};

export default function offlineDownloadReducer(state = defaultState, action) {
  const downloads = {...state.offlineDownloadsMap};
  switch (action.type) {
    case CACHE_READ:
      return {...state, definitions: action.definitions};
    case FILE_DOWNLOAD_PENDING:
      downloads[action.id] = FILE_DOWNLOAD_PENDING;
      return {...state, offlineDownloadsMap: downloads};
    case ALL_DOWNLOADS_COMPLETE:
      downloads[action.id] = FILE_DOWNLOADED;
      return {...state, offlineDownloadsMap: downloads};
    case ONLINE_STATUS_UPDATED:
      return {...state, offline: !action.status};
    case CACHE_UPDATED:
      return {...state, definitions: action.definitions};
    default:
      return state;
  }
}
