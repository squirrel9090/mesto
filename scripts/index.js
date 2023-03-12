import Card from './Card.js';
import FormValidator from './FormValidator.js';
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const config = {
  selectorElementsCards:'.elements',
  selectorTemplateCard: '.element-template',
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__form-error_active'
}

const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');
const profileCloseButton  = popupEdit.querySelector('.popup__close-button');
const profileEditingCard = popupEdit.querySelector('.popup__form');
const nameInput = profileEditingCard.querySelector('.popup__field_el_name');
const jobInput = profileEditingCard.querySelector('.popup__field_el_job');
const profileTitle = document.querySelector('.profile__title');
const profileActivity = document.querySelector('.profile__activity');
const elementContainer =document.querySelector('.elements');
/*const elementTemplate = document.querySelector('.element-template').content.querySelector('.element');*/

const cardAddButton = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_new-card');
const profileAddNewCard = popupAddNewCard.querySelector('.popup__form');
const newCardCloseButton  = popupAddNewCard.querySelector('.popup__close-button');
const placeAddCard = popupAddNewCard.querySelector('.popup__container');

const imageNameInput = popupAddNewCard.querySelector('.popup__field_el_name');
const imageLinkInput = popupAddNewCard.querySelector('.popup__field_el_link');

const imagePopup = document.querySelector('.popup_open-image');
/*const ImagePopupOpen = imagePopup.querySelector('.popup__figure');*/

const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const profileFormValidator = new FormValidator(config, profileEditingCard);
const cardFormValidator = new FormValidator(config, profileAddNewCard);

function addCardEventListeners (elementCard) {
	const deleteButton = elementCard.querySelector('.element__delete-button');
	deleteButton.addEventListener('click', deleteElement);
  
  const elementLike = elementCard.querySelector('.element__like-button');
  elementLike.addEventListener('click', likeElement);
}

/* добавление карточки */
/*function createElement({name, link}){
  const elementCard = elementTemplate.cloneNode(true);
  const elementImage = elementCard.querySelector('.element__image');
  const elementName = elementCard.querySelector('.element__name');
  elementImage.src = link;
  elementImage.alt = name;
  elementName.textContent = name;

  const popupImage = imagePopup.querySelector('.popup__image');
  const popupCaption = imagePopup.querySelector('.popup__caption');
  elementImage.addEventListener('click',() => {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openImgPopup(imagePopup);
    });
  addCardEventListeners (elementCard);
  return elementCard;
}

function deleteElement (event) {
  event.target.closest('.element').remove();
}

/*function renderElement(){
  initialCards.forEach(item => {
    const elementHTML = createElement(item);
    elementContainer.append(elementHTML);
  });
}

renderElement();*/

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

profileEditButton.addEventListener('click', openProfilePopup);
profileCloseButton.addEventListener('click', closeProfilePopup);

function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileActivity.textContent =  jobInput.value;
  profileTitle.textContent =  nameInput.value;
  closeProfilePopup ();
}

profileEditingCard.addEventListener('submit', handleFormSubmit);
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

cardAddButton.addEventListener('click', openNewCardPopup);
newCardCloseButton.addEventListener('click', closeNewCardPopup);

/*Добавление новой карточки*/
  function handleAddFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы(не происходит перезагрузка).
  const newCard = addCard(imageNameInput.value, imageLinkInput.value);//создали карточку и передали ей значения из инпутов
  elementContainer.append(newCard);
  closeNewCardPopup ();
}

placeAddCard.addEventListener('submit', handleAddFormSubmit);
/*Лайк*/
function likeElement (event) {
  event.target.classList.toggle('element__like-button_active');
}

/*3й popup */
/*export function openImgPopup (event) {
  openPopup(imagePopup);
}*/
export const openImgPopup = (element) => {
  openPopup(imagePopup);
  popupCaption.textContent = element._name;
  popupImage.src = element._link;
  popupImage.alt = element._name;
}
function closeImagePopup (event) {
  closePopup(imagePopup);
}
const imgCloseButton = imagePopup.querySelector('.popup__close-button');
imgCloseButton.addEventListener('click', closeImagePopup);

/*закрытие popup клавишей esc*/
function closePopupEsc (evt) {
  if(evt.key === 'Escape'){
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

const elementsCards = document.querySelector(config.selectorElementsCards)

function createCard(name, link) {
  const card = new Card(name, link, '.template', openImgPopup);
  const elementCard = card.generateElement();
  return elementCard
}
const addCard = (name, link) => {
  const card = createCard(name, link);
  elementsCards.prepend(card);
}

/*const renderElement = (initialCards) => {
  initialCards.forEach((item) => {
    addCard(item.name, item.link);
  })
}*/
initialCards.forEach((item) => {
  //создаем элемент карточки
  const card = new Card(item.name, item.link);
  // создаём карточку и возвращаем наружу
  const elementCard = card.generateElement();
  // Добавляем в DOM
  elementsCards.append(elementCard);
});

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
