// ======= Global Variables =======
let currentTransitionType = "type1";
let swiperInstances = [];

// ======= Utility Functions =======
function showOverlay() {
  const ov = document.getElementById("overlay");
  if (ov) ov.style.display = "block";
}
function hideOverlay() {
  const ov = document.getElementById("overlay");
  if (ov) ov.style.display = "none";
}
function showDetails(title, description) {
  const overlay = document.getElementById("project-details-overlay");
  const titleEl = document.getElementById("project-title");
  const descEl = document.getElementById("project-details");
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = description;
  if (overlay) overlay.style.display = "flex";
}
function closeDetails() {
  const overlay = document.getElementById("project-details-overlay");
  if (overlay) overlay.style.display = "none";
}

// ======= Page Transition Animations =======
function pageTransitionType1() {
  showOverlay();
  const items = document.querySelectorAll("ul.transition--1 li");
  return gsap
    .timeline({
      onComplete: () => hideOverlay(),
    })
    .to(items, {
      duration: 0.3,
      scaleY: 1,
      stagger: 0.1,
      transformOrigin: "bottom left",
      ease: "power2.out",
    });
}
function pageTransitionTypeOut1() {
  showOverlay();
  const items = document.querySelectorAll("ul.transition--1 li");
  return gsap
    .timeline({
      onComplete: () => hideOverlay(),
    })
    .to(items, {
      duration: 0.3,
      scaleY: 0,
      stagger: 0.08,
      delay: 0.1,
      transformOrigin: "bottom left",
      ease: "power2.in",
    });
}
function pageTransitionType2() {
  showOverlay();
  const items = document.querySelectorAll("ul.transition--2 li");
  return gsap
    .timeline({
      onComplete: () => hideOverlay(),
    })
    .to(items, {
      duration: 0.7,
      scaleX: 1,
      transformOrigin: "bottom left",
      ease: "Power2.easeInOut",
    });
}
function pageTransitionTypeOut2() {
  showOverlay();
  const items = document.querySelectorAll("ul.transition--2 li");
  return gsap
    .timeline({
      onComplete: () => hideOverlay(),
    })
    .to(items, {
      duration: 0.7,
      scaleX: 0,
      transformOrigin: "bottom right",
      ease: "Power2.easeInOut",
    });
}

const transitions = {
  type1: { leave: pageTransitionType1, enterOut: pageTransitionTypeOut1 },
  type2: { leave: pageTransitionType2, enterOut: pageTransitionTypeOut2 },
};

// ======= Swiper Initialization =======
const swiperSettings = {
  // default for first swiper
  ".swiper-container-1": {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    speed: 800,
    pagination: { el: ".swiper-pagination-1", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next-1",
      prevEl: ".swiper-button-prev-1",
    },
    centeredSlides: true,
    touchRatio: 1.2,
    resistanceRatio: 0.85,
  },
  ".swiper-container-2": {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    speed: 800,
    pagination: { el: ".swiper-pagination-2", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next-2",
      prevEl: ".swiper-button-prev-2",
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 20, loop: false },
    },
    touchRatio: 1.2,
    resistanceRatio: 0.85,
  },
};

function initAllSwipers() {
  // destroy previous instances
  swiperInstances.forEach((inst) => {
    if (inst && inst.destroy) inst.destroy(true, true);
  });
  swiperInstances = [];

  Object.keys(swiperSettings).forEach((selector) => {
    const el = document.querySelector(selector);
    if (el) {
      const settings = swiperSettings[selector];
      const inst = new Swiper(selector, settings);
      swiperInstances.push(inst);
    }
  });
}

// ======= Barba Setup =======
barba.init({
  sync: true,
  logLevel: "error", // reduce console noise
  transitions: [
    {
      name: "default",
      async leave(data) {
        // pick transition type based on clicked link data
        const trigger = data.trigger;
        currentTransitionType = trigger?.dataset.transitionType || "type1";

        const tl = transitions[currentTransitionType].leave();
        await tl.play();
        data.current.container.remove();
      },
      enter(data) {
        // When entering the new page
        initAllSwipers();
        contentAnimation(data.next.namespace);
      },
      afterEnter(data) {
        const tl = transitions[currentTransitionType].enterOut();
        tl.play();
      },
    },
  ],
  views: [
    {
      namespace: "home",
      afterEnter() {
        initAllSwipers();
      },
    },
    {
      namespace: "websites",
      afterEnter() {
        initAllSwipers();
      },
    },
    {
      namespace: "games",
      afterEnter() {
        initAllSwipers();
      },
    },
  ],
});

// ======= Content Animations =======
function contentAnimation(namespace) {
  switch (namespace) {
    case "websites":
      gsap.from("main", { duration: 1, opacity: 0, ease: "power2.inOut" });
      break;
    case "games":
      gsap.from("main", { duration: 1, opacity: 0, ease: "power2.inOut" });
      break;
    default:
      gsap.from(".menu", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power2.inOut",
      });
      break;
  }
}

// ======= Init on DOMContentLoaded =======
document.addEventListener("DOMContentLoaded", () => {
  initAllSwipers();
  contentAnimation("home");
  document
    .getElementById("close-button")
    ?.addEventListener("click", closeDetails);
});
