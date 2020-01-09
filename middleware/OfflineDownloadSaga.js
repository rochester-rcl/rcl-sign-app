// Redux Saga
import {put, takeEvery, all, takeOne} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';

// AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';

// NetInfo
import NetInfo from '@react-native-community/netinfo';

// Actions
import {
  ONLINE_STATUS_UPDATED,
  SUBSCRIBE_ONLINE_STATUS_LISTENER,
} from '../actions/DownloadActions';

function createNetInfoProgressChannel() {
  return eventChannel(emit => {
    const unsubscribe = NetInfo.addEventListener(state => {
      emit({type: ONLINE_STATUS_UPDATED, status: state.isInternetReachable});
    });
    return unsubscribe;
  });
}

function* listenForOnlineStatus() {
  const channel = yield createNetInfoProgressChannel();
  while (true) {
    const status = yield take(channel);
    yield put(status);
  }
}

function* watchForOnlineStatuSubscription() {
  yield takeOne(SUBSCRIBE_ONLINE_STATUS_LISTENER, listenForOnlineStatus);
}

export default function* rootSaga() {
  yield all([watchForOnlineStatuSubscription]);
}
