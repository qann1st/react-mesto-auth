import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import ImagePopup from './popups/ImagePopup';
import PopupEditAvatar from './popups/PopupEditAvatar';
import PopupEditProfile from './popups/PopupEditProfile';
import PopupNewPlace from './popups/PopupNewPlace';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [currentAvatar, setCurrentAvatar] = React.useState(null);

  React.useEffect(() => {
    api.getUserInfo().then((res) => setCurrentUser(res));
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="wrapper">
          <Header />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
