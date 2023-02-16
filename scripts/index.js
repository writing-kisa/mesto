const buttonEditName = document.querySelector(".profile__button-change-name");
// console.log(buttonEditName);
const popupEditName = document.querySelector(".popup");
// console.log(popupEditName);
const popupEditCloseButton = document.querySelector("#name_close_button");
// console.log(popupEditCloseButton);
const formElement = document.querySelector("#submit_name_form");
const nameInput = formElement.querySelector("#text-name");
// console.log(nameInput.value);
const bioInput = formElement.querySelector("#text-bio");
// console.log(bioInput.value);
const profileName = document.querySelector(".profile__name");
const profileBio = document.querySelector(".profile__bio");


function openPopup() {
    popupEditName.classList.add("popup_opened");
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
}

function closePopup() {
    popupEditName.classList.remove("popup_opened");
}

function handleFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    
    closePopup(popupEditName);
}

formElement.addEventListener('submit', handleFormSubmit); 
buttonEditName.addEventListener('click', () => openPopup());
popupEditCloseButton.addEventListener('click', () => closePopup());