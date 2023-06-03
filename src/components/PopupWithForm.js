import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
  }

  getInputValue() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setInputValue(userInfo) {
    this._inputList.forEach((input) => {
      input.value = userInfo[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitForm(this.getInputValue());
    });
  }

  close() {
    super.close();
    // this._form.reset();
  }
}

export default PopupWithForm;
