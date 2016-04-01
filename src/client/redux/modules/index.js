import { combineReducers } from 'redux-immutablejs';
import { fork } from 'redux-saga/effects';

import remoteModule from './remote';
import routerModule from './router';
import authModule from './auth';
import botsModule from './bots';

export const allActions = {
  remote: remoteModule.actions,
  auth: authModule.actions,
  bots: botsModule.actions
};

export const rootReducer = combineReducers({
  remote: remoteModule.reducer,
  router: routerModule.reducer,
  auth: authModule.reducer,
  bots: botsModule.reducer,
});

export const rootSaga = function *rootSaga() {
  yield fork(remoteModule.saga);
  yield fork(authModule.saga);
  yield fork(botsModule.saga);
};
