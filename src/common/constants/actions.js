'use strict';

const { createConstants } = require('../utils/redux');

exports.apiAuthActions = createConstants([
  'API_AUTH_SIGNIN',
  'API_AUTH_SIGNUP',
  'API_AUTH_SIGNOUT',
  'API_AUTH_AUTHORIZE',
  'API_AUTH_DEAUTHORIZE',
  'API_AUTH_FAILED'
]);

exports.serverOnlyActions = {
  [exports.apiAuthActions.API_AUTH_AUTHORIZE]: true,
  [exports.apiAuthActions.API_AUTH_DEAUTHORIZE]: true
};

exports.anonymousActions = {
  [exports.apiAuthActions.API_AUTH_SIGNUP]: true,
  [exports.apiAuthActions.API_AUTH_SIGNIN]: true,
  [exports.apiAuthActions.API_AUTH_SIGNOUT]: true
};
