/**
 * Auction Registration Management
 * Manages user registration for auctions
 */

import { auctionStore } from '../../../core/utils/state.js';
import { getAuthState } from '../../user/utils/auth.js';
import toast from '../../../shared/utils/toast.js';

/**
 * Register for auction
 * @param {Object} auctionData - Auction data
 * @param {string} auctionData.id - Auction ID
 * @param {string} auctionData.name - Auction name
 * @param {string} auctionData.type - Auction type
 * @param {number} auctionData.depositAmount - Required deposit
 * @param {Date} auctionData.auctionDate - Auction date
 * @returns {boolean} Success status
 */
export function registerForAuction(auctionData) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        toast.error('Vui lòng đăng nhập để đăng ký đấu giá');
        return false;
    }

    const state = auctionStore.get();
    const registrations = state.registrations || [];

    // Check if already registered
    const alreadyRegistered = registrations.some(
        reg => reg.auctionId === auctionData.id && reg.userId === authState.user.email
    );

    if (alreadyRegistered) {
        toast.warning('Bạn đã đăng ký đấu giá này rồi');
        return false;
    }

    // Add registration
    const registration = {
        id: `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        auctionId: auctionData.id,
        userId: authState.user.email,
        auctionName: auctionData.name,
        auctionType: auctionData.type,
        depositAmount: auctionData.depositAmount,
        auctionDate: auctionData.auctionDate,
        registeredAt: new Date().toISOString(),
        status: 'pending', // pending, approved, rejected
        depositPaid: false
    };

    registrations.push(registration);
    auctionStore.set({ registrations });

    toast.success('Đăng ký đấu giá thành công!');
    return true;
}

/**
 * Cancel auction registration
 * @param {string} registrationId - Registration ID
 * @returns {boolean} Success status
 */
export function cancelRegistration(registrationId) {
    const state = auctionStore.get();
    const registrations = state.registrations || [];
    const filtered = registrations.filter(reg => reg.id !== registrationId);

    if (filtered.length < registrations.length) {
        auctionStore.set({ registrations: filtered });
        toast.info('Đã hủy đăng ký đấu giá');
        return true;
    }

    return false;
}

/**
 * Check if user is registered for auction
 * @param {string} auctionId - Auction ID
 * @returns {boolean} Registration status
 */
export function isRegisteredForAuction(auctionId) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        return false;
    }

    const state = auctionStore.get();
    const registrations = state.registrations || [];
    return registrations.some(
        reg => reg.auctionId === auctionId && reg.userId === authState.user.email
    );
}

/**
 * Get user's auction registrations
 * @param {string} status - Optional filter by status
 * @returns {Array} Registrations
 */
export function getUserRegistrations(status = null) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        return [];
    }

    const state = auctionStore.get();
    const registrations = state.registrations || [];
    let userRegs = registrations.filter(reg => reg.userId === authState.user.email);

    if (status) {
        userRegs = userRegs.filter(reg => reg.status === status);
    }

    return userRegs;
}

/**
 * Get registration by ID
 * @param {string} registrationId - Registration ID
 * @returns {Object|null} Registration
 */
export function getRegistration(registrationId) {
    const state = auctionStore.get();
    const registrations = state.registrations || [];
    return registrations.find(reg => reg.id === registrationId) || null;
}

/**
 * Update registration status
 * @param {string} registrationId - Registration ID
 * @param {string} status - New status
 */
export function updateRegistrationStatus(registrationId, status) {
    const state = auctionStore.get();
    const registrations = state.registrations || [];
    const registration = registrations.find(reg => reg.id === registrationId);

    if (registration) {
        registration.status = status;
        registration.updatedAt = new Date().toISOString();
        auctionStore.set({ registrations: [...registrations] });
    }
}

/**
 * Mark deposit as paid
 * @param {string} registrationId - Registration ID
 */
export function markDepositPaid(registrationId) {
    const state = auctionStore.get();
    const registrations = state.registrations || [];
    const registration = registrations.find(reg => reg.id === registrationId);

    if (registration) {
        registration.depositPaid = true;
        registration.depositPaidAt = new Date().toISOString();
        auctionStore.set({ registrations: [...registrations] });
        toast.success('Đã xác nhận thanh toán tiền đặt cọc');
    }
}

/**
 * Subscribe to registration changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToRegistrations(callback) {
    return auctionStore.subscribe((state) => {
        callback(state.registrations || []);
    });
}

export default {
    registerForAuction,
    cancelRegistration,
    isRegisteredForAuction,
    getUserRegistrations,
    getRegistration,
    updateRegistrationStatus,
    markDepositPaid,
    subscribeToRegistrations
};
