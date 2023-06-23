export default class Api {
  constructor(info) {
    this._url = info.baseUrl;
    this._token = info.token;
    this._id = info.groupId;
  }

  _checkRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfo() {
    return fetch(`${this._url}/${this._id}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
    }).then(this._checkRes);
  }

  getInitialCards() {
    return fetch(`${this._url}/${this._id}/cards`, {
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
    }).then(this._checkRes);
  }

  changeUserInfo(newUserData) {
    return fetch(`${this._url}/${this._id}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: newUserData.name,
        about: newUserData.about,
      }),
    }).then(this._checkRes);
  }

  addCard(card) {
    return fetch(`${this._url}/${this._id}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this._checkRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/${this._id}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkRes);
  }

  likeCard(cardId) {
    return fetch(`${this._url}/${this._id}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkRes);
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._url}/${this._id}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkRes);
  }
  
  changeUserAvatar(avatarLink) {
    return fetch(`${this._url}/${this._id}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkRes);
  }

  getAppInfo() {
    // дополнительный метод, который будет возвращать Promise.all с отработкой двух методов - получение всех карточек и получение данных пользователя
    return Promise.all([this.getInfo(), this.getInitialCards()]);
  }
}