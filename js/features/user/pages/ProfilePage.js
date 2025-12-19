/**
 * Profile Page - VPA Official Style
 * User account information with sidebar navigation
 */

import { getUserProfile, updateUserProfile, uploadAvatar, getUserSettings, updateUserSettings, getProfileCompleteness } from '../utils/userProfile.js';
import { getAuthState } from '../utils/auth.js';
import { createElement } from '../../../shared/utils/dom.js';
import { ProfileSidebar } from '../components/ProfileSidebar.js';
import toast from '../../../shared/utils/toast.js';
import { getProvinces, getDistricts, getWards } from '../../../data/vietnamAddress.js';

export function ProfilePage() {
    const container = createElement('div', { className: 'min-h-screen bg-gray-50' });
    const authState = getAuthState();
    const profile = getUserProfile() || {};
    const settings = getUserSettings();

    // Banner Header  
    const banner = createElement('div', {
        className: 'relative h-80 bg-cover bg-center overflow-hidden'
    });
    banner.style.backgroundImage = 'url("images/banners/profile.png")';
    banner.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div class="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">
                Thông tin tài khoản
            </h1>
            <p class="text-xl text-white/90 max-w-2xl" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5)">
                Quản lý thông tin cá nhân và cài đặt tài khoản của bạn
            </p>
        </div>
    `;
    container.appendChild(banner);

    // Content container with sidebar
    const contentContainer = createElement('div', { className: 'flex' });

    // Add ProfileSidebar to contentContainer
    const sidebar = ProfileSidebar({
        activePage: 'profile',
        onNavigate: (page) => {
            window.location.hash = `#/${page}`;
        }
    });
    contentContainer.appendChild(sidebar);

    // Main content area
    const mainContent = createElement('div', { className: 'flex-1' });

    // Header section with completeness indicator
    const completeness = getProfileCompleteness();
    const completenessColor = completeness.score < 50 ? 'red' : completeness.score < 80 ? 'yellow' : 'green';
    const completenessText = completeness.isComplete ? 'Hoàn tất' : `${completeness.score}% hoàn thành`;

    const header = createElement('div', { className: 'bg-white border-b border-gray-200 px-8 py-6' });
    header.innerHTML = `
        <div>
            <h1 class="text-3xl font-bold text-gray-900">Thông tin tài khoản</h1>
            <p class="text-gray-600 mt-1">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
        </div>
    `;
    mainContent.appendChild(header);

    // Content section
    const content = createElement('div', { className: 'p-8' });
    content.innerHTML = `
        <div class="max-w-4xl">
            <!-- Profile Card -->
            <div class="bg-white rounded-lg border border-gray-200 p-8 mb-6">
                <div class="flex items-start gap-6 mb-8">
                    <!-- Avatar -->
                    <div class="flex-shrink-0">
                        <div class="relative">
                            <img id="avatar-preview" src="${profile.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(authState.user?.fullName || authState.user?.email || 'User')}" 
                                 alt="Avatar" class="w-24 h-24 rounded-full object-cover border-4 border-gray-200">
                            <label for="avatar-upload" class="absolute bottom-0 right-0 bg-[#AA8C3C] text-white p-2 rounded-full cursor-pointer hover:bg-[#8B7530] transition-colors">
                                <i data-lucide="camera" class="w-4 h-4"></i>
                            </label>
                            <input type="file" id="avatar-upload" accept="image/*" class="hidden">
                        </div>
                    </div>
                    
                    <!-- Basic Info -->
                    <div class="flex-1">
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">${profile.fullName || authState.user?.fullName || 'Chưa cập nhật'}</h2>
                        <p class="text-gray-600 mb-4">${authState.user?.email}</p>
                        <div class="flex gap-2">
                            <span class="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-semibold">Đã xác thực</span>
                        </div>
                    </div>
                </div>
                
                <!-- Edit Form -->
                <form id="profile-form" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <label class="block text-sm font-semibold text-gray-900 mb-2">
                            Họ và tên <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="fullName" value="${profile.fullName || ''}" 
                               class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                               placeholder="">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-900 mb-2">
                            Số điện thoại <span class="text-red-500">*</span>
                        </label>
                        <input type="tel" name="phone" value="${profile.phone || ''}" 
                               class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                               placeholder="">
                    </div>
                </div>
                
                <!-- Address Section with Cascade Dropdowns -->
                <div>
                    <label class="block text-sm font-semibold text-gray-900 mb-2">
                        Địa chỉ <span class="text-red-500">*</span>
                    </label>
                    
                    <!-- Province -->
                    <div class="relative mb-3">
                        <i data-lucide="map-pin" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                        <select 
                            id="province"
                            name="province"
                            required
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white"
                        >
                            <option value="">Chọn Tỉnh/Thành phố</option>
                        </select>
                        <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"></i>
                    </div>
                    
                    <!-- District -->
                    <div class="relative mb-3">
                        <i data-lucide="map" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                        <select 
                            id="district"
                            name="district"
                            required
                            disabled
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">Chọn Quận/Huyện</option>
                        </select>
                        <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"></i>
                    </div>
                    
                    <!-- Ward -->
                    <div class="relative mb-3">
                        <i data-lucide="home" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                        <select 
                            id="ward"
                            name="ward"
                            required
                            disabled
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">Chọn Phường/Xã</option>
                        </select>
                        <i data-lucide="chevron-down" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"></i>
                    </div>
                    
                    <!-- Specific Address -->
                    <div class="relative">
                        <i data-lucide="navigation" class="absolute left-3 top-3 w-5 h-5 text-gray-400"></i>
                        <input 
                            type="text"
                            id="specificAddress"
                            name="specificAddress"
                            required
                            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder=""
                        />
                    </div>
                </div>
                    
                    <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button type="button" id="cancel-btn" class="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            Hủy
                        </button>
                        <button type="submit" class="px-6 py-2.5 bg-[#AA8C3C] text-white rounded-lg font-semibold hover:bg-[#8B7530] transition-colors">
                            Lưu Thay Đổi
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- Settings Card -->
            <div class="bg-white rounded-lg border border-gray-200 p-8">
                <h3 class="text-xl font-bold text-gray-900 mb-6">Cài Đặt</h3>
                <div class="space-y-6">
                    <div class="flex items-center justify-between pb-6 border-b border-gray-200">
                        <div>
                            <p class="font-semibold text-gray-900">Thông báo</p>
                            <p class="text-sm text-gray-600 mt-1">Nhận thông báo về đấu giá</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="notifications-toggle" ${settings.notifications ? 'checked' : ''} class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AA8C3C]"></div>
                        </label>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-semibold text-gray-900">Email cập nhật</p>
                            <p class="text-sm text-gray-600 mt-1">Nhận email về hoạt động tài khoản</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="email-toggle" ${settings.emailUpdates ? 'checked' : ''} class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#AA8C3C]"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `;

    mainContent.appendChild(content);

    // Avatar upload handler
    const avatarUpload = content.querySelector('#avatar-upload');
    const avatarPreview = content.querySelector('#avatar-preview');

    avatarUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await uploadAvatar(file);
                avatarPreview.src = base64;
                toast.success('Đã cập nhật ảnh đại diện');
            } catch (error) {
                toast.error(error.message);
            }
        }
    });

    // Profile form submission
    const form = content.querySelector('#profile-form');

    // ========== Address Cascade Dropdown Logic ==========
    const provinceSelect = content.querySelector('#province');
    const districtSelect = content.querySelector('#district');
    const wardSelect = content.querySelector('#ward');
    const specificAddressInput = content.querySelector('#specificAddress');

    console.log('🔍 Debug - Elements found:', {
        provinceSelect,
        districtSelect,
        wardSelect,
        specificAddressInput
    });

    if (!provinceSelect) {
        console.error('❌ Province select not found!');
        return container;
    }

    // Populate provinces
    try {
        const provinces = getProvinces();
        console.log('📍 Loaded provinces:', provinces.length);

        provinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province; // province is already a string name
            option.textContent = province;
            provinceSelect.appendChild(option);
        });

        console.log('✅ Provinces populated, total options:', provinceSelect.options.length);
    } catch (error) {
        console.error('❌ Error loading provinces:', error);
        toast.error('Không thể tải danh sách tỉnh/thành phố');
    }

    // Parse existing address to populate selects
    if (profile.address) {
        // Try to parse existing address (assuming format: "specific, ward, district, province")
        const parts = profile.address.split(',').map(p => p.trim());
        if (parts.length >= 4) {
            const [specific, ward, district, province] = parts;

            // Find and select province
            const provinceOption = Array.from(provinceSelect.options).find(opt =>
                opt.textContent.toLowerCase().includes(province.toLowerCase())
            );
            if (provinceOption) {
                provinceSelect.value = provinceOption.value;
                provinceSelect.dispatchEvent(new Event('change'));

                // Wait for districts to load, then select
                setTimeout(() => {
                    const districtOption = Array.from(districtSelect.options).find(opt =>
                        opt.textContent.toLowerCase().includes(district.toLowerCase())
                    );
                    if (districtOption) {
                        districtSelect.value = districtOption.value;
                        districtSelect.dispatchEvent(new Event('change'));

                        // Wait for wards to load, then select
                        setTimeout(() => {
                            const wardOption = Array.from(wardSelect.options).find(opt =>
                                opt.textContent.toLowerCase().includes(ward.toLowerCase())
                            );
                            if (wardOption) {
                                wardSelect.value = wardOption.value;
                            }
                            specificAddressInput.value = specific;
                        }, 100);
                    }
                }, 100);
            }
        } else {
            // If can't parse, just put entire address in specific field
            specificAddressInput.value = profile.address;
        }
    }

    // Province change handler
    provinceSelect.addEventListener('change', () => {
        const provinceName = provinceSelect.value;

        // Reset district and ward
        districtSelect.innerHTML = '<option value="">Chọn Quận/Huyện</option>';
        wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';
        wardSelect.disabled = true;

        if (provinceName) {
            const districts = getDistricts(provinceName);
            districts.forEach(districtName => {
                const option = document.createElement('option');
                option.value = districtName;
                option.textContent = districtName;
                districtSelect.appendChild(option);
            });
            districtSelect.disabled = false;
        } else {
            districtSelect.disabled = true;
        }
    });

    // District change handler
    districtSelect.addEventListener('change', () => {
        const provinceName = provinceSelect.value;
        const districtName = districtSelect.value;

        // Reset ward
        wardSelect.innerHTML = '<option value="">Chọn Phường/Xã</option>';

        if (districtName) {
            const wards = getWards(provinceName, districtName);
            wards.forEach(wardName => {
                const option = document.createElement('option');
                option.value = wardName;
                option.textContent = wardName;
                wardSelect.appendChild(option);
            });
            wardSelect.disabled = false;
        } else {
            wardSelect.disabled = true;
        }
    });



    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        // Build full address from cascade selections
        const province = provinceSelect.options[provinceSelect.selectedIndex]?.textContent || '';
        const district = districtSelect.options[districtSelect.selectedIndex]?.textContent || '';
        const ward = wardSelect.options[wardSelect.selectedIndex]?.textContent || '';
        const specificAddress = formData.get('specificAddress');

        const fullAddress = `${specificAddress}, ${ward}, ${district}, ${province}`;

        const updates = {
            fullName: formData.get('fullName'),
            phone: formData.get('phone'),
            address: fullAddress,
            city: province // Store province as city for compatibility
        };

        const success = updateUserProfile(updates);
        if (success) {
            toast.success('Đã cập nhật thông tin');
        }
    });

    // Settings toggles
    content.querySelector('#notifications-toggle').addEventListener('change', (e) => {
        updateUserSettings({ notifications: e.target.checked });
        // Silent update - no toast needed
    });

    content.querySelector('#email-toggle').addEventListener('change', (e) => {
        updateUserSettings({ emailUpdates: e.target.checked });
        // Silent update - no toast needed
    });

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    contentContainer.appendChild(mainContent);
    container.appendChild(contentContainer);

    return container;
}

export default ProfilePage;
