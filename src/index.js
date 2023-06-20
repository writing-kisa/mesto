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
  token: "a4986e69-919a-4d96-95e3-0fca16f812eb",
  groupId: "cohort-69",
};

const api = new Api(info);

const popupWithImage = new PopupWithImage(popupOpenFullPhotoSelector);
popupWithImage.setEventListeners();

const popupDeleteCardSelector = "#popup-before-delete";
const popupDeleteCard = new PopupWithSubmitForm(popupDeleteCardSelector);

popupDeleteCard.setEventListeners();

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
        popupDeleteCard.setSubmitAction(() => {
          api
            .deleteCard(item._id)
            .then(() => {
              newCard.deleteHandler();
              popupDeleteCard.close();
            })
            .catch((err) => console.log(err));
        });
      },

      handleLike: () => {
        api
          .likeCard(item._id)
          // .then(res => console.log("внутри айпи на лайк карточки", res)) // покажи инфу о лайках и карточке, на которую нажали
          .then((res) => {
            console.log("внутри хэндл LIKE индекс джс RES 1111", res)
            newCard.setLikeInfo(res);
          })
          .catch((err) => console.log(err));
      },

      handleDislike: () => {
        api
          .deleteLikeCard(item._id)
          .then((res) => {
            console.log("внутри хэндл DISLIKE индекс джс RES 1111", res)
            newCard.setLikeInfo(res);
          })
          .catch((err) => console.log(err));
      },
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

const popupAddNewCardForm = new PopupWithForm(popupAddCardSelector, {
  handleSubmit: (data) => {
    api
      .addCard(data)
      .then((res) => {
        // console.log(res);
        // console.log("тут должен быть айдишник автора новой карточки ====>", res.owner._id);
        const cardElement = createCard(res);
        cardList.addItem(cardElement);
      })
      .catch((err) => console.log(err));
  },
});

popupAddNewCardForm.setEventListeners();

// экземпляр попапа с формой для изменения информации о пользователе
const popupEditNameForm = new PopupWithForm(popupEditNameSelector, {
  handleSubmit: (data) => {
    userInfo.setUserInfo(data);
    api
      .changeUserInfo(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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

// popupDeleteCard.open(); //при нажатии на корзину открывается попап ВЕРНО!
// popupDeleteCard.setSubmitAction(() => { //вызывается метод попапа-функция, которую мы пишем ниже, здесь будет вызываться api delete card и после удаления закрываться попап
//   // console.log(item._id)
//   api.deleteCard(item._id)
//     .then(res => console.log(res))
//     .catch(err => console.log(err)); //ВЕРНО!
//     // console.log(item);
// })
// }
// popupDeleteCard.setEventListeners();

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

        // api
        //   .likeCard(item._id)
        //   // .then(res => console.log("внутри айпи на лайк карточки", res))
        //   .then((res) => {
        //     console.log("внутри хэндл LIKE индекс джс RES", res)
        //     newCard.setLikeInfo(res);
        //   })
        //   .catch((err) => console.log(err));


                // api
        //   .deleteLikeCard(item._id)
        //   // .then(res => console.log("внутри айпи на ДИЗлайк карточки", res))
        //   .then((res) => {
        //     console.log("внутри хэндл дизлайк индекс джс RES", res)
        //     newCard.setLikeInfo(res);
        //     // console.log("внутри хэндл дизлайк индекс джс")
        //   })
        //   .catch((err) => console.log(err));

