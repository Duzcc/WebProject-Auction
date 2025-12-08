import { createElement } from '../../utils/dom.js';

/**
 * Enhanced CountdownTimer Component
 * Displays countdown with warning states and auto-refresh
 * @param {Object} options
 * @param {string} options.endTime - End time in ISO format or Date string
 * @param {Function} options.onExpire - Callback when timer expires
 * @param {boolean} options.autoRefresh - Auto refresh page on expiry (default: false)
 * @param {string} options.className - Additional CSS classes
 */
export function CountdownTimer({ endTime, onExpire, autoRefresh = false, className = '' }) {
    const container = createElement('div', {
        className: `countdown-timer inline-flex items-center gap-2 ${className}`
    });

    let intervalId = null;
    let hasExpired = false;

    function getTimeRemaining() {
        const end = new Date(endTime).getTime();
        const now = Date.now();
        const remaining = end - now;

        if (remaining <= 0) {
            return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            total: remaining,
            days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
            hours: Math.floor((remaining / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((remaining / 1000 / 60) % 60),
            seconds: Math.floor((remaining / 1000) % 60)
        };
    }

    function getWarningState(totalMs) {
        const totalMinutes = totalMs / (1000 * 60);

        if (totalMs <= 0) return 'expired';
        if (totalMinutes < 1) return 'critical'; // < 1 minute - red
        if (totalMinutes < 10) return 'urgent'; // < 10 minutes - orange
        if (totalMinutes < 60) return 'warning'; // < 1 hour - yellow
        return 'normal'; // > 1 hour - green
    }

    function getStateStyles(state) {
        const styles = {
            expired: {
                bg: 'bg-gray-100',
                text: 'text-gray-600',
                icon: 'clock-off',
                pulse: false
            },
            critical: {
                bg: 'bg-red-50',
                text: 'text-red-700',
                icon: 'alarm-clock',
                pulse: true
            },
            urgent: {
                bg: 'bg-orange-50',
                text: 'text-orange-700',
                icon: 'clock',
                pulse: true
            },
            warning: {
                bg: 'bg-blue-50',
                text: 'text-blue-700',
                icon: 'clock',
                pulse: false
            },
            normal: {
                bg: 'bg-blue-50',
                text: 'text-blue-700',
                icon: 'clock',
                pulse: false
            }
        };
        return styles[state] || styles.normal;
    }

    function formatTime(time) {
        const { days, hours, minutes, seconds, total } = time;

        if (total <= 0) {
            return 'Đã kết thúc';
        }

        const parts = [];
        if (days > 0) parts.push(`${days} ngày`);
        if (hours > 0 || days > 0) parts.push(`${hours}h`);
        if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
        parts.push(`${seconds}s`);

        return parts.join(' ');
    }

    function update() {
        const time = getTimeRemaining();
        const state = getWarningState(time.total);
        const styles = getStateStyles(state);
        const timeString = formatTime(time);

        const pulseClass = styles.pulse ? 'animate-pulse' : '';

        container.innerHTML = `
            <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg ${styles.bg} ${pulseClass} transition-all">
                <i data-lucide="${styles.icon}" class="w-4 h-4 ${styles.text}"></i>
                <span class="text-sm font-semibold ${styles.text}">${timeString}</span>
            </div>
        `;

        // Re-initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Handle expiry
        if (time.total <= 0 && !hasExpired) {
            hasExpired = true;
            handleExpiry();
        }
    }

    function handleExpiry() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }

        if (onExpire) {
            onExpire();
        }

        if (autoRefresh) {
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    function start() {
        update(); // Initial update
        intervalId = setInterval(update, 1000); // Update every second
    }

    function stop() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    // Auto-start
    start();

    // Cleanup on element removal
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.removedNodes.forEach((node) => {
                if (node === container || node.contains(container)) {
                    stop();
                }
            });
        });
    });

    if (container.parentNode) {
        observer.observe(container.parentNode, { childList: true });
    }

    return container;
}

export default CountdownTimer;
