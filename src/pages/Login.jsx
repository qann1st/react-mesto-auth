import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Header from '../components/Header';

function Login() {
  return (
    <div className="page">
      <div className="wrapper">
        <Header>
          <Link to="/register" className="header__link">
            Регистрация
          </Link>
        </Header>
        <AuthForm title="Вход" btnTitle="Войти" />
      </div>
    </div>
  );
}

export default Login;
