import {
  FILE_DOWNLOADED,
  CACHE_READ,
  ONLINE_STATUS_UPDATED,
  DOWNLOAD_FILE
} from '../actions/DownloadActions';

const defaultState = {
  offlineDownloads: {},
  definitions: [],
  offline: false,
  status: DOWNLOAD_FILE
};

export default function offlineDownloadReducer(state = defaultState, action) {
  switch (action.type) {
    case FILE_DOWNLOADED:
      const cloned = offlineDownloads.slice(0);
      cloned.push(action.downloadInfo);
      return {...state, offlineDownloads: cloned};
    case ONLINE_STATUS_UPDATED:
      return {...state, offline: !action.status};
    default:
      return state;
  }
}
