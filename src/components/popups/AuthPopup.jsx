import React from 'react';
import Popup from './Popup';

function AuthPopup({ isGood, isOpen, onClose, title }) {
  const imageClass = `popup__status_${isGood ? 'ok' : 'bad'}`;

  return (
    <Popup name="popup-auth" isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <div className="popup__status">
          <div className={imageClass}></div>
          <p className="popup__status_text">{title}</p>
        </div>
      </div>
    </Popup>
  );
}

export default AuthPopup;
