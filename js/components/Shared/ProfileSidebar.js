/**
 * Profile Sidebar Component - VPA Style
 * Navigation menu for profile-related pages
 */

import { createElement } from '../../utils/dom.js';

export function ProfileSidebar({ activePage = 'cart', onNavigate }) {
    const menuItems = [
        { id: 'profile', icon: 'user', label: 'Thông tin tài khoản' },
        { id: 'cart', icon: 'shopping-cart', label: 'Giỏ hàng' },
        { id: 'pending-plates', icon: 'clock', label: 'Biển số chờ đấu giá' },
        { id: 'auction-history', icon: 'history', label: 'Lịch sử đấu giá' },
        { id: 'documents', icon: 'file-text', label: 'Tài liệu của tôi' }
    ];

    const sidebar = createElement('div', {
        className: 'w-64 bg-white border-r border-gray-200 flex-shrink-0'
    });

    const nav = createElement('nav', { className: 'p-6 space-y-2' });

    menuItems.forEach(item => {
        const isActive = item.id === activePage;

        const menuItem = createElement('button', {
            className: `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-900 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                }`
        });

        menuItem.innerHTML = `
            <i data-lucide="${item.icon}" class="w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}"></i>
            <span>${item.label}</span>
        `;

        menuItem.addEventListener('click', () => {
            if (onNavigate) {
                onNavigate(item.id);
            }
        });

        nav.appendChild(menuItem);
    });

    sidebar.appendChild(nav);

    // Initialize icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return sidebar;
}

export default ProfileSidebar;
