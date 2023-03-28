import { openPopup, popupFullPhoto, nameFullPhoto, imageFullPhoto } from "./index.js";

class Card {
  static _template = document.querySelector("#cards").content;

  constructor(name, link, container) {
    //нужно указать container, т.к. классу нужно указание, куда ему отрисоваться
    this._name = name;
    this._link = link;
    this._container = container;
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
    imageFullPhoto.alt = this._link;
    openPopup(popupFullPhoto);
  }

  render = () => {
    this._view = Card._template.cloneNode(true).children[0]; // где card._template это темплейт того объекта

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

// function createCard(name, link) {
//   const cardElement = cardTemplate
//     .querySelector(".gallery__cell")
//     .cloneNode(true);
//   const cardName = cardElement.querySelector(".gallery__name");
//   const cardLink = cardElement.querySelector(".gallery__photo");

//   cardName.textContent = name; // соотнесение с разметкой DONE
//   cardLink.src = link; // соотнесение с разметкой
//   cardLink.alt = name; // соотнесение с разметкой

//   cardElement //функция добавления лайка DONE
//     .querySelector(".gallery__like-button")
//     .addEventListener("click", function (evt) {
//       evt.target.classList.toggle("gallery__like-button_able");
//     });

//   cardElement //функция удаления карточки при нажатии на корзину DONE
//     .querySelector(".gallery__delete-button")
//     .addEventListener("click", function () {
//       cardElement.remove();
//     });

//   cardLink.addEventListener("click", function () { //открытие попапа в полный размер
//     nameFullPhoto.textContent = cardName.textContent;
//     imageFullPhoto.src = cardLink.src;
//     openPopup(popupFullPhoto);
//   });

//   return cardElement;
// }
