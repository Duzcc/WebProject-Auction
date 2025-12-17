/**
 * Order Management System
 * Handles order creation, persistence, and recovery with backup mechanism
 */

/**
 * Create a pending order with dual storage (sessionStorage + localStorage)
 * @param {Array} items - Cart items
 * @returns {Object} Order data
 */
export function createPendingOrder(items) {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const orderData = {
        id: orderId,
        items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.type === 'registration' ? item.depositAmount : item.price,
            quantity: item.quantity || 1,
            type: item.type,
            // Preserve all item data
            ...item
        })),
        total: items.reduce((sum, item) => {
            const price = item.type === 'registration' ? item.depositAmount : item.price;
            const quantity = item.quantity || 1;
            return sum + (price * quantity);
        }, 0),
        status: 'pending',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24h expiry
    };

    console.log('📝 Creating pending order:', orderId);

    // Store in sessionStorage (primary)
    try {
        sessionStorage.setItem('currentOrder', JSON.stringify(orderData));
        console.log('✓ Stored in sessionStorage');
    } catch (error) {
        console.error('❌ Failed to store in sessionStorage:', error);
    }

    // Also store in localStorage as backup
    try {
        let pendingOrders = JSON.parse(localStorage.getItem('vpa-pending-orders') || '[]');

        // Clean up old orders before adding new one
        pendingOrders = pendingOrders.filter(order => {
            const expiresAt = new Date(order.expiresAt);
            return expiresAt > new Date();
        });

        pendingOrders.push(orderData);
        localStorage.setItem('vpa-pending-orders', JSON.stringify(pendingOrders));
        console.log('✓ Stored in localStorage backup');
    } catch (error) {
        console.error('❌ Failed to store in localStorage:', error);
    }

    return orderData;
}

/**
 * Get pending order with fallback mechanism
 * @returns {Object|null} Order data or null
 */
export function getPendingOrder() {
    // Try sessionStorage first (primary)
    try {
        const orderData = sessionStorage.getItem('currentOrder');
        if (orderData) {
            const order = JSON.parse(orderData);
            console.log('📦 Retrieved order from sessionStorage:', order.id);
            return order;
        }
    } catch (error) {
        console.error('Error reading sessionStorage:', error);
    }

    // Fallback to localStorage
    console.log('⚠️ No order in sessionStorage, checking localStorage...');
    try {
        const pendingOrders = JSON.parse(localStorage.getItem('vpa-pending-orders') || '[]');

        if (pendingOrders.length > 0) {
            // Get most recent non-expired pending order
            const validOrders = pendingOrders.filter(order => {
                const expiresAt = new Date(order.expiresAt);
                return expiresAt > new Date() && order.status === 'pending';
            });

            if (validOrders.length > 0) {
                const latestOrder = validOrders[validOrders.length - 1];
                console.log('✓ Recovered order from localStorage:', latestOrder.id);

                // Restore to sessionStorage
                try {
                    sessionStorage.setItem('currentOrder', JSON.stringify(latestOrder));
                    console.log('✓ Restored to sessionStorage');
                } catch (e) {
                    console.warn('Could not restore to sessionStorage:', e);
                }

                return latestOrder;
            } else {
                console.log('⚠️ No valid pending orders found in localStorage');
            }
        }
    } catch (error) {
        console.error('Error reading localStorage:', error);
    }

    return null;
}

/**\n * Clear pending order from both storages
 * @param {string} orderId - Order ID to clear
 */
export function clearPendingOrder(orderId) {
    console.log('🗑️ Clearing pending order:', orderId);

    // Clear from sessionStorage
    try {
        sessionStorage.removeItem('currentOrder');
        console.log('✓ Cleared from sessionStorage');
    } catch (error) {
        console.error('Error clearing sessionStorage:', error);
    }

    // Clear from localStorage
    try {
        const pendingOrders = JSON.parse(localStorage.getItem('vpa-pending-orders') || '[]');
        const filtered = pendingOrders.filter(o => o.id !== orderId);
        localStorage.setItem('vpa-pending-orders', JSON.stringify(filtered));
        console.log('✓ Cleared from localStorage');
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
}

/**
 * Cleanup expired orders from localStorage
 * Should be called on app init
 */
export function cleanupExpiredOrders() {
    try {
        const pendingOrders = JSON.parse(localStorage.getItem('vpa-pending-orders') || '[]');
        const now = new Date();

        const validOrders = pendingOrders.filter(order => {
            const expiresAt = new Date(order.expiresAt);
            return expiresAt > now;
        });

        if (validOrders.length < pendingOrders.length) {
            localStorage.setItem('vpa-pending-orders', JSON.stringify(validOrders));
            console.log(`🧹 Cleaned up ${pendingOrders.length - validOrders.length} expired orders`);
        }
    } catch (error) {
        console.error('Error cleaning up expired orders:', error);
    }
}

/**
 * Get all pending orders (for debugging/admin)
 * @returns {Array} All pending orders
 */
export function getAllPendingOrders() {
    try {
        const pendingOrders = JSON.parse(localStorage.getItem('vpa-pending-orders') || '[]');
        return pendingOrders;
    } catch (error) {
        console.error('Error getting pending orders:', error);
        return [];
    }
}

export default {
    createPendingOrder,
    getPendingOrder,
    clearPendingOrder,
    cleanupExpiredOrders,
    getAllPendingOrders
};
