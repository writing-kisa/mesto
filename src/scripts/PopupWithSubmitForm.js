import Popup from "./Popup";

export default class PopupWithSubmitForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction = (submitHandler) => { //аргумент — это функция, которую мы передадим в индекс.джиэс, а не в конструктор
    submitHandler();
  }

  setEventListeners() {
    super.setEventListeners;
    this._popup.querySelector('#delete-card_button').addEventListener("submit", () => { 
        this.setSubmitAction();
        this.close();
    });
  }
}
