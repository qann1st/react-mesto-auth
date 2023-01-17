import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function PopupEditProfile({ title, name, isOpen, onClose, onUpdateUser }) {
  const [profileName, setProfileName] = React.useState('');
  const [profileDescription, setProfileDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setProfileName(currentUser?.name);
    setProfileDescription(currentUser?.about);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: profileName,
      about: profileDescription,
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
        name="name"
        id="edit-profile"
        placeholder="Имя"
        type="text"
        minLength="2"
        maxLength="40"
        defaultValue={profileName}
        onChange={(e) => setProfileName(e.target.value)}
        required
      />
      <span className="popup__input-error edit-profile-error"></span>
      <input
        className="popup__input popup__input_type_about"
        name="about"
        type="text"
        id="about-profile"
        placeholder="О себе"
        minLength="2"
        maxLength="40"
        defaultValue={profileDescription}
        onChange={(e) => setProfileDescription(e.target.value)}
        required
      />
      <span className="popup__input-error about-profile-error"></span>
    </PopupWithForm>
  );
}

export default PopupEditProfile;
