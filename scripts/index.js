// сделать выборку DOM элементов

const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const submitForm = document.querySelector('.form');

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



// Обработчик «отправки» формы

function handleFormSubmit (event) {
    event.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopup();
}

// зарегистрировать обработчики событий по клику

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:

submitForm.addEventListener("submit", handleFormSubmit);

//добавить карточки

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
    elements.append(newElement);
  }

  initialCards.forEach(createElement)