/**
 * NewsPage - Trang tin tức và thông báo
 * Displays news and notifications with tabs and pagination
 */

import { createElement, createFromHTML, initIcons } from '../../utils/dom.js';
import { newsData, notifData } from '../../data/constants.js';

// =============================
// INTERNAL COMPONENTS
// =============================

/**
 * PageBanner Component - Banner for page headers
 */
function PageBanner({ title, subtitle, backgroundImage }) {
    const html = `
        <div class="relative bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white py-16 md:py-24 overflow-hidden">
            <!-- Background Image Overlay -->
            ${backgroundImage ? `
                <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('${backgroundImage}');"></div>
            ` : ''}
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
            
            <!-- Content -->
            <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-2xl">
                    ${subtitle ? `<p class="text-blue-200 text-sm md:text-base font-semibold uppercase tracking-wider mb-2">${subtitle}</p>` : ''}
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-4">${title}</h1>
                    <div class="w-24 h-1 bg-blue-400 rounded-full"></div>
                </div>
            </div>

            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
            <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
        </div>
    `;

    return createFromHTML(html);
}

/**
 * NewsSection Component - News and notifications with tabs
 */
function NewsSection({ newsData = [], notifData = [] }) {
    let activeTab = 'news';
    const container = createElement('div', { className: 'py-16 bg-white' });

    function render() {
        container.innerHTML = '';

        const innerContainer = createElement('div', { className: 'container mx-auto px-4' });

        // Tab Navigation
        const tabNav = createElement('div', { className: 'flex gap-1 mb-6 border-b border-gray-200' });

        const newsTabClass = activeTab === 'news'
            ? 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 bg-[#2563EB] text-white border-[#2563EB]'
            : 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 text-gray-500 hover:text-[#2563EB] bg-white border-gray-200 hover:border-[#2563EB]';

        const notifTabClass = activeTab === 'notif'
            ? 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 bg-[#2563EB] text-white border-[#2563EB]'
            : 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 text-gray-500 hover:text-[#2563EB] bg-white border-gray-200 hover:border-[#2563EB]';

        const newsTab = createElement('button', { className: newsTabClass }, 'Tin tức');
        newsTab.addEventListener('click', () => {
            activeTab = 'news';
            render();
        });

        const notifTab = createElement('button', { className: notifTabClass }, 'Thông báo');
        notifTab.addEventListener('click', () => {
            activeTab = 'notif';
            render();
        });

        tabNav.appendChild(newsTab);
        tabNav.appendChild(notifTab);
        innerContainer.appendChild(tabNav);

        // Main Content Title
        const currentData = activeTab === 'news' ? newsData : notifData;
        const titleText = activeTab === 'news' ? 'Tin tức' : 'Thông báo';
        const totalPages = activeTab === 'news' ? 60 : 30;

        const titleContainer = createElement('div', { className: 'w-full flex items-center' });
        const titleBgClass = activeTab === 'news' ? 'bg-[#2563EB]' : 'bg-blue-800';
        const titleBox = createElement('div', {
            className: `inline-block px-6 py-3 font-bold text-lg text-white rounded-t-lg shadow-sm border-r-4 border-white ${titleBgClass}`
        }, titleText);
        const titleBorder = createElement('div', { className: 'flex-grow border-b border-red-700 h-1' });

        titleContainer.appendChild(titleBox);
        titleContainer.appendChild(titleBorder);
        innerContainer.appendChild(titleContainer);

        // News List
        const listContainer = createElement('div', { className: 'space-y-0 pb-4' });

        currentData.forEach(item => {
            const newsRow = createNewsRow(item, activeTab === 'news');
            listContainer.appendChild(newsRow);
        });

        innerContainer.appendChild(listContainer);

        // Pagination
        innerContainer.appendChild(createPagination(totalPages, 1));

        container.appendChild(innerContainer);
    }

    function createNewsRow(item, isNewsTab) {
        const categoryDisplay = isNewsTab && item.category ? `[${item.category}]` : '';

        const rowHtml = `
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-blue-200 pb-4 pt-4 group cursor-pointer hover:bg-blue-50/50 transition-colors">
                <div class="flex items-start gap-3 w-full md:w-3/4">
                    <i data-lucide="chevrons-right" class="text-[#2563EB] mt-1 flex-shrink-0" style="width: 20px; height: 20px;"></i>
                    <h3 class="text-gray-800 font-medium text-base group-hover:text-[#2563EB] transition-colors">
                        <span class="text-gray-500 font-normal text-sm mr-1">${categoryDisplay}</span>
                        ${item.title}
                    </h3>
                </div>
                <div class="flex items-center gap-4 mt-2 md:mt-0 md:w-1/4 md:justify-end">
                    ${item.source ? `
                        <span class="text-[#2563EB] border border-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
                            ${isNewsTab ? item.source : 'Thông báo'}
                        </span>
                    ` : ''}
                    <span class="text-gray-500 text-xs italic whitespace-nowrap">
                        (Ngày đăng bài: ${item.date})
                    </span>
                </div>
            </div>
        `;

        const row = createFromHTML(rowHtml);

        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        return row;
    }

    function createPagination(totalPages, currentPage) {
        const paginationHtml = `
            <div class="flex justify-center items-center mt-8 gap-1.5">
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors">
                    &lt;
                </button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-[#2563EB] text-white font-bold text-sm shadow-sm">1</button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-600 font-medium text-sm transition-colors">2</button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-600 font-medium text-sm transition-colors">3</button>
                <span class="w-8 h-8 flex items-center justify-center text-gray-400 pb-2">...</span>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-600 font-medium text-sm transition-colors">
                    ${totalPages}
                </button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors">
                    &gt;
                </button>
            </div>
        `;

        return createFromHTML(paginationHtml);
    }

    render();
    return container;
}

// =============================
// MAIN PAGE EXPORT
// =============================

export function NewsPage() {
    const container = createElement('div', { className: 'bg-white min-h-[70vh] pb-16' });

    // Add banner
    container.appendChild(PageBanner({
        title: 'Tin tức & Thông báo',
        subtitle: 'Cập nhật thông tin',
        backgroundImage: '/images/banners/news_banner.png'
    }));

    // Add news section
    container.appendChild(NewsSection({ newsData, notifData }));

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}
