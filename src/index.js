const editNameButton = document.querySelector(".profile__button-change-name");
const editNamePopup = document.querySelector(".popup_type_edit");
// console.log(editNamePopup);
const popupEditCloseButton = document.querySelector("#name_close_button");
// console.log(popupEditCloseButton);

function openPopup(evt) {
    evt.classList.add("popup_opened");
}

function closePopup(evt) {
    evt.classList.remove("popup_opened");
}

editNameButton.addEventListener('click', () => openPopup(editNamePopup));
popupEditCloseButton.addEventListener('click', () => closePopup(editNamePopup));

const formElement = document.querySelector("#submit_name_form");
const nameInput = formElement.querySelector("#text-name");
// console.log(nameInput.value);
const bioInput = formElement.querySelector("#text-bio");
// console.log(bioInput.value);


// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault();
    const profileName = document.querySelector(".profile__name");
    const profileBio = document.querySelector(".profile__bio");

    profileName.textContent = nameInput.value;
    profileBio.textContent = bioInput.value;
    
    closePopup(editNamePopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 
