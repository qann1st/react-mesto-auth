import React from 'react';

function Popup({ children, name, isOpen, onClose, isDark = false }) {
  React.useEffect(
    function handleEscClick() {
      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
          onClose();
        }
      });
    },
    [isOpen, onClose],
  );

  function handleClickOnOverlayOrClose(evt) {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  }

  return (
    <div
      className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''} ${
        isDark ? 'popup_dark' : ''
      }}`}
      onClick={handleClickOnOverlayOrClose}>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-btn"
          onClick={handleClickOnOverlayOrClose}></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
