import { createElement, createFromHTML } from '../../utils/dom.js';
import { placeBid, getBidHistory, getCurrentHighestBid } from '../../utils/bidding.js';
import { getAuthState, getCurrentUser } from '../../utils/auth.js';
import { CountdownTimer } from './CountdownTimer.js';
import { DepositModal } from './DepositModal.js';
import { getDepositStatus } from '../../utils/deposit.js';
import toast from '../../utils/toast.js';

/**
 * Interactive Bidding Modal
 * Shows item details, bidHistory, and allows placing bids
 */
export function BiddingModal() {
    let isOpen = false;
    let currentItem = null;
    let refreshInterval = null;
    let depositModal = null; // Integrated DepositModal instance

    const container = createElement('div', {
        className: 'fixed inset-0 z-50 flex items-center justify-center p-4 hidden',
        id: 'bidding-modal'
    });

    // Backdrop
    const backdrop = createElement('div', {
        className: 'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
    });
    container.appendChild(backdrop);

    // Modal wrapper
    const modalWrapper = createElement('div', {
        className: 'relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden transform transition-transform'
    });
    container.appendChild(modalWrapper);

    function render() {
        if (!currentItem) return;

        const authState = getAuthState();
        const isAuthenticated = authState.isAuthenticated;
        const user = getCurrentUser();

        // Check deposit status
        const depositStatus = user ? getDepositStatus(currentItem.id, user.email) : null;
        const hasDeposit = depositStatus && depositStatus.status === 'verified';

        const currentHighest = getCurrentHighestBid(currentItem.id) || { amount: parseInt(currentItem.startPrice.replace(/\D/g, '')) };
        const minIncrement = 10000000; // 10 million VND
        const suggestedBid = currentHighest.amount + minIncrement;

        // Get bid history
        const bidHistory = getBidHistory(currentItem.id).slice(0, 10); // Last 10 bids

        // Quick bid amounts
        const quickBids = [
            { label: '+10M', value: 10000000 },
            { label: '+20M', value: 20000000 },
            { label: '+50M', value: 50000000 },
            { label: '+100M', value: 100000000 }
        ];

        modalWrapper.innerHTML = `
            <div class="flex flex-col h-full max-h-[90vh]">
                <!-- Header -->
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div class="flex items-center gap-3">
                        <i data-lucide="gavel" class="w-6 h-6"></i>
                        <h2 class="text-xl font-bold">Đấu giá ngay</h2>
                    </div>
                    <button id="close-modal" class="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <!-- Content -->
                <div class="flex-1 overflow-y-auto p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Left: Item Details -->
                        <div>
                            <div class="bg-gradient-to-br from-blue-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl mb-4">
                                <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <span class="px-4 py-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm border-2 border-blue-200 dark:border-blue-700">
                                        ${currentItem.plateNumber}
                                    </span>
                                </h3>
                                
                                <div class="space-y-2">
                                    <div class="flex items-center justify-between text-sm">
                                        <span class="text-gray-600 dark:text-gray-400">Tỉnh/TP:</span>
                                        <span class="font-semibold text-gray-900 dark:text-white">${currentItem.province}</span>
                                    </div>
                                    ${currentItem.type ? `
                                        <div class="flex items-center justify-between text-sm">
                                            <span class="text-gray-600 dark:text-gray-400">Loại:</span>
                                            <span class="font-semibold text-gray-900 dark:text-white">${currentItem.type}</span>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>

                            <!-- Current Price -->
                            <div class="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-5 mb-4">
                                <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">Giá hiện tại</div>
                                <div class="text-3xl font-black text-blue-600 dark:text-blue-400">
                                    ${currentHighest.amount.toLocaleString('vi-VN')} VNĐ
                                </div>
                                ${currentHighest.userName ? `
                                    <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        Người đặt: ${currentHighest.userName}
                                    </div>
                                ` : ''}
                            </div>

                            <!-- Countdown Timer -->
                            <div id="countdown-container" class="mb-4"></div>
                        </div>

                        <!-- Right: Bid History -->
                        <div>
                            <h4 class="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <i data-lucide="history" class="w-5 h-5"></i>
                                Lịch sử đặt giá
                            </h4>
                            <div class="space-y-2 max-h-64 overflow-y-auto pr-2">
                                ${bidHistory.length > 0 ? bidHistory.map((bid, index) => `
                                    <div class="flex items-center justify-between p-3 rounded-lg ${index === 0 ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' : 'bg-gray-50 dark:bg-gray-700/50'}">
                                        <div>
                                            <div class="font-semibold text-gray-900 dark:text-white text-sm">
                                                ${bid.userName}
                                                ${index === 0 ? '<span class="ml-2 text-xs px-2 py-0.5 bg-blue-600 text-white rounded">Cao nhất</span>' : ''}
                                            </div>
                                            <div class="text-xs text-gray-500 dark:text-gray-400">
                                                ${new Date(bid.timestamp).toLocaleString('vi-VN')}
                                            </div>
                                        </div>
                                        <div class="text-right">
                                            <div class="font-bold text-blue-600 dark:text-blue-400">
                                                ${bid.amount.toLocaleString('vi-VN')}
                                            </div>
                                            <div class="text-xs text-gray-500">VNĐ</div>
                                        </div>
                                    </div>
                                `).join('') : `
                                    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                                        <i data-lucide="inbox" class="w-12 h-12 mx-auto mb-2 opacity-50"></i>
                                        <p>Chưa có ai đặt giá</p>
                                    </div>
                                `}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer: Bidding Controls -->
                <div class="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900">
                    ${isAuthenticated ? (
                hasDeposit ? `
                            <!-- Quick Bid Buttons -->
                            <div class="mb-4">
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Đặt giá nhanh
                                </label>
                                <div class="grid grid-cols-4 gap-2">
                                    ${quickBids.map(qb => `
                                        <button class="quick-bid-btn px-4 py-2 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-lg font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all"
                                                data-amount="${qb.value}">
                                            ${qb.label}
                                        </button>
                                    `).join('')}
                                </div>
                            </div>

                            <!-- Custom Bid Input -->
                            <div class="mb-4">
                                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Hoặc nhập giá tùy chỉnh
                                </label>
                                <div class="flex gap-2">
                                    <div class="relative flex-1">
                                        <input 
                                            type="text" 
                                            id="custom-bid-input"
                                            placeholder="${suggestedBid.toLocaleString('vi-VN')}"
                                            class="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 outline-none transition-all dark:bg-gray-800 dark:text-white"
                                        />
                                        <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm font-medium">VNĐ</span>
                                    </div>
                                    <button id="place-custom-bid-btn" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105 flex items-center gap-2">
                                        <i data-lucide="zap" class="w-5 h-5"></i>
                                        Đặt giá
                                    </button>
                                </div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    Giá tối thiểu: ${suggestedBid.toLocaleString('vi-VN')} VNĐ
                                </p>
                            </div>
                        ` : `
                            <!-- No Deposit Warning -->
                            <div class="text-center py-6">
                                <i data-lucide="alert-circle" class="w-12 h-12 mx-auto mb-3 text-blue-500"></i>
                                <p class="text-gray-700 dark:text-gray-300 font-semibold mb-2">Bạn chưa đặt cọc</p>
                                <p class="text-gray-600 dark:text-gray-400 mb-4 text-sm">Vui lòng thanh toán đặt cọc để tham gia đấu giá</p>
                                ${depositStatus && depositStatus.status === 'pending' ? `
                                    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
                                        <p class="text-sm text-blue-800 dark:text-blue-300">
                                            <i data-lucide="clock" class="w-4 h-4 inline mr-1"></i>
                                            Đang chờ xác nhận thanh toán
                                        </p>
                                    </div>
                                ` : ''}
                                <button id="pay-deposit-btn" class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105">
                                    <i data-lucide="wallet" class="w-5 h-5 inline mr-2"></i>
                                    Thanh toán đặt cọc ngay
                                </button>
                            </div>
                        `
            ) : `
                        <div class="text-center py-6">
                            <i data-lucide="lock" class="w-12 h-12 mx-auto mb-3 text-gray-400"></i>
                            <p class="text-gray-600 dark:text-gray-400 mb-4">Vui lòng đăng nhập để đặt giá</p>
                            <button id="login-btn" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105">
                                Đăng nhập ngay
                            </button>
                        </div>
                    `}
                </div>

            </div>
        `;

        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Add countdown timer if endTime is available
        if (currentItem.endTime) {
            const countdownContainer = modalWrapper.querySelector('#countdown-container');
            if (countdownContainer) {
                const timer = CountdownTimer({
                    endTime: currentItem.endTime,
                    onExpire: () => {
                        toast.info('Phiên đấu giá đã kết thúc');
                        close();
                    }
                });
                countdownContainer.appendChild(timer);
            }
        }

        // Add event listeners
        const closeBtn = modalWrapper.querySelector('#close-modal');
        closeBtn?.addEventListener('click', close);

        if (isAuthenticated) {
            if (hasDeposit) {
                // Quick bid buttons
                const quickBidBtns = modalWrapper.querySelectorAll('.quick-bid-btn');
                quickBidBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const amount = currentHighest.amount + parseInt(btn.dataset.amount);
                        handlePlaceBid(amount);
                    });
                });

                // Custom bid
                const customBidInput = modalWrapper.querySelector('#custom-bid-input');
                const placeCustomBidBtn = modalWrapper.querySelector('#place-custom-bid-btn');

                placeCustomBidBtn?.addEventListener('click', () => {
                    const inputValue = customBidInput.value.replace(/\D/g, '');
                    const amount = parseInt(inputValue) || 0;
                    if (amount > 0) {
                        handlePlaceBid(amount);
                    } else {
                        toast.error('Vui lòng nhập số tiền hợp lệ');
                    }
                });

                // Format input as currency
                customBidInput?.addEventListener('input', (e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value) {
                        e.target.value = parseInt(value).toLocaleString('vi-VN');
                    }
                });
            } else {
                // No deposit - show pay deposit button
                const payDepositBtn = modalWrapper.querySelector('#pay-deposit-btn');
                payDepositBtn?.addEventListener('click', () => {
                    if (!depositModal) {
                        depositModal = DepositModal();
                        document.body.appendChild(depositModal.element);
                    }
                    depositModal.open(currentItem);
                });
            }
        } else {
            const loginBtn = modalWrapper.querySelector('#login-btn');
            loginBtn?.addEventListener('click', () => {
                close();
                window.location.hash = '#/login';
            });
        }
    }

    function handlePlaceBid(amount) {
        if (!currentItem) return;

        const currentHighest = getCurrentHighestBid(currentItem.id) || { amount: parseInt(currentItem.startPrice.replace(/\D/g, '')) };
        const minIncrement = 10000000;

        const success = placeBid({
            auctionId: currentItem.id,
            itemName: currentItem.plateNumber,
            amount: amount,
            currentPrice: currentHighest.amount,
            minIncrement: minIncrement
        });

        if (success) {
            // Refresh the modal to show new bid
            setTimeout(() => {
                render();
            }, 500);
        }
    }

    function open(item) {
        currentItem = item;
        isOpen = true;
        container.classList.remove('hidden');
        render();

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Animate in
        setTimeout(() => {
            backdrop.style.opacity = '1';
            modalWrapper.style.transform = 'scale(1)';
        }, 10);

        // Auto-refresh bid history every 10 seconds
        refreshInterval = setInterval(() => {
            if (isOpen) {
                render();
            }
        }, 10000);
    }

    function close() {
        // Clear refresh interval
        if (refreshInterval) {
            clearInterval(refreshInterval);
            refreshInterval = null;
        }

        // Animate out
        backdrop.style.opacity = '0';
        modalWrapper.style.transform = 'scale(0.95)';

        setTimeout(() => {
            container.classList.add('hidden');
            isOpen = false;
            currentItem = null;

            // Restore body scroll
            document.body.style.overflow = '';
        }, 200);
    }

    // Close on backdrop click
    backdrop.addEventListener('click', close);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            close();
        }
    });

    return {
        element: container,
        open,
        close
    };
}

export default BiddingModal;
