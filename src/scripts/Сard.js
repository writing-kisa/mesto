class Card {
  constructor(
    name,
    link,
    likes,
    ownerCardId,
    cardId,
    myId,
    { 
      handleCardClick, 
      handleDeleteCard,
      handleLike,
      handleDislike
      },
    template
  ) {
    this._name = name;
    this._link = link;
    this._likesOwners = likes;
    this._likes = likes.length;    //передаем количество лайков = длину массива, отвечающего за лайки = цифру
    this._ownerCardId = ownerCardId;
    this._cardId = cardId;
    this._myId = myId;
    this._handleCardClick = handleCardClick;    //эта функция открывает попап с картинкой при клике на карточку
    this._handleDeleteCard = handleDeleteCard; // эта функция отвечает за удаление карточки
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._template = template;
  }

  _likeHandler() {
    this.classList.toggle("gallery__like-button_able");
  }

  // _isLiked() { // проверяет, залайкана ли карточка
  //   this._view.
  // }

  _likeCounter() { //будет отвечать за обновление счетчика лайков, за визуальное отображение лайков
    this._view.querySelector(".gallery__like-number").textContent = this._likes; //строка выставлять нужное количество лайков в счетчик - готово
    // if (this._likesOwners.includes(this._myId)) { //проверять, есть ли среди лайков тот, который был поставлен текущим пользователем и исходя из этого выставлять нужный класс индикатору лайка, то есть this.classList.add("gallery__like-button_able");
    //     this.classList.add("gallery__like-button_able");
    // }
  }

  setLikeInfo() {
    //- обновлять массив лайков в свойствах класса 
    //- вызывать метод о котором я написал в начале (его надо использовать и при обновлении лайков, и при начальной отрисовке)
    this._likeCounter()
  }

  //приватный метод, который сравнивает айди оунера карточки с моим айди, для того, чтобы я могла удалять только свои карточки
  _deleteTrashCanForOtherUsersCards() {
    if (this._ownerCardId !== this._myId) {
      this._view.querySelector(".gallery__delete-button").remove();
    }
  }

  deleteHandler = () => {
    this._view.remove();
  };

  render = () => {
    // console.log(this._template);
    this._view = this._template.cloneNode(true).children[0]; // где card._template это темплейт того объекта
    this._cardLink = this._view.querySelector(".gallery__photo");

    this._view.querySelector(".gallery__name").textContent = this._name;
    this._cardLink.src = this._link;
    this._cardLink.alt = this._name;

    this.setLikeInfo();

    // this._view.querySelector(".gallery__like-number").textContent = this._likes;

    this._view
      .querySelector(".gallery__like-button")
      .addEventListener("click", this._likeHandler);

    // console.log(this._view.querySelector(".gallery__delete-button"));
    // console.log("в зис вью в рендере =====> ", this._view);
    // console.log(this._likesOwners)

    this._view
      .querySelector(".gallery__delete-button")
      .addEventListener("click", this._handleDeleteCard); //при нажатии на корзину, вызывается хэндл делит кард, функция колбэк, которую мы передаем в индекс джс, в ней мы открываем попап "вы уверены?"

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
