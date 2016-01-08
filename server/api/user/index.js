import koaRouter from 'koa-router';

import * as controller from './user.controller.js';

const router = koaRouter();

router.get('/', controller.index);

export default (router.routes());
