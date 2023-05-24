export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
  };

  _handleEscClose = (evt) => {
    //содержит логику закрытия попапа клавишей Esc
    if (evt.key === "Escape") {
      this._popupSelector.classList.remove("popup_opened");
    }
  };

  setEventListeners() {
    //добавляет слушатель клика иконке закрытия попапа
    this._popupSelector
      .querySelector(".popup__close-button")
      .addEventListener("click", this.close);
    // console.log(this._popupSelector.querySelector(".popup__close-button"));

    //закрытия попапа при нажатии на оверлей
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}