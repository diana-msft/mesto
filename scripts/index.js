import {initialCards} from "./initial-cards.js";

//сделать выборку DOM элементов для профиля
const popupProfile = document.querySelector(".profile-popup");
const buttonClosePopupProfile = popupProfile.querySelector(".profile-popup__close");
const buttonOpenPopupProfile = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileFormSubmit = document.forms["profile-form"];
//добавляем выборку для увеличения картинки
const popupImage = document.querySelector(".zoom-popup");
const popupImageCloseButton = document.querySelector(".zoom-popup__close");
const zoomImage = document.querySelector(".popup__image");
const zoomImageName = document.querySelector(".popup__image-caption");
//добавляем в выборку карточки
const cardsContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector("#elementTemplate").content.querySelector(".element");
const selectorTemplate = "#elementTemplate";
//добавление новых карточек
const addButton = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".newitem-popup");
const formAdd = document.forms["newitem-form"];
const popupSubmitButton = document.querySelector(".newitem-form__submit-button");
const popupAddCloseButton = document.querySelector(".newitem-popup__close");
const titleInput = document.querySelector(".form__input_type_title");
const linkInput = document.querySelector(".form__input_type_link");

/**
 * поведение попапов
 */
//добавить класс
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscPress);
}
//удалить класс
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscPress);
}
//обработчики крестиков
// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');
// с окончанием `s` нужно обязательно, так как много кнопок
closeButtons.forEach((button) => {
// находим 1 раз ближайший к крестику попап 
const popup = button.closest('.popup');
// устанавливаем обработчик закрытия на крестик
button.addEventListener('click', () => closePopup(popup));
});


  //добавить функцию закрытия кликом вне попапа
function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.target);
  }
}
  //добавить закрытие попапа по кнопке ESC
  function handleEscPress(event) {
    if (event.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }

/**
 * добавть попап изменения данных в профиле
 */
//добавить переключатели модификатора
const openProfilePopup = function () {
  resetErrorForm(profileFormSubmit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};

//добавить обработчик «отправки» формы
function handleProfileFormSubmit(event) {
  // отменяем стандартное поведение формы
  event.preventDefault();
  //задаем значения имен
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  //закрываем попап
  closePopup(popupProfile);
}
// зарегистрировать обработчики событий по клику
buttonOpenPopupProfile.addEventListener("click", openProfilePopup);

// прикрепляем обработчик к форме:
profileFormSubmit.addEventListener("submit", handleProfileFormSubmit);

/**
   * показать увеличенную картинку карточки
   */
  function openImagePopup(element) {
    zoomImage.setAttribute("src", element.link);
    zoomImage.setAttribute("alt", element.name);
    zoomImageName.textContent = element.name;
    openPopup(popupImage);
  }

/**
 * добавление пользовательских карточек
 * создание экземпляра класса
 */

class Card {
  constructor(element, selectorTemplate, openImagePopup) {
    //передаем параметры: имя ссылка селектор шалблона и обработчик попапа с изображением
    this._element = element;
    this._link = element.link;
    this._name = element.name;
    this._selectorTemplate = selectorTemplate;
    this._openImagePopup = openImagePopup;
  }

  //получение клонированного элемента из шаблона
  _getTemplateClone() {
    return document.querySelector(this._selectorTemplate).content.querySelector(".element").cloneNode(true)
  }

  //добавляем слушатели

  // добавить отработчик удаления
  // deleteButton.addEventListener("click", handleDeleteButton);

  // добавляем отработчик лайков
  // const handleLike = () => {
  //   likeButton.classList.toggle("element__like-button_active");
  // };
  //   likeButton.addEventListener("click", handleLike);

  _handleLike = () => {
    this._elementLikeButton.classList.toggle("element__like-button_active");
  }

  _handleDelete = () => {
    this._newElement.remove();
  }

  _handleOpenPopupImage = () => {
    this._openImagePopup(this._element);
    console.log(this);
  }

  _setEventListeners () {
    this._elementLikeButton.addEventListener('click', this._handleLike);
    this._elementDeleteButton.addEventListener('click', this._handleDelete);
    this._elementImage.addEventListener('click', this._handleOpenPopupImage);

    // this._card.querySelector('.card__image').addEventListener('click', () => {
		// 	this._openLightbox();
		// });

		// this._card.querySelector('.card__like-icon').addEventListener('click', (e) => {
		// 	e.target.classList.toggle("card__like-icon_liked");
		// });

		// this._card.querySelector('.card__delete-icon').addEventListener('click', (e) => {
		// 	e.target.closest(".card").remove();
		// });
  }

  //создание карточки элемента
  createCard() {
    this._newElement = this._getTemplateClone();
    this._elementTitle = this._newElement.querySelector(".element__title");
    this._elementImage = this._newElement.querySelector(".element__image");
    this._elementDeleteButton = this._newElement.querySelector(".element__delete-button");
    this._elementLikeButton = this._newElement.querySelector(".element__like-button");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._setEventListeners();
    return this._newElement;

  }
}


// const createCard = (element) => {
//   //клонировать шаблон и создать референсы для дочерних элементов
//   const newElement = elementTemplate.cloneNode(true);
//   const elementTitle = newElement.querySelector(".element__title");
//   const elementImage = newElement.querySelector(".element__image");
  // const deleteButton = newElement.querySelector(".element__delete-button");
  // const likeButton = newElement.querySelector(".element__like-button");

//   //задать атрибуты новым элементам
//   elementTitle.textContent = element.name;
//   elementImage.setAttribute("src", element.link);
//   elementImage.setAttribute("alt", element.name);
//   elementImage.dataset.id = element.name;

  // добавить отработчик удаления
  // deleteButton.addEventListener("click", handleDeleteButton);

  // добавляем отработчик лайков
  // const handleLike = () => {
  //   likeButton.classList.toggle("element__like-button_active");
  // };
  //   likeButton.addEventListener("click", handleLike);

  /**
   * показать увеличенную картинку карточки
   */
//   function handlePopupImageOpen() {
//     zoomImage.setAttribute("src", element.link);
//     zoomImage.setAttribute("alt", element.name);
//     zoomImageName.textContent = element.name;
//     openPopup(popupImage);
//   }
  
//   elementImage.addEventListener("click", handlePopupImageOpen);

//   return newElement;
// };

//добавляем карточки после обновления страницы
const renderCard = (element) => {
  cardsContainer.prepend(element)
};
initialCards.forEach (element => {
  const card = new Card(element, selectorTemplate, openImagePopup);
  renderCard(card.createCard());
  // console.log(card)
});


// /**
//  * удаление карточки из DOM
//  */
// function handleDeleteButton(event) {
//   //находим кнопку, по которой произошел клик
//   const button = event.target;
//   //находим ближайший элемент к классу element
//   const element = button.closest(".element");
//   //удаляем элемент
//   element.remove();
// }

/**
 * создание новой карточки
 */

// добавляем обработчик событий на кнопку
addButton.addEventListener("click", () => {

  // сбрасываем введенные значения формы и ошибки
  formAdd.reset();
  resetErrorForm(formAdd);
  //деактивировать кнопку
  popupSubmitButton.disabled = true;

  // открываем попап
  openPopup(popupAdd);
});
//закрываем попап по сабмиту
popupSubmitButton.addEventListener("click", () => {
  closePopup(popupAdd);
});

// добавляем обработчик событий на форму внутри попапа
formAdd.addEventListener("submit", handleAddFormSubmit);
function handleAddFormSubmit(event) {
  // отменяем стандартное поведение формы
  event.preventDefault();
  
  // находим значения полей для новой карточки 
  const title = titleInput.value;
  const link = linkInput.value;
  //создаем карточку с параметрами пользователя
  const newElement = {
    name: title,
    link: link,
  };
  //создаем карточку
  renderCard(createCard(newElement)); 
}

