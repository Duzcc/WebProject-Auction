/**
 * Modal Component
 * Hệ thống modal có thể tái sử dụng với backdrop và animations
 * 
 * Tính năng:
 * - Tạo modal động với title, content, và buttons tùy chỉnh
 * - Hỗ trợ nhiều kích thước: small, medium, large, full
 * - Đóng modal bằng: click backdrop, ESC key, hoặc nút close
 * - Animations mượt mà khi mở/đóng
 * - Ngăn scroll body khi modal mở
 */

/**
 * Tạo và hiển thị modal
 * @param {Object} options - Các tùy chọn cấu hình modal
 * @param {string} options.title - Tiêu đề modal
 * @param {string|HTMLElement} options.content - Nội dung modal (HTML string hoặc element)
 * @param {Array} options.buttons - Mảng các cấu hình button [{text, variant, onClick, closeOnClick}]
 * @param {boolean} options.closeOnBackdrop - Đóng modal khi click vào backdrop (mặc định: true)
 * @param {boolean} options.closeOnEsc - Đóng modal khi nhấn ESC (mặc định: true)
 * @param {string} options.size - Kích thước modal: 'small', 'medium', 'large', 'full' (mặc định: 'medium')
 * @param {Function} options.onClose - Callback được gọi khi modal đóng
 * @returns {HTMLElement} Modal element đã được thêm vào DOM
 * 
 * Cách sử dụng:
 * showModal({
 *   title: 'Xác nhận',
 *   content: '<p>Bạn có chắc chắn?</p>',
 *   buttons: [
 *     { text: 'Hủy', variant: 'secondary' },
 *     { text: 'Xác nhận', variant: 'primary', onClick: () => console.log('Confirmed') }
 *   ]
 * });
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
    // Ngăn scroll body khi modal mở để focus vào modal
    document.body.style.overflow = 'hidden';

    // Định nghĩa các class kích thước modal
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

    // Thêm buttons vào footer
    // Nếu không có button nào được cung cấp, tạo button "Đóng" mặc định
    if (buttons.length === 0) {
        buttons = [{
            text: 'Đóng',
            variant: 'secondary',
            onClick: () => closeModal(modal, onClose)
        }];
    }

    // Tạo từng button với styling và event handler tương ứng
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

    // Animation fade-in và scale-up khi hiển thị modal
    // Sử dụng setTimeout để trigger CSS transition
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    return modal;
}

/**
 * Đóng modal với animation
 * @param {HTMLElement} modal - Modal element cần đóng
 * @param {Function} onClose - Callback function được gọi sau khi modal đóng
 * 
 * Quy trình:
 * 1. Trigger animation fade-out và scale-down
 * 2. Đợi animation hoàn tất (300ms)
 * 3. Remove modal khỏi DOM
 * 4. Khôi phục scroll của body
 * 5. Gọi callback onClose nếu có
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
 * Đóng modal đang active (có id="active-modal")
 * Helper function để đóng modal từ bên ngoài component
 */
export function closeActiveModal() {
    const modal = document.getElementById('active-modal');
    if (modal) {
        closeModal(modal);
    }
}

/**
 * Hiển thị modal xác nhận (confirmation modal)
 * Helper function để tạo modal xác nhận với 2 button: Hủy và Xác nhận
 * 
 * @param {Object} options - Các tùy chọn
 * @param {string} options.title - Tiêu đề modal (mặc định: 'Xác nhận')
 * @param {string} options.message - Nội dung thông báo xác nhận
 * @param {string} options.confirmText - Text của nút xác nhận (mặc định: 'Xác nhận')
 * @param {string} options.cancelText - Text của nút hủy (mặc định: 'Hủy')
 * @param {Function} options.onConfirm - Callback khi người dùng xác nhận
 * @param {Function} options.onCancel - Callback khi người dùng hủy
 * @returns {HTMLElement} Modal element
 * 
 * Ví dụ:
 * showConfirmModal({
 *   title: 'Xóa dữ liệu',
 *   message: 'Bạn có chắc muốn xóa không?',
 *   onConfirm: () => deleteData(),
 *   onCancel: () => console.log('Cancelled')
 * });
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
