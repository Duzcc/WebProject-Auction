/**
 * Advanced Search Bar Component
 * Search with debounce, suggestions, and history
 */

import { debounce } from '../utils/debounce.js';

const SEARCH_HISTORY_KEY = 'vpa-search-history';
const MAX_HISTORY_ITEMS = 5;

/**
 * Creates an advanced search bar
 * @param {Object} options - Configuration options
 * @param {string} options.placeholder - Placeholder text
 * @param {Function} options.onSearch - Search callback
 * @param {Function} options.onSuggestionClick - Suggestion click callback
 * @param {Array} options.suggestions - Array of suggestions
 * @param {number} options.debounceTime - Debounce time in ms (default: 300)
 * @param {boolean} options.showHistory - Show search history (default: true)
 * @returns {HTMLElement} Search bar element
 */
export function SearchBar({
    placeholder = 'Tìm kiếm...',
    onSearch = null,
    onSuggestionClick = null,
    suggestions = [],
    debounceTime = 300,
    showHistory = true
} = {}) {
    const container = document.createElement('div');
    container.className = 'search-bar relative w-full';

    // Search input
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'relative';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.className = 'w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 pl-10 pr-10 text-sm focus:outline-none focus:border-[#AA8C3C] focus:ring-2 focus:ring-red-200 dark:bg-gray-800 dark:text-white transition-all';

    // Search icon
    const searchIcon = document.createElement('i');
    searchIcon.setAttribute('data-lucide', 'search');
    searchIcon.className = 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4';

    // Clear button
    const clearBtn = document.createElement('button');
    clearBtn.className = 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors hidden';
    clearBtn.innerHTML = '<i data-lucide="x" class="w-4 h-4"></i>';
    clearBtn.type = 'button';

    inputWrapper.appendChild(searchIcon);
    inputWrapper.appendChild(input);
    inputWrapper.appendChild(clearBtn);
    container.appendChild(inputWrapper);

    // Suggestions dropdown with animation
    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto z-50 hidden animate-scale-in';
    dropdown.style.transformOrigin = 'top';
    container.appendChild(dropdown);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Debounced search handler
    const debouncedSearch = debounce((value) => {
        if (onSearch) {
            onSearch(value);
        }

        // Save to history
        if (value.trim() && showHistory) {
            saveToHistory(value.trim());
        }
    }, debounceTime);

    // Input event handler
    input.addEventListener('input', (e) => {
        const value = e.target.value;

        // Show/hide clear button
        if (value) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }

        // Show suggestions or history
        if (value.trim()) {
            showSuggestions(dropdown, suggestions.filter(s =>
                s.toLowerCase().includes(value.toLowerCase())
            ), onSuggestionClick);
        } else if (showHistory) {
            showSearchHistory(dropdown, onSuggestionClick);
        } else {
            dropdown.classList.add('hidden');
        }

        // Trigger search
        debouncedSearch(value);
    });

    // Focus event - show history
    input.addEventListener('focus', () => {
        if (!input.value && showHistory) {
            showSearchHistory(dropdown, onSuggestionClick);
        }
    });

    // Clear button handler
    clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.classList.add('hidden');
        dropdown.classList.add('hidden');
        if (onSearch) {
            onSearch('');
        }
        input.focus();
    });

    // Click outside to close dropdown
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    return container;
}

/**
 * Show suggestions in dropdown with highlighting
 * @param {HTMLElement} dropdown - The dropdown element
 * @param {Array<string>} suggestions - Array of suggestion strings
 * @param {Function} onSuggestionClick - Callback for suggestion click
 * @param {string} [searchTerm=''] - The current search term to highlight
 */
function showSuggestions(dropdown, suggestions, onSuggestionClick, searchTerm = '') {
    if (suggestions.length === 0) {
        dropdown.classList.add('hidden');
        return;
    }

    dropdown.innerHTML = '';
    dropdown.classList.remove('hidden');

    suggestions.forEach(suggestion => {
        const item = document.createElement('button');
        item.className = 'w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors';

        // Highlight matching text
        let highlighted = suggestion;
        if (searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            highlighted = suggestion.replace(regex, '<mark class="bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-semibold">$1</mark>');
        }

        item.innerHTML = `
            <i data-lucide="search" class="w-4 h-4 text-gray-400"></i>
            <span>${highlighted}</span>
        `;

        item.addEventListener('click', () => {
            if (onSuggestionClick) {
                onSuggestionClick(suggestion);
            }
            dropdown.classList.add('hidden');
        });

        dropdown.appendChild(item);
    });

    // Re-initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Show search history in dropdown
 */
function showSearchHistory(dropdown, onSuggestionClick) {
    const history = getSearchHistory();

    if (history.length === 0) {
        dropdown.classList.add('hidden');
        return;
    }

    dropdown.innerHTML = '';
    dropdown.classList.remove('hidden');

    // Header
    const header = document.createElement('div');
    header.className = 'px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 flex items-center justify-between border-b border-gray-200 dark:border-gray-700';
    header.innerHTML = `
        <span>Tìm kiếm gần đây</span>
        <button class="clear-history text-[#AA8C3C] hover:underline">Xóa</button>
    `;
    dropdown.appendChild(header);

    // Clear history handler
    header.querySelector('.clear-history').addEventListener('click', (e) => {
        e.stopPropagation();
        clearSearchHistory();
        dropdown.classList.add('hidden');
    });

    // History items
    history.forEach(item => {
        const historyItem = document.createElement('button');
        historyItem.className = 'w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors';
        historyItem.innerHTML = `
            <i data-lucide="clock" class="w-4 h-4 text-gray-400"></i>
            <span class="flex-1">${item}</span>
            <i data-lucide="arrow-up-left" class="w-3 h-3 text-gray-400"></i>
        `;

        historyItem.addEventListener('click', () => {
            if (onSuggestionClick) {
                onSuggestionClick(item);
            }
            dropdown.classList.add('hidden');
        });

        dropdown.appendChild(historyItem);
    });

    // Re-initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Get search history from localStorage
 */
function getSearchHistory() {
    try {
        const history = localStorage.getItem(SEARCH_HISTORY_KEY);
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Error loading search history:', error);
        return [];
    }
}

/**
 * Save search term to history
 */
function saveToHistory(term) {
    try {
        let history = getSearchHistory();

        // Remove if already exists
        history = history.filter(item => item !== term);

        // Add to beginning
        history.unshift(term);

        // Limit to MAX_HISTORY_ITEMS
        history = history.slice(0, MAX_HISTORY_ITEMS);

        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
        console.error('Error saving search history:', error);
    }
}

/**
 * Clear search history
 */
function clearSearchHistory() {
    try {
        localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
        console.error('Error clearing search history:', error);
    }
}

export default SearchBar;
