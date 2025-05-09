// Hamburger menu logic
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
// Close mobile menu after clicking any link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});
// Sticky nav shadow effect
window.addEventListener("scroll", () => {
  document
    .querySelector("nav")
    .classList.toggle("scrolled", window.scrollY > 8);
});
// Smooth scroll
document.querySelectorAll(".nav-links a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.hash) {
      e.preventDefault();
      const section = document.querySelector(this.hash);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 58,
          behavior: "smooth",
        });
      }
    }
  });
});
// Highlight nav link on scroll
const sections = document.querySelectorAll("main section");
const navItems = document.querySelectorAll(".nav-links li");
function activateNavLink() {
  let index = sections.length;
  while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
  navItems.forEach((li) => li.classList.remove("active"));
  if (navItems[index]) navItems[index].classList.add("active");
}
window.addEventListener("scroll", activateNavLink);
activateNavLink();

// On-scroll fade-in for about section
const aboutSection = document.querySelector("#about");
function checkAboutVisibility() {
  const rect = aboutSection.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  if (rect.top <= windowHeight * 0.85) {
    aboutSection.classList.add("visible");
    window.removeEventListener("scroll", checkAboutVisibility);
  }
}
window.addEventListener("scroll", checkAboutVisibility);
// Initial check in case already visible
checkAboutVisibility();

// Find About section
if (aboutSection) {
  aboutSection.classList.add('visible'); // Always show
}
