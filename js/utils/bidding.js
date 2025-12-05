/**
 * Bidding System
 * Manages auction bids and bidding logic
 */

import { auctionStore } from './state.js';
import { getAuthState } from './auth.js';
import { createNotification } from './notifications.js';
import toast from './toast.js';

/**
 * Place a bid
 * @param {Object} bidData - Bid data
 * @param {string} bidData.auctionId - Auction ID
 * @param {string} bidData.itemName - Item name
 * @param {number} bidData.amount - Bid amount
 * @param {number} bidData.currentPrice - Current highest bid
 * @param {number} bidData.minIncrement - Minimum bid increment
 * @returns {boolean} Success status
 */
export function placeBid(bidData) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        toast.error('Vui lòng đăng nhập để đặt giá');
        return false;
    }

    // Validate bid amount
    const minBid = bidData.currentPrice + bidData.minIncrement;
    if (bidData.amount < minBid) {
        toast.error(`Giá đặt phải lớn hơn ${minBid.toLocaleString('vi-VN')} VNĐ`);
        return false;
    }

    const bids = auctionStore.get('bids') || [];

    // Create bid
    const bid = {
        id: `bid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        auctionId: bidData.auctionId,
        userId: authState.user.email,
        userName: authState.user.fullName || authState.user.email,
        itemName: bidData.itemName,
        amount: bidData.amount,
        timestamp: new Date().toISOString(),
        status: 'active' // active, outbid, won, lost
    };

    // Mark previous bids as outbid
    bids.forEach(b => {
        if (b.auctionId === bidData.auctionId && b.status === 'active' && b.userId !== authState.user.email) {
            b.status = 'outbid';

            // Notify outbid user (simulated)
            createNotification({
                userId: b.userId,
                type: 'outbid',
                title: 'Bạn đã bị trả giá cao hơn',
                message: `Ai đó đã đặt giá cao hơn bạn cho "${bidData.itemName}"`,
                data: { auctionId: bidData.auctionId }
            });
        }
    });

    bids.push(bid);
    auctionStore.set('bids', bids);

    toast.success('Đặt giá thành công!');

    // Create notification for user
    createNotification({
        userId: authState.user.email,
        type: 'bid_placed',
        title: 'Đặt giá thành công',
        message: `Bạn đã đặt giá ${bidData.amount.toLocaleString('vi-VN')} VNĐ cho "${bidData.itemName}"`,
        data: { auctionId: bidData.auctionId, amount: bidData.amount }
    });

    return true;
}

/**
 * Get bid history for auction
 * @param {string} auctionId - Auction ID
 * @returns {Array} Bid history
 */
export function getBidHistory(auctionId) {
    const bids = auctionStore.get('bids') || [];
    return bids
        .filter(bid => bid.auctionId === auctionId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

/**
 * Get current highest bid
 * @param {string} auctionId - Auction ID
 * @returns {Object|null} Highest bid
 */
export function getCurrentHighestBid(auctionId) {
    const history = getBidHistory(auctionId);
    return history.length > 0 ? history[0] : null;
}

/**
 * Get user's bids
 * @param {string} status - Optional filter by status
 * @returns {Array} User's bids
 */
export function getUserBids(status = null) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        return [];
    }

    const bids = auctionStore.get('bids') || [];
    let userBids = bids.filter(bid => bid.userId === authState.user.email);

    if (status) {
        userBids = userBids.filter(bid => bid.status === status);
    }

    return userBids.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

/**
 * Check if user has active bid on auction
 * @param {string} auctionId - Auction ID
 * @returns {boolean} Has active bid
 */
export function hasActiveBid(auctionId) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        return false;
    }

    const bids = auctionStore.get('bids') || [];
    return bids.some(
        bid => bid.auctionId === auctionId &&
            bid.userId === authState.user.email &&
            bid.status === 'active'
    );
}

/**
 * Get user's active bid for auction
 * @param {string} auctionId - Auction ID
 * @returns {Object|null} Active bid
 */
export function getUserActiveBid(auctionId) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        return null;
    }

    const bids = auctionStore.get('bids') || [];
    return bids.find(
        bid => bid.auctionId === auctionId &&
            bid.userId === authState.user.email &&
            bid.status === 'active'
    ) || null;
}

/**
 * Mark auction as won
 * @param {string} auctionId - Auction ID
 */
export function markAuctionWon(auctionId) {
    const bids = auctionStore.get('bids') || [];
    const highestBid = getCurrentHighestBid(auctionId);

    if (highestBid) {
        bids.forEach(bid => {
            if (bid.auctionId === auctionId) {
                if (bid.id === highestBid.id) {
                    bid.status = 'won';

                    // Notify winner
                    createNotification({
                        userId: bid.userId,
                        type: 'auction_won',
                        title: 'Chúc mừng! Bạn đã thắng đấu giá',
                        message: `Bạn đã thắng đấu giá "${bid.itemName}" với giá ${bid.amount.toLocaleString('vi-VN')} VNĐ`,
                        data: { auctionId, amount: bid.amount }
                    });
                } else if (bid.status === 'active' || bid.status === 'outbid') {
                    bid.status = 'lost';
                }
            }
        });

        auctionStore.set('bids', bids);
    }
}

/**
 * Subscribe to bid changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToBids(callback) {
    return auctionStore.subscribe((state) => {
        callback(state.bids || []);
    });
}

export default {
    placeBid,
    getBidHistory,
    getCurrentHighestBid,
    getUserBids,
    hasActiveBid,
    getUserActiveBid,
    markAuctionWon,
    subscribeToBids
};
