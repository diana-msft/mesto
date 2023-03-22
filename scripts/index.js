console.log("Hello World!");
// Находим форму в DOM
// Воспользуйтесь методом querySelector()
//делаем выборку DOM элементов
let formElement = document.querySelector('.popup');
let formCloseButtonElement = formElement.querySelector('.popup__close');
let formOpenButtonElement = document.querySelector('.popup_is-opened');

const openPopup = function () {
    formElement.classList.add('popup_is-opened');
    console.log('Форма открыта');
};

const closePopup = function () {
    formElement.classList.remove('popup_is-opened');
    console.log('Форма закрыта');
};

const closePopupByClickOnOverlay = function (evt) {
    console.log(evt.target, evt.currentTarget);
    if (evt.target !== evt.currentTarget) {
        return;
    }
        closePopup();
    };

//регистрируем обработчики событий по клику
formOpenButtonElement.addEventListener('click', openPopup);
// formOpenButtonElement.addEventListener('click', function (event) {
//     console.log(event);
//  });
formCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('click', closePopupByClickOnOverlay);

// togglePopupVisibility();


// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__job');// Воспользуйтесь инструментом .querySelector()
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства value
let newName = nameInput.value;
let newJob = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
profileTitle.textContent = newName;
profileSubtitle.textContent = newJob;
    // Вставьте новые значения с помощью textContent
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);