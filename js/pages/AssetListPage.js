import { createElement, createFromHTML } from '../utils/dom.js';

/**
 * AssetList Page
 * Displays auction assets with search and grid layout
 */
export function AssetListPage({ assets = [] }) {
    const container = createElement('div', {
        id: 'assets',
        className: 'py-16 bg-[#f8f9fa]'
    });

    const innerContainer = createElement('div', { className: 'container mx-auto px-4' });

    // Title
    const title = createElement('h2', {
        className: 'text-3xl font-bold text-gray-900 mb-8'
    }, 'Danh sách tài sản đấu giá');
    innerContainer.appendChild(title);

    // Search and Filter Bar
    const searchBarHtml = `
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div class="relative w-full md:w-1/2">
                <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#be1e2d]" style="width: 18px; height: 18px;"></i>
                <input type="text" placeholder="Tìm kiếm tài sản" class="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#be1e2d] text-sm bg-white shadow-sm" />
            </div>
            <button class="bg-[#be1e2d] text-white px-8 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-[#a01825]">Xem thêm</button>
        </div>
    `;
    const searchBar = createFromHTML(searchBarHtml);
    innerContainer.appendChild(searchBar);

    // Assets Grid
    const grid = createElement('div', {
        className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
    });

    assets.forEach(asset => {
        const card = createAssetCard(asset);
        grid.appendChild(card);
    });

    innerContainer.appendChild(grid);

    // Pagination
    const paginationHtml = `
        <div class="flex justify-end mt-6">
            <div class="flex gap-1">
                <button class="w-8 h-8 flex items-center justify-center rounded bg-[#be1e2d] text-white font-bold text-sm">1</button>
            </div>
        </div>
    `;
    const pagination = createFromHTML(paginationHtml);
    innerContainer.appendChild(pagination);

    container.appendChild(innerContainer);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

function createAssetCard(asset) {
    const cardHtml = `
        <div class="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
            <div class="relative h-48 overflow-hidden">
                <img src="${asset.image}" alt="${asset.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div class="absolute top-2 left-2 bg-yellow-400 text-red-700 p-1 rounded-full shadow-md">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2000px-Flag_of_Vietnam.svg.png" class="w-6 h-6 rounded-full object-cover border border-white" alt="icon"/>
                </div>
            </div>
            <div class="p-5">
                <h3 class="font-bold text-gray-800 text-sm mb-4 line-clamp-2 h-10">${asset.title}</h3>
                
                <div class="flex items-center gap-2 mb-3">
                    <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <i data-lucide="dollar-sign" style="width: 16px; height: 16px;"></i>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">Giá khởi điểm</p>
                        <p class="text-[#be1e2d] font-bold text-base">${asset.startPrice}</p>
                    </div>
                </div>

                <div class="space-y-3">
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
                            <p class="text-gray-800 font-medium text-sm">${asset.registerTime}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return createFromHTML(cardHtml);
}
