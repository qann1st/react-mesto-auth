import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Register() {
  return (
    <div className="page">
      <div className="wrapper">
        <Header>
          <Link to="/login" className="header__link">
            Войти
          </Link>
        </Header>
      </div>
    </div>
  );
}

export default Register;
