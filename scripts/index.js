const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_edit');
const editCloseButton  = editPopup.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__field_name');
const jobInput = formElement.querySelector('.popup__field_job');
const profileTitle = document.querySelector('.profile__title');
const profileActivity = document.querySelector('.profile__activity');

function openPopup (popup) {
  popup.classList.add('popup__opened');
}

function closePopup (popup) {
  popup.classList.remove('popup__opened');
}

function openEditPopup (event) {
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

/*editButton.addEventListener('click', (event) => {
  editPopup.classList.add('popup__opened')
});

editCloseButton.addEventListener('click', () => {
  editPopup.classList.remove('popup__opened')
});*/