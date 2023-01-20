import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Header from '../components/Header';
import AuthPopup from '../components/popups/AuthPopup';
import { authApi } from '../utils/Api';

function Register({ email, setEmail }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isGood, setIsGood] = React.useState(false);

  function handleRegister(e, email, password) {
    e.preventDefault();
    authApi
      .newUser(email, password)
      .then(() => {
        setIsOpen(true);
        setIsGood(true);
      })
      .catch((err) => {
        console.error(err);
        setIsOpen(true);
        setIsGood(false);
      });
  }

  return (
    <div className="page">
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
          onAuth={handleRegister}
          email={email}
          setEmail={setEmail}
        />
        <AuthPopup
          isGood={isGood}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          email={email}
          setEmail={setEmail}
        />
      </div>
    </div>
  );
}

export default Register;
