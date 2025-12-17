/**
 * Payment Processing System
 * Handles final payment for auction winners
 */

import { auctionStore } from './state.js';
import { getAuthState } from './auth.js';
import { createNotification, NOTIFICATION_TYPES } from './notifications.js';
import { getDepositStatus } from './deposit.js';
import toast from './toast.js';

// Payment statuses
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded'
};

// Payment methods
export const PAYMENT_METHODS = {
    BANK_TRANSFER: 'bank_transfer',
    CREDIT_CARD: 'credit_card',
    MOMO: 'momo',
    ZALOPAY: 'zalopay',
    VNPAY: 'vnpay'
};

// Payment deadline (15 days after winning)
const PAYMENT_DEADLINE_DAYS = 15;

/**
 * Create payment record for auction winner
 * @param {Object} paymentData
 * @param {string} paymentData.auctionId - Auction ID
 * @param {string} paymentData.itemName - Item name
 * @param {number} paymentData.winningBid - Final winning bid amount
 * @param {string} paymentData.method - Payment method
 * @returns {Object} Payment record
 */
export function createPayment({ auctionId, itemName, winningBid, method }) {
    console.log('💰 createPayment called with:', { auctionId, itemName, winningBid, method });

    const authState = getAuthState();

    if (!authState.isAuthenticated) {
        toast.error('Vui lòng đăng nhập');
        return null;
    }

    let payments = auctionStore.get().payments;
    console.log('📚 Current payments in store:', payments);

    // Ensure payments is an array
    if (!payments || !Array.isArray(payments)) {
        console.warn('Payments store not initialized, creating empty array');
        payments = [];
    }

    // Check if payment already exists
    const existingPayment = payments.find(
        p => p.auctionId === auctionId && p.userId === authState.user.email
    );

    if (existingPayment) {
        console.log('♻️ Returning existing payment:', existingPayment);
        return existingPayment;
    }

    // Get deposit to subtract from total
    const deposit = getDepositStatus(auctionId);
    const depositAmount = deposit?.amount || 0;
    const remainingAmount = winningBid - depositAmount;

    // Get user's full name from profile
    let userName = authState.user.name;
    try {
        const users = JSON.parse(localStorage.getItem('vpa_users') || '[]');
        const currentUser = users.find(u => u.id === authState.user.id);
        if (currentUser && currentUser.fullName) {
            userName = currentUser.fullName;
        }
    } catch (error) {
        console.error('Error getting user name:', error);
    }

    const payment = {
        id: `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        auctionId,
        userId: authState.user.email,
        userName: userName,
        itemName,
        winningBid,
        depositAmount,
        remainingAmount,
        method,
        status: PAYMENT_STATUS.PENDING,
        paymentProof: null,
        qrCode: null,
        createdAt: new Date().toISOString(),
        deadline: new Date(Date.now() + PAYMENT_DEADLINE_DAYS * 24 * 60 * 60 * 1000).toISOString(),
        completedAt: null,
        transactionRef: null
    };

    console.log('➕ Adding new payment:', payment);
    payments.push(payment);
    auctionStore.set({ payments: [...payments] });

    console.log('💾 Payments after save:', auctionStore.get().payments);

    // Create notification
    createNotification({
        userId: authState.user.email,
        type: 'payment_created',
        title: 'Yêu cầu thanh toán',
        message: `Vui lòng thanh toán ${remainingAmount.toLocaleString('vi-VN')} VNĐ trong vòng ${PAYMENT_DEADLINE_DAYS} ngày`,
        data: { paymentId: payment.id, auctionId }
    });

    console.log('✅ Payment created successfully');
    return payment;
}

/**
 * Upload payment proof
 * @param {string} paymentId - Payment ID
 * @param {string} proofData - Base64 image data
 * @param {string} transactionRef - Transaction reference number
 * @returns {boolean} Success status
 */
export function uploadPaymentProof(paymentId, proofData, transactionRef = '') {
    const payments = auctionStore.get().payments || [];
    const payment = payments.find(p => p.id === paymentId);

    if (!payment) {
        toast.error('Không tìm thấy yêu cầu thanh toán');
        return false;
    }

    if (payment.status === PAYMENT_STATUS.COMPLETED) {
        toast.info('Thanh toán đã được xác nhận');
        return false;
    }

    payment.paymentProof = proofData;
    payment.transactionRef = transactionRef;
    payment.status = PAYMENT_STATUS.PROCESSING;
    payment.proofUploadedAt = new Date().toISOString();

    auctionStore.set({ payments: [...payments] });

    toast.success('Đã tải lên minh chứng thanh toán');

    // Create notification
    createNotification({
        userId: payment.userId,
        type: 'payment_proof_uploaded',
        title: 'Đã tải minh chứng',
        message: 'Chúng tôi sẽ xác nhận trong vòng 2-4 giờ',
        data: { paymentId, auctionId: payment.auctionId }
    });

    // Auto-verify after 5 seconds (simulated)
    setTimeout(() => {
        verifyPayment(paymentId);
    }, 5000);

    return true;
}

/**
 * Verify payment (simulated - normally done by admin/system)
 * @param {string} paymentId - Payment ID
 * @returns {boolean} Success status
 */
export function verifyPayment(paymentId) {
    const payments = auctionStore.get().payments || [];
    const payment = payments.find(p => p.id === paymentId);

    if (!payment) return false;

    payment.status = PAYMENT_STATUS.COMPLETED;
    payment.completedAt = new Date().toISOString();

    auctionStore.set({ payments: [...payments] });

    toast.success('🎉 Thanh toán thành công!');

    // Create notification immediately for real-time update
    const authState = getAuthState();
    createNotification({
        userId: payment.userId,
        type: NOTIFICATION_TYPES.PAYMENT,
        title: 'Thanh toán thành công',
        message: `Đã thanh toán cho ${payment.itemName}`,
        data: { paymentId, auctionId: payment.auctionId }
    });

    return true;
}

/**
 * Get payment by ID
 * @param {string} paymentId - Payment ID
 * @returns {Object|null} Payment record
 */
export function getPayment(paymentId) {
    const payments = auctionStore.get().payments || [];
    return payments.find(p => p.id === paymentId) || null;
}

/**
 * Get payment for auction
 * @param {string} auctionId - Auction ID
 * @param {string} userId - User ID (optional)
 * @returns {Object|null} Payment record
 */
export function getPaymentForAuction(auctionId, userId = null) {
    const authState = getAuthState();
    const targetUserId = userId || authState.user?.email;

    if (!targetUserId) return null;

    const payments = auctionStore.get().payments || [];
    return payments.find(p => p.auctionId === auctionId && p.userId === targetUserId) || null;
}

/**
 * Get all user payments
 * @param {string} status - Optional status filter
 * @returns {Array} User's payments
 */
export function getUserPayments(status = null) {
    const authState = getAuthState();

    if (!authState.isAuthenticated) return [];

    let payments = auctionStore.get().payments;

    // Ensure payments is an array
    if (!Array.isArray(payments)) {
        console.warn('Payments is not an array:', payments);
        console.warn('🔧 Resetting payments to empty array');
        // Reset to empty array
        auctionStore.set({ payments: [] });
        return [];
    }

    let userPayments = payments.filter(p => p.userId === authState.user.email);

    if (status) {
        userPayments = userPayments.filter(p => p.status === status);
    }

    return userPayments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Generate invoice for completed payment
 * @param {string} paymentId - Payment ID
 * @returns {Object} Invoice data
 */
export function generateInvoice(paymentId) {
    const payment = getPayment(paymentId);

    if (!payment) {
        toast.error('Không tìm thấy thanh toán');
        return null;
    }

    const invoice = {
        invoiceNumber: `INV-${payment.id.substr(-8).toUpperCase()}`,
        date: payment.completedAt || payment.createdAt,
        customerName: payment.userName,
        customerId: payment.userId,
        items: [
            {
                description: `Biển số xe ${payment.itemName}`,
                amount: payment.winningBid
            },
            {
                description: 'Đã đặt cọc',
                amount: -payment.depositAmount
            }
        ],
        subtotal: payment.winningBid,
        deposit: payment.depositAmount,
        total: payment.remainingAmount,
        status: payment.status,
        paymentMethod: payment.method,
        transactionRef: payment.transactionRef || 'N/A'
    };

    return invoice;
}

/**
 * Download invoice as PDF
 * @param {string} paymentId - Payment ID
 */
export function downloadInvoice(paymentId) {
    const invoice = generateInvoice(paymentId);

    if (!invoice) return;

    // Dynamically import PDF generator
    import('./pdfInvoice.js').then(({ downloadPDFInvoice }) => {
        const success = downloadPDFInvoice(invoice);

        if (success) {
            toast.success('Đã tải hóa đơn PDF');
        } else {
            // Fallback to text invoice if PDF generation fails
            downloadTextInvoice(invoice);
        }
    }).catch(error => {
        console.error('Failed to load PDF generator:', error);
        // Fallback to text invoice
        downloadTextInvoice(invoice);
    });
}

/**
 * Download invoice as text (fallback)
 * @param {Object} invoice - Invoice data
 */
function downloadTextInvoice(invoice) {
    const invoiceText = `
╔════════════════════════════════════════════════════════════╗
║              HÓA ĐƠN THANH TOÁN ĐẤU GIÁ                   ║
║              VPA - Công ty Đấu giá Hợp danh Việt Nam      ║
╚════════════════════════════════════════════════════════════╝

Số hóa đơn: ${invoice.invoiceNumber}
Ngày: ${new Date(invoice.date).toLocaleString('vi-VN')}

──────────────────────────────────────────────────────────────
THÔNG TIN KHÁCH HÀNG
──────────────────────────────────────────────────────────────
Họ tên: ${invoice.customerName}
Mã KH: ${invoice.customerId}

──────────────────────────────────────────────────────────────
CHI TIẾT
──────────────────────────────────────────────────────────────
${invoice.items.map((item, i) =>
        `${i + 1}. ${item.description}\n   Thành tiền: ${item.amount.toLocaleString('vi-VN')} VNĐ`
    ).join('\n\n')}

──────────────────────────────────────────────────────────────
Tổng giá trúng thầu:    ${invoice.subtotal.toLocaleString('vi-VN')} VNĐ
Đã đặt cọc:            -${invoice.deposit.toLocaleString('vi-VN')} VNĐ
──────────────────────────────────────────────────────────────
TỔNG THANH TOÁN:        ${invoice.total.toLocaleString('vi-VN')} VNĐ
══════════════════════════════════════════════════════════════

Phương thức: ${invoice.paymentMethod.toUpperCase()}
Mã giao dịch: ${invoice.transactionRef}
Trạng thái: ${invoice.status === 'completed' ? 'ĐÃ THANH TOÁN' : 'ĐANG XỬ LÝ'}

Cảm ơn quý khách đã sử dụng dịch vụ!
    `.trim();

    // Create download link
    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoice.invoiceNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Đã tải hóa đơn');
}

/**
 * Request refund for completed payment
 * @param {string} paymentId - Payment ID
 * @returns {boolean} Success status
 */
export function refundPayment(paymentId) {
    const authState = getAuthState();
    const payments = auctionStore.get().payments || [];
    const payment = payments.find(p => p.id === paymentId);

    if (!payment) {
        toast.error('Không tìm thấy thanh toán');
        return false;
    }

    if (payment.userId !== authState.user?.email) {
        toast.error('Bạn không có quyền hoàn tiền đơn hàng này');
        return false;
    }

    if (payment.status !== PAYMENT_STATUS.COMPLETED) {
        toast.error('Chỉ có thể hoàn tiền cho đơn hàng đã thanh toán');
        return false;
    }

    if (payment.status === PAYMENT_STATUS.REFUNDED) {
        toast.info('Đơn hàng đã được hoàn tiền');
        return false;
    }

    // Mark as refunded
    payment.status = PAYMENT_STATUS.REFUNDED;
    payment.refundedAt = new Date().toISOString();

    auctionStore.set({ payments: [...payments] });

    toast.success('Yêu cầu hoàn tiền đã được gửi. Tiền sẽ được chuyển về trong 3-5 ngày làm việc');

    // Create notification immediately for real-time update
    createNotification({
        userId: payment.userId,
        type: NOTIFICATION_TYPES.PAYMENT,
        title: 'Hoàn tiền thành công',
        message: `Đã hoàn ${payment.remainingAmount.toLocaleString('vi-VN')} VNĐ cho ${payment.itemName}`,
        data: { paymentId, auctionId: payment.auctionId, refunded: true }
    });

    return true;
}

/**
 * Subscribe to payment changes
 * @param {Function} callback - Callback function
 * @returns {Function} Unsubscribe function
 */
export function subscribeToPayments(callback) {
    return auctionStore.subscribe((state) => {
        callback(state.payments || []);
    });
}

export default {
    PAYMENT_STATUS,
    PAYMENT_METHODS,
    createPayment,
    uploadPaymentProof,
    verifyPayment,
    getPayment,
    getPaymentForAuction,
    getUserPayments,
    generateInvoice,
    downloadInvoice,
    refundPayment,
    subscribeToPayments
};
