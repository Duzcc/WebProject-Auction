/**
 * Premium Checkout Page  
 * Multi-step checkout with progress indicator and glassmorphism design
 */

import { createElement, createFromHTML } from '../utils/dom.js';
import { PageBanner } from '../components/Shared/PageBanner.js';
import { getCartItems, getCartTotal } from '../utils/cart.js';
import { getAuthState } from '../utils/auth.js';
import { ROUTES } from '../utils/navigation.js';
import toast from '../utils/toast.js';

export function CheckoutPage() {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        window.location.hash = ROUTES.LOGIN;
        return createElement('div');
    }

    const container = createElement('div', {
        className: 'min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-900'
    });

    // Premium Banner
    container.appendChild(PageBanner({
        title: 'Thanh toán',
        subtitle: 'Hoàn tất đơn hàng'
    }));

    const mainContent = createElement('div', { className: 'container mx-auto px-4 py-8 md:py-12' });

    const items = getCartItems();
    const total = getCartTotal();

    // Empty cart state
    if (items.length === 0) {
        const emptyState = createElement('div', { className: 'text-center py-20' });
        emptyState.innerHTML = `
            <div class="max-w-md mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-12 border border-white/20 dark:border-gray-700/50">
                <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="shopping-cart" class="w-12 h-12 text-gray-400"></i>
                </div>
                <h2 class="text-2xl font-black text-gray-900 dark:text-white mb-3">Giỏ hàng trống</h2>
                <p class="text-gray-600 dark:text-gray-400 mb-8">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
                <button onclick="window.location.hash='${ROUTES.CARS}'" class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300">
                    Khám phá đấu giá
                </button>
            </div>
        `;
        mainContent.appendChild(emptyState);
        container.appendChild(mainContent);

        if (window.lucide) window.lucide.createIcons();
        return container;
    }

    // Progress Indicator
    const progressBar = createElement('div', { className: 'mb-12' });
    progressBar.innerHTML = `
        <div class="max-w-3xl mx-auto">
            <div class="flex items-center justify-between relative">
                <!-- Progress Line -->
                <div class="absolute left-0 top-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 -z-10"></div>
                <div class="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-blue-500 to-blue-500 -translate-y-1/2 -z-10 transition-all duration-500" style="width: 50%"></div>
                
                <!-- Steps -->
                <div class="flex flex-col items-center">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg mb-2 relative">
                        <i data-lucide="check" class="w-6 h-6 text-white stroke-[3]"></i>
                        <div class="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
                    </div>
                    <span class="text-sm font-bold text-blue-600 dark:text-blue-400">Giỏ hàng</span>
                </div>
                
                <div class="flex flex-col items-center">
                    <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg mb-2 ring-4 ring-blue-100 dark:ring-blue-900/50">
                        <span class="text-white font-bold text-lg">2</span>
                    </div>
                    <span class="text-sm font-bold text-blue-600 dark:text-blue-400">Xác nhận</span>
                </div>
                
                <div class="flex flex-col items-center">
                    <div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-2">
                        <span class="text-gray-500 dark:text-gray-400 font-bold text-lg">3</span>
                    </div>
                    <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Thanh toán</span>
                </div>
            </div>
        </div>
    `;
    mainContent.appendChild(progressBar);

    // Main Grid
    const checkoutGrid = createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8' });

    // Left Column - Order Details
    const leftColumn = createElement('div', { className: 'lg:col-span-2 space-y-6' });

    // User Info Card with Glassmorphism
    const userCard = createElement('div', {
        className: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6 md:p-8'
    });
    userCard.innerHTML = `
        <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <i data-lucide="user" class="w-6 h-6 text-white"></i>
            </div>
            <h2 class="text-2xl font-black text-gray-900 dark:text-white">Thông tin người mua</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-600 dark:text-gray-400">Họ và tên</label>
                <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                    <p class="font-bold text-gray-900 dark:text-white">${authState.user.fullName || authState.user.email}</p>
                </div>
            </div>
            <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-600 dark:text-gray-400">Email</label>
                <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                    <p class="font-bold text-gray-900 dark:text-white">${authState.user.email}</p>
                </div>
            </div>
        </div>
    `;
    leftColumn.appendChild(userCard);

    // Separate items by type
    const registrations = items.filter(item => item.type === 'registration');
    const regularItems = items.filter(item => item.type !== 'registration');

    // Registrations Section
    if (registrations.length > 0) {
        const regSection = createElement('div', {
            className: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6 md:p-8'
        });

        const header = createElement('div', { className: 'flex items-center gap-3 mb-6' });
        header.innerHTML = `
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <i data-lucide="gavel" class="w-6 h-6 text-white"></i>
            </div>
            <h2 class="text-2xl font-black text-gray-900 dark:text-white">Đăng ký đấu giá</h2>
            <span class="ml-auto px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-bold text-sm">
                ${registrations.length} mục
            </span>
        `;
        regSection.appendChild(header);

        const regList = createElement('div', { className: 'space-y-4' });
        registrations.forEach((item, index) => {
            const regItem = createElement('div', {
                className: 'flex items-start gap-4 p-4 md:p-5 bg-gradient-to-br from-blue-50/50 to-blue-50/50 dark:from-blue-900/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/50'
            });

            regItem.innerHTML = `
                <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-blue-100 dark:from-blue-900/50 dark:to-blue-900/50 flex items-center justify-center flex-shrink-0 shadow-inner">
                    <i data-lucide="award" class="w-8 h-8 text-blue-600 dark:text-blue-400"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">${item.name}</h3>
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <div class="flex items-center gap-2">
                            <i data-lucide="calendar" class="w-4 h-4"></i>
                            <span>${item.auctionDate ? new Date(item.auctionDate).toLocaleDateString('vi-VN') : 'Chưa xác định'}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <i data-lucide="clock" class="w-4 h-4"></i>
                            <span>${item.auctionDate ? new Date(item.auctionDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-semibold text-gray-600 dark:text-gray-400">Tiền đặt cọc:</span>
                        <span class="text-xl font-black bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                            ${item.depositAmount.toLocaleString('vi-VN')} đ
                        </span>
                    </div>
                </div>
            `;
            regList.appendChild(regItem);
        });
        regSection.appendChild(regList);
        leftColumn.appendChild(regSection);
    }

    // Regular Items Section
    if (regularItems.length > 0) {
        const regularSection = createElement('div', {
            className: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6 md:p-8'
        });

        const header = createElement('div', { className: 'flex items-center gap-3 mb-6' });
        header.innerHTML = `
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <i data-lucide="shopping-bag" class="w-6 h-6 text-white"></i>
            </div>
            <h2 class="text-2xl font-black text-gray-900 dark:text-white">Sản phẩm</h2>
            <span class="ml-auto px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-bold text-sm">
                ${regularItems.length} mục
            </span>
        `;
        regularSection.appendChild(header);

        const itemList = createElement('div', { className: 'space-y-4' });
        regularItems.forEach(item => {
            const itemCard = createElement('div', {
                className: 'flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl'
            });

            itemCard.innerHTML = `
                <img src="${item.image || 'https://picsum.photos/96/96?random=' + item.id}" alt="${item.name}" 
                    class="w-20 h-20 object-cover rounded-lg shadow-md flex-shrink-0">
                <div class="flex-1">
                    <h3 class="font-bold text-gray-900 dark:text-white mb-1">${item.name}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Số lượng: ${item.quantity}</p>
                    <p class="text-lg font-black bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        ${(item.price * item.quantity).toLocaleString('vi-VN')} đ
                    </p>
                </div>
            `;
            itemList.appendChild(itemCard);
        });
        regularSection.appendChild(itemList);
        leftColumn.appendChild(regularSection);
    }

    // Right Column - Payment Summary
    const rightColumn = createElement('div', { className: 'lg:col-span-1' });

    const depositTotal = registrations.reduce((sum, item) => sum + item.depositAmount, 0);
    const regularTotal = total - depositTotal;

    const summaryCard = createElement('div', {
        className: 'sticky top-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 md:p-8'
    });

    summaryCard.innerHTML = `
        <div class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                <i data-lucide="receipt" class="w-6 h-6 text-white"></i>
            </div>
            <h2 class="text-2xl font-black text-gray-900 dark:text-white">Tổng đơn</h2>
        </div>
        
        <div class="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            ${registrations.length > 0 ? `
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <i data-lucide="gavel" class="w-4 h-4"></i>
                    Tiền đặt cọc
                </span>
                <span class="font-bold text-gray-900 dark:text-white">${depositTotal.toLocaleString('vi-VN')} đ</span>
            </div>
            ` : ''}
            ${regularItems.length > 0 ? `
            <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                    Tạm tính
                </span>
                <span class="font-bold text-gray-900 dark:text-white">${regularTotal.toLocaleString('vi-VN')} đ</span>
            </div>
            ` : ''}
        </div>
        
        <div class="flex items-baseline justify-between mb-8 pb-6 border-b-2 border-blue-200 dark:border-blue-800">
            <span class="text-lg font-bold text-gray-700 dark:text-gray-300">Tổng cộng</span>
            <div class="text-right">
                <div class="text-3xl font-black bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                    ${total.toLocaleString('vi-VN')}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">VNĐ</div>
            </div>
        </div>
        
        <!-- Payment Method -->
        <div class="mb-6">
            <label class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 block">Phương thức thanh toán</label>
            <div class="p-4 border-2 border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center gap-3">
                <input type="radio" name="payment" checked class="w-5 h-5 text-blue-600 accent-blue-600">
                <div class="flex-1">
                    <p class="font-bold text-gray-900 dark:text-white">VietQR</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">Chuyển khoản qua QR code</p>
                </div>
                <i data-lucide="qr-code" class="w-6 h-6 text-blue-600 dark:text-blue-400"></i>
            </div>
        </div>
        
        <button id="proceed-payment" class="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 p-[2px] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 mb-4">
            <div class="relative bg-gradient-to-r from-blue-600 to-blue-500 rounded-[10px] py-4 px-6 transition-all duration-300 group-hover:from-blue-500 group-hover:to-blue-500">
                <span class="relative z-10 flex items-center justify-center gap-3 text-white font-bold text-lg">
                    <i data-lucide="credit-card" class="w-6 h-6"></i>
                    <span>Tiếp tục thanh toán</span>
                    <i data-lucide="arrow-right" class="w-6 h-6 group-hover:translate-x-1 transition-transform"></i>
                </span>
            </div>
        </button>
        
        <button onclick="window.location.hash='${ROUTES.CART}'" class="w-full border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2">
            <i data-lucide="arrow-left" class="w-5 h-5"></i>
            <span>Quay lại giỏ hàng</span>
        </button>
        
        <!-- Trust Badges -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div class="flex items-center gap-1">
                    <i data-lucide="shield-check" class="w-4 h-4 text-blue-600"></i>
                    <span>Bảo mật SSL</span>
                </div>
                <div class="flex items-center gap-1">
                    <i data-lucide="lock" class="w-4 h-4 text-blue-600"></i>
                    <span>Mã hóa dữ liệu</span>
                </div>
            </div>
        </div>
    `;

    // Event listener for proceed button
    summaryCard.querySelector('#proceed-payment').addEventListener('click', () => {
        const orderData = {
            items: items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.type === 'registration' ? item.depositAmount : item.price,
                quantity: item.quantity,
                type: item.type
            })),
            total: total
        };

        sessionStorage.setItem('currentOrder', JSON.stringify(orderData));
        window.location.hash = ROUTES.PAYMENT;
    });

    rightColumn.appendChild(summaryCard);

    checkoutGrid.appendChild(leftColumn);
    checkoutGrid.appendChild(rightColumn);
    mainContent.appendChild(checkoutGrid);
    container.appendChild(mainContent);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

export default CheckoutPage;
