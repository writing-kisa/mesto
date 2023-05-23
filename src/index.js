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
import PopupWithForm from "../scripts/PopupWithForm.js";

const buttonEditName = document.querySelector(".profile__button-change-name");
const popupEditCloseButton = document.querySelector("#name_close_button");
const formEditName = document.querySelector("#submit_name_form");
const nameInput = formEditName.querySelector("#text-name");
const bioInput = formEditName.querySelector("#text-bio");
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");
const formSubmitNewCard = document.querySelector("#submit_new-card_form");
const buttonAddCard = document.querySelector(".profile__button-add-photo");
const popupAddCardCloseButton = document.querySelector(
  "#new-card_close_button"
);
const cardTemplate = document.querySelector("#cards").content;
const cardListSection = ".gallery";
const popupOpenFullPhotoSelector = '#full-size-popup';
const popupWithImage = new PopupWithImage(popupOpenFullPhotoSelector);
const cardNameInput = formSubmitNewCard.querySelector("#card-name");
const cardLinkInput = formSubmitNewCard.querySelector("#card-link");

const createCard = (item) => { //функция создания карточки
  const newCard = new Card(
    item.name, 
    item.link, 
    { handleCardClick: () => {
      // console.log(item)
      popupWithImage.open(item);
    }},
    cardTemplate); 
  const cardElement = newCard.render(); //отрисовываем карточку
  return cardElement; //возвращаем карточку
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

//создаем экз класса PopupWithForm

const popupEditNameSelector = "#edit_profile";
const popupAddCardSelector = '#add_card';


const popupEditName = new Popup(popupEditNameSelector);
const popupAddCard = new Popup(popupAddCardSelector);
const popupFullPhotoClass = new Popup(popupOpenFullPhotoSelector);

const popupAddNewCardForm = new PopupWithForm(popupAddCardSelector, { handleSubmit: (data) => { 
  createCard(data);
  cardFormValidator.resetFormValidation();
}});

popupEditName.setEventListeners();
popupAddNewCardForm.setEventListeners();
popupFullPhotoClass.setEventListeners();



// const popupEditNameForm = new PopupWithForm(popupEditNameSelector, { 
//   handleSubmit: () => {
//     popupEditNameForm.test();
//   }
// });
// popupEditNameForm.test();

//================================================================================================

// function handleAddCardSubmit(evt) {
//   evt.preventDefault();
//   const addCard = new Card(
//     cardNameInput.value,
//     cardLinkInput.value,
//     cardTemplate
//   );
//   addElementToContainer(addCard.render(), cardContainer);
//   closePopup(popupAddCard);
//   // evt.target.reset();
//   cardFormValidator.resetFormValidation();
// }

function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value;
  popupEditName.close();
}

buttonEditName.addEventListener("click", function () {
  popupEditName.open();
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  nameFormValidator.resetFormValidation();
});

// popupEditCloseButton.addEventListener("click", () => popupEditName.close());
// popupAddCardCloseButton.addEventListener("click", () =>
//   popupAddNewCardForm.close()
// );
// popupFullPhoto
//   .querySelector("#full-photo_close_button")
//   .addEventListener("click", () => popupFullPhotoClass.close());

buttonAddCard.addEventListener("click", function () {
  popupAddCard.open()
  // formSubmitNewCard.reset();
  cardFormValidator.resetFormValidation();
});

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


// // function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEsc);
// }


// const closeByOverlay = () => {
//   popups.forEach((element) => {
//     element.addEventListener("mousedown", (evt) => {
//       if (evt.target === evt.currentTarget) {
//         closePopup(element);
//       }
//     });
//   });
// };

// closeByOverlay();


// const popupEditName = document.querySelector(".popup");
// const popupAddCard = document.querySelector("#add_card");

// const cardContainer = document.querySelector("#card-container");
// const popups = Array.from(document.querySelectorAll(".popup"));



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



// formSubmitNewCard.addEventListener("submit", handleAddCardSubmit);

//buttonEditName.addEventListener("click", function () {
//   openPopup(popupEditName);
//   nameInput.value = profileName.textContent;
//   bioInput.value = profileBio.textContent;
//   nameFormValidator.resetFormValidation();
// });
