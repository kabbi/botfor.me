'use strict';

const webpack = require('webpack');
const webpackConfig = require('../build/webpack.config');
const config = require('../config');

const debug = require('debug')('app:static-server');
const paths = config.utils_paths;
const app = require('koa')();

const server = require('http').Server(app.callback());

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(require('koa-connect-history-api-fallback')({
  verbose: false
}));

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
const serve = require('koa-static');
if (config.compiler_enable_hmr) {
  const compiler = webpack(webpackConfig);

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output;

  app.use(require('./middleware/webpack-dev')(compiler, publicPath));
  app.use(require('./middleware/webpack-hmr')(compiler));

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(serve(paths.client('static')));
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(serve(paths.base(config.dir_dist)));
}

module.exports = server;
