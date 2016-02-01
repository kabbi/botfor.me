'use strict';

const debug = require('debug')('app:config');
debug('Create configuration.');
const base = require('./_base');

debug(`Apply environment overrides for NODE_ENV "${base.env}".`);
let overrides;
try {
  overrides = require(`./_${base.env}`)(base);
} catch (e) {
  debug(
    `No configuration overrides found for NODE_ENV "${base.env}"`
  );
}

module.exports = Object.assign({}, base, overrides);
