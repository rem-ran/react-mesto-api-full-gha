import { useEffect } from "react";

//компонент попапа с формой
function PopupWithForm({
  children,
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  buttonDisabled,
}) {
  //вешаем слушатель на зактрые модального окна по нажатию ESC клавиши
  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();

        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  //метод закрытия модального окна по клику вне модального окна
  const handleOutsideClickClose = (e) => {
    if (e.target.classList.contains("popup_opened")) {
      onClose();
    }
  };

  return (
    <section
      className={`popup form popup_type_${name} ${
        isOpen ? "popup_opened" : ""
      }`}
      onClick={handleOutsideClickClose}
    >
      <div className={`popup__container popup__container_${name}`}>
        <h2 className={`popup__heading popup__heading_type_${name}`}>
          {title}
        </h2>

        <form
          className={`popup__form popup__form_type_${name}`}
          method="get"
          name={name}
          onSubmit={onSubmit}
        >
          {children}

          {/* кнопка сохранения данных */}
          <button
            className={`popup__save-btn popup__save-btn_type_${name} ${buttonDisabled}`}
            type="submit"
            onClick={onSubmit}
          >
            {buttonText}
          </button>
        </form>

        {/* кнопка закрытия попапа без сохранения данных */}
        <button
          className={`popup__close-btn popup__close-btn_type_${name}`}
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
      </div>
    </section>
  );
}
export default PopupWithForm;
