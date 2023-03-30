// сделать выборку DOM элементов
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.form__submit-button');
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

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
    // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    closePopup();
}

// зарегистрировать обработчики событий по клику
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('click', handleFormSubmit);
