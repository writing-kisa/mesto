const buttonEditName = document.querySelector(".profile__button-change-name");
// console.log(buttonEditName);
const popupEditName = document.querySelector(".popup");
// console.log(popupEditName);
const popupEditCloseButton = document.querySelector("#name_close_button");
// console.log(popupCloseButton);
const formElement = document.querySelector("#submit_name_form");
const nameInput = formElement.querySelector("#text-name");
// console.log(nameInput.value);
const bioInput = formElement.querySelector("#text-bio");
// console.log(bioInput.value);
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const cardContainer = document.querySelector('#card-container');
const buttonAddCard = document.querySelector('.profile__button-add-photo');
const popupAddCard = document.querySelector('#add_card');
const popupAddCardCloseButton = document.querySelector("#new-card_close_button");


// console.log(initialCards[0].name);

function openPopup(evt) {
  evt.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
}

function closePopup(evt) {
  evt.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;

  closePopup(popupEditName);
}

function createCard(card) {

  const cardTemplate = document.querySelector("#cards").content;
  const cardElement = cardTemplate.querySelector(".gallery__cell").cloneNode(true);
  const cardName = cardElement.querySelector(".gallery__name");
  const cardLink = cardElement.querySelector(".gallery__photo");

// console.log(cardTemplate);
// console.log(cardElement);
// console.log(cardName.textContent);
// console.log(cardLink.src);

    cardName.textContent = card.name;
    cardLink.src = card.link;

    cardContainer.append(cardElement);
}

initialCards.forEach(createCard);

formElement.addEventListener("submit", handleFormSubmit);
buttonEditName.addEventListener("click", () => openPopup(popupEditName));
popupEditCloseButton.addEventListener("click", () => closePopup(popupEditName));
buttonAddCard.addEventListener("click", () => openPopup(popupAddCard));
popupAddCardCloseButton.addEventListener("click", () => closePopup(popupAddCard));