'use strict';

const { call, cancel, fork, put, race, select, take } = require('redux-saga/effects');
const { isCancelError } = require('redux-saga');
const { fromJS } = require('immutable');

const debug = require('debug')('app:app-server:modules:remote');

const {
  waitForEvent
} = require('../../common/utils/socket');
const {
  increment,
  decrement
} = require('../../common/utils/math');
const {
  createConstants,
  createReducer
} = require('../../common/utils/redux');
const {
  anonymousActions,
  serverOnlyActions,
} = require('../../common/modules');

const path = 'remote';

const selectors = {
  getAuthorized: state => (
    state[path].get('authorized')
  )
};

const constants = createConstants([
  'REMOTE_CONNECTED',
  'REMOTE_DISCONNECTED',
  'REMOTE_AUTHORIZE',
  'REMOTE_DEAUTHORIZE',
  'REMOTE_SEND_SOCKET_ACTION',
  'REMOTE_SEND_USER_ACTION',
  'REMOTE_RECEIVE_ACTION'
]);

const actions = {
  connected: socketId => ({
    type: constants.REMOTE_CONNECTED,
    payload: { socketId }
  }),
  disconnected: socketId => ({
    type: constants.REMOTE_DISCONNECTED,
    payload: { socketId }
  }),
  authorize: (socketId, userId) => ({
    type: constants.REMOTE_AUTHORIZE,
    payload: { socketId, userId }
  }),
  deauthorize: socketId => ({
    type: constants.REMOTE_DEAUTHORIZE,
    payload: { socketId }
  }),
  sendSocketAction: (socketId, action) => ({
    type: constants.REMOTE_SEND_SOCKET_ACTION,
    payload: { socketId, action }
  }),
  sendUserAction: (userId, action) => ({
    type: constants.REMOTE_SEND_USER_ACTION,
    payload: { userId, action }
  }),
  receiveAction: (socketId, userId, action) => ({
    type: constants.REMOTE_RECEIVE_ACTION,
    payload: { socketId, userId, action }
  })
};

const initialState = fromJS({
  authorized: {},
  stats: {
    connected: 0,
    disconnected: 0,
    actionsSent: 0,
    actionsReceived: 0,
    online: 0
  }
});

const reducer = createReducer(initialState, {
  [constants.REMOTE_CONNECTED]: state => state
    .updateIn(['stats', 'connected'], increment)
    .updateIn(['stats', 'online'], increment),
  [constants.REMOTE_DISCONNECTED]: (state, { payload: { socketId } }) => state
    .deleteIn(['authorized', socketId])
    .updateIn(['stats', 'disconnected'], increment)
    .updateIn(['stats', 'online'], decrement),
  [constants.REMOTE_AUTHORIZE]: (state, { payload: { socketId, userId } }) => state
    .setIn(['authorized', socketId], userId),
  [constants.REMOTE_DEAUTHORIZE]: (state, { payload: { socketId } }) => state
    .deleteIn(['authorized', socketId]),
});

function *connectionWriter(socket) {
  // TODO: wait for connection to become authorized
  try {
    while (true) {
      const intent = yield take(({ type, payload }) => (
        // TODO: Add send-to-user handler here, when we get proper authorized user id
        (type === constants.REMOTE_SEND_SOCKET_ACTION && payload.socketId === socket.id)
      ));
      const { action } = intent.payload;
      debug(`${socket.id} <- server`, action);
      socket.emit('action', action);
    }
  } catch (error) {
    if (!isCancelError(error)) {
      throw error;
    }
  }
}

function *handleIncomingAction(socket, action) {
  const socketId = socket.id;
  const authorized = yield select(selectors.getAuthorized);
  const userId = authorized.get(socketId);
  // Authorize the action
  if (!anonymousActions[action.type] && !userId) {
    debug('Rejecting unauthorized action', action);
    return;
  }
  // Do a bit of sanitizing
  if (serverOnlyActions[action.type]) {
    debug('Rejecting server-only action', action);
    return;
  }
  yield put(actions.receiveAction(socketId, userId, action));
}

// TODO: support canceling this task
function *connectionHandler(socket, connections) {
  const socketId = socket.id;
  yield put(actions.connected(socketId));

  // Start transmitting API messages to this socket
  const writer = yield fork(connectionWriter, socket);

  while (true) {
    const { action, disconnect } = yield race({
      action: call(waitForEvent, socket, 'action'),
      disconnect: call(waitForEvent, socket, 'disconnect')
    });
    if (action) {
      debug(`${socketId} -> server`, action);
      yield call(handleIncomingAction, socket, action);
    }
    if (disconnect) {
      debug('Disconnected', socketId);
      yield cancel(writer);
      yield put(actions.disconnected(socketId));
      delete connections[socketId];
    }
  }
}

function *socketManager(server) {
  const io = require('socket.io')(server, {
    path: '/api/socket'
  });

  debug('Starting socket.io server');

  try {
    const connections = {};
    // Process incoming connections
    while (true) {
      const socket = yield call(waitForEvent, io.of('/'), 'connection');
      const handler = yield fork(connectionHandler, socket, connections);
      const client = { id: socket.id, socket, handler };
      connections[socket.id] = client;
      debug('New connection', socket.id);
    }
  } catch (error) {
    if (!isCancelError(error)) {
      throw error;
    }
    io.close();
  }
}

const saga = function *remoteSaga(app) {
  yield fork(socketManager, app.context.server);
};

module.exports = {
  path,
  constants,
  actions,
  initialState,
  reducer,
  saga
};
