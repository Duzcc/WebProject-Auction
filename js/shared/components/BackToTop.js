/**
 * Back to Top Button Component
 * Floating button to scroll back to top
 */

import { throttle } from '../utils/throttle.js';

let backToTopButton = null;

/**
 * Initialize back to top button
 * @param {number} showAfter - Show button after scrolling this many pixels (default: 300)
 */
export function initBackToTop(showAfter = 300) {
    if (backToTopButton) return; // Already initialized

    // Create button
    backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top fixed bottom-6 right-6 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-50 opacity-0 pointer-events-none';
    backToTopButton.innerHTML = '<i data-lucide="arrow-up" class="w-6 h-6"></i>';
    backToTopButton.title = 'Về đầu trang';
    backToTopButton.setAttribute('aria-label', 'Scroll to top');

    document.body.appendChild(backToTopButton);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Scroll handler (throttled)
    const handleScroll = throttle(() => {
        if (window.scrollY > showAfter) {
            backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
            backToTopButton.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            backToTopButton.classList.add('opacity-0', 'pointer-events-none');
            backToTopButton.classList.remove('opacity-100', 'pointer-events-auto');
        }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    // Click handler
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Remove back to top button
 */
export function removeBackToTop() {
    if (backToTopButton) {
        backToTopButton.remove();
        backToTopButton = null;
    }
}

export default { initBackToTop, removeBackToTop };
