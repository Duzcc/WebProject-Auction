/**
 * Payment Success Page
 * Display success message after payment completion with confetti celebration
 */

import { createElement, createFromHTML } from '../utils/dom.js';
import { ROUTES } from '../utils/navigation.js';
import { clearCart } from '../utils/cart.js';
import { successConfetti } from '../utils/confetti.js';

export function PaymentSuccessPage() {
    // Clear cart and order data immediately
    clearCart();
    sessionStorage.removeItem('currentOrder');

    // Trigger confetti celebration
    setTimeout(() => {
        successConfetti();
    }, 400);

    const container = createElement('div', { className: 'bg-gradient-to-br from-blue-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center px-4 py-12' });

    const card = createFromHTML(`
        <div class="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-center animate-scale-in">
            <!-- Success Icon Animation -->
            <div class="mb-8">
                <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce-slow">
                    <i data-lucide="check" class="w-16 h-16 text-white stroke-[3]"></i>
                </div>
            </div>

            <!-- Success Message -->
            <h1 class="text-4xl font-black text-gray-900 dark:text-white mb-4">
                Thanh toán thành công!
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Đơn hàng của bạn đã được xác nhận và đang được xử lý
            </p>

            <!-- Order Info -->
            <div class="bg-gradient-to-r from-blue-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-8">
                <div class="grid grid-cols-2 gap-4 text-left">
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Mã đơn hàng</p>
                        <p class="font-mono font-bold text-gray-900 dark:text-white">#${Date.now().toString().slice(-8)}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Thời gian</p>
                        <p class="font-semibold text-gray-900 dark:text-white">${new Date().toLocaleString('vi-VN')}</p>
                    </div>
                </div>
            </div>

            <!-- Next Steps -->
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-left">
                <h3 class="font-bold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                    <i data-lucide="info" class="w-5 h-5"></i>
                    Bước tiếp theo
                </h3>
                <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                    <li class="flex gap-2">
                        <span>•</span>
                        <span>Chúng tôi sẽ xác nhận đơn hàng qua email</span>
                    </li>
                    <li class="flex gap-2">
                        <span>•</span>
                        <span>Vui lòng kiểm tra email để biết thông tin chi tiết</span>
                    </li>
                    <li class="flex gap-2">
                        <span>•</span>
                        <span>Theo dõi trạng thái đơn hàng tại trang lịch sử</span>
                    </li>
                </ul>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
                <button 
                    id="view-history-btn"
                    class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transform transition hover:scale-105 flex items-center justify-center gap-2 btn-ripple"
                >
                    <i data-lucide="history" class="w-5 h-5"></i>
                    <span>Xem lịch sử đơn hàng</span>
                </button>
                <button 
                    id="continue-shopping-btn"
                    class="flex-1 border-2 border-blue-600 text-blue-600 dark:text-blue-400 py-4 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition flex items-center justify-center gap-2 btn-ripple"
                >
                    <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                    <span>Tiếp tục mua sắm</span>
                </button>
            </div>
        </div>
    `);

    // Event listeners
    card.querySelector('#view-history-btn').addEventListener('click', () => {
        window.location.hash = '#/auction-history';
    });

    card.querySelector('#continue-shopping-btn').addEventListener('click', () => {
        window.location.hash = '#/';
    });

    container.appendChild(card);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

export default PaymentSuccessPage;
