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
    const elementsToAnimate = document.querySelectorAll('.project-card'); // Reverted selector

    if ('IntersectionObserver' in window && elementsToAnimate.length > 0) {
        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        };

        const animationObserver = new IntersectionObserver(observerCallback, observerOptions);

        elementsToAnimate.forEach(element => { // Renamed variable for clarity
            animationObserver.observe(element);
        });

    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Make all elements visible immediately
        elementsToAnimate.forEach(element => {
            element.classList.add('visible');
            element.style.opacity = 1; // Ensure direct style override if needed
            element.style.transform = 'translateY(0)';
        });
        console.warn('IntersectionObserver not supported, scroll animations disabled.');
    }

}); 