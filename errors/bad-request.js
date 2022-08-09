const { BAD_REQUEST_ERR } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERR;
  }
}

module.exports = BadRequestError;
