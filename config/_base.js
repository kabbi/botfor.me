'use strict';

/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path');
const { argv } = require('yargs');

const debug = require('debug')('app:config:_base');
const config = {
  env : process.env.NODE_ENV,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '../'),
  dir_client : 'src',
  dir_dist   : 'dist',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // App Configuration
  // ----------------------------------

  consul_params : {
    host: '192.168.140.42',
    promisify: true
  },

  nomad_host : 'http://192.168.140.42:4646',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : 'localhost',
  app_server_port : process.env.PORT || 3042,
  static_server_port : process.env.PORT || 3000,
  serve_static_files : true,
  // TODO: also implement jwt token expiration
  jwt_shared_secret: 'botforsecret-23442-asEsswP',

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_css_modules     : false,
  compiler_enable_hmr      : false,
  compiler_globals         : {
    'React' : 'react',
    'ReactDOM' : 'react-dom',
    // react-bootstrap
    'Grid': 'react-bootstrap/lib/Grid',
    'Row': 'react-bootstrap/lib/Row',
    'Col': 'react-bootstrap/lib/Col'
  },
  compiler_source_maps     : true,
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendor : [
    'history',
    'react',
    'react-redux',
    'react-router',
    'redux',
    'redux-actions',
    'redux-simple-router'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_enabled   : !argv.watch,
  coverage_reporters : [
    { type : 'text-summary' },
    { type : 'html', dir : 'coverage' }
  ]
};

/************************************************
-------------------------------------------------

All Internal Configuration Below
Edit at Your Own Risk

-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__API_HOST__' : `'http://${config.server_host}:${config.app_server_port}'`,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__DEBUG__'    : config.env === 'development' && !argv.no_debug,
  '__DEBUG_NEW_WINDOW__' : !!argv.nw,
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '/'),
  '__MAINTAINING_MODE__': process.env.MAINTAINING_MODE
};

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json');

config.compiler_vendor = config.compiler_vendor
  .filter(dep => {
    if (pkg.dependencies[dep]) return true;

    debug(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.\n` +
      `Consider removing it from vendor_dependencies in ~/config/index.js`
    );
  });

// ------------------------------------
// Utilities
// ------------------------------------
config.utils_paths = (() => {
  const resolve = path.resolve;

  const base = (...args) =>
    resolve.apply(resolve, [config.path_base, ...args]);

  return {
    base   : base,
    client : base.bind(null, config.dir_client),
    dist   : base.bind(null, config.dir_dist)
  };
})();

module.exports = config;
