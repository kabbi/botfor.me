import { createAction, handleActions } from 'redux-actions';
import { call, fork, put, race } from 'redux-saga/effects';
import { isCancelError, takeEvery } from 'redux-saga';
import io from 'socket.io-client';

import { listenForEvent } from 'common/utils/socket';
import { createConstants } from 'common/utils/redux';

export const constants = createConstants([
  'REMOTE_UPDATE_STATUS'
]);

export const actions = {
  updateStatus: createAction(
    constants.REMOTE_UPDATE_STATUS,
    (status, reason) => ({ status, reason })
  )
};

export const initialState = {
  status: 'offline',
  reason: null
};

export const reducer = handleActions({
  [constants.REMOTE_UPDATE_STATUS]: (state, { payload: { status, reason } }) => ({
    ...state, status, reason
  })
}, initialState);

function *apiCaller(socket, action) {
  socket.emit('action', action);
}

function *eventSender(socket) {
  yield* takeEvery(action => /API_.+/.test(action.type), apiCaller, socket);
}

function *eventReceiver(socket) {
  while (true) {
    const action = yield call(listenForEvent, socket, 'action');
    yield put(action);
  }
}

function *statusTracker(socket) {
  while (true) {
    // Only one field will be present in `events`,
    // and the value maybe `reason`
    const events = yield race({
      connected: call(listenForEvent, socket, 'connect'),
      disconnected: call(listenForEvent, socket, 'disconnect'),
      reconnecting: call(listenForEvent, socket, 'reconnecting'),
      reconnected: call(listenForEvent, socket, 'reconnect')
    });
    const status = Object.keys(events)[0];
    yield put(actions.updateStatus(status, events[status]));
  }
}

export const saga = function *remoteSaga() {
  yield put(actions.updateStatus('connecting'));
  const socket = io(__API_HOST__, {
    path: '/api/socket.io'
  });

  try {
    // Transmit socket status to the store
    yield fork(statusTracker, socket);

    // Start sending and receiving events
    yield fork(eventSender, socket);
    yield fork(eventReceiver, socket);
  } catch (error) {
    if (!isCancelError(error)) {
      throw error;
    }
    yield put(actions.updateStatus('disconnecting'));
    socket.close();
    yield put(actions.updateStatus('disconnected'));
  }
};

export default {
  constants,
  actions,
  initialState,
  reducer,
  saga
};
