/**
 * Form Auto-Save Utility
 * Automatically saves form data to localStorage with debouncing
 */

/**
 * Create auto-save handler for a form
 * @param {HTMLFormElement} form - Form element to auto-save
 * @param {string} storageKey - localStorage key for saving
 * @param {Object} options - Options
 * @param {number} options.debounceMs - Debounce delay in ms (default: 1000)
 * @param {Function} options.onSave - Callback when saved
 * @param {Function} options.onRestore - Callback when restored
 * @returns {Object} Auto-save controller
 */
export function createFormAutoSave(form, storageKey, {
    debounceMs = 1000,
    onSave = null,
    onRestore = null
} = {}) {
    let saveTimeout = null;
    let isDirty = false;

    /**
     * Save form data to localStorage
     */
    function saveFormData() {
        const formData = new FormData(form);
        const data = {};

        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }

        try {
            localStorage.setItem(storageKey, JSON.stringify({
                data,
                savedAt: new Date().toISOString()
            }));

            isDirty = false;

            if (onSave) {
                onSave(data);
            }

            console.log('💾 Form auto-saved:', storageKey);
        } catch (error) {
            console.error('Failed to auto-save form:', error);
        }
    }

    /**
     * Restore form data from localStorage
     */
    function restoreFormData() {
        try {
            const stored = localStorage.getItem(storageKey);
            if (!stored) return false;

            const { data, savedAt } = JSON.parse(stored);

            // Check if data is not too old (e.g., 7 days)
            const savedDate = new Date(savedAt);
            const daysSinceUpdate = (Date.now() - savedDate.getTime()) / (1000 * 60 * 60 * 24);

            if (daysSinceUpdate > 7) {
                localStorage.removeItem(storageKey);
                return false;
            }

            // Restore form values
            for (const [key, value] of Object.entries(data)) {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = value;
                }
            }

            if (onRestore) {
                onRestore(data);
            }

            console.log('✅ Form data restored:', storageKey);
            return true;
        } catch (error) {
            console.error('Failed to restore form:', error);
            return false;
        }
    }

    /**
     * Handle form input with debouncing
     */
    function handleInput() {
        isDirty = true;

        if (saveTimeout) {
            clearTimeout(saveTimeout);
        }

        saveTimeout = setTimeout(() => {
            saveFormData();
        }, debounceMs);
    }

    /**
     * Clear saved form data
     */
    function clearSaved() {
        try {
            localStorage.removeItem(storageKey);
            console.log('🗑️ Cleared auto-saved form:', storageKey);
        } catch (error) {
            console.error('Failed to clear saved form:', error);
        }
    }

    // Attach input listeners
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', handleInput);
        input.addEventListener('change', handleInput);
    });

    // Return controller
    return {
        save: saveFormData,
        restore: restoreFormData,
        clear: clearSaved,
        isDirty: () => isDirty,
        destroy: () => {
            if (saveTimeout) clearTimeout(saveTimeout);
            inputs.forEach(input => {
                input.removeEventListener('input', handleInput);
                input.removeEventListener('change', handleInput);
            });
        }
    };
}

export default createFormAutoSave;
