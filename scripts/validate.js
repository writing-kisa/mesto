enableValidation({
  formSelector: ".form__field",
  inputSelector: ".form__text",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "form__save-button_disabled",
  inputErrorClass: "form__text_type_error",
  errorClass: "form__text-error_visible",
});

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const form = document.querySelector(".form__set");
console.log(form);
const formInput = form.querySelector(".form__text");
const formError = form.querySelector(`${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__text_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__text-error_visible");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__text_type_error");
  errorElement.classList.remove("form__text-error_visible");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

form.addEventListener("submit", function (evt) {
  evt.preventDefault();
});

formInput.addEventListener("input", function () {
  checkInputValidity(form, formInput);
});

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
    });
  });
};

setEventListeners(form);
