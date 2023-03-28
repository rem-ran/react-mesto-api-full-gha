//импортируем картинку лого
import headerLogoPath from '../images/header-logo.svg';

//компонент хедера
function Header({ links, headerUserContainer }) {
  return (
    <header className="header">
      <div className="header__logo-container">
        <img
          className="header__logo"
          src={headerLogoPath}
          alt="логотип Mesto Russia белого цвета"
        />
        {links}
      </div>
      {headerUserContainer}
    </header>
  );
}

export default Header;
