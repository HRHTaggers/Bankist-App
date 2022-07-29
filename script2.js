///////////////////////////////////////
//BANKIST APP - WEBPAGE FUNCTIONALITY
///////////////////////////////////////
// OPEN ACCOUNT - MODAL WINDOW

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//COOKIE MESSAGE
const header = document.querySelector(`.header`);
const message = document.createElement(`div`);

message.classList.add(`cookie-message`);
message.innerHTML = `We use cookies for improved functionality & analytics. <button class="btn btn--close-cookie">Got it!</button>`;
header.append(message);
document
  .querySelector(`btn--close-cookie`)
  .addEventListener("click", function () {
    message.parentElement.removeChild(message);
  });

message.style.backgroundColor = `#5ec576`;
message.style.width = `120%`;
