'use strict';

const { call, cancel, fork, put, race, take } = require('redux-saga/effects');
const { isCancelError } = require('redux-saga');
const Immutable = require('immutable');

const debug = require('debug')('app:app-server:tasks:remote');

const { listenForEvent } = require('../../common/utils/socket');
const { increment, decrement } = require('../../common/utils/math');
const { serverOnlyActions } = require('../../common/constants/actions');
const { createConstants, createReducer } = require('../../common/utils/redux');

exports.path = 'remote';

const constants = exports.constants = createConstants([
  'REMOTE_CONNECTED',
  'REMOTE_DISCONNECTED',
  'REMOTE_ACTION_RECEIVED',
  'REMOTE_ACTION_SENT'
]);

const initialState = Immutable.fromJS({
  stats: {
    connected: 0,
    disconnected: 0,
    actionsSent: 0,
    actionsReceived: 0,
    online: 0
  }
});

exports.reducer = createReducer(initialState, {
  [constants.REMOTE_CONNECTED]: state => state
    .updateIn(['stats', 'connected'], increment)
    .updateIn(['stats', 'online'], increment),
  [constants.REMOTE_DISCONNECTED]: state => state
    .updateIn(['stats', 'disconnected'], increment)
    .updateIn(['stats', 'online'], decrement),
});

function *connectionWriter(socket) {
  try {
    while (true) {
      const action = yield take(({ meta, type }) => (
        /API_.+/.test(type) && meta && meta.socketId === socket.id && !meta.incoming
      ));
      socket.emit('action', Object.assign(action, {
        // Meta is for internal use only
        meta: undefined
      }));
    }
  } catch (error) {
    if (!isCancelError(error)) {
      throw error;
    }
  }
}

// TODO: support canceling this task
function *connectionHandler(socket, connections) {
  yield put({
    type: constants.REMOTE_CONNECTED
  });

  // Start transmitting API messages to this socket
  const writer = yield fork(connectionWriter, socket);

  while (true) {
    const { action, disconnect } = yield race({
      action: call(listenForEvent, socket, 'action'),
      disconnect: call(listenForEvent, socket, 'disconnect')
    });
    if (action) {
      // Do a bit of sanitizing
      if (serverOnlyActions[action.type]) {
        continue;
      }
      action.meta = {
        incoming: true,
        socketId: socket.id
      };
      yield put(action);
    }
    if (disconnect) {
      yield cancel(writer);
      yield put({
        type: constants.REMOTE_DISCONNECTED
      });
      delete connections[socket.id];
    }
  }
}

function *socketManager(server) {
  const io = require('socket.io')(server, {
    path: '/api/socket.io'
  });

  debug('Starting socket.io server');

  try {
    const connections = {};
    // Process incoming connections
    while (true) {
      const socket = yield call(listenForEvent, io.of('/'), 'connection');
      const handler = yield fork(connectionHandler, socket, connections);
      const client = { id: socket.id, socket, handler };
      connections[socket.id] = client;
    }
  } catch (error) {
    if (!isCancelError(error)) {
      throw error;
    }
    io.close();
  }
}

exports.saga = function *remoteSaga(app) {
  yield fork(socketManager, app.context.server);
};
