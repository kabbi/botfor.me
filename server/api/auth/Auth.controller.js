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
      id: user.get('_id')
    }, config.jwt_shared_secret),
    user
  };
};

exports.signup = function *(next) {
  const { body } = this.request;

  // TODO: is there a better way?
  if (body.confirmPassword !== body.password) {
    this.throw(400, 'The confirmed password doesn\'t match');
  }
  delete body.confirmPassword;

  const user = new User(body);
  yield user.save();

  this.body = {
    token: jwt.sign({
      id: user.get('_id')
    }, config.jwt_shared_secret),
    user
  };
};
