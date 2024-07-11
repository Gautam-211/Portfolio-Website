/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SERVICES MODAL ===============*/
// Get the modal
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");

// When the user clicks on the button, open the modal
let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/

let mixer = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 100,
  },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");

function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}

workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

/*=============== SWIPER TESTIMONIAL ===============*/

let swiperTestimonial = new Swiper(".testimonial__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the light / icon theme
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 400,
  reset: true,
});

sr.reveal(`.nav__menu`, {
  delay: 50,
  scale: 0.1,
  origin: "bottom",
  distance: "300px",
});

sr.reveal(`.home__data`);
sr.reveal(`.home__handle`, {
  delay: 50,
});

sr.reveal(`.home__social, .home__scroll`, {
  delay: 50,
  origin: "bottom",
});

sr.reveal(`.about__img`, {
  delay: 50,
  origin: "left",
  scale: 0.9,
  distance: "30px",
});

sr.reveal(`.about__data, .about__description, .about__button-contact`, {
  delay: 50,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.skills__content`, {
  delay: 50,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.services__title, services__button`, {
  delay: 50,
  scale: 0.9,
  origin: "top",
  distance: "30px",
});

sr.reveal(`.work__card`, {
  delay: 50,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.testimonial__container`, {
  delay: 50,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.contact__info, .contact__title-info`, {
  delay: 50,
  scale: 0.9,
  origin: "left",
  distance: "30px",
});

sr.reveal(`.contact__form, .contact__title-form`, {
  delay: 50,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.footer, footer__container`, {
  delay: 50,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

// Parallax tilt effect to cards

class parallaxTiltEffect {

  constructor({element, tiltEffect}) {

    this.element = element;
    this.container = this.element.querySelector(".container--4");
    this.size = [300, 360];
    [this.w, this.h] = this.size;

    this.tiltEffect = tiltEffect;

    this.mouseOnComponent = false;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.defaultStates = this.defaultStates.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.init = this.init.bind(this);

    this.init();
  }

  handleMouseMove(event) {
    const {offsetX, offsetY} = event;

    let X;
    let Y;

    if (this.tiltEffect === "reverse") {
      X = ((offsetX - (this.w/2)) / 3) / 3;
      Y = (-(offsetY - (this.h/2)) / 3) / 3;
    }

    else if (this.tiltEffect === "normal") {
      X = (-(offsetX - (this.w/2)) / 3) / 3;
      Y = ((offsetY - (this.h/2)) / 3) / 3;
    }

    this.setProperty('--rY', X.toFixed(2));
    this.setProperty('--rX', Y.toFixed(2));

    this.setProperty('--bY', (10 - (X/4).toFixed(2)) + '%');
    this.setProperty('--bX', (50 - (Y/4).toFixed(2)) + '%');
  }

  handleMouseEnter() {
    this.mouseOnComponent = true;
    this.container.classList.add("container--active");
  }

  handleMouseLeave() {
    this.mouseOnComponent = false;
    this.defaultStates();
  }

  defaultStates() {
    this.container.classList.remove("container--active");
    this.setProperty('--rY', 0);
    this.setProperty('--rX', 0);
    this.setProperty('--bY', '10%');
    this.setProperty('--bX', '50%');
  }

  setProperty(p, v) {
    return this.container.style.setProperty(p, v);
  }

  init() {
    this.element.addEventListener('mousemove', this.handleMouseMove);
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
  }

}

const $ = e => document.querySelector(e);

const wrap2 = new parallaxTiltEffect({
  element: $('.wrap--2'),
  tiltEffect: 'normal'
});