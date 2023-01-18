import React from 'react';
import { Link } from 'react-router-dom';

function AuthForm({ title, btnTitle, isRegister, onAuth, email, setEmail }) {
  const [password, setPassword] = React.useState(null);

  return (
    <form className="auth__form" onSubmit={(e) => onAuth(e, email, password)}>
      <h1 className="auth__title">{title}</h1>
      <input
        onChange={(e) => setEmail(e.target.value)}
        className="auth__input"
        type="email"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        className="auth__input"
        type="password"
        placeholder="Пароль"
      />
      <button type="submit" className="auth__button">
        {btnTitle}
      </button>
      {isRegister ? (
        <p className="auth__link">
          Уже зарегистрированы?
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
