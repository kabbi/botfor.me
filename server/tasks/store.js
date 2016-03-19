'use strict';

const { applyMiddleware, combineReducers, createStore } = require('redux');
const { default: createSagaMiddleware } = require('redux-saga');
const { fork } = require('redux-saga/effects');

const cluster = require('./cluster');

function *startupTask(getState) {
  yield fork(cluster.task, getState);
}

const initialState = {};

module.exports = createStore(
  combineReducers({
    cluster: cluster.reducer
  }),
  initialState,
  applyMiddleware(
    createSagaMiddleware(startupTask)
  )
);
