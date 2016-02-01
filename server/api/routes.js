'use strict';

const mount = require('koa-mount');

const API_URL = '/api';

module.exports = function(app) {
  app.use(require('./utils/errors').handleApiErrors);
  app.use(mount(`${API_URL}/users`, require('./users')));
};
