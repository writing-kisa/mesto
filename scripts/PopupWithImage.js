import Popup from "./Popup";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._photoName = this._popupSelector.querySelector(".popup__photo-name");
    this._photoLink = this._popupSelector.querySelector(".popup__full-size-photo");
  }
  open = (data) => { 
    this._photoName.textContent = data.name;
    this._photoLink.src = data.link;
    this._photoLink.alt = data.name;
    super.open();
  }
}
