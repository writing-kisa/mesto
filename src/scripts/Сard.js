class Card {
  constructor(name, 
    link, 
    likes,
    // cardId, 
    { handleCardClick }, template) {
    this._name = name;
    this._link = link;
    // this._id = cardId;
    this._likes = likes.length; //передаем количество лайков = длину массива, отвечающего за лайки = цифру
    this._handleCardClick = handleCardClick; //эта функция открывает попап с картинкой при клике на карточку
    this._template = template;
  }

  _likeHandler() {
    this.classList.toggle("gallery__like-button_able");
    // console.log(this)
  }

  _deleteHandler = () => {
    this._view.remove();
    // console.log(this._view);
  };

  render = () => {
    // console.log(this._template);
    this._view = this._template.cloneNode(true).children[0]; // где card._template это темплейт того объекта
    this._cardLink = this._view.querySelector(".gallery__photo");

    this._view.querySelector(".gallery__name").textContent = this._name;
    this._cardLink.src = this._link;
    this._cardLink.alt = this._name;

    // console.log(this._view.querySelector(".gallery__like-number"));
    this._view.querySelector(".gallery__like-number").textContent = this._likes;

    this._view
      .querySelector(".gallery__like-button")
      .addEventListener("click", this._likeHandler);

    this._view
      .querySelector(".gallery__delete-button")
      .addEventListener("click", this._deleteHandler);

    this._view
      .querySelector(".gallery__photo")
      .addEventListener("click", this._handleCardClick);

    return this._view;
  };
}

export default Card;
