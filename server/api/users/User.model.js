'use strict';

const { Model } = require('mongorito');
const { ApiError } = require('../utils/errors');

module.exports = class User extends Model {
  configure() {
    this.before('create', 'checkIfExists');
  }
  * checkIfExists() {
    const user = yield User.where('email', this.get('email')).findOne();
    if (user) {
      throw new ApiError('The user with this email already exists');
    }
  }
};
