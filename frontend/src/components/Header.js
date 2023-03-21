//импортируем картинку лого
import headerLogoPath from "../images/header-logo.svg";

//компонент хедера
function Header({ children }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogoPath}
        alt="логотип Mesto Russia белого цвета"
      />
      {children}
    </header>
  );
}

export default Header;
