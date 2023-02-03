const editNameButton = document.querySelector(".profile__button-change-name");
const editNamePopup = document.querySelector(".popup_type_edit");
// console.log(editNamePopup);
const popupEditCloseButton = document.querySelector("#name_close_button");
// // console.log(popupEditCloseButton);

function openPopup(evt) {
    evt.classList.add("popup_opened");
}

function closePopup(evt) {
    evt.classList.remove("popup_opened");
}

editNameButton.addEventListener('click', () => openPopup(editNamePopup));
popupEditCloseButton.addEventListener('click', () => closePopup(editNamePopup));
