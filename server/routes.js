import mount from 'koa-mount';

import user from './api/user';

const API_URL = '/api';

export default function(app) {
  app.use(mount(`${API_URL}/user`, user));
};

