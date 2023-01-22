const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_edit');
const editCloseButton  = editPopup.querySelector('.popup__close-button');
const formElement = editPopup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__field_el_name');
const jobInput = formElement.querySelector('.popup__field_el_job');
const profileTitle = document.querySelector('.profile__title');
const profileActivity = document.querySelector('.profile__activity');
const profileInformation = formElement.querySelector('.popup__information');
const elementContainer =document.querySelector('.elements');
const elementTemplate = document.querySelector('.element-template').content.querySelector('.element');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_new-card');
const addCloseButton  = addPopup.querySelector('.popup__close-button');
const addFormElement = addPopup.querySelector('.popup__form');

const imageNameInput = addPopup.querySelector('.popup__field_el_name');
const imageLinkInput = addPopup.querySelector('.popup__field_el_link');

const imagePopup = document.querySelector('.popup_open-image');
const openImagePopup = imagePopup.querySelector('.popup__figure');


const initialCards = [
  {
    name: 'Кисловодск',
    link: '../images/kislovodsk.jpg'
  },
  {
    name: 'Эльбрус',
    link: '../images/elbrus.jpg'
  },
  {
    name: 'Байкал',
    link: '../images/baikal.jpg'
  },
  {
    name: 'Кабардино-Балкария',
    link: '../images/dzhily-su.jpg'
  },
  {
    name: 'Дагестан',
    link: '../images/dagestan.jpg'
  },
  {
    name: 'Северная Осетия',
    link: '../images/north_ossetia.jpg'
  }
]; 

function addCardEventListeners (elementCard) {
	const deleteButton = elementCard.querySelector('.element__delete-button');
	deleteButton.addEventListener('click', deleteElement);
  
  const elementLike = elementCard.querySelector('.element__like-button');
  elementLike.addEventListener('click', likeElement);

  /*const elementImage = elementCard.querySelector('.element__image');
  elementImage.addEventListener('click',() => {
    openImgPopup});*/
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
    popupImage.textContent = name;
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
}

function closePopup (popup) {
  popup.classList.remove('popup__opened');
}

/* 1й popup */
function openEditPopup (event) {
  jobInput.value = profileActivity.textContent;
  nameInput.value = profileTitle.textContent;
  openPopup(editPopup);
}

function closeEditPopup () {
  closePopup(editPopup);
}

editButton.addEventListener('click', openEditPopup);
editCloseButton.addEventListener('click', closeEditPopup);

function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileActivity.textContent =  jobInput.value;
  profileTitle.textContent =  nameInput.value;
  closeEditPopup ();
}

formElement.addEventListener('submit', handleFormSubmit);
/* 2й popup*/
function openAddPopup (event) {
  openPopup(addPopup);
}

function closeAddPopup () {
  imageNameInput.value = '';
  imageLinkInput.value = '';
  closePopup(addPopup);
}

addButton.addEventListener('click', openAddPopup);
addCloseButton.addEventListener('click', closeAddPopup);

/*Добавление новой карточки*/
function handleAddFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы(не происходит перезагрузка).
  const newCard = createElement({name: imageNameInput.value, link: imageLinkInput.value});//создали карточку и передали ей значения из инпутов
  elementContainer.prepend(newCard);
  closeAddPopup ();
}

addFormElement.addEventListener('submit', handleAddFormSubmit);
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