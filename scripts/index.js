import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, config} from './constants.js';

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');
const profileCloseButton  = popupEdit.querySelector('.popup__close-button');
const profileEditingCard = popupEdit.querySelector('.popup__form');
const nameInput = profileEditingCard.querySelector('.popup__field_el_name');
const jobInput = profileEditingCard.querySelector('.popup__field_el_job');
const profileTitle = document.querySelector('.profile__title');
const profileActivity = document.querySelector('.profile__activity');
const elementContainer =document.querySelector('.elements');

const cardAddButton = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_new-card');
const profileAddNewCard = popupAddNewCard.querySelector('.popup__form');
const newCardCloseButton  = popupAddNewCard.querySelector('.popup__close-button');
const placeAddCard = popupAddNewCard.querySelector('.popup__container');

const imageNameInput = popupAddNewCard.querySelector('.popup__field_el_name');
const imageLinkInput = popupAddNewCard.querySelector('.popup__field_el_link');

const imagePopup = document.querySelector('.popup_open-image');
const imgCloseButton = imagePopup.querySelector('.popup__close-button');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const profileFormValidator = new FormValidator(config, profileEditingCard);
const cardFormValidator = new FormValidator(config, profileAddNewCard);

const elementsCards = document.querySelector(config.selectorElementsCards);

const vbKeyEscape = 'Escape';

export const openImgPopup = (element) => {
  openPopup(imagePopup);
  popupCaption.textContent = element._name;
  popupImage.src = element._link;
  popupImage.alt = element._name;
}

const addCard = (name, link) => {
  const card = createCard(name, link);
  elementsCards.prepend(card);
}

function addCardEventListeners (elementCard) {
	const deleteButton = elementCard.querySelector('.element__delete-button');
	deleteButton.addEventListener('click', deleteElement);
  
  const elementLike = elementCard.querySelector('.element__like-button');
  elementLike.addEventListener('click', likeElement);
}

export function openPopup (popup) {
  popup.classList.add('popup__opened');
  document.addEventListener('keyup', closePopupEsc);
  popup.addEventListener('click', closePopupOverlay);
}

function closePopup (popup) {
  popup.classList.remove('popup__opened');
  popup.removeEventListener('click', closePopupOverlay);
  document.removeEventListener('keyup', closePopupEsc);
}

/* 1й popup */
function openProfilePopup (event) {
  jobInput.value = profileActivity.textContent;
  nameInput.value = profileTitle.textContent;
  profileFormValidator.toggleButtonState(profileEditingCard, config);
  profileFormValidator.resetValidation(profileEditingCard, config);
  openPopup(popupEdit);
}

function closeProfilePopup () {
  closePopup(popupEdit);
}

function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileActivity.textContent =  jobInput.value;
  profileTitle.textContent =  nameInput.value;
  closeProfilePopup ();
}

/* 2й popup*/
  function openNewCardPopup (event) {
  imageNameInput.value = '';
  imageLinkInput.value = '';
  cardFormValidator.toggleButtonState(profileAddNewCard, config);
  cardFormValidator.resetValidation(profileAddNewCard, config);
  openPopup(popupAddNewCard);
}

function closeNewCardPopup () {
  closePopup(popupAddNewCard);
}

/*Добавление новой карточки*/
  function handleAddFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы(не происходит перезагрузка).
  const newCard = addCard(imageNameInput.value, imageLinkInput.value);//создали карточку и передали ей значения из инпутов
  elementContainer.append(newCard);
  closeNewCardPopup ();
}

/*Лайк*/
function likeElement (event) {
  event.target.classList.toggle('element__like-button_active');
}

/*3й popup */

function closeImagePopup (event) {
  closePopup(imagePopup);
}

/*закрытие popup клавишей esc*/
function closePopupEsc (evt) {
  if(evt.key === vbKeyEscape){
    const activePopup = document.querySelector('.popup__opened');
    closePopup(activePopup);
  }
}

/*Закрытие через overlay*/
function closePopupOverlay (evt) {
  if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
  }
}
/*_______________________________________________________*/

function createCard(name, link) {
  const card = new Card(name, link, '.template', openImgPopup);
  const elementCard = card.generateElement();
  return elementCard
}

initialCards.forEach((item) => {
  //создаем элемент карточки
  const card = new Card(item.name, item.link, '.template');
  // создаём карточку и возвращаем наружу
  const elementCard = card.generateElement();
  // Добавляем в DOM
  elementsCards.append(elementCard);
});

profileEditButton.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', closeProfilePopup);

profileEditingCard.addEventListener('submit', handleFormSubmit);

cardAddButton.addEventListener('click', openNewCardPopup);
newCardCloseButton.addEventListener('click', closeNewCardPopup);

imgCloseButton.addEventListener('click', closeImagePopup);

placeAddCard.addEventListener('submit', handleAddFormSubmit);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
