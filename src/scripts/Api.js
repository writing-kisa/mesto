export default class Api {
  constructor(info) {
    this._url = info.baseUrl;
    this._token = info.token;
    this._id = info.groupId;
  }

  // checkRes() {
  //   (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  // }

  getInfo() {
    return fetch(`${this._url}/${this._id}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  getInitialCards() {
    return fetch(`${this._url}/${this._id}/cards`, {
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  changeUserInfo() {
    return fetch(`${this._url}/${this._id}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist'
      })
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    );
  }

  // addCard() {}

  // debug() {
  //   console.log("DEBUGGING API CLASS")
  //   console.log(`${this._url}/${this._id}/users/me`)
  // }

  //   likeCard() {}

  //   likeCounter() {}

  //   deleteCard() {}

  //   openPopup() {}


  //   changeUserAvatar() {}

  getAppInfo() {
    // дополнительный метод, который будет возвращать Promise.all с отработкой двух методов - получение всех карточек и получение данных пользователя
    return Promise.all([this.getInfo(), this.getInitialCards()]);
  }
}
