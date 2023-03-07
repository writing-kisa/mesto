const form = document.querySelector(".form__set");

// const toggleErrorState = () => {
  
// }

const setEventListeners = (form) => {

  const submitElement = form.querySelector(".form__save-button");
  const inputs = Array.from(form.querySelectorAll(".form__text"));

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      const isValid = inputElement.validity.valid;
      const inputClosestSection = inputElement.closest('.form__field');
  const errorElement = inputClosestSection.querySelector('.form__text-error');

  if (isValid) {
    errorElement.classList.remove('form__text-error_visible');
    errorElement.textContent = '';
  } else {
    errorElement.classList.add('form__text-error_visible');
    errorElement.textContent = inputElement.validationMessage;
  }
  toggleButtonState(inputs, submitElement);
    });
  });
  
  const toggleButtonState = (inputs, submitElement) => {
  const formIsValid = inputs.every((inputElement) => {
    return inputElement.validity.valid; 
  });
  if (formIsValid) {
    submitElement.removeAttribute('disabled');
    submitElement.classList.remove('form__save-button_disabled');
  } else {
    submitElement.setAttribute('disabled', true);
    submitElement.classList.add('form__save-button_disabled');
  }
  }
}

const enableValidation = () => {
  const forms = Array.from(document.querySelectorAll('.form'));
  forms.forEach((form) => {
    setEventListeners(form);
  })
}; 

enableValidation();
// const selectors = {
//   formSelector: '.form__set',
//   inputSelector: '.form__text',
//   // submitButtonSelector: '.form__save-button',
//   // inactiveButtonClass: 'form__save-button_disabled',
//   inputErrorClass: 'form__text_type_error',
//   errorClass: 'form__text-error_visible'
// }; 