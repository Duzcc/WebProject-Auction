/**
 * Payment Failure Page
 * Display error message when payment fails
 */

import { createElement, createFromHTML } from '../../utils/dom.js';
import { ROUTES } from '../../utils/navigation.js';

export function PaymentFailurePage() {
    const container = createElement('div', { className: 'bg-gradient-to-br from-red-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center px-4 py-12' });

    // Get order data from session storage (if available)
    const orderData = JSON.parse(sessionStorage.getItem('currentOrder') || '{}');

    const card = createFromHTML(`
        <div class="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <!-- Error Icon -->
            <div class="mb-8">
                <div class="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <i data-lucide="x-circle" class="w-16 h-16 text-white stroke-[3]"></i>
                </div>
            </div>

            <!-- Error Message -->
            <h1 class="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Thanh toán thất bại
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Rất tiếc, đã có lỗi xảy ra trong quá trình thanh toán
            </p>

            <!-- Error Details -->
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8 text-left">
                <h3 class="font-bold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
                    <i data-lucide="alert-triangle" class="w-5 h-5"></i>
                    Nguyên nhân có thể
                </h3>
                <ul class="text-sm text-red-800 dark:text-red-200 space-y-2">
                    <li class="flex gap-2">
                        <span>•</span>
                        <span>Thông tin thanh toán không chính xác</span>
                    </li>
                    <li class="flex gap-2">
                        <span>•</span>
                        <span>Tài khoản không đủ số dư</span>
                    </li>
                    <li class="flex gap-2">
                        <span>•</span>
                        <span>Kết nối mạng bị gián đoạn</span>
                    </li>
                    <li class="flex gap-2">
                        <span>•</span>
                        <span>Hệ thống ngân hàng đang bảo trì</span>
                    </li>
                </ul>
            </div>

            <!-- Support Info -->
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-left">
                <h3 class="font-bold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <i data-lucide="phone" class="w-5 h-5"></i>
                    Cần hỗ trợ?
                </h3>
                <p class="text-sm text-blue-800 dark:text-blue-200">
                    Liên hệ hotline: <span class="font-bold">1900.0555.15</span> hoặc email: <span class="font-bold">support@vpa.vn</span>
                </p>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
                <button 
                    id="retry-payment-btn"
                    class="flex-1 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transform transition hover:scale-105 flex items-center justify-center gap-2"
                >
                    <i data-lucide="rotate-cw" class="w-5 h-5"></i>
                    <span>Thử lại thanh toán</span>
                </button>
                <button 
                    id="back-to-cart-btn"
                    class="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-4 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2"
                >
                    <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                    <span>Quay lại giỏ hàng</span>
                </button>
            </div>

            <!-- Contact Support -->
            <div class="mt-6 text-center">
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Cần hỗ trợ?</p>
                <button class="text-[#2563EB] hover:underline font-semibold flex items-center justify-center gap-2 mx-auto">
                    <i data-lucide="message-circle" class="w-4 h-4"></i>
                    <span>Liên hệ bộ phận hỗ trợ</span>
                </button>
            </div>
        </div>
    `);

    // Event listeners
    const retryBtn = card.querySelector('#retry-payment-btn');
    const backBtn = card.querySelector('#back-to-cart-btn');

    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            // If order data exists, go back to checkout, else go to cart
            if (orderData && Object.keys(orderData).length > 0) {
                window.location.hash = '#/checkout';
            } else {
                window.location.hash = '#/cart';
            }
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.hash = '#/cart';
        });
    }

    container.appendChild(card);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

export default PaymentFailurePage;
