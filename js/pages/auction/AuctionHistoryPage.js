/**
 * Auction History Page - VPA Official Style
 * Display user's auction history with date filters
 */

import { createElement } from '../../utils/dom.js';
import { ProfileSidebar } from '../shared/ProfileSidebar.js';
import { getUserDeposits } from '../../utils/deposit.js';
import { getUserBids } from '../../utils/bidding.js';
import { getUserPayments, downloadInvoice } from '../../utils/payment.js';
import showInvoiceModal from '../../components/InvoiceModal.js';

export function AuctionHistoryPage() {
    const container = createElement('div', { className: 'min-h-screen bg-gray-50' });

    // Banner Header
    const banner = createElement('div', {
        className: 'relative h-80 bg-cover bg-center overflow-hidden'
    });
    banner.style.backgroundImage = 'url("images/banners/auction_history.png")';
    banner.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div class="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">
                Lịch sử đấu giá
            </h1>
            <p class="text-xl text-white/90 max-w-2xl" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5)">
                Theo dõi toàn bộ hoạt động và lịch sử đấu giá của bạn
            </p>
        </div>
    `;
    container.appendChild(banner);

    // Content container with sidebar
    const contentContainer = createElement('div', { className: 'flex' });

    let searchQuery = '';
    let startDate = '';
    let endDate = '';

    // Add ProfileSidebar to contentContainer
    const sidebar = ProfileSidebar({
        activePage: 'auction-history',
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
            <div class="mb-6">
                <h1 class="text-3xl font-bold text-gray-900">Lịch sử đấu giá</h1>
                <p class="text-gray-600 mt-1">Theo dõi các phiên đấu giá của bạn</p>
            </div>

            <!-- Filters -->
            <div class="flex gap-4">
                <div class="relative flex-1">
                    <input 
                        type="date"
                        id="start-date"
                        placeholder="Thời gian đấu giá từ"
                        value="${startDate}"
                        class="w-full pl-4 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div class="relative flex-1">
                    <input 
                        type="date"
                        id="end-date"
                        placeholder="Đến ngày"
                        value="${endDate}"
                        class="w-full pl-4 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div class="relative flex-1">
                    <input 
                        type="search"
                        id="history-search"
                        placeholder="Nhập biển số xe"
                        value="${searchQuery}"
                        class="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <i data-lucide="search" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"></i>
                </div>
                <button id="search-btn" class="px-6 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
                    Tìm kiếm
                </button>
            </div>
        `;
        mainContent.appendChild(header);

        // Content section
        const content = createElement('div', { className: 'p-8' });

        // Get real data from deposit, bidding, and payment systems
        const deposits = getUserDeposits();
        const bids = getUserBids();
        const payments = getUserPayments();

        // Combine all history with enhanced status for winning bids
        const allHistory = [
            ...deposits.map(d => ({
                id: d.id,
                plateNumber: d.itemName || 'N/A',
                type: 'Đăng ký',
                session: d.session || new Date(d.createdAt).toLocaleDateString('vi-VN'),
                date: d.createdAt,
                amount: d.amount,
                status: d.status,
                itemType: 'deposit'
            })),
            ...bids.map(b => {
                // Check if this winning bid has a payment
                const hasPayment = payments.some(p =>
                    p.auctionId === b.auctionId && p.status === 'completed'
                );

                return {
                    id: b.id,
                    auctionId: b.auctionId,
                    plateNumber: b.itemName || 'N/A',
                    type: b.isWinning ? 'Trúng thầu' : 'Đặt giá',
                    session: b.session || new Date(b.timestamp).toLocaleDateString('vi-VN'),
                    date: b.timestamp,
                    amount: b.amount,
                    status: b.isWinning
                        ? (hasPayment ? 'won_paid' : 'won_unpaid')
                        : 'outbid',
                    itemType: 'bid'
                };
            }),
            ...payments.map(p => ({
                id: p.id,
                auctionId: p.auctionId,
                plateNumber: p.itemName || 'N/A',
                type: 'Biển số',
                session: p.completedAt
                    ? new Date(p.completedAt).toLocaleDateString('vi-VN')
                    : 'Đang xử lý',
                date: p.createdAt,
                amount: p.remainingAmount,
                status: p.status, // 'pending', 'processing', 'completed'
                itemType: 'payment'
            }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        // Filter by search and date
        let filteredHistory = allHistory.filter(item => {
            const matchSearch = searchQuery === '' ||
                item.plateNumber.toLowerCase().includes(searchQuery.toLowerCase());

            const itemDate = new Date(item.date);
            const matchStartDate = startDate === '' || itemDate >= new Date(startDate);
            const matchEndDate = endDate === '' || itemDate <= new Date(endDate);

            return matchSearch && matchStartDate && matchEndDate;
        });

        if (filteredHistory.length === 0) {
            content.appendChild(createEmptyState());
        } else {
            content.appendChild(createTable(filteredHistory));
        }

        mainContent.appendChild(content);

        // Add event listeners
        const searchBtn = header.querySelector('#search-btn');
        const searchInput = header.querySelector('#history-search');
        const startDateInput = header.querySelector('#start-date');
        const endDateInput = header.querySelector('#end-date');

        const performSearch = () => {
            searchQuery = searchInput.value;
            startDate = startDateInput.value;
            endDate = endDateInput.value;
            renderContent();
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    const createEmptyState = () => {
        const empty = createElement('div', {
            className: 'flex flex-col items-center justify-center py-24'
        });

        empty.innerHTML = `
            <div class="w-32 h-32 mb-6 opacity-40">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="90" r="40" fill="#94A3B8" opacity="0.3"/>
                    <path d="M70 90 L85 105 L115 75" stroke="#94A3B8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.4"/>
                    <rect x="80" y="130" width="40" height="6" rx="3" fill="#94A3B8" opacity="0.3"/>
                </svg>
            </div>
            <p class="text-gray-500 text-base">Chưa có lịch sử đấu giá</p>
        `;

        return empty;
    };

    const createTable = (history) => {
        const tableContainer = createElement('div', {
            className: 'bg-white rounded-lg border border-gray-200 overflow-hidden'
        });

        const table = createElement('table', { className: 'w-full' });

        // Table header
        const thead = createElement('thead', { className: 'bg-gray-50 border-b border-gray-200' });
        thead.innerHTML = `
            <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Biển số</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phiên đấu</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ngày đấu giá</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
        `;
        table.appendChild(thead);

        // Table body
        const tbody = createElement('tbody', { className: 'divide-y divide-gray-200' });

        history.forEach((item) => {
            const tr = createElement('tr', { className: 'hover:bg-gray-50 transition-colors' });

            const date = new Date(item.date).toLocaleDateString('vi-VN');

            // Enhanced status badges
            let statusBadge = '';

            // Check for winning + paid status (AC 3.1, 3.2)
            if (item.status === 'won_paid') {
                statusBadge = '<span class="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">✓ Đã Trúng & Đã Thanh toán</span>';
                // Check for winning + unpaid status (AC 3.3)
            } else if (item.status === 'won_unpaid') {
                statusBadge = '<span class="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold animate-pulse">⏳ Đã Trúng, Chờ Thanh toán</span>';
            } else if (item.status === 'verified' || item.status === 'completed') {
                statusBadge = '<span class="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">Đã xác nhận</span>';
            } else if (item.status === 'pending') {
                statusBadge = '<span class="px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-xs font-semibold">Chờ xác nhận</span>';
            } else if (item.status === 'processing') {
                statusBadge = '<span class="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">Đang xử lý</span>';
            } else if (item.status === 'winning') {
                statusBadge = '<span class="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">Đang dẫn đầu</span>';
            } else if (item.status === 'outbid') {
                statusBadge = '<span class="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-full text-xs font-semibold">Bị vượt giá</span>';
            } else {
                statusBadge = '<span class="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-semibold">Đã từ chối</span>';
            }

            // Determine action button based on status
            let actionButton = '-';

            // Won and paid - show invoice detail button (AC 3.2)
            if (item.status === 'won_paid') {
                actionButton = `
                    <button class="action-btn text-blue-600 hover:text-blue-800 font-semibold text-sm hover:underline flex items-center gap-1"
                            data-action="view-invoice" 
                            data-auction-id="${item.auctionId}">
                        <i data-lucide="file-text" class="w-4 h-4"></i>
                        Xem chi tiết
                    </button>
                `;
                // Won but not paid - show pay now button (AC 3.3)
            } else if (item.status === 'won_unpaid') {
                actionButton = `
                    <button class="action-btn text-green-600 hover:text-green-800 font-semibold text-sm hover:underline flex items-center gap-1"
                            data-action="pay-now"
                            data-auction-id="${item.auctionId}">
                        <i data-lucide="credit-card" class="w-4 h-4"></i>
                        Thanh toán ngay
                    </button>
                `;
                // Payment record - show invoice (changed from 'Thanh toán' to 'Biển số')
            } else if (item.itemType === 'payment') {
                if (item.status === 'completed') {
                    actionButton = `
                        <button class="action-btn text-blue-600 hover:text-blue-800 font-semibold text-sm hover:underline flex items-center gap-1"
                                data-action="view-invoice-direct" 
                                data-id="${item.id}">
                            <i data-lucide="file-text" class="w-4 h-4"></i>
                            Xem chi tiết
                        </button>
                    `;
                } else if (item.status === 'pending' || item.status === 'processing') {
                    actionButton = `
                        <button class="action-btn text-green-600 hover:text-green-800 font-semibold text-sm hover:underline flex items-center gap-1"
                                data-action="pay-now-direct"
                                data-id="${item.id}">
                            <i data-lucide="credit-card" class="w-4 h-4"></i>
                            Thanh toán ngay
                        </button>
                    `;
                }
            } else if (item.type === 'Đăng ký' && item.status === 'verified') {
                actionButton = '<span class="text-gray-500 text-sm">Đã xác nhận</span>';
            }

            tr.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                        <i data-lucide="star" class="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                        <span class="text-sm font-bold text-gray-900 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-md">
                            ${item.plateNumber}
                        </span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">${item.type}</td>
                <td class="px-6 py-4 text-sm text-gray-900">${item.session || date}</td>
                <td class="px-6 py-4">${statusBadge}</td>
                <td class="px-6 py-4">${actionButton}</td>
            `;

            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        tableContainer.appendChild(table);

        // Add event listeners for action buttons
        const actionBtns = tbody.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                const id = btn.dataset.id;
                const auctionId = btn.dataset.auctionId;

                if (action === 'view-invoice') {
                    // Find payment by auction ID and show invoice modal
                    const payments = getUserPayments();
                    const payment = payments.find(p => p.auctionId === auctionId && p.status === 'completed');
                    if (payment) {
                        showInvoiceModal(payment.id);
                    }
                } else if (action === 'view-invoice-direct') {
                    // Show invoice modal directly
                    showInvoiceModal(id);
                } else if (action === 'pay-now') {
                    // Navigate to payment page with auction ID
                    window.location.hash = `#/payment?auctionId=${auctionId}`;
                } else if (action === 'pay-now-direct') {
                    // Navigate to payment page with payment ID
                    window.location.hash = `#/payment?paymentId=${id}`;
                }
            });
        });

        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        return tableContainer;
    };

    // Initial render
    renderContent();

    contentContainer.appendChild(mainContent);
    container.appendChild(contentContainer);

    return container;
}

export default AuctionHistoryPage;
