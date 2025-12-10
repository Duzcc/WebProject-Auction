/**
 * Storage Verification Utility
 * Ensures data persistence before critical operations like page redirects
 */

/**
 * Wait for data to be persisted in localStorage
 * @param {string} storageKey - localStorage key to verify
 * @param {Function} verifyFn - Function that returns true if data is correctly persisted
 * @param {number} maxAttempts - Maximum number of verification attempts (default: 10)
 * @param {number} delayMs - Delay between attempts in milliseconds (default: 200)
 * @returns {Promise<boolean>} True if data persisted successfully, false otherwise
 */
export async function waitForDataPersistence(storageKey, verifyFn, maxAttempts = 10, delayMs = 200) {
    console.log(`⏳ Waiting for ${storageKey} to persist...`);

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            const data = localStorage.getItem(storageKey);

            if (!data) {
                console.warn(`⚠️ Attempt ${attempt}: ${storageKey} not found in localStorage`);
                await sleep(delayMs);
                continue;
            }

            const parsed = JSON.parse(data);
            const isValid = verifyFn(parsed);

            if (isValid) {
                console.log(`✅ Data persisted successfully after ${attempt} attempt(s)`);
                return true;
            }

            console.warn(`⚠️ Attempt ${attempt}: Data exists but verification failed`);
            await sleep(delayMs);

        } catch (error) {
            console.error(`❌ Attempt ${attempt} error:`, error);
            await sleep(delayMs);
        }
    }

    console.error(`❌ Failed to verify data persistence after ${maxAttempts} attempts`);
    return false;
}

/**
 * Force synchronous write and verify
 * @param {string} storageKey - localStorage key
 * @param {any} data - Data to store
 * @param {Function} verifyFn - Verification function
 * @returns {Promise<boolean>} True if write succeeded and was verified
 */
export async function forceWriteAndVerify(storageKey, data, verifyFn) {
    try {
        // Force synchronous write
        const serialized = JSON.stringify(data);
        localStorage.setItem(storageKey, serialized);
        console.log(`💾 Forced write to ${storageKey}`);

        // Immediate verification
        const readBack = localStorage.getItem(storageKey);
        if (!readBack) {
            console.error('❌ Immediate readback failed');
            return false;
        }

        const parsed = JSON.parse(readBack);
        const isValid = verifyFn(parsed);

        if (isValid) {
            console.log('✅ Write verified immediately');
            return true;
        }

        console.warn('⚠️ Write succeeded but verification failed, waiting...');
        // Fall back to polling verification
        return await waitForDataPersistence(storageKey, verifyFn, 5, 100);

    } catch (error) {
        console.error('❌ Force write failed:', error);
        return false;
    }
}

/**
 * Sleep utility
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Verify cart items are marked as paid
 * @param {Array<string>} itemIds - Item IDs that should be marked as paid
 * @returns {Function} Verification function for use with waitForDataPersistence
 */
export function verifyCartItemsPaid(itemIds) {
    return (cartData) => {
        if (!cartData || !Array.isArray(cartData.items)) {
            console.warn('Invalid cart data structure');
            return false;
        }

        const paidItems = cartData.items.filter(item =>
            itemIds.includes(item.id) && item.paid === true
        );

        const allMarked = paidItems.length === itemIds.length;

        if (!allMarked) {
            console.warn(`Only ${paidItems.length}/${itemIds.length} items marked as paid`);
        }

        return allMarked;
    };
}

/**
 * Verify payment exists and is completed
 * @param {string} paymentId - Payment ID to verify
 * @returns {Function} Verification function for use with waitForDataPersistence
 */
export function verifyPaymentCompleted(paymentId) {
    return (auctionData) => {
        if (!auctionData || !Array.isArray(auctionData.payments)) {
            console.warn('Invalid auction data structure');
            return false;
        }

        const payment = auctionData.payments.find(p => p.id === paymentId);

        if (!payment) {
            console.warn(`Payment ${paymentId} not found`);
            return false;
        }

        if (payment.status !== 'completed') {
            console.warn(`Payment ${paymentId} status is ${payment.status}, not completed`);
            return false;
        }

        console.log(`✓ Payment ${paymentId} is completed`);
        return true;
    };
}

export default {
    waitForDataPersistence,
    forceWriteAndVerify,
    verifyCartItemsPaid,
    verifyPaymentCompleted
};
