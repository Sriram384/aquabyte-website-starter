const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

// Open or close the hamburger menu.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
});

// Close the menu after a link is selected.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Update the copyright year automatically.
document.querySelector("#year").textContent = new Date().getFullYear();

// Demo contact form: does not send or save information.
const enquiryForm = document.querySelector("#enquiryForm");
const formStatus = document.querySelector("#formStatus");

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formStatus.textContent =
    "The form layout and validation work, but no enquiry has been sent. Connect a backend or form service to receive submissions.";
});

const revealTargets = document.querySelectorAll(
  ".hero-bottom, .intro-grid > *, .section-heading, .tech-card, " +
    ".app-copy, .dashboard-wrap, .process-grid > article, " +
    ".contact-grid > *, .footer-main > div, .footer-bottom > span",
);

if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  let previousScrollY = window.scrollY;
  let scrollDirection = "down";

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - previousScrollY) > 2) {
        scrollDirection = currentScrollY > previousScrollY ? "down" : "up";
        previousScrollY = currentScrollY;
      }
    },
    { passive: true },
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.dataset.scrollDirection = scrollDirection;
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  revealTargets.forEach((target) => {
    target.dataset.scrollReveal = "";
    revealObserver.observe(target);
  });
}
