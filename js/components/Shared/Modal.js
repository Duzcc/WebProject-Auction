/**
 * Modal Component
 * Reusable modal system with backdrop and animations
 */

/**
 * Creates and shows a modal
 * @param {Object} options - Modal options
 * @param {string} options.title - Modal title
 * @param {string|HTMLElement} options.content - Modal content
 * @param {Array} options.buttons - Array of button configs
 * @param {boolean} options.closeOnBackdrop - Close on backdrop click (default: true)
 * @param {boolean} options.closeOnEsc - Close on ESC key (default: true)
 * @param {string} options.size - Modal size: 'small', 'medium', 'large', 'full' (default: 'medium')
 * @param {Function} options.onClose - Callback when modal closes
 * @returns {HTMLElement} Modal element
 */
export function showModal({
    title = '',
    content = '',
    buttons = [],
    closeOnBackdrop = true,
    closeOnEsc = true,
    size = 'medium',
    onClose = null
} = {}) {
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Size classes
    const sizeClasses = {
        small: 'max-w-md',
        medium: 'max-w-2xl',
        large: 'max-w-4xl',
        full: 'max-w-7xl'
    };

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm opacity-0 transition-opacity duration-300';
    modal.id = 'active-modal';

    const modalContent = document.createElement('div');
    modalContent.className = `modal-content bg-white rounded-2xl shadow-2xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-hidden transform scale-95 transition-transform duration-300`;

    // Header
    const header = document.createElement('div');
    header.className = 'modal-header flex items-center justify-between p-6 border-b border-gray-200';
    header.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-900">${title}</h2>
        <button class="modal-close-btn text-gray-400 hover:text-gray-600 transition-colors">
            <i data-lucide="x" class="w-6 h-6"></i>
        </button>
    `;

    // Body
    const body = document.createElement('div');
    body.className = 'modal-body p-6 overflow-y-auto max-h-[60vh]';

    if (typeof content === 'string') {
        body.innerHTML = content;
    } else {
        body.appendChild(content);
    }

    // Footer
    const footer = document.createElement('div');
    footer.className = 'modal-footer flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50';

    // Add buttons
    if (buttons.length === 0) {
        buttons = [{
            text: 'Đóng',
            variant: 'secondary',
            onClick: () => closeModal(modal, onClose)
        }];
    }

    buttons.forEach(btn => {
        const button = document.createElement('button');
        const variants = {
            primary: 'bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white hover:shadow-lg',
            secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            danger: 'bg-red-600 text-white hover:bg-blue-700'
        };

        button.className = `px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${variants[btn.variant] || variants.secondary}`;
        button.textContent = btn.text;
        button.addEventListener('click', () => {
            if (btn.onClick) {
                btn.onClick();
            }
            if (btn.closeOnClick !== false) {
                closeModal(modal, onClose);
            }
        });

        footer.appendChild(button);
    });

    // Assemble modal
    modalContent.appendChild(header);
    modalContent.appendChild(body);
    if (buttons.length > 0) {
        modalContent.appendChild(footer);
    }
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Close button handler
    const closeBtn = header.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => closeModal(modal, onClose));

    // Backdrop click handler
    if (closeOnBackdrop) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal, onClose);
            }
        });
    }

    // ESC key handler
    if (closeOnEsc) {
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal(modal, onClose);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    return modal;
}

/**
 * Close modal with animation
 * @param {HTMLElement} modal - Modal element
 * @param {Function} onClose - Callback function
 */
function closeModal(modal, onClose) {
    const modalContent = modal.querySelector('.modal-content');

    modal.style.opacity = '0';
    modalContent.style.transform = 'scale(0.95)';

    setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';

        if (onClose) {
            onClose();
        }
    }, 300);
}

/**
 * Close active modal
 */
export function closeActiveModal() {
    const modal = document.getElementById('active-modal');
    if (modal) {
        closeModal(modal);
    }
}

/**
 * Confirmation modal
 * @param {Object} options - Confirmation options
 * @param {string} options.title - Modal title
 * @param {string} options.message - Confirmation message
 * @param {string} options.confirmText - Confirm button text (default: 'Xác nhận')
 * @param {string} options.cancelText - Cancel button text (default: 'Hủy')
 * @param {Function} options.onConfirm - Callback when confirmed
 * @param {Function} options.onCancel - Callback when cancelled
 */
export function showConfirmModal({
    title = 'Xác nhận',
    message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
    confirmText = 'Xác nhận',
    cancelText = 'Hủy',
    onConfirm = null,
    onCancel = null
} = {}) {
    return showModal({
        title,
        content: `<p class="text-gray-700">${message}</p>`,
        buttons: [
            {
                text: cancelText,
                variant: 'secondary',
                onClick: onCancel
            },
            {
                text: confirmText,
                variant: 'primary',
                onClick: onConfirm
            }
        ]
    });
}

export default { showModal, closeActiveModal, showConfirmModal };
