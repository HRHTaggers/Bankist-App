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
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(`.nav`);

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
header.append(message);
document
  .querySelector(`.btn--close-cookie`)
  .addEventListener("click", function () {
    message.remove();
  });

message.style.backgroundColor = `#5ec576`;
message.style.color = `white`;
message.style.width = `120%`;

//TABBED COMPONENT
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((content) => content.classList.remove("operations__content--active"));

  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//MENU FOCUS ANIMATION
const handleHover = function (event) {
    if (event.target.classList.contains(`nav__link`)) {
      const link = event.target;
      const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
      const logo = link.closest(`.nav`).querySelector(`img`);

      siblings.forEach(element => {
        if (element !== link) element.style.opacity = this;
      });
      logo.style.opacity = this;
    }
}

nav.addEventListener(`mouseover`, handleHover.bind(0.5));

nav.addEventListener(`mouseout`, handleHover.bind(1));

//ADDING STICKY NAVIGATION
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
    const [entry] = entries;
    if(!entry.isIntersecting) nav.classList.add(`sticky`);
    else nav.classList.remove(`sticky`);
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//REVEAL FUNCTIONALITY
const allSections = document.querySelectorAll(`.section`);

const revealSection = function(entries, observer) {
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove(`section--hidden`);
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
allSections.forEach(function(section) {
    sectionObserver.observe(section);
    section.classList.add(`section--hidden`);
});

//LOADING LAZY IMAGES
const imgTargets = document.querySelectorAll(`img[data-src]`);

const loadImg = function(entries, observer) {
    const [entry] = entries;

    if(!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener(`load`, function () {
        entry.target.classList.remove(`lazy-img`);
    });

    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: `200px`,
});

imgTargets.forEach(img => imgObserver.observe(img));

//SLIDER
const slider = function () {
    //Variables
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector(".slider__btn--left");
    const btnRight = document.querySelector(".slider__btn--right");
    const dotContainer = document.querySelector(".dots");

    let curSlide = 0;
    const maxSlide = slides.length;

    // Functions
    const createDots = function () {
        slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
            "beforeend",
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
        });
    };

    const activateDot = function (slide) {
        document
        .querySelectorAll(".dots__dot")
        .forEach((dot) => dot.classList.remove("dots__dot--active"));

        document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add("dots__dot--active");
    };

    const goToSlide = function (slide) {
        slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
        curSlide = 0;
        } else {
        curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
        curSlide = maxSlide - 1;
        } else {
        curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();

        activateDot(0);
    };
    init();

    //Event Handlers
    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    document.addEventListener("keydown", function (event) {
        event.key === "ArrowLeft" && prevSlide();
        event.key === "ArrowRight" && nextSlide();
    });

    dotContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("dots__dot")) {
        const { slide } = event.target.dataset;
        goToSlide(slide);
        activateDot(slide);
        }
    });
};

slider();