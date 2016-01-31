const ExtendableError = require('es6-error');

exports.ApiError = class ApiError extends ExtendableError {
  constructor(message, data, code = 400) {
    super(message);
    this.code = code;
    this.data = data;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      ...this.data
    };
  }
};

exports.handleApiErrors = function *(next) {
  try {
    yield next;
  } catch (e) {
    if (e instanceof exports.ApiError) {
      this.status = e.code;
      this.body = {
        error: true,
        exception: e
      };
      return;
    }
    throw e;
  }
};
