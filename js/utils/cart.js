/**
 * Shopping Cart Management System
 * Manages cart items with localStorage persistence
 */

import { cartStore } from './state.js';
import toast from './toast.js';

/**
 * Add item to cart
 * @param {Object} item - Item to add
 * @param {string} item.id - Unique identifier
 * @param {string} item.name - Item name
 * @param {number} item.price - Item price
 * @param {string} item.image - Item image URL
 * @param {string} item.type - Item type (car, motorbike, asset)
 * @param {number} quantity - Quantity to add (default: 1)
 */
export function addToCart(item, quantity = 1) {
    const items = cartStore.get('items') || [];

    // Check if item already exists
    const existingIndex = items.findIndex(i => i.id === item.id && i.type === item.type);

    if (existingIndex >= 0) {
        // Update quantity
        items[existingIndex].quantity += quantity;
        toast.info(`Đã cập nhật số lượng trong giỏ hàng`);
    } else {
        // Add new item
        items.push({
            ...item,
            quantity,
            addedAt: new Date().toISOString()
        });
        toast.success(`Đã thêm "${item.name}" vào giỏ hàng`);
    }

    cartStore.setState({
        items,
        total: calculateTotal(items)
    });
}

/**
 * Remove item from cart
 * @param {string} id - Item ID
 * @param {string} type - Item type
 */
export function removeFromCart(id, type) {
    const items = cartStore.get('items') || [];
    const filtered = items.filter(item => !(item.id === id && item.type === type));

    cartStore.setState({
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
    const items = cartStore.get('items') || [];
    const item = items.find(i => i.id === id && i.type === type);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(id, type);
        } else {
            item.quantity = quantity;
            cartStore.setState({
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
    cartStore.setState({
        items: [],
        total: 0
    });
    toast.info('Đã xóa tất cả khỏi giỏ hàng');
}

/**
 * Get cart items
 * @returns {Array} Cart items
 */
export function getCartItems() {
    return cartStore.get('items') || [];
}

/**
 * Get cart total
 * @returns {number} Total price
 */
export function getCartTotal() {
    return cartStore.get('total') || 0;
}

/**
 * Get cart item count
 * @returns {number} Total number of items
 */
export const getCartCount = (items) => { // <--- ĐÃ THÊM TỪ KHÓA EXPORT Ở ĐÂY
    // Đảm bảo items là một mảng trước khi gọi reduce.
    if (!Array.isArray(items)) {
        items = [];
    }
    
    // Đã sửa 'item.qty' thành 'item.quantity' để khớp với logic giỏ hàng
    return items.reduce((count, item) => count + item.quantity, 0); 
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
    button.className = 'add-to-cart-btn bg-gradient-to-r from-[#be1e2d] to-[#8b1818] text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2';

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

    // Subscribe to cart changes
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
    getCartItems,
    getCartTotal,
    getCartCount,
    isInCart,
    subscribeToCart,
    createAddToCartButton
};