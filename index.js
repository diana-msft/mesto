import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import initialCards from "./scripts/utils/constants.js";


const elementsContainer = document.querySelector(".elements");
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".newitem-popup");
const formAdd = document.forms["newitem-form"];
const popupSubmitButton = document.querySelector(".newitem-form__submit-button");
const titleInput = document.querySelector(".form__input_type_title");
const linkInput = document.querySelector(".form__input_type_link");
const popupProfile = document.querySelector(".profile-popup");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileFormSubmit = document.forms["profile-form"];
const popupZoomImage = document.querySelector(".zoom-popup");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__image-caption");
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const selectorTemplate = "#elementTemplate";
const popupImageSelector = ".zoom-popup";
const popupProfileSelector = ".profile-popup";
const popupAddSelector = ".newitem-popup";
const elementsSelector = ".elements";

const infoConfig = {
  profileTitleSelector: ".profile__title",
  profileSubtitleSelector: ".profile__subtitle",
};

const validateConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  errorSelectorTemplate: '.form__error_type_',
  disableButtonClass: 'form__submit-button:disabled',
  inputErrorClass: 'form__input_type_invalid',
  textErrorClass: 'form__error_type_active',
};

const userInfo = new UserInfo(infoConfig);

const popupImageZoom = new PopupWithImage(popupImageSelector);

const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, selectorTemplate, openImagePopup);
    return card.createCard();
  }
  }, elementsSelector);

  section.addItem();


  const popupProfileInfo = new PopupWithForm(popupProfileSelector, (event) => {
    event.preventDefault();
    userInfo.setUserInfo(popupProfileInfo.getInputValue)
    popupProfileInfo.close();
  })

  const popupAddCard = new PopupWithForm(popupAddSelector, (event) => {
    event.preventDefault();
    section.addItem(section.renderer(popupAddCard.getInputValue()));
    popupAddCard.close();
  })


/**
 * попап изменения данных в профиле
 */
const openProfilePopup = function () {
  FormProfileValidator.resetErrors();
  popupProfileInfo.setInputValue(userInfo.getUserInfo());
  popupProfileInfo.open();
};


// валидация для формы профиля
const FormProfileValidator = new FormValidator(validateConfig, profileFormSubmit);
FormProfileValidator.enableValidation();

// валидация для формы добавления карточки
const FormAddValidator = new FormValidator(validateConfig, formAdd);
FormAddValidator.enableValidation();

/**
 * добавление новой карточки
 * */
addButton.addEventListener("click", () => {
  formAdd.reset();
  FormAddValidator.resetErrors();
  popupAddCard.open();
});

// popupAddCard.addEventListener("submit", handleAddFormSubmit);


/**
 * создание карточек
 */

const createCardElement = function(title, link) {
  const card = new Card({title, link}, selectorTemplate, {
    handleOpenPopupImage: (title, link) => { 
      popupImageZoom.open(title, link)
    }
  });
  
  // popupImageZoom.open(title, link)
  return card.createCard();
}

const createCard = function() {
  initialCards.forEach((element) => {
    renderCard(elementsContainer, createCardElement(element.title, element.link));
  })
}

const renderCard = function(elementsContainer, card) {
  elementsContainer.prepend(card)
};

createCard();

popupImageZoom.setEventListeners();
popupProfileInfo.setEventListeners();
popupAddCard.setEventListeners();

buttonOpenPopupProfile.addEventListener("click", openProfilePopup);
// profileFormSubmit.addEventListener("submit", handleProfileFormSubmit);
