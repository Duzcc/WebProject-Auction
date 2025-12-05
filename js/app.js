import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { FloatingActions } from './components/FloatingActions.js';
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { AssetListPage } from './pages/AssetListPage.js';
import { NotificationArchivePage } from './pages/NotificationArchivePage.js';
import { CarAuctionPage } from './pages/CarAuctionPage.js';
import { MotorbikeAuctionPage } from './pages/MotorbikeAuctionPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { CartPage } from './pages/CartPage.js';
import { ProfilePage } from './pages/ProfilePage.js';
import { render, createElement } from './utils/dom.js';
import { subscribeToAuth } from './utils/auth.js';
import { initTheme } from './utils/theme.js';
import { initBackToTop } from './components/Shared/BackToTop.js';
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
    motorbikeAuctionResults
} from './data/constants.js';

const root = document.getElementById('root');

// Initial state
let currentPage = 'home';

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
            onNavigate: (page) => {
                currentPage = page;
                renderApp();
                window.scrollTo(0, 0);
            }
        });
        appContainer.appendChild(header);
    }

    // Main Content
    const main = createElement('main', { className: 'flex-grow' });

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
            render(AssetListPage({ assets }), main);
            break;

        case 'news':
        case 'notifications':
            render(NotificationArchivePage({ notifData }), main);
            break;

        case 'cars':
            render(CarAuctionPage({ carPlates, officialCarPlates, auctionResultsData }), main);
            break;

        case 'motorbikes':
            render(MotorbikeAuctionPage({ motorbikePlates, officialMotorbikePlates, motorbikeAuctionResults }), main);
            break;

        case 'cart':
            render(CartPage(), main);
            break;

        case 'profile':
            render(ProfilePage(), main);
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

// Start the app
initTheme(); // Initialize theme system
initBackToTop(); // Initialize back to top button
initUserProfile(); // Initialize user profile
renderApp();

// Subscribe to auth state changes
subscribeToAuth(() => {
    // Re-render the app when auth state changes
    initUserProfile(); // Re-init profile on auth change
    renderApp();
});
