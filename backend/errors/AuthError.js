const { ERROR_CODE_401 } = require('../config');

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_401;
  }
}

module.exports = AuthError;
