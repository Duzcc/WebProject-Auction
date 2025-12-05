/**
 * Animations Utility
 * Intersection Observer for scroll animations
 */

/**
 * Initialize scroll animations
 * @param {string} selector - CSS selector for elements to animate (default: '.animate-on-scroll')
 * @param {Object} options - Animation options
 * @param {string} options.animationClass - Animation class to add (default: 'animate-fade-in-up')
 * @param {number} options.threshold - Intersection threshold (default: 0.1)
 * @param {string} options.rootMargin - Root margin (default: '0px')
 */
export function initScrollAnimations({
    selector = '.animate-on-scroll',
    animationClass = 'animate-fade-in-up',
    threshold = 0.1,
    rootMargin = '0px'
} = {}) {
    const elements = document.querySelectorAll(selector);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold,
        rootMargin
    });

    elements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Add stagger animation to children
 * @param {HTMLElement} container - Container element
 * @param {string} childSelector - Selector for children (default: all children)
 */
export function addStaggerAnimation(container, childSelector = '*') {
    const children = container.querySelectorAll(childSelector);
    children.forEach((child, index) => {
        child.classList.add('stagger-item');
        child.style.animationDelay = `${index * 0.05}s`;
    });
}

/**
 * Animate element entrance
 * @param {HTMLElement} element - Element to animate
 * @param {string} animation - Animation name (default: 'fadeInUp')
 */
export function animateEntrance(element, animation = 'fadeInUp') {
    element.classList.add(`animate-${animation}`);
}

export default {
    initScrollAnimations,
    addStaggerAnimation,
    animateEntrance
};
