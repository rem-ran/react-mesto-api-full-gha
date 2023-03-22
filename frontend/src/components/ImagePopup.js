//компонент попапа с увеличенной картинкой
function ImagePopup({ card, isOpen, onClose }) {
  return (
    //из пропса isOpen определяем открыт попап или нет
    <section className={`popup image-zoom ${isOpen ? "popup_opened" : ""}`}>
      <figure className="image-zoom__container">
        <img className="image-zoom__image" src={card.link} alt={card.name} />

        <button
          className="popup__close-btn image-zoom__close-btn"
          aria-label="Close"
          type="button"
          onClick={onClose}
        ></button>

        <figcaption className="image-zoom__caption">{card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
