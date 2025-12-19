/**
 * Navigation Helper
 * Quản lý routing và điều hướng tập trung cho ứng dụng
 * 
 * Module này cung cấp:
 * - Constants cho tất cả routes trong app
 * - Helper functions để navigate giữa các trang
 * - Quản lý navigation state qua sessionStorage
 * - Utilities để kiểm tra route hiện tại
 */

// Constants định nghĩa tất cả các routes trong ứng dụng
export const ROUTES = {
    HOME: '#/',
    CARS: '#/cars',
    MOTORBIKES: '#/motorbikes',
    ASSETS: '#/assets',
    NEWS: '#/news',
    ABOUT: '#/about',
    NOTIFICATIONS: '#/notifications',
    CART: '#/cart',
    CHECKOUT: '#/checkout',
    PAYMENT: '#/payment',
    PAYMENT_SUCCESS: '#/payment-success',
    PAYMENT_FAILURE: '#/payment-failure',
    DASHBOARD: '#/auction-history',
    PROFILE: '#/profile',
    LOGIN: '#/login'
};

/**
 * Điều hướng đến một route
 * @param {string} route - Route constant từ ROUTES (ví dụ: ROUTES.HOME, ROUTES.CARS)
 * @param {Object} options - Tùy chọn điều hướng
 * @param {boolean} options.replace - Thay thế history thay vì push (mặc định: false)
 * @param {Object} options.state - State cần lưu trong session để sử dụng ở trang đích
 * 
 * Ví dụ:
 * navigateTo(ROUTES.CARS); // Chuyển đến trang cars
 * navigateTo(ROUTES.PROFILE, { state: { userId: 123 } }); // Chuyển đến profile với state
 * navigateTo(ROUTES.LOGIN, { replace: true }); // Thay thế history
 */
export function navigateTo(route, options = {}) {
    const { replace = false, state = null } = options;

    // Lưu state vào sessionStorage nếu được cung cấp
    // State này có thể được lấy ra ở trang đích bằng getNavigationState()
    if (state) {
        sessionStorage.setItem('navigationState', JSON.stringify(state));
    }

    // Thực hiện điều hướng
    if (replace) {
        window.location.replace(route);
    } else {
        window.location.hash = route;
    }
}

/**
 * Lấy navigation state từ sessionStorage
 * @returns {Object|null} State đã lưu, hoặc null nếu không có
 * 
 * Lưu ý: Hàm này tự động xóa state sau khi lấy ra (read-once pattern)
 * để tránh state cũ bị sử dụng lại khi navigate nhiều lần
 */
export function getNavigationState() {
    const state = sessionStorage.getItem('navigationState');
    if (state) {
        sessionStorage.removeItem('navigationState');
        return JSON.parse(state);
    }
    return null;
}

/**
 * Quay lại trang trước trong history
 * Wrapper cho window.history.back()
 */
export function goBack() {
    window.history.back();
}

/**
 * Lấy route hiện tại
 * @returns {string} Hash hiện tại trong URL (ví dụ: '#/cars'), hoặc HOME nếu không có hash
 */
export function getCurrentRoute() {
    return window.location.hash || ROUTES.HOME;
}

/**
 * Kiểm tra xem route hiện tại có khớp với route được cung cấp không
 * @param {string} route - Route cần kiểm tra (ví dụ: ROUTES.CARS)
 * @returns {boolean} true nếu route hiện tại khớp, false nếu không
 * 
 * Sử dụng để highlight active menu item hoặc conditional rendering
 */
export function isCurrentRoute(route) {
    return getCurrentRoute() === route;
}

export default {
    ROUTES,
    navigateTo,
    getNavigationState,
    goBack,
    getCurrentRoute,
    isCurrentRoute
};
