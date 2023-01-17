import React from 'react';
import Card from './Card.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  cards,
  cardDelete,
  currentAvatar,
}) {
  const userContext = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <div className="profile">
        <div className="profile__avatar" onClick={() => onEditAvatar()}>
          <div className="profile__avatar_edit"></div>
          <img
            className="profile__avatar_img"
            alt="Фото профиля"
            src={currentAvatar !== null ? currentAvatar : userContext?.avatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userContext?.name}</h1>
          <button className="profile__edit-button" onClick={() => onEditProfile()}></button>
          <p className="profile__description">{userContext?.about}</p>
        </div>
        <button className="profile__add-button" onClick={() => onAddPlace()}></button>
      </div>
      <section>
        <ul className="elements">
          {cards.map((item) => (
            <Card
              item={item}
              onCardClick={onCardClick}
              key={item._id}
              onCardLike={onCardLike}
              onCardDelete={cardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
