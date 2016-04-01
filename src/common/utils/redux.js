'use strict';

const { takeEvery } = require('redux-saga');
const isFunction = require('lodash/isFunction');
const isString = require('lodash/isString');
const isArray = require('lodash/isArray');

exports.createConstants = (constants) => (
  constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {})
);

exports.createReducer = (initialState, reducerMap) => (state, action) => {
  const reducer = reducerMap[action.type];
  const currentState = state || initialState;
  return reducer ? reducer(currentState, action) : currentState;
};

exports.createRemoteReducer = (initialState, reducerMap) => {
  const handler = exports.createReducer(initialState, reducerMap);
  return (state, intent) => handler(state, intent.payload.action);
};

exports.takeEveryRemote = (parentType, remotePattern, worker, ...args) => (
  takeEvery(({ type, payload: { action } }) => {
    if (type !== parentType) {
      return false;
    }

    if (remotePattern === '*') {
      return true;
    } else if (isArray(remotePattern)) {
      return remotePattern.indexOf(action.type) !== -1;
    } else if (isFunction(remotePattern)) {
      return remotePattern(action);
    }

    return remotePattern === action.type;
  }, worker, ...args)
);
