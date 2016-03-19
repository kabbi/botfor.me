'use strict';

const User = require('./User.model');

exports.me = function *me() {
  this.body = this.state.user;
};

exports.userById = function *userById(id, next) {
  this.state.user = yield User.findById(id);
  if (!this.state.user) {
    this.throw(404, 'User not found');
  }
  yield next;
};

exports.list = function *list() {
  this.body = yield User.all();
};

exports.fetch = function *fetch() {
  this.body = this.state.user;
};

exports.create = function *create() {
  const user = new User(this.request.body);
  this.body = yield user.save();
};

exports.update = function *update() {
  const user = new User(Object.assign(
    this.state.user,
    this.request.body, {
      _id: this.state.user.get('_id')
    }
  ));
  this.body = yield user.save();
};

exports.remove = function *remove() {
  yield this.state.user.remove();
  this.body = {};
};
