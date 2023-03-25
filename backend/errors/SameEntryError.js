const { ERROR_CODE_409 } = require('../config');

class SameEntryError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_409;
  }
}

module.exports = SameEntryError;
