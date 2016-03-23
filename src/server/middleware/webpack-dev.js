'use strict';

const config = require('../../../config');

const paths = config.utils_paths;
const debug = require('debug')('app:server:webpack-dev');

module.exports = (compiler, publicPath) => {
  debug('Enable webpack dev middleware.');

  return require('koa-webpack-dev-middleware')(compiler, {
    publicPath,
    contentBase: paths.base(config.dir_client),
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  });
};
