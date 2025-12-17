/**
 * Profile Page - VPA Official Style
 * User account information with sidebar navigation
 */

import { getUserProfile, updateUserProfile, uploadAvatar, getUserSettings, updateUserSettings, getProfileCompleteness } from '../../utils/userProfile.js';
import { getAuthState } from '../../utils/auth.js';
import { createElement } from '../../utils/dom.js';
import { ProfileSidebar } from '../shared/ProfileSidebar.js';
import createFormAutoSave from '../../utils/formAutoSave.js';
import toast from '../../utils/toast.js';

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
        <div class="flex items-start justify-between">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">Thông tin tài khoản</h1>
                <p class="text-gray-600 mt-1">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
            </div>
            <div class="flex flex-col items-end">
                <div class="flex items-center gap-3 mb-2">
                    <span class="text-sm font-medium text-gray-600">Độ hoàn thiện hồ sơ</span>
                    <div class="relative w-16 h-16">
                        <svg class="transform -rotate-90" width="64" height="64">
                            <circle cx="32" cy="32" r="28" stroke="#e5e7eb" stroke-width="6" fill="none"/>
                            <circle cx="32" cy="32" r="28" 
                                stroke="${completenessColor === 'green' ? '#10b981' : completenessColor === 'yellow' ? '#f59e0b' : '#ef4444'}" 
                                stroke-width="6" 
                                fill="none"
                                stroke-dasharray="${Math.round(2 * Math.PI * 28)}"
                                stroke-dashoffset="${Math.round(2 * Math.PI * 28 * (1 - completeness.score / 100))}"
                                stroke-linecap="round"
                                class="transition-all duration-1000"/>
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-sm font-bold text-gray-900">${completeness.score}%</span>
                        </div>
                    </div>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-semibold 
                    ${completeness.isComplete ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}">
                    ${completenessText}
                </span>
                ${!completeness.isComplete ? `
                    <p class="text-xs text-gray-500 mt-2 text-right">Thiếu: ${completeness.missing.length} trường</p>
                ` : ''}
            </div>
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
                            <label for="avatar-upload" class="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
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
                               placeholder="Nhập họ và tên đầy đủ">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-900 mb-2">
                            Số điện thoại <span class="text-red-500">*</span>
                        </label>
                        <input type="tel" name="phone" value="${profile.phone || ''}" 
                               class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                               placeholder="VD: 0912345678">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-900 mb-2">
                        Địa chỉ <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="address" value="${profile.address || ''}" 
                           class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                           placeholder="Số nhà, tên đường, phường/xã">
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-900 mb-2">
                        Thành phố <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="city" value="${profile.city || ''}" 
                           class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                           placeholder="VD: Hồ Chí Minh, Hà Nội">
                </div>
                    
                    <div class="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button type="button" id="cancel-btn" class="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            Hủy
                        </button>
                        <button type="submit" class="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
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
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-semibold text-gray-900">Email cập nhật</p>
                            <p class="text-sm text-gray-600 mt-1">Nhận email về hoạt động tài khoản</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="email-toggle" ${settings.emailUpdates ? 'checked' : ''} class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
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

    // Initialize auto-save
    const autoSave = createFormAutoSave(form, 'vpa-profile-draft', {
        debounceMs: 1500,
        onSave: () => {
            // Show subtle save indicator
            const saveIndicator = content.querySelector('#save-indicator');
            if (saveIndicator) {
                saveIndicator.textContent = '✓ Đã lưu bản nháp';
                saveIndicator.className = 'text-xs text-green-600 mt-1';
            }
        },
        onRestore: (data) => {
            // Silent restore - no need for toast
        }
    });

    // Try to restore draft on load
    autoSave.restore();

    // Add save indicator below submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        const indicator = createElement('div', {
            id: 'save-indicator',
            className: 'text-xs text-gray-400 mt-1 text-center'
        });
        indicator.textContent = 'Tự động lưu khi thay đổi';
        submitBtn.parentElement.appendChild(indicator);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const updates = {
            fullName: formData.get('fullName'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city')
        };

        const success = updateUserProfile(updates);
        if (success) {
            // Clear draft after successful save
            autoSave.clear();
            const saveIndicator = content.querySelector('#save-indicator');
            if (saveIndicator) {
                saveIndicator.textContent = '✓ Đã lưu thành công';
                saveIndicator.className = 'text-xs text-green-600 mt-1';
            }
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
