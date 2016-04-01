'use strict';

const { createConstants } = require('../utils/redux');

const constants = createConstants([
  'API_BOT_LIST',
  'API_BOT_FETCH',
  'API_BOT_STATUSES'
]);

const actions = {
  listBots: () => ({
    type: constants.API_BOT_LIST
  }),
  botList: bots => ({
    type: constants.API_BOT_LIST,
    payload: { bots }
  }),
  fetchBot: botId => ({
    type: constants.API_BOT_FETCH,
    payload: { botId }
  }),
  botFetch: bot => ({
    type: constants.API_BOT_FETCH,
    payload: { bot }
  }),
  updateBotStatuses: statuses => ({
    type: constants.API_BOT_STATUSES,
    payload: { statuses }
  })
};

module.exports = {
  constants,
  actions
};
