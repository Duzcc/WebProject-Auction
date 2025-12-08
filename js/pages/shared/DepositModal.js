import { createElement, createFromHTML } from '../../utils/dom.js';
import { createDepositPayment, uploadPaymentProof, getDepositStatus } from '../../utils/deposit.js';
import { generateVietQR, getBankInfo, formatTransferDescription, copyToClipboard } from '../../utils/qrCode.js';
import { CountdownTimer } from './CountdownTimer.js';
import toast from '../../utils/toast.js';

/**
 * Deposit Payment Modal
 * Modal for paying auction deposit with QR code
 */
export function DepositModal() {
    let isOpen = false;
    let currentItem = null;
    let deposit = null;

    const container = createElement('div', {
        className: 'fixed inset-0 z-50 flex items-center justify-center p-4 hidden',
        id: 'deposit-modal'
    });

    // Backdrop
    const backdrop = createElement('div', {
        className: 'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
    });
    container.appendChild(backdrop);

    // Modal wrapper
    const modalWrapper = createElement('div', {
        className: 'relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-transform'
    });
    container.appendChild(modalWrapper);

    function render() {
        if (!currentItem || !deposit) return;

        const bank = getBankInfo('VCB'); // Default bank
        const description = formatTransferDescription(deposit.id, currentItem.id);
        const qrCodeURL = generateVietQR({
            bankCode: 'VCB',
            accountNo: '1034567890',
            accountName: 'VPA AUCTION',
            amount: deposit.amount,
            description
        });

        modalWrapper.innerHTML = `
            <div class="flex flex-col h-full max-h-[90vh]">
                <!-- Header -->
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <div class="flex items-center gap-3">
                        <i data-lucide="wallet" class="w-6 h-6"></i>
                        <h2 class="text-xl font-bold">Đặt cọc đấu giá</h2>
                    </div>
                    <button id="close-modal" class="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <!-- Content -->
                <div class="flex-1 overflow-y-auto p-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Left: Item Details & Instructions -->
                        <div class="space-y-6">
                            <!-- Item Card -->
                            <div class="bg-gradient-to-br from-blue-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl border-2 border-blue-200">
                                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Biển số đấu giá</h3>
                                <div class="text-3xl font-black text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                                    <span class="px-5 py-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg border-2 border-blue-300">
                                        ${currentItem.plateNumber}
                                    </span>
                                </div>
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Tỉnh/TP:</span>
                                        <span class="font-semibold text-gray-900 dark:text-white">${currentItem.province}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Giá khởi điểm:</span>
                                        <span class="font-semibold text-gray-900 dark:text-white">${currentItem.startPrice} VNĐ</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Deposit Amount -->
                            <div class="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-6">
                                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Số tiền đặt cọc</h3>
                                <div class="text-4xl font-black text-blue-600 dark:text-blue-400 mb-1">
                                    ${deposit.amount.toLocaleString('vi-VN')}
                                </div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">VNĐ</div>
                                <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <p class="text-xs text-gray-600 dark:text-gray-400">
                                        = 10% giá khởi điểm
                                    </p>
                                </div>
                            </div>

                            <!-- Deadline -->
                            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <div class="flex items-start gap-3">
                                    <i data-lucide="clock" class="w-5 h-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5"></i>
                                    <div class="flex-1">
                                        <p class="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Hạn thanh toán</p>
                                        <div class="timer-container"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Instructions -->
                            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <h4 class="font-bold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                                    <i data-lucide="info" class="w-5 h-5"></i>
                                    Hướng dẫn thanh toán
                                </h4>
                                <ol class="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                                    <li class="flex items-start gap-2">
                                        <span class="font-bold">1.</span>
                                        <span>Quét mã QR bằng app ngân hàng</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="font-bold">2.</span>
                                        <span>Hoặc chuyển khoản theo thông tin bên phải</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="font-bold">3.</span>
                                        <span><strong>Quan trọng:</strong> Nhập chính xác nội dung chuyển khoản</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <span class="font-bold">4.</span>
                                        <span>Tải ảnh minh chứng sau khi chuyển khoản</span>
                                    </li>
                                </ol>
                            </div>
                        </div>

                        <!-- Right: QR Code & Payment Info -->
                        <div class="space-y-6">
                            <!-- QR Code -->
                            <div class="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
                                <h3 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                                    <i data-lucide="qr-code" class="w-5 h-5 text-blue-600"></i>
                                    Quét mã QR để thanh toán
                                </h3>
                                <div class="inline-block p-4 bg-white rounded-lg shadow-lg">
                                    <img src="${qrCodeURL}" alt="QR Code" class="w-64 h-64 mx-auto" />
                                </div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mt-3">
                                    Quét bằng app ngân hàng để tự động điền thông tin
                                </p>
                            </div>

                            <!-- Bank Info -->
                            <div class="bg-gradient-to-r from-blue-50 to-blue-50 dark:from-gray-700 via-gray-800 p-6 rounded-xl">
                                <h4 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <i data-lucide="landmark" class="w-5 h-5 text-blue-600"></i>
                                    Thông tin chuyển khoản
                                </h4>
                                <div class="space-y-3">
                                    <div class="flex justify-between items-center">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Ngân hàng:</span>
                                        <span class="font-semibold text-gray-900 dark:text-white">${bank.name}</span>
                                    </div>
                                    <div class="flex justify-between items-center">
<span class="text-sm text-gray-600 dark:text-gray-400">Số TK:</span>
                                        <div class="flex items-center gap-2">
                                            <span class="font-mono font-bold text-gray-900 dark:text-white">1034567890</span>
                                            <button class="copy-btn p-1.5 hover:bg-white/50 dark:hover:bg-gray-700 rounded transition-colors" data-copy="1034567890" data-label="Số tài khoản">
                                                <i data-lucide="copy" class="w-4 h-4 text-blue-600"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Chủ TK:</span>
                                        <span class="font-semibold text-gray-900 dark:text-white">VPA AUCTION</span>
                                    </div>
                                    <div class="flex justify-between items-center pt-3 border-t border-blue-200 dark:border-blue-800">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Số tiền:</span>
                                        <div class="flex items-center gap-2">
                                            <span class="text-xl font-black text-blue-600 dark:text-blue-400">${deposit.amount.toLocaleString('vi-VN')}</span>
                                            <button class="copy-btn p-1.5 hover:bg-white/50 dark:hover:bg-gray-700 rounded transition-colors" data-copy="${deposit.amount}" data-label="Số tiền">
                                                <i data-lucide="copy" class="w-4 h-4 text-blue-600"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="flex justify-between items-start pt-3">
                                        <span class="text-sm text-gray-600 dark:text-gray-400">Nội dung:</span>
                                        <div class="flex items-center gap-2">
                                            <span class="font-mono font-bold text-gray-900 dark:text-white text-right">${description}</span>
                                            <button class="copy-btn p-1.5 hover:bg-white/50 dark:hover:bg-gray-700 rounded transition-colors" data-copy="${description}" data-label="Nội dung">
                                                <i data-lucide="copy" class="w-4 h-4 text-blue-600"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Warning -->
                            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <p class="text-sm text-blue-800 dark:text-blue-300 flex items-start gap-2">
                                    <i data-lucide="alert-triangle" class="w-4 h-4 flex-shrink-0 mt-0.5"></i>
                                    <span><strong>Lưu ý:</strong> Vui lòng nhập chính xác nội dung chuyển khoản để hệ thống tự động xác nhận</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer: Upload Proof -->
                <div class="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-900">
                    <div class="max-w-2xl mx-auto">
                        <h4 class="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <i data-lucide="upload" class="w-5 h-5 text-blue-600"></i>
                            Tải lên minh chứng thanh toán
                        </h4>
                        
                        <div class="flex gap-3">
                            <input 
                                type="file" 
                                id="proof-upload"
                                accept="image/*"
                                class="hidden"
                            />
                            <label 
                                for="proof-upload"
                                class="flex-1 cursor-pointer px-6 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-center font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center gap-2"
                            >
                                <i data-lucide="image" class="w-5 h-5"></i>
                                <span id="file-label">Chọn ảnh minh chứng</span>
                            </label>
                            <button 
                                id="submit-proof-btn"
                                disabled
                                class="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                            >
                                <i data-lucide="check-circle" class="w-5 h-5"></i>
                                Xác nhận
                            </button>
                        </div>
                        
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-3">
                            Tải lên ảnh chụp màn hình giao dịch thành công từ app ngân hàng
                        </p>
                    </div>
                </div>
            </div>
        `;

        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Add countdown timer
        const timerContainer = modalWrapper.querySelector('.timer-container');
        if (timerContainer && deposit.deadline) {
            const timer = CountdownTimer({
                endTime: deposit.deadline,
                onExpire: () => {
                    toast.error('Hết hạn thanh toán đặt cọc');
                    close();
                }
            });
            timerContainer.appendChild(timer);
        }

        // Add event listeners
        const closeBtn = modalWrapper.querySelector('#close-modal');
        closeBtn?.addEventListener('click', close);

        // Copy buttons
        const copyBtns = modalWrapper.querySelectorAll('.copy-btn');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.dataset.copy;
                const label = btn.dataset.label;
                copyToClipboard(text, label);
                toast.success(`Đã sao chép ${label}`);
            });
        });

        // File upload
        const fileInput = modalWrapper.querySelector('#proof-upload');
        const fileLabel = modalWrapper.querySelector('#file-label');
        const submitBtn = modalWrapper.querySelector('#submit-proof-btn');
        let selectedFile = null;

        fileInput?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                selectedFile = file;
                fileLabel.textContent = file.name;
                submitBtn.disabled = false;
            }
        });

        submitBtn?.addEventListener('click', handleSubmitProof);
    }

    function handleSubmitProof() {
        const fileInput = modalWrapper.querySelector('#proof-upload');
        const file = fileInput?.files[0];

        if (!file) {
            toast.error('Vui lòng chọn ảnh minh chứng');
            return;
        }

        // Read file as base64
        const reader = new FileReader();
        reader.onload = (e) => {
            const proofData = e.target.result;
            const success = uploadPaymentProof(deposit.id, proofData);

            if (success) {
                setTimeout(() => {
                    close();
                }, 1000);
            }
        };
        reader.readAsDataURL(file);
    }

    function open(item) {
        currentItem = item;

        // Check if deposit already exists
        const existingDeposit = getDepositStatus(item.id);

        if (existingDeposit) {
            deposit = existingDeposit;
        } else {
            // Create new deposit
            const depositAmount = Math.floor(parseInt(item.startPrice.replace(/\D/g, '')) * 0.1);
            deposit = createDepositPayment({
                auctionId: item.id,
                itemName: item.plateNumber,
                amount: depositAmount,
                method: 'bank_transfer'
            });

            if (!deposit) {
                return;
            }
        }

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
    }

    function close() {
        // Animate out
        backdrop.style.opacity = '0';
        modalWrapper.style.transform = 'scale(0.95)';

        setTimeout(() => {
            container.classList.add('hidden');
            isOpen = false;
            currentItem = null;
            deposit = null;

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

export default DepositModal;
