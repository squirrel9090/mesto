export default class Card {
  constructor(data, currentUserId, template,handleCardClick, handleLikeClick,  handleTrashBinClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id === currentUserId;
    this._currentUserId = currentUserId;
    this._template = '.element-template';
console.log(currentUserId);
console.log(this._ownerId);
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleTrashBinClick = handleTrashBinClick;
  }
  _getElementFromTemplate(){
    return document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
  }

  _addEventListeners() {
    this._deleteButton.addEventListener('click', () => this._handleTrashBinClick(this));
    this._like.addEventListener('click', () => this._handleLikeClick(this, this._checkLike()));
    this._picture.addEventListener('click', () => this._openCard());
  }

  _openCard() {
    this._handleCardClick(this._name, this._link);
  }

  generateElement() {
    // Запишем разметку в приватное поле _element. 
    this._element = this._getElementFromTemplate();
    // Добавим данные
    this._picture = this._element.querySelector('.element__image');
    this._picture.src = this._link;
    this._picture.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._like = this._element.querySelector('.element__like-button');
    
    //корзина только для своих
    if(!this._ownerId){
      this._deleteButton.remove();
    }

    this.setLikes(this._likes);
    this._addEventListeners();

    return this._element;
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
    }

    _checkLike() {
      return this._likes.some(like => {
        return like._id === this._currentUserId;
      });
    }
     //метод принимает данные лайков карточки и обновляет отображение карточки
  setLikes(arr) {
    this._element.querySelector('.element__like-counter').textContent =arr.length;
    this._likes = arr;
    if (this._checkLike()) {
      this._like.classList.add('element__like-button_active');
    } else {
      this._like.classList.remove('element__like-button_active');
    }
  }
}
