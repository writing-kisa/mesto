import { popupFullPhoto, nameFullPhoto, imageFullPhoto, openPopup } from "./utils.js";

class Card {

  constructor(name, link, container) { //нужно указать container, т.к. классу нужно указание, куда ему отрисоваться
    this._name = name;
    this._link = link;
    this._container = container;
    this._template = document.querySelector("#cards").content;
  }

  _likeHandler() {
    this.classList.toggle("gallery__like-button_able");
    // console.log(this)
  }

  _deleteHandler = () => {
    this._view.remove();
    // console.log(this)
  };

  _openFullPhoto = () => {
    nameFullPhoto.textContent = this._name;
    imageFullPhoto.src = this._link;
    imageFullPhoto.alt = this._name;
    openPopup(popupFullPhoto);
  }

  render = () => {
    // console.log(this._template);
    this._view = this._template.cloneNode(true).children[0]; // где card._template это темплейт того объекта

    this._view.querySelector(".gallery__name").textContent = this._name;
    this._view.querySelector(".gallery__photo").src = this._link;
    this._view.querySelector(".gallery__photo").alt = this._name;

    this._view
      .querySelector(".gallery__like-button")
      .addEventListener("click", this._likeHandler);

    this._view
      .querySelector(".gallery__delete-button")
      .addEventListener("click", this._deleteHandler);

    this._view.querySelector(".gallery__photo").addEventListener("click", this._openFullPhoto);

    this._container.prepend(this._view);
  };
}

export default Card;