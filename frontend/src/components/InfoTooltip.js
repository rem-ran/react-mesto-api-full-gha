import { useEffect } from "react";

function InfoTooltip({
  setInfoTooltipStatus,
  modalImg,
  onClose,
  infoModalMsg,
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
      className={`popup popup_type_info  ${
        setInfoTooltipStatus ? "popup_opened" : ""
      } `}
      onClick={handleOutsideClickClose}
    >
      <div className="popup__container popup__container_info">
        <img
          className="popup__status-img"
          src={modalImg.img}
          alt={modalImg.alt}
        />
        <h2 className={`popup__heading popup__heading_type_info`}>
          {infoModalMsg}
        </h2>

        {/* кнопка закрытия попапа */}
        <button
          className="popup__close-btn popup__close-btn_type_info"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default InfoTooltip;
