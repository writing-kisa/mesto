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
  popupOpenFullPhotoSelector
} from "./scripts/utils.js";
import "./pages/index.css";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import Api from "./scripts/Api.js";
import PopupWithSubmitForm from "./scripts/PopupWithSubmitForm.js";

let myId = null;

const info = {
  baseUrl: "https://mesto.nomoreparties.co/v1",
  token: "72492c1e-f4dd-45b5-9419-ceb3c83aff61",
  groupId: "cohort-66",
};

const api = new Api(info);

const popupWithImage = new PopupWithImage(popupOpenFullPhotoSelector);
popupWithImage.setEventListeners();

const popupDeleteCardSelector = "#popup-before-delete";
const popupDeleteCard = new PopupWithSubmitForm(popupDeleteCardSelector);

const createCard = (item) => {
  //функция создания карточки
  const newCard = new Card(
    item.name,
    item.link,
    item.likes,
    item.owner._id,
    item._id,
    myId,
    {
      handleCardClick: () => {
        popupWithImage.open(item);
      },

      handleDeleteCard: () => {
        popupDeleteCard.open();
        popupDeleteCard.setSubmitAction(() => {   //здесь будет вызываться api delete card
          console.log('pikpik') //почему-то вызывается сразу как открывается попап, а должен после нажатия на соответствующую кнопку
        })
        popupDeleteCard.setEventListeners();
      }
    },
    cardTemplate
  );
  const cardElement = newCard.render(); //отрисовываем карточку
  return cardElement; //возвращаем карточку
};


api
  .getInitialCards()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

const cardList = new Section(
  {
    renderer: (element) => {
      // функция, которая отвечает за создание и отрисовку данных на странице
      const cardElement = createCard(element);
      cardList.addItem(cardElement);
    },
  },
  cardListSection
);

const popupEditNameSelector = "#edit_profile";
const popupAddCardSelector = "#add_card";

const profileInfoSelectors = {
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
  avatarSelector: ".profile__avatar",
};

const userInfo = new UserInfo(profileInfoSelectors);

// экземпляр попапа с формой для добавления карточки через нее

// const popupAddNewCardForm = new PopupWithForm(popupAddCardSelector, {
//   handleSubmit: (data) => {
//     const cardElement = createCard(data);
//     cardList.addItem(cardElement);
//     api.addCard(data)
//       .then(res => console.log(res))
//       .catch(err => console.log(err))
//   },
// });

const popupAddNewCardForm = new PopupWithForm(popupAddCardSelector, {
  handleSubmit: (data) => {
    api.addCard(data)
      .then((res) => {
        console.log(res);
        console.log("тут должен быть айдишник автора новой карточки", res.owner._id); //все верно
        const cardElement = createCard(res);
        cardList.addItem(cardElement);
      })
      .catch(err => console.log(err))
  },
});

popupAddNewCardForm.setEventListeners();

// экземпляр попапа с формой для изменения информации о пользователе
const popupEditNameForm = new PopupWithForm(popupEditNameSelector, {
  handleSubmit: (data) => {
    userInfo.setUserInfo(data);
    api.changeUserInfo(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

popupEditNameForm.setEventListeners();

buttonEditName.addEventListener("click", function() {
  popupEditNameForm.open();
  popupEditNameForm.setInputValues(userInfo.getUserInfo());
  nameFormValidator.resetFormValidation();
});

buttonAddCard.addEventListener("click", function() {
  popupAddNewCardForm.open();
  cardFormValidator.resetFormValidation();
});


// function deleteCardSubmit(item) {
//   item.remove()
// }
// popupDeleteCard.setSubmitAction(deleteCardSubmit);
// popupDeleteCard.setEventListeners();

// const buttonDeleteCard = document.querySelectorAll(".gallery__delete-button");

// console.log(buttonDeleteCard)

// // buttonDeleteCard.addEventListener("click", function() {
// //   popupDeleteCard.open();
// // })

const nameFormValidator = new FormValidator(options, formEditName);
nameFormValidator.enableValidation();

const cardFormValidator = new FormValidator(options, formSubmitNewCard);
cardFormValidator.enableValidation();

// api.debug()

api
  .getInfo()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

//========================================================

api.getAppInfo().then((args) => {
  // console.log(args)
  const [dataFromUserInfoPromise, dataFromCardsPromise] = args;
    // console.log("здесь покажется инфа пользователя ===>", dataFromUserInfoPromise);
    // console.log("здесь покажется id пользователя ===>", dataFromUserInfoPromise._id);
  myId = dataFromUserInfoPromise._id;
  userInfo.setUserInfo(dataFromUserInfoPromise);
  cardList.renderItems(dataFromCardsPromise);
});

export {
  popupFullPhoto,
  nameFullPhoto,
  imageFullPhoto,
  formEditName,
  formSubmitNewCard,
  nameInput,
  bioInput,
};


// api.likeCounter()
//   .then((res) => {
//     console.log(res);
//     const array = res;
//     array.forEach((item) => {
//       console.log("лайки ====>", item.likes.length)
//     })
//   })
//   .catch((err) => {
//     console.log(err);
//   });