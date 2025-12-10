import { createElement, createFromHTML } from '../../utils/dom.js';
import { createPayment, uploadPaymentProof, getPaymentForAuction, downloadInvoice, PAYMENT_METHODS } from '../../utils/payment.js';
import { generateVietQR, getBankInfo, formatTransferDescription, copyToClipboard } from '../../utils/qrCode.js';
import { CountdownTimer } from '../shared/CountdownTimer.js';
import { getAuthState } from '../../utils/auth.js';
import { markItemsAsPaid, getCartItems } from '../../utils/cart.js';
import { auctionStore } from '../../utils/state.js';
import toast from '../../utils/toast.js';

/**
 * Payment Page
 * Handles both deposit payments (from checkout) and final auction payments
 */
export function PaymentPage({ auctionId, itemName, winningBid, orderData } = {}) {
    const container = createElement('div', { className: 'bg-gray-50 min-h-screen py-10' });
    const innerContainer = createElement('div', { className: 'container mx-auto px-4 max-w-6xl' });

    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        innerContainer.innerHTML = `
            <div class="text-center py-20">
                <i data-lucide="lock" class="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Vui lòng đăng nhập</h2>
                <p class="text-gray-600">Bạn cần đăng nhập để xem trang thanh toán</p>
            </div>
        `;
        container.appendChild(innerContainer);
        return container;
    }

    // Get or create payment
    let payment = null;
    let isOrderPayment = false;

    // Handle checkout order payment - get order from session storage
    if (!auctionId && !orderData) {
        const sessionOrder = sessionStorage.getItem('currentOrder');
        if (sessionOrder) {
            orderData = JSON.parse(sessionOrder);
        }
    }

    if (orderData) {
        // This is an order payment from checkout
        isOrderPayment = true;
        payment = {
            id: `order_${Date.now()}`,
            itemName: `Đơn hàng #${Date.now()}`,
            remainingAmount: orderData.total,
            totalAmount: orderData.total,
            depositAmount: 0,
            winningBid: orderData.total,
            items: orderData.items,
            status: 'pending',
            deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
            method: PAYMENT_METHODS.BANK_TRANSFER
        };
    } else if (auctionId) {
        payment = getPaymentForAuction(auctionId);

        if (!payment && itemName && winningBid) {
            payment = createPayment({
                auctionId,
                itemName,
                winningBid,
                method: PAYMENT_METHODS.BANK_TRANSFER
            });
        }
    }

    if (!payment) {
        innerContainer.innerHTML = `
            <div class="text-center py-20">
                <i data-lucide="alert-circle" class="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy thanh toán</h2>
                <p class="text-gray-600">Vui lòng kiểm tra lại thông tin</p>
            </div>
        `;
        container.appendChild(innerContainer);
        return container;
    }

    // Header
    const header = createElement('div', { className: 'mb-8' });
    header.innerHTML = `
        <button onclick="history.back()" class="text-blue-600 hover:text-blue-700 font-semibold mb-4 flex items-center gap-2 transition-colors">
            <i data-lucide="arrow-left" class="w-5 h-5"></i>
            Quay lại
        </button>
        <h1 class="text-4xl font-black text-gray-900 mb-2">Thanh toán đấu giá</h1>
        <p class="text-gray-600">Hoàn tất thanh toán để nhận biển số xe</p>
    `;
    innerContainer.appendChild(header);

    // Status badge
    const statusBadge = createElement('div', { className: 'mb-6' });
    const statusClass = payment.status === 'completed' ? 'bg-blue-100 text-blue-700' :
        payment.status === 'processing' ? 'bg-blue-100 text-blue-700' :
            'bg-blue-100 text-blue-700';
    const statusText = payment.status === 'completed' ? '✓ Đã thanh toán' :
        payment.status === 'processing' ? '⏳ Đang xác nhận' :
            '⚠ Chưa thanh toán';
    statusBadge.innerHTML = `
        <span class="inline-flex items-center gap-2 px-4 py-2 ${statusClass} rounded-full font-bold text-sm">
            ${statusText}
        </span>
    `;
    innerContainer.appendChild(statusBadge);

    // Main content grid
    const grid = createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-3 gap-8' });

    // LEFT COLUMN: Order Summary + Payment History
    const leftCol = createElement('div', { className: 'lg:col-span-2 space-y-6' });

    // Order Summary Card
    const summaryCard = createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-8' });
    summaryCard.innerHTML = `
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <i data-lucide="file-text" class="w-7 h-7 text-blue-600"></i>
            Thông tin đơn hàng
        </h2>
        
        <!-- Item Card -->
        <div class="bg-gradient-to-br from-blue-50 to-blue-50 p-6 rounded-xl mb-6">
            <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-semibold text-gray-600">Biển số đã trúng</span>
                <span class="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">THẮNG</span>
            </div>
            <div class="text-4xl font-black text-gray-900 mb-2 flex items-center gap-3">
                <span class="px-6 py-4 bg-white rounded-xl shadow-lg border-2 border-blue-300">
                    ${payment.itemName}
                </span>
            </div>
            <p class="text-sm text-gray-600">Biển số đấu giá trúng thầu</p>
        </div>

        <!-- Payment Breakdown -->
        <div class="space-y-3">
            <div class="flex justify-between items-center py-3 border-b border-gray-200">
                <span class="text-gray-700">Giá trúng thầu</span>
                <span class="font-bold text-gray-900">${payment.winningBid.toLocaleString('vi-VN')} VNĐ</span>
            </div>
            <div class="flex justify-between items-center py-3 border-b border-gray-200">
                <span class="text-gray-700">Đã đặt cọc</span>
                <span class="font-bold text-blue-600">-${payment.depositAmount.toLocaleString('vi-VN')} VNĐ</span>
            </div>
            <div class="flex justify-between items-center py-4 bg-blue-50 -mx-8 px-8 rounded-lg">
                <span class="text-lg font-bold text-gray-900">Còn phải trả</span>
                <span class="text-3xl font-black text-blue-600">${payment.remainingAmount.toLocaleString('vi-VN')} VNĐ</span>
            </div>
        </div>

        <!-- Deadline -->
        <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div class="flex items-start gap-3">
                <i data-lucide="clock" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"></i>
                <div class="flex-1">
                    <p class="text-sm font-semibold text-blue-800 mb-2">Hạn thanh toán</p>
                    <div id="payment-timer"></div>
                </div>
            </div>
        </div>

        <!-- Download Invoice Button -->
        ${payment.status === 'completed' ? `
            <button 
                id="download-invoice-btn"
                class="w-full mt-6 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold rounded-lg hover:shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
            >
                <i data-lucide="download" class="w-5 h-5"></i>
                Tải hóa đơn
            </button>
        ` : ''}
    `;

    // Add countdown timer
    const timerContainer = summaryCard.querySelector('#payment-timer');
    if (timerContainer && payment.deadline) {
        const timer = CountdownTimer({
            endTime: payment.deadline,
            onExpire: () => {
                toast.error('Hết hạn thanh toán');
            }
        });
        timerContainer.appendChild(timer);
    }

    // Download invoice button
    if (payment.status === 'completed') {
        const downloadBtn = summaryCard.querySelector('#download-invoice-btn');
        downloadBtn?.addEventListener('click', () => {
            downloadInvoice(payment.id);
        });
    }

    leftCol.appendChild(summaryCard);

    // RIGHT COLUMN: Payment Methods
    const rightCol = createElement('div', { className: 'space-y-6' });

    // Payment Methods Card
    const paymentCard = createElement('div', { className: 'bg-white rounded-2xl shadow-lg p-6 sticky top-6' });

    if (payment.status === 'completed') {
        paymentCard.innerHTML = `
            <div class="text-center py-8">
                <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i data-lucide="check-circle" class="w-12 h-12 text-blue-600"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">Đã thanh toán!</h3>
                <p class="text-gray-600 mb-6">Thanh toán của bạn đã được xác nhận</p>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p class="text-sm text-blue-800">
                        <i data-lucide="info" class="w-4 h-4 inline-block mr-1"></i>
                        Vui lòng liên hệ để nhận biển số xe
                    </p>
                </div>
            </div>
        `;
    } else {
        const description = formatTransferDescription(payment.id, payment.auctionId);
        const qrCodeURL = generateVietQR({
            bankCode: 'VCB',
            accountNo: '1034567890',
            accountName: 'VPA AUCTION',
            amount: payment.remainingAmount,
            description
        });

        paymentCard.innerHTML = `
            <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i data-lucide="credit-card" class="w-6 h-6 text-blue-600"></i>
                Phương thức thanh toán
            </h3>

            <!-- QR Code -->
            <div class="mb-6 text-center">
                <div class="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                    <img src="${qrCodeURL}" alt="QR Code" class="w-48 h-48 mx-auto" />
                </div>
                <p class="text-xs text-gray-500 mt-2">Quét để thanh toán</p>
            </div>

            <!-- Bank Info -->
            <div class="bg-gradient-to-r from-blue-50 to-blue-50 p-4 rounded-lg mb-4">
                <h4 class="font-bold text-gray-900 mb-3 text-sm">Thông tin chuyển khoản</h4>
                <div class="space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-600">Ngân hàng:</span>
                        <span class="font-semibold text-sm">Vietcombank</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-600">Số TK:</span>
                        <div class="flex items-center gap-1">
                            <span class="font-mono font-bold text-sm">1034567890</span>
                            <button class="copy-btn p-1 hover:bg-white/50 rounded" data-copy="1034567890">
                                <i data-lucide="copy" class="w-3 h-3 text-blue-600"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-600">Chủ TK:</span>
                        <span class="font-semibold text-sm">VPA AUCTION</span>
                    </div>
                    <div class="flex justify-between items-center pt-2 border-t">
                        <span class="text-xs text-gray-600">Số tiền:</span>
                        <div class="flex items-center gap-1">
                            <span class="text-lg font-black text-blue-600">${payment.remainingAmount.toLocaleString('vi-VN')}</span>
                            <button class="copy-btn p-1 hover:bg-white/50 rounded" data-copy="${payment.remainingAmount}">
                                <i data-lucide="copy" class="w-3 h-3 text-blue-600"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-between items-start pt-2">
                        <span class="text-xs text-gray-600">Nội dung:</span>
                        <div class="flex items-center gap-1">
                            <span class="font-mono font-bold text-xs text-right">${description}</span>
                            <button class="copy-btn p-1 hover:bg-white/50 rounded" data-copy="${description}">
                                <i data-lucide="copy" class="w-3 h-3 text-blue-600"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Upload Proof -->
            <div class="border-t pt-4">
                <h4 class="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                    <i data-lucide="upload" class="w-4 h-4 text-blue-600"></i>
                    Tải minh chứng
                </h4>
                <input 
                    type="file" 
                    id="payment-proof-upload"
                    accept="image/*"
                    class="hidden"
                />
                <label 
                    for="payment-proof-upload"
                    class="block cursor-pointer px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors text-center text-sm font-medium text-gray-700 hover:text-blue-600 mb-3"
                >
                    <i data-lucide="image" class="w-5 h-5 inline-block mr-2"></i>
                    <span id="file-label">Chọn ảnh minh chứng</span>
                </label>
                <input
                    type="text"
                    id="transaction-ref"
                    placeholder="Mã giao dịch (tùy chọn)"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3 text-sm"
                />
                <button 
                    id="submit-payment-btn"
                    ${!isOrderPayment ? 'disabled' : ''}
                    class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                    <i data-lucide="check-circle" class="w-5 h-5"></i>
                    ${isOrderPayment ? 'Xác nhận đã thanh toán' : 'Xác nhận thanh toán'}
                </button>
            </div>
        `;

        // Copy buttons
        const copyBtns = paymentCard.querySelectorAll('.copy-btn');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.dataset.copy;
                copyToClipboard(text);
                toast.success('Đã sao chép');
            });
        });

        // File upload
        const fileInput = paymentCard.querySelector('#payment-proof-upload');
        const fileLabel = paymentCard.querySelector('#file-label');
        const submitBtn = paymentCard.querySelector('#submit-payment-btn');
        let selectedFile = null;

        fileInput?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                selectedFile = file;
                fileLabel.textContent = file.name;
                submitBtn.disabled = false;
            }
        });

        submitBtn?.addEventListener('click', async () => {
            const transactionRef = paymentCard.querySelector('#transaction-ref')?.value || '';

            // For order payments, create actual payment record
            if (isOrderPayment) {
                console.log('🔵 Starting order payment creation...');
                console.log('📦 Order data:', orderData);

                // Disable button and show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin h-5 w-5 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                `;

                try {
                    // Create payment record for each item
                    const orderItems = orderData.items || [];
                    console.log('📋 Order items:', orderItems);

                    // Create a single payment for the entire order
                    const createdPayment = createPayment({
                        auctionId: orderData.id || `ORD-${Date.now()}`, // Use actual order ID
                        itemName: orderItems.length > 1
                            ? `${orderItems.length} items`
                            : (orderItems[0]?.name || orderItems[0]?.plateNumber || 'Order payment'),
                        winningBid: orderData.total,
                        method: PAYMENT_METHODS.BANK_TRANSFER
                    });

                    console.log('💳 Created payment:', createdPayment);

                    if (!createdPayment) {
                        throw new Error('Failed to create payment record');
                    }

                    // STEP 1: Mark payment as completed and save
                    console.log('✓ Marking payment as completed...');
                    createdPayment.status = 'completed';
                    createdPayment.completedAt = new Date().toISOString();

                    // Update payments in store
                    let payments = auctionStore.get().payments;
                    if (!Array.isArray(payments)) {
                        payments = [];
                    }

                    const paymentIndex = payments.findIndex(p => p.id === createdPayment.id);
                    if (paymentIndex >= 0) {
                        payments[paymentIndex] = createdPayment;
                    } else {
                        console.warn('⚠️ Payment not found in store, adding it');
                        payments.push(createdPayment);
                    }

                    const updatedAuctionState = {
                        ...auctionStore.get(),
                        payments: [...payments]
                    };

                    auctionStore.set(updatedAuctionState);

                    // CRITICAL: Force synchronous write with verification
                    const { forceWriteAndVerify, verifyPaymentCompleted } = await import('../../utils/storageVerify.js');

                    const paymentPersisted = await forceWriteAndVerify(
                        'vpa-auctions',
                        updatedAuctionState,
                        verifyPaymentCompleted(createdPayment.id)
                    );

                    if (!paymentPersisted) {
                        throw new Error('Failed to persist payment data');
                    }

                    console.log('💾 Payment data persisted successfully');

                    // STEP 2: Mark cart items as paid
                    const itemIds = orderItems.map(item => item.id);
                    console.log('🏷️ Marking cart items as paid:', itemIds);

                    markItemsAsPaid(itemIds);

                    // STEP 3: Verify cart items were marked
                    const { waitForDataPersistence, verifyCartItemsPaid } = await import('../../utils/storageVerify.js');

                    const cartPersisted = await waitForDataPersistence(
                        'vpa-cart',
                        verifyCartItemsPaid(itemIds),
                        15, // More attempts for cart
                        200 // 200ms between attempts
                    );

                    if (!cartPersisted) {
                        console.error('❌ WARNING: Cart items may not be marked as paid!');
                        // Continue anyway but log warning
                    }

                    console.log('✅ All data persisted successfully');

                    // STEP 4: Show success message with details
                    const itemNames = orderItems.map(item =>
                        item.plateNumber || item.name
                    ).filter(Boolean).join(', ');

                    const invoiceId = `INV-${createdPayment.id.substr(-8).toUpperCase()}`;

                    const message = itemNames
                        ? `🎉 Thanh toán thành công!\n\n✓ Biển số: ${itemNames}\n✓ Mã hóa đơn: ${invoiceId}\n✓ Đã lưu vào Lịch sử đấu giá và tab "Đã thanh toán"`
                        : `🎉 Thanh toán thành công!\n\n✓ Mã hóa đơn: ${invoiceId}\n✓ Đã lưu vào Lịch sử đấu giá và tab "Đã thanh toán"`;

                    toast.success(message, { duration: 5000 });

                    // STEP 5: Final verification before redirect
                    console.log('🔍 Final verification before redirect...');

                    // Wait a bit longer to ensure all UI updates complete
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Final check
                    const finalCheck = localStorage.getItem('vpa-auctions');
                    const finalAuctions = JSON.parse(finalCheck);
                    const finalPayment = finalAuctions.payments?.find(p => p.id === createdPayment.id);

                    if (finalPayment && finalPayment.status === 'completed') {
                        console.log('✅ Final verification passed, safe to redirect');

                        // Redirect after 2 more seconds (total ~3s from success message)
                        setTimeout(() => {
                            window.location.hash = '#/payment-success';
                        }, 2000);
                    } else {
                        console.error('❌ Final verification failed!');
                        toast.error('Lỗi xác thực dữ liệu. Vui lòng kiểm tra lại giỏ hàng.');
                    }

                } catch (error) {
                    console.error('❌ Payment processing error:', error);
                    toast.error('Lỗi xử lý thanh toán: ' + error.message);

                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `
                        <i data-lucide="check-circle" class="w-5 h-5"></i>
                        Xác nhận đã thanh toán
                    `;
                    if (window.lucide) window.lucide.createIcons();
                }

                return;
            }

            // For auction payments, require proof
            const file = fileInput?.files[0];
            if (!file) {
                toast.error('Vui lòng chọn ảnh minh chứng');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const proofData = e.target.result;
                const success = uploadPaymentProof(payment.id, proofData, transactionRef);

                if (success) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            };
            reader.readAsDataURL(file);
        });
    }

    rightCol.appendChild(paymentCard);

    grid.appendChild(leftCol);
    grid.appendChild(rightCol);
    innerContainer.appendChild(grid);

    container.appendChild(innerContainer);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

export default PaymentPage;
