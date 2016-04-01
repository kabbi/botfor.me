'use strict';

const modules = [
  require('./auth'),
  require('./bots')
];

exports.anonymousActions = modules.reduce((actions, module) => {
  for (const action of module.anonymousActions || []) {
    actions[action] = true;
  }
  return actions;
}, {});

exports.serverOnlyActions = modules.reduce((actions, module) => {
  for (const action of module.serverOnlyActions || []) {
    actions[action] = true;
  }
  return actions;
}, {});
