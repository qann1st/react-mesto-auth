import React from 'react';
import { Link } from 'react-router-dom';

function AuthForm({ title, btnTitle, isRegister }) {
  return (
    <form className="auth__form">
      <h1 className="auth__title">{title}</h1>
      <input className="auth__input" type="email" placeholder="Email" />
      <input className="auth__input" type="password" placeholder="Пароль" />
      <button type="submit" className="auth__button">
        {btnTitle}
      </button>
      {isRegister ? (
        <p className="auth__link">
          Уже зарегистрированы?{' '}
          <Link className="auth__link_link" to="/login">
            Войти
          </Link>
        </p>
      ) : (
        ''
      )}
    </form>
  );
}

export default AuthForm;
