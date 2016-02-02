'use strict';

const crypto = require('crypto');
const createError = require('http-errors');
const { Model } = require('mongorito');

const PASSWORD_HASH_ITERATIONS = 1000;
const PASSWORD_HASH_LENGTH = 128;
const SALT_LENGTH = 16;

module.exports = class User extends Model {
  configure() {
    this.before('create', 'checkIfExists');
    this.before('create', 'generateSalt');
    this.before('create', 'addPassword');
  }

  * checkIfExists(next) {
    const user = yield User.where('email', this.get('email')).findOne();
    if (user) {
      throw createError(400, 'The user with this email already exists');
    }
    yield next;
  }

  * generateSalt(next) {
    this.set('salt', crypto.randomBytes(SALT_LENGTH).toString('base64'));
    yield next;
  }

  * addPassword(next) {
    this.set('password', this.hashPassword(this.get('password')));
    yield next;
  }

  hashPassword(password) {
    const salt = this.get('salt');
    if (salt && password) {
      return crypto.pbkdf2Sync(password, salt, PASSWORD_HASH_ITERATIONS, PASSWORD_HASH_LENGTH).toString('base64');
    } else {
      return password;
    }
  }

  authenticate(password) {
    return this.get('password') === this.hashPassword(password);
  }
};
