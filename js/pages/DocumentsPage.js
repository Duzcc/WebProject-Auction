/**
 * Documents Page - VPA Official Style
 * Display user's documents
 */

import { createElement } from '../utils/dom.js';
import { ProfileSidebar } from './shared/ProfileSidebar.js';

export function DocumentsPage() {
    const container = createElement('div', { className: 'min-h-screen bg-gray-50' });

    // Banner Header
    const banner = createElement('div', {
        className: 'relative h-80 bg-cover bg-center overflow-hidden'
    });
    banner.style.backgroundImage = 'url("images/banners/documents.png")';
    banner.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div class="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">
                Tài liệu của tôi
            </h1>
            <p class="text-xl text-white/90 max-w-2xl" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5)">
                Quản lý tài liệu và hợp đồng đấu giá
            </p>
        </div>
    `;
    container.appendChild(banner);

    // Content container with sidebar
    const contentContainer = createElement('div', { className: 'flex' });

    let searchQuery = '';

    // Add ProfileSidebar to contentContainer
    const sidebar = ProfileSidebar({
        activePage: 'documents',
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
                    <h1 class="text-3xl font-bold text-gray-900">Tài liệu của tôi</h1>
                    <p class="text-gray-600 mt-1">Quản lý tài liệu và hợp đồng đấu giá</p>
                </div>
                <div class="relative">
                    <input 
                        type="search"
                        id="docs-search"
                        placeholder="Nhập biển số"
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

        // Mock data tài liệu
        const documents = [
            { id: 1, plateNumber: '30A-888.88', type: 'Hợp đồng', date: '2025-01-10', status: 'active', fileName: 'hop_dong_30A_888_88.pdf' },
            { id: 2, plateNumber: '51F-999.99', type: 'Biên bản', date: '2025-01-12', status: 'active', fileName: 'bien_ban_51F_999_99.pdf' },
            { id: 3, plateNumber: '29E-444.44', type: 'Giấy tờ', date: '2024-12-20', status: 'archived', fileName: 'giay_to_29E_444_44.pdf' }
        ];

        const filteredDocs = documents.filter(doc =>
            doc.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.type.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredDocs.length === 0) {
            content.appendChild(createEmptyState());
        } else {
            content.appendChild(createTable(filteredDocs));
        }

        mainContent.appendChild(content);

        // Add event listeners
        const searchInput = header.querySelector('#docs-search');
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
                    <rect x="50" y="40" width="100" height="130" rx="8" fill="#94A3B8" opacity="0.3"/>
                    <rect x="60" y="60" width="40" height="4" rx="2" fill="#94A3B8" opacity="0.5"/>
                    <rect x="60" y="75" width="70" height="4" rx="2" fill="#94A3B8" opacity="0.5"/>
                    <rect x="60" y="90" width="60" height="4" rx="2" fill="#94A3B8" opacity="0.5"/>
                    <circle cx="130" cy="60" r="8" fill="#94A3B8" opacity="0.4"/>
                </svg>
            </div>
            <p class="text-gray-500 text-base">Không tìm thấy bản ghi nào</p>
        `;

        return empty;
    };

    const createTable = (docs) => {
        const tableContainer = createElement('div', {
            className: 'bg-white rounded-lg border border-gray-200 overflow-hidden'
        });

        const table = createElement('table', { className: 'w-full' });

        // Table header
        const thead = createElement('thead', { className: 'bg-gray-50 border-b border-gray-200' });
        thead.innerHTML = `
            <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Biển số</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Loại tài liệu</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ngày tạo</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thao tác</th>
            </tr>
        `;
        table.appendChild(thead);

        // Table body
        const tbody = createElement('tbody', { className: 'divide-y divide-gray-200' });

        docs.forEach((doc) => {
            const tr = createElement('tr', { className: 'hover:bg-gray-50 transition-colors' });

            const date = new Date(doc.date).toLocaleDateString('vi-VN');
            const statusClass = doc.status === 'active'
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-gray-50 text-gray-600 border-gray-200';

            tr.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-gray-900 px-3 py-1.5 bg-yellow-50 border border-yellow-200 rounded-lg">
                            ${doc.plateNumber}
                        </span>
                    </div>
                </td>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${doc.type}</td>
                <td class="px-6 py-4 text-sm text-gray-900">${date}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 ${statusClass} border rounded-full text-xs font-semibold">
                        ${doc.status === 'active' ? 'Hoạt động' : 'Lưu trữ'}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <button class="download-btn text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors hover:underline">
                        Tải về
                    </button>
                </td>
            `;

            // Event listener for download button
            const downloadBtn = tr.querySelector('.download-btn');
            downloadBtn.addEventListener('click', () => {
                alert('Tải tài liệu: ' + doc.fileName);
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

export default DocumentsPage;
