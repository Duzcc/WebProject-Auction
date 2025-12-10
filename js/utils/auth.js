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
 * Get all registered users from localStorage
 * @returns {Array} Array of user objects
 */
function getRegisteredUsers() {
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
 * @param {Array} users - Array of user objects
 */
function saveUsers(users) {
    try {
        localStorage.setItem('vpa_users', JSON.stringify(users));
    } catch (error) {
        console.error('Error saving users:', error);
    }
}

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.name - Full name
 * @param {string} userData.email - Email address
 * @param {string} userData.password - Password
 * @returns {Object} Result object with success status and message
 */
export function register(userData) {
    const { name, email, password } = userData;

    // Validate inputs
    if (!name || name.trim().length < 3) {
        return { success: false, message: 'Họ tên phải có ít nhất 3 ký tự' };
    }

    if (!email || !email.includes('@')) {
        return { success: false, message: 'Email không hợp lệ' };
    }

    if (!password || password.length < 6) {
        return { success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
    }

    // Check if email already exists
    const users = getRegisteredUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
        return { success: false, message: 'Email đã được đăng ký' };
    }

    // Create new user
    const newUser = {
        id: `user_${Date.now()}`,
        name: name.trim(),
        email: email.toLowerCase(),
        password: password, // In production, hash this!
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563EB&color=fff`
    };

    users.push(newUser);
    saveUsers(users);

    return { success: true, message: 'Đăng ký thành công! Vui lòng đăng nhập.' };
}

/**
 * Authenticate user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Result object with success status, message, and user data
 */
export function authenticate(email, password) {
    if (!email || !password) {
        return { success: false, message: 'Vui lòng nhập email và mật khẩu' };
    }

    const users = getRegisteredUsers();
    const user = users.find(u =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!user) {
        return { success: false, message: 'Email hoặc mật khẩu không đúng' };
    }

    // Don't return password
    const { password: _, ...userWithoutPassword } = user;
    return {
        success: true,
        message: 'Đăng nhập thành công',
        user: userWithoutPassword
    };
}

/**
 * Save current user's cart before switching
 * @param {string} userId - User ID
 */
function saveUserCart(userId) {
    try {
        const cart = localStorage.getItem('vpa-cart');
        const auctions = localStorage.getItem('vpa-auctions');

        if (cart || auctions) {
            const userData = {
                cart: cart ? JSON.parse(cart) : null,
                auctions: auctions ? JSON.parse(auctions) : null,
                savedAt: new Date().toISOString()
            };

            localStorage.setItem(`vpa-user-${userId}`, JSON.stringify(userData));
            console.log('💾 Saved cart for user:', userId);
        }
    } catch (error) {
        console.error('Error saving user cart:', error);
    }
}

/**
 * Load user's cart data
 * @param {string} userId - User ID
 */
function loadUserCart(userId) {
    try {
        const userDataStr = localStorage.getItem(`vpa-user-${userId}`);

        if (userDataStr) {
            const userData = JSON.parse(userDataStr);

            // Restore cart
            if (userData.cart) {
                localStorage.setItem('vpa-cart', JSON.stringify(userData.cart));
                console.log('📦 Restored cart for user:', userId);
            } else {
                localStorage.removeItem('vpa-cart');
            }

            // Restore auctions/payments
            if (userData.auctions) {
                localStorage.setItem('vpa-auctions', JSON.stringify(userData.auctions));
                console.log('📜 Restored auction history for user:', userId);
            } else {
                localStorage.removeItem('vpa-auctions');
            }
        } else {
            // New user - start with empty cart
            localStorage.removeItem('vpa-cart');
            localStorage.removeItem('vpa-auctions');
            console.log('🆕 New user - starting with empty cart');
        }
    } catch (error) {
        console.error('Error loading user cart:', error);
    }
}

/**
 * Login user and create session
 * @param {Object} userData - User data
 * @param {string} userData.email - User email
 * @param {string} userData.name - User name  
 * @param {string} userData.avatar - User avatar URL (optional)
 * @param {string} userData.id - User ID
 */
export function login(userData) {
    // TEMPORARY: Disabled per-user cart to fix display issue
    // TODO: Re-implement properly after testing

    const user = {
        email: userData.email,
        name: userData.name || userData.email.split('@')[0],
        avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || userData.email)}&background=2563EB&color=fff`,
        id: userData.id
    };

    const sessionData = {
        user,
        cartCount: 0,
        notificationCount: 3
    };

    saveSession(sessionData);
    authState.set({
        isAuthenticated: true,
        user,
        cartCount: 0,
        notificationCount: 3
    });

    // Clear session storage
    sessionStorage.removeItem('currentOrder');

    console.log('✅ Logged in as:', user.email);

    // Update cart count and sync notifications
    setTimeout(() => {
        try {
            const cart = localStorage.getItem('vpa-cart');
            if (cart) {
                const cartData = JSON.parse(cart);
                const unpaidCount = cartData.items?.filter(item => !item.paid).length || 0;
                authState.set({ cartCount: unpaidCount });

                // Sync cart notifications
                import('./notifications.js').then(({ syncCartNotifications }) => {
                    syncCartNotifications();
                });
            }
        } catch (error) {
            console.error('Error updating cart count:', error);
        }
    }, 100);
}

/**
 * Logout user and clear session
 */
export function logout() {
    // TEMPORARY: Keep cart when logout (shared cart mode)
    // Clear session only
    localStorage.removeItem('vpa_session');
    sessionStorage.removeItem('currentOrder');

    authState.set({
        isAuthenticated: false,
        user: null,
        cartCount: 0,
        notificationCount: 0
    });

    console.log('👋 Logged out');
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
