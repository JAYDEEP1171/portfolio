document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.textContent = navLinks.classList.contains("open") ? "✖" : "☰";
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.textContent = "☰";
    });
  });

  // Fade-in Sections on Scroll
  const fadeInSections = document.querySelectorAll(".fadein-section");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeInSections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Sticky Navbar Shadow
  const nav = document.querySelector("nav");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll);

  // Active Nav Link Highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinksItems = document.querySelectorAll(".nav-links a");

  const updateActiveNavLink = () => {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinksItems.forEach((link) => {
      link.parentElement.classList.remove("active");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.parentElement.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveNavLink);

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    // Basic client-side validation
    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      // Simulated API call (replace with actual endpoint if available)
      console.log("Form submitted:", { name, email, message });

      // Placeholder for actual form submission
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, message })
      // });

      alert("Message sent successfully! I will get back to you soon.");
      contactForm.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  });
});

// Open popup: call openProjectPopup()
function openProjectPopup() {
  document.getElementById('project-popup').classList.add('active');
  document.body.style.overflow = 'hidden';
}
// Close by button or overlay click
document.getElementById('popup-close-btn').onclick = closeProjectPopup;
document.getElementById('project-popup').onclick = function(e) {
  if (e.target === this) closeProjectPopup();
};
function closeProjectPopup() {
  document.getElementById('project-popup').classList.remove('active');
  document.body.style.overflow = '';
}

// Show the LoanLens popup
function showLoanLensPopup() {
  document.getElementById('loanlens-popup').classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

// Hide the LoanLens popup
function hideLoanLensPopup() {
  document.getElementById('loanlens-popup').classList.remove('active');
  document.body.style.overflow = ''; // Restore scroll
}

// Handle close button
document.getElementById('loanlens-popup-close-btn').addEventListener('click', hideLoanLensPopup);

// Optional: close when user clicks outside modal content
document.getElementById('loanlens-popup').addEventListener('click', function (e) {
  if (e.target === this) {
    hideLoanLensPopup();
  }
});