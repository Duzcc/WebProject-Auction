/**
 * Cart Page - VPA Official Style
 * Professional auction management interface
 */

import { getCartItems, removeFromCart, subscribeToCart } from '../../utils/cart.js';
import { getUserPayments, downloadInvoice } from '../../utils/payment.js';
import { createElement } from '../../utils/dom.js';
import { ProfileSidebar } from '../shared/ProfileSidebar.js';
import showInvoiceModal from '../../components/InvoiceModal.js';

export function CartPage() {
    const container = createElement('div', { className: 'min-h-screen bg-gray-50' });

    // Banner Header
    const banner = createElement('div', {
        className: 'relative h-80 bg-cover bg-center overflow-hidden'
    });
    banner.style.backgroundImage = 'url("images/banners/cart.png")';
    banner.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div class="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">
                Giỏ hàng
            </h1>
            <p class="text-xl text-white/90 max-w-2xl" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5)">
                Quản lý danh sách biển số đã đăng ký đấu giá
            </p>
        </div>
    `;
    container.appendChild(banner);

    // Content container with sidebar
    const contentContainer = createElement('div', { className: 'flex' });

    // State management
    let activeTab = 'unpaid'; // 'unpaid', 'paid', 'refunded'
    let searchQuery = '';
    let selectedItems = new Set(); // Track selected items for checkout

    // Add ProfileSidebar to contentContainer
    const sidebar = ProfileSidebar({
        activePage: 'cart',
        onNavigate: (page) => {
            window.location.hash = `#/${page}`;
        }
    });
    contentContainer.appendChild(sidebar);

    // Main content area with proper width constraints
    const mainContent = createElement('div', { className: 'flex-1 min-w-0 max-w-7xl mx-auto' });

    const renderContent = () => {
        mainContent.innerHTML = '';
        selectedItems.clear(); // Clear selection on re-render

        // Header section
        const header = createElement('div', { className: 'bg-white border-b border-gray-200 px-6 py-6' });
        header.innerHTML = `
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-3xl font-bold text-gray-900">Danh sách biển số của bạn</h1>
                <div class="relative">
                    <input 
                        type="search"
                        id="cart-search"
                        placeholder="Biển số xe cần tìm"
                        value="${searchQuery}"
                        class="w-64 pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <i data-lucide="search" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"></i>
                </div>
            </div>

            <!-- Tabs with Badges -->
            <div class="flex gap-3 mb-8">
                <button class="tab-btn group relative px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'unpaid' ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}" data-tab="unpaid">
                    <span>Chưa thanh toán</span>
                    <span class="ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${activeTab === 'unpaid' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}" id="unpaid-badge">0</span>
                </button>
                <button class="tab-btn group relative px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'paid' ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}" data-tab="paid">
                    <span>Đã thanh toán</span>
                    <span class="ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${activeTab === 'paid' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'}" id="paid-badge">0</span>
                </button>
                <button class="tab-btn group relative px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'refunded' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}" data-tab="refunded">
                    <span>Đã hoàn tiền</span>
                    <span class="ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${activeTab === 'refunded' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'}" id="refunded-badge">0</span>
                </button>
            </div>
        `;
        mainContent.appendChild(header);

        // Content section
        const content = createElement('div', { className: 'p-6' });

        const items = getFilteredItems();

        if (items.length === 0) {
            // Empty state
            content.appendChild(createEmptyState());
        } else {
            // Table with items
            content.appendChild(createTable(items));
        }

        mainContent.appendChild(content);

        // Checkout section (only show if there are unpaid items)
        if (activeTab === 'unpaid' && items.length > 0) {
            const checkoutSection = createElement('div', {
                className: 'sticky bottom-0 bg-gradient-to-r from-blue-50 to-blue-100 border-t-2 border-blue-300 px-6 py-6 shadow-2xl backdrop-blur-sm'
            });

            const updateCheckoutButton = () => {
                const checkoutBtn = checkoutSection.querySelector('#proceed-checkout-btn');
                const totalSpan = checkoutSection.querySelector('#checkout-total');
                const countSpan = checkoutSection.querySelector('#checkout-count');

                const selectedCartItems = getCartItems().filter(item => selectedItems.has(item.id));
                const total = selectedCartItems.reduce((sum, item) => {
                    const amount = item.depositAmount || item.price || 0;
                    return sum + amount;
                }, 0);

                totalSpan.textContent = `${total.toLocaleString('vi-VN')} VNĐ`;
                countSpan.textContent = selectedCartItems.length;

                if (selectedItems.size > 0) {
                    checkoutBtn.removeAttribute('disabled');
                    checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    checkoutBtn.classList.add('hover:scale-105', 'active:scale-95');
                } else {
                    checkoutBtn.setAttribute('disabled', 'true');
                    checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    checkoutBtn.classList.remove('hover:scale-105', 'active:scale-95');
                }
            };

            checkoutSection.innerHTML = `
                <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div class="flex items-baseline gap-4">
                        <div class="flex flex-col">
                            <span class="text-sm font-medium text-gray-600 mb-1">Tổng thanh toán</span>
                            <div class="flex items-baseline gap-2">
                                <span id="checkout-total" class="text-4xl font-black text-blue-700">0 VNĐ</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 px-3 py-1.5 bg-blue-200 rounded-full">
                            <i data-lucide="shopping-cart" class="w-4 h-4 text-blue-700"></i>
                            <span id="checkout-count" class="text-sm font-bold text-blue-700">0</span>
                            <span class="text-xs text-blue-600">đơn</span>
                        </div>
                    </div>
                    <button id="proceed-checkout-btn" class="group min-w-[280px] bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:from-blue-700 hover:via-blue-800 hover:to-blue-700 text-white py-4 px-8 rounded-xl font-bold shadow-xl hover:shadow-2xl transform transition-all duration-300 flex items-center justify-center gap-3 opacity-50 cursor-not-allowed" disabled>
                        <i data-lucide="credit-card" class="w-5 h-5 group-hover:scale-110 transition-transform"></i>
                        <span>Tiến hành thanh toán</span>
                        <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </div>
            `;

            mainContent.appendChild(checkoutSection);

            // Add event listener for checkout button
            const checkoutBtn = checkoutSection.querySelector('#proceed-checkout-btn');
            checkoutBtn.addEventListener('click', () => {
                const selectedCartItems = getCartItems().filter(item => selectedItems.has(item.id));
                if (selectedCartItems.length === 0) {
                    alert('Vui lòng chọn ít nhất một biển số để thanh toán.');
                    return;
                }

                const total = selectedCartItems.reduce((sum, item) => {
                    const amount = item.depositAmount || item.price || 0;
                    return sum + amount;
                }, 0);

                // CRITICAL: Clear any old order data first
                sessionStorage.removeItem('currentOrder');

                // Package cart items as order data (FRESH)
                const orderData = {
                    id: `ORD-${Date.now()}`,
                    items: selectedCartItems.map(item => ({
                        ...item,
                        depositAmount: item.depositAmount || item.price || 0
                    })),
                    total,
                    totalItems: selectedCartItems.length,
                    createdAt: new Date().toISOString()
                };

                // Store in session for checkout page
                sessionStorage.setItem('currentOrder', JSON.stringify(orderData));

                console.log('✅ Created fresh order:', orderData.id, 'with', orderData.totalItems, 'items');

                // Navigate to checkout
                window.location.hash = '#/checkout';
            });

            updateCheckoutButton(); // Initial update
        }

        // Add event listeners
        const searchInput = header.querySelector('#cart-search');
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderContent();
        });

        const tabBtns = header.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                activeTab = btn.dataset.tab;
                renderContent();
            });
        });

        // Update tab badges
        const updateTabBadges = () => {
            const unpaidCount = getCartItems().filter(i => !i.paid).length;
            const paidCount = getUserPayments('completed').length;
            const refundedCount = getUserPayments('refunded').length;

            const unpaidBadge = header.querySelector('#unpaid-badge');
            const paidBadge = header.querySelector('#paid-badge');
            const refundedBadge = header.querySelector('#refunded-badge');

            if (unpaidBadge) unpaidBadge.textContent = unpaidCount;
            if (paidBadge) paidBadge.textContent = paidCount;
            if (refundedBadge) refundedBadge.textContent = refundedCount;
        };

        updateTabBadges();

        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    const getFilteredItems = () => {
        // For "Đã thanh toán" tab, show completed payments as invoices
        if (activeTab === 'paid') {
            const payments = getUserPayments('completed'); // Only completed payments

            // Convert payments to display format
            let paidItems = payments.map(payment => ({
                id: payment.id,
                orderCode: payment.id.substr(-8).toUpperCase(),
                plateNumber: payment.itemName,
                type: 'plate', // Show as plate number auction, not "payment"
                auctionSession: payment.completedAt
                    ? new Date(payment.completedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    : 'Đã thanh toán',
                depositAmount: payment.remainingAmount,
                price: payment.remainingAmount,
                auctionDate: payment.completedAt || payment.createdAt,
                paid: true,
                paymentData: payment // Keep full payment data for invoice
            }));

            // Apply search filter to paid items
            paidItems = paidItems.filter(item => {
                const matchSearch = !searchQuery ||
                    item.plateNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.orderCode?.toLowerCase().includes(searchQuery.toLowerCase());
                return matchSearch;
            });
            return paidItems;
        }

        // For "Đã hoàn tiền" tab, show refunded payments
        if (activeTab === 'refunded') {
            const payments = getUserPayments('refunded'); // Only refunded payments

            // Convert payments to display format
            let refundedItems = payments.map(payment => ({
                id: payment.id,
                orderCode: payment.id.substr(-8).toUpperCase(),
                plateNumber: payment.itemName,
                type: 'plate', // Show as plate number auction
                auctionSession: payment.refundedAt
                    ? new Date(payment.refundedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                    : 'Đã hoàn tiền',
                depositAmount: payment.remainingAmount,
                price: payment.remainingAmount,
                auctionDate: payment.refundedAt || payment.createdAt,
                paid: true,
                status: 'refunded',
                paymentData: payment
            }));

            // Apply search filter
            refundedItems = refundedItems.filter(item => {
                const matchSearch = !searchQuery ||
                    item.plateNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.orderCode?.toLowerCase().includes(searchQuery.toLowerCase());
                return matchSearch;
            });
            return refundedItems;
        }

        // For other tabs (unpaid), use cart items
        let items = getCartItems();

        // Filter unpaid items
        if (activeTab === 'unpaid') {
            items = items.filter(item => !item.paid);
        }

        // Apply search filter
        items = items.filter(item => {
            const matchSearch = !searchQuery ||
                item.plateNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.name?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchSearch;
        });

        return items;
    };

    const createEmptyState = () => {
        const empty = createElement('div', {
            className: 'flex flex-col items-center justify-center py-24'
        });

        empty.innerHTML = `
            <div class="w-32 h-32 mb-6 opacity-40">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="40" y="60" width="120" height="100" rx="8" fill="#94A3B8" opacity="0.3"/>
                    <rect x="40" y="60" width="120" height="20" rx="8" fill="#94A3B8" opacity="0.5"/>
                    <line x1="70" y1="100" x2="130" y2="100" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
                    <line x1="70" y1="120" x2="110" y2="120" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="100" cy="40" r="15" fill="#94A3B8" opacity="0.4"/>
                </svg>
            </div>
            <p class="text-gray-500 text-base">Chưa có đơn hàng nào</p>
        `;

        return empty;
    };

    const createTable = (items) => {
        const tableContainer = createElement('div', {
            className: 'bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'
        });

        const table = createElement('table', { className: 'w-full' });

        // Table header
        const thead = createElement('thead', { className: 'bg-gradient-to-r from-gray-50 to-gray-100' });
        thead.innerHTML = `
            <tr>
                ${activeTab === 'unpaid' ? '<th class="px-3 py-3 text-left w-12"><input type="checkbox" id="select-all-checkbox" class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"></th>' : ''}
                <th class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-24">Mã đơn</th>
                <th class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-32">Biển số</th>
                <th class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-24">Loại</th>
                <th class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-28">Phiên</th>
                <th class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-28">Đặt cọc</th>
                <th class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-32">Giá</th>
                <th class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-24">Ngày</th>
                <th class="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-32">Hành động</th>
            </tr>
        `;
        table.appendChild(thead);

        // Table body
        const tbody = createElement('tbody', { className: 'divide-y divide-gray-100' });

        items.forEach((item, index) => {
            const tr = createElement('tr', {
                className: 'group hover:bg-blue-50/50 transition-all duration-200'
            });

            const orderCode = item.orderCode || `ORD${String(index + 1).padStart(5, '0')}`;
            const displayName = item.plateNumber || item.name || 'N/A';
            const itemType = item.type === 'deposit' ? 'Đặt cọc' :
                item.type === 'payment' ? 'Thanh toán' :
                    item.type === 'registration' ? 'Đăng ký' : 'Biển số';
            const depositAmount = item.depositAmount ? `${item.depositAmount.toLocaleString('vi-VN')}` : 'N/A';
            const price = item.price ? `${item.price.toLocaleString('vi-VN')}` : 'N/A';
            const auctionDate = item.auctionDate
                ? new Date(item.auctionDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
                : 'N/A';

            // Add checkbox column for unpaid items
            const checkboxColumn = activeTab === 'unpaid'
                ? `<td class="px-3 py-3">\n                     <input type="checkbox" \n                            class="item-checkbox w-4 h-4 text-blue-600 rounded" \n                            data-item-id="${item.id}" \n                            ${selectedItems.has(item.id) ? 'checked' : ''}>\n                   </td>`
                : '';

            tr.innerHTML = `
                ${checkboxColumn}
                <td class="px-3 py-3 text-xs font-medium text-gray-900">${orderCode}</td>
                <td class="px-3 py-3 text-sm text-gray-900 font-semibold truncate max-w-[8rem]" title="${displayName}">${displayName}</td>
                <td class="px-3 py-3 text-xs text-gray-600">${itemType}</td>
                <td class="px-3 py-3 text-xs text-gray-600 truncate max-w-[7rem]" title="${item.auctionSession || 'N/A'}">${item.auctionSession || 'N/A'}</td>
                <td class="px-3 py-3 text-xs text-gray-900">${depositAmount}</td>
                <td class="px-3 py-3 text-sm text-gray-900 font-semibold">${price}</td>
                <td class="px-3 py-3 text-xs text-gray-900">${auctionDate}</td>
                <td class="px-3 py-3">
                    ${activeTab === 'unpaid' ? `
                        <button class="action-btn group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 font-semibold text-xs transition-all duration-200" data-item-id="${item.id}" data-item-type="${item.type}">
                            <i data-lucide="trash-2" class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"></i>
                            <span>Xóa</span>
                        </button>
                    ` : activeTab === 'paid' ? `
                        <button class="action-btn group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 hover:text-amber-800 font-semibold text-xs transition-all duration-200" data-item-id="${item.id}" data-item-type="${item.type}">
                            <i data-lucide="dollar-sign" class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"></i>
                            <span>Hoàn tiền</span>
                        </button>
                    ` : `
                        <button class="action-btn group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 font-semibold text-xs transition-all duration-200" data-item-id="${item.id}" data-item-type="${item.type}">
                            <i data-lucide="eye" class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"></i>
                            <span>Xem</span>
                        </button>
                    `}
                </td>
            `;

            // Event listener for action button
            const actionBtn = tr.querySelector('.action-btn');
            actionBtn.addEventListener('click', () => {
                if (activeTab === 'unpaid') {
                    // Remove item from cart
                    const itemName = item.name || item.plateNumber;
                    removeFromCart(item.id, item.type); // FIX: Added type parameter
                    selectedItems.delete(item.id);

                    // Show success toast
                    import('../../utils/toast.js').then(({ default: toast }) => {
                        toast.success(`Đã xóa ${itemName} khỏi giỏ hàng`);
                    });

                    // Force re-render after a short delay to ensure localStorage is updated
                    setTimeout(() => {
                        renderContent();
                    }, 100);
                } else if (activeTab === 'paid' && item.paymentData) {
                    // Request refund for paid item
                    import('../../utils/payment.js').then(({ refundPayment }) => {
                        const success = refundPayment(item.paymentData.id);
                        if (success) {
                            // Also update cart item status to refunded
                            const cartItems = getCartItems();
                            const cartItem = cartItems.find(ci => ci.id === item.id);
                            if (cartItem) {
                                cartItem.status = 'refunded';
                                cartItem.refundedAt = new Date().toISOString();

                                // Save updated cart
                                import('../../utils/cart.js').then(({ default: cartModule }) => {
                                    const cart = JSON.parse(localStorage.getItem('vpa-cart') || '{"items":[]}');
                                    cart.items = cartItems;
                                    localStorage.setItem('vpa-cart', JSON.stringify(cart));
                                });
                            }

                            setTimeout(() => {
                                renderContent(); // Refresh to show in refunded tab
                            }, 100);
                        }
                    });
                } else {
                    // Show details or other action
                    alert('Xem chi tiết đơn hàng: ' + orderCode);
                }
            });

            // Event listener for checkbox (only for unpaid tab)
            if (activeTab === 'unpaid') {
                const checkbox = tr.querySelector('.item-checkbox');
                checkbox?.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        selectedItems.add(item.id);
                    } else {
                        selectedItems.delete(item.id);
                    }
                    // Update "select all" checkbox state
                    const selectAllCheckbox = tableContainer.querySelector('#select-all-checkbox');
                    if (selectAllCheckbox) {
                        const allItemCheckboxes = tableContainer.querySelectorAll('.item-checkbox');
                        const allChecked = Array.from(allItemCheckboxes).every(cb => cb.checked);
                        selectAllCheckbox.checked = allChecked;
                    }
                    // Update checkout button
                    const checkoutSection = mainContent.querySelector('.sticky.bottom-0');
                    if (checkoutSection) {
                        const updateCheckoutButton = () => {
                            const checkoutBtn = checkoutSection.querySelector('#proceed-checkout-btn');
                            const totalSpan = checkoutSection.querySelector('#checkout-total');
                            const countSpan = checkoutSection.querySelector('#checkout-count');

                            const selectedCartItems = getCartItems().filter(cartItem => selectedItems.has(cartItem.id));
                            const total = selectedCartItems.reduce((sum, cartItem) => {
                                const amount = cartItem.depositAmount || cartItem.price || 0;
                                return sum + amount;
                            }, 0);

                            totalSpan.textContent = `${total.toLocaleString('vi-VN')} VNĐ`;
                            countSpan.textContent = `(${selectedCartItems.length} đơn hàng)`;

                            if (selectedItems.size > 0) {
                                checkoutBtn.removeAttribute('disabled');
                                checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                            } else {
                                checkoutBtn.setAttribute('disabled', 'true');
                                checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
                            }
                        };
                        updateCheckoutButton();
                    }
                });
            }

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        tableContainer.appendChild(table);

        // Add "select all" functionality
        if (activeTab === 'unpaid') {
            const selectAllCheckbox = tableContainer.querySelector('#select-all-checkbox');
            if (selectAllCheckbox) {
                selectAllCheckbox.addEventListener('change', (e) => {
                    const isChecked = e.target.checked;
                    const itemCheckboxes = tableContainer.querySelectorAll('.item-checkbox');
                    itemCheckboxes.forEach(checkbox => {
                        checkbox.checked = isChecked;
                        const itemId = checkbox.dataset.itemId;
                        if (isChecked) {
                            selectedItems.add(itemId);
                        } else {
                            selectedItems.delete(itemId);
                        }
                    });
                    // Update checkout button
                    const checkoutSection = mainContent.querySelector('.sticky.bottom-0');
                    if (checkoutSection) {
                        const updateCheckoutButton = () => {
                            const checkoutBtn = checkoutSection.querySelector('#proceed-checkout-btn');
                            const totalSpan = checkoutSection.querySelector('#checkout-total');
                            const countSpan = checkoutSection.querySelector('#checkout-count');

                            const selectedCartItems = getCartItems().filter(cartItem => selectedItems.has(cartItem.id));
                            const total = selectedCartItems.reduce((sum, cartItem) => {
                                const amount = cartItem.depositAmount || cartItem.price || 0;
                                return sum + amount;
                            }, 0);

                            totalSpan.textContent = `${total.toLocaleString('vi-VN')} VNĐ`;
                            countSpan.textContent = `(${selectedCartItems.length} đơn hàng)`;

                            if (selectedItems.size > 0) {
                                checkoutBtn.removeAttribute('disabled');
                                checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                            } else {
                                checkoutBtn.setAttribute('disabled', 'true');
                                checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
                            }
                        };
                        updateCheckoutButton();
                    }
                });
            }
        }

        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        return tableContainer;
    };

    // Initial render
    renderContent();

    // Subscribe to cart changes
    subscribeToCart(renderContent);

    contentContainer.appendChild(mainContent);
    container.appendChild(contentContainer);

    return container;
}

export default CartPage;
