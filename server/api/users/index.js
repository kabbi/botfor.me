const controller = require('./user.controller.js');
const router = require('koa-router')();
const body = require('koa-body')();

router.param('userId', controller.userById);

router.get('/', controller.index);
router.post('/', body, controller.create);

router.get('/:userId', controller.fetch);
router.post('/:userId', body, controller.update);
router.delete('/:userId', controller.remove);

module.exports = router.routes();
