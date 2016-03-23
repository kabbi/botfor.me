'use strict';

const Immutable = require('immutable');
const { takeEvery } = require('redux-saga');
const { put } = require('redux-saga/effects');

const debug = require('debug')('app:app-server:tasks:auth');

const User = require('../api/users/User.model');

const { apiAuthActions } = require('../../common/constants/actions');
const { increment, decrement } = require('../../common/utils/math');
const { createReducer } = require('../../common/utils/redux');
const { createToken } = require('../utils/jwt');

exports.path = 'auth';

const initialState = Immutable.fromJS({
  stats: {
    online: 0
  }
});

exports.reducer = createReducer(initialState, {
  [apiAuthActions.API_AUTH_AUTHORIZE]: state => state
    .updateIn(['stats', 'online'], increment),
  [apiAuthActions.API_AUTH_DEAUTHORIZE]: state => state
    .updateIn(['stats', 'online'], decrement)
});

function *handleSignIn(action) {
  const { socketId } = action.meta;
  const { email, password } = action.payload;

  const user = yield User.where('email', email).findOne();

  if (!user || !user.authenticate(password)) {
    yield put({
      type: apiAuthActions.API_AUTH_FAILED,
      meta: { socketId },
      payload: {
        message: 'Unknown email or password'
      }
    });
    return;
  }

  const token = createToken(user.get('_id'));

  yield put({
    type: apiAuthActions.API_AUTH_AUTHORIZE,
    meta: { socketId },
    payload: { user, token }
  });
}

function *handleSignUp(action) {
  debug('New sign up', action);
}

function *handleSignOut(action) {
  debug('New sign out', action);
}

exports.saga = function *authSaga() {
  yield [
    takeEvery(apiAuthActions.API_AUTH_SIGNIN, handleSignIn),
    takeEvery(apiAuthActions.API_AUTH_SIGNUP, handleSignUp),
    takeEvery(apiAuthActions.API_AUTH_SIGNOUT, handleSignOut)
  ];
};
