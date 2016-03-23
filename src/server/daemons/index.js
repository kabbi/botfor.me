'use strict';

const { applyMiddleware, combineReducers, createStore } = require('redux');
const { default: createSagaMiddleware } = require('redux-saga');
const { fork } = require('redux-saga/effects');

const daemons = [
  require('./cluster'),
  require('./remote'),
  require('./auth')
];

function *startupSaga(deprecatedGetState, app) {
  for (const daemon of daemons) {
    yield fork(daemon.saga, app);
  }
}

const initialState = {};

module.exports = app => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(
    sagaMiddleware
  );
  const rootReducer = combineReducers(
    daemons.reduce((obj, daemon) => {
      obj[daemon.path] = daemon.reducer;
      return obj;
    }, {})
  );
  const store = createStore(
    rootReducer,
    initialState,
    middleware
  );

  // Bootstrap all our tasks
  sagaMiddleware.run(startupSaga, app);

  return store;
};
