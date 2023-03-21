import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

//компонент попапа с формой добавления новой карточки
function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  //настройки зарегистрированных инпутов
  const inputConfig = {
    name: {
      required: "Please fill out this field",
      minLength: { value: 2, message: "Minimum 2 symbols are required" },
      maxLength: { value: 30, message: "Maximum 30 symbols are allowed" },
    },
    link: {
      required: "Please fill out this field",
      pattern: {
        value:
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
        message: "Please enter a web address",
      },
    },
  };

  //метод обрабоки подтверждения формы попапа добавления карточки
  function onSubmit({ name, link }) {
    onAddPlace({
      name,
      link,
    });

    reset();
  }

  //добавляем ошистку полей при закрытии через крестик
  const onAddPlacePopupClose = () => {
    onClose();
    reset();
  };

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onAddPlacePopupClose}
      onSubmit={handleSubmit(onSubmit)}
      buttonDisabled={
        (errors?.name || errors?.link) && "popup__save-btn_disabled"
      }
    >
      <input
        {...register("name", inputConfig.name)}
        className="popup__input popup__input_type_card-name"
        id="card-name"
        type="text"
        placeholder="Название"
      />

      <span
        className={`card-name-error popup__error ${
          errors?.name && "popup__error_visible"
        }`}
      >
        {errors?.name && errors.name.message}
      </span>

      <input
        {...register("link", inputConfig.link)}
        className="popup__input popup__input_type_card-link"
        id="img-link"
        type="url"
        placeholder="Ссылка на картинку"
      />

      <span
        className={`img-link-error popup__error ${
          errors?.link && "popup__error_visible"
        }`}
      >
        {errors?.link && errors.link.message}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
