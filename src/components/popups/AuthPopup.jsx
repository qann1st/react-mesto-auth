import React from 'react';
import Popup from './Popup';

function AuthPopup({ isGood, isOpen, setIsOpen }) {
  function onClose() {
    setIsOpen(false);
  }

  return (
    <Popup name="popup-auth" isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <div className="popup__status">
          {isGood ? (
            <>
              <div className="popup__status_ok"></div>
              <p className="popup__status_text">Вы успешно зарегистрировались!</p>
            </>
          ) : (
            <>
              <div className="popup__status_bad"></div>
              <p className="popup__status_text">Что-то пошло не так! Попробуйте ещё раз.</p>
            </>
          )}
        </div>
      </div>
    </Popup>
  );
}

export default AuthPopup;
