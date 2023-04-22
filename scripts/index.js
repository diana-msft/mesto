// сделать выборку DOM элементов

const popupElement = document.querySelector('.popup_edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const submitForm = document.querySelector('.form_edit');

// добавить переключатели модификатора

const openPopup = function () {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
};

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
};

// добавить функцию клик вне попапа
// target - ссылка на элемент, который вызвал событие
// currentTarget - ссылка на элемент (слушатель), 
// на который навешен обработчик
// let closePopupByClickOnOverlay = function (event) {
//     console.log(event.target, event.currentTarget);
//     if (event.target !== event.currentTarget) {
//         return;
//     }
//         closePopup();
//     };
// popupElement.addEventListener('click', closePopupByClickOnOverlay);



// обработчик «отправки» формы
function handleFormSubmit (event) {
    event.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup();
}

// зарегистрировать обработчики событий по клику
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

// прикрепляем обработчик к форме:
submitForm.addEventListener("submit", handleFormSubmit);

//добавляем карточки
const initialCards = [
    {
      name: 'Ала-Куль',
      link: './images/alakol-unsplash.jpg',
      alt: 'озеро с голубой водой в горах',
    },
    {
      name: 'Каракол',
      link: './images/karakol-unsplash.jpg',
      alt: 'ели в снегу на фоне голубого неб',
    },
    {
      name: 'Кегеты',
      link: './images/kegety-unsplash.jpg',
      alt: 'горное ущелье с зелеными елями',
    },
    {
      name: 'Нарын',
      link: './images/naryn-unsplash.jpg',
      alt: 'пастух на лошади на фоне гор',
    },
    {
      name: 'Сон-Куль',
      link: './images/sonkul-unsplash.jpg',
      alt: 'юрта на фоне озера',
    },
    {
      name: 'Иссык-Куль',
      link: './images/issykul-unsplash.jpg',
      alt: 'прозрачное озеро с камнями',
    }
  ]; 

  const elements = document.querySelector('.elements');
  const elementTemplate = document.querySelector('#elementTemplate').content;

  const createElement = (element) => {
    const newElement = elementTemplate.cloneNode(true);
    const elementTitle = newElement.querySelector('.element__title');
    elementTitle.textContent = element.name;
    const elementImage = newElement.querySelector('.element__image');
    elementImage.setAttribute('src', element.link);
    elementImage.setAttribute('alt', element.alt);
    elementImage.dataset.id = element.name;
    const deleteButton = newElement.querySelector('.element__delete-button');
    deleteButton.addEventListener('click', handleDeleteButton); 
    elements.prepend(newElement);
    //добавляем лайки
    const likeButton = document.querySelector('.element__like-button');
    const handleLike = () => {
    likeButton.classList.toggle('element__like-button_active');}
    likeButton.addEventListener('click', handleLike);
  }

  initialCards.forEach(createElement)

 //удаление карточки
  function handleDeleteButton (event) {
    const button = event.target
    const element = button.closest('.element');
    element.remove();
  }

//---------создание новой карточки----------//

// находим кнопку на странице
const addButton = document.querySelector('.profile__add-button');

// находим попап на странице
const popupAdd = document.querySelector('.popup_add');

// находим форму внутри попапа
const formAdd = document.querySelector('.form_add');

// находим сабмит внутри попапа
const popupSubmit = document.querySelector('.form__submit-button_add');

//находим кнопку закрытия попапа
const popupAddCloseButton = document.querySelector('.popup_add_close');

//находим инпут заголовка внутри формы
const titleInput = document.querySelector('.form__input_type_title');

//находим инпут линка внутри формы
const linkInput = document.querySelector('.form__input_type_link');

// добавляем обработчик событий на кнопку
addButton.addEventListener('click', () => {
  // открываем попап
  popupAdd.classList.add('popup_opened');
});

// закрываем попап по клику
popupSubmit.addEventListener('click', () => {
  popupAdd.classList.remove('popup_opened');
});

// закрываем попап по крестику
popupAddCloseButton.addEventListener('click', () => {
  popupAdd.classList.remove('popup_opened');
})

// добавляем обработчик событий на форму внутри попапа
formAdd.addEventListener('submit', handleAddFormSubmit) 
function handleAddFormSubmit (event) {
  // отменяем стандартное поведение формы
  event.preventDefault()
  // добавляем карточку
  const formAdd = event.target
  const title = titleInput.value
  const link = linkInput.value
  const newElement = {
    name: title,
    link: link,
  }
  createElement(newElement);
  }

// сбрасываем значения формы
  formAdd.reset();

// https://picsum.photos/200/300


//---------открытие попапа с картинкой----------//



