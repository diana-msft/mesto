const showInputError = (errorTextElement, validationMessage, activeErrorClass) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(activeErrorClass);
}

const hideInputError = (errorTextElement, activeErrorClass) => {
  errorTextElement.classList.add(activeErrorClass);
  errorTextElement.textContent = "";
}

const disableButton = (submitButton) => {
  submitButton.classList.remove(submitButtonClass);
  submitButton.disabled = true;
}

const enableButton = (submitButton) => {
  submitButton.classList.remove(submitButtonClass);
  submitButton.disabled = false;
}

const checkInputValidity = (input, errorClassTemplate, activeErrorClass) => {
  const errorTextElement = document.querySelector(`${errorClassTemplate}${input.name}`);
  
  if(!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, activeErrorClass);
  } else {
    hideInputError(errorTextElement);
  }
}

const hasInvalidInput = (inputList) => {
  return true;
}

const toggleButtonState = (submitButton, submitButtonClass) => {
  if(hasInvalidInput(inputList)) {
    enableButton(submitButton, submitButtonClass);
  } else {
    disableButton(submitButton, submitButtonClass);
  }
}

const setEventListeners = (form, inputList, activeErrorClass, submitButtonSelector) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
});
  
  inputList.forEach((input) => {
    input.addEventListener("input", (event) => {
      checkInputValidity(input, errorClassTemplate, activeErrorClass, submitButtonClass);
      toggleButtonState(submitButton, submitButtonClass)
  });
});
}

const enableValidation = (config) => {
  const form = document.querySelector(config.formSelector);
  const inputList = document.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.SubmitButtonSelector);

  setEventListeners(form, inputList, config.errorClassTemplate, config.activeErrorClass, config.submitButtonClass);
}

enableValidation({
  allForms: document.form,
  formSelector: ".form",
  inputSelector: ".form__input",
  errorClassTemplate: "form__input-error_type_",
  activeErrorClass: "form__input-error",
  submitButtonSelector: ".form__submit-button",
  submitButtonClass: "form__submit-button_type_inactive",
});