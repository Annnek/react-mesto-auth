import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [formValues, setFormValues] = useState({
    name: "",
    link: "",
  });

  useEffect(() => {
    setFormValues({
      name: "",
      link: "",
    });
  }, [isOpen]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onAddPlace({
      name: formValues.name,
      link: formValues.link,
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        className="popup__input popup__input_type_place"
        type="text"
        name="name"
        id="inputPlace"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={formValues.name}
        onChange={handleInputChange}
      />
      <span className="inputPlace-error popup__input-error"></span>
      <input
        className="popup__input popup__input_type_place-link"
        type="url"
        name="link"
        id="inputPlaceLink"
        placeholder="Ссылка на картинку"
        required
        value={formValues.link}
        onChange={handleInputChange}
      />
      <span className="inputPlaceLink-error popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
