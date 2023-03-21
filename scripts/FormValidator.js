export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._buttonElement = form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

/*показывает элемент ошибки!!!*/
  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

/*скрывает элемент ошибки!!!*/
_hideInputError(inputElement) {
  const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = '';
}
/*Обработчик форм!!! */
_setEventListners() {
  this.toggleButtonState();
  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._handleField(inputElement);
      this.toggleButtonState();
    });
  });
}

/* блокировка кнопки!!!*/
toggleButtonState() {
  this._buttonElement.disabled = !this._form.checkValidity();
  if (this._buttonElement.disabled) {
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }
  else {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }
}
/*проверка на валидность!!!*/
_handleField(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement);
  } else {
    this._hideInputError(inputElement);
  }
}

  _disabledButton () {
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'disabled');
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  };
  enableValidation() {
    this._form.addEventListener('submit', () => {
      this._disabledButton();
    });    
    this._setEventListners();    
  };
  resetValidation() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
     this._hideInputError(inputElement)
    });
  }

}
