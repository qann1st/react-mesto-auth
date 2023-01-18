import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ children }) {
  return (
    <>
      <header className="header">
        <Link to="/">
          <img className="header__logo" alt="Mesto" src={logo} />
        </Link>
        {children}
      </header>
      <div className="header__line"></div>
    </>
  );
}

export default Header;
