/**
 * Lazy Image Component
 * Lazy loading images with Intersection Observer and blur-up effect
 */

/**
 * Creates a lazy-loaded image element
 * @param {Object} options - Configuration options
 * @param {string} options.src - Image source URL
 * @param {string} options.alt - Alt text
 * @param {string} options.className - CSS classes
 * @param {string} options.placeholder - Placeholder image (optional)
 * @param {Function} options.onLoad - Callback when image loads
 * @returns {HTMLElement} Image wrapper element
 */
export function LazyImage({
    src,
    alt = '',
    className = '',
    placeholder = null,
    onLoad = null
} = {}) {
    const wrapper = document.createElement('div');
    wrapper.className = `lazy-image-wrapper relative overflow-hidden ${className}`;

    const img = document.createElement('img');
    img.alt = alt;
    img.className = 'lazy-image w-full h-full object-cover transition-opacity duration-500 opacity-0';
    img.dataset.src = src;

    // Placeholder or blur effect
    if (placeholder) {
        img.src = placeholder;
        img.classList.add('blur-sm');
    } else {
        // Use a tiny placeholder
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
    }

    wrapper.appendChild(img);

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(img, onLoad);
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before entering viewport
    });

    observer.observe(wrapper);

    return wrapper;
}

/**
 * Load image
 */
function loadImage(img, onLoad) {
    const src = img.dataset.src;

    if (!src) return;

    const tempImg = new Image();

    tempImg.onload = () => {
        img.src = src;
        img.classList.remove('blur-sm');
        img.classList.add('opacity-100');

        if (onLoad) {
            onLoad();
        }
    };

    tempImg.onerror = () => {
        // Fallback image
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif"%3EImage not found%3C/text%3E%3C/svg%3E';
        img.classList.add('opacity-100');
    };

    tempImg.src = src;
}

export default LazyImage;
