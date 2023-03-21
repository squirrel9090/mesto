import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, config, elementContainer, imageLinkInput,imageNameInput, submitButtonSelector,popupEdit, profileCloseButton, profileEditingCard, nameInput, jobInput, profileEditButton,cardAddButton} from './constants.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const elementsCards = document.querySelector(config.selectorElementsCards);
const popupAddNewCard = document.querySelector('.popup_new-card');
const profileAddNewCard = popupAddNewCard.querySelector('.popup__form');
const addCard = (name, link) => {
    const card = createCard(name, link);
    elementsCards.prepend(card);
  }

/*3й popup */
const imagePopup = new PopupWithImage('.popup_open-image');
imagePopup.setEventListeners();
const handleCardClick = (name, link) => {
  imagePopup.open({name, link});
  console.log({name, link});
}

/*Добавление новой карточки*/
const popupNewCard = new PopupWithForm('.popup_new-card',  handleAddFormSubmit);
popupNewCard.setEventListeners();
function handleAddFormSubmit (evt) {
    /*evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы(не происходит перезагрузка).*/
    const newCard = addCard(imageNameInput.value, imageLinkInput.value);//создали карточку и передали ей значения из инпутов
    elementContainer.append(newCard);
    popupNewCard.close();
  }
  cardAddButton.addEventListener('click', () => {popupNewCard.open()});

function createCard(name, link) {
    const card = new Card(name, link, '.template', handleCardClick);
    const elementCard = card.generateElement();
    return elementCard
  }
  // отрисовка начальных карточек
  const containerCard = new Section({
    items: initialCards,
    renderer: (item) => {
      containerCard.addItem(createCard(item.name, item.link))
    }
  },elementsCards);
  
  containerCard.renderItems();
  /*_______________________________________________________________ */
  const profileInfo = new UserInfo({
    profileNameSelector: '.profile__title',
    profileDescriptionSelector: '.profile__activity'
  });
  
  const popupInfo/*popupEdit */ = new PopupWithForm('.popup_edit', handleInfoFormSubmit);
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
  
/*// 2й popup создания карточки через попап
function handleCardFormSubmit(item) {
  const newCard = createCard(item.title, item.link);
  containerCard.addItem(newCard);
}*/

const profileFormValidator = new FormValidator(config, profileEditingCard);
const cardFormValidator = new FormValidator(config, profileAddNewCard);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();