export default class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorSelectorTemplate = config.errorSelectorTemplate;
    this._disableButtonClass = config.disableButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputs = this._form.querySelectorAll(this._inputSelector);
    this._setEventListeners();
    this.enableValidation();
  }

    //скрыть ошибку
  _hideInputError(input) {
    const errorTextElement = this._form.querySelector(`${this._errorSelectorTemplate}${input.name}`);
    input.classList.remove(this._inputErrorClass);
    errorTextElement.textContent = "";
  }

    //показать ошибку
  _showInputError(input) {
    const errorTextElement = this._form.querySelector(`${this._errorSelectorTemplate}${input.name}`);
    input.classList.add(this._inputErrorClass);
    errorTextElement.textContent = input.validationMessage;
    
  }
  
    // проверка на наличие невалидных инпутов
  _checkInputValidity(input) {
    input.validity.valid ? this._hideInputError(input): this._showInputError(input);
    }

  //деактивация кнопки
  _disableButton() {
    this._button.classList.add(this._disableButtonClass);
    this._button.disabled = true;
  }
  //активация кнопки
  _enableButton() {
    this._button.classList.remove(this._disableButtonClass);
    this._button.disabled = false;
  }

  //переключение кнопки
  _toggleButtonState() {
    this._hasValidInput(this._inputs) ? this._disableButton(this._button, this._disableButtonClass): 
    this._enableButton(this._button, this._disableButtonClass)
  }

  _hasValidInput() {
    return Array.from(this._inputs).some((input) => !input.validity.valid);
  }

  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._toggleButtonState();
  }

  //обнуление ошибок
  resetErrors() {
    this._inputs.forEach((input) => this._hideInputError(input));
    this._disableButton()
  }
}
