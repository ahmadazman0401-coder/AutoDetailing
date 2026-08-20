/* Replace this one value with the client's WhatsApp number.
   Use international format without +, spaces or dashes. Example: 60123456789 */
const WHATSAPP_NUMBER = "601XXXXXXXX";

const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const toast = document.querySelector("#toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3800);
}

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  siteNav?.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  siteNav?.classList.toggle("open", willOpen);
  document.body.classList.toggle("menu-open", willOpen);
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 24);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });
observedSections.forEach((section) => sectionObserver.observe(section));

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

document.querySelectorAll("[data-comparison]").forEach((comparison) => {
  const input = comparison.querySelector('input[type="range"]');

  function updateComparison() {
    comparison.style.setProperty("--position", `${input.value}%`);
    comparison.style.setProperty("--compare-width", `${comparison.clientWidth}px`);
  }

  input.addEventListener("input", updateComparison);
  window.addEventListener("resize", updateComparison);
  updateComparison();
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxCaption = lightbox?.querySelector("figcaption");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector("img")?.alt || "Apex Auto Spa result";
    lightboxCaption.textContent = item.dataset.caption || "Apex Auto Spa result";
    lightbox.showModal();
  });
});

lightboxClose?.addEventListener("click", () => lightbox.close());
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

const serviceSelect = document.querySelector("#service-select");
document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    if (serviceSelect) serviceSelect.value = button.dataset.service;
    document.querySelector("#contact")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    window.setTimeout(() => serviceSelect?.focus(), reducedMotion ? 0 : 650);
  });
});

function validWhatsAppNumber() {
  return /^\d{8,15}$/.test(WHATSAPP_NUMBER);
}

function openWhatsApp(message) {
  if (!validWhatsAppNumber()) {
    navigator.clipboard?.writeText(message).catch(() => {});
    showToast("Demo mode: replace WHATSAPP_NUMBER at the top of script.js. The message was copied.");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelector("#booking-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = [
    "Hi Apex Auto Spa, I would like to request an assessment.",
    "",
    `Name: ${data.get("name")}`,
    `My WhatsApp: ${data.get("phone")}`,
    `Car: ${data.get("make")} ${data.get("model")}`,
    `Service: ${data.get("service")}`,
    `Condition / goal: ${data.get("condition")}`
  ].join("\n");
  openWhatsApp(message);
});

document.querySelector("#whatsapp-float")?.addEventListener("click", () => {
  openWhatsApp("Hi Apex Auto Spa, I would like to ask about your detailing services.");
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
