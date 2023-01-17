import React from 'react';
import Popup from './Popup';

function ImagePopup({ card, ...otherProps }) {
  const [currentCard, setCurrentCard] = React.useState(card);

  React.useEffect(() => {
    if (card !== null) setCurrentCard(card);
  }, [card]);

  return (
    <Popup {...otherProps} isOpen={card !== null} isDark={true}>
      <div className="popup__image-view">
        <button type="button" className="popup__close-btn"></button>
        <img className="popup__image" alt={currentCard?.name} src={currentCard?.link} />
        <p className="popup__img-caption">{currentCard?.name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
