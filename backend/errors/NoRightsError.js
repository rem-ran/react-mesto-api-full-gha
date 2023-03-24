const { ERROR_CODE_403 } = require('../config');

class NoRightsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_403;
  }
}

module.exports = NoRightsError;
