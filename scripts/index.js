/**
 * добавть попап изменения данных в профиле
 */
//сделать выборку DOM элементов для профиля
const popupElement = document.querySelector(".profile-popup");
const popupCloseButtonElement = popupElement.querySelector(".profile-popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_job");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileFormSubmit = document.querySelector(".profile-form");
//добавляем выборку для увеличения картинки
const popupImage = document.querySelector(".zoom-popup");
const popupImageCloseButton = document.querySelector(".zoom-popup__close");
const zoomImage = document.querySelector(".popup__image");
const zoomImageName = document.querySelector(".popup__image-caption");

// //попап
// //добавить класс
// function openPopup(popupElement) {
//   popupElement.classList.add('popup_opened');
// }
// //удалить класс
// function closePopup(popupElement) {
//   popupElement.classList.remove('popup_opened');
// }

//добавить переключатели модификатора
const openProfilePopup = function () {
  popupElement.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
};
const closeProfilePopup = function () {
  popupElement.classList.remove("popup_opened");
};

//добавить обработчик «отправки» формы
function handleProfileFormSubmit(event) {
  // отменяем стандартное поведение формы
  event.preventDefault();
  //задаем значения имен
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  //закрываем попап
  closeProfilePopup();
}
// зарегистрировать обработчики событий по клику
popupOpenButtonElement.addEventListener("click", openProfilePopup);
popupCloseButtonElement.addEventListener("click", closeProfilePopup);
// прикрепляем обработчик к форме:
profileFormSubmit.addEventListener("submit", handleProfileFormSubmit);


/**
 * добавление пользовательских карточек
 */
const cardsContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector("#elementTemplate").content.querySelector(".element");

const createCard = (element) => {
  //клонировать шаблон и создать референсы для дочерних элементов
  const newElement = elementTemplate.cloneNode(true);
  const elementTitle = newElement.querySelector(".element__title");
  const elementImage = newElement.querySelector(".element__image");
  const deleteButton = newElement.querySelector(".element__delete-button");

  //задать атрибуты новым элементам
  elementTitle.textContent = element.name;
  elementImage.setAttribute("src", element.link);
  elementImage.setAttribute("alt", element.name);
  elementImage.dataset.id = element.name;

  //добавить отработчик удаления
  deleteButton.addEventListener("click", handleDeleteButton);

  // добавляем новый элемент
  cardsContainer.prepend(newElement);

  // const renderCard = (element) => {
//   cardsContainer.prepend(element)
// }

// initialCards.forEach (element => {
//   renderCard(createCard(element))
// })

  //добавляем отработчик лайков
  const likeButton = document.querySelector(".element__like-button");
  const handleLike = () => {
    likeButton.classList.toggle("element__like-button_active");
  };
    likeButton.addEventListener("click", handleLike);

  /**
   * показать увеличенную картинку карточки
   */
  function handlePopupImageOpen() {
    zoomImage.setAttribute("src", element.link);
    zoomImage.setAttribute("alt", element.name);
    zoomImageName.textContent = element.name;

    popupImage.classList.add("popup_opened");
  }
  function handlePopupImageClose() {
    popupImage.classList.remove("popup_opened");
  }
  elementImage.addEventListener("click", handlePopupImageOpen);
  popupImageCloseButton.addEventListener("click", handlePopupImageClose);

};
  initialCards.forEach(createCard);

/**
 * удаление карточки из DOM
 */
function handleDeleteButton(event) {
  //находим кнопку, по которой произошел клик
  const button = event.target;
  //находим ближайший элемент к классу element
  const element = button.closest(".element");
  //удаляем элемент
  element.remove();
}

/**
 * создание новой карточки
 */
// находим кнопку на странице
const addButton = document.querySelector(".profile__add-button");
// находим попап на странице
const popupAdd = document.querySelector(".newitem-popup");
// находим форму внутри попапа
const formAdd = document.querySelector(".newitem-form");
// находим кнопку сабмита внутри попапа
const popupSubmitButton = document.querySelector(".newitem-form__submit-button");
//находим кнопку закрытия попапа
const popupAddCloseButton = document.querySelector(".newitem-popup__close");
//находим инпут заголовка внутри формы
const titleInput = document.querySelector(".form__input_type_title");
//находим инпут линка внутри формы
const linkInput = document.querySelector(".form__input_type_link");
// добавляем обработчик событий на кнопку
addButton.addEventListener("click", () => {
  // открываем попап
  popupAdd.classList.add("popup_opened");
});

//закрываем попап по сабмиту
popupSubmitButton.addEventListener("click", () => {
  popupAdd.classList.remove("popup_opened");
});
//закрываем попап по крестику

popupAddCloseButton.addEventListener("click", () => {
  popupAdd.classList.remove("popup_opened");
});

// добавляем обработчик событий на форму внутри попапа
formAdd.addEventListener("submit", handleAddFormSubmit);
function handleAddFormSubmit(event) {
  // отменяем стандартное поведение формы
  event.preventDefault();
  
  // находим значения полей для новой карточки карточку
  const formAdd = event.target;
  const title = titleInput.value;
  const link = linkInput.value;
  //создаем карточку с параметрами пользователя
  const newElement = {
    name: title,
    link: link,
  };
  createCard(newElement);
  // сбрасываем введенные значения формы
  formAdd.reset();
}



