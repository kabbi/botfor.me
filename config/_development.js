'use strict';

/* eslint key-spacing:0 */
const { argv } = require('yargs');

module.exports = (config) => {
  const HMR_ENABLED = !!argv.hot;
  const overrides = {
    compiler_enable_hmr : HMR_ENABLED,
    serve_static_files  : false
  };

  // We use an explicit public path when the assets are served by webpack
  // to fix this issue:
  // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
  if (HMR_ENABLED) {
    overrides.compiler_public_path = (
      `http://${config.server_host}:${config.static_server_port}/`
    );
  }

  return overrides;
};
