document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navIndicator = document.querySelector('.nav-indicator');

    // 2. Navigation Indicator Movement
    function moveIndicator(element) {
        if (!element) return;
        // Small delay to ensure layout is calculated
        setTimeout(() => {
            navIndicator.style.width = `${element.offsetWidth}px`;
            navIndicator.style.left = `${element.offsetLeft}px`;
        }, 50);
    }

    // Initialize indicator position
    const activeLink = document.querySelector('.nav-links a.active');
    if (activeLink) moveIndicator(activeLink);

    // Manual Click Handling for instant feedback
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            moveIndicator(link);
        });
    });

    // 3. Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. ScrollSpy (Improved Observer)
    const sections = document.querySelectorAll('section[id]');
    const spyOptions = {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: "-20% 0px -40% 0px" 
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const targetNavLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                
                if (targetNavLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetNavLink.classList.add('active');
                    moveIndicator(targetNavLink);
                }
            }
        });
    }, spyOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Recalculate on resize
    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.nav-links a.active');
        if (currentActive) moveIndicator(currentActive);
    });

    // 5. Fade-in Animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('section:not(.hero), .gallery-item, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        fadeObserver.observe(el);
    });

    // 6. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksContainer = document.getElementById('nav-links');

    if (mobileMenu && navLinksContainer) {
        mobileMenu.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
            });
        });
    }
});
