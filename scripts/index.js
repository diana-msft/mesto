console.log("Hello World!");


// сделать выборку DOM элементов
let formElement = document.querySelector('.popup');
let formCloseButtonElement = formElement.querySelector('.popup__close');
let formOpenButtonElement = document.querySelector('.profile__edit-button');

// добавить переключатели модификатора
let openPopup = function () {
    formElement.classList.add('popup_opened');
    console.log('Форма открыта');
};

let closePopup = function () {
    formElement.classList.remove('popup_opened');
    console.log('Форма закрыта');
};

// добавить функцию клик вне попапа
// target - ссылка на элемент, который вызвал событие
// currentTarget - ссылка на элемент (слушатель), 
// на который навешен обработчик
let closePopupByClickOnOverlay = function (event) {
    console.log(event.target, event.currentTarget);
    if (event.target !== event.currentTarget) {
        return;
    }
        closePopup();
    };

// зарегистрировать обработчики событий по клику
formOpenButtonElement.addEventListener('click', openPopup);
formCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('click', closePopupByClickOnOverlay);


// сделать выборку DOM элементов

let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handleFormSubmit (event) {
    event.preventDefault(); 
    // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
const newName = nameInput.value;
const newJob = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
profileTitle.textContent = newName;
profileSubtitle.textContent = newJob;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
