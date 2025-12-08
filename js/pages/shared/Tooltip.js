/**
 * Tooltip Component
 * Professional tooltips for contextual help
 */

import { createElement } from '../../utils/dom.js';

/**
 * Create and attach tooltip to element
 * @param {HTMLElement} element - Element to attach tooltip to
 * @param {Object} options - Tooltip configuration
 */
export function Tooltip(element, {
    content = '',
    position = 'top', // top, bottom, left, right
    theme = 'dark', // dark, light
    delay = 200,
    className = ''
} = {}) {
    let tooltipElement = null;
    let showTimeout = null;
    let hideTimeout = null;

    // Create tooltip element
    function createTooltip() {
        tooltipElement = createElement('div', {
            className: `tooltip-container ${theme === 'dark' ? 'tooltip-dark' : 'tooltip-light'} ${className}`
        });

        tooltipElement.innerHTML = `
            <div class="tooltip-arrow"></div>
            <div class="tooltip-content">${content}</div>
        `;

        // Styling
        tooltipElement.style.cssText = `
            position: fixed;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;

        document.body.appendChild(tooltipElement);
        return tooltipElement;
    }

    // Position tooltip
    function positionTooltip() {
        if (!tooltipElement) return;

        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        const gap = 8; // Gap between element and tooltip

        let top, left;

        switch (position) {
            case 'top':
                top = rect.top - tooltipRect.height - gap;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = rect.bottom + gap;
                left = rect.left + (rect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.left - tooltipRect.width - gap;
                break;
            case 'right':
                top = rect.top + (rect.height - tooltipRect.height) / 2;
                left = rect.right + gap;
                break;
        }

        // Keep tooltip in viewport
        const padding = 10;
        top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding));
        left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding));

        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;
    }

    // Show tooltip
    function show() {
        clearTimeout(hideTimeout);
        showTimeout = setTimeout(() => {
            if (!tooltipElement) createTooltip();
            positionTooltip();
            tooltipElement.style.opacity = '1';
        }, delay);
    }

    // Hide tooltip
    function hide() {
        clearTimeout(showTimeout);
        hideTimeout = setTimeout(() => {
            if (tooltipElement) {
                tooltipElement.style.opacity = '0';
                setTimeout(() => {
                    if (tooltipElement) {
                        tooltipElement.remove();
                        tooltipElement = null;
                    }
                }, 200);
            }
        }, 100);
    }

    // Attach event listeners
    element.addEventListener('mouseenter', show);
    element.addEventListener('mouseleave', hide);
    element.addEventListener('focus', show);
    element.addEventListener('blur', hide);

    // Cleanup function
    return {
        destroy: () => {
            element.removeEventListener('mouseenter', show);
            element.removeEventListener('mouseleave', hide);
            element.removeEventListener('focus', show);
            element.removeEventListener('blur', hide);
            if (tooltipElement) {
                tooltipElement.remove();
                tooltipElement = null;
            }
        },
        updateContent: (newContent) => {
            content = newContent;
            if (tooltipElement) {
                const contentEl = tooltipElement.querySelector('.tooltip-content');
                if (contentEl) contentEl.innerHTML = newContent;
            }
        }
    };
}

/**
 * Add tooltip styles to document
 */
export function initTooltipStyles() {
    if (document.getElementById('tooltip-styles')) return;

    const style = document.createElement('style');
    style.id = 'tooltip-styles';
    style.textContent = `
        .tooltip-container {
            font-size: 14px;
            max-width: 250px;
            border-radius: 6px;
            padding: 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .tooltip-dark {
            background: #1f2937;
            color: white;
        }

        .tooltip-light {
            background: white;
            color: #1f2937;
            border: 1px solid #e5e7eb;
        }

        .tooltip-content {
            padding: 8px 12px;
            line-height: 1.4;
        }

        .tooltip-arrow {
            position: absolute;
            width: 8px;
            height: 8px;
            transform: rotate(45deg);
        }

        .tooltip-dark .tooltip-arrow {
            background: #1f2937;
        }

        .tooltip-light .tooltip-arrow {
            background: white;
            border: 1px solid #e5e7eb;
        }
    `;

    document.head.appendChild(style);
}

// Auto-init styles
if (typeof window !== 'undefined') {
    initTooltipStyles();
}

export default Tooltip;
