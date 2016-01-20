const debug = require('debug')('app:server:webpack-hmr');

module.exports = function(compiler) {
  debug('Enable Webpack Hot Module Replacement (HMR).');

  return require('koa-webpack-hot-middleware')(compiler);
};
