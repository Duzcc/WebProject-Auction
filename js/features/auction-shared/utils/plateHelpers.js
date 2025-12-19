/**
 * Plate Auction Helper Utilities
 * Utility functions for license plate auction operations
 */

import { calculateDeposit as calcDepositUtil, DEPOSIT_PERCENTAGE } from './deposit.js';

/**
 * Calculate deposit amount (20% of start price)
 * @param {string} startPriceStr - Price string (e.g., "40.000.000 VNĐ")
 * @returns {number} Deposit amount
 */
export function calculateDeposit(startPriceStr) {
    const price = parsePrice(startPriceStr);
    return calcDepositUtil(price, DEPOSIT_PERCENTAGE);
}

/**
 * Parse price string to number
 * @param {string} priceStr - Price string with formatting
 * @returns {number} Numeric price value
 */
export function parsePrice(priceStr) {
    if (!priceStr) return 0;
    // Remove all non-digit characters
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
}

/**
 * Parse auction time string to Date object
 * @param {string} timeStr -
 * @returns {Date} Date object
 */
export function parseAuctionDate(timeStr) {
    if (!timeStr) return new Date();

    const match = timeStr.match(/(?:(\d{2}):(\d{2})\s+)?(\d{2})\/(\d{2})\/(\d{4})/);

    if (!match) return new Date();

    const [, hour = '09', minute = '00', day, month, year] = match;
    return new Date(year, month - 1, day, parseInt(hour), parseInt(minute));
}

/**
 * Format price to Vietnamese currency string
 * @param {number} price - Numeric price
 * @returns {string} Formatted price string
 */
export function formatPrice(price) {
    if (!price) return '0 VNĐ';
    return price.toLocaleString('vi-VN') + ' VNĐ';
}

/**
 * Format deposit info display
 * @param {number} depositAmount - Deposit amount
 * @param {number} percentage - Percentage of start price (default 20)
 * @returns {string} Formatted deposit info
 */
export function formatDepositInfo(depositAmount, percentage = 20) {
    return `${formatPrice(depositAmount)} (${percentage}% giá khởi điểm)`;
}

export default {
    calculateDeposit,
    parsePrice,
    parseAuctionDate,
    formatPrice,
    formatDepositInfo
};
