import FormValidator from "./FormValidator.js";
import { formEditName, formSubmitNewCard } from "./index.js";

const options = {
  formSelector: ".form",
  inputSelector: ".form__text", // поля инпута
  submitSelector: ".form__save-button",
  disabledButtonClass: "form__save-button_disabled",
  inputSectionSelector: ".form__field",
  errorSelector: ".form__text-error", // класс ошибки
  inputErrorClass: "form__text-error_visible", // класс, отвечающий за показ этой ошибки
  inputErrorBorder: "form__text_type_error", //класс, отвечающий за нижнюю красную границу инпута при ошибке
};

const nameFormValidator = new FormValidator(options, formEditName);
nameFormValidator.enableValidation();

const cardFormValidator = new FormValidator(options, formSubmitNewCard);
cardFormValidator.enableValidation();

export { nameFormValidator, cardFormValidator };