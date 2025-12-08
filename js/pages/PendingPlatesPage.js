/**
 * Pending Plates Page - VPA Official Style
 * Display plates waiting for auction
 */

import { createElement } from '../utils/dom.js';
import { ProfileSidebar } from './shared/ProfileSidebar.js';

export function PendingPlatesPage() {
    const container = createElement('div', { className: 'min-h-screen bg-gray-50' });

    // Banner Header
    const banner = createElement('div', {
        className: 'relative h-80 bg-cover bg-center overflow-hidden'
    });
    banner.style.backgroundImage = 'url("images/banners/pending_plates.png")';
    banner.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div class="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">
                Biển số chờ đấu giá
            </h1>
            <p class="text-xl text-white/90 max-w-2xl" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5)">
                Danh sách các biển số đang chờ đấu giá
            </p>
        </div>
    `;
    container.appendChild(banner);

    // Content container with sidebar
    const contentContainer = createElement('div', { className: 'flex' });

    let searchQuery = '';

    // Add ProfileSidebar to contentContainer
    const sidebar = ProfileSidebar({
        activePage: 'pending-plates',
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
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">Biển số chờ đấu giá</h1>
                    <p class="text-gray-600 mt-1">Danh sách các biển số đang chờ đấu giá</p>
                </div>
                <div class="relative">
                    <input 
                        type="search"
                        id="pending-search"
                        placeholder="Tìm kiếm biển số"
                        value="${searchQuery}"
                        class="w-64 pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <i data-lucide="search" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"></i>
                </div>
            </div>
        `;
        mainContent.appendChild(header);

        // Content section
        const content = createElement('div', { className: 'p-8' });

        // Mock data đã đăng ký
        const pendingPlates = [
            { id: 1, plateNumber: '30A-888.88', province: 'Hà Nội', session: 'Phiên 01/2025', startPrice: 500000000, auctionDate: '2025-01-15', status: 'pending' },
            { id: 2, plateNumber: '51F-999.99', province: 'TP. Hồ Chí Minh', session: 'Phiên 01/2025', startPrice: 800000000, auctionDate: '2025-01-20', status: 'pending' },
            { id: 3, plateNumber: '29E-444.44', province: 'Hà Nội', session: 'Phiên 02/2025', startPrice: 300000000, auctionDate: '2025-02-10', status: 'pending' }
        ];

        const filteredPlates = pendingPlates.filter(plate =>
            plate.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            plate.province.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredPlates.length === 0) {
            // Empty state
            content.appendChild(createEmptyState());
        } else {
            // Table with items
            content.appendChild(createTable(filteredPlates));
        }

        mainContent.appendChild(content);

        // Add event listeners
        const searchInput = header.querySelector('#pending-search');
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderContent();
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
                    <rect x="30" y="70" width="140" height="80" rx="8" fill="#94A3B8" opacity="0.3"/>
                    <rect x="40" y="80" width="60" height="30" rx="4" fill="#94A3B8" opacity="0.5"/>
                    <rect x="110" y="80" width="50" height="10" rx="2" fill="#94A3B8" opacity="0.4"/>
                    <rect x="110" y="100" width="50" height="10" rx="2" fill="#94A3B8" opacity="0.4"/>
                    <circle cx="100" cy="40" r="12" fill="#94A3B8" opacity="0.3"/>
                </svg>
            </div>
            <p class="text-gray-500 text-base">Không tìm thấy biển số nào</p>
        `;

        return empty;
    };

    const createTable = (plates) => {
        const tableContainer = createElement('div', {
            className: 'bg-white rounded-lg border border-gray-200 overflow-hidden'
        });

        const table = createElement('table', { className: 'w-full' });

        // Table header
        const thead = createElement('thead', { className: 'bg-gray-50 border-b border-gray-200' });
        thead.innerHTML = `
            <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Biển số</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tỉnh/Thành phố</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phiên đấu</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Giá khởi điểm</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ngày đấu giá</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
        `;
        table.appendChild(thead);

        // Table body
        const tbody = createElement('tbody', { className: 'divide-y divide-gray-200' });

        plates.forEach((plate) => {
            const tr = createElement('tr', { className: 'hover:bg-gray-50 transition-colors' });

            const auctionDate = new Date(plate.auctionDate).toLocaleDateString('vi-VN');

            tr.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                        <i data-lucide="star" class="w-4 h-4 text-yellow-400 fill-yellow-400"></i>
                        <span class="text-sm font-bold text-gray-900 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                            ${plate.plateNumber}
                        </span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${plate.province}</td>
                <td class="px-6 py-4 text-sm text-gray-900">${plate.session}</td>
                <td class="px-6 py-4 text-sm font-bold text-gray-900">${plate.startPrice.toLocaleString('vi-VN')} đ</td>
                <td class="px-6 py-4 text-sm text-gray-900">${auctionDate}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full text-xs font-semibold">
                        Chờ đấu giá
                    </span>
                </td>
                <td class="px-6 py-4">
                    <button class="view-detail-btn text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors hover:underline">
                        Xem chi tiết
                    </button>
                </td>
            `;

            // Event listener for action button
            const viewBtn = tr.querySelector('.view-detail-btn');
            viewBtn.addEventListener('click', () => {
                alert('Xem chi tiết biển số: ' + plate.plateNumber);
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

    contentContainer.appendChild(mainContent);
    container.appendChild(contentContainer);

    return container;
}

export default PendingPlatesPage;
