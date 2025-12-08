/**
 * Cart Page - VPA Official Style
 * Professional auction management interface
 */

import { getCartItems, removeFromCart, subscribeToCart } from '../utils/cart.js';
import { createElement } from '../utils/dom.js';
import { ProfileSidebar } from './shared/ProfileSidebar.js';

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
    let activeTab = 'unpaid';
    let searchQuery = '';

    // Add ProfileSidebar to contentContainer
    const sidebar = ProfileSidebar({
        activePage: 'cart',
        onNavigate: (page) => {
            window.location.hash = `#/${page}`;
        }
    });
    contentContainer.appendChild(sidebar);

    // Main content area
    const mainContent = createElement('div', { className: 'flex-1' });

    const renderContent = () => {
        mainContent.innerHTML = '';

        // Header section
        const header = createElement('div', { className: 'bg-white border-b border-gray-200 px-8 py-6' });
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

            <!-- Tabs -->
            <div class="flex gap-8 border-b border-gray-200">
                <button class="tab-btn pb-3 px-1 text-sm font-semibold transition-colors ${activeTab === 'unpaid' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}" data-tab="unpaid">
                    Chưa thanh toán
                </button>
                <button class="tab-btn pb-3 px-1 text-sm font-semibold transition-colors ${activeTab === 'paid' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}" data-tab="paid">
                    Đã thanh toán
                </button>
                <button class="tab-btn pb-3 px-1 text-sm font-semibold transition-colors ${activeTab === 'refunded' ? 'text-gray-600 border-b-2 border-gray-600' : 'text-gray-600 hover:text-gray-900'}" data-tab="refunded">
                    Đã hoàn tiền
                </button>
            </div>
        `;
        mainContent.appendChild(header);

        // Content section
        const content = createElement('div', { className: 'p-8' });

        const items = getFilteredItems();

        if (items.length === 0) {
            // Empty state
            content.appendChild(createEmptyState());
        } else {
            // Table with items
            content.appendChild(createTable(items));
        }

        mainContent.appendChild(content);

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

        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    const getFilteredItems = () => {
        let items = getCartItems();

        // Filter by tab status
        items = items.filter(item => {
            if (activeTab === 'unpaid') return !item.paid;
            if (activeTab === 'paid') return item.paid && !item.refunded;
            if (activeTab === 'refunded') return item.refunded;
            return true;
        });

        // Filter by search query
        if (searchQuery) {
            items = items.filter(item =>
                item.plateNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

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
            className: 'bg-white rounded-lg border border-gray-200 overflow-hidden'
        });

        const table = createElement('table', { className: 'w-full' });

        // Table header
        const thead = createElement('thead', { className: 'bg-gray-50 border-b border-gray-200' });
        thead.innerHTML = `
            <tr>
                <th class="px-6 py-4 text-left">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mã đơn hàng</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Biển số</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phiên đấu</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Số tiền (đ)</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thời gian đấu giá</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
        `;
        table.appendChild(thead);

        // Table body
        const tbody = createElement('tbody', { className: 'divide-y divide-gray-200' });

        items.forEach((item, index) => {
            const tr = createElement('tr', { className: 'hover:bg-gray-50 transition-colors' });

            const orderCode = item.orderCode || `ORD${String(index + 1).padStart(5, '0')}`;
            const plateNumber = item.plateNumber || item.name;
            const auctionSession = item.auctionSession || 'Phiên 01/2025';
            const amount = item.depositAmount || item.price || 0;
            const auctionDate = item.auctionDate
                ? new Date(item.auctionDate).toLocaleDateString('vi-VN')
                : 'Chưa xác định';

            tr.innerHTML = `
                <td class="px-6 py-4">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                </td>
                <td class="px-6 py-4 text-sm text-gray-900 font-medium">${orderCode}</td>
                <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                        <i data-lucide="star" class="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                        <span class="text-sm font-bold text-gray-900 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-md">
                            ${plateNumber}
                        </span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">${auctionSession}</td>
                <td class="px-6 py-4 text-sm font-bold text-gray-900">${amount.toLocaleString('vi-VN')}</td>
                <td class="px-6 py-4 text-sm text-gray-900">${auctionDate}</td>
                <td class="px-6 py-4">
                    <button class="remove-btn text-blue-600 hover:text-blue-800 font-semibold text-sm hover:underline" data-item-id="${item.id}" data-item-type="${item.type}">
                        ${activeTab === 'unpaid' ? 'Thanh toán' : 'Xem chi tiết'}
                    </button>
                </td>
            `;

            // Event listener for action button
            const actionBtn = tr.querySelector('.remove-btn');
            actionBtn.addEventListener('click', () => {
                if (activeTab === 'unpaid') {
                    // Redirect to payment
                    window.location.hash = '#/checkout';
                } else {
                    // Show details or other action
                    alert('Xem chi tiết đơn hàng: ' + orderCode);
                }
            });

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        tableContainer.appendChild(table);

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
