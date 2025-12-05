/**
 * Lightbox Component
 * Image lightbox/gallery with zoom, navigation, and keyboard support
 */

let activeLightbox = null;

/**
 * Show lightbox with image
 * @param {Object} options - Configuration options
 * @param {string|Array} options.images - Image URL or array of URLs
 * @param {number} options.startIndex - Starting index (default: 0)
 * @param {Array} options.captions - Optional captions for images
 */
export function showLightbox({ images, startIndex = 0, captions = [] } = {}) {
    // Convert single image to array
    const imageArray = Array.isArray(images) ? images : [images];
    let currentIndex = startIndex;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox fixed inset-0 z-[10000] bg-black bg-opacity-95 flex items-center justify-center opacity-0 transition-opacity duration-300';
    lightbox.id = 'active-lightbox';

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10';
    closeBtn.innerHTML = '<i data-lucide="x" class="w-8 h-8"></i>';
    closeBtn.addEventListener('click', () => closeLightbox());
    lightbox.appendChild(closeBtn);

    // Image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4';

    const img = document.createElement('img');
    img.className = 'max-w-full max-h-full object-contain transform scale-95 transition-transform duration-300';
    img.src = imageArray[currentIndex];
    imageContainer.appendChild(img);

    // Caption
    if (captions[currentIndex]) {
        const caption = document.createElement('div');
        caption.className = 'lightbox-caption absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg text-sm';
        caption.textContent = captions[currentIndex];
        imageContainer.appendChild(caption);
    }

    lightbox.appendChild(imageContainer);

    // Navigation buttons (if multiple images)
    if (imageArray.length > 1) {
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-3';
        prevBtn.innerHTML = '<i data-lucide="chevron-left" class="w-6 h-6"></i>';
        prevBtn.addEventListener('click', () => navigate(-1));
        lightbox.appendChild(prevBtn);

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-3';
        nextBtn.innerHTML = '<i data-lucide="chevron-right" class="w-6 h-6"></i>';
        nextBtn.addEventListener('click', () => navigate(1));
        lightbox.appendChild(nextBtn);

        // Counter
        const counter = document.createElement('div');
        counter.className = 'lightbox-counter absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm';
        counter.textContent = `${currentIndex + 1} / ${imageArray.length}`;
        lightbox.appendChild(counter);
    }

    document.body.appendChild(lightbox);
    activeLightbox = lightbox;

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 10);

    // Navigation function
    function navigate(direction) {
        currentIndex = (currentIndex + direction + imageArray.length) % imageArray.length;

        // Fade out
        img.style.opacity = '0';

        setTimeout(() => {
            img.src = imageArray[currentIndex];

            // Update caption
            const captionEl = lightbox.querySelector('.lightbox-caption');
            if (captions[currentIndex]) {
                if (captionEl) {
                    captionEl.textContent = captions[currentIndex];
                } else {
                    const newCaption = document.createElement('div');
                    newCaption.className = 'lightbox-caption absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg text-sm';
                    newCaption.textContent = captions[currentIndex];
                    imageContainer.appendChild(newCaption);
                }
            } else if (captionEl) {
                captionEl.remove();
            }

            // Update counter
            const counterEl = lightbox.querySelector('.lightbox-counter');
            if (counterEl) {
                counterEl.textContent = `${currentIndex + 1} / ${imageArray.length}`;
            }

            // Fade in
            img.style.opacity = '1';
        }, 200);
    }

    // Keyboard navigation
    const keyHandler = (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft' && imageArray.length > 1) {
            navigate(-1);
        } else if (e.key === 'ArrowRight' && imageArray.length > 1) {
            navigate(1);
        }
    };
    document.addEventListener('keydown', keyHandler);

    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Store key handler for cleanup
    lightbox.dataset.keyHandler = keyHandler;
}

/**
 * Close lightbox
 */
export function closeLightbox() {
    if (!activeLightbox) return;

    const img = activeLightbox.querySelector('img');
    activeLightbox.style.opacity = '0';
    if (img) {
        img.style.transform = 'scale(0.95)';
    }

    setTimeout(() => {
        // Remove key handler
        if (activeLightbox.dataset.keyHandler) {
            document.removeEventListener('keydown', activeLightbox.dataset.keyHandler);
        }

        activeLightbox.remove();
        activeLightbox = null;
        document.body.style.overflow = '';
    }, 300);
}

export default { showLightbox, closeLightbox };
