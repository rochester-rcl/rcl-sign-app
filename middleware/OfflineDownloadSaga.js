// Redux Saga
import {put, all, takeEvery, call, fork, take} from 'redux-saga/effects';
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

// Based on https://github.com/redux-saga/redux-saga/issues/589
// Only want to take the first instance of the action and none of the other ones
function takeLeading(pattern, saga, ...args) {
  return fork(function*() {
    while (true) {
      const action = yield take(pattern);
      yield call(saga, ...args.concat(action));
    }
  });
}
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
  yield takeLeading(SUBSCRIBE_ONLINE_STATUS_LISTENER, listenForOnlineStatus);
}

export default function* offlineDownloadSaga() {
  yield all([watchForOnlineStatuSubscription()]);
}
