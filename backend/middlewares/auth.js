const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthError('Необходима авторизация.'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'someKey');
  } catch (err) {
    next(new AuthError('Необходима авторизация.'));
  }

  req.user = payload;

  return next();
};
