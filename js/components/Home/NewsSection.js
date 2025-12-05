import { createElement, createFromHTML } from '../../utils/dom.js';

/**
 * NewsSection Component
 * Displays news and notifications with tab navigation
 */
export function NewsSection({ newsData = [], notifData = [] }) {
    let activeTab = 'news';
    const container = createElement('div', { className: 'py-16 bg-white' });

    function render() {
        container.innerHTML = '';

        const innerContainer = createElement('div', { className: 'container mx-auto px-4' });

        // Tab Navigation
        const tabNav = createElement('div', { className: 'flex gap-1 mb-6 border-b border-gray-200' });

        const newsTabClass = activeTab === 'news'
            ? 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 bg-[#be1e2d] text-white border-[#be1e2d]'
            : 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 text-gray-500 hover:text-[#be1e2d] bg-white border-gray-200 hover:border-[#be1e2d]';

        const notifTabClass = activeTab === 'notif'
            ? 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 bg-[#be1e2d] text-white border-[#be1e2d]'
            : 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors border-b-2 text-gray-500 hover:text-[#be1e2d] bg-white border-gray-200 hover:border-[#be1e2d]';

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
        const titleBgClass = activeTab === 'news' ? 'bg-[#be1e2d]' : 'bg-red-800';
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
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-red-200 pb-4 pt-4 group cursor-pointer hover:bg-red-50/50 transition-colors">
                <div class="flex items-start gap-3 w-full md:w-3/4">
                    <i data-lucide="chevrons-right" class="text-[#be1e2d] mt-1 flex-shrink-0" style="width: 20px; height: 20px;"></i>
                    <h3 class="text-gray-800 font-medium text-base group-hover:text-[#be1e2d] transition-colors">
                        <span class="text-gray-500 font-normal text-sm mr-1">${categoryDisplay}</span>
                        ${item.title}
                    </h3>
                </div>
                <div class="flex items-center gap-4 mt-2 md:mt-0 md:w-1/4 md:justify-end">
                    ${item.source ? `
                        <span class="text-[#be1e2d] border border-[#be1e2d] bg-red-50 px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap">
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
                <button class="w-8 h-8 flex items-center justify-center rounded bg-[#be1e2d] text-white font-bold text-sm shadow-sm">1</button>
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
