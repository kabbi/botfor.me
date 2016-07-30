'use strict';

const Mongorito = require('mongorito');
const debug = require('debug')('app:app-server');
const horizon = require('@horizon/server');
const http = require('http');
const jwt = require('jsonwebtoken');
const app = require('koa')();

const config = require('../../config');
const paths = config.utils_paths;

const server = new http.Server(app.callback());
// This maybe useful in our daemons
app.context.server = server;

Mongorito.connect(config.mongo_url);

const horizonServer = horizon(server, {
  project_name: 'bfmTest',
  auto_create_collection: true,
  auto_create_index: true,
  auth: {
    token_secret: 'asd_fffUuu1@W',
  }
});

// Just get us some admin token to test this shit
console.log('token', jwt.sign({
  id: 'admin',
  provider: 'local',
  iat: 1469820081,
  exp: 1469906481
}, 'asd_fffUuu1@W', {
  algorithm: 'HS512'
}));

// Load api routes
// require('./api/routes')(app);

// Start server modules
require('./modules')(app);

if (config.serve_static_files) {
  const serve = require('koa-static');
  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement isomorphic
  // rendering, you'll want to remove this middleware.
  app.use(require('koa-connect-history-api-fallback')({
    verbose: false
  }));
  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(serve(paths.base(config.dir_dist)));
} else {
  debug('Relying on external app to serve static files (api-only mode)');
}

module.exports = server;
