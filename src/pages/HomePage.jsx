import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from '../components/Main';
import ImagePopup from '../components/popups/ImagePopup';
import PopupEditAvatar from '../components/popups/PopupEditAvatar';
import PopupEditProfile from '../components/popups/PopupEditProfile';
import PopupNewPlace from '../components/popups/PopupNewPlace';
import { api } from '../utils/Api';

function HomePage({ currentUser, setCurrentUser, onLogout }) {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentAvatar, setCurrentAvatar] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    api.getInitialCards().then((cards) => {
      setCards(cards);
    });
  });

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser?._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    return api.removeCard(card._id).then(() => {
      setCards(cards.filter((c) => c._id !== card._id));
    });
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
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <div className="wrapper">
        <div className={`header__menu ${isOpen ? 'header__menu_opened' : ''}`}>
          <p className="header__email">{localStorage.getItem('email')}</p>
          <button className="header__nav_exit" onClick={() => onLogout()}>
            Выйти
          </button>
        </div>
        <Header>
          <div className="header__nav">
            <p className="header__email">{localStorage.getItem('email')}</p>
            <button className="header__nav_exit" onClick={() => onLogout()}>
              Выйти
            </button>
          </div>
          <button
            className={isOpen ? 'header__close_menu' : 'header__open_menu'}
            onClick={() => setIsOpen(!isOpen)}></button>
        </Header>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          cardDelete={handleCardDelete}
          currentAvatar={currentAvatar}
        />
        <Footer />
      </div>
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
      <ImagePopup card={selectedCard} name={'image'} onClose={closeAllPopups} />
    </div>
  );
}

export default HomePage;
