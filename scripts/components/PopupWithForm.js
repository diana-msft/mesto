import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitForm) {
  super(popupSelector);
  this._submitForm = submitForm;
  this._form = this._popup.querySelector(".profile-form");
  this._inputList = this._form.querySelectorAll(".form__input");
  }

  getInputValue() {
    this._values = {};
    this._inputList.forEach(input => {
      this._values[input.name] = input.value;
    })
    return this._values;
  }

  setInputValue(userInfo) {
    this._inputList.forEach(input => {
      input.value = userInfo[input.name];
    })
    
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}