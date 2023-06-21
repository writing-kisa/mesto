const popupFullPhoto = document.querySelector("#full-size-popup");
const nameFullPhoto = popupFullPhoto.querySelector(".popup__photo-name");
const imageFullPhoto = popupFullPhoto.querySelector(".popup__full-size-photo");

const buttonEditName = document.querySelector(".profile__button-change-name");
const formEditName = document.querySelector("#submit_name_form");
const nameInput = formEditName.querySelector("#text-name");
const bioInput = formEditName.querySelector("#text-bio");
const formSubmitNewCard = document.querySelector("#submit_new-card_form");
const buttonAddCard = document.querySelector(".profile__button-add-photo");
const cardTemplate = document.querySelector("#cards").content;
const cardListSection = ".gallery";
const popupOpenFullPhotoSelector = "#full-size-popup";
const buttonChangeAvatar = document.querySelector(".profile__button-change-avatar");
const formChangeAvatar = document.querySelector("#change-avatar_form");

export {
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
};
