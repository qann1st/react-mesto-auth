import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupNewPlace({ title, name, isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = React.useState(null);
  const [cardImage, setCardImage] = React.useState(null);

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardImage,
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
        className="popup__input popup__input_type_name"
        placeholder="Название"
        type="text"
        name="name"
        required
        minLength="2"
        maxLength="30"
        id="add-name-input"
        onChange={(e) => setCardName(e.target.value)}
      />
      <span className="popup__input-error add-name-input-error"></span>
      <input
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        required
        id="add-link-input"
        onChange={(e) => setCardImage(e.target.value)}
      />
      <span className="popup__input-error add-link-input-error"></span>
    </PopupWithForm>
  );
}

export default PopupNewPlace;
