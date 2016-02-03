const ValidatedModel = require('../utils/ValidatedModel');

module.exports = class Bot extends ValidatedModel {
  getSchema() {
    return {
      type: 'object',
      properties: Object.assign(super.getSchema().properties, {
        name: {
          type: 'string',
          minLength: 1
        },
        tags: {
          type: 'string',
          minLength: 1
        }
      }),
      additionalProperties: false,
      required: [
        ...super.getSchema().required,
        'name', 'tags'
      ]
    };
  }
};
