import { createElement, createFromHTML } from '../utils/dom.js';
import { PageBanner } from './shared/PageBanner.js';

/**
 * AssetList Page
 * Displays auction assets with search and grid layout
 */
export function AssetListPage({ assets = [], onNavigate }) {
    const container = createElement('div', {
        id: 'assets',
        className: 'bg-gray-50'
    });

    // Banner Header
    const banner = createElement('div', {
        className: 'relative h-80 bg-cover bg-center overflow-hidden'
    });
    banner.style.backgroundImage = 'url("images/banners/assets_banner.png")';
    banner.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div class="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">
                Danh sách tài sản đấu giá
            </h1>
            <p class="text-xl text-white/90 max-w-2xl" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5)">
                Khám phá và đấu giá các tài sản giá trị
            </p>
        </div>
    `;
    container.appendChild(banner);

    // Content wrapper
    const contentWrapper = createElement('div', { className: 'bg-white' });
    const innerContainer = createElement('div', { className: 'container mx-auto px-4 py-10' });

    // Search and Filter Bar
    const searchBarHtml = `
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div class="relative w-full md:w-1/2">
                <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2563EB]" style="width: 18px; height: 18px;"></i>
                <input type="text" placeholder="Tìm kiếm tài sản" class="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#2563EB] text-sm bg-white shadow-sm" />
            </div>
            <button class="bg-[#2563EB] text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-[#0d9488]">Xem thêm</button>
        </div>
    `;
    const searchBar = createFromHTML(searchBarHtml);
    innerContainer.appendChild(searchBar);

    // Assets Grid
    const grid = createElement('div', {
        className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
    });

    assets.forEach(asset => {
        const card = createAssetCard(asset, onNavigate);
        grid.appendChild(card);
    });

    innerContainer.appendChild(grid);

    // Pagination
    const paginationHtml = `
        <div class="flex justify-end mt-6">
            <div class="flex gap-1">
                <button class="w-8 h-8 flex items-center justify-center rounded bg-[#2563EB] text-white font-bold text-sm">1</button>
            </div>
        </div>
    `;
    const pagination = createFromHTML(paginationHtml);
    innerContainer.appendChild(pagination);

    contentWrapper.appendChild(innerContainer);
    container.appendChild(contentWrapper);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

function createAssetCard(asset, onNavigate) {
    const isExpired = asset.status === 'expired';

    const cardHtml = `
        <div class="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
            <div class="relative h-48 overflow-hidden">
                <img src="${asset.image}" alt="${asset.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div class="absolute top-2 left-2 bg-blue-400 text-red-700 p-1 rounded-full shadow-md">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png" class="w-6 h-6 rounded-full object-cover border border-white" alt="icon"/>
                </div>
                ${isExpired ? `
                    <div class="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Hết hạn
                    </div>
                ` : `
                    <div class="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Đang mở
                    </div>
                `}
            </div>
            <div class="p-5">
                <h3 class="font-bold text-gray-800 text-sm mb-4 line-clamp-2 h-10">${asset.title}</h3>
                
                <div class="flex items-center gap-2 mb-3">
                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <i data-lucide="dollar-sign" style="width: 16px; height: 16px;"></i>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">Giá khởi điểm</p>
                        <p class="text-[#2563EB] font-bold text-base">${asset.startPrice}</p>
                    </div>
                </div>

                <div class="space-y-3 mb-4">
                    <div class="flex items-start gap-2">
                        <i data-lucide="clock" class="text-gray-400 mt-0.5" style="width: 16px; height: 16px;"></i>
                        <div>
                            <p class="text-xs text-gray-500">Thời gian đấu giá</p>
                            <p class="text-gray-800 font-medium text-sm">${asset.auctionTime}</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-2">
                        <i data-lucide="clock" class="text-gray-400 mt-0.5" style="width: 16px; height: 16px;"></i>
                        <div>
                            <p class="text-xs text-gray-500">Thời gian đăng ký</p>
                            <p class="text-gray-800 font-medium text-sm ${isExpired ? 'text-red-600' : ''}">${asset.registerTime}</p>
                        </div>
                    </div>
                </div>
                
                <button class="view-details-btn w-full bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white px-4 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
                    <i data-lucide="eye" style="width: 16px; height: 16px;"></i>
                    <span>Xem chi tiết</span>
                </button>
            </div>
        </div>
    `;

    const card = createFromHTML(cardHtml);

    // Add click event for view details button
    const viewDetailBtn = card.querySelector('.view-details-btn');
    viewDetailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onNavigate) {
            onNavigate('asset-detail', asset.id);
        }
    });

    return card;
}
