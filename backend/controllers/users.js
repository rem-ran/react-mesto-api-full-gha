const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');

// импорт собственных ошибок
const NotFoundError = require('../errors/NotFoundError');
const SameEntryError = require('../errors/SameEntryError');
const ValidationError = require('../errors/ValidationError');

// контроллер получения имеющихся пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// контроллер получания пользователя
module.exports.getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => res.send(user))
    .catch(next);
};

// контроллер поиска пользователя по его id
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)

    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }

      return res.send(user);
    })

    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('_id указан некорректно.'));
      }

      return next(err);
    });
};

// контроллер создания нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)

    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))

    .then(() => {
      res.send(
        new User({
          name,
          about,
          avatar,
          email,
        }),
      );
    })

    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(err));
      }

      if (err.code === 11000) {
        return next(
          new SameEntryError('Пользователь с таким email уже существует'),
        );
      }

      return next(err);
    });
};

// общий контроллер обновления данных пользователя
module.exports.updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    avatar
      ? { avatar }
      : { name, about },
    { runValidators: true },
  )

    .then((user) => res.send(
      avatar
        ? {
          name: user.name,
          about: user.about,
          avatar,
          _id: user._id,
        }
        : {
          name,
          about,
          avatar: user.avatar,
          _id: user._id,
        },
    ))

    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(err));
      }

      return next(err);
    });
};

// контроллер логина пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const { NODE_ENV, JWT_SECRET } = process.env;

  return User.findUserByCredentials(email, password)

    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        })

        .send({
          email,
          about: user.about,
          avatar: user.avatar,
          name: user.name,
          _id: user._id,
        });
    })

    .catch(next);
};
