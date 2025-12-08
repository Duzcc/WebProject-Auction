/**
 * Asset Detail Page
 * Displays comprehensive asset information with registration functionality
 */

import { createElement, createFromHTML } from '../utils/dom.js';
import { PageBanner } from './shared/PageBanner.js';
import { AuctionRegistrationModal } from './shared/AuctionRegistrationModal.js';
import { isRegisteredForAuction } from '../utils/auctionRegistration.js';
import { getAuthState } from '../utils/auth.js';
import toast from '../utils/toast.js';
import { showLightbox } from './shared/Lightbox.js';

/**
 * Asset Detail Page Component
 * @param {Object} params
 * @param {Object} params.asset - Asset data
 * @param {Function} params.onNavigate - Navigation callback
 */
export function AssetDetailPage({ asset, onNavigate }) {
    if (!asset) {
        return createNotFoundPage(onNavigate);
    }

    const container = createElement('div', { className: 'bg-gray-50 dark:bg-gray-900' });

    // Banner
    container.appendChild(PageBanner({
        title: asset?.name || 'Chi tiết tài sản',
        subtitle: 'Thông tin chi tiết'
    }));

    // Main content
    const mainContent = createElement('div', { className: 'container mx-auto px-4 py-8' });

    // Breadcrumb
    const breadcrumb = createBreadcrumb(asset, onNavigate);
    mainContent.appendChild(breadcrumb);

    // Content grid
    const contentGrid = createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6' });

    // Left column - Images and details (2 columns)
    const leftColumn = createElement('div', { className: 'lg:col-span-2 space-y-6' });

    // Image gallery
    leftColumn.appendChild(createImageGallery(asset));

    // Description
    leftColumn.appendChild(createDescription(asset));

    // Specifications
    leftColumn.appendChild(createSpecifications(asset));

    // Auction info
    leftColumn.appendChild(createAuctionInfo(asset));

    // Right column - Registration card (1 column)
    const rightColumn = createElement('div', { className: 'lg:col-span-1' });
    rightColumn.appendChild(createRegistrationCard(asset));

    contentGrid.appendChild(leftColumn);
    contentGrid.appendChild(rightColumn);
    mainContent.appendChild(contentGrid);

    container.appendChild(mainContent);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

/**
 * Create breadcrumb navigation
 */
function createBreadcrumb(asset, onNavigate) {
    const breadcrumb = createFromHTML(`
        <nav class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <a href="#" class="home-link hover:text-[#2563EB] transition-colors">Trang chủ</a>
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
            <a href="#" class="assets-link hover:text-[#2563EB] transition-colors">Danh sách tài sản</a>
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
            <span class="text-gray-900 dark:text-white font-semibold">${asset.shortTitle || asset.title}</span>
        </nav>
    `);

    breadcrumb.querySelector('.home-link').addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('home');
    });

    breadcrumb.querySelector('.assets-link').addEventListener('click', (e) => {
        e.preventDefault();
        onNavigate('assets');
    });

    return breadcrumb;
}

/**
 * Create image gallery with lightbox
 */
function createImageGallery(asset) {
    const gallery = createElement('div', { className: 'bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden' });

    const images = asset.images || [asset.image];

    // Main image
    const mainImageContainer = createElement('div', { className: 'relative aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700' });
    const mainImage = createElement('img', {
        className: 'w-full h-96 object-cover cursor-pointer hover:opacity-90 transition-opacity',
        src: images[0],
        alt: asset.title
    });

    mainImage.addEventListener('click', () => {
        showLightbox({ images, startIndex: 0 });
    });

    mainImageContainer.appendChild(mainImage);
    gallery.appendChild(mainImageContainer);

    // Thumbnail grid (if multiple images)
    if (images.length > 1) {
        const thumbGrid = createElement('div', { className: 'grid grid-cols-4 gap-2 p-4' });

        images.slice(0, 4).forEach((img, index) => {
            const thumb = createElement('img', {
                className: 'w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity border-2 border-transparent hover:border-[#2563EB]',
                src: img,
                alt: `${asset.title} - ${index + 1}`
            });

            thumb.addEventListener('click', () => {
                showLightbox({ images, startIndex: index });
            });

            thumbGrid.appendChild(thumb);
        });

        gallery.appendChild(thumbGrid);
    }

    return gallery;
}

/**
 * Create description section
 */
function createDescription(asset) {
    return createFromHTML(`
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mô tả tài sản</h2>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed">${asset.description}</p>
        </div>
    `);
}

/**
 * Create specifications table
 */
function createSpecifications(asset) {
    const specs = asset.specifications || [];

    const specsHtml = specs.map(spec => `
        <tr class="border-b border-gray-200 dark:border-gray-700 last:border-0">
            <td class="py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50">${spec.label}</td>
            <td class="py-3 px-4 text-gray-600 dark:text-gray-400">${spec.value}</td>
        </tr>
    `).join('');

    return createFromHTML(`
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Thông số kỹ thuật</h2>
            <table class="w-full">
                <tbody>
                    ${specsHtml}
                </tbody>
            </table>
        </div>
    `);
}

/**
 * Create auction information
 */
function createAuctionInfo(asset) {
    const info = asset.auctionInfo || {};

    return createFromHTML(`
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Thông tin đấu giá</h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <i data-lucide="monitor" class="w-6 h-6 text-[#2563EB]"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Hình thức</p>
                        <p class="font-semibold text-gray-900 dark:text-white">${info.method || 'Đấu giá trực tuyến'}</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <i data-lucide="trending-up" class="w-6 h-6 text-blue-600"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Bước giá</p>
                        <p class="font-semibold text-gray-900 dark:text-white">${(info.priceStep || 0).toLocaleString('vi-VN')} VNĐ</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <i data-lucide="users" class="w-6 h-6 text-blue-600"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Người tham gia</p>
                        <p class="font-semibold text-gray-900 dark:text-white">${info.participants || 0} người</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <i data-lucide="eye" class="w-6 h-6 text-orange-600"></i>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Lượt xem</p>
                        <p class="font-semibold text-gray-900 dark:text-white">${info.viewCount || 0} lượt</p>
                    </div>
                </div>
            </div>
        </div>
    `);
}

/**
 * Create registration card (sticky sidebar)
 */
function createRegistrationCard(asset) {
    const authState = getAuthState();
    const isRegistered = isRegisteredForAuction(`asset-${asset.id}`);
    const isExpired = asset.status === 'expired';

    const card = createFromHTML(`
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4">
            <div class="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <h3 class="text-2xl font-bold text-[#2563EB] mb-2">${asset.startPrice}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Giá khởi điểm</p>
            </div>
            
            <div class="space-y-4 mb-6">
                <div class="flex items-start gap-3">
                    <i data-lucide="calendar" class="w-5 h-5 text-gray-400 mt-0.5"></i>
                    <div class="flex-1">
                        <p class="text-sm text-gray-500 dark:text-gray-400">Thời gian đấu giá</p>
                        <p class="font-semibold text-gray-900 dark:text-white">${asset.auctionTime}</p>
                    </div>
                </div>
                
                <div class="flex items-start gap-3">
                    <i data-lucide="clock" class="w-5 h-5 text-gray-400 mt-0.5"></i>
                    <div class="flex-1">
                        <p class="text-sm text-gray-500 dark:text-gray-400">Thời gian đăng ký còn lại</p>
                        <p class="font-semibold ${isExpired ? 'text-red-600' : 'text-gray-900 dark:text-white'}">${asset.registerTime}</p>
                    </div>
                </div>
                
                <div class="flex items-start gap-3">
                    <i data-lucide="map-pin" class="w-5 h-5 text-gray-400 mt-0.5"></i>
                    <div class="flex-1">
                        <p class="text-sm text-gray-500 dark:text-gray-400">Địa điểm</p>
                        <p class="font-semibold text-gray-900 dark:text-white">${asset.location || 'Chưa cập nhật'}</p>
                    </div>
                </div>
                
                <div class="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <i data-lucide="wallet" class="w-5 h-5 text-[#2563EB] mt-0.5"></i>
                    <div class="flex-1">
                        <p class="text-sm text-gray-600 dark:text-gray-400">Tiền đặt cọc</p>
                        <p class="font-bold text-[#2563EB]">${asset.depositAmount.toLocaleString('vi-VN')} VNĐ</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">(${asset.depositPercent}% giá khởi điểm)</p>
                    </div>
                </div>
            </div>
            
            ${isExpired ? `
                <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                    <div class="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <i data-lucide="alert-circle" class="w-5 h-5"></i>
                        <p class="font-semibold">Đã hết hạn đăng ký</p>
                    </div>
                </div>
                <button disabled class="w-full bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold py-3 rounded-lg cursor-not-allowed">
                    Hết hạn đăng ký
                </button>
            ` : isRegistered ? `
                <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                    <div class="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <i data-lucide="check-circle" class="w-5 h-5"></i>
                        <p class="font-semibold">Bạn đã đăng ký cuộc đấu giá này</p>
                    </div>
                </div>
                <button class="view-registration-btn w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors">
                    Xem đăng ký của tôi
                </button>
            ` : `
                <button class="register-btn w-full bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white font-bold py-3 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                    <i data-lucide="file-plus" class="w-5 h-5"></i>
                    <span>Đăng ký tham gia đấu giá</span>
                </button>
                ${!authState.isAuthenticated ? `
                    <p class="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                        <i data-lucide="info" class="w-3 h-3 inline"></i>
                        Bạn cần đăng nhập để đăng ký
                    </p>
                ` : ''}
            `}
            
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-500 dark:text-gray-400">Danh mục:</span>
                    <span class="font-semibold text-gray-900 dark:text-white">${asset.category}</span>
                </div>
            </div>
        </div>
    `);

    // Add event listeners
    const registerBtn = card.querySelector('.register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            if (!authState.isAuthenticated) {
                toast.error('Vui lòng đăng nhập để đăng ký đấu giá');
                return;
            }

            // Open registration modal
            AuctionRegistrationModal({
                auctionId: `asset-${asset.id}`,
                auctionName: asset.title,
                auctionType: asset.category,
                depositAmount: asset.depositAmount,
                auctionDate: new Date(asset.auctionDate)
            });
        });
    }

    const viewRegBtn = card.querySelector('.view-registration-btn');
    if (viewRegBtn) {
        viewRegBtn.addEventListener('click', () => {
            window.location.hash = '#/auction-history';
        });
    }

    return card;
}

/**
 * Create 404 not found page
 */
function createNotFoundPage(onNavigate) {
    const notFound = createFromHTML(`
        <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div class="text-center">
                <i data-lucide="alert-triangle" class="w-24 h-24 text-gray-400 mx-auto mb-4"></i>
                <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Không tìm thấy tài sản</h1>
                <p class="text-gray-600 dark:text-gray-400 mb-6">Tài sản bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <button class="back-btn bg-[#2563EB] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E40AF] transition-colors">
                    Quay lại danh sách
                </button>
            </div>
        </div>
    `);

    notFound.querySelector('.back-btn').addEventListener('click', () => {
        onNavigate('assets');
    });

    return notFound;
}

export default AssetDetailPage;
