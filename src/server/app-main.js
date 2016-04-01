'use strict';

const config = require('../../config');

const Mongorito = require('mongorito');
const debug = require('debug')('app:app-server');
const paths = config.utils_paths;
const http = require('http');
const app = require('koa')();


const server = new http.Server(app.callback());
// This maybe useful in our daemons
app.context.server = server;

Mongorito.connect(config.mongo_url);

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
