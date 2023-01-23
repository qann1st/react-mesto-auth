import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ImagePopup from './components/popups/ImagePopup';
import PopupEditAvatar from './components/popups/PopupEditAvatar';
import PopupEditProfile from './components/popups/PopupEditProfile';
import PopupNewPlace from './components/popups/PopupNewPlace';
import PrivateOutlet from './components/PrivateOutlet';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { api, authApi } from './utils/Api';
import AuthPopup from './components/popups/AuthPopup';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isAuth, setIsAuth] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [email, setEmail] = React.useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentAvatar, setCurrentAvatar] = React.useState(null);
  const [isGood, setIsGood] = React.useState(false);
  const [registrationMessage, setRegistrationMessage] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoading(true);
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        return api.getInitialCards();
      })
      .then((cards) => {
        setCards(cards);
        handleCheck()
          .then(() => {})
          .finally(() => {
            setIsLoading(false);
          });
      })
      .catch((err) => console.log(err));
  }, []);

  function handleLogin(e, email, password) {
    e.preventDefault();
    authApi
      .loginUser(email, password)
      .then(({ token }) => {
        localStorage.setItem('jwt', token);
        localStorage.setItem('email', email);
        authApi.setToken('Bearer ' + token);
      })
      .finally(() => {
        handleCheck().then(() => {
          setIsAuth(true);
          navigate('/');
        });
      });
  }

  function handleCheck() {
    return authApi.authUser().then((res) => {
      setEmail(res.email);
      setIsAuth(true);
      navigate('/');
    });
  }

  function handleOpenInfoPopup(isGood, message) {
    setIsInfoPopupOpen(true);
    setIsGood(isGood);
    setRegistrationMessage(message);
  }

  function handleRegister(email, password) {
    authApi
      .newUser(email, password)
      .then(() => {
        handleOpenInfoPopup(true, 'Вы успешно зарегистрировались!');
      })
      .catch((err) => {
        console.error(err);
        handleOpenInfoPopup(false, 'Что-то пошло не так! Попробуйте ещё раз.');
      });
  }

  function handleLogout() {
    authApi.removeToken();
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    setIsAuth(false);
    navigate('/auth');
    handleCheck();
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data).then((res) => setCurrentUser(res));
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data).then((res) => setCurrentAvatar(res.avatar));
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data).then((newCard) => setCards([newCard, ...cards]));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard(null);
  }

  if (isLoading) {
    return (
      <div className="wrapper" style={{ minHeight: '100vh', justifyContent: 'center' }}>
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route element={<PrivateOutlet isAuth={isAuth} />}>
          <Route
            path="*"
            element={
              <HomePage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                onLogout={handleLogout}
                setCards={setCards}
                setIsEditAvatarPopupOpen={setIsEditAvatarPopupOpen}
                setIsEditProfilePopupOpen={setIsEditProfilePopupOpen}
                setIsAddPlacePopupOpen={setIsAddPlacePopupOpen}
                setSelectedCard={setSelectedCard}
                cards={cards}
                currentAvatar={currentAvatar}
              />
            }
          />
        </Route>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} email={email} setEmail={setEmail} />}
        />
        <Route
          path="/register"
          element={<Register email={email} setEmail={setEmail} onRegister={handleRegister} />}
        />
      </Routes>
      <PopupEditProfile
        title={'Редактировать профиль'}
        name={'edit-profile'}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <PopupNewPlace
        title={'Новое место'}
        name={'new-place'}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupEditAvatar
        title={'Обновить аватар'}
        name={'edit-avatar'}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AuthPopup
        isGood={isGood}
        isOpen={isInfoPopupOpen}
        onClose={closeAllPopups}
        title={registrationMessage}
      />
      <ImagePopup card={selectedCard} name={'image'} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
