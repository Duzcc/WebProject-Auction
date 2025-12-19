import { createElement, createFromHTML } from '../../../shared/utils/dom.js';
import { DepositModal } from './DepositModal.js';
import { getProvinces, getDistricts, getWards } from '../../../data/vietnamAddress.js';

/**
 * AuctionRegistrationModal Component
 * Multi-step registration form for auction participation
 * Step 1: Select user type (Individual or Organization)
 * Step 2: Fill registration form based on selected type
 */
export function AuctionRegistrationModal() {
    let currentStep = 1;
    let userType = null; // 'individual' or 'organization'
    let isOpen = false;
    let currentAuctionItem = null; // Store current auction item for deposit
    let depositModal = null; // Instance of DepositModal

    const container = createElement('div', {
        className: 'fixed inset-0 z-50 flex items-center justify-center p-4 hidden',
        id: 'auction-registration-modal'
    });

    // Backdrop
    const backdrop = createElement('div', {
        className: 'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity'
    });
    container.appendChild(backdrop);

    // Modal content wrapper
    const modalWrapper = createElement('div', {
        className: 'relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform'
    });
    container.appendChild(modalWrapper);

    function renderStep1() {
        modalWrapper.innerHTML = `
            <div class="p-8">
                <!-- Header -->
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-3xl font-black text-gray-900">Đăng ký đấu giá</h2>
                    <button id="close-modal" class="text-gray-400 hover:text-gray-600 transition-colors">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <!-- Step Indicator -->
                <div class="flex items-center gap-2 mb-8">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                        <span class="text-sm font-medium text-blue-600">Chọn loại tài khoản</span>
                    </div>
                    <div class="flex-1 h-0.5 bg-gray-200"></div>
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-sm">2</div>
                        <span class="text-sm font-medium text-gray-400">Thông tin đăng ký</span>
                    </div>
                </div>

                <!-- User Type Selection -->
                <div class="mb-6">
                    <p class="text-lg font-medium text-gray-700 mb-6 text-center">Bạn là cá nhân hay tổ chức?</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Individual Card -->
                        <button id="select-individual" class="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300">
                            <div class="flex flex-col items-center text-center">
                                <div class="w-16 h-16 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                                    <i data-lucide="user" class="w-8 h-8 text-blue-600"></i>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-2">Cá nhân</h3>
                                <p class="text-sm text-gray-600">Đăng ký với tư cách cá nhân</p>
                            </div>
                        </button>

                        <!-- Organization Card -->
                        <button id="select-organization" class="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300">
                            <div class="flex flex-col items-center text-center">
                                <div class="w-16 h-16 rounded-full bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                                    <i data-lucide="building-2" class="w-8 h-8 text-blue-600"></i>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-2">Tổ chức</h3>
                                <p class="text-sm text-gray-600">Đăng ký với tư cách tổ chức/công ty</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Initialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Add event listeners
        const closeBtn = modalWrapper.querySelector('#close-modal');
        closeBtn?.addEventListener('click', close);

        const individualBtn = modalWrapper.querySelector('#select-individual');
        individualBtn?.addEventListener('click', () => {
            userType = 'individual';
            currentStep = 2;
            renderStep2();
        });

        const organizationBtn = modalWrapper.querySelector('#select-organization');
        organizationBtn?.addEventListener('click', () => {
            userType = 'organization';
            currentStep = 2;
            renderStep2();
        });
    }

    function renderStep2() {
        const formFields = userType === 'individual' ? `
            <!-- Full Name -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <i data-lucide="user" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <input 
                        type="text" 
                        id="fullName"
                        name="fullName"
                        required
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder=""
                    />
                </div>
                <p class="text-red-500 text-sm mt-1 hidden error-message" id="fullName-error"></p>
            </div>

            <!-- ID Card -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    CMND/CCCD <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <i data-lucide="credit-card" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <input 
                        type="text" 
                        id="idCard"
                        name="idCard"
                        required
                        maxlength="12"
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder=""
                    />
                </div>
                <p class="text-red-500 text-sm mt-1 hidden error-message" id="idCard-error"></p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <!-- Phone -->
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <i data-lucide="phone" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                        <input 
                            type="tel" 
                            id="phone"
                            name="phone"
                            required
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder=""
                        />
                    </div>
                    <p class="text-red-500 text-sm mt-1 hidden error-message" id="phone-error"></p>
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <i data-lucide="mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            required
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder=""
                        />
                    </div>
                    <p class="text-red-500 text-sm mt-1 hidden error-message" id="email-error"></p>
                </div>
            </div>

            <!-- Address Section -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ <span class="text-red-500">*</span>
                </label>
                
                <!-- Province -->
                <div class="relative mb-3">
                    <i data-lucide="map-pin" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <select 
                        id="province"
                        name="province"
                        required
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                    >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                    </select>
                    <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"></i>
                </div>
                <p class="text-red-500 text-sm mt-1 mb-3 hidden error-message" id="province-error"></p>
                
                <!-- District -->
                <div class="relative mb-3">
                    <i data-lucide="map" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <select 
                        id="district"
                        name="district"
                        required
                        disabled
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">Chọn Quận/Huyện</option>
                    </select>
                    <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"></i>
                </div>
                <p class="text-red-500 text-sm mt-1 mb-3 hidden error-message" id="district-error"></p>
                
                <!-- Ward -->
                <div class="relative mb-3">
                    <i data-lucide="home" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <select 
                        id="ward"
                        name="ward"
                        required
                        disabled
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">Chọn Phường/Xã</option>
                    </select>
                    <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"></i>
                </div>
                <p class="text-red-500 text-sm mt-1 mb-3 hidden error-message" id="ward-error"></p>
                
                <!-- Specific Address -->
                <div class="relative">
                    <i data-lucide="navigation" class="absolute left-3 top-3 w-5 h-5 text-gray-400"></i>
                    <input 
                        type="text"
                        id="specificAddress"
                        name="specificAddress"
                        required
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder=""
                    />
                </div>
                <p class="text-red-500 text-sm mt-1 hidden error-message" id="specificAddress-error"></p>
            </div>
        ` : `
            <!-- Organization Name -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Tên công ty/tổ chức <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <i data-lucide="building-2" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <input 
                        type="text" 
                        id="companyName"
                        name="companyName"
                        required
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder=""
                    />
                </div>
                <p class="text-red-500 text-sm mt-1 hidden error-message" id="companyName-error"></p>
            </div>

            <!-- Tax Code -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Mã số thuế <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <i data-lucide="hash" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <input 
                        type="text" 
                        id="taxCode"
                        name="taxCode"
                        required
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder=""
                    />
                </div>
                <p class="text-red-500 text-sm mt-1 hidden error-message" id="taxCode-error"></p>
            </div>

            <!-- Representative Name -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Người đại diện <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <i data-lucide="user-check" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <input 
                        type="text" 
                        id="representativeName"
                        name="representativeName"
                        required
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder=""
                    />
                </div>
                <p class="text-red-500 text-sm mt-1 hidden error-message" id="representativeName-error"></p>
            </div>

            <!-- Representative ID -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    CMND/CCCD người đại diện <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                    <i data-lucide="credit-card" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <input 
                        type="text" 
                        id="representativeId"
                        name="representativeId"
                        required
                        maxlength="12"
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder=""
                    />
                </div>
                <p class="text-red-500 text-sm mt-1 hidden error-message" id="representativeId-error"></p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <!-- Phone -->
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Số điện thoại <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <i data-lucide="phone" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                        <input 
                            type="tel" 
                            id="phone"
                            name="phone"
                            required
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder=""
                        />
                    </div>
                    <p class="text-red-500 text-sm mt-1 hidden error-message" id="phone-error"></p>
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <i data-lucide="mail" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            required
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder=""
                        />
                    </div>
                    <p class="text-red-500 text-sm mt-1 hidden error-message" id="email-error"></p>
                </div>
            </div>

            <!-- Company Address Section -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Địa chỉ công ty <span class="text-red-500">*</span>
                </label>
                
                <!-- Province -->
                <div class="relative mb-3">
                    <i data-lucide="map-pin" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <select 
                        id="province"
                        name="province"
                        required
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                    >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                    </select>
                    <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"></i>
                </div>
                <p class="text-red-500 text-sm mt-1 mb-3 hidden error-message" id="province-error"></p>
                
                <!-- District -->
                <div class="relative mb-3">
                    <i data-lucide="map" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <select 
                        id="district"
                        name="district"
                        required
                        disabled
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">Chọn Quận/Huyện</option>
                    </select>
                    <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"></i>
                </div>
                <p class="text-red-500 text-sm mt-1 mb-3 hidden error-message" id="district-error"></p>
                
                <!-- Ward -->
                <div class="relative mb-3">
                    <i data-lucide="home" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <select 
                        id="ward"
                        name="ward"
                        required
                        disabled
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                        <option value="">Chọn Phường/Xã</option>
                    </select>
                    <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"></i>
                </div>
                <p class="text-red-500 text-sm mt-1 mb-3 hidden error-message" id="ward-error"></p>
                
                <!-- Specific Address -->
                <div class="relative">
                    <i data-lucide="navigation" class="absolute left-3 top-3 w-5 h-5 text-gray-400"></i>
                    <input 
                        type="text"
                        id="specificAddress"
                        name="specificAddress"
                        required
                        class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder=""
                    />
                </div>
                <p class="text-red-500 text-sm mt-1 hidden error-message" id="specificAddress-error"></p>
            </div>
        `;

        modalWrapper.innerHTML = `
            <div class="p-8">
                <!-- Header -->
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-3">
                        <button id="back-btn" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <i data-lucide="arrow-left" class="w-6 h-6"></i>
                        </button>
                        <h2 class="text-3xl font-black text-gray-900">Thông tin đăng ký</h2>
                    </div>
                    <button id="close-modal" class="text-gray-400 hover:text-gray-600 transition-colors">
                        <i data-lucide="x" class="w-6 h-6"></i>
                    </button>
                </div>

                <!-- Step Indicator -->
                <div class="flex items-center gap-2 mb-8">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                            <i data-lucide="check" class="w-5 h-5"></i>
                        </div>
                        <span class="text-sm font-medium text-blue-600">Chọn loại tài khoản</span>
                    </div>
                    <div class="flex-1 h-0.5 bg-blue-600"></div>
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                        <span class="text-sm font-medium text-blue-600">Thông tin đăng ký</span>
                    </div>
                </div>

                <!-- User Type Badge -->
                <div class="mb-6 flex items-center gap-2">
                    <i data-lucide="${userType === 'individual' ? 'user' : 'building-2'}" class="w-5 h-5 text-blue-600"></i>
                    <span class="text-sm font-medium text-gray-700">Đăng ký với tư cách: <span class="text-blue-600 font-bold">${userType === 'individual' ? 'Cá nhân' : 'Tổ chức'}</span></span>
                </div>

                <!-- Form -->
                <form id="registration-form" class="space-y-0">
                    ${formFields}

                    <!-- Terms Checkbox -->
                    <div class="mb-6">
                        <label class="flex items-start gap-3 cursor-pointer">
                            <input 
                                type="checkbox" 
                                id="terms"
                                name="terms"
                                required
                                class="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <span class="text-sm text-gray-700">
                                Tôi đồng ý với <a href="#" class="text-blue-600 hover:underline font-medium">điều khoản và điều kiện</a> của VPA và cam kết cung cấp thông tin chính xác.
                            </span>
                        </label>
                        <p class="text-red-500 text-sm mt-1 hidden error-message" id="terms-error"></p>
                    </div>

                    <!-- Submit Buttons -->
                    <div class="flex gap-3">
                        <button 
                            type="button"
                            id="cancel-btn"
                            class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button 
                            type="submit"
                            id="submit-btn"
                            class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <span>Hoàn tất đăng ký</span>
                            <i data-lucide="check-circle" class="w-5 h-5"></i>
                        </button>
                    </div>
                </form>
            </div>
        `;

        // Initialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Add event listeners
        const closeBtn = modalWrapper.querySelector('#close-modal');
        closeBtn?.addEventListener('click', close);

        const backBtn = modalWrapper.querySelector('#back-btn');
        backBtn?.addEventListener('click', () => {
            currentStep = 1;
            userType = null;
            renderStep1();
        });

        const cancelBtn = modalWrapper.querySelector('#cancel-btn');
        cancelBtn?.addEventListener('click', close);

        const form = modalWrapper.querySelector('#registration-form');
        form?.addEventListener('submit', handleSubmit);

        // =============== CASCADE ADDRESS DROPDOWNS ===============
        const provinceSelect = modalWrapper.querySelector('#province');
        const districtSelect = modalWrapper.querySelector('#district');
        const wardSelect = modalWrapper.querySelector('#ward');

        // Populate provinces
        if (provinceSelect) {
            const provinces = getProvinces();
            provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province;
                option.textContent = province;
                provinceSelect.appendChild(option);
            });

            // Province change handler
            provinceSelect.addEventListener('change', (e) => {
                const selectedProvince = e.target.value;

                // Reset district and ward
                districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
                wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
                districtSelect.disabled = true;
                wardSelect.disabled = true;

                if (selectedProvince) {
                    // Populate districts
                    const districts = getDistricts(selectedProvince);
                    districts.forEach(district => {
                        const option = document.createElement('option');
                        option.value = district;
                        option.textContent = district;
                        districtSelect.appendChild(option);
                    });
                    districtSelect.disabled = false;
                }

                // Re-initialize icons after DOM changes
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            });
        }

        // District change handler
        if (districtSelect) {
            districtSelect.addEventListener('change', (e) => {
                const selectedProvince = provinceSelect.value;
                const selectedDistrict = e.target.value;

                // Reset ward
                wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
                wardSelect.disabled = true;

                if (selectedProvince && selectedDistrict) {
                    // Populate wards
                    const wards = getWards(selectedProvince, selectedDistrict);
                    wards.forEach(ward => {
                        const option = document.createElement('option');
                        option.value = ward;
                        option.textContent = ward;
                        wardSelect.appendChild(option);
                    });
                    wardSelect.disabled = false;
                }

                // Re-initialize icons
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            });
        }

        // Auto-focus first input
        const firstInput = modalWrapper.querySelector('input[type="text"], input[type="email"], input[type="tel"]');
        firstInput?.focus();
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Clear previous errors
        const errorMessages = modalWrapper.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.classList.add('hidden'));

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Validation
        let hasErrors = false;

        if (userType === 'individual') {
            // Validate full name
            if (!data.fullName || data.fullName.trim().length < 3) {
                showError('fullName', 'Họ tên phải có ít nhất 3 ký tự');
                hasErrors = true;
            }

            // Validate ID card
            if (!data.idCard || !/^[0-9]{9}$|^[0-9]{12}$/.test(data.idCard)) {
                showError('idCard', 'CMND/CCCD phải có 9 hoặc 12 số');
                hasErrors = true;
            }
        } else {
            // Validate company name
            if (!data.companyName || data.companyName.trim().length < 3) {
                showError('companyName', 'Tên công ty phải có ít nhất 3 ký tự');
                hasErrors = true;
            }

            // Validate tax code
            if (!data.taxCode || !/^[0-9]{10,13}$/.test(data.taxCode)) {
                showError('taxCode', 'Mã số thuế phải có 10-13 số');
                hasErrors = true;
            }

            // Validate representative
            if (!data.representativeName || data.representativeName.trim().length < 3) {
                showError('representativeName', 'Tên người đại diện phải có ít nhất 3 ký tự');
                hasErrors = true;
            }

            if (!data.representativeId || !/^[0-9]{9}$|^[0-9]{12}$/.test(data.representativeId)) {
                showError('representativeId', 'CMND/CCCD phải có 9 hoặc 12 số');
                hasErrors = true;
            }
        }

        // Common validations
        // Validate phone (Vietnam format: starts with 03, 05, 07, 08, 09 followed by 8 digits)
        if (!data.phone || !/^(0[3|5|7|8|9])+([0-9]{8})$/.test(data.phone)) {
            showError('phone', 'Số điện thoại không hợp lệ (VD: 0901234567)');
            hasErrors = true;
        }

        // Validate email
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            showError('email', 'Email không hợp lệ');
            hasErrors = true;
        }

        // Validate address (NEW: cascade dropdowns)
        if (!data.province || data.province === '') {
            showError('province', 'Vui lòng chọn Tỉnh/Thành phố');
            hasErrors = true;
        }

        if (!data.district || data.district === '') {
            showError('district', 'Vui lòng chọn Quận/Huyện');
            hasErrors = true;
        }

        if (!data.ward || data.ward === '') {
            showError('ward', 'Vui lòng chọn Phường/Xã');
            hasErrors = true;
        }

        if (!data.specificAddress || data.specificAddress.trim().length < 5) {
            showError('specificAddress', 'Địa chỉ cụ thể phải có ít nhất 5 ký tự');
            hasErrors = true;
        }

        // Validate terms
        if (!data.terms) {
            showError('terms', 'Bạn phải đồng ý với điều khoản');
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        // Combine full address from cascade fields
        const fullAddress = `${data.specificAddress}, ${data.ward}, ${data.district}, ${data.province}`;

        // Add combined address to data
        data.fullAddress = fullAddress;

        // Success - log data and show success message
        console.log('Registration data:', { userType, ...data });

        // Add registration to cart
        if (currentAuctionItem) {
            try {
                // Import cart utilities dynamically
                const { addToCart } = await import('../../payment/utils/cart.js');

                const registrationItem = {
                    id: `reg_${currentAuctionItem.auctionId || Date.now()}`,
                    type: 'registration',
                    auctionId: currentAuctionItem.auctionId,
                    plateNumber: currentAuctionItem.plateNumber || currentAuctionItem.auctionName, // CRITICAL: Add plateNumber
                    name: currentAuctionItem.auctionName,
                    price: currentAuctionItem.depositAmount,
                    depositAmount: currentAuctionItem.depositAmount,
                    image: '/images/auction-placeholder.jpg',
                    quantity: 1,
                    status: 'pending',
                    paid: false, // CRITICAL: Mark as unpaid
                    auctionDate: currentAuctionItem.auctionDate,
                    auctionSession: currentAuctionItem.session || 'Đăng ký',
                    registeredAt: new Date().toISOString(),
                    // CRITICAL: Include full user registration data
                    fullName: data.fullName || data.companyName,
                    email: data.email,
                    phone: data.phone,
                    idCard: data.idCard,
                    taxCode: data.taxCode,
                    // Address fields from cascade dropdowns
                    province: data.province,
                    district: data.district,
                    ward: data.ward,
                    specificAddress: data.specificAddress,
                    fullAddress: data.fullAddress, // Combined address
                    userType: userType // 'individual' or 'organization'
                };

                console.log('📝 Creating registration item:', registrationItem);
                addToCart(registrationItem, 1);
                console.log('✅ Item added to cart successfully');
            } catch (error) {
                console.error('❌ Failed to add to cart:', error);
                alert('Có lỗi khi thêm vào giỏ hàng. Vui lòng thử lại!');
                return; // Stop execution if cart add fails
            }
        }


        // Show simple success message
        const toast = createFromHTML(`
            <div class="fixed top-4 right-4 z-[60] bg-blue-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-in-right">
                <i data-lucide="check-circle" class="w-6 h-6"></i>
                <div>
                    <p class="font-bold">Đăng ký thành công!</p>
                    <p class="text-sm text-blue-100">Đang chuyển đến giỏ hàng...</p>
                </div>
            </div>
        `);
        document.body.appendChild(toast);

        // Initialize icons for toast
        if (window.lucide) {
            window.lucide.createIcons();
        }

        close();

        // Redirect to cart immediately after modal closes
        setTimeout(() => {
            console.log('Redirecting to cart...');
            window.location.hash = '#/cart';

            // Remove toast after redirect
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 500);
    }

    function showError(fieldId, message) {
        const errorElement = modalWrapper.querySelector(`#${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }

        const field = modalWrapper.querySelector(`#${fieldId}`);
        if (field) {
            field.classList.add('border-red-500');
            field.addEventListener('input', () => {
                field.classList.remove('border-red-500');
                errorElement?.classList.add('hidden');
            }, { once: true });
        }
    }

    function open(auctionItem = null) {
        isOpen = true;
        currentStep = 1;
        userType = null;
        currentAuctionItem = auctionItem; // Store for later deposit payment
        container.classList.remove('hidden');
        renderStep1();

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
            currentStep = 1;
            userType = null;
            currentAuctionItem = null; // Clear auction item

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
