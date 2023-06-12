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
    this._likes = likes;    //передаем массив лайков
    this._ownerCardId = ownerCardId;
    this._cardId = cardId;
    this._myId = myId;
    this._handleCardClick = handleCardClick;    //эта функция открывает попап с картинкой при клике на карточку
    this._handleDeleteCard = handleDeleteCard; // эта функция отвечает за удаление карточки
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._template = template;
  }

  _isLiked() { // проверяет, есть ли мой лайк на карточке
    const isLikedByMe = this._likes.some(owner => { return owner._id === this._myId} );
    // console.log("inside isLiked ====> likes", this._likes);
    return isLikedByMe;
  }

  debug() {
    const result = this._isLiked();
    console.log(result) //выводит значение булиан!!!!
  }

  _heartColorHandler() {
    if (this._isLiked()) { //проверять, есть ли среди лайков тот, который был поставлен текущим пользователем и исходя из этого выставлять нужный класс индикатору лайка, то есть this.classList.add("gallery__like-button_able");
      this._view.querySelector(".gallery__like-button").classList.add("gallery__like-button_able"); // color heart
      console.log("вызов внутри _heartColorHandler должно сердечко стать черным") //нашла ошибку, эта строчка не выводится при нажатии на светлое сердечко = сюда функция не попадает!
    } else {
      this._view.querySelector(".gallery__like-button").classList.remove("gallery__like-button_able"); // remove color
      console.log("вызов внутри _heartColorHandler должно сердечко стать светлым")
    }
  }

  _likeCounter() { //будет отвечать за обновление счетчика лайков, за визуальное отображение лайков
    console.log("вызов внутри _likeCounter 11111")
    this._view.querySelector(".gallery__like-number").textContent = this._likes.length; //строка выставлять нужное количество лайков в счетчик - готово
    this._heartColorHandler();
    console.log("вызов внутри _likeCounter 22222")
    console.log("вызов внутри _likeCounter 33333")
  }

  setLikeInfo(card) { //method B
    this._likes.length = card.likes.length; //- обновлять массив лайков в свойствах класса 
    this._likeCounter();
    // console.log("вызов публичного метода сетлайк инфо")
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
    this._view = this._template.cloneNode(true).children[0]; // где card._template это темплейт того объекта
    this._cardLink = this._view.querySelector(".gallery__photo");

    this._view.querySelector(".gallery__name").textContent = this._name;
    this._cardLink.src = this._link;
    this._cardLink.alt = this._name;

    this._likeCounter();

    this.debug();

    this._view
      .querySelector(".gallery__like-button")
      .addEventListener("click", () => {
        if (this._isLiked()) { //если при клике на сердечко карточка лайкнута, то убираем лайк
          console.log("вызываю хэндл дизлайк")
          this._handleDislike()
        } else { //но если не лайкнута, то ставим
          console.log("вызываю хэндл ЛАЙК")
          this._handleLike();
        }
      });

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