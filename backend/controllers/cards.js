const mongoose = require('mongoose');
const Card = require('../models/card');

const { CODE_201 } = require('../config');

// импорт собственных ошибок
const NotFoundError = require('../errors/NotFoundError');
const NoRightsError = require('../errors/NoRightsError');
const ValidationError = require('../errors/ValidationError');

// контроллер получения имеющихся карточек
module.exports.getCards = (req, res, next) => {
  Card.find({})

    .populate(['likes', 'owner'])

    .then((cards) => res.send(cards))

    .catch(next);
};

// контроллер создания новой карточки
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })

    .then((card) => card.populate('owner'))

    .then((card) => res.status(CODE_201).send(card))

    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(err));
      }

      return next(err);
    });
};

// контроллер удаления карточки
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById(cardId)

    .populate(['likes', 'owner'])

    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному _id не найдена.');
      }

      if (card.owner._id.toString() !== _id.toString()) {
        throw new NoRightsError('Нельзя удалять чужие карточки.');
      }

      return Card.deleteOne({ _id: cardId });
    })

    .then(() => res.send({ message: 'Карточка удалена.' }))

    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new NotFoundError('Указан некорректный id карточки.'));
      }

      return next(err);
    });
};

// контроллер постановки лайка карточке
module.exports.putCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .populate(['likes', 'owner'])

    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному _id не найдена.');
      }

      return res.send(card);
    })

    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new NotFoundError('Указан некорректный id карточки.'));
      }

      return next(err);
    });
};

// контроллер удаления лайка у карточки
module.exports.deleteCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['likes', 'owner'])

    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному _id не найдена.');
      }

      return res.send(card);
    })

    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new NotFoundError('Указан некорректный id карточки.'));
      }

      return next(err);
    });
};
