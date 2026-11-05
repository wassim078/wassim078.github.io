/* ==========================================
   WASSIM JMILI — PORTFOLIO INTERACTIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  // Current year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();


  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function setMenu(open) {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.toggle("open", open);
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      setMenu(!navLinks.classList.contains("open"));
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => setMenu(false));
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") setMenu(false);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) setMenu(false);
    });
  }


  // Detection console: play the log, then raise the alert
  const logLines = document.querySelectorAll("#log .log-line");
  const alertBox = document.getElementById("alert");

  if (logLines.length && alertBox) {

    if (reducedMotion) {
      logLines.forEach(line => line.classList.add("on"));
      alertBox.classList.add("on");

    } else {
      let delay = 500;

      logLines.forEach(line => {
        setTimeout(() => line.classList.add("on"), delay);
        delay += 380;
      });

      setTimeout(() => alertBox.classList.add("on"), delay + 350);
    }
  }


  // Highlight the navigation link of the section in view
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if ("IntersectionObserver" in window && sections.length) {

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          navAnchors.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }

});
