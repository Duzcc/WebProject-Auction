/**
 * Invoice Detail Modal Component
 * Displays detailed invoice information with download option
 */

import { createElement } from '../../../shared/utils/dom.js';
import { downloadPDFInvoice } from '../utils/pdfInvoice.js';
import { generateInvoice } from '../utils/payment.js';

/**
 * Create and show invoice modal
 * @param {string} paymentId - Payment ID to generate invoice for
 */
export function showInvoiceModal(paymentId) {
    const invoice = generateInvoice(paymentId);

    if (!invoice) {
        console.error('Failed to generate invoice');
        return;
    }

    // Create modal overlay
    const overlay = createElement('div', {
        className: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in'
    });

    // Create modal container
    const modal = createElement('div', {
        className: 'bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scale-in'
    });

    // Modal Header
    const header = createElement('div', {
        className: 'bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white'
    });
    header.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-bold mb-1">Chi Tiết Hóa Đơn</h2>
                <p class="text-blue-100 text-sm">Số hóa đơn: ${invoice.invoiceNumber}</p>
            </div>
            <button id="close-invoice-modal" class="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
        </div>
    `;
    modal.appendChild(header);

    // Modal Body
    const body = createElement('div', {
        className: 'p-8 overflow-y-auto max-h-[60vh]'
    });

    body.innerHTML = `
        <!-- Invoice Info -->
        <div class="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
            <div>
                <p class="text-sm text-gray-600 mb-1">Ngày tạo</p>
                <p class="font-semibold text-gray-900">${new Date(invoice.date).toLocaleString('vi-VN')}</p>
            </div>
            <div>
                <p class="text-sm text-gray-600 mb-1">Trạng thái</p>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${invoice.status === 'completed'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }">
                    ${invoice.status === 'completed' ? '✓ Đã thanh toán' : '⏳ Đang xử lý'}
                </span>
            </div>
        </div>
        
        <!-- Customer Info -->
        <div class="mb-6 pb-6 border-b border-gray-200">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Thông tin khách hàng</h3>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-600 mb-1">Họ và tên</p>
                    <p class="font-semibold text-gray-900">${invoice.customerName}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600 mb-1">Mã khách hàng</p>
                    <p class="font-mono text-sm font-semibold text-gray-900">${invoice.customerId}</p>
                </div>
            </div>
        </div>
        
        <!-- Payment Details -->
        <div class="mb-6">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Chi tiết thanh toán</h3>
            <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                ${invoice.items.map(item => `
                    <div class="flex items-center justify-between">
                        <span class="text-gray-700">${item.description}</span>
                        <span class="font-semibold ${item.amount < 0 ? 'text-blue-600' : 'text-gray-900'}">
                            ${item.amount.toLocaleString('vi-VN')} VNĐ
                        </span>
                    </div>
                `).join('')}
                
                <div class="pt-3 border-t-2 border-gray-300 flex items-center justify-between">
                    <span class="text-lg font-bold text-gray-900">Tổng thanh toán</span>
                    <span class="text-2xl font-black text-blue-600">${invoice.total.toLocaleString('vi-VN')} VNĐ</span>
                </div>
            </div>
        </div>
        
        <!-- Payment Method -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <p class="text-gray-600 mb-1">Phương thức thanh toán</p>
                    <p class="font-semibold text-gray-900">${invoice.paymentMethod.toUpperCase() || 'BANK_TRANSFER'}</p>
                </div>
                <div>
                    <p class="text-gray-600 mb-1">Mã giao dịch</p>
                    <p class="font-mono font-semibold text-gray-900">${invoice.transactionRef || 'N/A'}</p>
                </div>
            </div>
        </div>
    `;
    modal.appendChild(body);

    // Modal Footer
    const footer = createElement('div', {
        className: 'px-8 py-6 bg-gray-50 border-t border-gray-200 flex gap-3'
    });
    footer.innerHTML = `
        <button id="download-pdf-btn" class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105 flex items-center justify-center gap-2">
            <i data-lucide="download" class="w-5 h-5"></i>
            <span>Tải Hóa Đơn (PDF)</span>
        </button>
        <button id="close-invoice-btn" class="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Đóng
        </button>
    `;
    modal.appendChild(footer);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Event listeners
    const closeModal = () => {
        overlay.classList.add('animate-fade-out');
        modal.classList.add('animate-scale-out');
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 200);
    };

    const closeBtn1 = header.querySelector('#close-invoice-modal');
    const closeBtn2 = footer.querySelector('#close-invoice-btn');
    const downloadBtn = footer.querySelector('#download-pdf-btn');

    closeBtn1.addEventListener('click', closeModal);
    closeBtn2.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });

    downloadBtn.addEventListener('click', () => {
        const success = downloadPDFInvoice(invoice);
        if (success) {
            // Show success message
            const toast = createElement('div', {
                className: 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-[60] animate-slide-up'
            });
            toast.innerHTML = `
                <div class="flex items-center gap-2">
                    <i data-lucide="check-circle" class="w-5 h-5"></i>
                    <span class="font-semibold">Đã tải xuống hóa đơn PDF</span>
                </div>
            `;
            document.body.appendChild(toast);
            if (window.lucide) window.lucide.createIcons();

            setTimeout(() => {
                toast.classList.add('animate-fade-out');
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 3000);
        }
    });
}

export default showInvoiceModal;
