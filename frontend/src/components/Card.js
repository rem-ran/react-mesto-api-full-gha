import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

//компонент карточки
function Card({
  name,
  link,
  likes,
  _id,
  owner,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  //определяем какие карточки лайкнуты нами
  const isLiked = likes.some((owner) => owner._id === currentUser._id);

  //назначаем переменной стили в зависимости от того лайкнули мы карточку или нет
  const cardLikeButtonClassName = `card__like-btn ${
    isLiked && "card__like-btn_active"
  }`;

  //сравниваем id хозяина карточки и свой id
  const isOwn = owner._id === currentUser._id;

  //метод обработки открытия попапа с увеличенной картинкой
  const handleClick = () => {
    onCardClick({ name, link });
  };

  //метод обработки клика по иконке лайку
  const handleLikeClick = () => {
    onCardLike({ likes, _id });
  };

  //метод обработки клика по иконке удаления
  const handleDeleteClick = () => {
    onCardDelete({ _id });
  };

  return (
    <li className="card" id={_id}>
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />

      {/* отображаем кнопку удаления только на своих карточках */}
      {isOwn && (
        <button
          className="card__delete-btn"
          aria-label="Delete"
          type="button"
          onClick={handleDeleteClick}
        />
      )}

      <div className="card__text-box">
        <h2 className="card__heading">{name}</h2>
        <div className="card__like-box">
          <button
            className={cardLikeButtonClassName}
            aria-label="Like"
            type="button"
            onClick={handleLikeClick}
          />
          <span className="card__like-counter">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
