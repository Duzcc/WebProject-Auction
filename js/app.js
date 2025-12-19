import { Header } from './core/components/Header.js';
import { Footer } from './core/components/Footer.js';
import { FloatingActions } from './shared/components/FloatingActions.js';

// Trang chính
import { HomePage } from './core/pages/HomePage.js';
import { AboutPage } from './core/pages/AboutPage.js';
import { NewsPage } from './features/news/pages/NewsPage.js';

// Trang đấu giá
import { CarAuctionPage } from './features/auction-car/pages/CarAuctionPage.js';
import { MotorbikeAuctionPage } from './features/auction-motorbike/pages/MotorbikeAuctionPage.js';
import { AssetListPage } from './features/auction-asset/pages/AssetListPage.js';
import { AssetDetailPage } from './features/auction-asset/pages/AssetDetailPage.js';
import { AuctionHistoryPage } from './features/auction-shared/pages/AuctionHistoryPage.js';
import { PendingPlatesPage } from './features/auction-shared/pages/PendingPlatesPage.js';

// Trang thanh toán
import { CartPage } from './features/payment/pages/CartPage.js';
import { CheckoutPage } from './features/payment/pages/CheckoutPage.js';
import { PaymentPage } from './features/payment/pages/PaymentPage.js';
import { PaymentSuccessPage } from './features/payment/pages/PaymentSuccessPage.js';
import { PaymentFailurePage } from './features/payment/pages/PaymentFailurePage.js';

// Trang người dùng
import { LoginPage } from './features/user/pages/LoginPage.js';
import { ProfilePage } from './features/user/pages/ProfilePage.js';
import { DocumentsPage } from './features/user/pages/DocumentsPage.js';



import { render, createElement } from './shared/utils/dom.js';
import { subscribeToAuth } from './features/user/utils/auth.js';
import { initTheme } from './core/utils/theme.js';
import { initBackToTop } from './shared/components/BackToTop.js';
import { initUserProfile } from './features/user/utils/userProfile.js';
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
    expandedCarPlates,
    expandedMotorbikePlates
} from './data/constants.js';

const root = document.getElementById('root');

// Trạng thái hiện tại của ứng dụng
let currentPage = 'home';
let currentParams = null;

// Render ứng dụng
function renderApp() {
    root.innerHTML = '';

    const appContainer = createElement('div', { className: 'flex flex-col min-h-screen' });

    // Header (không hiển thị ở trang login)
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

    // Nội dung chính
    const main = createElement('main', { className: 'flex-grow page-transition' });

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
            render(NewsPage(), main);
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

        case 'payment':
            const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
            const auctionId = urlParams.get('auction');
            const itemName = urlParams.get('item');
            const winningBid = parseInt(urlParams.get('amount'));

            render(PaymentPage({ auctionId, itemName, winningBid }), main);
            break;

        default:
            render(HomePage({
                onNavigate: (page) => {
                    currentPage = page;
                    renderApp();
                    window.scrollTo(0, 0);
                }
            }), main);
    }

    appContainer.appendChild(main);

    // Footer và Floating Actions (không hiển thị ở trang login)
    if (currentPage !== 'login') {
        appContainer.appendChild(Footer());
        appContainer.appendChild(FloatingActions());
    }

    root.appendChild(appContainer);

    // Khởi tạo icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Xử lý thay đổi URL để điều hướng trang
function handleHashChange() {
    const hash = window.location.hash.slice(1);
    console.log('🔀 Hash changed to:', hash);

    const [path, params] = hash.split('/').filter(Boolean);
    console.log('🔀 Parsed route:', { path, params });
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

// Khởi động ứng dụng
initTheme();
initBackToTop();
initUserProfile();

// Dọn dẹp các đơn hàng hết hạn khi khởi động
import('./features/payment/utils/orderManager.js').then(({ cleanupExpiredOrders }) => {
    cleanupExpiredOrders();
    console.log('✅ Order cleanup completed');
}).catch(err => {
    console.warn('⚠️ Could not cleanup expired orders:', err);
});

// Lắng nghe sự thay đổi URL
window.addEventListener('hashchange', handleHashChange);
console.log('✅ Hash change listener added');

// Render lần đầu
handleHashChange();

// Theo dõi thay đổi trạng thái đăng nhập
subscribeToAuth(() => {
    initUserProfile();
    renderApp();
});
