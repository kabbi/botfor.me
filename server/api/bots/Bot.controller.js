const Bot = require('./Bot.model');
const { ApiError } = require('../utils/errors');

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
  this.body = this.state.user;
};

exports.create = function *() {
  const user = new Bot(this.request.body);
  this.body = yield user.save();
};

exports.update = function *() {
  const user = new Bot({
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
