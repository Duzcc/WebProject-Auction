import { createElement } from '../../../shared/utils/dom.js';
import {
    placeBid,
    getBidIncrement,
    getBidHistory,
    getWinningBid,
    isUserWinning,
    enableAutoBid,
    disableAutoBid,
    getAutoBid,
    subscribeToBids
} from '../utils/auctionBidding.js';
import { getAuthState } from '../../../features/user/utils/auth.js';
import toast from '../../../shared/utils/toast.js';

/**
 * BiddingInterface Component
 * Real-time bidding interface for live auctions
 */
export function BiddingInterface({ auction }) {
    if (!auction) {
        console.error('BiddingInterface: auction data is required');
        return createElement('div');
    }

    const container = createElement('div', {
        className: 'bidding-interface bg-white rounded-2xl shadow-lg p-6'
    });

    const authState = getAuthState();
    const isRegistered = auction.registeredUsers?.includes(authState.user?.email);
    const currentBid = auction.currentBid || auction.startingPrice;
    const minIncrement = getBidIncrement(currentBid);
    const suggestedBid = currentBid + minIncrement;

    // State
    let customBidAmount = suggestedBid;
    let showAutoBid = false;
    let autoBidData = getAutoBid(auction.id);

    function render() {
        const isWinning = isUserWinning(auction.id);
        const winningBid = getWinningBid(auction.id);
        const bidHistory = getBidHistory(auction.id);

        container.innerHTML = `
            <!-- Header -->
            <div class="mb-6">
                <div class="flex items-center justify-between mb-2">
                    <h3 class="text-2xl font-black text-gray-900">Đấu giá trực tiếp</h3>
                    ${auction.status === 'live' ? `
                        <span class="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold animate-pulse">
                            <span class="w-2 h-2 bg-red-600 rounded-full"></span>
                            ĐANG DIỄN RA
                        </span>
                    ` : `
                        <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-bold">
                            ${auction.status === 'upcoming' ? 'SẮP BẮT ĐẦU' : 'ĐÃ KẾT THÚC'}
                        </span>
                    `}
                </div>
                <p class="text-gray-600">Biển số: <span class="font-bold text-blue-600">${auction.plateNumber || auction.name}</span></p>
            </div>

            <!-- Current Bid Display -->
            <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl mb-6">
                <div class="text-center">
                    <p class="text-sm font-semibold text-gray-600 mb-2">Giá hiện tại</p>
                    <div class="text-4xl font-black text-blue-600 mb-2">
                        ${currentBid.toLocaleString('vi-VN')} <span class="text-xl">VNĐ</span>
                    </div>
                    ${winningBid ? `
                        <div class="flex items-center justify-center gap-2 text-sm text-gray-700">
                            <i data-lucide="user" class="w-4 h-4"></i>
                            <span>${winningBid.userId === authState.user?.email ? 'Bạn' : winningBid.userName}</span>
                            ${isWinning ? `
                                <span class="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                    ĐANG DẪN ĐẦU
                                </span>
                            ` : ''}
                        </div>
                    ` : `
                        <p class="text-sm text-gray-600">Chưa có ai đặt giá</p>
                    `}
                </div>
                
                <div class="mt-4 pt-4 border-t border-blue-200 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p class="text-gray-600 mb-1">Giá khởi điểm</p>
                        <p class="font-bold text-gray-900">${auction.startingPrice.toLocaleString('vi-VN')} VNĐ</p>
                    </div>
                    <div>
                        <p class="text-gray-600 mb-1">Số lượt đặt</p>
                        <p class="font-bold text-gray-900">${auction.bidCount || 0} lượt</p>
                    </div>
                </div>
            </div>

            ${!authState.isAuthenticated ? `
                <!-- Not Logged In -->
                <div class="text-center py-8 bg-gray-50 rounded-lg">
                    <i data-lucide="lock" class="w-12 h-12 text-gray-400 mx-auto mb-3"></i>
                    <p class="text-gray-700 font-semibold mb-2">Vui lòng đăng nhập</p>
                    <p class="text-sm text-gray-600">Đăng nhập để tham gia đấu giá</p>
                </div>
            ` : !isRegistered ? `
                <!-- Not Registered -->
                <div class="text-center py-8 bg-amber-50 border border-amber-200 rounded-lg">
                    <i data-lucide="alert-triangle" class="w-12 h-12 text-amber-600 mx-auto mb-3"></i>
                    <p class="text-gray-800 font-semibold mb-2">Chưa đăng ký đấu giá</p>
                    <p class="text-sm text-gray-600 mb-4">Vui lòng đăng ký và đặt cọc trước khi tham gia</p>
                    <button 
                        id="register-auction-btn"
                        class="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Đăng ký ngay
                    </button>
                </div>
            ` : auction.status !== 'live' ? `
                <!-- Auction Not Live -->
                <div class="text-center py-8 bg-gray-50 rounded-lg">
                    <i data-lucide="clock" class="w-12 h-12 text-gray-400 mx-auto mb-3"></i>
                    <p class="text-gray-700 font-semibold mb-2">
                        ${auction.status === 'upcoming' ? 'Phiên đấu giá chưa bắt đầu' : 'Phiên đấu giá đã kết thúc'}
                    </p>
                    <p class="text-sm text-gray-600">Vui lòng quay lại sau</p>
                </div>
            ` : `
                <!-- Bidding Controls -->
                <div id="bidding-controls" class="space-y-4">
                    <!-- Quick Bid Buttons -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Đặt giá nhanh</label>
                        <div class="grid grid-cols-3 gap-2">
                            ${[1, 2, 3].map(multiplier => {
            const amount = currentBid + (minIncrement * multiplier);
            return `
                                    <button 
                                        class="quick-bid-btn px-4 py-3 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-400 text-blue-700 font-bold rounded-lg transition-all hover:scale-105"
                                        data-amount="${amount}"
                                    >
                                        +${(minIncrement * multiplier / 1000000)}M
                                        <div class="text-xs font-normal mt-1">${amount.toLocaleString('vi-VN')}</div>
                                    </button>
                                `;
        }).join('')}
                        </div>
                    </div>

                    <!-- Custom Bid Input -->
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Đặt giá tùy chỉnh</label>
                        <div class="flex gap-2">
                            <div class="flex-1 relative">
                                <input
                                    type="text"
                                    id="custom-bid-input"
                                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-bold text-lg"
                                    placeholder="${suggestedBid.toLocaleString('vi-VN')}"
                                    value="${customBidAmount.toLocaleString('vi-VN')}"
                                />
                                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">VNĐ</span>
                            </div>
                            <button
                                id="place-custom-bid-btn"
                                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105 flex items-center gap-2"
                            >
                                <i data-lucide="gavel" class="w-5 h-5"></i>
                                Đặt giá
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">
                            Giá tối thiểu: ${suggestedBid.toLocaleString('vi-VN')} VNĐ (Bước nhảy: ${minIncrement.toLocaleString('vi-VN')} VNĐ)
                        </p>
                    </div>

                    <!-- Auto Bid Toggle -->
                    <div class="border-t pt-4">
                        <button
                            id="toggle-auto-bid-btn"
                            class="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-all"
                        >
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                                    <i data-lucide="zap" class="w-5 h-5 text-purple-700"></i>
                                </div>
                                <div class="text-left">
                                    <p class="font-bold text-gray-900">Đặt giá tự động</p>
                                    <p class="text-xs text-gray-600">Tự động đấu giá khi bị trả giá</p>
                                </div>
                            </div>
                            <i data-lucide="chevron-${showAutoBid ? 'up' : 'down'}" class="w-5 h-5 text-gray-600"></i>
                        </button>
                        
                        <div id="auto-bid-panel" class="mt-3 p-4 bg-purple-50 rounded-lg ${showAutoBid ? '' : 'hidden'}">
                            ${autoBidData ? `
                                <div class="space-y-3">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm text-gray-700">Giá tối đa:</span>
                                        <span class="font-bold text-purple-700">${autoBidData.maxBid.toLocaleString('vi-VN')} VNĐ</span>
                                    </div>
                                    <button
                                        id="disable-auto-bid-btn"
                                        class="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition-colors"
                                    >
                                        Tắt đặt giá tự động
                                    </button>
                                </div>
                            ` : `
                                <div class="space-y-3">
                                    <label class="block text-sm font-semibold text-gray-700">Giá tối đa bạn muốn trả</label>
                                    <input
                                        type="text"
                                        id="auto-bid-max-input"
                                        class="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-bold"
                                        placeholder="${(currentBid + minIncrement * 5).toLocaleString('vi-VN')}"
                                    />
                                    <button
                                        id="enable-auto-bid-btn"
                                        class="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
                                    >
                                        Kích hoạt
                                    </button>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
            `}

            <!-- Bid History -->
            <div class="mt-6 border-t pt-4">
                <h4 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i data-lucide="history" class="w-4 h-4"></i>
                    Lịch sử đặt giá
                </h4>
                <div class="max-h-64 overflow-y-auto space-y-2">
                    ${bidHistory.length > 0 ? bidHistory.slice(0, 10).map(bid => `
                        <div class="flex items-center justify-between text-sm p-3 ${bid.userId === authState.user?.email ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'} rounded-lg">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 bg-${bid.userId === authState.user?.email ? 'blue' : 'gray'}-200 rounded-full flex items-center justify-center">
                                    <i data-lucide="user" class="w-4 h-4 text-${bid.userId === authState.user?.email ? 'blue' : 'gray'}-700"></i>
                                </div>
                                <div>
                                    <p class="font-semibold text-gray-900">
                                        ${bid.userId === authState.user?.email ? 'Bạn' : bid.userName}
                                    </p>
                                    <p class="text-xs text-gray-500">${new Date(bid.timestamp).toLocaleTimeString('vi-VN')}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-${bid.status === 'winning' ? 'green' : 'gray'}-700">
                                    ${bid.amount.toLocaleString('vi-VN')} VNĐ
                                </p>
                                ${bid.status === 'winning' ? `
                                    <span class="text-xs text-green-600 font-semibold">Đang thắng</span>
                                ` : bid.status === 'outbid' ? `
                                    <span class="text-xs text-gray-500">Đã bị trả giá</span>
                                ` : ''}
                            </div>
                        </div>
                    `).join('') : `
                        <p class="text-center text-gray-500 text-sm py-4">Chưa có lượt đặt giá nào</p>
                    `}
                </div>
            </div>
        `;

        // Re-initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        attachEventListeners();
    }

    function attachEventListeners() {
        // Quick bid buttons
        const quickBidBtns = container.querySelectorAll('.quick-bid-btn');
        quickBidBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const amount = parseInt(btn.dataset.amount);
                handlePlaceBid(amount);
            });
        });

        // Custom bid input
        const customBidInput = container.querySelector('#custom-bid-input');
        customBidInput?.addEventListener('input', (e) => {
            // Remove non-numeric characters
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value) {
                customBidAmount = parseInt(value);
                e.target.value = parseInt(value).toLocaleString('vi-VN');
            }
        });

        // Place custom bid button
        const placeCustomBidBtn = container.querySelector('#place-custom-bid-btn');
        placeCustomBidBtn?.addEventListener('click', () => {
            handlePlaceBid(customBidAmount);
        });

        // Toggle auto-bid panel
        const toggleAutoBidBtn = container.querySelector('#toggle-auto-bid-btn');
        toggleAutoBidBtn?.addEventListener('click', () => {
            showAutoBid = !showAutoBid;
            render();
        });

        // Enable auto-bid
        const enableAutoBidBtn = container.querySelector('#enable-auto-bid-btn');
        enableAutoBidBtn?.addEventListener('click', () => {
            const input = container.querySelector('#auto-bid-max-input');
            const maxBid = parseInt(input.value.replace(/[^0-9]/g, ''));
            if (maxBid) {
                const success = enableAutoBid(auction.id, maxBid);
                if (success) {
                    autoBidData = getAutoBid(auction.id);
                    render();
                }
            } else {
                toast.error('Vui lòng nhập giá tối đa');
            }
        });

        // Disable auto-bid
        const disableAutoBidBtn = container.querySelector('#disable-auto-bid-btn');
        disableAutoBidBtn?.addEventListener('click', () => {
            disableAutoBid(auction.id);
            autoBidData = null;
            render();
        });

        // Register auction button
        const registerBtn = container.querySelector('#register-auction-btn');
        registerBtn?.addEventListener('click', () => {
            // Trigger registration modal
            const event = new CustomEvent('open-auction-registration', {
                detail: { auction }
            });
            window.dispatchEvent(event);
        });
    }

    function handlePlaceBid(amount) {
        const result = placeBid(auction.id, amount);
        if (result.success) {
            customBidAmount = amount + minIncrement;
            // Will re-render via subscription
        }
    }

    // Subscribe to real-time updates
    const unsubscribe = subscribeToBids(auction.id, (bids, updatedAuction) => {
        if (updatedAuction) {
            auction.currentBid = updatedAuction.currentBid;
            auction.currentBidder = updatedAuction.currentBidder;
            auction.bidCount = updatedAuction.bidCount;
        }
        render();
    });

    // Initial render
    render();

    // Cleanup on remove
    container.addEventListener('cleanup', () => {
        unsubscribe();
    });

    return container;
}

export default BiddingInterface;
