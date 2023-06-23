import Card from "../components/Сard.js";
import FormValidator from "../components/FormValidator.js";
import options from "../scripts/validationConfig.js";
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
  formChangeAvatar,
} from "../scripts/utils.js";
import "./index.css";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmitForm from "../components/PopupWithSubmitForm.js";

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
            console.log("внутри хэндл LIKE индекс джс RES 1111", res);
            newCard.setLikeInfo(res);
          })
          .catch((err) => console.log(err));
      },

      handleDislike: () => {
        api
          .deleteLikeCard(item._id)
          .then((res) => {
            console.log("внутри хэндл DISLIKE индекс джс RES 1111", res);
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
    popupAddNewCardForm.renderLoading(true);
    api
      .addCard(data)
      .then((res) => {
        const cardElement = createCard(res);
        cardList.addItem(cardElement);
      })
      .catch((err) => console.log(err))
      .finally(() => popupAddNewCardForm.renderLoading(false));
  },
});

popupAddNewCardForm.setEventListeners();

// экземпляр попапа с формой для изменения информации о пользователе
const popupEditNameForm = new PopupWithForm(popupEditNameSelector, {
  handleSubmit: (data) => {
    popupEditNameForm.renderLoading(true);
    userInfo.setUserInfo(data);
    api
      .changeUserInfo(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupEditNameForm.renderLoading(false));
  },
});

popupEditNameForm.setEventListeners();

// экземпляр попапа с формой для изменения аватара пользователя
const popupChangeAvatarForm = new PopupWithForm(popupChangeAvatarSelector, {
  handleSubmit: (data) => {
    //колбэк сабмита формы
    console.log("inside handlesubmit DATA ====>", data);
    popupChangeAvatarForm.renderLoading(true);
    userInfo.setUserAvatar(data);
    api
      .changeUserAvatar(data.avatar)
      .then((res) =>
        console.log("внутри запроса айпи на изменение аватара ===>", res)
      )
      .catch((err) => console.log(err))
      .finally(() => popupChangeAvatarForm.renderLoading(false));
  },
});

popupChangeAvatarForm.setEventListeners();

const nameFormValidator = new FormValidator(options, formEditName);
nameFormValidator.enableValidation();

const cardFormValidator = new FormValidator(options, formSubmitNewCard);
cardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(options, formChangeAvatar);
avatarFormValidator.enableValidation();

buttonEditName.addEventListener("click", function () {
  popupEditNameForm.open();
  popupEditNameForm.setInputValues(userInfo.getUserInfo());
  nameFormValidator.resetFormValidation();
});

buttonAddCard.addEventListener("click", function () {
  popupAddNewCardForm.open();
  cardFormValidator.resetFormValidation();
});

buttonChangeAvatar.addEventListener("click", function () {
  popupChangeAvatarForm.open();
  avatarFormValidator.resetFormValidation();
});

api
  .getAppInfo()
  .then((args) => {
    const [dataFromUserInfoPromise, dataFromCardsPromise] = args;
    myId = dataFromUserInfoPromise._id;
    userInfo.setUserInfo(dataFromUserInfoPromise);
    userInfo.setUserAvatar(dataFromUserInfoPromise);
    const reversedData = dataFromCardsPromise.reverse();
    cardList.renderItems(reversedData);
  })
  .catch((err) => {
    console.log(err);
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
