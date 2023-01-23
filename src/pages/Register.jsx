import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Header from '../components/Header';

function Register({ email, setEmail, onRegister }) {
  function handleSubmit(e, email, password) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="wrapper">
      <Header>
        <Link to="/login" className="header__link">
          Войти
        </Link>
      </Header>
      <AuthForm
        title="Регистрация"
        btnTitle="Зарегистрироваться"
        isRegister={true}
        onAuth={handleSubmit}
        email={email}
        setEmail={setEmail}
      />
    </div>
  );
}

export default Register;
