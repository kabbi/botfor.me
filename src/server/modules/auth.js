'use strict';

const { takeEvery } = require('redux-saga');
const { put } = require('redux-saga/effects');

const debug = require('debug')('app:app-server:modules:auth');

const User = require('../models/User');

const remote = require('./remote');
const { createToken, verifyToken } = require('../utils/jwt');
const { constants: apiConstants, actions: apiActions } = require('../../common/modules/auth');

const path = 'auth';

function *handleSignIn(intent) {
  const { action, socketId } = intent.payload;
  const { email, password } = action.payload.formData;

  const user = yield User.where('email', email).findOne();

  if (!user || !user.authenticate(password)) {
    debug(`Signin failed for ${socketId}`);
    yield put(remote.actions.sendSocketAction(socketId,
      apiActions.fail('Unknown email or password')
    ));
    return;
  }

  const userId = user.get('_id');
  const token = createToken(userId);

  debug(`Signed in ${socketId}, ${userId}`);
  yield put(remote.actions.authorize(socketId, userId));
  yield put(remote.actions.sendSocketAction(socketId,
    apiActions.authorize(user, token)
  ));
}

function *handleSignUp(intent) {
  debug('New sign up', intent);
}

function *handleRestore(intent) {
  const { action, socketId } = intent.payload;
  const { token } = action.payload;
  const userId = verifyToken(token);
  if (!token || !verifyToken(token)) {
    debug(`Restore failed for ${socketId}`);
    return;
  }
  debug(`Restoring auth for ${socketId}, ${userId}`);
  yield put(remote.actions.authorize(socketId, userId));
}

function *handleSignOut(intent) {
  const { socketId } = intent.payload;
  debug(`Signed out ${socketId}`);
  yield put(remote.actions.sendSocketAction(socketId,
    apiActions.deauthorize('Signed out')
  ));
}

const saga = function *authSaga() {
  yield [
    // TODO: Make a saga helper function `takeEveryRemote`
    takeEvery(({ type, payload: { action } }) => (
      type === remote.constants.REMOTE_RECEIVE_ACTION &&
      action.type === apiConstants.API_AUTH_SIGNIN
    ), handleSignIn),
    takeEvery(({ type, payload: { action } }) => (
      type === remote.constants.REMOTE_RECEIVE_ACTION &&
      action.type === apiConstants.API_AUTH_SIGNUP
    ), handleSignUp),
    takeEvery(({ type, payload: { action } }) => (
      type === remote.constants.REMOTE_RECEIVE_ACTION &&
      action.type === apiConstants.API_AUTH_SIGNOUT
    ), handleSignOut),
    takeEvery(({ type, payload: { action } }) => (
      type === remote.constants.REMOTE_RECEIVE_ACTION &&
      action.type === apiConstants.API_AUTH_RESTORE
    ), handleRestore)
  ];
};

module.exports = {
  path,
  saga
};
