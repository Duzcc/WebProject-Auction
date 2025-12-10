// Simple state management utility for Vanilla JS

/**
 * Creates a reactive state object
 * @param {Object} initialState - Initial state values
 * @returns {Object} State object with get, set, and subscribe methods
 */
export function createState(initialState) {
    let state = { ...initialState };
    const subscribers = [];

    return {
        /**
         * Get current state
         * @returns {Object} Current state
         */
        get() {
            return { ...state };
        },

        /**
         * Update state and notify subscribers
         * @param {Object} updates - State updates
         */
        set(updates) {
            state = { ...state, ...updates };
            subscribers.forEach(callback => callback(state));
        },

        /**
         * Subscribe to state changes
         * @param {Function} callback - Callback function to call on state change
         * @returns {Function} Unsubscribe function
         */
        subscribe(callback) {
            subscribers.push(callback);
            // Return unsubscribe function
            return () => {
                const index = subscribers.indexOf(callback);
                if (index > -1) {
                    subscribers.splice(index, 1);
                }
            };
        }
    };
}

/**
 * Creates a persistent state (saves to localStorage)
 * @param {string} key - localStorage key
 * @param {Object} initialState - Initial state
 * @returns {Object} Persistent state object
 */
export function createPersistentState(key, initialState = {}) {
    // Load from localStorage
    let savedState = initialState;
    try {
        const saved = localStorage.getItem(key);
        if (saved) {
            savedState = { ...initialState, ...JSON.parse(saved) };
        }
    } catch (error) {
        console.error(`Error loading state from localStorage (${key}):`, error);
    }

    const state = createState(savedState);

    // Override set to save to localStorage
    const originalSet = state.set.bind(state);
    state.set = function (updates) {
        originalSet(updates);
        try {
            localStorage.setItem(key, JSON.stringify(state.get()));
        } catch (error) {
            console.error(`Error saving state to localStorage (${key}):`, error);
        }
    };

    return state;
}

// Global stores for application state
export const userStore = createPersistentState('vpa-user', {
    profile: null,
    settings: {
        notifications: true,
        emailUpdates: true,
        language: 'vi'
    }
});

export const cartStore = createPersistentState('vpa-cart', {
    items: [],
    total: 0
});

export const auctionStore = createPersistentState('vpa-auctions', {
    registrations: [],
    bids: [],
    deposits: [],
    payments: [],
    history: []
});

export const notificationStore = createPersistentState('vpa-notifications', {
    items: [],
    unreadCount: 0
});

export default {
    createState,
    createPersistentState,
    userStore,
    cartStore,
    auctionStore,
    notificationStore
};
