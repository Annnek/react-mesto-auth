import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  //три переменные состояния и три функции, которые будут менять их значения
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [cards, setCards] = useState([]);
  //const [isLoading, setIsLoading] = useState(false); //отслеживаем загрузку карточек

  useEffect(() => {
    api
      .getUserInfo()
      .then((profileInfo) => setCurrentUser(profileInfo))
      .catch((err) => {
        console.log(`Ошибка загрузки профиля из api: ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(
          data.map((card) => ({
            _id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner,
          }))
        );
      })
      .catch((err) => {
        console.log(`Ошибка загрузки карточек из api: ${err}`);
      });
  }, []);

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    // api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
    //   setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    // });
    if (isLiked) {
      api
        .deleteLikeStatus(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при удалении лайка: ${err}`);
        });
    } else {
      api
        .changeLikeCardStatus(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => {
          console.log(`Ошибка при добавлении лайка: ${err}`);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteOwnerCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((profileInfo) => {
        setCurrentUser(profileInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка редактирования профиля: ${err}`);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setUserAvatar(avatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка редактирования аватара профиля: ${err}`);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    console.log("newCard:", newCard);
    api
      .addNewCard(newCard)
      .then((card) => {
        console.log("card:", card);
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка добавления нового места: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          {/* Поддерево, в котором будет доступен контекст */}
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />

          {/* PREVIEW IMAGE POPUP */}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          {/* POPUP EDIT PROFILE */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* RENEW AVATAR POPUP */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* ADD POPUP */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          {/* DELETE CARD POPUP */}
          <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            buttonText="Да"></PopupWithForm>

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
