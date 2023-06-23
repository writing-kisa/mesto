export default class UserInfo {
  constructor({ nameSelector, bioSelector, avatarSelector }) { //объект с селекторами двух элементов ДОМ
    this._userName = document.querySelector(nameSelector);
    this._userBio = document.querySelector(bioSelector);
    this._userAvatar = document.querySelector(avatarSelector)
  }

  getUserInfo() { //публичный метод возвращает объект с данными пользователя
      return { name: this._userName.textContent, about: this._userBio.textContent, avatar: this._userAvatar.src }
}

  setUserInfo(user) { //принимает новые данные пользователя и добавляет их на страницу
    if (user.name && user.about) {
      this._userName.textContent = user.name;
      this._userBio.textContent = user.about;
    } else {
      return "error"
    }
  }

  setUserAvatar(user) {
    if (user.avatar) {
      this._userAvatar.src = user.avatar;
    } else {
      return "error"
    }
  }
}