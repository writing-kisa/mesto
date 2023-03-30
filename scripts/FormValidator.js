class FormValidator {
  constructor(options, form) {
    this._inputSelector = options.inputSelector;
    this._submitSelector = options.submitSelector;
    this._disabledButtonClass = options.disabledButtonClass;
    this._inputSectionSelector = options.inputSectionSelector;
    this._errorSelector = options.errorSelector;
    this._inputErrorClass = options.inputErrorClass;
    this._inputErrorBorder = options.inputErrorBorder;
    this._form = form;
  }

  _showError = (errorElement, inputElement, message) => {
    errorElement.classList.add(this._inputErrorClass);
    inputElement.classList.add(this._inputErrorBorder);
    errorElement.textContent = message;
  };

  _hideError = (errorElement, inputElement) => {
    errorElement.classList.remove(this._inputErrorClass);
    inputElement.classList.remove(this._inputErrorBorder);
    errorElement.textContent = "";
  };

  _toggleInputState = (inputElement) => {
    const isValid = inputElement.validity.valid;
    // console.log(inputElement);
    const inputClosestSection = inputElement.closest(
      this._inputSectionSelector
    );
    // console.log(inputClosestSection);
    const errorElement = inputClosestSection.querySelector(this._errorSelector);
    // console.log(errorElement);
    if (isValid) {
      this._hideError(errorElement, inputElement);
    } else {
      this._showError(
        errorElement,
        inputElement,
        inputElement.validationMessage
      );
    }
  };

  _toggleButtonState() {
    const formIsValid = this._inputs.every((inputElement) => {
      return inputElement.validity.valid;
    });
    if (formIsValid) {
      this._enableButton(this._submitElement);
    } else {
      this._disableButton(this._submitElement);
    }
  };

  _enableButton = () => {
    this._submitElement.removeAttribute("disabled");
    this._submitElement.classList.remove(this._disabledButtonClass);
  };

  _disableButton = () => {
    this._submitElement.setAttribute("disabled", true);
    this._submitElement.classList.add(this._disabledButtonClass);
  };

  _setEventListeners = () => {
    // console.log(this);
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector)); //работает!!!
    // console.log(this._inputs);
    this._submitElement = this._form.querySelector(this._submitSelector); //работает!!!
    // console.log(this._submitElement);

    this._toggleButtonState();

    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState(
          this._inputs,
          this._submitElement,
          this._disabledButtonClass
        );
        this._toggleInputState(inputElement);
      });
    });
  };

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;

// const showError = (errorElement, inputElement, message, options) => {
//     errorElement.classList.add(options.inputErrorClass);
//     inputElement.classList.add(options.inputErrorBorder);
//     errorElement.textContent = message;
//   };

//   const hideError = (errorElement, inputElement, options) => {
//     errorElement.classList.remove(options.inputErrorClass);
//     inputElement.classList.remove(options.inputErrorBorder);
//     errorElement.textContent = "";
//   };

// const forms = Array.from(document.querySelectorAll(options.formSelector));

// const removeValidationErrors = (form, options) => {
//   const inputs = Array.from(form.querySelectorAll('.form__text'));
//   inputs.forEach((input) => {
//     const errorText = form.querySelector(`.${input.id}-error`);
//     if (form.querySelector(`.${input.id}-error`).classList.contains(options.inputErrorClass)) {
//       hideError(errorText, input, options)
//     }
// })
// };

// const toggleInputState = (inputElement, options) => {
//   const isValid = inputElement.validity.valid;
//   const inputClosestSection = inputElement.closest(
//     options.inputSectionSelector
//   );
//   // console.log(inputClosestSection);
//   const errorElement = inputClosestSection.querySelector(options.errorSelector);
//   // console.log(errorElement);
//   if (isValid) {
//     hideError(errorElement, inputElement, options);
//   } else {
//     showError(
//       errorElement,
//       inputElement,
//       inputElement.validationMessage,
//       options
//     );
//   }
// };

// const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
//   const formIsValid = inputs.every((inputElement) => {
//     return inputElement.validity.valid;
//   });
//   if (formIsValid) {
//     enableButton(submitElement, disabledButtonClass);
//   } else {
//     disableButton(submitElement, disabledButtonClass);
//   }
// };

// const enableButton = (buttonElement, disabledButtonClass) => {
//   buttonElement.removeAttribute("disabled");
//   buttonElement.classList.remove(disabledButtonClass);
// };

// const disableButton = (buttonElement, disabledButtonClass) => {
//   buttonElement.setAttribute("disabled", true);
//   buttonElement.classList.add(disabledButtonClass);
// };

// const setEventListeners = (form, options) => {
//   const submitElement = form.querySelector(options.submitSelector);
//   const inputs = Array.from(form.querySelectorAll(options.inputSelector));

//   toggleButtonState(inputs, submitElement, options.disabledButtonClass);

//   inputs.forEach((inputElement) => {
//     inputElement.addEventListener("input", () => {
//       toggleButtonState(inputs, submitElement, options.disabledButtonClass);
//       toggleInputState(inputElement, options);
//     });
//   });
// };

// const enableValidation = (options) => {
//   forms.forEach((form) => {
//     setEventListeners(form, options);
//   });
// };

// enableValidation(options);
