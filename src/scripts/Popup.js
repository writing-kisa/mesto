export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    //содержит логику закрытия попапа клавишей Esc
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    //добавляет слушатель клика иконке закрытия попапа
    this._popup
      .querySelector(".popup__close-button")
      .addEventListener("click", this.close);
    // console.log(this._popup.querySelector(".popup__close-button"));

    //закрытия попапа при нажатии на оверлей
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}