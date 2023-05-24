import Card from "./scripts/Сard.js";
import FormValidator from "./scripts/FormValidator.js";
import options from "./scripts/validationConfig.js";
import {
  popupFullPhoto,
  nameFullPhoto,
  imageFullPhoto,
} from "./scripts/utils.js";
import initialCards from "./data/initial_cards.js";
import './pages/index.css';
import Section from "./scripts/Section.js";
import Popup from "./scripts/Popup.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";

const buttonEditName = document.querySelector(".profile__button-change-name");
const formEditName = document.querySelector("#submit_name_form");
const nameInput = formEditName.querySelector("#text-name");
const bioInput = formEditName.querySelector("#text-bio");
const formSubmitNewCard = document.querySelector("#submit_new-card_form");
const buttonAddCard = document.querySelector(".profile__button-add-photo");

const cardTemplate = document.querySelector("#cards").content;
const cardListSection = ".gallery";
const popupOpenFullPhotoSelector = '#full-size-popup';
const popupWithImage = new PopupWithImage(popupOpenFullPhotoSelector);

const createCard = (item) => { //функция создания карточки
  const newCard = new Card(
    item.name, 
    item.link, 
    { handleCardClick: () => {
      popupWithImage.open(item);
      popupWithImage.setEventListeners();
    }},
    cardTemplate); 
  const cardElement = newCard.render(); //отрисовываем карточку
  return cardElement; //возвращаем карточку
}; 

const cardList = new Section({
  items: initialCards,
  renderer: (element) => {    // функция, которая отвечает за создание и отрисовку данных на странице
    const cardElement = createCard(element);
    cardList.addItem(cardElement);
  },
}, 
cardListSection
)

cardList.renderItems(); // добавляем карточки из массива в DOM

const popupEditNameSelector = "#edit_profile";
const popupAddCardSelector = "#add_card";

const popupEditName = new Popup(popupEditNameSelector);
const popupAddCard = new Popup(popupAddCardSelector);

const profileInfoSelectors = {
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio"
}

const userInfo = new UserInfo(profileInfoSelectors);


// экземпляр попапа с формой для добавления карточки через нее

const popupAddNewCardForm = new PopupWithForm(popupAddCardSelector, { handleSubmit: (data) => { 
  const cardElement = createCard(data);
  cardList.addItem(cardElement);
}});

popupAddNewCardForm.setEventListeners();

// экземпляр попапа с формой для изменения информации о пользователе
const popupEditNameForm = new PopupWithForm(popupEditNameSelector, 
  { handleSubmit: (data) => {
      userInfo.setUserInfo(data);
  }
  });

popupEditNameForm.setEventListeners();

buttonEditName.addEventListener("click", function () {
  popupEditName.open();
  popupEditNameForm.setInputValues(userInfo.getUserInfo());  
  nameFormValidator.resetFormValidation();
});

buttonAddCard.addEventListener("click", function () {
  popupAddCard.open()
  cardFormValidator.resetFormValidation();
});

const nameFormValidator = new FormValidator(options, formEditName);
nameFormValidator.enableValidation();

const cardFormValidator = new FormValidator(options, formSubmitNewCard);
cardFormValidator.enableValidation();

export {
  popupFullPhoto,
  nameFullPhoto,
  imageFullPhoto,
  formEditName,
  formSubmitNewCard,
  nameInput,
  bioInput
};