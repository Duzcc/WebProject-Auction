import { createElement } from '../../utils/dom.js';
import { CountdownTimer } from '../shared/CountdownTimer.js';
import { BiddingModal } from '../shared/BiddingModal.js';

/**
 * Demo Page for Phase 1 Features
 * Showcases Countdown Timers and Bidding Modal
 */
export function Phase1DemoPage() {
    const container = createElement('div', { className: 'bg-gray-50 min-h-screen py-10' });
    const innerContainer = createElement('div', { className: 'container mx-auto px-4' });

    // Title
    const title = createElement('h1', {
        className: 'text-4xl font-black text-gray-900 mb-2 text-center'
    }, 'Phase 1: Real-Time Auction Features');

    const subtitle = createElement('p', {
        className: 'text-gray-600 text-center mb-10'
    }, 'Testing Countdown Timers and Interactive Bidding Modal');

    innerContainer.appendChild(title);
    innerContainer.appendChild(subtitle);

    // Demo Section 1: Countdown Timers
    const testData = [
        {
            id: 'test1',
            plateNumber: '30A-999.99',
            province: 'Hà Nội',
            startPrice: '500.000.000',
            type: 'Ngũ quý',
            endTime: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 minutes from now
        },
        {
            id: 'test2',
            plateNumber: '51G-888.88',
            province: 'TP. Hồ Chí Minh',
            startPrice: '1.200.000.000',
            type: 'Tứ quý',
            endTime: new Date(Date.now() + 58 * 60 * 1000).toISOString() // 58 minutes
        },
        {
            id: 'test3',
            plateNumber: '29H-777.77',
            province: 'Hà Nội',
            startPrice: '800.000.000',
            type: 'Tứ quý',
            endTime: new Date(Date.now() + 30 * 1000).toISOString() // 30 seconds (critical)
        },
        {
            id: 'test4',
            plateNumber: '43C-666.66',
            province: 'Đà Nẵng',
            startPrice: '600.000.000',
            type: 'Lặp đôi',
            endTime: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes (urgent)
        }
    ];

    // Section 1: Countdown Timers
    const section1 = createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-8 mb-8' });
    section1.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i data-lucide="clock" class="w-7 h-7 text-blue-600"></i>
            Countdown Timers với Warning States
        </h2>
        <div class="space-y-4 mb-6">
            <div class="flex items-center gap-3 text-sm">
                <div class="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-semibold">Normal</div>
                <span class="text-gray-600">> 1 giờ - Màu xanh lá</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
                <div class="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-semibold">Warning</div>
                <span class="text-gray-600">< 1 giờ - Màu vàng</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
                <div class="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg font-semibold animate-pulse">Urgent</div>
                <span class="text-gray-600">< 10 phút - Màu cam + Pulse</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
                <div class="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg font-semibold animate-pulse">Critical</div>
                <span class="text-gray-600">< 1 phút - Màu đỏ + Pulse</span>
            </div>
        </div>
    `;

    const timerGrid = createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-4' });
    testData.forEach(item => {
        const card = createElement('div', { className: 'border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 transition-colors' });
        card.innerHTML = `
            <div class="flex items-center justify-between mb-3">
                <span class="text-xl font-bold text-gray-900">${item.plateNumber}</span>
                <span class="text-sm text-gray-600">${item.province}</span>
            </div>
            <div class="mb-3">
                <div class="text-sm text-gray-600 mb-1">Giá khởi điểm</div>
                <div class="text-lg font-bold text-blue-600">${item.startPrice} VNĐ</div>
            </div>
        `;

        const timerContainer = createElement('div', { className: 'mb-3' });
        const timer = CountdownTimer({
            endTime: item.endTime,
            onExpire: () => {
                console.log(`Timer expired for ${item.plateNumber}`);
            }
        });
        timerContainer.appendChild(timer);
        card.appendChild(timerContainer);

        const bidBtn = createElement('button', {
            className: 'w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg transition-all'
        }, 'Đặt giá ngay');
        bidBtn.addEventListener('click', () => {
            biddingModal.open(item);
        });
        card.appendChild(bidBtn);

        timerGrid.appendChild(card);
    });

    section1.appendChild(timerGrid);
    innerContainer.appendChild(section1);

    // Section 2: Bidding Modal Demo
    const section2 = createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-8' });
    section2.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <i data-lucide="gavel" class="w-7 h-7 text-blue-600"></i>
            Interactive Bidding Modal
        </h2>
        <p class="text-gray-600 mb-6">Click vào nút "Đặt giá ngay" ở các thẻ trên để mở modal đấu giá tương tác.</p>
        
        <div class="bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl p-6 space-y-3">
            <h3 class="font-bold text-gray-900 mb-2">✨ Tính năng:</h3>
            <ul class="space-y-2 text-gray-700">
                <li class="flex items-start gap-2">
                    <i data-lucide="check-circle" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"></i>
                    <span><strong>Quick Bid Buttons:</strong> +10M, +20M, +50M, +100M để đặt giá nhanh</span>
                </li>
                <li class="flex items-start gap-2">
                    <i data-lucide="check-circle" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"></i>
                    <span><strong>Custom Bid Input:</strong> Nhập số tiền tùy chỉnh</span>
                </li>
                <li class="flex items-start gap-2">
                    <i data-lucide="check-circle" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"></i>
                    <span><strong>Real-time Bid History:</strong> 10 mức giá gần nhất</span>
                </li>
                <li class="flex items-start gap-2">
                    <i data-lucide="check-circle" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"></i>
                    <span><strong>Countdown Integration:</strong> Đếm ngược trong modal</span>
                </li>
                <li class="flex items-start gap-2">
                    <i data-lucide="check-circle" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"></i>
                    <span><strong>Auto-refresh:</strong> Tự động cập nhật mỗi 10 giây</span>
                </li>
                <li class="flex items-start gap-2">
                    <i data-lucide="check-circle" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"></i>
                    <span><strong>Validation:</strong> Kiểm tra giá tối thiểu</span>
                </li>
            </ul>
        </div>
    `;
    innerContainer.appendChild(section2);

    container.appendChild(innerContainer);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Create bidding modal instance
    const biddingModal = BiddingModal();
    document.body.appendChild(biddingModal.element);

    return container;
}

export default Phase1DemoPage;
