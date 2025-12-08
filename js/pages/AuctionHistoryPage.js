/**
 * Auction History Page - VPA Official Style
 * Display user's auction history with date filters
 */

import { createElement } from '../utils/dom.js';
import { ProfileSidebar } from '../components/Shared/ProfileSidebar.js';
import { getUserDeposits } from '../utils/deposit.js';
import { getUserBids } from '../utils/bidding.js';

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

        // Get real data from deposit and bidding systems
        const deposits = getUserDeposits();
        const bids = getUserBids();

        // Combine all history
        const allHistory = [
            ...deposits.map(d => ({
                id: d.id,
                plateNumber: d.itemName || 'N/A',
                type: 'Đăng ký',
                date: d.createdAt,
                amount: d.amount,
                status: d.status
            })),
            ...bids.map(b => ({
                id: b.id,
                plateNumber: b.itemName || 'N/A',
                type: 'Đặt giá',
                date: b.timestamp,
                amount: b.amount,
                status: b.isWinning ? 'winning' : 'outbid'
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
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Biển bán đấu giá</th>
            </tr>
        `;
        table.appendChild(thead);

        // Table body
        const tbody = createElement('tbody', { className: 'divide-y divide-gray-200' });

        history.forEach((item) => {
            const tr = createElement('tr', { className: 'hover:bg-gray-50 transition-colors' });

            const date = new Date(item.date).toLocaleDateString('vi-VN');

            // Status badge
            let statusBadge = '';
            if (item.status === 'verified') {
                statusBadge = '<span class="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold">Đã xác nhận</span>';
            } else if (item.status === 'pending') {
                statusBadge = '<span class="px-3 py-1 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-full text-xs font-semibold">Chờ xác nhận</span>';
            } else if (item.status === 'winning') {
                statusBadge = '<span class="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">Đang dẫn đầu</span>';
            } else if (item.status === 'outbid') {
                statusBadge = '<span class="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-full text-xs font-semibold">Bị vượt giá</span>';
            } else {
                statusBadge = '<span class="px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-semibold">Đã từ chối</span>';
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
                <td class="px-6 py-4 text-sm text-gray-900">${date}</td>
                <td class="px-6 py-4">${statusBadge}</td>
            `;

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

    contentContainer.appendChild(mainContent);
    container.appendChild(contentContainer);

    return container;
}

export default AuctionHistoryPage;
