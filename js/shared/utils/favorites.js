/**
 * Favorites/Wishlist Management System
 * Manages user favorites with localStorage persistence
 */

import { createState } from './state.js';

const FAVORITES_KEY = 'vpa-favorites';

// Create reactive state for favorites
const favoritesState = createState({
    items: []
});

/**
 * Initialize favorites from localStorage
 */
export function initFavorites() {
    try {
        const saved = localStorage.getItem(FAVORITES_KEY);
        if (saved) {
            favoritesState.items = JSON.parse(saved);
        }
    } catch (error) {
        console.error('Error loading favorites:', error);
        favoritesState.items = [];
    }
}

/**
 * Save favorites to localStorage
 */
function saveFavorites() {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesState.items));
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
}

/**
 * Add item to favorites
 * @param {Object} item - Item to add
 * @param {string} item.id - Unique identifier
 * @param {string} item.type - Item type (car, motorbike, asset)
 * @param {Object} item.data - Item data
 */
export function addToFavorites(item) {
    // Check if already exists
    const exists = favoritesState.items.some(fav => fav.id === item.id && fav.type === item.type);

    if (!exists) {
        favoritesState.items = [...favoritesState.items, {
            ...item,
            addedAt: new Date().toISOString()
        }];
        saveFavorites();
        return true;
    }

    return false;
}

/**
 * Remove item from favorites
 * @param {string} id - Item ID
 * @param {string} type - Item type
 */
export function removeFromFavorites(id, type) {
    favoritesState.items = favoritesState.items.filter(
        item => !(item.id === id && item.type === type)
    );
    saveFavorites();
}

/**
 * Check if item is in favorites
 * @param {string} id - Item ID
 * @param {string} type - Item type
 * @returns {boolean} True if in favorites
 */
export function isFavorite(id, type) {
    return favoritesState.items.some(item => item.id === id && item.type === type);
}

/**
 * Toggle favorite status
 * @param {Object} item - Item to toggle
 * @returns {boolean} New favorite status
 */
export function toggleFavorite(item) {
    if (isFavorite(item.id, item.type)) {
        removeFromFavorites(item.id, item.type);
        return false;
    } else {
        addToFavorites(item);
        return true;
    }
}

/**
 * Get all favorites
 * @param {string} type - Optional filter by type
 * @returns {Array} Favorites array
 */
export function getFavorites(type = null) {
    if (type) {
        return favoritesState.items.filter(item => item.type === type);
    }
    return favoritesState.items;
}

/**
 * Get favorites count
 * @param {string} type - Optional filter by type
 * @returns {number} Count
 */
export function getFavoritesCount(type = null) {
    return getFavorites(type).length;
}

/**
 * Clear all favorites
 */
export function clearFavorites() {
    favoritesState.items = [];
    saveFavorites();
}

/**
 * Subscribe to favorites changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToFavorites(callback) {
    return favoritesState.subscribe(() => {
        callback(favoritesState.items);
    });
}

/**
 * Create favorite button component
 * @param {Object} item - Item data
 * @param {Function} onToggle - Optional callback
 * @returns {HTMLElement} Favorite button
 */
export function createFavoriteButton(item, onToggle = null) {
    const button = document.createElement('button');
    button.className = 'favorite-btn p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group';
    button.title = 'Thêm vào yêu thích';

    const updateButton = () => {
        const isFav = isFavorite(item.id, item.type);
        const iconClass = isFav ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-500';

        button.innerHTML = `<i data-lucide="heart" class="w-5 h-5 ${iconClass} transition-all duration-200"></i>`;
        button.title = isFav ? 'Xóa khỏi yêu thích' : 'Thêm vào yêu thích';

        // Re-initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    updateButton();

    // Subscribe to favorites changes
    subscribeToFavorites(updateButton);

    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const newStatus = toggleFavorite(item);

        // Add animation
        button.classList.add('animate-scale-in');
        setTimeout(() => {
            button.classList.remove('animate-scale-in');
        }, 400);

        if (onToggle) {
            onToggle(newStatus);
        }
    });

    return button;
}

// Initialize on module load
initFavorites();

export default {
    initFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    getFavorites,
    getFavoritesCount,
    clearFavorites,
    subscribeToFavorites,
    createFavoriteButton
};
