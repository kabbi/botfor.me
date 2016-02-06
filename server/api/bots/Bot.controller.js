'use strict';

const Bot = require('./Bot.model');
const NomadClient = require('../utils/NomadClient');
const { ApiError } = require('../utils/errors');
const config = require('../../../config');

const consul = require('consul')(config.consul_params);

exports.botById = function *(id, next) {
  this.state.bot = yield Bot.findById(id);
  if (!this.state.bot) {
    throw new ApiError('Bot not found', { id }, 404);
  }
  yield next;
};

exports.index = function *() {
  this.body = yield Bot.all();
};

exports.fetch = function *() {
  this.body = this.state.bot;
};

exports.create = function *() {
  const bot = new Bot(this.request.body);
  this.body = yield bot.save();
};

exports.update = function *() {
  const data = this.request.body;
  const { bot } = this.state;
  for (const key of Object.keys(data)) {
    console.log(key, data[key]);
    bot.set(key, data[key]);
  }
  console.log(bot);
  this.body = yield bot.save();
};

exports.remove = function *() {
  yield this.state.bot.remove();
  this.body = {};
};

exports.deploy = function *() {
  const code = JSON.stringify(this.request.body);
  yield consul.kv.set(`nodely/flows/${this.state.bot.get('_id')}/data`, code);

  this.state.bot.set('code', code);
  yield this.state.bot.save();

  this.body = {};
};

exports.status = function *() {
  const { bot } = this.state;
  const jobId = `flow:${bot.get('_id')}`;
  const alloc = yield NomadClient.job.lastAllocation({ jobId });

  const statusTranslations = {
    'dead': 'not running'
  };

  this.body = {
    status: statusTranslations[alloc.ClientStatus] || alloc.ClientStatus,
    started: bot.get('started')
  };
};

exports.start = function *() {
  const { bot } = this.state;
  this.state.bot.set('started', true);
  yield this.state.bot.save();

  const jobId = `flow:${bot.get('_id')}`;
  yield NomadClient.job.create({ jobId }, {
    'Job': {
      'Region': 'dev',
      'ID': jobId,
      'Name': jobId,
      'Type': 'service',
      'Priority': 50,
      'AllAtOnce': false,
      'Datacenters': ['nodely'],
      'Constraints': [{
        'LTarget': '$attr.kernel.name',
        'RTarget': 'linux',
        'Operand': '='
      }],
      'TaskGroups': [{
        'Name': 'flows',
        'Count': 1,
        'Constraints': null,
        'Tasks': [{
          'Name': 'flow-executor',
          'Driver': 'raw_exec',
          'Config': {
            'args': ['/vagrant/index.js', 'agent'],
            'command': '/usr/bin/node'
          },
          'Constraints': null,
          'Env': {
            'nodely_consul__token': 'KePCPQEnPLQw5GvAfc2LsvtlP4',
            'nodely_flowId': bot.get('_id')
          },
          'Services': [{
            'Id': '',
            'Name': 'flow:demo-flow',
            'Tags': ['agent', 'flow'],
            'PortLabel': '',
            'Checks': null
          }],
          'Resources': {
            'CPU': 100,
            'MemoryMB': 64,
            'DiskMB': 0,
            'IOPS': 0,
            'Networks': [{
              'Public': false,
              'CIDR': '',
              'ReservedPorts': null,
              'DynamicPorts': null,
              'MBits': 1
            }]
          },
          'Meta': null
        }],
        'RestartPolicy': {
          'Interval': 300000000000,
          'Attempts': 10,
          'Delay': 25000000000
        },
        'Meta': null
      }],
      'Update': {
        'Stagger': 10000000000,
        'MaxParallel': 1
      },
      'Meta': null,
      'Status': '',
      'StatusDescription': '',
      'CreateIndex': 0,
      'ModifyIndex': 0
    }
  });

  this.body = {};
};

exports.stop = function *() {
  const { bot } = this.state;
  const jobId = `flow:${bot.get('_id')}`;
  this.state.bot.set('started', false);
  yield this.state.bot.save();

  yield NomadClient.job.destroy({ jobId });

  this.body = {};
};
