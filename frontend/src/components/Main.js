import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import Card from "./Card.js";
import Header from "./Header.js";
import Footer from "./Footer.js";

//компонент начальной страницы
function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
  userData,
  handleSignOut,
}) {
  // const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <div>
          <span className="header__email">{userData.email}</span>
          <button
            to="/sign-in"
            onClick={handleSignOut}
            className="header__link header__link_type_main"
          >
            Выйти
          </button>
        </div>
      </Header>
      <main>
        {/* секция профиля */}
        <section className="profile">
          <div className="profile__image-text">
            <img
              className="profile__image"
              src={avatar}
              alt="аватарка"
              name="avatar"
            />
            {/* кнопка редактирования аватарки профиля */}
            <button
              className="profile__image-edit-btn"
              aria-label="Edit"
              type="button"
              onClick={onEditAvatar}
            ></button>
            <div className="profile__text-box">
              <div className="profile__name-edit-box">
                <h1 className="profile__name">{name}</h1>
                {/* кнопка редактирования имени и профессии профиля */}
                <button
                  className="profile__edit-btn"
                  aria-label="Edit"
                  type="button"
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className="profile__profession">{about}</p>
            </div>
          </div>
          {/* кнопка добавления */}
          <button
            className="profile__add-btn"
            aria-label="Add"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>

        {/* секция с карточками-картинками и лайком */}
        <section className="cards">
          <ul className="cards__container">
            {cards.map((card) => (
              <Card
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                {...card}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
