export default class Api {
  constructor(info) {
    this._url = info.baseUrl;
    this._token = info.token;
    this._id = info.groupId;
  }

  checkRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfo() {
    return fetch(`${this._url}/${this._id}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this.checkRes);
  }

  getInitialCards() {
    return fetch(`${this._url}/${this._id}/cards`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this.checkRes);
  }

  changeUserInfo(newUserData) {
    return fetch(`${this._url}/${this._id}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUserData.name,
        about: newUserData.about,
      }),
    }).then(this.checkRes);
  }

  addCard(card) {
    return fetch(`${this._url}/${this._id}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this.checkRes);
  }

  likeCounter() {
    return fetch(`${this._url}/${this._id}/cards`, {
      method: "GET", //так как нам надо получить с сервера количество лайков
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this.checkRes);
  }

  // debug() {
  //   console.log("DEBUGGING API CLASS")
  //   console.log(`${this._url}/${this._id}/users/me`)
  // }

  //   deleteCard() {}

  //   openPopup() {}

  //   likeCard() {}

  //   changeUserAvatar() {}

  getAppInfo() {
    // дополнительный метод, который будет возвращать Promise.all с отработкой двух методов - получение всех карточек и получение данных пользователя
    return Promise.all([this.getInfo(), this.getInitialCards()]);
  }
}
