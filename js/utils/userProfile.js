/**
 * User Profile Management
 * Manages user profile data and settings
 */

import { userStore } from './state.js';
import { getAuthState } from './auth.js';

/**
 * Get user profile
 * @returns {Object|null} User profile
 */
export function getUserProfile() {
    return userStore.get('profile');
}

/**
 * Update user profile
 * @param {Object} updates - Profile updates
 */
export function updateUserProfile(updates) {
    const currentProfile = getUserProfile() || {};
    const authState = getAuthState();

    userStore.set('profile', {
        ...currentProfile,
        ...updates,
        email: authState.user?.email || currentProfile.email,
        updatedAt: new Date().toISOString()
    });
}

/**
 * Initialize user profile from auth
 */
export function initUserProfile() {
    const authState = getAuthState();

    if (authState.isAuthenticated && !getUserProfile()) {
        userStore.set('profile', {
            email: authState.user.email,
            fullName: authState.user.fullName || '',
            phone: '',
            address: '',
            city: '',
            avatar: authState.user.avatar || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }
}

/**
 * Upload avatar (convert to base64)
 * @param {File} file - Image file
 * @returns {Promise<string>} Base64 string
 */
export function uploadAvatar(file) {
    return new Promise((resolve, reject) => {
        if (!file.type.startsWith('image/')) {
            reject(new Error('File must be an image'));
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            reject(new Error('Image size must be less than 2MB'));
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const base64 = e.target.result;
            updateUserProfile({ avatar: base64 });
            resolve(base64);
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
}

/**
 * Get user settings
 * @returns {Object} User settings
 */
export function getUserSettings() {
    return userStore.get('settings') || {
        notifications: true,
        emailUpdates: true,
        language: 'vi'
    };
}

/**
 * Update user settings
 * @param {Object} updates - Settings updates
 */
export function updateUserSettings(updates) {
    const currentSettings = getUserSettings();
    userStore.set('settings', {
        ...currentSettings,
        ...updates
    });
}

/**
 * Get user activity history
 * @returns {Array} Activity history
 */
export function getUserActivity() {
    // This would come from auction history, bids, etc.
    // For now, return empty array
    return [];
}

/**
 * Subscribe to profile changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToProfile(callback) {
    return userStore.subscribe((state) => {
        callback(state.profile);
    });
}

export default {
    getUserProfile,
    updateUserProfile,
    initUserProfile,
    uploadAvatar,
    getUserSettings,
    updateUserSettings,
    getUserActivity,
    subscribeToProfile
};
