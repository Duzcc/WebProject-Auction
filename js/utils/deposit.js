/**
 * Deposit Payment Management
 * Handles auction deposit requirements and tracking
 */

import { auctionStore } from './state.js';
import { getAuthState } from './auth.js';
import { createNotification } from './notifications.js';
import toast from './toast.js';

// Deposit configuration
const DEPOSIT_PERCENTAGE = 10; // 10% of start price
const DEPOSIT_DEADLINE_HOURS = 24; // 24 hours to pay deposit after approval

/**
 * Calculate deposit amount
 * @param {number} startPrice - Auction start price
 * @param {number} percentage - Deposit percentage (default 10%)
 * @returns {number} Deposit amount
 */
export function calculateDeposit(startPrice, percentage = DEPOSIT_PERCENTAGE) {
    return Math.floor(startPrice * (percentage / 100));
}

/**
 * Create deposit payment record
 * @param {Object} depositData
 * @param {string} depositData.auctionId - Auction ID
 * @param {string} depositData.itemName - Item name
 * @param {number} depositData.amount - Deposit amount
 * @param {string} depositData.method - Payment method
 * @returns {Object} Deposit record
 */
export function createDepositPayment({ auctionId, itemName, amount, method }) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        toast.error('Vui lòng đăng nhập');
        return null;
    }

    const deposits = auctionStore.get('deposits') || [];

    const deposit = {
        id: `dep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        auctionId,
        userId: authState.user.email,
        userName: authState.user.fullName || authState.user.email,
        itemName,
        amount,
        method,
        status: 'pending', // pending, verified, rejected, refunded
        paymentProof: null,
        createdAt: new Date().toISOString(),
        deadline: new Date(Date.now() + DEPOSIT_DEADLINE_HOURS * 60 * 60 * 1000).toISOString(),
        verifiedAt: null,
        refundedAt: null
    };

    deposits.push(deposit);
    auctionStore.set('deposits', deposits);

    // Create notification
    createNotification({
        userId: authState.user.email,
        type: 'deposit_created',
        title: 'Đã tạo yêu cầu đặt cọc',
        message: `Vui lòng thanh toán ${amount.toLocaleString('vi-VN')} VNĐ trong vòng 24 giờ`,
        data: { depositId: deposit.id, auctionId }
    });

    return deposit;
}

/**
 * Upload payment proof
 * @param {string} depositId - Deposit ID
 * @param {string} proofData - Base64 image data or file URL
 * @returns {boolean} Success status
 */
export function uploadPaymentProof(depositId, proofData) {
    const deposits = auctionStore.get('deposits') || [];
    const deposit = deposits.find(d => d.id === depositId);

    if (!deposit) {
        toast.error('Không tìm thấy yêu cầu đặt cọc');
        return false;
    }

    if (deposit.status === 'verified') {
        toast.info('Đặt cọc đã được xác nhận');
        return false;
    }

    deposit.paymentProof = proofData;
    deposit.status = 'pending'; // Waiting verification
    deposit.proofUploadedAt = new Date().toISOString();

    auctionStore.set('deposits', [...deposits]);

    toast.success('Đã tải lên minh chứng thanh toán');

    // Create notification
    createNotification({
        userId: deposit.userId,
        type: 'deposit_proof_uploaded',
        title: 'Đã tải minh chứng',
        message: 'Chúng tôi sẽ xác nhận trong vòng 2-4 giờ',
        data: { depositId, auctionId: deposit.auctionId }
    });

    // Auto-verify after 3 seconds (simulated)
    setTimeout(() => {
        verifyDeposit(depositId);
    }, 3000);

    return true;
}

/**
 * Verify deposit payment (simulated - normally done by admin)
 * @param {string} depositId - Deposit ID
 * @returns {boolean} Success status
 */
export function verifyDeposit(depositId) {
    const deposits = auctionStore.get('deposits') || [];
    const deposit = deposits.find(d => d.id === depositId);

    if (!deposit) return false;

    deposit.status = 'verified';
    deposit.verifiedAt = new Date().toISOString();

    auctionStore.set('deposits', [...deposits]);

    toast.success('Đặt cọc đã được xác nhận!');

    // Create notification
    createNotification({
        userId: deposit.userId,
        type: 'deposit_verified',
        title: 'Đặt cọc đã được xác nhận',
        message: `Bạn có thể tham gia đấu giá "${deposit.itemName}"`,
        data: { depositId, auctionId: deposit.auctionId }
    });

    return true;
}

/**
 * Get deposit status for auction
 * @param {string} auctionId - Auction ID
 * @param {string} userId - User ID (optional, uses current user if not provided)
 * @returns {Object|null} Deposit record or null
 */
export function getDepositStatus(auctionId) {
    let deposits = auctionStore.get('deposits');

    // Ensure deposits is an array
    if (!deposits || !Array.isArray(deposits)) {
        return null;
    }

    return deposits.find(d => d.auctionId === auctionId) || null;
}

/**
 * Check if user has verified deposit for auction
 * @param {string} auctionId - Auction ID
 * @returns {boolean} Has verified deposit
 */
export function hasVerifiedDeposit(auctionId) {
    const deposit = getDepositStatus(auctionId);
    return deposit?.status === 'verified';
}

/**
 * Get all user deposits
 * @param {string} status - Optional status filter
 * @returns {Array} User's deposits
 */
export function getUserDeposits(status = null) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) return [];

    const deposits = auctionStore.get('deposits') || [];

    // Ensure deposits is an array
    if (!Array.isArray(deposits)) {
        console.warn('Deposits is not an array, resetting to empty array:', deposits);
        auctionStore.set('deposits', []);
        return [];
    }

    let userDeposits = deposits.filter(d => d.userId === authState.user.email);

    if (status) {
        userDeposits = userDeposits.filter(d => d.status === status);
    }

    return userDeposits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Refund deposit (when user doesn't win)
 * @param {string} depositId - Deposit ID
 * @returns {boolean} Success status
 */
export function refundDeposit(depositId) {
    const deposits = auctionStore.get('deposits') || [];
    const deposit = deposits.find(d => d.id === depositId);

    if (!deposit) return false;
    if (deposit.status === 'refunded') {
        toast.info('Đặt cọc đã được hoàn trả');
        return false;
    }

    deposit.status = 'refunded';
    deposit.refundedAt = new Date().toISOString();

    auctionStore.set('deposits', [...deposits]);

    toast.success('Đặt cọc đã được hoàn trả');

    // Create notification
    createNotification({
        userId: deposit.userId,
        type: 'deposit_refunded',
        title: 'Hoàn trả đặt cọc',
        message: `Số tiền ${deposit.amount.toLocaleString('vi-VN')} VNĐ đã được hoàn trả`,
        data: { depositId, auctionId: deposit.auctionId }
    });

    return true;
}

/**
 * Subscribe to deposit changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToDeposits(callback) {
    return auctionStore.subscribe((state) => {
        callback(state.deposits || []);
    });
}

export default {
    calculateDeposit,
    createDepositPayment,
    uploadPaymentProof,
    verifyDeposit,
    getDepositStatus,
    hasVerifiedDeposit,
    getUserDeposits,
    refundDeposit,
    subscribeToDeposits,
    DEPOSIT_PERCENTAGE,
    DEPOSIT_DEADLINE_HOURS
};
