const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const { regexUrl } = require('../config');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');

// краш-тест согласно ТЗ
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// авторизация пользователя с валидацией
router.post('/signin', celebrate({

  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),

}), login);

// создание нового пользователя с валидацией
router.post('/signup', celebrate({

  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regexUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),

}), createUser);

// защита дальнейших рутов авторизацией
router.use(auth);

router.use('/cards', cardRouter);

router.use('/users', userRouter);

// обработчик несуществующего рута
router.use((req, res, next) => {
  next(new NotFoundError('Запрошен несуществующий роут.'));
});

// обработчик ошибок celebrate
router.use(errors());

module.exports = router;
