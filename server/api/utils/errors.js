'use strict';

const debug = require('debug')('app:app-server:api:utils:errors');

exports.handleApiErrors = function *handleApiErrors(next) {
  try {
    yield next;
    if (this.body && !this.state.skipErrorPopulation) {
      this.body = {
        error: false,
        data: this.body
      };
    }
  } catch (error) {
    debug('Got an exception', error);
    if (error.expose) {
      this.status = error.status;
      this.body = {
        error: true,
        message: error.message,
        data: error.data
      };
      return;
    }
    throw error;
  }
};
