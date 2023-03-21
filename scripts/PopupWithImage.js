import Popup from "./Popup.js";
class PopupWithImage extends Popup{
  constructor(container){
    super(container);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }
  open(element) {
    super.open();
    this._popupCaption.textContent = element.name;
    this._popupImage.src = element.link;
    this._popupImage.alt = element.name;
  }
}
export default PopupWithImage;