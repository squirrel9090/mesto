  export const config = {
    selectorElementsCards:'.elements',
    selectorTemplateCard: '.element-template',
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__form-error_active',
  }
  export const popupEdit = document.querySelector('.popup_edit');
  export const profileEditingCard = popupEdit.querySelector('.popup__form');
  export const nameInput = profileEditingCard.querySelector('.popup__field_el_name');
  export const jobInput = profileEditingCard.querySelector('.popup__field_el_job');
  export const popupAddNewCard = document.querySelector('.popup_new-card');
  export const imageLinkInput = popupAddNewCard.querySelector('.popup__field_el_link');
  export const imageNameInput = popupAddNewCard.querySelector('.popup__field_el_name');
  export const profileEditButton = document.querySelector('.profile__edit-button');
  export const elementContainer =document.querySelector('.elements');
  export const vbKeyEscape = 'Escape';
  export const cardAddButton = document.querySelector('.profile__add-button');
  export const profileAddNewCard = popupAddNewCard.querySelector('.popup__form');
  export const elementsCards = document.querySelector(config.selectorElementsCards);
  export const avatarButton = document.querySelector('.profile__avatar-button');
  const popupChangeAvatar = document.querySelector('.popup_change-avatar');
  export const profileAddNewAvatar = popupChangeAvatar.querySelector('.popup__form')