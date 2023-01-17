import React from 'react';
import logo from '../images/logo.svg';

function Header({ children }) {
  return (
    <>
      <header className="header">
        <img className="header__logo" alt="Mesto" src={logo} />
        {children}
      </header>
      <div className="header__line"></div>
    </>
  );
}

export default Header;
