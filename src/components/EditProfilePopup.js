import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  // Нужно следить за isOpen (за состоянием открытия), чтобы вставлять в инпуты данные пользователя
  //иначе, если мы удалим информацию из инпутов и просто закроем попап, то при следующем открытии инпуты будут пустые (без данных пользователя)
  // Это будет своего рода сброс формы
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        id="inputName"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className="inputName-error popup__input-error"></span>
      <input
        className="popup__input popup__input_type_job"
        type="text"
        name="about"
        id="inputJob"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="inputJob-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
