const options = {
  formSelector: ".form",
  inputSelector: ".form__text",
  submitSelector: ".form__save-button",
  disabledButtonClass: "form__save-button_disabled",
  inputSectionSelector: ".form__field",
  errorSelector: ".form__text-error", // класс ошибки
  inputErrorClass: "form__text-error_visible", // класс, отвечающий за показ этой ошибки
  inputErrorBorder: "form__text_type_error", //класс, отвечающий за нижнюю красную границу инпута при ошибке
};

const showError = (errorElement, inputElement, message, options) => {
  errorElement.classList.add(options.inputErrorClass);
  inputElement.classList.add(options.inputErrorBorder);
  errorElement.textContent = message;
};

const hideError = (errorElement, inputElement, options) => {
  errorElement.classList.remove(options.inputErrorClass);
  inputElement.classList.remove(options.inputErrorBorder);
  errorElement.textContent = "";
};

const toggleInputState = (inputElement, options) => {
  const isValid = inputElement.validity.valid;
  const inputClosestSection = inputElement.closest(
    options.inputSectionSelector
  );
  // console.log(inputClosestSection);
  const errorElement = inputClosestSection.querySelector(options.errorSelector);
  // console.log(errorElement);
  if (isValid) {
    hideError(errorElement, inputElement, options);
  } else {
    showError(
      errorElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  }
};

const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
  const formIsValid = inputs.every((inputElement) => {
    return inputElement.validity.valid;
  });
  if (formIsValid) {
    enableButton(submitElement, disabledButtonClass);
  } else {
    disableButton(submitElement, disabledButtonClass);
  }
};

const enableButton = (buttonElement, disabledButtonClass) => {
  buttonElement.removeAttribute("disabled");
  buttonElement.classList.remove(disabledButtonClass);
};

const disableButton = (buttonElement, disabledButtonClass) => {
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(disabledButtonClass);
};

const setEventListeners = (form, options) => {
  const submitElement = form.querySelector(options.submitSelector);
  const inputs = Array.from(form.querySelectorAll(options.inputSelector));

  toggleButtonState(inputs, submitElement, options.disabledButtonClass);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleButtonState(inputs, submitElement, options.disabledButtonClass);
      toggleInputState(inputElement, options);
    });
  });
};

const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, options);
  });
};

enableValidation(options);
