const User = require('./User.model');

exports.index = function *(next) {
  this.body = yield User.all();
};

exports.create = function *(next) {
  const user = new User(this.request.body);
  this.body = yield user.save();
};
