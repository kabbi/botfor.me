'use strict';

const config = require('../config');

const Mongorito = require('mongorito');
const debug = require('debug')('app:app-server');
const paths = config.utils_paths;
const http = require('http');
const app = require('koa')();

// Start various daemons
require('./tasks/store');

const server = new http.Server(app.callback());
const io = require('socket.io')(server, {
  path: '/api/socket.io'
});

Mongorito.connect('localhost/botforme');

io.on('connection', (socket) => {
  setInterval(() => {
    socket.emit('message', `hello, the time now: ${new Date().toTimeString()}`);
  }, 1000);
});

if (config.env === 'development') {
  app.use(require('koa-logger')());
}

// Load api routes
require('./api/routes')(app);

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
