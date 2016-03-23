'use strict';

const config = require('../../../config');

module.exports = require('consul')(config.consul_params);
