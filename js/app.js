import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { FloatingActions } from './components/FloatingActions.js';

// Core pages
import { HomePage } from './pages/core/HomePage.js';
import { AboutPage } from './pages/core/AboutPage.js';
import { NewsPage } from './pages/core/NewsPage.js';
import { NewsDetailPage } from './pages/core/NewsDetailPage.js';

// Auction pages
import { CarAuctionPage } from './pages/auction/cars/CarAuctionPage.js';
import { MotorbikeAuctionPage } from './pages/auction/motorbikes/MotorbikeAuctionPage.js';
import { AssetListPage } from './pages/auction/assets/AssetListPage.js';
import { AssetDetailPage } from './pages/auction/assets/AssetDetailPage.js';
import { AuctionHistoryPage } from './pages/auction/AuctionHistoryPage.js';
import { PendingPlatesPage } from './pages/auction/PendingPlatesPage.js';

// Payment pages
import { CartPage } from './pages/payment/CartPage.js';
import { CheckoutPage } from './pages/payment/CheckoutPage.js';
import { PaymentPage } from './pages/payment/PaymentPage.js';
import { PaymentSuccessPage } from './pages/payment/PaymentSuccessPage.js';
import { PaymentFailurePage } from './pages/payment/PaymentFailurePage.js';

// User pages
import { LoginPage } from './pages/user/LoginPage.js';
import { ProfilePage } from './pages/user/ProfilePage.js';
import { DocumentsPage } from './pages/user/DocumentsPage.js';

// Demo pages
import { Phase1DemoPage } from './pages/demo/Phase1DemoPage.js';
import { DepositDemoPage } from './pages/demo/DepositDemoPage.js';
import { PaymentDemoPage } from './pages/demo/PaymentDemoPage.js';
import { NotificationArchivePage } from './pages/demo/NotificationArchivePage.js';

import { render, createElement } from './utils/dom.js';
import { subscribeToAuth } from './utils/auth.js';
import { initTheme } from './utils/theme.js';
import { initBackToTop } from './pages/shared/BackToTop.js';
import { initUserProfile } from './utils/userProfile.js';
import {
    newsData,
    notifData,
    assets,
    carPlates,
    officialCarPlates,
    auctionResultsData,
    motorbikePlates,
    officialMotorbikePlates,
    motorbikeAuctionResults,
    // Expanded data with plate colors
    expandedCarPlates,
    expandedMotorbikePlates
} from './data/constants.js';

const root = document.getElementById('root');

// Initial state
let currentPage = 'home';
let currentParams = null; // Store current page parameters

/**
 * Render the application
 */
function renderApp() {
    // Clear root
    root.innerHTML = '';

    const appContainer = createElement('div', { className: 'flex flex-col min-h-screen' });

    // Header (only show if not on login page)
    if (currentPage !== 'login') {
        const header = Header({
            activePage: currentPage,
            onNavigate: (page, params) => {
                currentPage = page;
                currentParams = params || null;
                renderApp();
                window.scrollTo(0, 0);
            }
        });
        appContainer.appendChild(header);
    }

    // Main Content with page transition animation
    const main = createElement('main', { className: 'flex-grow page-transition' });

    // Route to different pages
    switch (currentPage) {
        case 'home':
            render(HomePage({
                onNavigate: (page) => {
                    currentPage = page;
                    renderApp();
                    window.scrollTo(0, 0);
                }
            }), main);
            break;

        case 'about':
            render(AboutPage(), main);
            break;

        case 'assets':
            render(AssetListPage({
                assets,
                onNavigate: (page, params) => {
                    currentPage = page;
                    currentParams = params || null;
                    renderApp();
                    window.scrollTo(0, 0);
                }
            }), main);
            break;

        case 'asset-detail':
            // Find asset by ID
            const assetId = currentParams;
            const asset = assets.find(a => a.id === assetId);
            render(AssetDetailPage({
                asset,
                onNavigate: (page, params) => {
                    currentPage = page;
                    currentParams = params || null;
                    renderApp();
                    window.scrollTo(0, 0);
                }
            }), main);
            break;

        case 'news':
            render(NewsPage({
                onNavigate: (page, params) => {
                    currentPage = page;
                    currentParams = params || null;
                    renderApp();
                    window.scrollTo(0, 0);
                }
            }), main);
            break;

        case 'news-detail':
            // params: news id
            const newsId = currentParams;
            render(NewsDetailPage({ id: newsId, onNavigate: (page) => {
                currentPage = page;
                currentParams = null;
                renderApp();
                window.scrollTo(0, 0);
            }}), main);
            break;

        case 'notifications':
            render(NotificationArchivePage({ notifData }), main);
            break;

        case 'cars':
            render(CarAuctionPage({ carPlates: expandedCarPlates, officialCarPlates, auctionResultsData }), main);
            break;

        case 'motorbikes':
            render(MotorbikeAuctionPage({ motorbikePlates: expandedMotorbikePlates, officialMotorbikePlates, motorbikeAuctionResults }), main);
            break;

        case 'cart':
            render(CartPage(), main);
            break;

        case 'checkout':
            render(CheckoutPage(), main);
            break;

        case 'payment':
            render(PaymentPage(), main);
            break;

        case 'payment-success':
            render(PaymentSuccessPage(), main);
            break;

        case 'payment-failure':
            render(PaymentFailurePage(), main);
            break;

        case 'profile':
            render(ProfilePage(), main);
            break;

        case 'auction-history':
            render(AuctionHistoryPage(), main);
            break;

        case 'pending-plates':
            render(PendingPlatesPage(), main);
            break;

        case 'documents':
            render(DocumentsPage(), main);
            break;

        case 'login':
            render(LoginPage({
                onLoginSuccess: () => {
                    currentPage = 'home';
                    renderApp();
                    window.scrollTo(0, 0);
                }
            }), main);
            break;

        case 'phase1-demo':
            render(Phase1DemoPage(), main);
            break;

        case 'deposit-demo':
            render(DepositDemoPage(), main);
            break;

        case 'payment-demo':
            render(PaymentDemoPage(), main);
            break;

        case 'payment':
            // Parse URL parameters
            const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
            const auctionId = urlParams.get('auction');
            const itemName = urlParams.get('item');
            const winningBid = parseInt(urlParams.get('amount'));

            render(PaymentPage({ auctionId, itemName, winningBid }), main);
            break;

        default:
            // Default to home
            render(HomePage({
                onNavigate: (page) => {
                    currentPage = page;
                    renderApp();
                    window.scrollTo(0, 0);
                }
            }), main);
    }

    appContainer.appendChild(main);

    // Footer and Floating Actions (only show if not on login page)
    if (currentPage !== 'login') {
        appContainer.appendChild(Footer());
        appContainer.appendChild(FloatingActions());
    }

    root.appendChild(appContainer);

    // Initialize Lucide icons after render
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Handle hash changes for routing
function handleHashChange() {
    const hash = window.location.hash.slice(1); // Remove #
    console.log('🔀 Hash changed to:', hash);

    const [path, params] = hash.split('/').filter(Boolean);

    console.log('🔀 Parsed route:', { path, params });

    // Handle different routes
    if (!path || path === '') {
        currentPage = 'home';
        currentParams = null;
    } else if (path === 'asset-detail' && params) {
        currentPage = 'asset-detail';
        currentParams = params;
    } else {
        currentPage = path;
        currentParams = params || null;
    }

    console.log('🔀 Navigating to page:', currentPage, 'with params:', currentParams);
    renderApp();
    window.scrollTo(0, 0);
}

// Start the app
initTheme(); // Initialize theme system
initBackToTop(); // Initialize back to top button
initUserProfile(); // Initialize user profile

// Listen for hash changes
window.addEventListener('hashchange', handleHashChange);
console.log('✅ Hash change listener added');

// Initial render
handleHashChange(); // Handle initial hash

// Subscribe to auth state changes
subscribeToAuth(() => {
    // Re-render the app when auth state changes
    initUserProfile(); // Re-init profile on auth change
    renderApp();
});
