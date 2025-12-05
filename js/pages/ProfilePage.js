/**
 * User Profile Page
 * Display and edit user profile information
 */

import { getUserProfile, updateUserProfile, uploadAvatar, getUserSettings, updateUserSettings } from '../utils/userProfile.js';
import { getAuthState } from '../utils/auth.js';
import { createElement } from '../utils/dom.js';
import toast from '../utils/toast.js';

export function ProfilePage() {
    const container = createElement('div', { className: 'container mx-auto px-4 py-8' });
    const authState = getAuthState();
    const profile = getUserProfile() || {};
    const settings = getUserSettings();

    container.innerHTML = `
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Thông Tin Cá Nhân</h1>
                <p class="text-gray-600 dark:text-gray-400">Quản lý thông tin tài khoản của bạn</p>
            </div>
            
            <!-- Profile Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div class="flex items-start gap-6 mb-6">
                    <!-- Avatar -->
                    <div class="flex-shrink-0">
                        <div class="relative">
                            <img id="avatar-preview" src="${profile.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(authState.user?.fullName || authState.user?.email || 'User')}" 
                                 alt="Avatar" class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700">
                            <label for="avatar-upload" class="absolute bottom-0 right-0 bg-[#be1e2d] text-white p-2 rounded-full cursor-pointer hover:bg-[#a01a26] transition-colors">
                                <i data-lucide="camera" class="w-4 h-4"></i>
                            </label>
                            <input type="file" id="avatar-upload" accept="image/*" class="hidden">
                        </div>
                    </div>
                    
                    <!-- Basic Info -->
                    <div class="flex-1">
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">${profile.fullName || authState.user?.fullName || 'Chưa cập nhật'}</h2>
                        <p class="text-gray-600 dark:text-gray-400 mb-4">${authState.user?.email}</p>
                        <div class="flex gap-2">
                            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">Đã xác thực</span>
                        </div>
                    </div>
                </div>
                
                <!-- Edit Form -->
                <form id="profile-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Họ và tên</label>
                            <input type="text" name="fullName" value="${profile.fullName || ''}" 
                                   class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-[#be1e2d] dark:bg-gray-700 dark:text-white">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Số điện thoại</label>
                            <input type="tel" name="phone" value="${profile.phone || ''}" 
                                   class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-[#be1e2d] dark:bg-gray-700 dark:text-white">
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Địa chỉ</label>
                        <input type="text" name="address" value="${profile.address || ''}" 
                               class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-[#be1e2d] dark:bg-gray-700 dark:text-white">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Thành phố</label>
                        <input type="text" name="city" value="${profile.city || ''}" 
                               class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-[#be1e2d] dark:bg-gray-700 dark:text-white">
                    </div>
                    
                    <div class="flex justify-end gap-3 pt-4">
                        <button type="button" id="cancel-btn" class="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            Hủy
                        </button>
                        <button type="submit" class="px-6 py-2 bg-gradient-to-r from-[#be1e2d] to-[#8b1818] text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                            Lưu Thay Đổi
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- Settings Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Cài Đặt</h3>
                <div class="space-y-4">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-semibold text-gray-900 dark:text-white">Thông báo</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Nhận thông báo về đấu giá</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="notifications-toggle" ${settings.notifications ? 'checked' : ''} class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#be1e2d]"></div>
                        </label>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="font-semibold text-gray-900 dark:text-white">Email cập nhật</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Nhận email về hoạt động tài khoản</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="email-toggle" ${settings.emailUpdates ? 'checked' : ''} class="sr-only peer">
                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#be1e2d]"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Avatar upload handler
    const avatarUpload = container.querySelector('#avatar-upload');
    const avatarPreview = container.querySelector('#avatar-preview');

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

    // Form submit handler
    const form = container.querySelector('#profile-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const updates = {
            fullName: formData.get('fullName'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city')
        };

        updateUserProfile(updates);
        toast.success('Đã cập nhật thông tin cá nhân');
    });

    // Settings toggles
    container.querySelector('#notifications-toggle').addEventListener('change', (e) => {
        updateUserSettings({ notifications: e.target.checked });
        toast.info('Đã cập nhật cài đặt');
    });

    container.querySelector('#email-toggle').addEventListener('change', (e) => {
        updateUserSettings({ emailUpdates: e.target.checked });
        toast.info('Đã cập nhật cài đặt');
    });

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

export default ProfilePage;
