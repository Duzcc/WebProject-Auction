// Authentication and Session Management Utility

import { createState } from './state.js';

// Session expiry time (24 hours in milliseconds)
const SESSION_EXPIRY = 24 * 60 * 60 * 1000;

// Create auth state
const authState = createState({
    isAuthenticated: false,
    user: null,
    cartCount: 0,
    notificationCount: 0
});

/**
 * Initialize auth state from localStorage
 */
function initAuth() {
    const session = getSession();
    if (session) {
        authState.set({
            isAuthenticated: true,
            user: session.user,
            cartCount: session.cartCount || 0,
            notificationCount: session.notificationCount || 0
        });
    }
}

/**
 * Get current session from localStorage
 * @returns {Object|null} Session object or null if expired/not found
 */
function getSession() {
    try {
        const sessionData = localStorage.getItem('vpa_session');
        if (!sessionData) return null;

        const session = JSON.parse(sessionData);
        const now = Date.now();

        // Check if session is expired
        if (session.expiresAt && now > session.expiresAt) {
            localStorage.removeItem('vpa_session');
            return null;
        }

        return session;
    } catch (error) {
        console.error('Error getting session:', error);
        return null;
    }
}

/**
 * Save session to localStorage
 * @param {Object} sessionData - Session data to save
 */
function saveSession(sessionData) {
    try {
        const session = {
            ...sessionData,
            expiresAt: Date.now() + SESSION_EXPIRY
        };
        localStorage.setItem('vpa_session', JSON.stringify(session));
    } catch (error) {
        console.error('Error saving session:', error);
    }
}

/**
 * Login user and create session
 * @param {Object} userData - User data
 * @param {string} userData.email - User email
 * @param {string} userData.name - User name
 * @param {string} userData.avatar - User avatar URL (optional)
 */
export function login(userData) {
    const user = {
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
        avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || userData.email)}&background=be1e2d&color=fff`
    };

    const sessionData = {
        user,
        cartCount: 0,
        notificationCount: 3 // Default notification count
    };

    saveSession(sessionData);
    authState.set({
        isAuthenticated: true,
        user,
        cartCount: 0,
        notificationCount: 3
    });
}

/**
 * Logout user and clear session
 */
export function logout() {
    localStorage.removeItem('vpa_session');
    authState.set({
        isAuthenticated: false,
        user: null,
        cartCount: 0,
        notificationCount: 0
    });
}

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export function isAuthenticated() {
    return authState.get().isAuthenticated;
}

/**
 * Get current user
 * @returns {Object|null} User object or null
 */
export function getCurrentUser() {
    return authState.get().user;
}

/**
 * Get auth state
 * @returns {Object} Auth state
 */
export function getAuthState() {
    return authState.get();
}

/**
 * Subscribe to auth state changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToAuth(callback) {
    return authState.subscribe(callback);
}

/**
 * Update cart count
 * @param {number} count - New cart count
 */
export function updateCartCount(count) {
    const session = getSession();
    if (session) {
        session.cartCount = count;
        saveSession(session);
    }
    authState.set({ cartCount: count });
}

/**
 * Update notification count
 * @param {number} count - New notification count
 */
export function updateNotificationCount(count) {
    const session = getSession();
    if (session) {
        session.notificationCount = count;
        saveSession(session);
    }
    authState.set({ notificationCount: count });
}

// Initialize auth on module load
initAuth();
