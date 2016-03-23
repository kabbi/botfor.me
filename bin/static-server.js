'use strict';

const config = require('../config');
const server = require('../src/server/static-main');
const debug = require('debug')('app:bin:static-server');

const port = config.static_server_port;

server.listen(port);
debug(`Server is now running at localhost:${port}.`);
