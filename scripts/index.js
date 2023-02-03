const profileEditButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_edit');
const profileCloseButton  = popupEdit.querySelector('.popup__close-button');
const profileEditingCard = popupEdit.querySelector('.popup__form');
const nameInput = profileEditingCard.querySelector('.popup__field_el_name');
const jobInput = profileEditingCard.querySelector('.popup__field_el_job');
const profileTitle = document.querySelector('.profile__title');
const profileActivity = document.querySelector('.profile__activity');
const elementContainer =document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content.querySelector('.element');

const cardAddButton = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_new-card');
const newCardCloseButton  = popupAddNewCard.querySelector('.popup__close-button');
const placeAddCard = popupAddNewCard.querySelector('.popup__container');

const imageNameInput = popupAddNewCard.querySelector('.popup__field_el_name');
const imageLinkInput = popupAddNewCard.querySelector('.popup__field_el_link');

const imagePopup = document.querySelector('.popup_open-image');
const ImagePopupOpen = imagePopup.querySelector('.popup__figure');

function addCardEventListeners (elementCard) {
	const deleteButton = elementCard.querySelector('.element__delete-button');
	deleteButton.addEventListener('click', deleteElement);
  
  const elementLike = elementCard.querySelector('.element__like-button');
  elementLike.addEventListener('click', likeElement);
}

/* добавление карточки */
function createElement({name, link}){
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

function renderElement(){
  initialCards.forEach(item => {
    const elementHTML = createElement(item);
    elementContainer.append(elementHTML);
  });
}

renderElement();

function openPopup (popup) {
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
  const newCard = createElement({name: imageNameInput.value, link: imageLinkInput.value});//создали карточку и передали ей значения из инпутов
  elementContainer.prepend(newCard);
  closeNewCardPopup ();
}

placeAddCard.addEventListener('submit', handleAddFormSubmit);
/*Лайк*/
function likeElement (event) {
  event.target.classList.toggle('element__like-button_active');
}

/*3й popup */
function openImgPopup (event) {
  openPopup(imagePopup);
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
/*document.addEventListener('keydown', popupCloseEsc);*/

/*Закрытие через overlay*/
function closePopupOverlay (evt) {
  if (evt.target === evt.currentTarget) {
      closePopup(evt.currentTarget);
  }
}