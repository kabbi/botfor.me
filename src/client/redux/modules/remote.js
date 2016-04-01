import { call, fork, put, race, select, take } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';
import { isCancelError } from 'redux-saga';
import { fromJS } from 'immutable';
import io from 'socket.io-client';

import { waitForEvent } from 'common/utils/socket';
import { createConstants } from 'common/utils/redux';
import { actions as apiAuthActions } from 'common/modules/auth';
import { selectors as authSelectors } from 'redux/modules/auth';

export const path = 'remote';

export const constants = createConstants([
  'REMOTE_UPDATE_STATUS',
  'REMOTE_SEND_ACTION',
  'REMOTE_RECEIVE_ACTION'
]);

export const selectors = {
  getStatus: state => state.getIn([path, 'status']),
  getReason: state => state.getIn([path, 'reason']),
  getSendBuffer: state => state.getIn([path, 'sendBuffer'])
};

export const actions = {
  updateStatus: (status, reason) => ({
    type: constants.REMOTE_UPDATE_STATUS,
    payload: { status, reason }
  }),
  sendRemoteAction: action => ({
    type: constants.REMOTE_SEND_ACTION,
    payload: { action }
  }),
  receiveRemoteAction: action => ({
    type: constants.REMOTE_RECEIVE_ACTION,
    payload: { action }
  })
};

export const initialState = fromJS({
  sendBuffer: [],
  status: 'offline',
  reason: null
});

export const reducer = handleActions({
  [constants.REMOTE_SEND_ACTION]: (state, action) => {
    if (state.get('status') === 'offline') {
      return state.update('sendBuffer', buffer => buffer.push(action));
    }
    return state;
  },
  [constants.REMOTE_UPDATE_STATUS]: (state, { payload: { status, reason } }) => state
    .set('status', status).set('reason', reason)
}, initialState);

export const handleRemoteActions = (reducerMap, defaultState) => {
  const handler = handleActions(reducerMap, defaultState);
  return (state, intent) => handler(state, intent.payload.action);
};

function *eventSender(socket) {
  while (true) {
    const intent = yield take(constants.REMOTE_SEND_ACTION);
    socket.emit('action', intent.payload.action);
  }
}

function *eventReceiver(socket) {
  while (true) {
    const action = yield call(waitForEvent, socket, 'action');
    yield put(actions.receiveRemoteAction(action));
  }
}

function *statusTracker(socket) {
  while (true) {
    // Only one field will be present in `events`,
    // and the value maybe `reason`
    const events = yield race({
      connected: call(waitForEvent, socket, 'connect'),
      disconnected: call(waitForEvent, socket, 'disconnect'),
      reconnecting: call(waitForEvent, socket, 'reconnecting'),
      reconnected: call(waitForEvent, socket, 'reconnect')
    });
    const status = Object.keys(events)[0];
    // Re-authenticate on each connection or reconnection
    if (events.hasOwnProperty('connected')) {
      const token = yield select(authSelectors.getToken);
      if (token) {
        // Authorize the current connection
        yield put(actions.sendRemoteAction(
          apiAuthActions.restore(token)
        ));
        // Send back all the buffered messages
        const sendBuffer = yield select(selectors.getSendBuffer);
        for (const intent of sendBuffer) {
          socket.emit('action', intent.payload.action);
        }
      }
    }
    yield put(actions.updateStatus(status, events[status]));
  }
}

export const saga = function *remoteSaga() {
  yield put(actions.updateStatus('connecting'));
  const socket = io(__API_HOST__, {
    path: '/api/socket'
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
