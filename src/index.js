import Card from "./scripts/Сard.js";
import FormValidator from "./scripts/FormValidator.js";
import options from "./scripts/validationConfig.js";
import {
  popupFullPhoto,
  nameFullPhoto,
  imageFullPhoto,
  buttonEditName,
  formEditName,
  nameInput,
  bioInput,
  formSubmitNewCard,
  buttonAddCard,
  cardTemplate,
  cardListSection,
  popupOpenFullPhotoSelector,
} from "./scripts/utils.js";
import initialCards from "./data/initial_cards.js";
import "./pages/index.css";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import Api from "./scripts/Api.js";

const popupWithImage = new PopupWithImage(popupOpenFullPhotoSelector);
popupWithImage.setEventListeners();

const createCard = (item) => {
  //функция создания карточки
  const newCard = new Card(
    item.name,
    item.link,
    {
      handleCardClick: () => {
        popupWithImage.open(item);
      },
    },
    cardTemplate
  );
  const cardElement = newCard.render(); //отрисовываем карточку
  return cardElement; //возвращаем карточку
};

api.getInitialCards()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err);
  });

const cardList = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      // функция, которая отвечает за создание и отрисовку данных на странице
      const cardElement = createCard(element);
      cardList.addItem(cardElement);
    },
  },
  cardListSection
);

cardList.renderItems(); // добавляем карточки из массива в DOM

const popupEditNameSelector = "#edit_profile";
const popupAddCardSelector = "#add_card";

const profileInfoSelectors = {
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
  avatarSelector: ".profile__avatar"
};

const userInfo = new UserInfo(profileInfoSelectors);

// экземпляр попапа с формой для добавления карточки через нее
const popupAddNewCardForm = new PopupWithForm(popupAddCardSelector, {
  handleSubmit: (data) => {
    const cardElement = createCard(data);
    cardList.addItem(cardElement);
  },
});

popupAddNewCardForm.setEventListeners();

// экземпляр попапа с формой для изменения информации о пользователе
const popupEditNameForm = new PopupWithForm(popupEditNameSelector, {
  handleSubmit: (data) => {
    userInfo.setUserInfo(data);
  }, 
});

popupEditNameForm.setEventListeners();

buttonEditName.addEventListener("click", function () {
  popupEditNameForm.open();
  popupEditNameForm.setInputValues(userInfo.getUserInfo());
  nameFormValidator.resetFormValidation();
});

buttonAddCard.addEventListener("click", function () {
  popupAddNewCardForm.open();
  cardFormValidator.resetFormValidation();
});

const nameFormValidator = new FormValidator(options, formEditName);
nameFormValidator.enableValidation();

const cardFormValidator = new FormValidator(options, formSubmitNewCard);
cardFormValidator.enableValidation();

const info = {
  baseUrl: "https://mesto.nomoreparties.co/v1",
  token: "72492c1e-f4dd-45b5-9419-ceb3c83aff61",
  groupId: "cohort-66",
};

const api = new Api(info);

// api.debug()

// api.getInfo()
//   .then((res) => {
//     console.log(res);
//     console.log(res.avatar);
//     const userInfo = res;
//     console.log(userInfo)
//     const userName = res.name;
//     const userBio = res.about;
//     const userAvatar = res.avatar
//   })
//   .then()
//   .catch((err) => {
//     console.log(err);
//   });



export {
  popupFullPhoto,
  nameFullPhoto,
  imageFullPhoto,
  formEditName,
  formSubmitNewCard,
  nameInput,
  bioInput,
};
