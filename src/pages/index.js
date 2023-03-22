import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, config, elementContainer, imageLinkInput, imageNameInput, profileEditingCard, nameInput, jobInput, profileEditButton, cardAddButton, popupAddNewCard, profileAddNewCard, elementsCards} from '../components/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

  // отрисовка начальных карточек
const containerCard = new Section({
    items: initialCards,
    renderer: (item) => {
      containerCard.addItem(createCard(item.name, item.link))
    }
  },elementsCards);
  
containerCard.renderItems();

/*Добавление новой карточки*/
const popupNewCard = new PopupWithForm('.popup_new-card',  handleAddFormSubmit);
popupNewCard.setEventListeners();
function handleAddFormSubmit (evt) {
  const newCard = containerCard.addItem(createCard(imageNameInput.value, imageLinkInput.value));//создали карточку и передали ей значения из инпутов
  popupNewCard.close();
}

cardAddButton.addEventListener('click', () => {popupNewCard.open();cardFormValidator.resetValidation(profileAddNewCard, config);});
const handleCardClick = (name, link) => {
  imagePopup.open({name, link});
  console.log({name, link});
}
  
function createCard(name, link) {
  const card = new Card(name, link, '.template', handleCardClick);
  const elementCard = card.generateElement();
  return elementCard
}

const profileInfo = new UserInfo({
  profileNameSelector: '.profile__title',
  profileDescriptionSelector: '.profile__activity'
});
  
const popupInfo = new PopupWithForm('.popup_edit', handleInfoFormSubmit);
popupInfo.setEventListeners();
// функция для изменения информации профиля
function handleInfoFormSubmit(data) {
  profileInfo.setUserInfo({name: data.name, description: data.description});
  console.log(data)
  popupInfo.close();
}

// 1й popup, открытие и подставление значений
profileEditButton.addEventListener('click', () => {
  popupInfo.open();
  const currentProfileInfo = profileInfo.getUserInfo();
  nameInput.value = currentProfileInfo.name;
  jobInput.value = currentProfileInfo.description;
})
  //3й popup
const imagePopup = new PopupWithImage('.popup_open-image');
imagePopup.setEventListeners();

const profileFormValidator = new FormValidator(config, profileEditingCard);
const cardFormValidator = new FormValidator(config, profileAddNewCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();