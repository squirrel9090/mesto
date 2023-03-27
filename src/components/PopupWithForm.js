import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(container, handleFormSubmit) {
    super(container);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._permanentText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputsValues = {};
    this._inputList.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    })
    return this._inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }

  //метод изменения состояния кнопки сохранения
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._permanentText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
export default PopupWithForm;