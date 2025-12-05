/**
 * Countdown Timer Component
 * Displays countdown timer for auction items
 */

/**
 * Creates a countdown timer element
 * @param {Object} options - Configuration options
 * @param {Date|string} options.endTime - End time (Date object or ISO string)
 * @param {Function} options.onComplete - Callback when timer reaches zero
 * @param {boolean} options.showDays - Show days (default: true)
 * @param {string} options.className - Additional CSS classes
 * @returns {HTMLElement} Countdown timer element
 */
export function CountdownTimer({
    endTime,
    onComplete = null,
    showDays = true,
    className = ''
} = {}) {
    const container = document.createElement('div');
    container.className = `countdown-timer ${className}`;

    const endDate = typeof endTime === 'string' ? new Date(endTime) : endTime;
    let intervalId = null;

    const updateTimer = () => {
        const now = new Date();
        const diff = endDate - now;

        if (diff <= 0) {
            // Timer expired
            container.innerHTML = `
                <div class="flex items-center gap-2 text-red-600 font-bold">
                    <i data-lucide="clock" class="w-4 h-4"></i>
                    <span>Đã kết thúc</span>
                </div>
            `;

            if (intervalId) {
                clearInterval(intervalId);
            }

            if (onComplete) {
                onComplete();
            }

            // Re-initialize Lucide icons
            if (window.lucide) {
                window.lucide.createIcons();
            }

            return;
        }

        // Calculate time units
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Determine color based on time remaining
        let colorClass = 'text-gray-700 dark:text-gray-300';
        if (diff < 3600000) { // Less than 1 hour
            colorClass = 'text-red-600 dark:text-red-400';
        } else if (diff < 86400000) { // Less than 1 day
            colorClass = 'text-yellow-600 dark:text-yellow-400';
        }

        // Build timer HTML
        let timerHTML = `<div class="flex items-center gap-2 ${colorClass} font-mono font-semibold">`;
        timerHTML += '<i data-lucide="clock" class="w-4 h-4"></i>';

        if (showDays && days > 0) {
            timerHTML += `<span>${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span>`;
        } else {
            timerHTML += `<span>${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</span>`;
        }

        timerHTML += '</div>';
        container.innerHTML = timerHTML;

        // Re-initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    // Initial update
    updateTimer();

    // Update every second
    intervalId = setInterval(updateTimer, 1000);

    // Store interval ID for cleanup
    container.dataset.intervalId = intervalId;

    return container;
}

/**
 * Stop countdown timer
 * @param {HTMLElement} timer - Timer element
 */
export function stopCountdown(timer) {
    const intervalId = timer.dataset.intervalId;
    if (intervalId) {
        clearInterval(parseInt(intervalId));
    }
}

export default CountdownTimer;
