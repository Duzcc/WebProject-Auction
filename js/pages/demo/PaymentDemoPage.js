import { createElement, createFromHTML } from '../../utils/dom.js';
import { PaymentPage } from '../payment/PaymentPage.js';

/**
 * Payment Demo Page
 * Test final payment flow for auction winners
 */
export function PaymentDemoPage() {
    const container = createElement('div', { className: 'bg-gray-50 min-h-screen py-10' });
    const innerContainer = createElement('div', { className: 'container mx-auto px-4' });

    // Title
    const title = createElement('h1', {
        className: 'text-4xl font-black text-gray-900 mb-2 text-center'
    }, 'Final Payment System Demo');

    const subtitle = createElement('p', {
        className: 'text-gray-600 text-center mb-10'
    }, 'Complete payment flow for auction winners');

    innerContainer.appendChild(title);
    innerContainer.appendChild(subtitle);

    // Test scenarios
    const testScenarios = [
        {
            auctionId: 'auction_win_001',
            itemName: '30A-999.99',
            winningBid: 550000000, // 550M
            description: 'Won auction - needs to pay remaining amount'
        },
        {
            auctionId: 'auction_win_002',
            itemName: '51G-888.88',
            winningBid: 1350000000, // 1.35B
            description: 'High value win - large payment required'
        }
    ];

    // Features section
    const featuresSection = createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-8 mb-8' });
    featuresSection.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i data-lucide="credit-card" class="w-7 h-7 text-blue-600"></i>
            Payment Page Features
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <i data-lucide="file-text" class="w-6 h-6 text-blue-600 flex-shrink-0"></i>
                <div>
                    <h3 class="font-bold text-gray-900 mb-1">Order Summary</h3>
                    <p class="text-sm text-gray-600">Full breakdown with deposit deduction</p>
                </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <i data-lucide="qr-code" class="w-6 h-6 text-blue-600 flex-shrink-0"></i>
                <div>
                    <h3 class="font-bold text-gray-900 mb-1">QR Payment</h3>
                    <p class="text-sm text-gray-600">Scan to pay with VietQR</p>
                </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <i data-lucide="clock" class="w-6 h-6 text-blue-600 flex-shrink-0"></i>
                <div>
                    <h3 class="font-bold text-gray-900 mb-1">15-Day Deadline</h3>
                    <p class="text-sm text-gray-600">Countdown for payment</p>
                </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <i data-lucide="upload" class="w-6 h-6 text-blue-600 flex-shrink-0"></i>
                <div>
                    <h3 class="font-bold text-gray-900 mb-1">Proof Upload</h3>
                    <p class="text-sm text-gray-600">Submit payment screenshot</p>
                </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <i data-lucide="check-circle" class="w-6 h-6 text-blue-600 flex-shrink-0"></i>
                <div>
                    <h3 class="font-bold text-gray-900 mb-1">Auto Verification</h3>
                    <p class="text-sm text-gray-600">Simulated approval (5 sec)</p>
                </div>
            </div>
            <div class="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg">
                <i data-lucide="download" class="w-6 h-6 text-indigo-600 flex-shrink-0"></i>
                <div>
                    <h3 class="font-bold text-gray-900 mb-1">Invoice Download</h3>
                    <p class="text-sm text-gray-600">Get payment receipt</p>
                </div>
            </div>
        </div>
    `;
    innerContainer.appendChild(featuresSection);

    // Test scenarios grid
    const scenariosSection = createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-8 mb-8' });
    const scenariosTitle = createElement('h2', {
        className: 'text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3'
    });
    scenariosTitle.innerHTML = `
        <i data-lucide="trophy" class="w-7 h-7 text-blue-600"></i>
        Test Scenarios - Auction Winners
    `;
    scenariosSection.appendChild(scenariosTitle);

    const grid = createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' });

    testScenarios.forEach((scenario, index) => {
        const depositAmount = Math.floor(scenario.winningBid * 0.1);
        const remainingAmount = scenario.winningBid - depositAmount;

        const card = createElement('div', {
            className: 'border-2 border-blue-200 rounded-xl p-6 hover:border-blue-500 transition-colors bg-gradient-to-br from-white to-blue-50'
        });

        card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <span class="text-3xl font-black text-gray-900">${scenario.itemName}</span>
                <span class="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">THẮNG</span>
            </div>
            <p class="text-sm text-gray-600 mb-4">${scenario.description}</p>
            
            <div class="space-y-2 mb-4 bg-white p-4 rounded-lg">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Giá trúng:</span>
                    <span class="font-bold text-gray-900">${scenario.winningBid.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Đã đặt cọc:</span>
                    <span class="font-bold text-blue-600">-${depositAmount.toLocaleString('vi-VN')} VNĐ</span>
                </div>
                <div class="flex justify-between text-sm pt-2 border-t">
                    <span class="text-gray-700 font-semibold">Cần thanh toán:</span>
                    <span class="font-black text-blue-600 text-lg">${remainingAmount.toLocaleString('vi-VN')} VNĐ</span>
                </div>
            </div>
        `;

        const btn = createElement('button', {
            className: 'w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:scale-105 font-bold rounded-lg transition-all flex items-center justify-center gap-2'
        });
        btn.innerHTML = `
            <i data-lucide="credit-card" class="w-5 h-5"></i>
            <span>Thanh toán ngay</span>
        `;

        btn.addEventListener('click', () => {
            window.location.hash = `/payment?auction=${scenario.auctionId}&item=${encodeURIComponent(scenario.itemName)}&amount=${scenario.winningBid}`;
        });

        card.appendChild(btn);
        grid.appendChild(card);
    });

    scenariosSection.appendChild(grid);
    innerContainer.appendChild(scenariosSection);

    // Workflow diagram
    const workflowSection = createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-8' });
    workflowSection.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i data-lucide="workflow" class="w-7 h-7 text-blue-600"></i>
            Complete VPA Payment Flow
        </h2>
        <div class="flex items-center justify-between gap-4 overflow-x-auto pb-4">
            <div class="flex-1 min-w-[120px] text-center">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i data-lucide="trophy" class="w-6 h-6 text-blue-600"></i>
                </div>
                <p class="text-sm font-bold text-gray-900">Win Auction</p>
                <p class="text-xs text-gray-500">Highest bidder</p>
            </div>
            <i data-lucide="arrow-right" class="w-5 h-5 text-gray-400 flex-shrink-0"></i>
            
            <div class="flex-1 min-w-[120px] text-center">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i data-lucide="bell" class="w-6 h-6 text-blue-600"></i>
                </div>
                <p class="text-sm font-bold text-gray-900">Notification</p>
                <p class="text-xs text-gray-500">Winner alert</p>
            </div>
            <i data-lucide="arrow-right" class="w-5 h-5 text-gray-400 flex-shrink-0"></i>
            
            <div class="flex-1 min-w-[120px] text-center">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i data-lucide="credit-card" class="w-6 h-6 text-blue-600"></i>
                </div>
                <p class="text-sm font-bold text-gray-900">Payment Page</p>
                <p class="text-xs text-gray-500">15-day deadline</p>
            </div>
            <i data-lucide="arrow-right" class="w-5 h-5 text-gray-400 flex-shrink-0"></i>
            
            <div class="flex-1 min-w-[120px] text-center">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i data-lucide="upload" class="w-6 h-6 text-blue-600"></i>
                </div>
                <p class="text-sm font-bold text-gray-900">Upload Proof</p>
                <p class="text-xs text-gray-500">Screenshot</p>
            </div>
            <i data-lucide="arrow-right" class="w-5 h-5 text-gray-400 flex-shrink-0"></i>
            
            <div class="flex-1 min-w-[120px] text-center">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i data-lucide="check-circle" class="w-6 h-6 text-blue-600"></i>
                </div>
                <p class="text-sm font-bold text-gray-900">Verified</p>
                <p class="text-xs text-gray-500">Auto-approval</p>
            </div>
            <i data-lucide="arrow-right" class="w-5 h-5 text-gray-400 flex-shrink-0"></i>
            
            <div class="flex-1 min-w-[120px] text-center">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <i data-lucide="download" class="w-6 h-6 text-green-600"></i>
                </div>
                <p class="text-sm font-bold text-gray-900">Invoice</p>
                <p class="text-xs text-gray-500">Download receipt</p>
            </div>
        </div>
    `;
    innerContainer.appendChild(workflowSection);

    container.appendChild(innerContainer);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

export default PaymentDemoPage;
