import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {config, profileEditingCard, nameInput, jobInput, profileEditButton, cardAddButton, profileAddNewCard, elementsCards, avatarButton, profileAddNewAvatar} from '../components/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import Api from '../components/Api.js';

//экземпляр класса апи для работы с запросами на сервер
  const api = new Api("https://mesto.nomoreparties.co/v1/cohort-61/", "4980643d-8561-47ee-b830-75ea4012a56f");

// запрос для корректной отрисовки
let currentUserId;
Promise.all([api.getCurrentUser(), api.getCard()])
  .then(([userServerData, cardsData]) => {
    profileInfo.setUserInfo(userServerData);
    currentUserId = userServerData._id;
    containerCard.renderItems(cardsData);
    console.log(userServerData, cardsData);
  })
  .catch((err) => {
   console.log(err);
  });

  const profileInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileDescriptionSelector: '.profile__activity',
    profileAvatarSelector: '.profile__avatar',
  });

  // отрисовка начальных карточек
const containerCard = new Section({
    renderer: createCard,
    },
  elementsCards);
  

/*Добавление новой карточки*/
const popupNewCard = new PopupWithForm('.popup_new-card',  handleAddFormSubmit);
popupNewCard.setEventListeners();
function handleAddFormSubmit (data) {
  popupNewCard.renderLoading(true);
  api
  .postCardtoServer(data)
    .then((res) => {
      containerCard.addItem(createCard(res));
      console.log(res);
      popupNewCard.close();
    })
    .catch((err) => {
    })
    .finally(() => {
      popupInfo.renderLoading(false);
    });
}

cardAddButton.addEventListener('click', () => {popupNewCard.open();cardFormValidator.resetValidation(profileAddNewCard, config);});
const handleCardClick = (name, link) => {
  imagePopup.open({name, link});
  console.log({name, link});
}
  
function createCard(data) {
  console.log(data)
  const card = new Card(data, currentUserId, '.template',handleCardClick, handleLikeClick,  handleTrashBinClick);
  const elementCard = card.generateElement();
  return elementCard
}

//лайк карточки
function handleLikeClick(card) {
  if (card._checkLike()) {
    api
      .deleteLikeFromCard(card._cardId)
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .putLikeToCard(card._cardId)
      .then((res) => {
        card.setLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
  
const popupInfo = new PopupWithForm('.popup_edit', handleInfoFormSubmit);
popupInfo.setEventListeners();
// функция для изменения информации профиля
function handleInfoFormSubmit(data) {
  popupInfo.renderLoading(true);
  api
    .patchUserData({name: data.name, about: data.description})
    .then((res) => {
      console.log(res);
      return res.json();})
      .then((data) => {// если мы попали в этот then, data — это объект
        profileInfo.setUserInfo(data);
        popupInfo.close();    
      })
    
    .catch((err) => {
     console.log(err);
    })
    .finally(() => {
      popupInfo.renderLoading(false);
    });
}

// 1й popup, открытие и подставление значений
profileEditButton.addEventListener('click', () => {
  popupInfo.open();
  const { name, about }  = profileInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  console.log(name)
})
  //3й popup
const imagePopup = new PopupWithImage('.popup_open-image');
imagePopup.setEventListeners();

const profileFormValidator = new FormValidator(config, profileEditingCard);
const cardFormValidator = new FormValidator(config, profileAddNewCard);
const avatarFormValidator = new FormValidator(config, profileAddNewAvatar);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//создадим экземпляр класса попапа с подтверждением удаления + слушатели
const popupWithDeleteVerification = new PopupWithConfirmation(
  handleRemoveSubmit,
  ".popup_delete-card"
);
popupWithDeleteVerification.setEventListeners();

//клик на корзину
function handleTrashBinClick(card) {
  popupWithDeleteVerification.open(card);
}

//попап подтверждения удаления
function handleRemoveSubmit(card) {
  popupWithDeleteVerification.renderLoading(true);
  api
    .deleteCard(card._cardId)
    .then(() => {
      card._deleteCard();
      popupWithDeleteVerification.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupWithDeleteVerification.renderLoading(false);
    });
  }
//форма для смены аватара
const popupWithAvatarForm = new PopupWithForm(
  ".popup__change-avatar",
  handleAvatarFormSubmit
);
popupWithAvatarForm.setEventListeners();

//при клике на кнопку сохранить, аватар отправится на сервер
function handleAvatarFormSubmit(avatar) {
  popupWithAvatarForm.renderLoading(true);
  api
  .changeAvatar(avatar)
  .then((data) => {
    profileInfo.setUserInfo(data);
    popupWithAvatarForm.close();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    popupWithAvatarForm.renderLoading(false);
  });
}

//клика на аватарку
  avatarButton.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  popupWithAvatarForm.open();
});