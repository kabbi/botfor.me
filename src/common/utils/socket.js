'use strict';

const { CANCEL } = require('redux-saga/effects');

exports.waitForEvent = (socket, event) => {
  let listener = null;
  const promise = new Promise(resolve => {
    socket.once(event, resolve);
    listener = resolve;
  });
  promise[CANCEL] = () => {
    socket.removeListener(event, listener);
  };
  return promise;
};
