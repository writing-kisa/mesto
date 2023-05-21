export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close = () => {
    this._popupSelector.classList.remove("popup_opened");
    //   document.removeEventListener("keydown", closeByEsc);
  }

  _handleEscClose = () => {
    //содержит логику закрытия попапа клавишей Esc
    if (this.key === "Escape") {
      const popupOpened = document.querySelector(".popup_opened");
      close(popupOpened);
    }
  }

  setEventListeners() {
    //добавляет слушатель клика иконке закрытия попапа
    this.querySelector(".popup__close-button").addEventListener('click', close) //вопрос, можно ли использовать this, и возможно надо будет event.target как-то использовать
  }

  // почему-то не работает render

//   render() { 
//     console.log(this._popupSelector)
//   }
}

// popup.classList.add("popup_opened");
// document.addEventListener("keydown", closeByEsc);
