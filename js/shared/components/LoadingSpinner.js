/**
 * LoadingSpinner Component
 * Reusable loading spinner with VPA brand colors
 */

/**
 * Creates a loading spinner element
 * @param {Object} options - Configuration options
 * @param {string} options.size - Size: 'small', 'medium', 'large'
 * @param {boolean} options.overlay - Show as full-page overlay
 * @param {string} options.text - Optional loading text
 * @returns {HTMLElement} Loading spinner element
 */
export function LoadingSpinner({ size = 'medium', overlay = false, text = '' } = {}) {
    const sizeClasses = {
        small: 'w-6 h-6 border-2',
        medium: 'w-10 h-10 border-3',
        large: 'w-16 h-16 border-4'
    };

    const container = document.createElement('div');

    if (overlay) {
        container.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] backdrop-blur-sm';
        container.innerHTML = `
            <div class="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-2xl">
                <div class="spinner ${sizeClasses[size]} border-gray-200 border-t-[#2563EB] rounded-full animate-spin"></div>
                ${text ? `<p class="text-gray-700 font-medium">${text}</p>` : ''}
            </div>
        `;
    } else {
        container.className = 'flex items-center justify-center gap-3';
        container.innerHTML = `
            <div class="spinner ${sizeClasses[size]} border-gray-200 border-t-[#2563EB] rounded-full animate-spin"></div>
            ${text ? `<span class="text-gray-700">${text}</span>` : ''}
        `;
    }

    return container;
}

/**
 * Shows loading spinner in a container
 * @param {HTMLElement} container - Container element
 * @param {Object} options - Spinner options
 */
export function showLoading(container, options = {}) {
    const spinner = LoadingSpinner(options);
    container.innerHTML = '';
    container.appendChild(spinner);
}

/**
 * Hides loading spinner
 * @param {HTMLElement} container - Container element
 */
export function hideLoading(container) {
    const spinner = container.querySelector('.spinner');
    if (spinner) {
        spinner.parentElement.remove();
    }
}

/**
 * Shows full-page loading overlay
 * @param {string} text - Optional loading text
 * @returns {HTMLElement} Overlay element
 */
export function showLoadingOverlay(text = 'Đang tải...') {
    const overlay = LoadingSpinner({ size: 'large', overlay: true, text });
    overlay.id = 'loading-overlay';
    document.body.appendChild(overlay);
    return overlay;
}

/**
 * Hides full-page loading overlay
 */
export function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}

/**
 * Shows button loading state
 * @param {HTMLButtonElement} button - Button element
 * @param {string} loadingText - Text to show while loading
 */
export function setButtonLoading(button, loadingText = 'Đang xử lý...') {
    button.disabled = true;
    button.dataset.originalText = button.innerHTML;
    button.innerHTML = `
        <div class="flex items-center justify-center gap-2">
            <div class="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>${loadingText}</span>
        </div>
    `;
}

/**
 * Resets button from loading state
 * @param {HTMLButtonElement} button - Button element
 */
export function resetButtonLoading(button) {
    button.disabled = false;
    if (button.dataset.originalText) {
        button.innerHTML = button.dataset.originalText;
        delete button.dataset.originalText;
    }
}

export default LoadingSpinner;
