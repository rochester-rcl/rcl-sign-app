import {
  ALL_DOWNLOADS_COMPLETE,
  FILE_DOWNLOAD_PENDING,
  FILE_DOWNLOADED,
  CACHE_READ,
  ONLINE_STATUS_UPDATED,
  DOWNLOAD_FILE,
  CACHE_UPDATED,
} from '../actions/DownloadActions';

const defaultState = {
  offlineDownloads: {},
  definitions: [],
  offline: false,
  status: DOWNLOAD_FILE,
};

export default function offlineDownloadReducer(state = defaultState, action) {
  const downloads = {...state.offlineDownloads};
  switch (action.type) {
    case FILE_DOWNLOAD_PENDING:
      downloads[action.id] = FILE_DOWNLOAD_PENDING;
      return {...state, offlineDownloads: downloads};
    case ALL_DOWNLOADS_COMPLETE:
      downloads[action.id] = FILE_DOWNLOADED;
      return {...state, offlineDownloads: downloads};
    case ONLINE_STATUS_UPDATED:
      return {...state, offline: !action.status};
    case CACHE_UPDATED:
      console.log(action.definitions);
      return {...state, definitions: action.definitions};
    default:
      return state;
  }
}
