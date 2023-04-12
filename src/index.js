import Card from "../scripts/Сard.js";
import FormValidator from "../scripts/FormValidator.js";
import options from "../scripts/validationConfig.js";
import {
  popupFullPhoto,
  nameFullPhoto,
  imageFullPhoto,
  openPopup,
  closeByEsc,
} from "../scripts/utils.js";
import initialCards from "../data/initial_cards.js";
import '../pages/index.css';

const buttonEditName = document.querySelector(".profile__button-change-name");
// console.log(buttonEditName);
const popupEditName = document.querySelector(".popup");
// console.log(popupEditName);
const popupEditCloseButton = document.querySelector("#name_close_button");
// console.log(popupCloseButton);
const formEditName = document.querySelector("#submit_name_form");
const nameInput = formEditName.querySelector("#text-name");
// console.log(nameInput.value);
const bioInput = formEditName.querySelector("#text-bio");
// console.log(bioInput.value);
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const formSubmitNewCard = document.querySelector("#submit_new-card_form");
const buttonAddCard = document.querySelector(".profile__button-add-photo");
const popupAddCard = document.querySelector("#add_card");
const popupAddCardCloseButton = document.querySelector(
  "#new-card_close_button"
);
const cardNameInput = formSubmitNewCard.querySelector("#card-name");
const cardLinkInput = formSubmitNewCard.querySelector("#card-link");
const popups = Array.from(document.querySelectorAll(".popup"));
const cardTemplate = document.querySelector("#cards").content;

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

const closeByOverlay = () => {
  popups.forEach((element) => {
    element.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(element);
      }
    });
  });
};

closeByOverlay();

function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  closePopup(popupEditName);
}

const cardContainer = document.querySelector("#card-container");

function addElementToContainer(element, container) {
  container.prepend(element);
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, cardContainer, cardTemplate);
  addElementToContainer(card.render(), cardContainer);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const addCard = new Card(
    cardNameInput.value,
    cardLinkInput.value,
    cardContainer,
    cardTemplate
  );
  addElementToContainer(addCard.render(), cardContainer);
  closePopup(popupAddCard);
  evt.target.reset();
  cardFormValidator.resetFormValidation();
}
formEditName.addEventListener("submit", submitEditProfileForm);
buttonEditName.addEventListener("click", function () {
  openPopup(popupEditName);
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  nameFormValidator.resetFormValidation();
});
popupEditCloseButton.addEventListener("click", () => closePopup(popupEditName));
buttonAddCard.addEventListener("click", function () {
  openPopup(popupAddCard);
  formSubmitNewCard.reset();
  cardFormValidator.resetFormValidation();
});

popupAddCardCloseButton.addEventListener("click", () =>
  closePopup(popupAddCard)
);
formSubmitNewCard.addEventListener("submit", handleAddCardSubmit);
popupFullPhoto
  .querySelector("#full-photo_close_button")
  .addEventListener("click", () => closePopup(popupFullPhoto));

const nameFormValidator = new FormValidator(options, formEditName);
nameFormValidator.enableValidation();

const cardFormValidator = new FormValidator(options, formSubmitNewCard);
cardFormValidator.enableValidation();

export {
  openPopup,
  popupFullPhoto,
  nameFullPhoto,
  imageFullPhoto,
  formEditName,
  formSubmitNewCard,
};
