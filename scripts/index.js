import initialCards from "./initial-cards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
const popupImage = document.querySelector(".zoom-popup");
const zoomImage = document.querySelector(".popup__image");
const zoomImageName = document.querySelector(".popup__image-caption");
const closeButtons = document.querySelectorAll('.popup__close');

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
}

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
}

const handleOverlayClick = function(event) {
  const openedPopup = document.querySelector(".popup_opened");
  if (event.target === openedPopup) {
    closePopup(openedPopup);
  }
}
const handleEscPress = function(event) {
  const openedPopup = document.querySelector(".popup_opened");
  if (event.key === "Escape") {
    closePopup(openedPopup);
  }
}

document.addEventListener("click", handleOverlayClick);
document.addEventListener("keydown", handleEscPress);

closeButtons.forEach((button) => {
const popup = button.closest('.popup');
button.addEventListener('click', () => closePopup(popup));
});


/**
 * попап изменения данных в профиле
 */
const openProfilePopup = function () {
  FormProfileValidator.resetErrors();
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
 * создание карточек
 */

const createCardElement = function(name, link) {
  const card = new Card({name: name, link: link}, selectorTemplate, openImagePopup);
  return card.createCard();
}

const createCard = function() {
  initialCards.forEach((element) => {
    renderCard(elementsContainer, createCardElement(element.name, element.link));
  })
}

/**
 * добавление новых карточек
 */
const renderCard = function(elementsContainer, card) {
  elementsContainer.prepend(card)
};

initialCards.forEach (element => {
  renderCard(elementsContainer, createCard(element))
});

// валидация для формы профиля
const FormProfileValidator = new FormValidator(validateConfig, profileFormSubmit);
FormProfileValidator.enableValidation();

// валидация для формы добавления карточки
const FormAddValidator = new FormValidator(validateConfig, formAdd);
FormAddValidator.enableValidation();

/**
 * добавление карточки
 * */
addButton.addEventListener("click", () => {
  formAdd.reset();
  FormAddValidator.resetErrors();
  openPopup(popupAdd);
});

popupSubmitButton.addEventListener("click", () => {
  closePopup(popupAdd);
});

const handleAddFormSubmit = function(event) {
  event.preventDefault();
  
  const cardData = {name: titleInput.value, link: linkInput.value};
  const cardElement = createCardElement(cardData.name, cardData.link);

  renderCard(elementsContainer, cardElement); 
  formAdd.reset();
  closePopup(popupAdd);
};

formAdd.addEventListener("submit", handleAddFormSubmit);

