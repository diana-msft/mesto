import Card from "./scripts/components/Card.js";
import FormValidator from "./scripts/components/FormValidator.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import { initialCards, 
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
  elementsSelector,
  infoConfig,
  validateConfig,
  zoomImage,
  zoomImageName}

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
 * валидация
 * */
//для формы профиля
const FormProfileValidator = new FormValidator(validateConfig, profileFormSubmit);
FormProfileValidator.enableValidation();

//для формы добавления карточки
const FormAddValidator = new FormValidator(validateConfig, formAdd);
FormAddValidator.enableValidation();


/**
 * попап изменения данных в профиле
 */
const openProfilePopup = function () {
  FormProfileValidator.resetErrors();
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

const handleAddFormSubmit = function(event) {
  event.preventDefault();
  section.addItem(section.renderer(popupAddCard.getInputValue()));
  popupAddCard.close();
};

addButton.addEventListener("click", () => {
  FormAddValidator.resetErrors();
  popupAddCard.open();
});

popupSubmitButton.addEventListener("click", () => {
  popupAddCard.close();
});


/**
   * показать увеличенную картинку карточки
   */
const openImagePopup = function(element) {
    zoomImage.setAttribute("src", element.link);
    zoomImage.setAttribute("alt", element.title);
    zoomImageName.textContent = element.title;
    popupImageZoom.open();
  };

/**
 * создание карточек
 */

const createCardElement = function(title, link) {
  const card = new Card({title, link}, selectorTemplate, openImagePopup, {
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

/**
 * слушатели
 */
popupImageZoom.setEventListeners();
popupProfileInfo.setEventListeners();
popupAddCard.setEventListeners();

buttonOpenPopupProfile.addEventListener("click", openProfilePopup);
profileFormSubmit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleAddFormSubmit);
