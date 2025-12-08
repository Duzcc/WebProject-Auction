/**
 * Navigation Helper
 * Centralized routing and navigation management
 */

// Route constants
export const ROUTES = {
    HOME: '#/',
    CARS: '#/cars',
    MOTORBIKES: '#/motorbikes',
    ASSETS: '#/assets',
    NEWS: '#/news',
    ABOUT: '#/about',
    NOTIFICATIONS: '#/notifications',
    CART: '#/cart',
    CHECKOUT: '#/checkout',
    PAYMENT: '#/payment',
    PAYMENT_SUCCESS: '#/payment-success',
    PAYMENT_FAILURE: '#/payment-failure',
    DASHBOARD: '#/auction-history',
    PROFILE: '#/profile',
    LOGIN: '#/login'
};

/**
 * Navigate to a route
 * @param {string} route - Route constant from ROUTES
 * @param {Object} options - Navigation options
 * @param {boolean} options.replace - Replace history instead of push
 * @param {Object} options.state - State to store in session
 */
export function navigateTo(route, options = {}) {
    const { replace = false, state = null } = options;

    // Store state if provided
    if (state) {
        sessionStorage.setItem('navigationState', JSON.stringify(state));
    }

    // Navigate
    if (replace) {
        window.location.replace(route);
    } else {
        window.location.hash = route;
    }
}

/**
 * Get navigation state from session
 * @returns {Object|null} Stored state
 */
export function getNavigationState() {
    const state = sessionStorage.getItem('navigationState');
    if (state) {
        sessionStorage.removeItem('navigationState');
        return JSON.parse(state);
    }
    return null;
}

/**
 * Go back in history
 */
export function goBack() {
    window.history.back();
}

/**
 * Get current route
 * @returns {string} Current hash
 */
export function getCurrentRoute() {
    return window.location.hash || ROUTES.HOME;
}

/**
 * Check if current route matches
 * @param {string} route - Route to check
 * @returns {boolean} Match status
 */
export function isCurrentRoute(route) {
    return getCurrentRoute() === route;
}

export default {
    ROUTES,
    navigateTo,
    getNavigationState,
    goBack,
    getCurrentRoute,
    isCurrentRoute
};
