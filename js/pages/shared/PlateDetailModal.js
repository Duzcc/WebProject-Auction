/**
 * PlateDetailModal Component
 * Shows detailed information about a license plate when clicked
 */

import { createElement, createFromHTML } from '../../utils/dom.js';

export function PlateDetailModal() {
    let isOpen = false;
    let plateData = null;

    const modal = createElement('div', {
        className: 'fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-50 p-4',
        id: 'plate-detail-modal'
    });

    modal.innerHTML = `
        <div class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <!-- Close button -->
            <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 z-10" id="close-modal">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>

            <!-- Modal content -->
            <div class="p-8" id="modal-content">
                <!-- Content will be inserted here -->
            </div>
        </div>
    `;

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            close();
        }
    });

    // Close button
    modal.querySelector('#close-modal').addEventListener('click', close);

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
            close();
        }
    });

    function open(data) {
        plateData = data;
        isOpen = true;
        renderContent();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        // Re-initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function close() {
        isOpen = false;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }

    function renderContent() {
        if (!plateData) return;

        const content = modal.querySelector('#modal-content');

        // Generate plate image URL (using pattern similar to actual plates)
        const plateImageUrl = `https://picsum.photos/seed/${plateData.plateNumber}/600/200`;

        content.innerHTML = `
            <div class="space-y-6">
                <!-- Header -->
                <div class="text-center">
                    <h2 class="text-3xl font-black text-gray-900 dark:text-white mb-2" style="font-family: 'Playfair Display', serif;">
                        Chi tiết biển số
                    </h2>
                    <p class="text-gray-500 dark:text-gray-400">Thông tin đầy đủ về biển số xe</p>
                </div>

                <!-- Plate Image -->
                <div class="relative">
                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8 flex items-center justify-center">
                        <div class="bg-white border-4 border-gray-800 rounded-lg px-8 py-4 shadow-2xl">
                            <div class="text-6xl font-black text-gray-900 tracking-wider" style="font-family: monospace;">
                                ${plateData.plateNumber}
                            </div>
                        </div>
                    </div>
                    <!-- Favorite button -->
                    <button class="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:scale-110 transition-transform">
                        <i data-lucide="star" class="w-6 h-6 text-yellow-400"></i>
                    </button>
                </div>

                <!-- Information Grid -->
                <div class="grid md:grid-cols-2 gap-6">
                    <!-- Left Column -->
                    <div class="space-y-4">
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Giá khởi điểm</div>
                            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">${plateData.startPrice}</div>
                        </div>

                        <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Tỉnh, Thành phố</div>
                            <div class="text-lg font-semibold text-gray-900 dark:text-white">${plateData.province}</div>
                        </div>

                        ${plateData.type ? `
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Loại biển</div>
                            <div class="text-lg font-semibold text-gray-900 dark:text-white">${plateData.type}</div>
                        </div>
                        ` : ''}
                    </div>

                    <!-- Right Column -->
                    <div class="space-y-4">
                        ${plateData.auctionTime ? `
                        <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">Thời gian đấu giá</div>
                            <div class="text-lg font-semibold text-gray-900 dark:text-white">
                                <i data-lucide="calendar" class="w-4 h-4 inline mr-2"></i>
                                ${plateData.auctionTime}
                            </div>
                        </div>
                        ` : ''}

                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                            <div class="text-sm text-blue-800 dark:text-blue-200 mb-2 font-semibold">
                                <i data-lucide="info" class="w-4 h-4 inline mr-1"></i>
                                Tiền đặt trước
                            </div>
                            <div class="text-2xl font-black text-blue-600 dark:text-blue-400">
                                ${calculateDeposit(plateData.startPrice)}
                            </div>
                            <div class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                (40% giá khởi điểm)
                            </div>
                        </div>

                        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                            <div class="text-sm text-yellow-800 dark:text-yellow-200 font-semibold mb-2">
                                <i data-lucide="sparkles" class="w-4 h-4 inline mr-1"></i>
                                Đặc điểm nổi bật
                            </div>
                            <div class="text-sm text-yellow-700 dark:text-yellow-300">
                                ${getPlateFeatures(plateData.plateNumber)}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button class="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transform transition hover:scale-105 flex items-center justify-center gap-2 btn-ripple" id="register-auction-btn">
                        <i data-lucide="clipboard-check" class="w-5 h-5"></i>
                        <span>Đăng ký đấu giá</span>
                    </button>
                    <button class="px-6 border-2 border-blue-600 text-blue-600 dark:text-blue-400 py-4 rounded-lg font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition flex items-center justify-center gap-2">
                        <i data-lucide="share-2" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        `;

        // Re-initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Register auction button handler
        content.querySelector('#register-auction-btn')?.addEventListener('click', () => {
            // Trigger registration from parent
            if (plateData.onRegister) {
                plateData.onRegister();
            }
            close();
        });
    }

    function calculateDeposit(startPrice) {
        // Remove all non-numeric characters except decimal point
        const numericPrice = parseFloat(startPrice.replace(/[^\d.]/g, ''));
        const deposit = numericPrice * 0.4;
        return deposit.toLocaleString('vi-VN') + ' đ';
    }

    function getPlateFeatures(plateNumber) {
        const features = [];
        const digits = plateNumber.replace(/[^0-9]/g, '');

        // Check for repeating patterns
        if (/(\d)\1{2,}/.test(digits)) {
            features.push('Số lặp');
        }

        // Check for sequential
        if (/(?:012|123|234|345|456|567|678|789)/.test(digits)) {
            features.push('Sảnh tiến');
        }

        // Check for lucky numbers
        if (digits.includes('8') || digits.includes('68')) {
            features.push('Số may mắn');
        }

        // Check for mirror
        if (digits === digits.split('').reverse().join('')) {
            features.push('Số gương');
        }

        return features.length > 0 ? features.join(', ') : 'Biển số đẹp, dễ nhớ';
    }

    return {
        element: modal,
        open,
        close
    };
}

export default PlateDetailModal;
