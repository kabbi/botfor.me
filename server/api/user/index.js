const controller = require('./user.controller.js');
const router = require('koa-router')();
const body = require('koa-body')();

router.get('/', controller.index);
router.post('/', body, controller.create);

module.exports = router.routes();
