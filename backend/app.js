require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { ERROR_CODE_500, DB_ADDRESS } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({ origin: ['http://localhost:3001', 'https://remran.nomoredomains.work'], credentials: true, maxAge: 300 }));

app.use(cookieParser());

app.use(express.json());

// подклчюение к mongoDB
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

// подключаем логгер запросов
app.use(requestLogger);

// краш-тест согласно ТЗ
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// подключаем руты
app.use(routes);

// подключаем логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  const { statusCode = ERROR_CODE_500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_CODE_500
        ? 'На сервере произошла ошибка.'
        : message,
    });
});

app.listen(PORT);
