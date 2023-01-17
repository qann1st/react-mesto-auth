import React from 'react';
import Popup from './Popup';

function PopupWithForm({ children, title, name, isOpen, onClose, onSubmit }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          name="add"
          className="popup__form popup__form_type_add"
          onSubmit={onSubmit}
          noValidate>
          {children}
          <button type="submit" className="popup__save-btn">
            Сохранить
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
