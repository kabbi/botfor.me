import { handleActions } from 'redux-actions';
import io from 'socket.io-client';

import { action } from 'utils/redux';

export const REMOTE_CONNECT = 'REMOTE_CONNECT';
export const REMOTE_CONNECTED = 'REMOTE_CONNECTED';
export const REMOTE_DISCONNECT = 'REMOTE_DISCONNECT';
export const REMOTE_DISCONNECTED = 'REMOTE_DISCONNECTED';
export const REMOTE_SUBSCRIBE = 'REMOTE_SUBSCRIBE';
export const REMOTE_SUBSCRIBED = 'REMOTE_SUBSCRIBED';
export const REMOTE_UNSUBSCRIBE = 'REMOTE_UNSUBSCRIBE';
export const REMOTE_UNSUBSCRIBED = 'REMOTE_UNSUBSCRIBED';

export const constants = {
  REMOTE_CONNECT,
  REMOTE_CONNECTED,
  REMOTE_DISCONNECT,
  REMOTE_DISCONNECTED,
  REMOTE_SUBSCRIBE,
  REMOTE_SUBSCRIBED,
  REMOTE_UNSUBSCRIBE,
  REMOTE_UNSUBSCRIBED
};

export const connect = () => dispatch => {
  const socket = io(__API_HOST__, {
    path: '/api/socket.io'
  });
  dispatch(action(REMOTE_CONNECT, socket));
  socket.on('connect', () => {
    dispatch(action(REMOTE_CONNECTED));
  });
};

export const disconnect = () => (dispatch, getState) => {
  const { socket } = getState().remote;
  if (!socket) {
    return;
  }
  dispatch(action(REMOTE_DISCONNECT));
  socket.once('disconnect', () => {
    dispatch(action(REMOTE_DISCONNECTED));
  });
  socket.close();
};

export const actions = {
  connect,
  disconnect
};

const initialState = {
  status: 'offline',
  socket: null
};

export default handleActions({
  [REMOTE_CONNECT]: (state, { payload }) => ({
    ...state,
    status: 'connecting',
    socket: payload
  }),
  [REMOTE_CONNECTED]: state => ({
    ...state,
    status: 'online'
  }),
  [REMOTE_DISCONNECT]: state => ({
    ...state,
    status: 'disconnecting'
  }),
  [REMOTE_DISCONNECTED]: state => ({
    ...state,
    status: 'offline'
  })
}, initialState);
