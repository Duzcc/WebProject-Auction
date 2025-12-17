/**
 * Confirmation Modal Component
 * Shows a confirmation dialog before destructive actions
 */

import { createElement } from '../utils/dom.js';

/**
 * Show confirmation modal
 * @param {Object} options - Modal options
 * @param {string} options.title - Modal title
 * @param {string} options.message - Modal message
 * @param {string} options.confirmText - Confirm button text (default: "Xác nhận")
 * @param {string} options.cancelText - Cancel button text (default: "Hủy")
 * @param {string} options.type - Modal type: 'danger', 'warning', 'info' (default: 'danger')
 * @returns {Promise<boolean>} True if confirmed, false if cancelled
 */
export function showConfirmModal({
    title = 'Xác nhận',
    message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    type = 'danger'
} = {}) {
    return new Promise((resolve) => {
        // Create overlay
        const overlay = createElement('div', {
            className: 'fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 animate-fadeIn'
        });

        // Color scheme based on type
        const colors = {
            danger: 'bg-red-600 hover:bg-red-700',
            warning: 'bg-yellow-600 hover:bg-yellow-700',
            info: 'bg-blue-600 hover:bg-blue-700'
        };
        const confirmColor = colors[type] || colors.danger;

        // Create modal
        const modal = createElement('div', {
            className: 'bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full transform scale-95 animate-scaleIn'
        });

        modal.innerHTML = `
            <div class="p-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full ${type === 'danger' ? 'bg-red-100 dark:bg-red-900/30' : type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-blue-100 dark:bg-blue-900/30'} flex items-center justify-center">
                        <i data-lucide="${type === 'danger' ? 'alert-triangle' : type === 'warning' ? 'alert-circle' : 'info'}" class="w-6 h-6 ${type === 'danger' ? 'text-red-600 dark:text-red-400' : type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : 'text-blue-600 dark:text-blue-400'}"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">${title}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-300">${message}</p>
                    </div>
                </div>
                
                <div class="flex gap-3 mt-6">
                    <button id="confirm-modal-cancel" class="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        ${cancelText}
                    </button>
                    <button id="confirm-modal-ok" class="flex-1 px-4 py-2.5 ${confirmColor} rounded-lg font-semibold text-white transition-colors">
                        ${confirmText}
                    </button>
                </div>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Initialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Handle confirm
        modal.querySelector('#confirm-modal-ok').addEventListener('click', () => {
            cleanup();
            resolve(true);
        });

        // Handle cancel
        modal.querySelector('#confirm-modal-cancel').addEventListener('click', () => {
            cleanup();
            resolve(false);
        });

        // Handle overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                cleanup();
                resolve(false);
            }
        });

        // Handle ESC key
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                cleanup();
                resolve(false);
            }
        };
        document.addEventListener('keydown', handleEsc);

        // Cleanup function
        function cleanup() {
            document.removeEventListener('keydown', handleEsc);
            overlay.classList.add('animate-fadeOut');
            modal.classList.add('animate-scaleOut');
            setTimeout(() => {
                overlay.remove();
            }, 200);
        }
    });
}

export default showConfirmModal;
