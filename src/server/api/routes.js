'use strict';

const mount = require('koa-mount');
const cors = require('koa-cors');
const jwt = require('koa-jwt');
const config = require('../../../config');

const API_URL = '/api';

module.exports = (app) => {
  // Public middleware and routes
  app.use(cors());
  app.use(require('./utils/errors').handleApiErrors);
  app.use(mount(`${API_URL}/auth`, require('./auth')));

  // Everything below this line is protected by jwt tokens
  app.use(jwt({ secret: config.jwt_shared_secret }));

  // Private routes
  app.use(mount(`${API_URL}/users`, require('./users')));
  app.use(mount(`${API_URL}/bot`, require('./bots')));
};
