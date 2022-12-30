const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_edit');
const editCloseButton  = editPopup.querySelector('.popup__close-button');

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

/*editButton.addEventListener('click', (event) => {
  editPopup.classList.add('popup__opened')
});

editCloseButton.addEventListener('click', () => {
  editPopup.classList.remove('popup__opened')
});*/