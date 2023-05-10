import initialCards from "./initial-cards.js";
import Card from "./Card.js";
// import FormValidator from "./FormValidator.js";

const elementsContainer = document.querySelector(".elements");
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".newitem-popup");
const formAdd = document.forms["newitem-form"];
const popupSubmitButton = document.querySelector(".newitem-form__submit-button");
const popupAddCloseButton = document.querySelector(".newitem-popup__close");
const titleInput = document.querySelector(".form__input_type_title");
const linkInput = document.querySelector(".form__input_type_link");
const popupProfile = document.querySelector(".profile-popup");
const buttonClosePopupProfile = popupProfile.querySelector(".profile-popup__close");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileFormSubmit = document.forms["profile-form"];
const popupImage = document.querySelector(".zoom-popup");
const popupImageCloseButton = document.querySelector(".zoom-popup__close");
const zoomImage = document.querySelector(".popup__image");
const zoomImageName = document.querySelector(".popup__image-caption");

const selectorTemplate = "#elementTemplate";

const validateConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  errorSelectorTemplate: '.form__error_type_',
  disableButtonClass: 'form__submit-button:disabled',
  inputErrorClass: 'form__input_type_invalid',
  textErrorClass: 'form__error_type_active',
};

/**
 * поведение попапов
 */
const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscPress);
}
const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscPress);
}
const handleOverlayClick = function(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}
const handleEscPress = function(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

const closeButtons = document.querySelectorAll('.popup__close');
closeButtons.forEach((button) => {
const popup = button.closest('.popup');
button.addEventListener('click', () => closePopup(popup));
});


/**
 * попап изменения данных в профиле
 */
const openProfilePopup = function () {
  resetErrorForm(profileFormSubmit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};

const handleProfileFormSubmit = function (event) {
  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupProfile);
};

buttonOpenPopupProfile.addEventListener("click", openProfilePopup);
profileFormSubmit.addEventListener("submit", handleProfileFormSubmit);

/**
   * показать увеличенную картинку карточки
   */
  const openImagePopup = function(element) {
    zoomImage.setAttribute("src", element.link);
    zoomImage.setAttribute("alt", element.name);
    zoomImageName.textContent = element.name;
    openPopup(popupImage);
  };

/**
 * создание карточки
 */

const createCard = function(element) {
  const card = new Card(element, selectorTemplate, openImagePopup);
  return card.createCard();
}

/**
 * добавление карточек
 */
const renderCard = function(elementsContainer, card) {
  elementsContainer.prepend(card)
};

initialCards.forEach (element => {
  renderCard(elementsContainer, createCard(element))
});


class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorSelectorTemplate = config.errorSelectorTemplate;
    this._disableButtonClass = config.disableButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._textErrorClass = config.textErrorClass;
    this._form = form;
  }

  _hideInputError(input) {
    
  }

  _showInputError(input) {
    
  }
  
  _checkInputValidity(input) {
    const errorTextElement = this._form.querySelector(`${this._errorSelectorTemplate}${input.name}`);
    if (input.validity.valid) {
      _hideInputError(input, errorTextElement, inputErrorClass, textErrorClass);
    } else {
      _showInputError(input, errorTextElement, textErrorClass);
    }
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
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputs = this._form.querySelectorAll(this._inputSelector);
    this._setEventListeners();
  }
}


addButton.addEventListener("click", () => {
  formAdd.reset();
  resetErrorForm(formAdd);
  popupSubmitButton.disabled = true;
  openPopup(popupAdd);
});

popupSubmitButton.addEventListener("click", () => {
  closePopup(popupAdd);
});

const handleAddFormSubmit = function(event) {
  event.preventDefault();
  
  const cardData = {name: titleInput.value, link: linkInput.value};
  const card = new Card (cardData, selectorTemplate, openImagePopup);

  renderCard(elementsContainer, card.createCard()); 
  formAdd.reset();
  resetErrorForm(formAdd);
  closePopup(popupAdd);
};

formAdd.addEventListener("submit", handleAddFormSubmit);


