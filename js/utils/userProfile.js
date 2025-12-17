/**
 * User Profile Management
 * Manages user profile data stored per-user in localStorage
 */

import { getAuthState } from './auth.js';
import { validateProfileUpdate, sanitizeProfileInput, profileValidators, fieldNames } from './validation.js';
import { errorTracker } from './errorTracker.js';
import toast from './toast.js';

/**
 * Get all users from localStorage
 * @returns {Array} Array of users
 */
function getAllUsers() {
    try {
        const users = localStorage.getItem('vpa_users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('Error getting users:', error);
        return [];
    }
}

/**
 * Save users to localStorage
 * @param {Array} users - Users array
 */
function saveAllUsers(users) {
    try {
        localStorage.setItem('vpa_users', JSON.stringify(users));
    } catch (error) {
        console.error('Error saving users:', error);
    }
}

/**
 * Get current user from vpa_users
 * @returns {Object|null} User object
 */
function getCurrentUser() {
    const authState = getAuthState();
    if (!authState.isAuthenticated || !authState.user?.id) {
        return null;
    }

    const users = getAllUsers();
    return users.find(u => u.id === authState.user.id) || null;
}

/**
 * Update current user in vpa_users
 * @param {Object} updates - Updates to apply
 */
function updateCurrentUser(updates) {
    const authState = getAuthState();
    if (!authState.isAuthenticated || !authState.user?.id) {
        console.error('No authenticated user');
        return;
    }

    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.id === authState.user.id);

    if (userIndex !== -1) {
        users[userIndex] = {
            ...users[userIndex],
            ...updates
        };
        saveAllUsers(users);
    }
}

/**
 * Get user profile
 * @returns {Object|null} User profile
 */
export function getUserProfile() {
    const user = getCurrentUser();
    if (!user) return null;

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        fullName: user.fullName || user.name,
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        avatar: user.avatar || null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt || user.createdAt
    };
}

/**
 * Update user profile
 * @param {Object} updates - Profile updates
 * @returns {boolean} Success status
 */
export function updateUserProfile(updates) {
    try {
        const authState = getAuthState();
        if (!authState.isAuthenticated) {
            toast.error('User not authenticated');
            return false;
        }

        // Sanitize inputs
        const sanitized = sanitizeProfileInput(updates);

        // Validate updates
        const validation = validateProfileUpdate(sanitized);
        if (!validation.valid) {
            // Show first error
            const firstError = Object.values(validation.errors)[0];
            toast.error(firstError);
            console.error('❌ Profile validation errors:', validation.errors);
            return false;
        }

        // Update user in vpa_users
        updateCurrentUser({
            fullName: sanitized.fullName || sanitized.name,
            name: sanitized.fullName || sanitized.name, // Keep name in sync
            phone: sanitized.phone,
            address: sanitized.address,
            city: sanitized.city,
            avatar: sanitized.avatar,
            updatedAt: new Date().toISOString()
        });

        console.log('✅ Profile updated successfully');
        toast.success('Cập nhật thông tin thành công');
        return true;
    } catch (error) {
        console.error('Error updating profile:', error);
        errorTracker.logError('userProfile.updateUserProfile', error, { fields: Object.keys(updates) });
        toast.error('Lỗi cập nhật thông tin');
        return false;
    }
}

/**
 * Initialize user profile (no longer needed - data comes from vpa_users)
 */
export function initUserProfile() {
    // Profile is created during registration
    // No need to init separately
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
 * Get user settings (placeholder - can be added to user object later)
 * @returns {Object} User settings
 */
export function getUserSettings() {
    const user = getCurrentUser();
    return user?.settings || {
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
    updateCurrentUser({
        settings: {
            ...currentSettings,
            ...updates
        }
    });
}

/**
 * Get user activity history
 * @returns {Array} Activity history
 */
export function getUserActivity() {
    // This would come from auction history, bids, etc.
    return [];
}

/**
 * Subscribe to profile changes (simplified - no reactive state)
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToProfile(callback) {
    // For now, return empty unsubscribe
    // In future, can implement proper event system
    return () => { };
}

/**
 * Get profile completeness score
 * @returns {Object} { score: 0-100, missing: Array, isComplete: boolean }
 */
export function getProfileCompleteness() {
    const profile = getUserProfile();
    if (!profile) {
        return { score: 0, missing: [], isComplete: false };
    }

    const fields = {
        fullName: { weight: 20, value: profile.fullName },
        email: { weight: 20, value: profile.email },
        phone: { weight: 20, value: profile.phone },
        address: { weight: 20, value: profile.address },
        city: { weight: 10, value: profile.city },
        avatar: { weight: 10, value: profile.avatar }
    };

    let score = 0;
    const missing = [];

    Object.entries(fields).forEach(([key, config]) => {
        if (config.value && String(config.value).trim() !== '') {
            score += config.weight;
        } else {
            missing.push(key);
        }
    });

    return {
        score,
        missing,
        isComplete: score === 100
    };
}

/**
 * Validate user info for checkout
 * @param {Object} user - User object (optional, will get current user if not provided)
 * @returns {Object} { valid: boolean, missing: Array }
 */
export function validateUserInfoForCheckout(user = null) {
    if (!user) {
        user = getUserProfile();
    }

    if (!user) {
        return {
            valid: false,
            missing: ['fullName', 'phone', 'address', 'city']
        };
    }

    const requiredFields = ['fullName', 'phone', 'address', 'city'];
    const missing = [];

    requiredFields.forEach(field => {
        const value = user[field];
        if (!value || String(value).trim() === '') {
            missing.push(field);
        }
    });

    return {
        valid: missing.length === 0,
        missing
    };
}

export default {
    getUserProfile,
    updateUserProfile,
    initUserProfile,
    uploadAvatar,
    getUserSettings,
    updateUserSettings,
    getUserActivity,
    subscribeToProfile,
    getProfileCompleteness,
    validateUserInfoForCheckout
};
