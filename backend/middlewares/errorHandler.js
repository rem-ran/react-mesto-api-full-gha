const { ERROR_CODE_500 } = require('../config');

// централизованный обработчик ошибок
const errorHandler = ((err, req, res, next) => {
  const { statusCode = ERROR_CODE_500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_CODE_500
        ? 'На сервере произошла ошибка.'
        : message,
    });
});

module.exports = { errorHandler };
