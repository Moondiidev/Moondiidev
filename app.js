// Global variable to store the current transition type
let currentTransitionType = "type1";
let starsInitialized = false;

// Initialize first swiper with default options
const swiper1Options = {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  initialSlide: 1,
  loopAdditionalSlides: 1,

  pagination: {
    el: ".swiper-pagination-1",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next-1",
    prevEl: ".swiper-button-prev-1",
  },
};

// Initialize second swiper with different options
const swiper2Options = {
  slidesPerView: 1, // Default slides per view for mobile
  spaceBetween: 40,
  loop: true,
  initialSlide: 1,

  pagination: {
    el: ".swiper-pagination-2",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next-2",
    prevEl: ".swiper-button-prev-2",
  },
  breakpoints: {
    // Breakpoints for responsive design
    // Show 4 for desktop
    1024: {
      slidesPerView: 3,
      loop: false, // Set to false until there are more than 3 slides. It is causing a bug.
      spaceBetween: 20,
    },
    // Show 3 for tablet
    768: {
      slidesPerView: 2,
    },
  },
};

document.addEventListener("DOMContentLoaded", initStars);

function showDetails(title, description) {
  document.getElementById("project-title").textContent = title;
  document.getElementById("project-details").textContent = description;
  document.getElementById("project-details-overlay").style.display = "flex";
}

function closeDetails() {
  var overlay = document.getElementById("project-details-overlay");
  if (overlay) {
    overlay.style.display = "none";
  } else {
    console.error("Overlay element not found!");
  }
}

function showOverlay() {
  console.log("Showing overlay");
  document.getElementById("overlay").style.display = "block";
}

function hideOverlay() {
  var overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

// Define transition functions for each type
function pageTransitionType1() {
  console.log("Starting pageTransitionType1");
  showOverlay();
  const elements = document.querySelectorAll("ul.transition--1 li");
  console.log("Elements to animate:", elements);
  return gsap
    .timeline({
      onComplete: () => {
        console.log("Completed pageTransitionType1");
        hideOverlay();
      },
    })
    .to(elements, {
      duration: 0.3,
      scaleY: 1,
      stagger: 0.1,
      transformOrigin: "bottom left",
    });
}

function pageTransitionTypeOut1() {
  console.log("Starting pageTransitionTypeOut1");
  showOverlay();
  const elements = document.querySelectorAll("ul.transition--1 li");
  console.log("Elements to animate:", elements);
  return gsap
    .timeline({
      onComplete: () => {
        console.log("Completed pageTransitionTypeOut1");
        hideOverlay();
      },
    })
    .to(elements, {
      duration: 0.3,
      scaleY: 0,
      stagger: 0.08,
      delay: 0.1,
      transformOrigin: "bottom left",
    });
}

function pageTransitionType2() {
  console.log("Starting pageTransitionType2");
  showOverlay();
  const elements = document.querySelectorAll("ul.transition--2 li");
  console.log("Elements to animate:", elements);
  return gsap
    .timeline({
      onComplete: () => {
        console.log("Completed pageTransitionType2");
        hideOverlay();
      },
    })
    .to(elements, {
      duration: 0.7,
      scaleX: 1,
      transformOrigin: "bottom left",
      ease: "Power2.easeInOut",
    });
}

function pageTransitionTypeOut2() {
  console.log("Starting pageTransitionTypeOut2");
  showOverlay();
  const elements = document.querySelectorAll("ul.transition--2 li");
  console.log("Elements to animate:", elements);
  return gsap
    .timeline({
      onComplete: () => {
        console.log("Completed pageTransitionTypeOut2");
        hideOverlay();
      },
    })
    .to(elements, {
      duration: 0.7,
      scaleX: 0,
      transformOrigin: "bottom right",
      ease: "Power2.easeInOut",
    });
}

const transitions = {
  type1: pageTransitionType1,
  type2: pageTransitionType2,
};

// Content animation function for general page content
function contentAnimation() {
  console.log("Animating content");
  gsap.from(".menu", { duration: 1, y: 30, opacity: 0, ease: "power2.inOut" });
}

function contentAnimationForSkills() {
  console.log("Animating skills content");
  gsap.from("main", {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: "power1.out",
  });
}

function contentAnimationForWebsites() {
  console.log("Animating websites content");
  gsap.from("main", {
    duration: 1,
    opacity: 0,
    ease: "power2.inOut",
  });
}

function contentAnimationForGames() {
  console.log("Animating games content");
  gsap.from("main", {
    duration: 1,
    opacity: 0,
    ease: "power2.inOut",
  });
}

// Call the function after the Swiper initialization
function initializePage() {
  console.log("Initializing page...");
  initSwiper(".swiper-container-1", swiper1Options);
  initSwiper(".swiper-container-2", swiper2Options);
  initVideoControls();
  initLogoAnimations();

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  if (isMobile) {
    setEqualHeightForSlides();
  } else {
    initMistDrift();
    initRandomButtonPulse();
  }

  console.log("Page initialized.");
}

function initLogoAnimations() {
  const logo = document.querySelector(".site-logo");
  if (!logo) return;

  // Fade-in once Barba finishes entering
  setTimeout(() => {
    logo.style.opacity = "1";
    logo.style.transform = "translateY(0px)";
  }, 350); // sync with your page transition timing
}

function initSwiper(containerSelector, options) {
  console.log("Initializing Swiper...");

  // Ensure the container exists before initializing Swiper
  const containerElement = document.querySelector(containerSelector);
  if (!containerElement) {
    console.error("Swiper container not found:", containerSelector);
    return;
  }

  // Destroy any existing Swiper instances on this container to prevent conflicts
  if (containerElement.swiper) {
    containerElement.swiper.destroy(true, true);
  }

  // Initialize Swiper
  let swiper;
  try {
    swiper = new Swiper(containerSelector, options);
  } catch (error) {
    console.error("Error initializing Swiper:", error);
    return;
  }

  // Access slidesPerView from Swiper instance after initialization
  const slidesPerView = swiper.params.slidesPerView;

  // Cooldown period in milliseconds
  const cooldown = 100;
  let isCooldown = false; // Flag to manage cooldown state

  // Function to handle button click with cooldown
  const handleButtonClick = (button, action) => {
    if (!isCooldown) {
      isCooldown = true;
      button.classList.add("disabled"); // Optionally, add a CSS class to visually disable the button
      setTimeout(() => {
        action();
        button.classList.remove("disabled"); // Remove the CSS class to enable the button
        isCooldown = false;
      }, cooldown);
    }
  };

  // Debounce function to prevent multiple rapid clicks
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Get next and previous button elements
  const nextButton = document.querySelector(".swiper-button-next");
  const prevButton = document.querySelector(".swiper-button-prev");

  if (!nextButton || !prevButton) {
    console.error("Swiper buttons not found");
    return;
  }

  // Remove existing event listeners to ensure only one listener is added
  if (nextButton) {
    nextButton.removeEventListener("click", nextButton._listener);
    const nextButtonHandler = () => {
      handleButtonClick(nextButton, () => {
        try {
          if (swiper.slides && swiper.slides.length > 0) {
            swiper.slideNext(); // Move swiper forward one slide
          } else {
            console.error("Swiper slides not found or empty");
          }
        } catch (error) {
          console.error("Error moving swiper forward:", error);
        }
      });
    };
    nextButton._listener = debounce(nextButtonHandler, 100);
    nextButton.addEventListener("click", nextButton._listener);
  }

  if (prevButton) {
    prevButton.removeEventListener("click", prevButton._listener);
    const prevButtonHandler = () => {
      handleButtonClick(prevButton, () => {
        try {
          if (swiper.slides && swiper.slides.length > 0) {
            swiper.slidePrev(); // Move swiper backward one slide
          } else {
            console.error("Swiper slides not found or empty");
          }
        } catch (error) {
          console.error("Error moving swiper backward:", error);
        }
      });
    };
    prevButton._listener = debounce(prevButtonHandler, 100);
    prevButton.addEventListener("click", prevButton._listener);
  }

  // Log the Swiper instance for debugging
  console.log(swiper);

  console.log("Swiper initialized.");
}

function setEqualHeightForSlides() {
  const slides = document.querySelectorAll(".swiper-slide");
  let maxHeight = 0;

  // Calculate the maximum height
  slides.forEach((slide) => {
    const slideHeight = slide.offsetHeight;
    if (slideHeight > maxHeight) {
      maxHeight = slideHeight;
    }
  });

  // Set the height for all slides
  slides.forEach((slide) => {
    slide.style.height = `${maxHeight}px`;
  });
}

function initVideoControls() {
  console.log("Initializing video controls...");
  const videos = document.querySelectorAll(".custom-video");
  console.log("Found videos:", videos);

  const isComputer = /Windows|Macintosh|Linux/.test(navigator.userAgent);
  const isiOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

  videos.forEach((video) => {
    const loader = video.parentElement.querySelector(".loader");
    const playButton = video.parentElement.querySelector(".play-button");

    // ----------------------------
    // Start loading immediately
    // ----------------------------
    video.preload = "auto";
    video.load(); // <-- Important: start buffering immediately

    // ----------------------------
    // Do NOT hide with display:none
    // ----------------------------
    video.style.opacity = "0";
    loader.style.display = "block";

    // ----------------------------
    // iOS setup
    // ----------------------------
    if (isiOS) {
      video.removeAttribute("playsinline");
      video.removeAttribute("webkit-playsinline");
      video.setAttribute("controls", "controls");
      video.muted = true;
    }

    // ----------------------------
    // Desktop autoplay preparation
    // ----------------------------
    if (isComputer) {
      video.muted = true; // REQUIRED to allow autoplay
      video.removeAttribute("autoplay"); // avoids Chrome bugs
    }

    let ready = false;
    const handleVideoReady = () => {
      if (ready) return;
      ready = true;

      loader.style.display = "none";
      video.style.opacity = "1";

      if (isComputer) {
        if (playButton) playButton.style.display = "none";

        // IMPORTANT: Call play ONLY now (never earlier)
        video.play().catch((err) => {
          console.log("Autoplay blocked:", err);
        });
      }
    };

    // More reliable combination:
    video.addEventListener("loadeddata", handleVideoReady);
    video.addEventListener("canplay", handleVideoReady);

    // ----------------------------
    // Fullscreen click handler
    // ----------------------------
    video.addEventListener("click", () => {
      video.muted = false;

      if (!isiOS) {
        if (video.requestFullscreen) video.requestFullscreen();
        else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
      }

      video.play();

      if (playButton) playButton.style.display = "none";
    });

    // ----------------------------
    // Exit fullscreen handler
    // ----------------------------
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        if (!isiOS) {
          video.muted = true;
          video.play();
        }
      }
    });
  });

  console.log("Video controls initialized.");
}

// Ensure page initialization after Barba.js transitions
barba.hooks.afterEnter((data) => {
  requestAnimationFrame(() => {
    initializePage();

    // HERO ANIMATIONS RUN HERE – NO DOMContentLoaded
    gsap.from(".background-title", {
      opacity: 0,
      y: 20,
      duration: 1.1,
      delay: 0.4,
      ease: "power3.out",
    });

    gsap.from(".menu-button", {
      opacity: 0,
      y: 18,
      duration: 1,
      delay: 0.6,
      ease: "power3.out",
      onComplete() {
        gsap.set(".menu-button", { clearProps: "transform" });
      },
    });
    gsap.from(".hero-subtitle", {
      opacity: 0,
      y: 10,
      duration: 1,
      delay: 0.9,
      ease: "power3.out",
    });
    gsap.from(".hero-icons a", {
      opacity: 0,
      y: 12,
      duration: 1,
      delay: 1.1,
      stagger: 0.12,
      ease: "power3.out",
      onComplete() {
        gsap.set(".hero-icons a", { clearProps: "all" });
      },
    });

    const namespace = data.next.namespace;

    // Enable overflow hidden ONLY on home
    if (namespace === "home") {
      document.body.classList.add("home-no-scroll");
    } else {
      document.body.classList.remove("home-no-scroll");
    }

    initStars();
  });
});

barba.hooks.afterLeave(() => {
  // Just in case — ensures cleanup
  document.body.classList.remove("home-no-scroll");
});

// Barba.js initialization
barba.init({
  transitions: [
    {
      name: "default-transition",
      leave(data) {
        const done = this.async();
        currentTransitionType = data.trigger.dataset.transitionType || "type1";
        document.getElementById("project-details-overlay").style.display =
          "none";

        console.log("Leave transition type:", currentTransitionType);
        let timeline = transitions[currentTransitionType]();
        timeline.eventCallback("onComplete", done);
      },
      enter(data) {
        console.log("Enter namespace:", data.next.namespace);
        switch (data.next.namespace) {
          case "skills":
            contentAnimationForSkills();
            break;
          case "websites":
            contentAnimationForWebsites();
            break;
          case "games":
            contentAnimationForGames();
            break;
          default:
            contentAnimation();
            break;
        }
      },
      afterEnter(data) {
        console.log("After enter transition type:", currentTransitionType);
        let timelineOut =
          currentTransitionType === "type1"
            ? pageTransitionTypeOut1()
            : pageTransitionTypeOut2();
        timelineOut.play();
      },
    },
  ],
});

document.addEventListener("mousemove", (e) => {
  const x = gsap.utils.clamp(
    -30,
    30,
    (e.clientX - window.innerWidth / 2) * 0.015
  );

  const y = gsap.utils.clamp(
    -30,
    30,
    (e.clientY - window.innerHeight / 2) * 0.015
  );

  gsap.to(".bg-cover", {
    x: x,
    y: y,
    duration: 2,
    ease: "power2.out",
  });
});

// ===================================================
// STAR EFFECTS: Flicker + Shooting Stars + Drift
// ===================================================

function initStars() {
  const starLayer = document.getElementById("star-layer");
  if (!starLayer) return;

  // Clear old stars (Barba.js safety)
  while (starLayer.firstChild) {
    starLayer.removeChild(starLayer.firstChild);
  }

  const isMobile = window.innerWidth <= 768;

  // ❌ MOBILE: no stars, no GSAP, no shooting stars
  if (isMobile) {
    console.log("Mobile detected → starfield disabled.");
    return;
  }

  // -------------------------------
  // DESKTOP STARFIELD BELOW
  // -------------------------------
  const starCount = 45;
  const minDistance = 80;
  const positions = [];

  function generatePosition() {
    let x, y, ok;

    do {
      ok = true;
      x = Math.random() * window.innerWidth;
      y = Math.random() * window.innerHeight;

      for (const p of positions) {
        if (Math.hypot(p.x - x, p.y - y) < minDistance) {
          ok = false;
          break;
        }
      }
    } while (!ok);

    positions.push({ x, y });
    return { x, y };
  }

  // ---- STAR CREATION ----
  for (let i = 0; i < starCount; i++) {
    const { x, y } = generatePosition();

    const star = document.createElement("div");
    star.classList.add("star");

    // Size cluster
    const r = Math.random();
    let size, baseOpacity, flickerRange;

    if (r < 0.7) {
      size = 1.5;
      baseOpacity = 0.18;
      flickerRange = 0.05;
    } else if (r < 0.95) {
      size = 2.5;
      baseOpacity = 0.35;
      flickerRange = 0.2;
    } else {
      size = 3.5 + Math.random() * 1.2;
      baseOpacity = 0.65;
      flickerRange = 0.35;
    }

    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.left = x + "px";
    star.style.top = y + "px";

    starLayer.appendChild(star);

    // DESKTOP: flicker
    gsap.to(star, {
      opacity: baseOpacity + Math.random() * flickerRange,
      duration: Math.random() * 1 + 0.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: Math.random() * 1.4,
    });
  }

  // ---- DESKTOP ONLY: SHOOTING STARS ----
  function createShootingStar() {
    const s = document.createElement("div");
    s.classList.add("shooting-star");

    const startX = Math.random() * window.innerWidth * 0.7;
    const startY = Math.random() * window.innerHeight * 0.4;

    const tailLength = 80 + Math.random() * 140;
    s.style.setProperty("--tail-length", tailLength + "px");

    const angle = 20 + Math.random() * 10; // natural angle
    s.style.transform = `rotate(${angle}deg)`;

    const glow = 10 + Math.random() * 20;
    s.style.boxShadow = `0 0 ${glow}px rgba(255,255,255,1)`;

    const speed = 0.7 + Math.random() * 0.8;

    s.style.left = startX + "px";
    s.style.top = startY + "px";

    starLayer.appendChild(s);

    const travel = tailLength + 300;

    gsap.to(s, {
      x: travel,
      y: travel * 0.5,
      opacity: 0,
      duration: speed,
      ease: "power2.out",
      onComplete: () => s.remove(),
    });
  }

  function shootingStarLoop() {
    if (Math.random() > 0.85) {
      createShootingStar();
    }
    setTimeout(shootingStarLoop, 2000);
  }

  shootingStarLoop();

  // Desktop-only bursts
  startTwinkleBursts?.();
}

function startTwinkleBursts() {
  const stars = document.querySelectorAll(".star");

  if (!stars.length) return;

  function twinkleBurst() {
    const star = stars[Math.floor(Math.random() * stars.length)];

    gsap.fromTo(
      star,
      { opacity: 1 },
      {
        opacity: 0.2,
        duration: 0.35,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          star.style.opacity = ""; // restore natural flicker
        },
      }
    );
  }

  // random intervals 6–12 sec
  setInterval(() => {
    if (Math.random() > 0.6) twinkleBurst();
  }, 6000);
}

function initMistDrift() {
  const mist = document.getElementById("mist-layer");
  if (!mist) return;

  gsap.to(mist, {
    backgroundPosition: "20px 35px, -15px -10px",
    duration: 22,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
}

// ---------------------------------------------------------
// RANDOM OCCASIONAL PULSE EFFECT FOR MENU BUTTONS
// ---------------------------------------------------------
function initRandomButtonPulse() {
  // Only run on HOME namespace
  const homeContainer = document.querySelector('[data-barba-namespace="home"]');
  if (!homeContainer) return;

  // Select ONLY visible menu buttons (ignores Barba leftovers)
  const buttons = [...homeContainer.querySelectorAll(".menu-button")].filter(
    (btn) => btn.offsetParent !== null
  );

  if (!buttons.length) return;

  let isPulsing = false;

  function pulseRandomButton() {
    if (isPulsing) return;

    isPulsing = true;

    const btn = buttons[Math.floor(Math.random() * buttons.length)];
    btn.classList.add("pulsing");

    setTimeout(() => {
      btn.classList.remove("pulsing");
      isPulsing = false;
    }, 1900);

    const nextDelay = 4000 + Math.random() * 6000;
    setTimeout(pulseRandomButton, nextDelay + 1900);
  }

  setTimeout(pulseRandomButton, 2500);
}
