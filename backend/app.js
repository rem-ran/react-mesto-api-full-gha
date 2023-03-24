require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { ERROR_CODE_500, DB_ADDRESS } = require('./utils/constants');
const { regexUrl } = require('./utils/regexUrl');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({ origin: ['https://remran.nomoredomains.work'], credentials: true, maxAge: 300 }));

app.use(cookieParser());

app.use(express.json());

// подклчюение к mongoDB
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

// подключаем логгер запросов
app.use(requestLogger);

// краш-тест
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// авторизация пользователя с валидацией
app.post('/signin', celebrate({

  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),

}), login);

// создание нового пользователя с валидацией
app.post('/signup', celebrate({

  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),

}), createUser);

// защита дальнейших рутов авторизацией
app.use(auth);

app.use('/cards', cardRouter);

app.use('/users', userRouter);

// обработчик несуществующего рута
app.use((req, res, next) => {
  next(new NotFoundError('Запрошен несуществующий роут.'));
});

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
