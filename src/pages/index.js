import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {
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
  elementsSelector,
} from "../utils/constants.js";
import "./index.css";

const userInfo = new UserInfo(infoConfig);

const popupImageZoom = new PopupWithImage(popupImageSelector);

const section = new Section({
    items: initialCards,
    renderer: (element) => {
    section.addItem(createCardElement(element.title, element.link));
    },
}, elementsSelector);

const popupProfileInfo = new PopupWithForm(popupProfileSelector, (event) => {
  event.preventDefault();
  userInfo.setUserInfo(popupProfileInfo.getInputValue);
  popupProfileInfo.close();
});

const popupAddCard = new PopupWithForm(popupAddSelector, (event) => {
  event.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputValue()));
  popupAddCard.close();
});

/**
 * валидация
 * */
//для формы профиля
const formProfileValidator = new FormValidator(
  validateConfig,
  profileFormSubmit
);
formProfileValidator.enableValidation();

//для формы добавления карточки
const formAddValidator = new FormValidator(validateConfig, formAdd);
formAddValidator.enableValidation();

/**
 * попап изменения данных в профиле
 */
const openProfilePopup = function () {
  formProfileValidator.resetErrors();
  popupProfileInfo.setInputValue(userInfo.getUserInfo());
  popupProfileInfo.open();
};

const handleProfileFormSubmit = function (event) {
  event.preventDefault();
  const { name, job } = popupProfileInfo.getInputValue();
  userInfo.setUserInfo({ name, job });
  popupProfileInfo.close();
};

/**
 * добавление новой карточки
 * */

const handleAddFormSubmit = function (event) {
  event.preventDefault();
  section.addItem(createCardElement(popupAddCard.getInputValue()));
  popupAddCard.close();
};

addButton.addEventListener("click", () => {
  formAddValidator.resetErrors();
  popupAddCard.open();
});

popupSubmitButton.addEventListener("click", () => {
  popupAddCard.close();
});

/**
 * показать увеличенную картинку карточки
 */
const openImagePopup = function () {
  popupImageZoom.open(this._title, this._link);
};

/**
 * создание карточек
 */

const createCardElement = function ({ title, link }) {
  const card = new Card({ title, link }, selectorTemplate, openImagePopup);
  return card.createCard();
};

const createCard = function () {
  initialCards.forEach((element) => {
    renderCard(
      elementsContainer,
      createCardElement(element)
    );
  });
};

const renderCard = function (elementsContainer, card) {
  elementsContainer.prepend(card);
};

createCard();

/**
 * слушатели
 */
popupImageZoom.setEventListeners();
popupProfileInfo.setEventListeners();
popupAddCard.setEventListeners();

buttonOpenPopupProfile.addEventListener("click", openProfilePopup);
profileFormSubmit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleAddFormSubmit);
