import { createElement, createFromHTML } from '../../utils/dom.js';
import { newsData } from '../../data/constants.js';

export function NewsDetailPage({ id, onNavigate } = {}) {
    const item = newsData.find(n => n.id === id) || null;

    const container = createElement('div', { className: 'container mx-auto px-4 py-12' });

    if (!item) {
        const notFound = createFromHTML(`<div class="text-center py-16"><h2 class="text-2xl font-bold">Bài viết không tồn tại</h2><p class="text-gray-500 mt-4">Bài viết bạn tìm không tồn tại hoặc đã bị xóa.</p></div>`);
        container.appendChild(notFound);
        return container;
    }

    const html = `
        <div class="max-w-4xl mx-auto bg-white p-6 rounded shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h1 class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-2">${item.title}</h1>
                    <div class="text-sm text-gray-400">${item.category || ''} • ${item.date}</div>
                </div>
                <div>
                    <button class="px-3 py-2 border rounded text-sm text-gray-600 hover:bg-gray-100" id="back-to-news">Quay lại</button>
                </div>
            </div>

            <img src="${item.image || '/images/news/default.jpg'}" alt="${item.title}" class="w-full h-64 object-cover rounded mb-6" />

            <div class="prose max-w-none text-gray-700">${item.content || item.excerpt || ''}</div>
        </div>
    `;

    const detail = createFromHTML(html);
    container.appendChild(detail);

    const backBtn = container.querySelector('#back-to-news');
    if (backBtn && typeof onNavigate === 'function') {
        backBtn.addEventListener('click', () => onNavigate('news'));
    }

    return container;
}
