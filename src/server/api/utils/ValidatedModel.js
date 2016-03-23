'use strict';

const tv4 = require('tv4');
const createError = require('http-errors');
const { Model } = require('mongorito');

module.exports = class ValidatedModel extends Model {
  configure() {
    this.before('save', 'validateSchema');
  }

  *validateSchema(next) {
    const result = tv4.validateMultiple(this.attributes, this.getSchema());
    if (!result.valid) {
      const fields = {};
      // Map error values to the field names
      for (const error of result.errors) {
        const fieldName = error.params.key || error.dataPath.slice(1).replace('/', '.');
        fields[fieldName] = error.message;
      }
      throw createError(400, 'The supplied data is invalid', {
        data: fields
      });
    }
    yield next;
  }

  /**
   * This is the default schema for every
   * mongodb model.
   */
  getSchema() {
    return {
      type: 'object',
      properties: {
        _id: {
          type: 'object'
        },
        created_at: {
          type: 'object'
        },
        updated_at: {
          type: 'object'
        }
      },
      required: [
        'created_at',
        'updated_at'
      ]
    };
  }
};
