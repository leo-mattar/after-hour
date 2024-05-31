gsap.registerPlugin(ScrollTrigger, CustomEase, DrawSVGPlugin, ScrollToPlugin);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

let mm = gsap.matchMedia();

// --- GLOBAL - RELOAD AT THE TOP
$(window).on("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- GLOBAL - CUSTOM EASE
let panelEase = CustomEase.create("panelEase", "0.19, 1, 0.22, 1");
let buttonEase = CustomEase.create("buttonEase", "0.785, 0.135, 0.15, 0.86");

// --- GLOBAL - STATS COUNTER
function statsCounter() {
  $("[counter]").each(function (index) {
    let thisId = "countup" + index;
    $(this).attr("id", thisId);
    let startNumber =
      $(this).attr("start-number") !== undefined
        ? +$(this).attr("start-number")
        : 0;
    let endNumber = +$(this).attr("final-number");
    let decimals = +$(this).attr("decimals");
    let duration = $(this).attr("count-duration");

    let myCounter = new CountUp(
      thisId,
      startNumber,
      endNumber,
      decimals,
      duration
    );
    ScrollTrigger.create({
      trigger: $(this),
      start: "top bottom",
      onEnter: () => {
        myCounter.start();
      },
    });
  });
}

// --- GLOBAL - PARALLAX
function parallax() {
  gsap.utils.toArray("[parallax-container]").forEach((container) => {
    const img = container.querySelector(".c-img");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        scrub: true,
      },
    });

    tl.fromTo(
      img,
      {
        yPercent: -5,
        ease: "none",
      },
      {
        yPercent: 5,
        ease: "none",
      }
    );
  });
}

// CURRENT YEAR
let currentYear = document.querySelector("[current-year]");
if (currentYear) {
  currentYear.innerHTML = new Date().getFullYear();
}

// --- HERO SECTION - BACKGROUND MOVEMENT
function heroBackgroundMovement() {
  let heroBg = document.querySelector(".c-hero-bg");
  let section = document.querySelector(".c-section.hm-hero");
  let sectionWidth = section.offsetWidth;

  section.addEventListener("mousemove", function (event) {
    let mouseX = event.pageX;
    let percentX = (mouseX / sectionWidth) * 100;
    let moveAmount = (percentX - 50) * 0.015;

    gsap.to(heroBg, { duration: 0.8, x: moveAmount + "%", ease: "power3.out" });
  });
}

// --- HERO SECTION - MARQUEE
function heroMarquee() {
  let tl = gsap.timeline({ repeat: -1 });

  tl.to(".c-hero-bg-item", { xPercent: -100, duration: 70, ease: "none" });
}

// --- HERO SECTION - PHONE INTERACTION
function phone() {
  let blockDuration = 1;
  let itemDelay = 0.4;

  gsap.to(".c-position-item-wrap", {
    duration: blockDuration,
    ease: "power4.inOut",
    stagger: { each: blockDuration + itemDelay, from: "end" },
    height: "auto",
  });

  gsap.from(".c-position-item", {
    duration: blockDuration,
    ease: "power3.inOut",
    stagger: { each: blockDuration + itemDelay, from: "end" },
    scale: 0,
  });
}

// --- SUPER APP PARALLAX
function superAppParallax() {
  gsap.from(".o-row.stock-title", {
    scrollTrigger: {
      trigger: ".o-row.smile",
      start: "top center",
      end: "bottom center",
      scrub: true,
    },
    yPercent: -120,
  });
}

// --- MOMENTUM LINE ANIMATION
function momentumLine() {
  let tl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 1.4,
      ease: "expo.out",
    },
  });

  gsap.set(".c-info-graph-circle", { transformOrigin: "center center" });
  gsap.set(".c-info-graph-dot", { transformOrigin: "center center" });

  tl.from(".c-info-graph path", { drawSVG: 0, ease: "linear" });
  tl.from(
    ".c-img-contain.rocket",
    {
      duration: 0.6,
      ease: "power2.out",
      autoAlpha: 0,
      x: "-3.5em",
      y: "1.25em",
    },
    ">-0.2"
  );

  ScrollTrigger.create({
    trigger: ".c-info-item.graph",
    start: "30% bottom",
    once: true,
    onEnter: () => {
      tl.restart();
    },
  });
}

// --- FAQ SECTION - ACORDIONS
function faqAccordion() {
  $(".c-faq-item").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.6, ease: "power2.inOut" },
    });

    let accordionResponse = $(this).find(".c-faq-response");
    let accordionArrow = $(this).find(".c-icon.faq");

    tl.to(accordionResponse, { height: "auto" });
    tl.to(accordionArrow, { rotation: 180, opacity: 1 }, 0);

    $(this).on("click", function () {
      $(".c-faq-item.is-open").not($(this)).click();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });
  });

  if ($(".c-faq-item").length > 0) {
    $(".c-faq-item")[0].click();
  }
}

// --- FOOTER - BG MARQUEE
function footerMarquee() {
  let tl = gsap.timeline({ repeat: -1 });

  tl.to(".c-footer-marquee-item", {
    xPercent: -100,
    duration: 70,
    ease: "none",
  });
}

// --- MAIN CTA - HOVER EFFECT
function mainCtaHover() {
  $(".c-btn.main-cta").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: buttonEase, duration: 0.6 },
    });

    let hoverButton = $(this).find(".c-btn-inner.hover");

    gsap.set(hoverButton, { autoAlpha: 1, yPercent: 110 });

    tl.to(hoverButton, { yPercent: 0 });

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// --- PARTICLES JS
function particles() {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "star",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          size_min: 0.3,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 600,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble",
        },
        onclick: {
          enable: false,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 119.88011988011988,
          size: 0,
          duration: 1.5984015984015985,
          opacity: 0,
          speed: 3,
        },
        repulse: {
          distance: 400,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
}

// --- SPLIT BLOCKS
function splitBlocks() {
  $(".c-section.split").each(function () {
    let triggers = $(this).find(".c-panel");
    let items = $(this).find(".o-row.split");
    triggers.each(function (index) {
      let item = items.eq(index);

      if (index === 0) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          defaults: {
            ease: "none",
          },
        });

        tl.fromTo(item, { scale: 1 }, { scale: 0.9 });
      }

      if (index === 1) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          defaults: {
            ease: "none",
          },
        });

        tl.fromTo(item, { scale: 1 }, { scale: 0.95 });
      }
    });
  });
}

// --- HOME LOADER
function homeLoader() {
  let tl = gsap.timeline({
    defaults: { ease: panelEase, duration: 1.6 },
    delay: 0.2,
  });

  tl.to(".c-hero-bg-wrap", { autoAlpha: 1 });
  tl.to(".c-hero-gradient", { autoAlpha: 0.05 }, "<");
  tl.from(".c-hero_lt", { autoAlpha: 0, y: "4em" }, "<0.2");
  tl.from(
    ".c-img-contain.phone",
    { autoAlpha: 0, y: "16em", rotation: 10, xPercent: 10 },
    "<0.2"
  );

  tl.addLabel("phoneTrigger", "<0.2");

  tl.add(() => {
    phone();
  }, "phoneTrigger");
}

// --- HERO - LITTLE GUY MOVEMENT
function heroLittleGuys() {
  gsap.to("[hero-hand-left]", {
    scrollTrigger: {
      trigger: "[hero-hand-left]",
      start: "top 10%",
      scrub: true,
    },
    rotation: -5,
  });

  gsap.to("[hero-hand-right]", {
    scrollTrigger: {
      trigger: "[hero-hand-left]",
      start: "top top",
      scrub: true,
    },
    rotation: 5,
  });

  gsap.from(".c-smile.is-1", {
    scrollTrigger: {
      trigger: ".c-smile.is-1",
      start: "top bottom",
      scrub: true,
    },
    rotation: 15,
  });
}

// --- REVIEWS - MOBILE SLIDER
function reviewsMobileSlider() {
  let reviewsSwiper = new Swiper(".swiper.reviews", {
    spaceBetween: 24,
    centeredSlides: true,
    speed: 3000,
    autoplay: {
      delay: 4000,
      reverseDirection: true,
    },
    loop: true,
    slidesPerView: 1.25,
    allowTouchMove: false,
  });
}

function footerDataSlider() {
  let footerSwiper = new Swiper(".swiper.footer-data", {
    speed: 600,
    spaceBetween: 16,
    slidesPerView: 1.1,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  function destroySwiper() {
    if (window.innerWidth >= 992 && footerSwiper) {
      footerSwiper.destroy();
      footerSwiper = null;
    }
  }

  window.addEventListener("resize", destroySwiper);

  destroySwiper();
}

// --- MENU MOBILE
function menuMobile() {
  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power4.inOut", duration: 0.8 },
  });

  let menuLine1 = $(".c-icon.menu rect").eq(0);
  let menuLine2 = $(".c-icon.menu rect").eq(1);
  let menuLine3 = $(".c-icon.menu rect").eq(2);
  let menuEl = $(".c-header_center");

  gsap.set(menuLine1, { transformOrigin: "center center" });
  gsap.set(menuLine2, { transformOrigin: "center center" });
  gsap.set(menuLine3, { transformOrigin: "center center" });
  gsap.set(menuEl, { autoAlpha: 1, height: 0 });

  tl.to(menuLine1, { rotation: 45, y: 7 });
  tl.to(menuLine2, { width: 0 }, 0);
  tl.to(menuLine3, { rotation: -45, y: -7 }, 0);
  tl.to(menuEl, { height: "auto" }, 0);
  tl.to(".o-page-wrapper", { opacity: 0.4 }, 0);

  $(".c-nav-btn").on("click", function () {
    $(this).toggleClass("is-open");
    if ($(this).hasClass("is-open")) {
      tl.restart();
      // lenis.stop();
    } else {
      tl.reverse();
      // lenis.start();
    }
  });

  $(".c-nav-link").on("click", function () {
    if (!$(this).hasClass("get-started")) {
      setTimeout(() => {
        $(".c-nav-btn").click();
      }, 400);
    }
  });
}

// --- SPLIT POP-UP
function splitPopUp() {
  $(".c-split-pu").each(function () {
    let popUpTrigger = $(this).find(".c-icon.pop-up");
    let popUpContent = $(this).find(".c-popup");

    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.inOut", duration: 0.6 },
    });

    tl.to(popUpTrigger, { rotation: 45 });
    tl.from(popUpContent, { autoAlpha: 0, y: "1.75em" }, 0);

    popUpTrigger.on("mouseenter", function () {
      tl.restart();
    });

    popUpTrigger.on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// --- HEADER DOWNLOAD BUTTON
function headerDownloadButton() {
  $(".c-nav-link.get-started").each(function () {
    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: buttonEase, duration: 0.4 },
    });

    let downloadEl = $(this).find(".c-download-txt");
    let storeEl = $(this).find(".c-download-store");

    gsap.set(storeEl, { autoAlpha: 0 });

    tl.to(downloadEl, { width: 0 });
    tl.to(storeEl, { width: "auto", autoAlpha: 1 }, 0.2);

    $(this).on("mouseenter", function () {
      tl.restart();
    });

    $(this).on("mouseleave", function () {
      tl.reverse();
    });
  });
}

// --- SCROLL TO
$("[scroll-to]").each(function () {
  $(this).click(function () {
    let scrollToElement = $(this).attr("scroll-to");
    gsap.to(".o-page-wrapper", { opacity: 0, duration: 0.2 });
    gsap.to(window, {
      duration: 0.2,
      scrollTo: { y: scrollToElement },
      delay: 0.2,
    });
    gsap.to(".o-page-wrapper", { opacity: 1, duration: 0.1, delay: 0.4 });
  });
});

//
////
/////
////
//

// --- PAGES
let homePage = document.querySelector("[home-page]");

// --- INIT
function init() {
  faqAccordion();
  statsCounter();
  momentumLine();
  mainCtaHover();
  splitPopUp();
  headerDownloadButton();
  if (homePage) {
    homeLoader();
    particles();
  }
}
init();

// --- MATCHMEDIA - DESKTOP
mm.add("(min-width: 992px)", () => {
  splitBlocks();
  parallax();
  heroLittleGuys();
  superAppParallax();
  return () => {
    gsap.set(".c-hero_lt", { clearProps: "transform" });
  };
});

// --- MATCHMEDIA - TABLET AND MOBILE
mm.add("(max-width: 991px)", () => {
  reviewsMobileSlider();
  menuMobile();
  footerDataSlider();
  return () => {
    //
  };
});