/**
 * State Management Helpers
 * DRY utilities for working with state stores
 */

/**
 * Get a property from a state store
 * @param {Object} store - State store instance
 * @param {string} property - Property name
 * @param {*} defaultValue - Default value if property doesn't exist
 * @returns {*} Property value
 */
export function getStateProperty(store, property, defaultValue = []) {
    try {
        const state = store.get();
        return state[property] !== undefined ? state[property] : defaultValue;
    } catch (error) {
        console.error(`Error getting state property ${property}:`, error);
        return defaultValue;
    }
}

/**
 * Set a property in a state store
 * @param {Object} store - State store instance
 * @param {string} property - Property name
 * @param {*} value - Value to set
 */
export function setStateProperty(store, property, value) {
    try {
        store.set({ [property]: value });
    } catch (error) {
        console.error(`Error setting state property ${property}:`, error);
    }
}

/**
 * Update multiple properties in a state store
 * @param {Object} store - State store instance
 * @param {Object} updates - Object with properties to update
 */
export function updateState(store, updates) {
    try {
        store.set(updates);
    } catch (error) {
        console.error('Error updating state:', error);
    }
}

/**
 * Get entire state from store
 * @param {Object} store - State store instance
 * @returns {Object} Full state object
 */
export function getFullState(store) {
    try {
        return store.get();
    } catch (error) {
        console.error('Error getting full state:', error);
        return {};
    }
}

export default {
    getStateProperty,
    setStateProperty,
    updateState,
    getFullState
};
