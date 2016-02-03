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
  this.body = this.state.bot;
};

exports.create = function *() {
  const bot = new Bot(this.request.body);
  this.body = yield bot.save();
};

exports.update = function *() {
  const bot = new Bot(Object.assign(
    this.state.bot,
    this.request.body, {
      _id: this.state.bot.get('_id')
    }
  ));
  this.body = yield bot.save();
};

exports.remove = function *() {
  yield this.state.bot.remove();
  this.body = {};
};
