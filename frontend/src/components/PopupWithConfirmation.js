import PopupWithForm from "./PopupWithForm";

//компонент попапа с формой подтверждения удаления карточки
function PopupWithConfirmation({
  isOpen,
  onClose,
  onCardDelete,
  cardToDelete,
  isLoading,
}) {
  //метод обрабоки подтверждения формы попапа подтверждения удаления карточки
  const handleSubmit = (e) => {
    e.preventDefault();

    onCardDelete(cardToDelete);
  };

  return (
    <PopupWithForm
      name="card-submit"
      title="Вы уверены?"
      buttonText={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default PopupWithConfirmation;
