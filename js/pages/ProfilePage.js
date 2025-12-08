/**
 * Profile Page - VPA Official Style
 * User account information with sidebar navigation
 */

import { getUserProfile, updateUserProfile, uploadAvatar, getUserSettings, updateUserSettings } from '../utils/userProfile.js';
import { getAuthState } from '../utils/auth.js';
import { createElement } from '../utils/dom.js';
import { ProfileSidebar } from '../components/Shared/ProfileSidebar.js';
import toast from '../utils/toast.js';

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

    // Header section
    const header = createElement('div', { className: 'bg-white border-b border-gray-200 px-8 py-6' });
    header.innerHTML = `
        <h1 class="text-3xl font-bold text-gray-900">Thông tin tài khoản</h1>
        <p class="text-gray-600 mt-1">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
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
                            <label class="block text-sm font-semibold text-gray-900 mb-2">Họ và tên</label>
                            <input type="text" name="fullName" value="${profile.fullName || ''}" 
                                   class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-900 mb-2">Số điện thoại</label>
                            <input type="tel" name="phone" value="${profile.phone || ''}" 
                                   class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-900 mb-2">Địa chỉ</label>
                        <input type="text" name="address" value="${profile.address || ''}" 
                               class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold text-gray-900 mb-2">Thành phố</label>
                        <input type="text" name="city" value="${profile.city || ''}" 
                               class="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
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

    // Form submit handler
    const form = content.querySelector('#profile-form');
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
    content.querySelector('#notifications-toggle').addEventListener('change', (e) => {
        updateUserSettings({ notifications: e.target.checked });
        toast.info('Đã cập nhật cài đặt');
    });

    content.querySelector('#email-toggle').addEventListener('change', (e) => {
        updateUserSettings({ emailUpdates: e.target.checked });
        toast.info('Đã cập nhật cài đặt');
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
