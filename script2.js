///////////////////////////////////////
//BANKIST APP - WEBPAGE FUNCTIONALITY
///////////////////////////////////////
// OPEN ACCOUNT - MODAL WINDOW

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(`.header`);
const message = document.createElement(`div`);

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

//SCROLL BEHAVIOUR
const btnScrollto = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);

btnScrollto.addEventListener(`click`, function() {

    /*const s1coords = section1.getBoundingClientRect();

    window.scrollTo({
        left: s1coords.left + window.pageXOffset,
        top: s1coords.top + window.pageYOffset,
        behavior: `smooth`
    });
    */

    section1.scrollIntoView( {behavior: `smooth`} );
});

//PAGE NAVIGATION
document.querySelector(`.nav__links`).addEventListener(`click`, function(event) {
    event.preventDefault();

    if(event.target.classList.contains(`nav__link`)) {
        const id = event.target.getAttribute(`href`);
        document.querySelector(id).scrollIntoView({ behavior: `smooth` });
    }
});

//COOKIE MESSAGE
message.classList.add(`cookie-message`);
message.innerHTML = `We use cookies for improved functionality & analytics. <button class="btn btn--close-cookie">Got it!</button>`;
header.prepend(message);
document
  .querySelector(`.btn--close-cookie`)
  .addEventListener("click", function () {
    message.remove();
  });

message.style.backgroundColor = `#5ec576`;
message.style.color = `white`;
message.style.width = `120%`;

//TABBED COMPONENT
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});