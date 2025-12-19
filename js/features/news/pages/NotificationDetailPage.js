/**
 * NotificationDetailPage - Trang chi tiết thông báo
 * Displays full notification with images and content
 */

import { createElement, createFromHTML, initIcons } from '../../../shared/utils/dom.js';
import { notifData } from '../../../data/constants.js';

/**
 * NotificationDetailPage Component
 * @param {Object} props - Component props
 * @param {string} props.id - Notification ID
 * @param {Function} props.onNavigate - Navigation callback
 * @returns {HTMLElement} Notification detail page element
 */
export function NotificationDetailPage({ id, onNavigate } = {}) {
    const item = notifData.find(n => n.id === parseInt(id)) || null;

    const container = createElement('div', { className: 'container mx-auto px-4 py-12' });

    // If notification not found, show error message
    if (!item) {
        const notFound = createFromHTML(`
            <div class="text-center py-16">
                <i data-lucide="bell-off" class="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Thông báo không tồn tại</h2>
                <p class="text-gray-500 mb-6">Thông báo bạn tìm không tồn tại hoặc đã bị xóa.</p>
                <button id="back-to-notif" class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">
                    <i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-2"></i>
                    Quay lại
                </button>
            </div>
        `);

        const backBtn = notFound.querySelector('#back-to-notif');
        if (backBtn && typeof onNavigate === 'function') {
            backBtn.addEventListener('click', () => onNavigate('news', null, 'notif'));
        }

        container.appendChild(notFound);
        initIcons(container);
        return container;
    }

    // Render notification detail
    const html = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
            <!-- Header Section -->
            <div class="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white px-6 py-6 border-b-2 border-blue-400">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-3">
                            <i data-lucide="bell" class="w-5 h-5 text-blue-200"></i>
                            <span class="inline-block bg-blue-500/30 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                Thông báo
                            </span>
                        </div>
                        <h1 class="text-2xl md:text-3xl font-extrabold mb-2">${item.title}</h1>
                        <div class="flex items-center gap-3 text-sm text-blue-100">
                            <span class="flex items-center gap-1">
                                <i data-lucide="calendar" class="w-4 h-4"></i>
                                ${item.date}
                            </span>
                            <span class="flex items-center gap-1">
                                <i data-lucide="tag" class="w-4 h-4"></i>
                                ${item.source || 'Thông báo'}
                            </span>
                        </div>
                    </div>
                    <button 
                        id="back-to-notif" 
                        class="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-sm text-white transition-all duration-300 flex items-center gap-2 whitespace-nowrap ml-4"
                    >
                        <i data-lucide="arrow-left" class="w-4 h-4"></i>
                        Quay lại
                    </button>
                </div>
            </div>

            <!-- Featured Image -->
            ${item.image ? `
                <div class="relative overflow-hidden">
                    <img 
                        src="${item.image}" 
                        alt="${item.title}" 
                        class="w-full h-64 md:h-96 object-cover"
                        onerror="this.src='https://via.placeholder.com/1200x600?text=No+Image'"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
            ` : ''}

            <!-- Excerpt -->
            ${item.excerpt ? `
                <div class="px-6 py-6 bg-blue-50 border-l-4 border-blue-600">
                    <p class="text-lg text-gray-700 italic leading-relaxed">${item.excerpt}</p>
                </div>
            ` : ''}

            <!-- Notification Content -->
            <div class="px-6 py-8">
                <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    ${item.content || item.excerpt || '<p>Nội dung đang được cập nhật...</p>'}
                </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-6 bg-gray-50 border-t border-gray-200">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div class="text-sm text-gray-500">
                        <i data-lucide="info" class="w-4 h-4 inline-block mr-1"></i>
                        Nguồn: Công ty Đấu giá hợp danh Việt Nam (VPA)
                    </div>
                    <button 
                        id="back-to-notif-bottom" 
                        class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                        <i data-lucide="arrow-left" class="w-4 h-4"></i>
                        Quay lại danh sách
                    </button>
                </div>
            </div>
        </div>
    `;

    const detail = createFromHTML(html);
    container.appendChild(detail);

    // Add event listeners for back buttons
    const backBtns = container.querySelectorAll('#back-to-notif, #back-to-notif-bottom');
    backBtns.forEach(btn => {
        if (btn && typeof onNavigate === 'function') {
            btn.addEventListener('click', () => onNavigate('news', null, 'notif'));
        }
    });

    // Initialize Lucide icons
    initIcons(container);

    return container;
}

export default NotificationDetailPage;
