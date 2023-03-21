import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

//компонент попапа с формой изменения данных пользователя
function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: currentUser.name,
      about: currentUser.about,
    },
  });

  //настройки зарегистрированных инпутов
  const inputConfig = {
    name: {
      required: "Please fill out this field",
      minLength: { value: 2, message: "Minimum 2 symbols are required" },
      maxLength: { value: 40, message: "Maximum 40 symbols are allowed" },
    },
    about: {
      required: "Please fill out this field",
      minLength: { value: 2, message: "Minimum 2 symbols are required" },
      maxLength: { value: 200, message: "Maximum 200 symbols are allowed" },
    },
  };

  //метод отображения значения импутов при первичном рендеринге попапа
  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("about", currentUser.about);
  }, [currentUser]);

  //метод обрабоки подтверждения формы попапа обновления иноформации пользователя
  function onSubmit({ name, about }) {
    onUpdateUser({
      name,
      about,
    });

    reset();
  }

  return (
    <PopupWithForm
      name="user"
      title="Редактировать профиль"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      buttonDisabled={
        (errors?.name || errors?.about) && "popup__save-btn_disabled"
      }
    >
      <input
        {...register("name", inputConfig.name)}
        className="popup__input popup__input_type_username"
        id="username"
        type="text"
        placeholder="Имя"
      />

      <span
        className={`username-error popup__error ${
          errors?.name && "popup__error_visible"
        }`}
      >
        {errors?.name && errors.name.message}
      </span>
      <input
        {...register("about", inputConfig.about)}
        className="popup__input popup__input_type_profession"
        id="user-job"
        type="text"
        placeholder="О Себе"
      />

      <span
        className={`user-job-error popup__error ${
          errors?.about && "popup__error_visible"
        }`}
      >
        {errors?.about && errors.about.message}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
