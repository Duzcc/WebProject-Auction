/**
 * NewsDetailPage - Trang chi tiết tin tức
 * Displays full news article with images and content
 */

import { createElement, createFromHTML, initIcons } from '../../../shared/utils/dom.js';
import { newsData } from '../../../data/constants.js';

/**
 * NewsDetailPage Component
 * @param {Object} props - Component props
 * @param {string} props.id - News article ID
 * @param {Function} props.onNavigate - Navigation callback
 * @returns {HTMLElement} News detail page element
 */
export function NewsDetailPage({ id, onNavigate } = {}) {
    const item = newsData.find(n => n.id === parseInt(id)) || null;

    const container = createElement('div', { className: 'container mx-auto px-4 py-12' });

    // If article not found, show error message
    if (!item) {
        const notFound = createFromHTML(`
            <div class="text-center py-16">
                <i data-lucide="file-x" class="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Bài viết không tồn tại</h2>
                <p class="text-gray-500 mb-6">Bài viết bạn tìm không tồn tại hoặc đã bị xóa.</p>
                <button id="back-to-news" class="bg-gradient-to-r from-[#AA8C3C] to-[#8B7530] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">
                    <i data-lucide="arrow-left" class="w-4 h-4 inline-block mr-2"></i>
                    Quay lại
                </button>
            </div>
        `);

        const backBtn = notFound.querySelector('#back-to-news');
        if (backBtn && typeof onNavigate === 'function') {
            backBtn.addEventListener('click', () => onNavigate('news'));
        }

        container.appendChild(notFound);
        initIcons(container);
        return container;
    }

    // Render article detail
    const html = `
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
            <!-- Header Section -->
            <div class="bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white px-6 py-6 border-b-2 border-[#AA8C3C]">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex-1">
                        ${item.category ? `<span class="inline-block bg-[#AA8C3C]/20 text-[#AA8C3C] px-3 py-1 rounded-full text-xs font-semibold mb-3">${item.category}</span>` : ''}
                        <h1 class="text-2xl md:text-3xl font-extrabold mb-2">${item.title}</h1>
                        <div class="flex items-center gap-3 text-sm text-gray-300">
                            <span class="flex items-center gap-1">
                                <i data-lucide="calendar" class="w-4 h-4"></i>
                                ${item.date}
                            </span>
                            <span class="flex items-center gap-1">
                                <i data-lucide="tag" class="w-4 h-4"></i>
                                ${item.source || 'Tin tức'}
                            </span>
                        </div>
                    </div>
                    <button 
                        id="back-to-news" 
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
                <div class="px-6 py-6 bg-gray-50 border-l-4 border-[#AA8C3C]">
                    <p class="text-lg text-gray-700 italic leading-relaxed">${item.excerpt}</p>
                </div>
            ` : ''}

            <!-- Article Content -->
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
                        Nguồn: ${item.source || 'Tin tức VPA'}
                    </div>
                    <button 
                        id="back-to-news-bottom" 
                        class="bg-gradient-to-r from-[#AA8C3C] to-[#8B7530] text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-2"
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
    const backBtns = container.querySelectorAll('#back-to-news, #back-to-news-bottom');
    backBtns.forEach(btn => {
        if (btn && typeof onNavigate === 'function') {
            btn.addEventListener('click', () => onNavigate('news'));
        }
    });

    // Initialize Lucide icons
    initIcons(container);

    return container;
}

export default NewsDetailPage;
