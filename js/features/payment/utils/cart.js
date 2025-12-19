/**
 * Shopping Cart Management System
 * Manages cart items with localStorage persistence
 */

import { cartStore } from '../../../core/utils/state.js';
import toast from '../../../shared/utils/toast.js';
import { validateCartItem } from '../../user/utils/validation.js';
import { errorTracker } from '../../../core/utils/errorTracker.js';

/**
 * Add item to cart
 * @param {Object} item - Item to add
 * @param {string} item.id - Unique identifier
 * @param {string} item.name - Item name
 * @param {number} item.price - Item price
 * @param {string} item.image - Item image URL
 * @param {string} item.type - Item type (car, motorbike, asset)
 * @param {number} quantity - Quantity to add (default: 1)
 * @returns {boolean} True if successful, false otherwise
 */
export function addToCart(item, quantity = 1) {
    try {
        // Validate item before adding
        const validation = validateCartItem(item, quantity);
        if (!validation.valid) {
            toast.error(validation.error);
            console.error('Cart validation failed:', validation.error);
            return false;
        }

        const state = cartStore.get();
        let items = state.items || [];

        // Ensure items is an array
        if (!Array.isArray(items)) {
            console.warn('Cart items is not an array, resetting to empty array:', items);
            items = [];
        }

        console.log('🛒 addToCart called:', { item, quantity, currentItems: items.length });

        // Check if item already exists
        const existingIndex = items.findIndex(i => i.id === item.id && i.type === item.type);

        if (existingIndex >= 0) {
            // Update quantity
            const newQuantity = items[existingIndex].quantity + quantity;

            // Validate new quantity
            if (newQuantity > 99) {
                toast.error('Số lượng tối đa là 99');
                return false;
            }

            items[existingIndex].quantity = newQuantity;
            // Silent update - no toast spam
        } else {
            // Add new item
            items.push({
                ...item,
                quantity,
                addedAt: new Date().toISOString()
            });
            toast.success(`Đã thêm "${item.name}" vào giỏ hàng`);
        }

        cartStore.set({
            items,
            total: calculateTotal(items)
        });

        console.log('Cart updated:', { totalItems: items.length, total: calculateTotal(items) });

        // Force update header cart badge
        try {
            const event = new CustomEvent('cart-updated', {
                detail: { count: items.filter(i => !i.paid).length }
            });
            window.dispatchEvent(event);
        } catch (error) {
            console.error('Error dispatching cart update event:', error);
        }

        return true;
    } catch (error) {
        console.error('Error adding to cart:', error);
        errorTracker.logError('cart.addToCart', error, { item: item?.id, quantity });
        toast.error('Không thể thêm vào giỏ hàng');
        return false;
    }
}

/**
 * Remove item from cart
 * @param {string} id - Item ID
 * @param {string} type - Item type
 */
export function removeFromCart(id, type) {
    const state = cartStore.get();
    const items = state.items || [];
    const filtered = items.filter(item => !(item.id === id && item.type === type));

    cartStore.set({
        items: filtered,
        total: calculateTotal(filtered)
    });

    toast.info('Đã xóa khỏi giỏ hàng');
}

/**
 * Update item quantity
 * @param {string} id - Item ID
 * @param {string} type - Item type
 * @param {number} quantity - New quantity
 */
export function updateQuantity(id, type, quantity) {
    const state = cartStore.get();
    const items = state.items || [];
    const item = items.find(i => i.id === id && i.type === type);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(id, type);
        } else {
            item.quantity = quantity;
            cartStore.set({
                items: [...items],
                total: calculateTotal(items)
            });
        }
    }
}

/**
 * Clear cart
 */
export function clearCart() {
    cartStore.set({
        items: [],
        total: 0
    });
    toast.info('Đã xóa tất cả khỏi giỏ hàng');
}

/**
 * Mark items as paid
 * @param {Array} itemIds - Array of item IDs to mark as paid
 */
export function markItemsAsPaid(itemIds) {
    console.log('markItemsAsPaid called with IDs:', itemIds);

    const state = cartStore.get();
    const items = state.items || [];

    console.log('Current cart items:', items);

    let updatedCount = 0;
    items.forEach(item => {
        if (itemIds.includes(item.id)) {
            item.paid = true;
            item.paidAt = new Date().toISOString();
            updatedCount++;
            console.log(`Marked as paid: ${item.name || item.id}`);
        }
    });

    console.log(`Updated ${updatedCount} items as paid`);

    const updatedState = {
        items: [...items],
        total: state.total
    };

    // Update via cartStore
    cartStore.set(updatedState);

    try {
        localStorage.setItem('vpa-cart', JSON.stringify(updatedState));
        console.log('FORCED localStorage write for cart');
    } catch (error) {
        console.error('Failed to force write cart to localStorage:', error);
    }

    console.log('Cart after marking paid:', cartStore.get());

    // Verify persistence
    try {
        const verifyCart = JSON.parse(localStorage.getItem('vpa-cart'));
        const paidCount = (verifyCart.items || []).filter(i => i.paid === true).length;
        console.log(`VERIFIED: ${paidCount} items marked as paid in localStorage`);
    } catch (error) {
        console.error('Failed to verify cart in localStorage:', error);
    }
}


/**
 * Get all cart items (filtered for expired items)
 * @returns {Array} Cart items
 */
export function getCartItems() {
    const state = cartStore.get();
    let items = state.items || [];

    // Filter out expired items
    const now = new Date();
    const validItems = items.filter(item => {
        // Only remove UNPAID registration items that are past registration deadline
        // Do NOT remove if user already paid (they registered successfully)
        if (item.type === 'registration' && !item.paid && item.registrationDeadline) {
            const deadline = new Date(item.registrationDeadline);
            return deadline > now; 
        }
        return true;
    });

    if (validItems.length < items.length) {
        const removedCount = items.length - validItems.length;
        cartStore.set({
            items: validItems,
            total: calculateTotal(validItems)
        });
        console.log(`Cleaned up ${removedCount} expired registration items`);
    }

    return validItems;
}

/**
 * Get cart total
 * @returns {number} Total price
 */
export function getCartTotal() {
    const state = cartStore.get();
    return state.total || 0;
}

/**
 * Get cart count (ONLY unpaid items)
 * @returns {number} Cart count
 */
export function getCartCount() {
    const currentCart = cartStore.get();
    if (!currentCart || !currentCart.items) {
        return 0;
    }

    // Only count UNPAID items
    const unpaidItems = currentCart.items.filter(item => !item.paid);
    return unpaidItems.length;
}

/**
 * Get total item quantity (sum of all quantities, including paid items)
 * @param {Array} items - Optional items array, if not provided, gets from store
 * @returns {number} Total quantity of all items
 */
export const getTotalItemQuantity = (items) => {
    // If items not provided, get from store
    if (!items) {
        const state = cartStore.get();
        items = state.items || [];
    }

    // Ensure items is an array
    if (!Array.isArray(items)) {
        return 0;
    }

    // Sum up quantities
    return items.reduce((count, item) => count + (item.quantity || 1), 0);
}

/**
 * Check if item is in cart
 * @param {string} id - Item ID
 * @param {string} type - Item type
 * @returns {boolean} True if in cart
 */
export function isInCart(id, type) {
    const items = getCartItems();
    return items.some(item => item.id === id && item.type === type);
}

/**
 * Calculate total price
 * @param {Array} items - Cart items
 * @returns {number} Total price
 */
function calculateTotal(items) {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * Subscribe to cart changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToCart(callback) {
    return cartStore.subscribe((state) => {
        callback(state.items, state.total);
    });
}

/**
 * Create add to cart button
 * @param {Object} item - Item data
 * @param {Function} onAdd - Optional callback
 * @returns {HTMLElement} Add to cart button
 */
export function createAddToCartButton(item, onAdd = null) {
    const button = document.createElement('button');
    button.className = 'add-to-cart-btn bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2';

    const updateButton = () => {
        const inCart = isInCart(item.id, item.type);
        button.innerHTML = `
            <i data-lucide="${inCart ? 'check' : 'shopping-cart'}" class="w-4 h-4"></i>
            <span>${inCart ? 'Đã thêm' : 'Thêm vào giỏ'}</span>
        `;

        // Re-initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    updateButton();

    subscribeToCart(updateButton);

    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isInCart(item.id, item.type)) {
            addToCart(item);

            if (onAdd) {
                onAdd();
            }
        }
    });

    return button;
}

export default {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    markItemsAsPaid,
    getCartItems,
    getCartTotal,
    getCartCount,
    isInCart,
    subscribeToCart,
    createAddToCartButton
};