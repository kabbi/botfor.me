const jwt = require('koa-jwt');
const User = require('../users/User.model');
const config = require('../../../config');

exports.signin = function *(next) {
  const { email, password } = this.request.body;
  const user = yield User.where('email', email).findOne();

  if (!user || !user.authenticate(password)) {
    this.throw(400, 'Unknown email or password');
  }

  this.body = {
    token: jwt.sign({
      userId: user.get('_id')
    }, config.jwt_shared_secret, {
      expiresIn: '7d'
    }),
    user
  };
};

exports.signup = function *(next) {
  const user = new User(this.request.body);
  yield user.save();

  this.body = {
    token: jwt.sign({
      userId: user.get('_id')
    }, config.jwt_shared_secret, {
      expiresIn: '7d'
    }),
    user
  };
};
