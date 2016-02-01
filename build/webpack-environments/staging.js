'use strict';

// Want to deploy to other environments but don't want to write
// an entirely new set of webpack overrides? You can just export
// the desired overrides and everything will _just work_.
require('debug')('app:webpack:staging')('Export production configuration.');
module.exports = require('./production');
