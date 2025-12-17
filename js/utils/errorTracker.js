/**
 * Error Tracker
 * Centralized error logging and tracking for debugging
 */

class ErrorTracker {
    constructor() {
        this.storageKey = 'vpa-error-logs';
        this.maxErrors = 50; // Keep last 50 errors
    }

    /**
     * Log an error with context
     * @param {string} context - Where the error occurred (e.g., 'cart.addToCart', 'payment.submit')
     * @param {Error|string} error - The error object or message
     * @param {Object} metadata - Additional context data
     */
    logError(context, error, metadata = {}) {
        const errorLog = {
            id: `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            timestamp: new Date().toISOString(),
            context,
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : null,
            metadata,
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        try {
            // Get existing errors
            const errors = this.getErrors();

            // Add new error
            errors.push(errorLog);

            // Keep only last maxErrors
            const trimmedErrors = errors.slice(-this.maxErrors);

            // Save to localStorage
            localStorage.setItem(this.storageKey, JSON.stringify(trimmedErrors));

            // Also log to console in development
            console.error(`[${context}]`, error, metadata);

            return errorLog.id;
        } catch (storageError) {
            // If localStorage fails, at least log to console
            console.error('Failed to save error log:', storageError);
            console.error('Original error:', error);
            return null;
        }
    }

    /**
     * Log a warning (non-critical issue)
     * @param {string} context - Where the warning occurred
     * @param {string} message - Warning message
     * @param {Object} metadata - Additional context
     */
    logWarning(context, message, metadata = {}) {
        const warningLog = {
            id: `WARN-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
            timestamp: new Date().toISOString(),
            type: 'warning',
            context,
            message,
            metadata
        };

        try {
            const errors = this.getErrors();
            errors.push(warningLog);
            const trimmedErrors = errors.slice(-this.maxErrors);
            localStorage.setItem(this.storageKey, JSON.stringify(trimmedErrors));

            console.warn(`[${context}]`, message, metadata);

            return warningLog.id;
        } catch (error) {
            console.warn('Failed to save warning log:', error);
            return null;
        }
    }

    /**
     * Get all logged errors
     * @returns {Array} Array of error logs
     */
    getErrors() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to read error logs:', error);
            return [];
        }
    }

    /**
     * Get errors by context
     * @param {string} context - Context to filter by
     * @returns {Array} Filtered error logs
     */
    getErrorsByContext(context) {
        const errors = this.getErrors();
        return errors.filter(err => err.context === context);
    }

    /**
     * Get recent errors (last N errors)
     * @param {number} count - Number of errors to retrieve
     * @returns {Array} Recent error logs
     */
    getRecentErrors(count = 10) {
        const errors = this.getErrors();
        return errors.slice(-count);
    }

    /**
     * Clear all error logs
     */
    clearErrors() {
        try {
            localStorage.removeItem(this.storageKey);
            console.log('✅ Error logs cleared');
        } catch (error) {
            console.error('Failed to clear error logs:', error);
        }
    }

    /**
     * Get error statistics
     * @returns {Object} Error stats
     */
    getStats() {
        const errors = this.getErrors();
        const contexts = {};

        errors.forEach(err => {
            contexts[err.context] = (contexts[err.context] || 0) + 1;
        });

        return {
            total: errors.length,
            byContext: contexts,
            mostRecent: errors.length > 0 ? errors[errors.length - 1] : null
        };
    }

    /**
     * Export errors as JSON for debugging
     * @returns {string} JSON string of all errors
     */
    exportErrors() {
        const errors = this.getErrors();
        return JSON.stringify(errors, null, 2);
    }

    /**
     * Check if error rate is high (potential issue)
     * @param {number} timeWindowMs - Time window in milliseconds (default: 5 minutes)
     * @param {number} threshold - Number of errors to trigger alert
     * @returns {boolean} True if error rate is high
     */
    isErrorRateHigh(timeWindowMs = 5 * 60 * 1000, threshold = 10) {
        const errors = this.getErrors();
        const now = Date.now();
        const cutoff = now - timeWindowMs;

        const recentErrors = errors.filter(err => {
            const errorTime = new Date(err.timestamp).getTime();
            return errorTime >= cutoff;
        });

        return recentErrors.length >= threshold;
    }
}

// Create singleton instance
export const errorTracker = new ErrorTracker();

// Export class for testing
export default ErrorTracker;
