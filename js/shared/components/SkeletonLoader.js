/**
 * SkeletonLoader Component
 * Reusable skeleton loader for different content types
 */

/**
 * Creates a skeleton loader element
 * @param {Object} options - Configuration options
 * @param {string} options.type - Type of skeleton: 'card', 'table', 'list', 'text', 'avatar'
 * @param {number} options.count - Number of skeleton items to render
 * @param {string} options.className - Additional CSS classes
 * @returns {HTMLElement} Skeleton loader element
 */
export function SkeletonLoader({ type = 'card', count = 1, className = '' } = {}) {
    const container = document.createElement('div');
    container.className = `skeleton-container ${className}`;

    for (let i = 0; i < count; i++) {
        const skeleton = createSkeletonByType(type);
        container.appendChild(skeleton);
    }

    return container;
}

/**
 * Creates skeleton element based on type
 * @param {string} type - Type of skeleton
 * @returns {HTMLElement} Skeleton element
 */
function createSkeletonByType(type) {
    const wrapper = document.createElement('div');
    wrapper.className = 'skeleton-wrapper mb-4';

    switch (type) {
        case 'card':
            wrapper.innerHTML = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="skeleton skeleton-image h-48 w-full"></div>
                    <div class="p-4">
                        <div class="skeleton skeleton-text h-6 w-3/4 mb-3"></div>
                        <div class="skeleton skeleton-text h-4 w-full mb-2"></div>
                        <div class="skeleton skeleton-text h-4 w-5/6"></div>
                    </div>
                </div>
            `;
            break;

        case 'table':
            wrapper.innerHTML = `
                <div class="bg-white rounded-lg p-4">
                    <div class="flex items-center gap-4 mb-3">
                        <div class="skeleton skeleton-avatar w-10 h-10 rounded-full"></div>
                        <div class="flex-1">
                            <div class="skeleton skeleton-text h-4 w-1/4 mb-2"></div>
                            <div class="skeleton skeleton-text h-3 w-1/3"></div>
                        </div>
                        <div class="skeleton skeleton-text h-8 w-20"></div>
                    </div>
                </div>
            `;
            break;

        case 'list':
            wrapper.innerHTML = `
                <div class="flex items-center gap-3 bg-white p-3 rounded-lg mb-2">
                    <div class="skeleton skeleton-avatar w-12 h-12 rounded"></div>
                    <div class="flex-1">
                        <div class="skeleton skeleton-text h-4 w-2/3 mb-2"></div>
                        <div class="skeleton skeleton-text h-3 w-1/2"></div>
                    </div>
                </div>
            `;
            break;

        case 'text':
            wrapper.innerHTML = `
                <div class="skeleton skeleton-text h-4 w-full mb-2"></div>
            `;
            break;

        case 'avatar':
            wrapper.innerHTML = `
                <div class="skeleton skeleton-avatar w-16 h-16 rounded-full"></div>
            `;
            break;

        default:
            wrapper.innerHTML = `
                <div class="skeleton skeleton-text h-4 w-full"></div>
            `;
    }

    return wrapper;
}

/**
 * Shows skeleton loader in a container
 * @param {HTMLElement} container - Container element
 * @param {Object} options - Skeleton options
 */
export function showSkeleton(container, options) {
    const skeleton = SkeletonLoader(options);
    container.innerHTML = '';
    container.appendChild(skeleton);
}

/**
 * Hides skeleton loader and shows content
 * @param {HTMLElement} container - Container element
 * @param {HTMLElement|string} content - Content to show
 */
export function hideSkeleton(container, content) {
    container.innerHTML = '';
    if (typeof content === 'string') {
        container.innerHTML = content;
    } else {
        container.appendChild(content);
    }
}

export default SkeletonLoader;
