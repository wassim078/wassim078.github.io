/* =========================================
   WASSIM JMILI — PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // CURRENT YEAR
  // =====================================

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // =====================================
  // MOBILE NAVIGATION
  // =====================================

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
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


  // =====================================
  // TYPING EFFECT
  // =====================================

  const typingElement = document.getElementById("typingText");

  const phrases = [
    "SOC & SIEM Engineering",
    "Detection Engineering",
    "Cloud Security",
    "Blue Team Operations",
    "DevSecOps"
  ];

  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typingElement) {

    if (reducedMotion) {
      typingElement.textContent = phrases[0];
    } else {

      function typePhrase() {
        const currentPhrase = phrases[phraseIndex];

        if (!deleting) {
          characterIndex++;

          typingElement.textContent =
            currentPhrase.substring(0, characterIndex);

          if (characterIndex === currentPhrase.length) {
            deleting = true;
            setTimeout(typePhrase, 1500);
            return;
          }

          setTimeout(typePhrase, 75);

        } else {
          characterIndex--;

          typingElement.textContent =
            currentPhrase.substring(0, characterIndex);

          if (characterIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;

            setTimeout(typePhrase, 350);
            return;
          }

          setTimeout(typePhrase, 35);
        }
      }

      typePhrase();
    }
  }


  // =====================================
  // SCROLL REVEAL ANIMATIONS
  // =====================================

  const revealElements = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && !reducedMotion) {

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


  // =====================================
  // SCROLL PROGRESS BAR
  // =====================================

  const progressBar = document.getElementById("scrollProgress");

  function updateScrollProgress() {

    if (!progressBar) return;

    const scrollTop =
      window.scrollY || document.documentElement.scrollTop;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollableHeight > 0
        ? (scrollTop / scrollableHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener("scroll", updateScrollProgress, {
    passive: true
  });

  updateScrollProgress();


  // =====================================
  // ACTIVE NAVIGATION LINK
  // =====================================

  const sections = document.querySelectorAll("main section[id]");
  const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            const activeId = entry.target.id;

            navigationLinks.forEach(link => {

              const isActive =
                link.getAttribute("href") === `#${activeId}`;

              link.classList.toggle("active", isActive);

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
