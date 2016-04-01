'use strict';

const { createConstants } = require('../utils/redux');

const constants = createConstants([
  'API_AUTH_SIGNIN',
  'API_AUTH_SIGNUP',
  'API_AUTH_SIGNOUT',
  'API_AUTH_RESTORE',
  // TODO: Return api response in SIGNIN/UP/OUT messages, not in distinct ones
  'API_AUTH_AUTHORIZE',
  'API_AUTH_DEAUTHORIZE',
  'API_AUTH_FAILED'
]);

const serverOnlyActions = [
  constants.API_AUTH_AUTHORIZE,
  constants.API_AUTH_DEAUTHORIZE,
  constants.API_AUTH_FAILED
];

const anonymousActions = [
  constants.API_AUTH_SIGNIN,
  constants.API_AUTH_SIGNUP,
  constants.API_AUTH_RESTORE
];

const actions = {
  signIn: formData => ({
    type: constants.API_AUTH_SIGNIN,
    payload: { formData }
  }),
  signUp: formData => ({
    type: constants.API_AUTH_SIGNUP,
    payload: { formData }
  }),
  signOut: () => ({
    type: constants.API_AUTH_SIGNOUT
  }),
  restore: token => ({
    type: constants.API_AUTH_RESTORE,
    payload: { token }
  }),
  authorize: (user, token) => ({
    type: constants.API_AUTH_AUTHORIZE,
    payload: { user, token }
  }),
  deauthorize: message => ({
    type: constants.API_AUTH_DEAUTHORIZE,
    payload: { message }
  }),
  fail: message => ({
    type: constants.API_AUTH_FAILED,
    payload: { message }
  })
};

module.exports = {
  serverOnlyActions,
  anonymousActions,
  constants,
  actions
};
