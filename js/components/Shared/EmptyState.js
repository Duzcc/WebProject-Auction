/**
 * Empty State Component
 * Display empty states with icon, title, message, and CTA
 */

/**
 * Creates an empty state component
 * @param {Object} options - Configuration options
 * @param {string} options.icon - Lucide icon name
 * @param {string} options.title - Title text
 * @param {string} options.message - Message text
 * @param {Object} options.action - Optional action button config
 * @param {string} options.action.text - Button text
 * @param {Function} options.action.onClick - Button click handler
 * @returns {HTMLElement} Empty state element
 */
export function EmptyState({
    icon = 'inbox',
    title = 'Không có dữ liệu',
    message = 'Hiện tại chưa có dữ liệu để hiển thị',
    action = null
} = {}) {
    const container = document.createElement('div');
    container.className = 'empty-state flex flex-col items-center justify-center py-16 px-4 text-center';

    container.innerHTML = `
        <div class="mb-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-full">
            <i data-lucide="${icon}" class="w-16 h-16 text-gray-400"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${title}</h3>
        <p class="text-gray-600 dark:text-gray-400 max-w-md mb-6">${message}</p>
    `;

    if (action) {
        const button = document.createElement('button');
        button.className = 'bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200';
        button.textContent = action.text;
        button.addEventListener('click', action.onClick);
        container.appendChild(button);
    }

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

export default EmptyState;
