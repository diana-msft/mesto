import alakol from "../images/alakol-unsplash.jpg";
import issykul from "../images/issykul-unsplash.jpg";
import karakol from "../images/karakol-unsplash.jpg";
import kegety from "../images/kegety-unsplash.jpg";
import naryn from "../images/naryn-unsplash.jpg";
import sonkul from "../images/sonkul-unsplash.jpg";

const initialCards = [
  {
    title: "Ала-Куль",
    link: alakol,
  },
  {
    title: "Каракол",
    link: karakol,
  },
  {
    title: "Кегеты",
    link: kegety,
  },
  {
    title: "Нарын",
    link: naryn,
  },
  {
    title: "Сон-Куль",
    link: sonkul,
  },
  {
    title: "Иссык-Куль",
    link: issykul,
  },
];

const elementsContainer = document.querySelector(".elements");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formAdd = document.forms["newitem-form"];
const profileFormSubmit = document.forms["profile-form"];
const popupSubmitButton = document.querySelector(
  ".newitem-form__submit-button"
);

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
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  errorSelectorTemplate: ".form__error_type_",
  disableButtonClass: "form__submit-button:disabled",
  inputErrorClass: "form__input_type_invalid",
  textErrorClass: "form__error_type_active",
};

export {
  initialCards,
  elementsContainer,
  buttonOpenPopupProfile,
  popupSubmitButton,
  addButton,
  formAdd,
  profileFormSubmit,
  selectorTemplate,
  popupImageSelector,
  popupProfileSelector,
  popupAddSelector,
  infoConfig,
  validateConfig,
};
