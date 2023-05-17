import {
  popupFullPhoto,
  nameFullPhoto,
  imageFullPhoto,
  openPopup,
} from "./utils.js";

class Card {
  constructor(name, link, template) {
    this._name = name;
    this._link = link;
    this._template = template;
  }

  _likeHandler() {
    this.classList.toggle("gallery__like-button_able");
    // console.log(this)
  }

  _deleteHandler = () => {
    this._view.remove();
    // this._view = null;
    console.log(this._view);
  };

  _openFullPhoto = () => {
    nameFullPhoto.textContent = this._name;
    imageFullPhoto.src = this._link;
    imageFullPhoto.alt = this._name;
    openPopup(popupFullPhoto);
  };

  render = () => {
    // console.log(this._template);
    this._view = this._template.cloneNode(true).children[0]; // где card._template это темплейт того объекта
    this._cardLink = this._view.querySelector(".gallery__photo");

    this._view.querySelector(".gallery__name").textContent = this._name;
    this._cardLink.src = this._link;
    this._cardLink.alt = this._name;

    this._view
      .querySelector(".gallery__like-button")
      .addEventListener("click", this._likeHandler);

    this._view
      .querySelector(".gallery__delete-button")
      .addEventListener("click", this._deleteHandler);

    this._view
      .querySelector(".gallery__photo")
      .addEventListener("click", this._openFullPhoto);

    return this._view;
  };
}

export default Card;
