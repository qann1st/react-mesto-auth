import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ item, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwner = item.owner._id === currentUser?._id;
  const isLiked = item.likes.some((i) => i._id === currentUser?._id);

  const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'}`;

  function handleClick() {
    onCardClick(item);
  }

  return (
    <li className="element">
      <div className="element__image-wrapper">
        {isOwner && (
          <button className="element__delete" onClick={() => onCardDelete(item)}></button>
        )}
        <img className="element__image" alt="" src={item.link} onClick={handleClick} />
      </div>
      <div className="element__description">
        <h2 className="element__title">{item.name}</h2>
        <div className="element__like_container">
          <button className={cardLikeButtonClassName} onClick={() => onCardLike(item)}></button>
          <span className="element__like_count">{item.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
