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
const buttonSaveCard = formSubmitNewCard.querySelector('.form__save-button');

const cardContainer = document.querySelector("#card-container");
const buttonAddCard = document.querySelector(".profile__button-add-photo");
const popupAddCard = document.querySelector("#add_card");
const popupAddCardCloseButton = document.querySelector(
  "#new-card_close_button"
);
const buttonSubmitCardForm = document.querySelector("#new-card_save_button");
const formSubmitNewCard = document.querySelector("#submit_new-card_form");
const cardNameInput = formSubmitNewCard.querySelector("#card-name");
// console.log(cardNameInput.value);
const cardLinkInput = formSubmitNewCard.querySelector("#card-link");

const popupFullPhoto = document.querySelector("#full-size-popup");
const nameFullPhoto = popupFullPhoto.querySelector(".popup__photo-name");
const imageFullPhoto = popupFullPhoto.querySelector(".popup__full-size-photo");

const cardTemplate = document.querySelector("#cards").content;
const popups = Array.from(document.querySelectorAll(".popup"));


function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc)
}

const closeByEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

const closeByOverlay = () => {
  popups.forEach((element) => {
    element.addEventListener("click", (evt) => {
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

function createCard(name, link) {
  const cardElement = cardTemplate
    .querySelector(".gallery__cell")
    .cloneNode(true);
  const cardName = cardElement.querySelector(".gallery__name");
  const cardLink = cardElement.querySelector(".gallery__photo");

  cardName.textContent = name;
  cardLink.src = link;
  cardLink.alt = name;

  cardElement
    .querySelector(".gallery__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("gallery__like-button_able");
    });

  cardElement
    .querySelector(".gallery__delete-button")
    .addEventListener("click", function () {
      cardElement.remove();
    });

  cardLink.addEventListener("click", function () {
    nameFullPhoto.textContent = cardName.textContent;
    imageFullPhoto.src = cardLink.src;
    openPopup(popupFullPhoto);
  });

  return cardElement;
}

initialCards.forEach((card) =>
  cardContainer.append(createCard(card.name, card.link))
);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const option = {disabledButtonClass: "form__save-button_disabled"};

  cardContainer.prepend(createCard(cardNameInput.value, cardLinkInput.value));
  closePopup(popupAddCard);

  evt.target.reset();

  disableButton(buttonSaveCard, option.disabledButtonClass);
}

const selector = {inputErrorClass: "form__text-error_visible", inputErrorBorder: "form__text_type_error"};

formEditName.addEventListener("submit", submitEditProfileForm);
buttonEditName.addEventListener("click", function() {
  openPopup(popupEditName);
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  removeValidationErrors(formEditName, selector);
});
popupEditCloseButton.addEventListener("click", () => closePopup(popupEditName));
buttonAddCard.addEventListener("click", function() {
  openPopup(popupAddCard);
  formSubmitNewCard.reset();
  removeValidationErrors(formSubmitNewCard, selector);
});

popupAddCardCloseButton.addEventListener("click", () => 
  closePopup(popupAddCard)
);
formSubmitNewCard.addEventListener("submit", handleAddCardSubmit);
popupFullPhoto
  .querySelector("#full-photo_close_button")
  .addEventListener("click", () => closePopup(popupFullPhoto));
