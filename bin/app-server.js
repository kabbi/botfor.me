require('babel-register');

const config = require('../config');
const server = require('../server/app-main');
const debug = require('debug')('app:bin:app-server');

const port = config.app_server_port;

server.listen(port);
debug('Server is now running at localhost:' + port + '.');
