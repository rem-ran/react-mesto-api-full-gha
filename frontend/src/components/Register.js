import { Link } from "react-router-dom";
import CommonLoginPage from "./CommonLoginPage";
import Header from "./Header";

function Register({ handleUserSignUp }) {
  return (
    <>
      <Header>
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      </Header>
      <CommonLoginPage
        handleUserSubmit={handleUserSignUp}
        heading={"Регистрация"}
        btnTxt={"Зарегистрироваться"}
      >
        <Link to="/sign-in" className="login__link">
          Уже зарегистрировались? Войти
        </Link>
      </CommonLoginPage>
    </>
  );
}

export default Register;
