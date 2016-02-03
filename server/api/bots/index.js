const controller = require('./Bot.controller.js');
const router = require('koa-router')();
const body = require('koa-body')();

router.param('botId', controller.botById);

router.get('/', controller.index);
router.post('/', body, controller.create);

router.get('/:botId', controller.fetch);
router.post('/:botId', body, controller.update);
router.delete('/:botId', controller.remove);

module.exports = router.routes();
