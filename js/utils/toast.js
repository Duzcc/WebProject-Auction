/**
 * Toast Notification System
 * Professional toast notifications for user feedback
 */

// Toast container
let toastContainer = null;
let toastQueue = [];
let activeToasts = [];
const MAX_TOASTS = 3; // Maximum simultaneous toasts

// Toast types with colors
const TOAST_TYPES = {
    success: {
        icon: 'check-circle',
        bgColor: 'bg-green-500',
        textColor: 'text-white'
    },
    error: {
        icon: 'x-circle',
        bgColor: 'bg-red-500',
        textColor: 'text-white'
    },
    warning: {
        icon: 'alert-triangle',
        bgColor: 'bg-yellow-500',
        textColor: 'text-white'
    },
    info: {
        icon: 'info',
        bgColor: 'bg-blue-500',
        textColor: 'text-white'
    }
};

/**
 * Initialize toast container
 */
function initToastContainer() {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'fixed top-4 right-4 z-[10000] flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(toastContainer);
    }
}

/**
 * Show toast notification with queue support  
 * @param {Object} options - Toast options
 * @param {string} options.message - Toast message
 * @param {string} options.type - Toast type: 'success', 'error', 'warning', 'info'
 * @param {number} options.duration - Duration in ms (default: 3000)
 * @param {boolean} options.dismissible - Show close button (default: true)
 */
export function showToast({
    message,
    type = 'info',
    duration = 3000,
    dismissible = true
} = {}) {
    // If queue is full, add to queue
    if (activeToasts.length >= MAX_TOASTS) {
        toastQueue.push({ message, type, duration, dismissible });
        return null;
    }

    _displayToast({ message, type, duration, dismissible });
}

/**
 * Display toast (internal function)
 */
function _displayToast({ message, type, duration, dismissible }) {
    initToastContainer();

    const toastConfig = TOAST_TYPES[type] || TOAST_TYPES.info;
    const toast = document.createElement('div');
    toast.className = `${toastConfig.bgColor} ${toastConfig.textColor} px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md pointer-events-auto transform translate-x-[400px] transition-all duration-300 ease-out`;

    toast.innerHTML = `
        <i data-lucide="${toastConfig.icon}" class="w-5 h-5 flex-shrink-0"></i>
        <p class="flex-1 text-sm font-medium">${message}</p>
        ${dismissible ? '<button class="toast-close ml-2 hover:opacity-70 transition-opacity"><i data-lucide="x" class="w-4 h-4"></i></button>' : ''}
    `;

    toastContainer.appendChild(toast);
    activeToasts.push(toast);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Slide in animation
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);

    // Close button handler
    if (dismissible) {
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => removeToast(toast));
    }

    // Auto dismiss
    if (duration > 0) {
        setTimeout(() => {
            removeToast(toast);
        }, duration);
    }

    return toast;
}

/**
 * Remove toast with animation and process queue
 * @param {HTMLElement} toast - Toast element
 */
function removeToast(toast) {
    toast.style.transform = 'translateX(400px)';
    toast.style.opacity = '0';

    setTimeout(() => {
        toast.remove();

        // Remove from active toasts
        const index = activeToasts.indexOf(toast);
        if (index > -1) {
            activeToasts.splice(index, 1);
        }

        // Process queue if there are pending toasts
        if (toastQueue.length > 0) {
            const nextToast = toastQueue.shift();
            _displayToast(nextToast);
        }

        // Remove container if empty
        if (toastContainer && toastContainer.children.length === 0) {
            toastContainer.remove();
            toastContainer = null;
        }
    }, 300);
}

/**
 * Convenience methods for different toast types
 */
export const toast = {
    success: (message, options = {}) => showToast({ message, type: 'success', ...options }),
    error: (message, options = {}) => showToast({ message, type: 'error', ...options }),
    warning: (message, options = {}) => showToast({ message, type: 'warning', ...options }),
    info: (message, options = {}) => showToast({ message, type: 'info', ...options })
};

/**
 * Clear all toasts
 */
export function clearAllToasts() {
    if (toastContainer) {
        const toasts = toastContainer.querySelectorAll('div');
        toasts.forEach(toast => removeToast(toast));
    }
}

export default toast;
