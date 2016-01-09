const controller = require('./user.controller.js');
const router = require('koa-router')();

router.get('/', controller.index);

module.exports = router.routes();
