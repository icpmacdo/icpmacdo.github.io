'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Toggle ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const navMenu = document.querySelector('nav'); // Target the nav element directly

    if (hamburgerButton && navMenu) {
        hamburgerButton.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburgerButton.classList.toggle('active');
            hamburgerButton.setAttribute('aria-expanded', isActive);

            // Optional: Prevent body scroll when menu is open
            if (isActive) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu if a nav link is clicked (for single-page apps/scrolling)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburgerButton.classList.remove('active');
                    hamburgerButton.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // --- Intersection Observer for Scroll Animations ---
    const elementsToAnimate = document.querySelectorAll('.project-card');

    if ('IntersectionObserver' in window && elementsToAnimate.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const animationObserver = new IntersectionObserver(observerCallback, observerOptions);

        elementsToAnimate.forEach(element => {
            animationObserver.observe(element);
        });

    } else {
        // Fallback for browsers that don't support IntersectionObserver
        elementsToAnimate.forEach(element => {
            element.classList.add('visible');
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        });
        console.warn('IntersectionObserver not supported, scroll animations disabled.');
    }

    // --- Scroll to Top Button ---
    const scrollToTopButton = document.getElementById('scrollToTop');

    if (scrollToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });

        // Smooth scroll to top when clicked
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80; // Account for sticky header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

}); 