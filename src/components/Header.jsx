import React from 'react';
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="Mesto" src={logo} />
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
