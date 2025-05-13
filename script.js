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

  // Project Popup Handling
  document.querySelectorAll('[data-popup]').forEach(button => {
    button.addEventListener('click', () => {
      const popupId = button.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      if (popup) {
        // Close any open popup
        document.querySelectorAll('.project-popup-overlay').forEach(openPopup => {
          openPopup.classList.remove('active');
        });
        // Open the target popup
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
      } else {
        console.error(`Popup with ID ${popupId} not found`);
      }
    });
  });

  // Handle close button clicks for all popups
  document.querySelectorAll('.popup-close-btn').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const popup = closeBtn.closest('.project-popup-overlay');
      if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
      }
    });
  });

  // Handle overlay clicks to close popups
  document.querySelectorAll('.project-popup-overlay').forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
      }
    });
  });

  // Certificate Popup Handling
  const certCards = document.querySelectorAll('.cert-card');
  const certPopup = document.getElementById('cert-popup');
  const certImage = document.getElementById('cert-image');
  const errorMessage = document.getElementById('error-message');
  const closePopup = document.querySelector('.close-popup');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const imageSrc = card.getAttribute('data-cert-image');
      certImage.src = imageSrc;
      certImage.style.display = 'none';
      errorMessage.style.display = 'none';
      certPopup.style.display = 'flex';

      // Check if image loads successfully
      certImage.onload = () => {
        certImage.style.display = 'block';
      };
      certImage.onerror = () => {
        errorMessage.style.display = 'block';
        console.error(`Failed to load image: ${imageSrc}`);
      };
    });
  });

  closePopup.addEventListener('click', () => {
    certPopup.style.display = 'none';
    certImage.src = '';
    certImage.style.display = 'none';
    errorMessage.style.display = 'none';
  });

  certPopup.addEventListener('click', (e) => {
    if (e.target === certPopup) {
      certPopup.style.display = 'none';
      certImage.src = '';
      certImage.style.display = 'none';
      errorMessage.style.display = 'none';
    }
  });

  // Handle Escape key for both certificate and project popups
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Certificate popup
      if (certPopup.style.display === 'flex') {
        certPopup.style.display = 'none';
        certImage.src = '';
        certImage.style.display = 'none';
        errorMessage.style.display = 'none';
      }
      // Project popups
      document.querySelectorAll('.project-popup-overlay.active').forEach(popup => {
        popup.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });
});