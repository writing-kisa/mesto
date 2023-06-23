import Popup from "./Popup";

export default class PopupWithSubmitForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction = (submitHandler) => { //аргумент — это функция, которую мы передадим в индекс.джиэс, а не в конструктор
    this.submitHandler = submitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('#delete-card_button').addEventListener("click", () => this.submitHandler());  //колбэк, в которую мы передадим функцию, которую создадим специально в основном файле, по сути она должна: вызывать метод api, который удалит карточку
        // console.log(this); 
  }
}
