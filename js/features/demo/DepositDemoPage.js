import { createElement } from '../../shared/utils/dom.js';
import { DepositModal } from '../auction-shared/components/DepositModal.js';
import { getDepositStatus, hasVerifiedDeposit } from '../auction-shared/utils/deposit.js';

/**
 * Deposit Demo Page
 * Test deposit payment flow
 */
export function DepositDemoPage() {
    const container = createElement('div', { className: 'bg-gray-50 min-h-screen py-10' });
    const innerContainer = createElement('div', { className: 'container mx-auto px-4' });

    // Title
    const title = createElement('h1', {
        className: 'text-4xl font-black text-gray-900 mb-2 text-center'
    }, 'Deposit Payment System Demo');

    const subtitle = createElement('p', {
        className: 'text-gray-600 text-center mb-10'
    }, 'Testing VPA-style deposit payment with QR code');

    innerContainer.appendChild(title);
    innerContainer.appendChild(subtitle);

    // Test auction items
    const testItems = [
        {
            id: 'auction_001',
            plateNumber: '30A-999.99',
            province: 'Hà Nội',
            startPrice: '500000000', // 500M
            type: 'Ngũ quý'
        },
        {
            id: 'auction_002',
            plateNumber: '51G-888.88',
            province: 'TP. Hồ Chí Minh',
            startPrice: '1200000000', // 1200M
            type: 'Tứ quý'
        },
        {
            id: 'auction_003',
            plateNumber: '29H-777.77',
            province: 'Hà Nội',
            startPrice: '800000000', // 800M
            type: 'Tứ quý'
        }
    ];

    // Features section
    const featuresSection = createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-8 mb-8' });
    featuresSection.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i data-lucide="wallet" class="w-7 h-7 text-blue-600"></i>
            Deposit Payment Features
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <i data-lucide="qr-code" class="w-6 h-6 text-blue-600 flex-shrink-0"></i>
                <div>
                    <h3 class="font-bold text-gray-900 mb-1">VietQR Payment</h3>
                    <p class="text-sm text-gray-600">Scan QR code to auto-fill payment info</p>
                </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <i data-lucide="copy" class="w-6 h-6 text-blue-600 flex-shrink-0"></i>
                <div>
                    <h3 class="font-bold text-gray-900 mb-1">Copy to Clipboard</h3>
                    <p class="text-sm text-gray-600">Quick copy for account, amount, description</p>
                </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <i data-lucide="clock" class="w-6 h-6 text-blue-600 flex-shrink-0"></i>
                <div>
                    <h3 class="font-bold text-gray-900 mb-1">24-Hour Deadline</h3>
                    <p class="text-sm text-gray-600">Countdown timer for payment deadline</p>
                </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <i data-lucide="upload" class="w-6 h-6 text-blue-600 flex-shrink-0"></i>
                <div>
                    <h3 class="font-bold text-gray-900 mb-1">Proof Upload</h3>
                    <p class="text-sm text-gray-600">Upload payment screenshot for verification</p>
                </div>
            </div>
        </div>
    `;
    innerContainer.appendChild(featuresSection);

    // Items grid
    const itemsSection = createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-8' });
    const itemsTitle = createElement('h2', {
        className: 'text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'
    });
    itemsTitle.innerHTML = `
        <i data-lucide="car" class="w-7 h-7 text-blue-600"></i>
        Test Auction Items
    `;
    itemsSection.appendChild(itemsTitle);

    const grid = createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' });

    testItems.forEach(item => {
        const depositStatus = getDepositStatus(item.id);
        const hasDeposit = hasVerifiedDeposit(item.id);

        const card = createElement('div', {
            className: 'border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors'
        });

        const depositAmount = Math.floor(parseInt(item.startPrice) * 0.1);

        card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <span class="text-2xl font-bold text-gray-900">${item.plateNumber}</span>
                ${hasDeposit ? '<span class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Đã đặt cọc</span>' : ''}
            </div>
            <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Tỉnh/TP:</span>
                    <span class="font-semibold">${item.province}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Giá khởi điểm:</span>
                    <span class="font-semibold text-blue-600">${parseInt(item.startPrice).toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div class="flex justify-between text-sm pt-2 border-t">
                    <span class="text-gray-600">Đặt cọc (10%):</span>
                    <span class="font-bold text-gray-900">${depositAmount.toLocaleString('vi-VN')} VNĐ</span>
                </div>
            </div>
            ${depositStatus ? `
                <div class="mb-4 p-3 bg-${depositStatus.status === 'verified' ? 'emerald' : 'yellow'}-50 rounded-lg border border-${depositStatus.status === 'verified' ? 'emerald' : 'yellow'}-200">
                    <p class="text-xs font-semibold text-${depositStatus.status === 'verified' ? 'emerald' : 'yellow'}-800">
                        ${depositStatus.status === 'verified' ? '✓ Đã xác nhận' : depositStatus.status === 'pending' ? '⏳ Đang xác nhận' : '⚠ Chờ thanh toán'}
                    </p>
                </div>
            ` : ''}
        `;

        const btn = createElement('button', {
            className: `w-full px-4 py-3 ${hasDeposit ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:scale-105'} font-bold rounded-lg transition-all flex items-center justify-center gap-2`
        });
        btn.disabled = hasDeposit;
        btn.innerHTML = `
            <i data-lucide="${hasDeposit ? 'check-circle' : 'wallet'}" class="w-5 h-5"></i>
            <span>${hasDeposit ? 'Đã đặt cọc' : 'Đặt cọc ngay'}</span>
        `;

        if (!hasDeposit) {
            btn.addEventListener('click', () => {
                depositModal.open(item);
            });
        }

        card.appendChild(btn);
        grid.appendChild(card);
    });

    itemsSection.appendChild(grid);
    innerContainer.appendChild(itemsSection);

    container.appendChild(innerContainer);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Create deposit modal
    const depositModal = DepositModal();
    document.body.appendChild(depositModal.element);

    return container;
}

export default DepositDemoPage;
