/**
 * Shopping Cart Page
 * Displays cart items and checkout button
 */

import { getCartItems, getCartTotal, removeFromCart, updateQuantity, clearCart, subscribeToCart } from '../utils/cart.js';
import { createElement } from '../utils/dom.js';
import EmptyState from '../components/Shared/EmptyState.js';

export function CartPage() {
    const container = createElement('div', { className: 'container mx-auto px-4 py-8' });

    // Header
    const header = createElement('div', { className: 'mb-8' });
    header.innerHTML = `
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Giỏ Hàng</h1>
        <p class="text-gray-600 dark:text-gray-400">Quản lý các mục bạn muốn mua</p>
    `;
    container.appendChild(header);

    // Cart content
    const cartContent = createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-3 gap-8' });

    // Cart items section
    const itemsSection = createElement('div', { className: 'lg:col-span-2' });

    // Cart summary section
    const summarySection = createElement('div', { className: 'lg:col-span-1' });

    const renderCart = () => {
        const items = getCartItems();
        const total = getCartTotal();

        // Clear sections
        itemsSection.innerHTML = '';
        summarySection.innerHTML = '';

        if (items.length === 0) {
            itemsSection.appendChild(EmptyState({
                icon: 'shopping-cart',
                title: 'Giỏ hàng trống',
                message: 'Bạn chưa có sản phẩm nào trong giỏ hàng',
                action: {
                    text: 'Tiếp tục mua sắm',
                    onClick: () => window.location.hash = '#/cars'
                }
            }));
            return;
        }

        // Render items
        const itemsContainer = createElement('div', { className: 'bg-white dark:bg-gray-800 rounded-lg shadow-md' });

        items.forEach((item, index) => {
            const itemEl = createElement('div', {
                className: `p-6 flex gap-4 ${index < items.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`
            });

            itemEl.innerHTML = `
                <img src="${item.image || '/placeholder.jpg'}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
                <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-1">${item.name}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">${item.type === 'car' ? 'Xe ô tô' : item.type === 'motorbike' ? 'Xe máy' : 'Tài sản'}</p>
                    <p class="text-lg font-bold text-[#be1e2d]">${item.price.toLocaleString('vi-VN')} VNĐ</p>
                </div>
                <div class="flex flex-col items-end gap-2">
                    <button class="remove-btn text-red-600 hover:text-red-700 p-2">
                        <i data-lucide="trash-2" class="w-5 h-5"></i>
                    </button>
                    <div class="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg">
                        <button class="decrease-btn px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">-</button>
                        <span class="px-3 font-semibold">${item.quantity}</span>
                        <button class="increase-btn px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">+</button>
                    </div>
                </div>
            `;

            // Event listeners
            itemEl.querySelector('.remove-btn').addEventListener('click', () => {
                removeFromCart(item.id, item.type);
            });

            itemEl.querySelector('.decrease-btn').addEventListener('click', () => {
                updateQuantity(item.id, item.type, item.quantity - 1);
            });

            itemEl.querySelector('.increase-btn').addEventListener('click', () => {
                updateQuantity(item.id, item.type, item.quantity + 1);
            });

            itemsContainer.appendChild(itemEl);
        });

        itemsSection.appendChild(itemsContainer);

        // Clear cart button
        const clearBtn = createElement('button', {
            className: 'mt-4 text-red-600 hover:text-red-700 font-semibold flex items-center gap-2'
        });
        clearBtn.innerHTML = '<i data-lucide="trash-2" class="w-4 h-4"></i><span>Xóa tất cả</span>';
        clearBtn.addEventListener('click', () => {
            if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm?')) {
                clearCart();
            }
        });
        itemsSection.appendChild(clearBtn);

        // Render summary
        const summary = createElement('div', { className: 'bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4' });
        summary.innerHTML = `
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Tổng Quan Đơn Hàng</h2>
            <div class="space-y-3 mb-6">
                <div class="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tạm tính</span>
                    <span>${total.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div class="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Phí dịch vụ</span>
                    <span>0 VNĐ</span>
                </div>
                <div class="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Tổng cộng</span>
                    <span class="text-[#be1e2d]">${total.toLocaleString('vi-VN')} VNĐ</span>
                </div>
            </div>
            <button class="checkout-btn w-full bg-gradient-to-r from-[#be1e2d] to-[#8b1818] text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                Tiến Hành Thanh Toán
            </button>
            <p class="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                Bằng cách thanh toán, bạn đồng ý với điều khoản và điều kiện của chúng tôi
            </p>
        `;

        summary.querySelector('.checkout-btn').addEventListener('click', () => {
            window.location.hash = '#/checkout';
        });

        summarySection.appendChild(summary);

        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    // Initial render
    renderCart();

    // Subscribe to cart changes
    subscribeToCart(renderCart);

    cartContent.appendChild(itemsSection);
    cartContent.appendChild(summarySection);
    container.appendChild(cartContent);

    return container;
}

export default CartPage;
