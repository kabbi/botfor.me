const controller = require('./Bot.controller.js');
const router = require('koa-router')();
const body = require('koa-body')();

router.param('botId', controller.botById);

router.get('/', controller.index);
router.post('/', body, controller.create);

router.get('/:botId', controller.fetch);
router.post('/:botId', body, controller.update);
router.delete('/:botId', controller.remove);

router.get('/:botId/status', controller.status);
router.post('/:botId/deploy', body, controller.deploy);
router.post('/:botId/start', controller.start);
router.post('/:botId/stop', controller.stop);

module.exports = router.routes();
