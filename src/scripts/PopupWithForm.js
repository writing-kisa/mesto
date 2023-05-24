import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleSubmit }) {
      super(popupSelector);
      this._handleSubmit = handleSubmit; //колбэк сабмита формы
      this._form = this._popupSelector.querySelector(".form");
      this._inputs = Array.from(this._form.querySelectorAll(".form__text"));
    }

    _getInputValues() { //собирает данные всех полей формы
      this._inputData = {};
      this._inputs.forEach(input => {
        return this._inputData[input.name] = input.value;
    })
      return this._inputData;
    }

    setInputValues(user) {
      this._inputs.forEach(input => {
        input.value = user[input.name];
    })
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleSubmit(this._getInputValues()); // колбэк сабмита формы (для каждой формы будет разным)
        this.close();
    }); 
    }

    close() {
      super.close();
      this._form.reset();
    }
}