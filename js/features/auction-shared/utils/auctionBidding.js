/**
 * Auction Bidding Management System (Frontend-Only)
 * Handles real-time bidding simulation without backend
 */

import { auctionStore } from '../../../core/utils/state.js';
import { getAuthState } from '../../user/utils/auth.js';
import { createNotification, NOTIFICATION_TYPES } from '../../../shared/utils/notifications.js';
import toast from '../../../shared/utils/toast.js';

// Bid increment rules (in VND)
export const BID_INCREMENTS = {
    MIN: 1000000,      // 1 million VND minimum increment
    SMALL: 5000000,    // 5 million for bids < 100M
    MEDIUM: 10000000,  // 10 million for bids 100M-500M
    LARGE: 50000000    // 50 million for bids > 500M
};

/**
 * Get appropriate bid increment based on current bid
 * @param {number} currentBid - Current highest bid
 * @returns {number} Recommended increment
 */
export function getBidIncrement(currentBid) {
    if (currentBid < 100000000) { // < 100M
        return BID_INCREMENTS.SMALL;
    } else if (currentBid < 500000000) { // < 500M
        return BID_INCREMENTS.MEDIUM;
    } else {
        return BID_INCREMENTS.LARGE;
    }
}

/**
 * Validate bid amount
 * @param {string} auctionId - Auction ID
 * @param {number} bidAmount - Proposed bid amount
 * @returns {Object} Validation result
 */
export function validateBid(auctionId, bidAmount) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        return { valid: false, error: 'Vui lòng đăng nhập để đấu giá' };
    }

    // Get auction data
    const auction = getAuctionById(auctionId);
    if (!auction) {
        return { valid: false, error: 'Không tìm thấy phiên đấu giá' };
    }

    // Check if auction is active
    if (auction.status !== 'live') {
        return { valid: false, error: 'Phiên đấu giá chưa bắt đầu hoặc đã kết thúc' };
    }

    // Check if user is registered
    if (!auction.registeredUsers?.includes(authState.user.email)) {
        return { valid: false, error: 'Bạn chưa đăng ký đấu giá này' };
    }

    const currentBid = auction.currentBid || auction.startingPrice;
    const minIncrement = getBidIncrement(currentBid);
    const minBid = currentBid + minIncrement;

    // Validate bid amount
    if (bidAmount < minBid) {
        return {
            valid: false,
            error: `Giá đặt tối thiểu là ${minBid.toLocaleString('vi-VN')} VNĐ`
        };
    }

    // Check if bid is in valid increments
    if ((bidAmount - currentBid) % BID_INCREMENTS.MIN !== 0) {
        return {
            valid: false,
            error: `Giá đặt phải là bội số của ${BID_INCREMENTS.MIN.toLocaleString('vi-VN')} VNĐ`
        };
    }

    return { valid: true };
}

/**
 * Place a bid
 * @param {string} auctionId - Auction ID
 * @param {number} bidAmount - Bid amount
 * @returns {Object} Bid result
 */
export function placeBid(auctionId, bidAmount) {
    console.log('💰 Placing bid:', { auctionId, bidAmount });

    const validation = validateBid(auctionId, bidAmount);
    if (!validation.valid) {
        toast.error(validation.error);
        return { success: false, error: validation.error };
    }

    const authState = getAuthState();
    const auction = getAuctionById(auctionId);

    // Create bid record
    const bid = {
        id: `bid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        auctionId,
        userId: authState.user.email,
        userName: authState.user.name,
        amount: bidAmount,
        timestamp: new Date().toISOString(),
        status: 'active' // active, outbid, winning
    };

    // Update auction state
    const state = auctionStore.get();
    let bids = state.bids || [];
    let auctions = state.auctions || [];

    // Mark previous highest bid as outbid
    const previousHighestBid = bids
        .filter(b => b.auctionId === auctionId && b.status === 'winning')
        .sort((a, b) => b.amount - a.amount)[0];

    if (previousHighestBid) {
        previousHighestBid.status = 'outbid';

        // Notify previous bidder
        if (previousHighestBid.userId !== authState.user.email) {
            createNotification({
                userId: previousHighestBid.userId,
                type: NOTIFICATION_TYPES.AUCTION,
                title: 'Bạn đã bị trả giá',
                message: `${auction.plateNumber || auction.name} - Giá mới: ${bidAmount.toLocaleString('vi-VN')} VNĐ`,
                data: { auctionId, bidId: bid.id }
            });
        }
    }

    // Add new bid
    bid.status = 'winning';
    bids.push(bid);

    // Update auction current bid
    const auctionIndex = auctions.findIndex(a => a.id === auctionId);
    if (auctionIndex >= 0) {
        auctions[auctionIndex].currentBid = bidAmount;
        auctions[auctionIndex].currentBidder = authState.user.email;
        auctions[auctionIndex].bidCount = (auctions[auctionIndex].bidCount || 0) + 1;
        auctions[auctionIndex].lastBidTime = new Date().toISOString();
    }

    // Save to store
    auctionStore.set({
        ...state,
        bids: [...bids],
        auctions: [...auctions]
    });

    toast.success('Đặt giá thành công');

    // Simulate other bidders (10% chance)
    if (Math.random() < 0.1) {
        setTimeout(() => simulateCompetingBid(auctionId, bidAmount), 2000 + Math.random() * 3000);
    }

    return { success: true, bid };
}

/**
 * Simulate competing bid from other users (for demo purposes)
 * @param {string} auctionId - Auction ID
 * @param {number} yourBid - Your bid amount
 */
function simulateCompetingBid(auctionId, yourBid) {
    const authState = getAuthState();
    const auction = getAuctionById(auctionId);

    if (!auction || auction.status !== 'live') return;

    // Only simulate if user is still winning
    const currentWinner = auction.currentBidder;
    if (currentWinner !== authState.user.email) return;

    const increment = getBidIncrement(yourBid);
    const competingBid = yourBid + increment;

    // Create simulated bidder
    const simulatedUsers = [
        { email: 'bidder1@vpa.vn', name: 'Nguyễn Văn A' },
        { email: 'bidder2@vpa.vn', name: 'Trần Thị B' },
        { email: 'bidder3@vpa.vn', name: 'Lê Văn C' },
        { email: 'bidder4@vpa.vn', name: 'Phạm Thị D' }
    ];
    const randomUser = simulatedUsers[Math.floor(Math.random() * simulatedUsers.length)];

    // Create bid
    const bid = {
        id: `bid_${Date.now()}_sim`,
        auctionId,
        userId: randomUser.email,
        userName: randomUser.name,
        amount: competingBid,
        timestamp: new Date().toISOString(),
        status: 'winning',
        isSimulated: true
    };

    const state = auctionStore.get();
    let bids = state.bids || [];
    let auctions = state.auctions || [];

    // Mark previous bids as outbid
    bids.forEach(b => {
        if (b.auctionId === auctionId && b.status === 'winning') {
            b.status = 'outbid';
        }
    });

    bids.push(bid);

    // Update auction
    const auctionIndex = auctions.findIndex(a => a.id === auctionId);
    if (auctionIndex >= 0) {
        auctions[auctionIndex].currentBid = competingBid;
        auctions[auctionIndex].currentBidder = randomUser.email;
        auctions[auctionIndex].bidCount = (auctions[auctionIndex].bidCount || 0) + 1;
        auctions[auctionIndex].lastBidTime = new Date().toISOString();
    }

    auctionStore.set({
        ...state,
        bids: [...bids],
        auctions: [...auctions]
    });

    // Notify user they were outbid
    toast.warning(`Bị trả giá. Giá mới: ${competingBid.toLocaleString('vi-VN')} VNĐ`);

    createNotification({
        userId: authState.user.email,
        type: NOTIFICATION_TYPES.AUCTION,
        title: 'Bạn đã bị trả giá',
        message: `${auction.plateNumber || auction.name} - Giá mới: ${competingBid.toLocaleString('vi-VN')} VNĐ`,
        data: { auctionId, bidId: bid.id }
    });
}

/**
 * Get bid history for auction
 * @param {string} auctionId - Auction ID
 * @returns {Array} Bid history
 */
export function getBidHistory(auctionId) {
    const state = auctionStore.get();
    const bids = state.bids || [];

    return bids
        .filter(b => b.auctionId === auctionId)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

/**
 * Get user's bids for auction
 * @param {string} auctionId - Auction ID
 * @returns {Array} User's bids
 */
export function getUserBids(auctionId) {
    const authState = getAuthState();
    if (!authState.isAuthenticated) return [];

    const bids = getBidHistory(auctionId);
    return bids.filter(b => b.userId === authState.user.email);
}

/**
 * Get current winning bid for auction
 * @param {string} auctionId - Auction ID
 * @returns {Object|null} Winning bid
 */
export function getWinningBid(auctionId) {
    const bids = getBidHistory(auctionId);
    return bids.find(b => b.status === 'winning') || null;
}

/**
 * Check if user is winning auction
 * @param {string} auctionId - Auction ID
 * @returns {boolean} True if user is winning
 */
export function isUserWinning(auctionId) {
    const authState = getAuthState();
    if (!authState.isAuthenticated) return false;

    const winningBid = getWinningBid(auctionId);
    return winningBid?.userId === authState.user.email;
}

/**
 * Get auction by ID
 * @param {string} auctionId - Auction ID
 * @returns {Object|null} Auction data
 */
function getAuctionById(auctionId) {
    const state = auctionStore.get();
    const auctions = state.auctions || [];
    return auctions.find(a => a.id === auctionId) || null;
}

/**
 * Enable auto-bidding
 * @param {string} auctionId - Auction ID
 * @param {number} maxBid - Maximum bid amount
 * @returns {boolean} Success status
 */
export function enableAutoBid(auctionId, maxBid) {
    const authState = getAuthState();
    if (!authState.isAuthenticated) {
        toast.error('Vui lòng đăng nhập');
        return false;
    }

    const auction = getAuctionById(auctionId);
    if (!auction) {
        toast.error('Không tìm thấy phiên đấu giá');
        return false;
    }

    const currentBid = auction.currentBid || auction.startingPrice;
    if (maxBid <= currentBid) {
        toast.error(`Giá tối đa phải lớn hơn ${currentBid.toLocaleString('vi-VN')} VNĐ`);
        return false;
    }

    const state = auctionStore.get();
    let autoBids = state.autoBids || [];

    // Remove existing auto-bid for this auction
    autoBids = autoBids.filter(ab => !(ab.auctionId === auctionId && ab.userId === authState.user.email));

    // Add new auto-bid
    autoBids.push({
        id: `auto_${Date.now()}`,
        auctionId,
        userId: authState.user.email,
        maxBid,
        createdAt: new Date().toISOString(),
        active: true
    });

    auctionStore.set({
        ...state,
        autoBids: [...autoBids]
    });

    toast.success(`Đặt giá tự động: Tối đa ${maxBid.toLocaleString('vi-VN')} VNĐ`);
    return true;
}

/**
 * Disable auto-bidding
 * @param {string} auctionId - Auction ID
 */
export function disableAutoBid(auctionId) {
    const authState = getAuthState();
    if (!authState.isAuthenticated) return;

    const state = auctionStore.get();
    let autoBids = state.autoBids || [];

    autoBids = autoBids.filter(ab => !(ab.auctionId === auctionId && ab.userId === authState.user.email));

    auctionStore.set({
        ...state,
        autoBids: [...autoBids]
    });

    toast.info('Tắt đặt giá tự động');
}

/**
 * Get user's auto-bid for auction
 * @param {string} auctionId - Auction ID
 * @returns {Object|null} Auto-bid data
 */
export function getAutoBid(auctionId) {
    const authState = getAuthState();
    if (!authState.isAuthenticated) return null;

    const state = auctionStore.get();
    const autoBids = state.autoBids || [];

    return autoBids.find(ab => ab.auctionId === auctionId && ab.userId === authState.user.email && ab.active) || null;
}

/**
 * Subscribe to bid updates for auction
 * @param {string} auctionId - Auction ID
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToBids(auctionId, callback) {
    return auctionStore.subscribe((state) => {
        const bids = (state.bids || []).filter(b => b.auctionId === auctionId);
        const auction = (state.auctions || []).find(a => a.id === auctionId);
        callback(bids, auction);
    });
}

export default {
    BID_INCREMENTS,
    getBidIncrement,
    validateBid,
    placeBid,
    getBidHistory,
    getUserBids,
    getWinningBid,
    isUserWinning,
    enableAutoBid,
    disableAutoBid,
    getAutoBid,
    subscribeToBids
};
