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
  buttonChangeAvatar,
  formChangeAvatar
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

//функция создания карточки
const createCard = (item) => {
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
    renderer: (element) => { // функция, которая отвечает за создание и отрисовку данных на странице
      const cardElement = createCard(element);
      cardList.addItem(cardElement);
    },
  },
  cardListSection
);

const popupEditNameSelector = "#edit_profile";
const popupAddCardSelector = "#add_card";
const popupChangeAvatarSelector = "#change-avatar";

const profileInfoSelectors = {
  nameSelector: ".profile__name",
  bioSelector: ".profile__bio",
  avatarSelector: ".profile__avatar",
};

const userInfo = new UserInfo(profileInfoSelectors);

// экземпляр попапа с формой для добавления новой карточки
const popupAddNewCardForm = new PopupWithForm(popupAddCardSelector, {
  handleSubmit: (data) => {
    api
      .addCard(data)
      .then((res) => {
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

// экземпляр попапа с формой для изменения АВАТАРА пользователя
const popupChangeAvatarForm = new PopupWithForm(popupChangeAvatarSelector, {
  handleSubmit: (data) => {  //колбэк сабмита формы
    // console.log("делаю консоль лог внутри хэндл сабмита ===>", data) // сюда попадает объект с ссылкой для аватара, которую я ввела в поле, в таком виде: {avatar: 'https://images.unsplash.com/photo-1545733099-15248…fDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2788&q=80'}
    // console.log("делаю консоль лог внутри хэндл сабмита ===>", data.avatar) // здесь я получаю ту самую ссылку, которую я вставила в поле
    userInfo.setUserInfo(data);
    api.changeUserAvatar(data.avatar)
      .then(res => console.log("внутри запроса айпи на изменение аватара ===>", res))
      .catch((err) => console.log(err));
  }
});

popupChangeAvatarForm.setEventListeners();

buttonEditName.addEventListener("click", function() {
  popupEditNameForm.open();
  popupEditNameForm.setInputValues(userInfo.getUserInfo());
  nameFormValidator.resetFormValidation();
});

buttonAddCard.addEventListener("click", function() {
  popupAddNewCardForm.open();
  cardFormValidator.resetFormValidation();
});

buttonChangeAvatar.addEventListener("click", function() {
  popupChangeAvatarForm.open();
})

const nameFormValidator = new FormValidator(options, formEditName);
nameFormValidator.enableValidation();

const cardFormValidator = new FormValidator(options, formSubmitNewCard);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(options, formChangeAvatar);
avatarFormValidator.enableValidation();

api
  .getInfo()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });


api.getAppInfo().then((args) => {
  const [dataFromUserInfoPromise, dataFromCardsPromise] = args;
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