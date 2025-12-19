/**
 * Loading States & Skeleton Loaders
 * Professional loading components for better UX
 */

import { createElement } from '../utils/dom.js';

/**
 * Skeleton Card Loader
 * @param {Object} options - Configuration options
 * @returns {HTMLElement} Skeleton card
 */
export function SkeletonCard({ count = 1, className = '' } = {}) {
    const container = createElement('div', { className: `space-y-4 ${className}` });

    for (let i = 0; i < count; i++) {
        const card = createElement('div', {
            className: 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse'
        });

        card.innerHTML = `
            <div class="flex gap-4">
                <!-- Icon skeleton -->
                <div class="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-xl flex-shrink-0"></div>
                
                <!-- Content skeleton -->
                <div class="flex-1 space-y-3">
                    <!-- Title -->
                    <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <!-- Subtitle -->
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <!-- Details -->
                    <div class="flex gap-4 mt-4">
                        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(card);
    }

    return container;
}

/**
 * Skeleton Text Lines
 * @param {Object} options - Configuration options
 * @returns {HTMLElement} Skeleton text
 */
export function SkeletonText({ lines = 3, className = '' } = {}) {
    const container = createElement('div', { className: `space-y-2 animate-pulse ${className}` });

    for (let i = 0; i < lines; i++) {
        const width = i === lines - 1 ? 'w-2/3' : 'w-full';
        const line = createElement('div', {
            className: `h-4 bg-gray-200 dark:bg-gray-700 rounded ${width}`
        });
        container.appendChild(line);
    }

    return container;
}

/**
 * Skeleton Image
 * @param {Object} options - Configuration options
 * @returns {HTMLElement} Skeleton image
 */
export function SkeletonImage({ width = 'w-full', height = 'h-64', rounded = 'rounded-lg' } = {}) {
    return createElement('div', {
        className: `${width} ${height} ${rounded} bg-gray-200 dark:bg-gray-700 animate-pulse`
    });
}

/**
 * Loading Spinner
 * @param {Object} options - Configuration options
 * @returns {HTMLElement} Loading spinner
 */
export function LoadingSpinner({ size = 'md', className = '' } = {}) {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    const spinner = createElement('div', {
        className: `${sizes[size]} ${className}`
    });

    spinner.innerHTML = `
        <svg class="animate-spin text-[#AA8C3C]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    `;

    return spinner;
}

/**
 * Loading Overlay
 * @param {Object} options - Configuration options
 * @returns {HTMLElement} Loading overlay
 */
export function LoadingOverlay({ message = 'Đang tải...', transparent = false } = {}) {
    const overlay = createElement('div', {
        className: `fixed inset-0 z-50 flex items-center justify-center ${transparent ? 'bg-black/30' : 'bg-white/90 dark:bg-gray-900/90'} backdrop-blur-sm`
    });

    overlay.innerHTML = `
        <div class="text-center">
            <div class="inline-block mb-4">
                ${LoadingSpinner({ size: 'lg' }).outerHTML}
            </div>
            <p class="text-lg font-semibold text-gray-900 dark:text-white">${message}</p>
        </div>
    `;

    return overlay;
}

/**
 * Progress Bar
 * @param {Object} options - Configuration options
 * @returns {HTMLElement} Progress bar
 */
export function ProgressBar({ progress = 0, className = '', showPercentage = true } = {}) {
    const container = createElement('div', { className: `w-full ${className}` });

    container.innerHTML = `
        <div class="flex items-center gap-3">
            <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#8B7530] to-[#AA8C3C] transition-all duration-300 ease-out rounded-full" 
                     style="width: ${progress}%"></div>
            </div>
            ${showPercentage ? `<span class="text-sm font-semibold text-gray-600 dark:text-gray-400 min-w-[3ch]">${progress}%</span>` : ''}
        </div>
    `;

    return container;
}

/**
 * Skeleton Table
 * @param {Object} options - Configuration options
 * @returns {HTMLElement} Skeleton table
 */
export function SkeletonTable({ rows = 5, columns = 4 } = {}) {
    const table = createElement('div', {
        className: 'bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse'
    });

    let tableHTML = `
        <div class="border-b border-gray-200 dark:border-gray-700 p-4">
            <div class="flex gap-4">
                ${Array(columns).fill(0).map(() => '<div class="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>').join('')}
            </div>
        </div>
    `;

    for (let i = 0; i < rows; i++) {
        tableHTML += `
            <div class="border-b border-gray-200 dark:border-gray-700 p-4">
                <div class="flex gap-4">
                    ${Array(columns).fill(0).map(() => '<div class="flex-1 h-5 bg-gray-200 dark:bg-gray-700 rounded"></div>').join('')}
                </div>
            </div>
        `;
    }

    table.innerHTML = tableHTML;
    return table;
}

/**
 * Show loading overlay on element
 * @param {HTMLElement} element - Target element
 * @param {string} message - Loading message
 */
export function showLoading(element, message = 'Đang tải...') {
    const overlay = LoadingOverlay({ message, transparent: true });
    overlay.style.position = 'absolute';
    element.style.position = 'relative';
    element.appendChild(overlay);
}

/**
 * Hide loading overlay from element
 * @param {HTMLElement} element - Target element
 */
export function hideLoading(element) {
    const overlay = element.querySelector('.fixed.inset-0');
    if (overlay) {
        overlay.remove();
    }
}

export default {
    SkeletonCard,
    SkeletonText,
    SkeletonImage,
    LoadingSpinner,
    LoadingOverlay,
    ProgressBar,
    SkeletonTable,
    showLoading,
    hideLoading
};
