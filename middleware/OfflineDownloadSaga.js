// Redux Saga
import {put, all, takeEvery, call, fork, take} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';

// AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

// NetInfo
import NetInfo from '@react-native-community/netinfo';

// FS
import RNFS from 'react-native-fs';

// Utils 
import { takeLeading } from './Saga';

// Actions
import {
  ONLINE_STATUS_UPDATED,
  SUBSCRIBE_ONLINE_STATUS_LISTENER,
  DOWNLOAD_FILE,
} from '../actions/DownloadActions';

function createNetInfoProgressChannel() {
  return eventChannel(emit => {
    const unsubscribe = NetInfo.addEventListener(state => {
      emit({type: ONLINE_STATUS_UPDATED, status: state.isInternetReachable});
    });
    return unsubscribe;
  });
}

function* downloadDefinition(action) {
  console.log(action);
}

function* listenForOnlineStatus() {
  const channel = yield createNetInfoProgressChannel();
  while (true) {
    const status = yield take(channel);
    yield put(status);
  }
}

function* watchForDownloadDefinition() {
  yield takeEvery(DOWNLOAD_FILE, downloadDefinition);
}

function* watchForOnlineStatuSubscription() {
  yield takeLeading(SUBSCRIBE_ONLINE_STATUS_LISTENER, listenForOnlineStatus);
}

export default function* offlineDownloadSaga() {
  yield all([watchForOnlineStatuSubscription(), watchForDownloadDefinition()]);
}
