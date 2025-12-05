/**
 * Notifications Management System
 * Manages user notifications
 */

import { notificationStore } from './state.js';
import { getAuthState } from './auth.js';

/**
 * Notification types
 */
export const NOTIFICATION_TYPES = {
    BID_PLACED: 'bid_placed',
    OUTBID: 'outbid',
    AUCTION_WON: 'auction_won',
    AUCTION_LOST: 'auction_lost',
    PAYMENT: 'payment',
    REGISTRATION: 'registration',
    SYSTEM: 'system'
};

/**
 * Create notification
 * @param {Object} data - Notification data
 * @param {string} data.userId - User ID (email)
 * @param {string} data.type - Notification type
 * @param {string} data.title - Notification title
 * @param {string} data.message - Notification message
 * @param {Object} data.data - Additional data
 */
export function createNotification(data) {
    const state = notificationStore.get();
    const notifications = state.items || [];

    const notification = {
        id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        data: data.data || {},
        read: false,
        createdAt: new Date().toISOString()
    };

    notifications.unshift(notification); // Add to beginning

    // Keep only last 100 notifications
    const trimmed = notifications.slice(0, 100);

    notificationStore.set({
        items: trimmed,
        unreadCount: trimmed.filter(n => !n.read).length
    });
}

/**
 * Get user notifications
 * @param {boolean} unreadOnly - Get only unread notifications
 * @returns {Array} Notifications
 */
export function getUserNotifications(unreadOnly = false) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        return [];
    }

    const state = notificationStore.get();
    const notifications = state.items || [];
    let userNotifs = notifications.filter(n => n.userId === authState.user.email);

    if (unreadOnly) {
        userNotifs = userNotifs.filter(n => !n.read);
    }

    return userNotifs;
}

/**
 * Get unread count
 * @returns {number} Unread count
 */
export function getUnreadCount() {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        return 0;
    }

    const notifications = getUserNotifications(true);
    return notifications.length;
}

/**
 * Mark notification as read
 * @param {string} notificationId - Notification ID
 */
export function markAsRead(notificationId) {
    const state = notificationStore.get();
    const notifications = state.items || [];
    const notification = notifications.find(n => n.id === notificationId);

    if (notification && !notification.read) {
        notification.read = true;
        notification.readAt = new Date().toISOString();

        notificationStore.set({
            items: [...notifications],
            unreadCount: notifications.filter(n => !n.read).length
        });
    }
}

/**
 * Mark all as read
 */
export function markAllAsRead() {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        return;
    }

    const state = notificationStore.get();
    const notifications = state.items || [];

    notifications.forEach(n => {
        if (n.userId === authState.user.email && !n.read) {
            n.read = true;
            n.readAt = new Date().toISOString();
        }
    });

    notificationStore.set({
        items: [...notifications],
        unreadCount: notifications.filter(n => !n.read).length
    });
}

/**
 * Delete notification
 * @param {string} notificationId - Notification ID
 */
export function deleteNotification(notificationId) {
    const state = notificationStore.get();
    const notifications = state.items || [];
    const filtered = notifications.filter(n => n.id !== notificationId);

    notificationStore.set({
        items: filtered,
        unreadCount: filtered.filter(n => !n.read).length
    });
}

/**
 * Clear all notifications
 */
export function clearAllNotifications() {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        return;
    }

    const state = notificationStore.get();
    const notifications = state.items || [];
    const filtered = notifications.filter(n => n.userId !== authState.user.email);

    notificationStore.set({
        items: filtered,
        unreadCount: filtered.filter(n => !n.read).length
    });
}

/**
 * Subscribe to notification changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToNotifications(callback) {
    return notificationStore.subscribe((state) => {
        callback(state.items || [], state.unreadCount || 0);
    });
}

/**
 * Get notification icon based on type
 * @param {string} type - Notification type
 * @returns {string} Lucide icon name
 */
export function getNotificationIcon(type) {
    const icons = {
        [NOTIFICATION_TYPES.BID_PLACED]: 'gavel',
        [NOTIFICATION_TYPES.OUTBID]: 'alert-triangle',
        [NOTIFICATION_TYPES.AUCTION_WON]: 'trophy',
        [NOTIFICATION_TYPES.AUCTION_LOST]: 'x-circle',
        [NOTIFICATION_TYPES.PAYMENT]: 'credit-card',
        [NOTIFICATION_TYPES.REGISTRATION]: 'check-circle',
        [NOTIFICATION_TYPES.SYSTEM]: 'info'
    };

    return icons[type] || 'bell';
}

/**
 * Get notification color based on type
 * @param {string} type - Notification type
 * @returns {string} Color class
 */
export function getNotificationColor(type) {
    const colors = {
        [NOTIFICATION_TYPES.BID_PLACED]: 'text-blue-600',
        [NOTIFICATION_TYPES.OUTBID]: 'text-yellow-600',
        [NOTIFICATION_TYPES.AUCTION_WON]: 'text-green-600',
        [NOTIFICATION_TYPES.AUCTION_LOST]: 'text-red-600',
        [NOTIFICATION_TYPES.PAYMENT]: 'text-purple-600',
        [NOTIFICATION_TYPES.REGISTRATION]: 'text-green-600',
        [NOTIFICATION_TYPES.SYSTEM]: 'text-gray-600'
    };

    return colors[type] || 'text-gray-600';
}

export default {
    NOTIFICATION_TYPES,
    createNotification,
    getUserNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    subscribeToNotifications,
    getNotificationIcon,
    getNotificationColor
};
