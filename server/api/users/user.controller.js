const User = require('./User.model');
const { ApiError } = require('../utils/errors');

exports.userById = function *(id, next) {
  this.state.user = yield User.findById(id);
  if (!this.state.user) {
    throw new ApiError('User not found', { id }, 404);
  }
  yield next;
};

exports.index = function *() {
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
  const user = new User({
    ...this.state.user,
    ...this.request.body,
    _id: this.state.user.get('_id')
  });
  this.body = yield user.save();
};

exports.remove = function *() {
  yield this.state.user.remove();
  this.body = {};
};
