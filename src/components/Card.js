export default class Card {
  constructor(name, link, template,handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = '.element-template';
    this._handleCardClick = handleCardClick;
  }
  _getElementFromTemplate(){
    return document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
  }

  _addEventListeners() {
    this._element.querySelector('.element__delete-button').addEventListener('click', () => this._deleteCard());
    this._element.querySelector('.element__like-button').addEventListener('click', () => this._likeCard());
    this._element.querySelector('.element__image').addEventListener('click', () => this._openCard());
  }

  _deleteCard() {
  this._element.remove();
  }

  _likeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _openCard() {
    this._handleCardClick(this._name, this._link);
  }

  generateElement() {
    // Запишем разметку в приватное поле _element. 
    this._element = this._getElementFromTemplate();
    // Добавим данные
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._addEventListeners();
    return this._element;
  }
};