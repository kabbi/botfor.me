'use strict';

const Immutable = require('immutable');
const { select, fork, put, take } = require('redux-saga/effects');

const debug = require('debug')('app:app-server:modules:cluster');

const ConsulClient = require('../clients/ConsulClient');
const NomadClient = require('../clients/NomadClient');

const { createConstants, createReducer } = require('../../common/utils/redux');
const { delay } = require('../../common/utils/promise');

exports.path = 'cluster';

const constants = exports.constants = createConstants([
  'CLUSTER_UPDATE_CONSUL_STATUS',
  'CLUSTER_UPDATE_NOMAD_STATUS',
  'CLUSTER_DEPLOY',
  'CLUSTER_START',
  'CLUSTER_STOP'
]);

const initialState = Immutable.fromJS({
  statuses: {
    nomad: 'unknown',
    consul: 'unknown',
    cluster: 'unknown'
  }
});

const getWorstStatus = statuses => {
  if (statuses.get('nomad') !== 'online' || statuses.get('consul') !== 'online') {
    return 'unreachable';
  }
  return 'online';
};

exports.reducer = createReducer(initialState, {
  [constants.CLUSTER_UPDATE_CONSUL_STATUS]: (state, { payload: status }) => {
    const newState = state.setIn(['statuses', 'consul'], status);
    return newState.setIn(['statuses', 'cluster'], getWorstStatus(state.get('statuses')));
  },
  [constants.CLUSTER_UPDATE_NOMAD_STATUS]: (state, { payload: status }) => {
    const newState = state.setIn(['statuses', 'nomad'], status);
    return newState.setIn(['statuses', 'cluster'], getWorstStatus(state.get('statuses')));
  }
});

function *nomadPinger() {
  while (true) {
    try {
      yield NomadClient.agent.self();
      yield put({
        type: constants.CLUSTER_UPDATE_NOMAD_STATUS,
        payload: 'online'
      });
      yield delay(1000);
    } catch (error) {
      yield put({
        type: constants.CLUSTER_UPDATE_NOMAD_STATUS,
        payload: 'unreachable'
      });
      yield delay(500);
    }
  }
}

function *consulPinger() {
  while (true) {
    try {
      yield ConsulClient.kv.get('nodely');
      yield put({
        type: constants.CLUSTER_UPDATE_CONSUL_STATUS,
        payload: 'online'
      });
      yield delay(1000);
    } catch (error) {
      yield put({
        type: constants.CLUSTER_UPDATE_CONSUL_STATUS,
        payload: 'unreachable'
      });
      yield delay(500);
    }
  }
}

function *statusLogger() {
  while (true) {
    const beforeUpdate = (yield select()).cluster.get('statuses');
    yield take(Object.keys(constants));
    const afterUpdate = (yield select()).cluster.get('statuses');
    if (!Immutable.is(beforeUpdate, afterUpdate)) {
      debug('Cluster status updated', beforeUpdate, '->', afterUpdate);
    }
  }
}

exports.saga = function *clusterSaga() {
  yield fork(nomadPinger);
  yield fork(consulPinger);
  yield fork(statusLogger);
};
