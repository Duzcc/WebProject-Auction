/**
 * Theme Management System
 * Handles dark/light mode toggle and persistence
 */

const THEME_KEY = 'vpa-theme';
const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
};

// State
let currentTheme = THEMES.LIGHT;
let subscribers = [];

/**
 * Initialize theme system
 */
export function initTheme() {
    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme) {
        currentTheme = savedTheme;
    } else {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        currentTheme = prefersDark ? THEMES.DARK : THEMES.LIGHT;
    }

    applyTheme(currentTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            const newTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
            setTheme(newTheme);
        }
    });
}

/**
 * Apply theme to document
 * @param {string} theme - Theme to apply
 */
function applyTheme(theme) {
    if (theme === THEMES.DARK) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Notify subscribers
    subscribers.forEach(callback => callback(theme));
}

/**
 * Set theme
 * @param {string} theme - Theme to set
 */
export function setTheme(theme) {
    if (!Object.values(THEMES).includes(theme)) {
        console.error(`Invalid theme: ${theme}`);
        return;
    }

    currentTheme = theme;
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
}

/**
 * Toggle between light and dark theme
 */
export function toggleTheme() {
    const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    setTheme(newTheme);
}

/**
 * Get current theme
 * @returns {string} Current theme
 */
export function getCurrentTheme() {
    return currentTheme;
}

/**
 * Check if dark mode is active
 * @returns {boolean} True if dark mode
 */
export function isDarkMode() {
    return currentTheme === THEMES.DARK;
}

/**
 * Subscribe to theme changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToTheme(callback) {
    subscribers.push(callback);

    // Return unsubscribe function
    return () => {
        subscribers = subscribers.filter(cb => cb !== callback);
    };
}

/**
 * Create theme toggle button
 * @returns {HTMLElement} Theme toggle button
 */
export function createThemeToggle() {
    const button = document.createElement('button');
    button.className = 'theme-toggle p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors';
    button.setAttribute('aria-label', 'Toggle theme');
    button.title = 'Toggle dark mode';

    const updateIcon = (theme) => {
        const icon = theme === THEMES.DARK ? 'sun' : 'moon';
        button.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5 text-gray-700 dark:text-gray-300"></i>`;

        // Re-initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    // Set initial icon
    updateIcon(currentTheme);

    // Subscribe to theme changes
    subscribeToTheme(updateIcon);

    // Toggle on click
    button.addEventListener('click', () => {
        toggleTheme();
    });

    return button;
}

// Initialize theme on module load
initTheme();

export default {
    initTheme,
    setTheme,
    toggleTheme,
    getCurrentTheme,
    isDarkMode,
    subscribeToTheme,
    createThemeToggle,
    THEMES
};
