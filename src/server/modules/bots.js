'use strict';

const { call, fork, put, race, take } = require('redux-saga/effects');
const { ObjectId } = require('mongodb');

const debug = require('debug')('app:app-server:modules:bots');

const Bot = require('../models/Bot');

const remote = require('./remote');
const { delay } = require('../../common/utils/promise');
const { takeEveryRemote } = require('../../common/utils/redux');
const { actions: apiActions, constants: apiConstants } = require('../../common/modules/bots');

const BOT_STATUS_UPDATE_INTERVAL = 60e3;

const path = 'bots';

function *handleListBots(intent) {
  const { socketId, userId } = intent.payload;
  const bots = yield Bot.where('owner.$id', new ObjectId(userId)).find();
  yield put(remote.actions.sendSocketAction(socketId,
    apiActions.botList(bots)
  ));
}

function *handleFetchBot(intent) {
  const { action, socketId } = intent.payload;
  const { botId } = action.payload;
  const bot = yield Bot.findById(botId);
  yield put(remote.actions.sendSocketAction(socketId,
    apiActions.botFetch(bot)
  ));
}

// eslint-disable-next-line
function *getBotStatus(botId) {
  // TODO: implement
  return 'yet unknown';
}

function *getBotStatuses(userId) {
  const bots = yield Bot.where('owner.$id', new ObjectId(userId)).find();
  return yield bots.map(bot => call(getBotStatus, bot.get('_id')));
}

function *userBotsStatusWatcher(socketId, userId) {
  debug(`Starting status watcher for ${socketId} ${userId}`);
  while (true) {
    const { disconnected } = yield race({
      delay: call(delay, BOT_STATUS_UPDATE_INTERVAL),
      disconnected: take(remote.constants.REMOTE_DISCONNECTED)
    });
    if (disconnected) {
      debug(`Shutting down watcher for ${socketId} ${userId}`);
      return;
    }
    yield put(remote.actions.sendSocketAction(socketId,
      apiActions.updateBotStatuses(yield getBotStatuses(userId))
    ));
  }
}

function *globalBotStatusWatcher() {
  while (true) {
    // TODO: Start one for each user, not for each socket
    const { payload: { socketId, userId } } = yield take(remote.constants.REMOTE_AUTHORIZE);
    yield fork(userBotsStatusWatcher, socketId, userId);
  }
}

const saga = function *botsSaga() {
  yield [
    takeEveryRemote(
      remote.constants.REMOTE_RECEIVE_ACTION,
      apiConstants.API_BOT_LIST,
      handleListBots
    ),
    takeEveryRemote(
      remote.constants.REMOTE_RECEIVE_ACTION,
      apiConstants.API_BOT_FETCH,
      handleFetchBot
    ),
    fork(globalBotStatusWatcher)
  ];
};

module.exports = {
  path,
  saga
};
