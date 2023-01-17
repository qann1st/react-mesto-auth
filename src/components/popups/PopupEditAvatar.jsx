import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupEditAvatar({ title, name, isOpen, onClose, onUpdateAvatar }) {
  const inputAvatar = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });

    onClose();
  }

  return (
    <PopupWithForm
      title={title}
      name={name}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_link"
        name="link"
        type="url"
        id="avatar-link"
        placeholder="Ссылка на картинку"
        ref={inputAvatar}
        required
      />
      <span className="popup__input-error avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default PopupEditAvatar;
