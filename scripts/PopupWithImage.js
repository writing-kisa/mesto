import Popup from "./Popup";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._photoName = this._popupSelector.querySelector(".popup__photo-name"); // так, ошибка тут, я всегда нахожу один и тот же элемент в дом
    this._photoLink = this._popupSelector.querySelector(".popup__full-size-photo");
  }
  open(item) { 
    this._photoName.textContent = item.name; 
    this._photoLink.src = item.link;
    this._photoLink.alt = item.name;
    console.log(item);
    super.open();
  }

//   test() {
//     console.log(lupa)
//   }
}
