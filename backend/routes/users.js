const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexUrl } = require('../config');

const {
  getUsers,
  getUser,
  getUserById,
  updateUser,
} = require('../controllers/users');

// рутер получение имеющихся пользователей
router.get('/', getUsers);

// рутер получения своего пользователя
router.get('/me', getUser);

// рутер поиска пользователя по его id
router.get('/:userId', celebrate({

  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),

}), getUserById);

// рутер обновление данных пользователя
router.patch('/me', celebrate({

  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),

}), updateUser);

// рутер обновление аватара пользователя
router.patch('/me/avatar', celebrate({

  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexUrl),
  }),

}), updateUser);

module.exports = router;
