class Card {
  constructor(
    name,
    link,
    likes,
    ownerCardId,
    cardId,
    myId,
    { handleCardClick, 
      handleDeleteCard 
    },
    template
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes.length;
    this._ownerCardId = ownerCardId;
    this._cardId = cardId;
    this._myId = myId;
    //передаем количество лайков = длину массива, отвечающего за лайки = цифру
    this._handleCardClick = handleCardClick;
    //эта функция открывает попап с картинкой при клике на карточку
    this._handleDeleteCard = handleDeleteCard;
    this._template = template;
    // this._popup = popup;
  }

  _likeHandler() {
    this.classList.toggle("gallery__like-button_able");
  }

  //приватный метод, который сравнивает айди оунера карточки с моим айди, для того, чтобы я могла удалять только свои карточки
  _deleteTrashCanForOtherUsersCards() {
    if (this._ownerCardId !== this._myId) {
      this._view.querySelector(".gallery__delete-button").remove();
    }
  }

  // _deleteHandler = () => {
  //   this._view.remove();
  // };

  render = () => {
    // console.log(this._template);
    this._view = this._template.cloneNode(true).children[0]; // где card._template это темплейт того объекта
    this._cardLink = this._view.querySelector(".gallery__photo");

    this._view.querySelector(".gallery__name").textContent = this._name;
    this._cardLink.src = this._link;
    this._cardLink.alt = this._name;

    this._view.querySelector(".gallery__like-number").textContent = this._likes;

    this._view
      .querySelector(".gallery__like-button")
      .addEventListener("click", this._likeHandler);


    this._deleteTrashCanForOtherUsersCards();

    this._view
      .querySelector(".gallery__photo")
      .addEventListener("click", this._handleCardClick);

    return this._view;
  };
}

export default Card;



    // console.log(this._likes); //верно отображается
    // console.log(this._ownerCardId); //верно отображается
    // console.log(this._cardId);

    // console.log("мой айди внутри класса кард", this._myId); // все корректно

  //   this._view
    //   .querySelector(".gallery__delete-button")
    //   .addEventListener("click", this._handleDeleteCard