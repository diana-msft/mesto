// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const validateConfig = {
  allforms: document.forms,
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  errorSelectorTemplate: '.form__error_type_',
  disableButtonClass: 'form__submit-button:disabled',
  inputErrorClass: 'form__input_type_invalid',
  textErrorClass: 'form__error_type_active',
};

enableValidation(validateConfig);

function enableValidation(config) {
  const forms = Array.from(config.allforms);
  forms.forEach((form) => {
    const inputs = form.querySelectorAll(config.inputSelector);
    const button = form.querySelector(config.submitButtonSelector);
    hangEventListeners(inputs, button, config.errorSelectorTemplate, config.disableButtonClass, config.inputErrorClass, config.textErrorClass);
  })
}

  function hangEventListeners(inputs, button, errorSelectorTemplate, disableButtonClass, inputErrorClass, textErrorClass) {
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(input, errorSelectorTemplate, inputErrorClass, textErrorClass);
        toggleButtonState(inputs, button, disableButtonClass);
      })
      
    })
  }

  function checkInputValidity(input, errorSelectorTemplate, inputErrorClass, textErrorClass) {
    const errorTextElement = document.querySelector(`${errorSelectorTemplate}${input.name}`);
    if (input.validity.valid) {
      hideInputError(input, errorTextElement, inputErrorClass, textErrorClass);
    } else {
      showInputError(input, errorTextElement, textErrorClass);
    }
  }

  //скрыть ошибку
  function hideInputError(input, errorTextElement, inputErrorClass, textErrorClass) {
    input.classList.remove(inputErrorClass);
    errorTextElement.textContent = '';
    errorTextElement.classList.remove(textErrorClass);
  }

  //показать ошибку
  function showInputError(input, errorTextElement, inputErrorClass, textErrorClass) {
    input.classList.add(inputErrorClass);
    errorTextElement.textContent = input.validationMessage;
    errorTextElement.classList.add(textErrorClass);
  }

  // проверка на наличие невалидных инпутов
  function toggleButtonState(inputs, button, disableButtonClass) {
    hasValidInput(inputs) ? disableButton(button, disableButtonClass): enableButton(button, disableButtonClass) ; 
  }

  function hasValidInput(inputs) {
    return Array.from(inputs).some((input) => !input.validity.valid);
  }

  
  //деактивация кнопки
  function enableButton(button, disableButtonClass) {
    button.classList.remove(disableButtonClass);
    button.disabled = false;
  }

  function disableButton(button, disableButtonClass) {
    button.classList.add(disableButtonClass);
    button.disabled = true;
  }
 
  //обнуление ошибок
  function resetErrorForm(form){
    form.querySelectorAll(validateConfig.inputSelector).forEach((input) => {
      const errorTextElement = form.querySelector(validateConfig.errorSelectorTemplate + input.name);
      if (!input.validity.valid) {
        hideInputError(input, errorTextElement, validateConfig.inputErrorClass, validateConfig.textErrorClass);
    }});
    function hideInputError(input, errorTextElement, inputErrorClass, textErrorClass) {
      input.classList.remove(inputErrorClass);
      errorTextElement.classList.remove(textErrorClass);
      errorTextElement.textContent = '';
    }
  }