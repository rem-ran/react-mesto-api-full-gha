import { useForm } from "react-hook-form";

//общий компонент для регистрации и авторизации
function CommonLoginPage({ children, heading, btnTxt, handleUserSubmit }) {
  const { register, handleSubmit, reset } = useForm({
    mode: "onBlur",
  });

  function onSubmit(inputData) {
    handleUserSubmit(inputData);
    reset();
  }

  return (
    <div className="login login__container">
      <h2 className="login__heading">{heading}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login__form">
        <input
          {...register("email", { required: true })}
          id="email"
          type="email"
          className="login__input"
          placeholder="Email"
        />
        <input
          {...register("password", { required: true })}
          id="password"
          type="password"
          className="login__input"
          placeholder="Пароль"
        />
        <button className="login__submit-btn">{btnTxt}</button>
      </form>
      {children}
    </div>
  );
}

export default CommonLoginPage;
