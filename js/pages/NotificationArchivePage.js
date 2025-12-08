import { createElement, createFromHTML } from '../utils/dom.js';
import { PageBanner } from '../components/Shared/PageBanner.js';

/**
 * NotificationArchivePage
 * Displays notification archive with search and date filters
 */
export function NotificationArchivePage({ notifData = [] }) {
    const container = createElement('div', { className: 'bg-white min-h-[70vh]' });

    // Add banner
    container.appendChild(PageBanner({
        title: 'Thông báo',
        subtitle: 'Kho lưu trữ tài liệu',
        backgroundImage: '/images/banners/notifications_banner.png'
    }));

    const innerContainer = createElement('div', { className: 'container mx-auto px-4 py-10' });

    // Search and Filter Bar
    const filterBarHtml = `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div class="relative md:col-span-2">
                <input 
                    type="text" 
                    placeholder="Tìm kiếm tài liệu" 
                    class="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] shadow-sm"
                />
                <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" style="width: 18px; height: 18px;"></i>
            </div>
            
            <div class="relative">
                <input 
                    type="text" 
                    placeholder="Tài liệu từ ngày" 
                    onfocus="this.type='date'" 
                    onblur="if(!this.value)this.type='text'"
                    class="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-sm text-gray-500 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer shadow-sm"
                />
                <i data-lucide="calendar" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" style="width: 16px; height: 16px;"></i>
            </div>
            
            <div class="relative">
                <input 
                    type="text" 
                    placeholder="Tài liệu đến ngày" 
                    onfocus="this.type='date'" 
                    onblur="if(!this.value)this.type='text'"
                    class="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-sm text-gray-500 focus:outline-none focus:border-[#2563EB] appearance-none cursor-pointer shadow-sm"
                />
                <i data-lucide="calendar" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" style="width: 16px; height: 16px;"></i>
            </div>
        </div>
    `;
    const filterBar = createFromHTML(filterBarHtml);
    innerContainer.appendChild(filterBar);

    // Table Header
    const tableHeaderHtml = `
        <div class="flex bg-[#e5e5e5] text-gray-900 font-bold py-3 rounded-t-lg text-sm border border-gray-200">
            <div class="w-1/6 px-4">Thời gian</div>
            <div class="w-4/6 px-4">Tên tài liệu</div>
            <div class="w-1/6 px-4 text-center"></div>
        </div>
    `;
    const tableHeader = createFromHTML(tableHeaderHtml);
    innerContainer.appendChild(tableHeader);

    // Table Body
    const tableBody = createElement('div', {
        className: 'bg-white border border-t-0 border-gray-200 divide-y divide-gray-100'
    });

    notifData.forEach(item => {
        const row = createNotificationRow(item);
        tableBody.appendChild(row);
    });

    innerContainer.appendChild(tableBody);

    // Pagination
    const paginationHtml = `
        <div class="flex justify-end items-center mt-6">
            <div class="flex items-center gap-2 mr-4 text-sm">
                <span class="text-[#2563EB] font-bold">Xem</span>
                <select class="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none text-gray-700">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>
            <div class="flex gap-1">
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors">&lt;</button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-[#2563EB] text-white font-bold text-sm shadow-sm">1</button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-100">2</button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-100">3</button>
                <span class="w-8 h-8 flex items-center justify-center text-gray-400 pb-2">...</span>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-100">45</button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors">&gt;</button>
            </div>
        </div>
    `;
    const pagination = createFromHTML(paginationHtml);
    innerContainer.appendChild(pagination);

    container.appendChild(innerContainer);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

function createNotificationRow(item) {
    // Tách ngày khỏi giờ (ví dụ: "16:34 25/11/2025" -> "25/11/2025")
    const dateOnly = item.date?.split(' ')[1] || '';

    const rowHtml = `
        <div class="flex border-b border-gray-100 py-3 items-center text-sm transition-colors hover:bg-blue-50/50">
            <div class="w-1/6 px-4 text-gray-700 font-medium whitespace-nowrap">${dateOnly}</div>
            <div class="w-4/6 px-4 text-gray-800 font-medium">${item.title}</div>
            <div class="w-1/6 px-4 text-center">
                <a href="#" class="text-[#2563EB] font-bold cursor-pointer hover:underline whitespace-nowrap">
                    Tải xuống
                </a>
            </div>
        </div>
    `;

    return createFromHTML(rowHtml);
}
