const { PORT = 3000 } = process.env;
const { JWT_SECRET = 'JWT_SECRET' } = process.env;

// проверка валидности url
const regexUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9.]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#'?&//=]*)/;

// Адрес базы данных
const DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb';

// Статусы ошибок
const ERROR_CODE_400 = 400;
const ERROR_CODE_401 = 401;
const ERROR_CODE_403 = 403;
const ERROR_CODE_404 = 404;
const ERROR_CODE_409 = 409;
const ERROR_CODE_500 = 500;

// Статус сохранения на сервере
const CODE_201 = 201;

module.exports = {
  ERROR_CODE_400,
  ERROR_CODE_401,
  ERROR_CODE_403,
  ERROR_CODE_404,
  ERROR_CODE_409,
  ERROR_CODE_500,
  JWT_SECRET,
  DB_ADDRESS,
  regexUrl,
  CODE_201,
  PORT,
};
