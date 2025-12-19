/**
 * NewsPage - Trang tin tức và thông báo
 * Displays news and notifications with tabs and pagination
 */

import { createElement, createFromHTML, initIcons } from '../../../shared/utils/dom.js';
import { newsData, notifData } from '../../../data/constants.js';

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
            <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#AA8C3C] rounded-full filter blur-3xl opacity-10"></div>
        </div>
    `;

    return createFromHTML(html);
}

/**
 * NewsSection Component - News and notifications with tabs
 */
function NewsSection({ newsData = [], notifData = [], initialTab, onNavigate } = {}) {
    let activeTab = initialTab || 'news';
    const container = createElement('div', { className: 'py-16 bg-white' });

    function render() {
        container.innerHTML = '';

            const innerContainer = createElement('div', { className: 'container mx-auto px-4' });

        // Tab Navigation
        const tabNav = createElement('div', { className: 'flex gap-1 mb-6 border-b border-gray-200' });

        const newsTabClass = activeTab === 'news'
            ? 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 bg-[#AA8C3C] text-white border-[#AA8C3C]'
            : 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 text-gray-500 hover:text-[#AA8C3C] bg-white border-gray-200 hover:border-[#AA8C3C]';

        const notifTabClass = activeTab === 'notif'
            ? 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 bg-[#AA8C3C] text-white border-[#AA8C3C]'
            : 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 text-gray-500 hover:text-[#AA8C3C] bg-white border-gray-200 hover:border-[#AA8C3C]';

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
        const titleBgClass = activeTab === 'news' ? 'bg-[#AA8C3C]' : 'bg-blue-800';
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
            const newsRow = createNewsRow(item, activeTab === 'news', onNavigate);
            listContainer.appendChild(newsRow);
        });

        innerContainer.appendChild(listContainer);

        // Pagination
        //innerContainer.appendChild(createPagination(totalPages, 1)); ẩn ô số 1,2

        container.appendChild(innerContainer);
    }

    function createNewsRow(item, isNewsTab, onNavigate) {
        const categoryDisplay = item.category ? `<div class="text-sm text-gray-400 mb-2">${item.category}</div>` : '';

        const rowHtml = `
            <div class="news-row flex gap-6 items-start border-b border-blue-200 pb-6 pt-6 group cursor-pointer hover:bg-blue-50/50 transition-colors">
                <img src="${item.image || '/images/news/default.jpg'}" alt="${item.title}" class="w-56 h-36 object-cover rounded-md flex-shrink-0" />

                <div class="flex-1">
                    <h3 class="text-gray-800 font-bold text-lg group-hover:text-[#AA8C3C] transition-colors">
                        ${item.title}
                    </h3>
                    ${categoryDisplay}
                    <p class="text-gray-600 mt-2">${item.excerpt || ''}</p>
                </div>

                <div class="flex-shrink-0 text-xs text-gray-400 ml-4 whitespace-nowrap">${item.date}</div>
            </div>
        `;

        const row = createFromHTML(rowHtml);

        // Initialize Lucide icons (not required here but keep for consistency)
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Click -> maybe navigate/open detail in future
        row.addEventListener('click', () => {
            if (typeof onNavigate === 'function') {
                if (isNewsTab) {
                    onNavigate('news-detail', item.id);
                } else {
                    onNavigate('notif-detail', item.id);
                }
            } else {
                console.log('Open item', item.id);
            }
        });

        return row;
    }

    function createPagination(totalPages, currentPage) {
        const paginationHtml = `
            <div class="flex justify-center items-center mt-8 gap-1.5">
                <button class="w-8 h-8 flex items-center justify-center rounded bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors">
                    &lt;
                </button>
                <button class="w-8 h-8 flex items-center justify-center rounded bg-[#AA8C3C] text-white font-bold text-sm shadow-sm">1</button>
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

export function NewsPage({ onNavigate, initialTab } = {}) {
    const container = createElement('div', { className: 'bg-white min-h-[70vh] pb-16' });

    // Add banner
    container.appendChild(PageBanner({
        title: 'Tin tức & Thông báo',
        subtitle: 'Cập nhật thông tin',
        backgroundImage: '/images/banners/news_banner.png'
    }));

    // Add news section
    container.appendChild(NewsSection({ newsData, notifData, initialTab, onNavigate }));

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}
