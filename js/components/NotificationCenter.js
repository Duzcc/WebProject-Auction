/**
 * Notification Center Component
 * Dropdown notification center for header
 */

import { getUserNotifications, getUnreadCount, markAsRead, markAllAsRead, subscribeToNotifications, getNotificationIcon, getNotificationColor } from '../utils/notifications.js';
import { createElement } from '../utils/dom.js';

export function NotificationCenter() {
    const container = createElement('div', { className: 'relative notification-center' });

    let isOpen = false;
    let unreadCount = getUnreadCount();

    // Notification bell button
    const button = createElement('button', {
        className: 'relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200'
    });

    const updateButton = () => {
        unreadCount = getUnreadCount();
        button.innerHTML = `
            <i data-lucide="bell" class="w-5 h-5 text-gray-700 dark:text-gray-300"></i>
            ${unreadCount > 0 ? `<span class="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">${unreadCount > 9 ? '9+' : unreadCount}</span>` : ''}
        `;

        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    updateButton();

    // Dropdown
    const dropdown = createElement('div', {
        className: 'absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 hidden z-50'
    });

    const renderDropdown = () => {
        const notifications = getUserNotifications();

        dropdown.innerHTML = `
            <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 class="font-bold text-gray-900 dark:text-white">Thông Báo</h3>
                ${notifications.length > 0 ? '<button id="mark-all-read" class="text-sm text-[#2563EB] hover:underline">Đánh dấu đã đọc</button>' : ''}
            </div>
            <div class="max-h-96 overflow-y-auto">
                ${notifications.length === 0 ? `
                    <div class="p-8 text-center">
                        <i data-lucide="bell-off" class="w-12 h-12 text-gray-400 mx-auto mb-3"></i>
                        <p class="text-gray-600 dark:text-gray-400">Không có thông báo mới</p>
                    </div>
                ` : notifications.map(notif => `
                    <div class="notification-item p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${notif.read ? 'opacity-60' : ''}" data-id="${notif.id}">
                        <div class="flex gap-3">
                            <div class="flex-shrink-0">
                                <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    <i data-lucide="${getNotificationIcon(notif.type)}" class="w-5 h-5 ${getNotificationColor(notif.type)}"></i>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-semibold text-gray-900 dark:text-white text-sm mb-1">${notif.title}</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">${notif.message}</p>
                                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">${formatTime(notif.createdAt)}</p>
                            </div>
                            ${!notif.read ? '<div class="w-2 h-2 bg-[#2563EB] rounded-full flex-shrink-0"></div>' : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Mark all as read handler
        const markAllBtn = dropdown.querySelector('#mark-all-read');
        if (markAllBtn) {
            markAllBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                markAllAsRead();
            });
        }

        // Individual notification click
        dropdown.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                markAsRead(id);
            });
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    // Toggle dropdown
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        isOpen = !isOpen;

        if (isOpen) {
            dropdown.classList.remove('hidden');
            renderDropdown();
        } else {
            dropdown.classList.add('hidden');
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && isOpen) {
            isOpen = false;
            dropdown.classList.add('hidden');
        }
    });

    // Subscribe to notification changes
    subscribeToNotifications(() => {
        updateButton();
        if (isOpen) {
            renderDropdown();
        }
    });

    container.appendChild(button);
    container.appendChild(dropdown);

    return container;
}

function formatTime(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    if (days < 7) return `${days} ngày trước`;

    return time.toLocaleDateString('vi-VN');
}

export default NotificationCenter;
