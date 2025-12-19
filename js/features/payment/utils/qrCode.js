/**
 * QR Code Generator for VietQR Payment
 * Generates payment QR codes compatible with Vietnamese banking apps
 */

/**
 * Generate VietQR payment code
 * @param {Object} params
 * @param {string} params.bankCode - Bank code (VCB, TCB, VTB, etc.)
 * @param {string} params.accountNo - Bank account number
 * @param {string} params.accountName - Account holder name
 * @param {number} params.amount - Payment amount
 * @param {string} params.description - Transfer description
 * @returns {string} QR code data URL
 */
export function generateVietQR({
    bankCode = 'VCB',
    accountNo = '1234567890',
    accountName = 'VPA AUCTION',
    amount,
    description
}) {
    // VietQR format: https://www.vietqr.io/
    // For demonstration, we'll create a simple QR code using a public API

    // Build QR content
    const qrContent = buildQRContent({
        bankCode,
        accountNo,
        accountName,
        amount,
        description
    });

    // Generate QR code using QR Server API
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrContent)}`;

    return qrCodeURL;
}

/**
 * Build QR content string
 * @param {Object} params - Payment parameters
 * @returns {string} QR content
 */
function buildQRContent({ bankCode, accountNo, accountName, amount, description }) {
    // Simple format for demonstration
    // Real VietQR uses EMV QR Code format
    const content = JSON.stringify({
        bank: bankCode,
        account: accountNo,
        name: accountName,
        amount: amount,
        desc: description
    });

    return content;
}

/**
 * Get bank information
 * @param {string} bankCode - Bank code
 * @returns {Object} Bank details
 */
export function getBankInfo(bankCode) {
    const banks = {
        VCB: {
            code: 'VCB',
            name: 'Vietcombank',
            fullName: 'Ngân hàng TMCP Ngoại thương Việt Nam',
            logo: 'https://api.vietqr.io/img/VCB.png'
        },
        TCB: {
            code: 'TCB',
            name: 'Techcombank',
            fullName: 'Ngân hàng TMCP Kỹ thương Việt Nam',
            logo: 'https://api.vietqr.io/img/TCB.png'
        },
        VTB: {
            code: 'VTB',
            name: 'Vietinbank',
            fullName: 'Ngân hàng TMCP Công thương Việt Nam',
            logo: 'https://api.vietqr.io/img/ICB.png'
        },
        BIDV: {
            code: 'BIDV',
            name: 'BIDV',
            fullName: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam',
            logo: 'https://api.vietqr.io/img/BIDV.png'
        },
        ACB: {
            code: 'ACB',
            name: 'ACB',
            fullName: 'Ngân hàng TMCP Á Châu',
            logo: 'https://api.vietqr.io/img/ACB.png'
        },
        MB: {
            code: 'MB',
            name: 'MBBank',
            fullName: 'Ngân hàng TMCP Quân đội',
            logo: 'https://api.vietqr.io/img/MB.png'
        }
    };

    return banks[bankCode] || banks.VCB;
}

/**
 * Format transfer description for VietQR
 * @param {string} depositId - Deposit ID
 * @param {string} auctionId - Auction ID
 * @returns {string} Formatted description
 */
export function formatTransferDescription(paymentId, auctionId) {
    // Format: VPA [last 6 of paymentId] [last 4 of auctionId or ORDER]
    const paymentSuffix = paymentId ? paymentId.substr(-6).toUpperCase() : 'XXXXXX';
    const auctionSuffix = auctionId ? auctionId.substr(-4).toUpperCase() : 'ORDER';
    return `VPA ${paymentSuffix} ${auctionSuffix}`;
}

/**
 * Generate payment instructions HTML
 * @param {Object} params - Payment parameters
 * @returns {string} HTML string
 */
export function generatePaymentInstructions({
    bankCode,
    accountNo,
    accountName,
    amount,
    description
}) {
    const bank = getBankInfo(bankCode);

    return `
        <div class="space-y-4">
            <div class="bg-gradient-to-r from-blue-50 to-blue-50 p-4 rounded-lg">
                <h4 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i data-lucide="landmark" class="w-5 h-5 text-blue-600"></i>
                    Thông tin chuyển khoản
                </h4>
                <div class="space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">Ngân hàng:</span>
                        <span class="font-semibold text-gray-900">${bank.name}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">Số tài khoản:</span>
                        <span class="font-mono font-bold text-gray-900">${accountNo}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600 text-sm">Chủ tài khoản:</span>
                        <span class="font-semibold text-gray-900">${accountName}</span>
                    </div>
                    <div class="flex justify-between items-center pt-2 border-t border-blue-200">
                        <span class="text-gray-600 text-sm">Số tiền:</span>
                        <span class="text-xl font-black text-blue-600">${amount.toLocaleString('vi-VN')} VNĐ</span>
                    </div>
                    <div class="flex justify-between items-start pt-2">
                        <span class="text-gray-600 text-sm">Nội dung:</span>
                        <span class="font-mono font-bold text-gray-900 text-right break-all max-w-[200px]">${description}</span>
                    </div>
                </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p class="text-sm text-blue-800 flex items-start gap-2">
                    <i data-lucide="alert-triangle" class="w-4 h-4 flex-shrink-0 mt-0.5"></i>
                    <span><strong>Lưu ý:</strong> Vui lòng nhập chính xác nội dung chuyển khoản để hệ thống tự động xác nhận</span>
                </p>
            </div>
        </div>
    `;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @param {string} label - Label for toast message
 */
export function copyToClipboard(text, label = 'Nội dung') {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            // Toast will be shown by the component
            console.log(`Copied ${label}: ${text}`);
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

export default {
    generateVietQR,
    getBankInfo,
    formatTransferDescription,
    generatePaymentInstructions,
    copyToClipboard
};
