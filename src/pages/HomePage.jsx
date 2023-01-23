import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Main from '../components/Main';
import { api } from '../utils/Api';

function HomePage({
  currentUser,
  onLogout,
  setCards,
  setIsEditAvatarPopupOpen,
  setIsEditProfilePopupOpen,
  setIsAddPlacePopupOpen,
  setSelectedCard,
  cards,
  currentAvatar,
}) {
  const [isOpen, setIsOpen] = React.useState(false);

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

  return (
    <>
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
    </>
  );
}

export default HomePage;
