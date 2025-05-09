// Hamburger menu logic
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
        // Close mobile menu after clicking any link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
            });
        });
        // Sticky nav shadow effect
        window.addEventListener('scroll', () => {
            document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 8);
        });
        // Smooth scroll
        document.querySelectorAll('.nav-links a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.hash) {
                    e.preventDefault();
                    const section = document.querySelector(this.hash);
                    if(section) {
                        window.scrollTo({
                            top: section.offsetTop - 58,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        // Highlight nav link on scroll
        const sections = document.querySelectorAll('main section');
        const navItems = document.querySelectorAll('.nav-links li');
        function activateNavLink() {
            let index = sections.length;
            while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
            navItems.forEach(li => li.classList.remove('active'));
            if(navItems[index]) navItems[index].classList.add('active');
        }
        window.addEventListener('scroll', activateNavLink);
        activateNavLink();

        // On-scroll fade-in for about and skills sections
        const aboutSection = document.querySelector('#about');
        const skillsSection = document.querySelector('#skills');
        function checkVisibility() {
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            if(aboutSection) {
                const rectAbout = aboutSection.getBoundingClientRect();
                if(rectAbout.top <= windowHeight * 0.85) {
                    aboutSection.classList.add('visible');
                }
            }
            if(skillsSection) {
                const rectSkills = skillsSection.getBoundingClientRect();
                if(rectSkills.top <= windowHeight * 0.85) {
                    skillsSection.classList.add('visible');
                }
            }
            if(aboutSection.classList.contains('visible') && skillsSection.classList.contains('visible')) {
                window.removeEventListener('scroll', checkVisibility);
            }
        }
        window.addEventListener('scroll', checkVisibility);
        // Initial check in case already visible
        checkVisibility();