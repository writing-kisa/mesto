import { nameInput, bioInput } from '../src/index.js';

export default class UserInfo {
  constructor({ nameSelector, bioSelector }) { //объект с селекторами двух элементов ДОМ
    this._userName = document.querySelector(nameSelector);
    this._userBio = document.querySelector(bioSelector);
  }

  getUserInfo() { //публичный метод возвращает объект с данными пользователя
    return { name: this._userName.textContent, bio: this._userBio.textContent }
}

  setUserInfo(user) { //принимает новые данные пользователя и добавляет их на страницу
    this._userName.textContent = user.name;
    this._userBio.textContent = user.bio;// getUserInfo
  }

}