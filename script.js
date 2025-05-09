document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });

  const contactForm = document.querySelector('#contact-form');
  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('input[name="name"]').value;
      const email = contactForm.querySelector('input[name="email"]').value;
      const message = contactForm.querySelector('textarea[name="message"]').value;

      if (name && email && message) {
          alert('Thank you for your message! I’ll get back to you soon.');
          contactForm.reset();
      } else {
          alert('Please fill out all fields.');
      }
  });
});


const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const nav = document.querySelector('nav');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
