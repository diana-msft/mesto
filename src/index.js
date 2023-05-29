import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import { initialCards, 
  elementsContainer, 
  buttonOpenPopupProfile, 
  addButton, 
  formAdd, 
  profileFormSubmit,
  selectorTemplate,
  popupImageSelector,
  popupProfileSelector,
  popupAddSelector,
  elementsSelector,
  infoConfig,
  validateConfig}
from "./scripts/utils/constants.js";
import './pages/index.css'; 

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
  FormAddValidator.resetErrors();
  popupAddCard.open();
});

// popupAddCard.addEventListener("submit", handleAddFormSubmit);


/**
 * создание карточек
 */

const createCardElement = function(title, link) {
  const card = new Card({title, link}, selectorTemplate, {
    _handleCardClick: (title, link) => { 
      popupImageZoom.open(title, link)
    }
  });
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
