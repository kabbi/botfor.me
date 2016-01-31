const mount = require('koa-mount');

const API_URL = '/api';

module.exports = function(app) {
  app.use(mount(`${API_URL}/user`, require('./user')));
};
