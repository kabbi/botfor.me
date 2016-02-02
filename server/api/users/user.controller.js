'use strict';

const User = require('./User.model');

exports.me = function *() {
  this.body = this.state.user;
};

exports.userById = function *(id, next) {
  this.state.user = yield User.findById(id);
  if (!this.state.user) {
    this.throw(404, 'User not found');
  }
  yield next;
};

exports.list = function *() {
  this.body = yield User.all();
};

exports.fetch = function *() {
  this.body = this.state.user;
};

exports.create = function *() {
  const user = new User(this.request.body);
  this.body = yield user.save();
};

exports.update = function *() {
  const user = new User(Object.assign(
    this.state.user,
    this.request.body, {
      _id: this.state.user.get('_id')
    }
  ));
  this.body = yield user.save();
};

exports.remove = function *() {
  yield this.state.user.remove();
  this.body = {};
};
