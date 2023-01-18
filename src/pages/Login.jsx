import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Header from '../components/Header';

function Login({ onLogin, email, setEmail }) {
  return (
    <div className="page">
      <div className="wrapper">
        <Header>
          <Link to="/register" className="header__link">
            Регистрация
          </Link>
        </Header>
        <AuthForm
          title="Вход"
          btnTitle="Войти"
          isRegister={false}
          onAuth={onLogin}
          email={email}
          setEmail={setEmail}
        />
      </div>
    </div>
  );
}

export default Login;
