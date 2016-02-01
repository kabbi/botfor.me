'use strict';

const webpack = require('webpack');
const config = require('../../config');

const debug = require('debug')('app:webpack:production');

module.exports = (webpackConfig) => {
  debug('Create configuration.');

  if (config.compiler_source_maps) {
    debug('Source maps enabled for production.');
    webpackConfig.devtool = 'source-map';
  } else {
    debug('Source maps are disabled in production.');
  }

  debug('Apply UglifyJS plugin.');
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true
      }
    })
  );

  return webpackConfig;
};
