'use strict';

const jwt = require('koa-jwt');

const config = require('../../../config');

exports.createToken = id => (
  // TODO: implement token expiration
  jwt.sign({ id }, config.jwt_shared_secret)
);

exports.verifyToken = token => (
  jwt.verify(token, config.jwt_shared_secret).id
);
