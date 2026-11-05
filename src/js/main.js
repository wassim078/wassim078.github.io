/* ==========================================
   WASSIM JMILI — PORTFOLIO INTERACTIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Current year
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation menu"
          : "Open navigation menu"
      );
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }


  // Typing animation
  const typingElement = document.getElementById("typingText");

  const phrases = [
    "SOC & SIEM Engineering",
    "Detection Engineering",
    "Cloud Security",
    "Blue Team Operations",
    "DevSecOps"
  ];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typingElement) {

    if (reducedMotion) {
      typingElement.textContent = phrases[0];

    } else {

      let phraseIndex = 0;
      let characterIndex = 0;
      let deleting = false;

      function typeText() {

        const phrase = phrases[phraseIndex];

        if (!deleting) {

          characterIndex++;

          typingElement.textContent =
            phrase.substring(0, characterIndex);

          if (characterIndex >= phrase.length) {
            deleting = true;
            setTimeout(typeText, 1600);
            return;
          }

          setTimeout(typeText, 75);

        } else {

          characterIndex--;

          typingElement.textContent =
            phrase.substring(0, characterIndex);

          if (characterIndex <= 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;

            setTimeout(typeText, 350);
            return;
          }

          setTimeout(typeText, 35);
        }
      }

      typeText();
    }
  }


  // Reveal elements on scroll
  const revealElements = document.querySelectorAll("[data-reveal]");

  if (
    "IntersectionObserver" in window &&
    !reducedMotion
  ) {

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("revealed");
    });

  }


  // Scroll progress
  const progressBar = document.getElementById("scrollProgress");

  function updateProgress() {

    if (!progressBar) return;

    const scrollTop = window.scrollY;

    const scrollableHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress = scrollableHeight > 0
      ? (scrollTop / scrollableHeight) * 100
      : 0;

    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener("scroll", updateProgress, {
    passive: true
  });

  updateProgress();


  // Active navigation links
  const sections = document.querySelectorAll("main section[id]");
  const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            navigationLinks.forEach(link => {

              const active =
                link.getAttribute("href") ===
                `#${entry.target.id}`;

              link.classList.toggle("active", active);

            });

          }

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

});
