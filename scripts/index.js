console.log("Hello World!");
// Находим форму в DOM
let formElement = document.querySelector('.popup');// Воспользуйтесь методом querySelector()
let formCloseButtonElement = formElement.querySelector('.popup__close');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__job');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);