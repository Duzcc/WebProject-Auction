// Header component
import { createFromHTML, initIcons } from '../../shared/utils/dom.js';
import { getAuthState, logout, subscribeToAuth } from '../../features/user/utils/auth.js';
import { toggleTheme, getCurrentTheme } from '../utils/theme.js';
import { getCartCount, subscribeToCart } from '../../features/payment/utils/cart.js';
import { NotificationCenter } from './NotificationCenter.js';

/**
 * Create Header component
 * @param {Object} props - Component props
 * @param {string} props.activePage - Current active page
 * @param {Function} props.onNavigate - Navigation callback
 * @returns {HTMLElement} Header element
 */
export function Header({ activePage, onNavigate }) {
    const authState = getAuthState();
    let mobileMenuOpen = false;
    let userMenuOpen = false;

    const navClass = (page) =>
        `cursor-pointer transition-colors ${activePage === page ? 'text-[#AA8C3C] font-bold' : 'hover:text-[#AA8C3C]'}`;

    const handleNavClick = (page) => {
        onNavigate(page);
        mobileMenuOpen = false;
        userMenuOpen = false;
        updateMobileMenu();
        updateUserMenu();
    };

    const toggleMobileMenu = () => {
        mobileMenuOpen = !mobileMenuOpen;
        userMenuOpen = false;
        updateMobileMenu();
        updateUserMenu();
    };

    const toggleUserMenu = () => {
        userMenuOpen = !userMenuOpen;
        updateUserMenu();
    };

    const handleLogout = () => {
        logout();
        userMenuOpen = false;
        updateUserMenu();
        onNavigate('home');
    };

    const updateMobileMenu = () => {
        const mobileMenu = header.querySelector('#mobile-menu');
        const menuIcon = header.querySelector('#menu-icon');

        if (mobileMenu) {
            mobileMenu.style.display = mobileMenuOpen ? 'block' : 'none';
        }

        if (menuIcon) {
            menuIcon.innerHTML = mobileMenuOpen
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';
            initIcons(menuIcon);
        }
    };

    const updateUserMenu = () => {
        const userMenu = header.querySelector('#user-menu');
        if (userMenu) {
            userMenu.style.display = userMenuOpen ? 'block' : 'none';
        }
    };

    const html = `
        <header class="w-full">
            <!-- Top Bar with Ticker -->
            <div class="bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white text-xs py-2 px-4 flex justify-between items-center border-b border-[#AA8C3C]/20">
                <div class="overflow-hidden w-full max-w-4xl whitespace-nowrap">
                    <div class="inline-block animate-marquee pl-4">
                        33.33, 68AA-888.88, 49AA-888.88, 47AD-444.44, 74H-024.68, 22H-024.68, 29E-444.40, 29E-433.33, 29E-444.47, 29E-411.11.
                    </div>
                </div>
                <div class="hidden md:flex items-center gap-2 font-bold ml-4 whitespace-nowrap bg-gradient-to-r from-[#AA8C3C] to-[#8B7530] text-[#1a1a1a] px-3 py-1 rounded-full shadow-lg">
                    <i data-lucide="phone" class="w-3.5 h-3.5" fill="#1a1a1a"></i>
                    <span>1900.8888.88</span>
                </div>
            </div>

            <!-- Main Navigation -->
            <div class="bg-white shadow-sm sticky top-0 z-50">
                <div class="container mx-auto px-4 py-3 flex items-center justify-between">
                    <!-- Logo -->
                    <div class="flex items-center gap-2 cursor-pointer" id="logo">
                        <div class="w-10 h-10 bg-gradient-to-br from-[#AA8C3C] to-[#8B7530] rounded-md flex items-center justify-center transform rotate-45 shadow-md">
                            <div class="w-6 h-6 bg-white transform -rotate-45" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%)"></div>
                        </div>
                        <span class="text-3xl font-bold text-[#AA8C3C]">NPA</span>
                    </div>

                    <!-- Nav Links - Desktop -->
                    <nav class="hidden lg:flex items-center gap-6 xl:gap-8 font-semibold text-gray-700">
                        <span class="${navClass('home')}" data-page="home">Trang chủ</span>
                        <span class="${navClass('cars')}" data-page="cars">Xe ô tô</span>
                        <span class="${navClass('motorbikes')}" data-page="motorbikes">Xe máy</span>
                        <span class="${navClass('assets')}" data-page="assets">Tài sản khác</span>
                        <span class="${navClass('news')}" data-page="news">Tin tức</span>
                    </nav>

                    <!-- Search Bar & User Actions -->
                    <div class="hidden md:flex items-center gap-3 relative">
                        <input
                            type="text"
                            placeholder="Tìm biển số"
                            class="border border-gray-300 rounded-full py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:border-[#AA8C3C] focus:ring-2 focus:ring-[#AA8C3C]/20 w-48 lg:w-64 transition-all duration-300"
                        />
                        <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4"></i>
                        
                        <!-- Dark Mode Toggle -->
                        <button id="theme-toggle" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Toggle dark mode">
                            <i data-lucide="moon" class="w-5 h-5 text-gray-700 dark:text-gray-300"></i>
                        </button>
                        
                        ${authState.isAuthenticated ? `
                            <!-- Notification Center -->
                            <div id="notification-center-container"></div>
                            
                            <!-- Cart Icon with Badge -->
                            <button class="cart-btn relative p-2.5 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-full transition-all duration-300 group">
                                <i data-lucide="shopping-cart" class="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-[#AA8C3C] transition-colors duration-300"></i>
                                <span id="cart-badge" class="pointer-events-none absolute -top-1 -right-1 bg-gradient-to-br from-[#AA8C3C] to-[#8B7530] text-white text-xs font-bold rounded-full w-5 h-5 items-center justify-center hidden shadow-lg animate-pulse">0</span>
                            </button>

                            <!-- User Menu -->
                            <div class="relative">
                                <button id="user-menu-toggle" class="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-full transition-all duration-300 group border border-transparent hover:border-[#AA8C3C]/30 dark:hover:border-gray-600">
                                    <img src="${authState.user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(authState.user.fullName || authState.user.email)}" 
                                         alt="User" class="w-9 h-9 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600 group-hover:ring-[#AA8C3C] transition-all duration-300 shadow-md">
                                    <div class="hidden md:flex flex-col items-start max-w-[120px]">
                                        <span class="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">${authState.user.name}</span>
                                        <span class="text-xs text-gray-500 dark:text-gray-400">Tài khoản</span>
                                    </div>
                                    <i data-lucide="chevron-down" class="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-[#AA8C3C] transition-all duration-300 group-hover:rotate-180"></i>
                                </button>
                                
                                <!-- Dropdown Menu -->
                                <div id="user-menu" class="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transform origin-top-right transition-all duration-300 ease-out" style="display: none;">
                                    <!-- User Info Header -->
                                    <div class="px-5 py-4 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white border-b-2 border-[#AA8C3C]">
                                        <div class="flex items-center gap-3">
                                            <img src="${authState.user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(authState.user.fullName || authState.user.email)}" 
                                                 alt="User" class="w-12 h-12 rounded-full object-cover ring-2 ring-white/50 shadow-lg">
                                            <div class="flex-1 min-w-0">
                                                <p class="text-sm font-bold truncate">${authState.user.name}</p>
                                                <p class="text-xs opacity-90 truncate">${authState.user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Menu Items -->
                                    <div class="py-2">
                                        <button data-page="profile" class="w-full px-5 py-3.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3.5 transition-all duration-200 group">
                                            <div class="w-9 h-9 rounded-xl bg-[#AA8C3C]/10 dark:bg-[#AA8C3C]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                <i data-lucide="user" class="w-4.5 h-4.5 text-[#AA8C3C] dark:text-[#AA8C3C]"></i>
                                            </div>
                                            <div class="flex-1">
                                                <span class="font-semibold text-gray-900 dark:text-white">Thông tin tài khoản</span>
                                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Xem và chỉnh sửa hồ sơ</p>
                                            </div>
                                            <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform duration-200"></i>
                                        </button>
                                        
                                        <button data-page="auction-history" class="w-full px-5 py-3.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3.5 transition-all duration-200 group">
                                            <div class="w-9 h-9 rounded-xl bg-[#AA8C3C]/10 dark:bg-[#AA8C3C]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                <i data-lucide="gavel" class="w-4.5 h-4.5 text-[#AA8C3C] dark:text-[#AA8C3C]"></i>
                                            </div>
                                            <div class="flex-1">
                                                <span class="font-semibold text-gray-900 dark:text-white">Lịch sử đấu giá</span>
                                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Xem hoạt động đấu giá</p>
                                            </div>
                                            <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform duration-200"></i>
                                        </button>
                                        
                                        <button class="w-full px-5 py-3.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3.5 transition-all duration-200 group">
                                            <div class="w-9 h-9 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                <i data-lucide="settings" class="w-4.5 h-4.5 text-green-600 dark:text-green-400"></i>
                                            </div>
                                            <div class="flex-1">
                                                <span class="font-semibold text-gray-900 dark:text-white">Cài đặt</span>
                                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Tùy chỉnh tài khoản</p>
                                            </div>
                                            <i data-lucide="chevron-right" class="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform duration-200"></i>
                                        </button>
                                    </div>
                                    
                                    <!-- Logout Section -->
                                    <div class="border-t border-gray-200 dark:border-gray-700 p-2">
                                        <button id="logout-btn" class="w-full px-5 py-3.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl flex items-center gap-3.5 transition-all duration-200 group">
                                            <div class="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                                <i data-lucide="log-out" class="w-4.5 h-4.5 text-red-600 dark:text-red-400"></i>
                                            </div>
                                            <span class="font-semibold">Đăng xuất</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ` : `
                            <!-- Login Button -->
                            <button 
                                id="login-btn"
                                class="bg-gradient-to-r from-[#AA8C3C] to-[#8B7530] text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-xl hover:shadow-[#AA8C3C]/30 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                            >
                                <i data-lucide="user" class="w-4 h-4"></i>
                                <span>Đăng nhập</span>
                            </button>
                        `}
                    </div>

                    <!-- Mobile Menu Icon -->
                    <button class="lg:hidden text-gray-700" id="mobile-menu-toggle">
                        <span id="menu-icon">
                            <i data-lucide="menu" class="w-6 h-6"></i>
                        </span>
                    </button>
                </div>

                <!-- Mobile Menu -->
                <div id="mobile-menu" class="lg:hidden border-t border-gray-200 bg-white shadow-lg" style="display: none;">
                    <nav class="px-4 py-6 space-y-3">
                        <div class="${navClass('home')} block py-3 font-semibold border-b border-gray-100" data-page="home">Trang chủ</div>
                        <div class="${navClass('cars')} block py-3 font-semibold border-b border-gray-100" data-page="cars">Xe ô tô</div>
                        <div class="${navClass('motorbikes')} block py-3 font-semibold border-b border-gray-100" data-page="motorbikes">Xe máy</div>
                        <div class="${navClass('assets')} block py-3 font-semibold border-b border-gray-100" data-page="assets">Tài sản khác</div>
                        <div class="${navClass('news')} block py-3 font-semibold border-b border-gray-100" data-page="news">Tin tức</div>
                    </nav>
                </div>
            </div>
        </header>
    `;

    const header = createFromHTML(html);

    // Add event listeners
    const logo = header.querySelector('#logo');
    logo.addEventListener('click', () => handleNavClick('home'));

    const navLinks = header.querySelectorAll('[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const page = e.target.getAttribute('data-page');
            handleNavClick(page);
        });
    });

    const mobileMenuToggle = header.querySelector('#mobile-menu-toggle');
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Login button event listener
    const loginBtn = header.querySelector('#login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => handleNavClick('login'));
    }

    // User menu toggle event listener
    const userMenuToggle = header.querySelector('#user-menu-toggle');
    if (userMenuToggle) {
        userMenuToggle.addEventListener('click', toggleUserMenu);
    }

    // User menu navigation buttons
    const userMenuButtons = header.querySelectorAll('#user-menu [data-page]');
    userMenuButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const page = e.currentTarget.getAttribute('data-page');
            handleNavClick(page);
        });
    });

    // Logout button event listener
    const logoutBtn = header.querySelector('#logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Close user menu when clicking outside
    document.addEventListener('click', (e) => {
        const userMenuContainer = header.querySelector('#user-menu-toggle')?.parentElement;
        if (userMenuContainer && !userMenuContainer.contains(e.target) && userMenuOpen) {
            userMenuOpen = false;
            updateUserMenu();
        }
    });

    // Theme toggle event listener
    const themeToggle = header.querySelector('#theme-toggle');
    if (themeToggle) {
        const updateThemeIcon = () => {
            const isDark = getCurrentTheme() === 'dark';
            themeToggle.innerHTML = `<i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-5 h-5 text-gray-700 dark:text-gray-300"></i>`;
            initIcons(themeToggle);
        };

        themeToggle.addEventListener('click', () => {
            toggleTheme();
            updateThemeIcon();
        });

        updateThemeIcon();
    }

    // Mount notification center
    if (authState.isAuthenticated) {
        const notifContainer = header.querySelector('#notification-center-container');
        if (notifContainer) {
            notifContainer.appendChild(NotificationCenter());
        }

        // Update cart badge
        const cartBadge = header.querySelector('#cart-badge');
        const updateCartBadge = () => {
            const count = getCartCount();
            if (cartBadge) {
                cartBadge.textContent = count;
                if (count > 0) {
                    cartBadge.classList.remove('hidden');
                    cartBadge.classList.add('flex');
                } else {
                    cartBadge.classList.add('hidden');
                    cartBadge.classList.remove('flex');
                }
            }
        };

        updateCartBadge();
        subscribeToCart(updateCartBadge);

        // Cart button click - use onNavigate for proper routing
        const cartBtn = header.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleNavClick('cart');
            });
        }
    }

    // Initialize Lucide icons
    initIcons(header);

    return header;
}

export default Header;
