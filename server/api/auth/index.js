'use strict';

const controller = require('./Auth.controller.js');
const router = require('koa-router')();
const body = require('koa-body')();

router.post('/signin', body, controller.signin);
router.post('/signup', body, controller.signup);

module.exports = router.routes();
