import Card from "../scripts/Сard.js";
import FormValidator from "../scripts/FormValidator.js";
import options from "../scripts/validationConfig.js";
import {
  popupFullPhoto,
  nameFullPhoto,
  imageFullPhoto,
} from "../scripts/utils.js";
import initialCards from "../data/initial_cards.js";
import '../pages/index.css';
import Section from "../scripts/Section.js";
import Popup from "../scripts/Popup.js";
import PopupWithImage from "../scripts/PopupWithImage.js";

const buttonEditName = document.querySelector(".profile__button-change-name");
// console.log(buttonEditName);
// const popupEditName = document.querySelector(".popup");
// // console.log(popupEditName);
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
// const popupAddCard = document.querySelector("#add_card");
const popupAddCardCloseButton = document.querySelector(
  "#new-card_close_button"
);
const cardNameInput = formSubmitNewCard.querySelector("#card-name");
const cardLinkInput = formSubmitNewCard.querySelector("#card-link");
const cardContainer = document.querySelector("#card-container");


const popups = Array.from(document.querySelectorAll(".popup"));
const cardTemplate = document.querySelector("#cards").content;

const cardListSection = ".gallery";
// console.log(cardListSection);

const popupOpenFullPhotoSelector = '#full-size-popup';


const popupWithImage = new PopupWithImage(popupOpenFullPhotoSelector);

const createCard = (item) => { //функция создания карточки
  const newCard = new Card(
    item.name, 
    item.link, 
    { handleCardClick: () => {
      popupWithImage.open(item);
      // popupWithImage.test();
      // console.log(item) //все правильно показывает: нужные линк и нейм
    }},
    cardTemplate); 
  const cardElement = newCard.render();//отрисовываем карточку
  return cardElement;//возвращаем карточку
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

// formSubmitNewCard.addEventListener("submit", createCard);

//================================================================================================

//создаем экз класса Popup

const popupEditNameSelector = "#edit_profile";
const popupAddCardSelector = '#add_card';
// const popupOpenFullPhotoSelector = '#full-size-popup';


const popupEditName = new Popup(popupEditNameSelector);
const popupAddCard = new Popup(popupAddCardSelector);
const popupFullPhotoClass = new Popup(popupOpenFullPhotoSelector);

// console.log(popupEditNameSelector);

//================================================================================================


// // function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEsc);
// }


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
  popupEditName.close();
  // closePopup(popupEditName);
}

buttonEditName.addEventListener("click", function () {
  popupEditName.open();
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  nameFormValidator.resetFormValidation();
});

popupEditCloseButton.addEventListener("click", () => popupEditName.close());
buttonAddCard.addEventListener("click", function () {
  popupAddCard.open()
  // openPopup(popupAddCard);
  formSubmitNewCard.reset();
  cardFormValidator.resetFormValidation();
});

popupAddCardCloseButton.addEventListener("click", () =>
//   closePopup(popupAddCard)
  popupAddCard.close()
);

popupFullPhoto
  .querySelector("#full-photo_close_button")
  .addEventListener("click", () => popupFullPhotoClass.close()); // closePopup(popupFullPhoto)

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
};



  // openFullPhotoPopup = () => {
  //   const popupWithImage = new PopupWithImage(popupOpenFullPhotoSelector);
  //   popupWithImage.open(item.name, item.link);
  // };

  // newCard.querySelector('.gallery__photo').addEventListener('click', openFullPhotoPopup);





// function addElementToContainer(element, container) { //это теперь addItem, который вставляет в разметку
//   container.prepend(element);
// }

// initialCards.forEach((item) => {
//   const card = new Card(item.name, item.link, cardTemplate);
//   addElementToContainer(card.render(), cardContainer);
// });

// function handleAddCardSubmit(evt) {
//   evt.preventDefault();
//   const addCard = new Card(
//     cardNameInput.value,
//     cardLinkInput.value,
//     cardTemplate
//   );
//   addElementToContainer(addCard.render(), cardContainer);
//   closePopup(popupAddCard);
//   evt.target.reset();
//   cardFormValidator.resetFormValidation();
// }

// formSubmitNewCard.addEventListener("submit", handleAddCardSubmit);

//buttonEditName.addEventListener("click", function () {
//   openPopup(popupEditName);
//   nameInput.value = profileName.textContent;
//   bioInput.value = profileBio.textContent;
//   nameFormValidator.resetFormValidation();
// });
