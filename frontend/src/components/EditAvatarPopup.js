import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";

//компонент попапа с формой обновления аватарки пользователя
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const inputConfig = {
    avatar: {
      required: "Please fill out this field",
      pattern: {
        value:
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
        message: "Please enter a web address",
      },
    },
  };

  //метод обрабоки подтверждения формы попапа обновления аватара пользователя
  const onSubmit = ({ avatar }) => {
    onUpdateAvatar({
      avatar,
    });

    reset();
  };

  const onAvatarPopupClose = () => {
    onClose();
    reset();
  };

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={isOpen}
      onClose={onAvatarPopupClose}
      buttonDisabled={errors?.avatar && "popup__save-btn_disabled"}
    >
      <input
        {...register("avatar", inputConfig.avatar)}
        className="popup__input popup__input_type_avatar-link"
        id="avatar-link"
        type="url"
        placeholder="Ссылка на аватарку"
      />

      <span
        className={`avatar-link-error popup__error ${
          errors?.avatar && "popup__error_visible"
        }`}
      >
        {errors?.avatar && errors.avatar.message}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
