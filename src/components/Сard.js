class Card {
  constructor(
    name, link, likes, ownerCardId, cardId, myId,
    { handleCardClick, handleDeleteCard, handleLike, handleDislike },
    template
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes; //передаем массив лайков
    this._ownerCardId = ownerCardId;
    this._cardId = cardId;
    this._myId = myId;
    this._handleCardClick = handleCardClick;    //эта функция открывает попап с картинкой при клике на карточку
    this._handleDeleteCard = handleDeleteCard; // эта функция отвечает за удаление карточки
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._template = template;
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
  
  _isLiked() { //метод, который показывает, лайкнута карточка или нет
    return this._likes.some(cardLike => cardLike._id === this._myId);
  }

  _colorHeartHandler() {
    if (this._isLiked()) {
      this._view.querySelector(".gallery__like-button").classList.add("gallery__like-button_able");
    } else {
      this._view.querySelector(".gallery__like-button").classList.remove("gallery__like-button_able");
    }
  }

  //приватный метод, который отвечает за количество лайков и цвет сердечка на странице и отрисовывает
  _likeCounter() {
    this._view.querySelector('.gallery__like-number').textContent = this._likes.length;
    this._colorHeartHandler();
  }

  setLikeInfo(card) { //принимает данные карточки после отправки api запросов, включая лайки, она должна отображать новые данные на странице
    this._likes = card.likes; //здесь обновляем весь массив лайков, а не только длину массива, в этом была моя ошибка, потому что это не отображает реальных данных
    this._likeCounter();
  }


  render = () => {
    this._view = this._template.cloneNode(true).children[0]; // где card._template это темплейт того объекта
    this._cardLink = this._view.querySelector(".gallery__photo");

    this._view.querySelector(".gallery__name").textContent = this._name;
    this._cardLink.src = this._link;
    this._cardLink.alt = this._name;

    this._likeCounter();

    this._view
      .querySelector(".gallery__like-button")
      .addEventListener("click", () => {
        if (!this._isLiked()) {
          this._handleLike();
        } else {
          this._handleDislike();
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