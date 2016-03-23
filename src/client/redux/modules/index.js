import { routeReducer as router } from 'redux-simple-router';
import { fork } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import remoteModule from './remote';
import authModule from './auth';

export const rootReducer = combineReducers({
  remote: remoteModule.reducer,
  auth: authModule.reducer,
  router
});

export const rootSaga = function *rootSaga() {
  yield fork(remoteModule.saga);
  yield fork(authModule.saga);
};
