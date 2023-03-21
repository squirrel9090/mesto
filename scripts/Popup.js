import {vbKeyEscape} from './constants.js';
export default class Popup {
  constructor(container){
    this._popup = document.querySelector(container);
    this._closePopupEsc = this._closePopupEsc.bind(this);
    this._closePopupOverlay = this._closePopupOverlay.bind(this);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }
  open() {
    this._popup.classList.add('popup__opened');
    document.addEventListener('keyup', this._closePopupEsc);
    this._popup.addEventListener('click', this._closePopupOverlay);
  }
  close() {
    this._popup.classList.remove('popup__opened');
    this._popup.removeEventListener('click',  this._closePopupOverlay);
    document.removeEventListener('keyup',  this._closePopupEsc);
  };
  _closePopupEsc(evt) {
    if(evt.key === vbKeyEscape){
        this.close();
      }
  };
  _closePopupOverlay(evt){
    if(evt.target === evt.currentTarget){
      this.close();
    }
  }
  setEventListeners() {
    this._popup.addEventListener('keyup', (evt) => {
      if(evt.target === evt.currentTarget) {
      this.close(evt.currentTarget);
    }});
    this._closeButton.addEventListener('click', () => {this.close()});
  }
}