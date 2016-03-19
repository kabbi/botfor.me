'use strict';

const crypto = require('crypto');
const createError = require('http-errors');
const ValidatedModel = require('../utils/ValidatedModel');

const PASSWORD_HASH_ITERATIONS = 1000;
const PASSWORD_HASH_LENGTH = 128;
const SALT_LENGTH = 16;

module.exports = class User extends ValidatedModel {
  static getPrivateFields() {
    return [
      'password', 'salt'
    ];
  }

  getSchema() {
    return {
      type: 'object',
      properties: Object.assign(super.getSchema().properties, {
        email: {
          type: 'string',
          minLength: 3
        },
        name: {
          type: 'string',
          minLength: 2
        },
        password: {
          type: 'string',
          minLength: 6
        },
        salt: {
          type: 'string'
        }
      }),
      additionalProperties: false,
      required: [
        ...super.getSchema().required,
        'email', 'name', 'password', 'salt'
      ]
    };
  }

  configure() {
    super.configure();
    this.before('create', 'checkIfExists');
    this.before('create', 'generateSalt');
    this.before('create', 'addPassword');
  }

  *checkIfExists(next) {
    const user = yield User.where('email', this.get('email')).findOne();
    if (user) {
      throw createError(400, 'The user with this email already exists');
    }
    yield next;
  }

  *generateSalt(next) {
    this.set('salt', crypto.randomBytes(SALT_LENGTH).toString('base64'));
    yield next;
  }

  *addPassword(next) {
    this.set('password', this.hashPassword(this.get('password')));
    yield next;
  }

  hashPassword(password) {
    const salt = this.get('salt');
    if (salt && password) {
      return crypto.pbkdf2Sync(
        password, salt, PASSWORD_HASH_ITERATIONS, PASSWORD_HASH_LENGTH
      ).toString('base64');
    }
    return password;
  }

  authenticate(password) {
    return this.get('password') === this.hashPassword(password);
  }

  toJSON() {
    const attributes = Object.assign({}, this.attributes);
    for (const field of User.getPrivateFields()) {
      delete attributes[field];
    }
    return attributes;
  }
};
