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

  _removeValidationErrors() {
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    // console.log(this._inputs);
    this._inputs.forEach((input) => {
      const errorText = this._form.querySelector(`.${input.id}-error`);
      if (this._form.querySelector(`.${input.id}-error`).classList.contains(this._inputErrorClass)) {
        this._hideError(errorText, input)
      }
  })
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

  _disableButton() {
    this._submitElement.setAttribute("disabled", true);
    this._submitElement.classList.add(this._disabledButtonClass);
  };

  _setEventListeners = () => {
    // console.log(this);
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    // console.log(this._inputs);
    this._submitElement = this._form.querySelector(this._submitSelector);
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

  publicMethod() {
    this._disableButton();
    this._removeValidationErrors();
  }
}

export default FormValidator;