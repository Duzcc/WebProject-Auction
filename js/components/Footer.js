// Footer component - VPA Official Style
import { createFromHTML, initIcons } from '../utils/dom.js';

/**
 * Create Footer component with VPA official design
 * @returns {HTMLElement} Footer element
 */
export function Footer() {
    const html = `
        <footer class="bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#312E81] text-white pt-16 pb-8">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <!-- Company Info Box - Left Side -->
                    <div class="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
                        <!-- Logo -->
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center transform rotate-45 shadow-lg">
                                <div class="w-9 h-9 bg-white/20 transform -rotate-45" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%)"></div>
                            </div>
                            <h2 class="text-5xl font-bold text-white">VPA</h2>
                        </div>
                        
                        <h3 class="text-2xl font-bold mb-8 text-white">Công ty Đấu giá Hợp danh Việt Nam</h3>
                        
                        <!-- Contact Information -->
                        <div class="space-y-5 text-gray-100">
                            <div class="flex items-start gap-3">
                                <div class="mt-1 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                                    <i data-lucide="map-pin" class="w-5 h-5 text-white"></i>
                                </div>
                                <div class="text-sm">
                                    <span class="text-yellow-300 font-bold block mb-1">Trụ sở chính:</span>
                                    <span class="text-gray-200">NO2-T4.03, tầng 4 tòa nhà NO2 - TNL Plaza Goldseason, số 47 Nguyễn Tuân, phường Thanh Xuân Trung, thành phố Hà Nội</span>
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-3">
                                <div class="w-10 h-10 flex-shrink-0"></div>
                                <div class="text-sm">
                                    <span class="text-yellow-300 font-bold block mb-1">Chi nhánh HCM:</span>
                                    <span class="text-gray-200">Số 466 Hai Bà Trưng, phường Tân Định, Thành phố Hồ Chí Minh</span>
                                </div>
                            </div>

                            <div class="flex items-start gap-3">
                                <div class="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                                    <i data-lucide="phone" class="w-5 h-5 text-white"></i>
                                </div>
                                <div class="text-sm">
                                    <span class="text-yellow-300 font-bold">Hotline CSKH:</span>
                                    <span class="text-white font-bold ml-1">1900.0555.15</span>
                                    <div class="text-gray-300 mt-1">Các số gọi ra: 024.9995.5515, 024.9996.8888 hoặc các đầu số tên "DAU GIA VN"</div>
                                </div>
                            </div>

                            <div class="flex items-start gap-3">
                                <div class="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                                    <i data-lucide="mail" class="w-5 h-5 text-white"></i>
                                </div>
                                <div class="text-sm space-y-1">
                                    <div>
                                        <span class="text-yellow-300 font-bold">Đấu giá biển số:</span>
                                        <span class="text-gray-200 ml-1">dgbs@vpa.com.vn</span>
                                    </div>
                                    <div>
                                        <span class="text-yellow-300 font-bold">Đấu giá tài sản:</span>
                                        <span class="text-gray-200 ml-1">dgts@vpa.com.vn</span>
                                    </div>
                                    <div>
                                        <span class="text-yellow-300 font-bold">Liên hệ hợp tác:</span>
                                        <span class="text-gray-200 ml-1">info@vpa.com.vn</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Legal Info -->
                        <div class="mt-8 pt-6 border-t border-white/10 text-sm text-gray-300 space-y-1">
                            <p>Đại diện: <span class="font-semibold">Bà Lâm Thị Mai Anh</span> - Chức vụ: <span class="font-semibold">Giám Đốc</span></p>
                            <p>Giấy chứng nhận ĐKHĐ: <span class="font-semibold">41/TP-ĐKHĐ</span> do Sở Tư pháp Hà Nội cấp ngày <span class="font-semibold">21/01/2019</span></p>
                        </div>
                    </div>

                    <!-- Social & Policies Box - Right Side -->
                    <div class="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl flex flex-col">
                        <!-- Social Media -->
                        <div class="mb-10">
                            <h3 class="text-xl font-bold mb-6 text-white">Theo dõi chúng tôi trên</h3>
                            <div class="flex gap-4">
                                <a href="#" class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-110 shadow-lg">
                                    <i data-lucide="facebook" class="w-7 h-7"></i>
                                </a>
                                <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-110 font-bold text-sm flex items-center justify-center shadow-lg">
                                    Zalo
                                </a>
                            </div>
                        </div>

                        <!-- Registration Badge -->
                        <div class="mb-10">
                            <div class="inline-block">
                                <div class="bg-white rounded-xl p-3 shadow-2xl border-2 border-red-600">
                                    <div class="flex items-center gap-4">
                                        <div class="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <i data-lucide="shield-check" class="w-8 h-8"></i>
                                        </div>
                                        <div class="text-red-600 font-bold leading-tight">
                                            <div class="text-xs uppercase tracking-wide">Đã đăng ký</div>
                                            <div class="text-lg uppercase">Bộ Công Thương</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Policies -->
                        <div>
                            <h3 class="text-xl font-bold mb-6 text-white">Chính sách</h3>
                            <ul class="space-y-3">
                                <li>
                                    <a href="#" class="text-gray-200 hover:text-white transition-colors flex items-center gap-2 group">
                                        <i data-lucide="chevron-right" class="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform"></i>
                                        <span>Chính sách bảo vệ dữ liệu cá nhân</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-200 hover:text-white transition-colors flex items-center gap-2 group">
                                        <i data-lucide="chevron-right" class="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform"></i>
                                        <span>Quy chế đấu giá tài sản</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-200 hover:text-white transition-colors flex items-center gap-2 group">
                                        <i data-lucide="chevron-right" class="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform"></i>
                                        <span>Điều khoản và điều kiện</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-200 hover:text-white transition-colors flex items-center gap-2 group">
                                        <i data-lucide="chevron-right" class="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform"></i>
                                        <span>Hướng dẫn thanh toán</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="text-gray-200 hover:text-white transition-colors flex items-center gap-2 group">
                                        <i data-lucide="chevron-right" class="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform"></i>
                                        <span>Câu hỏi thường gặp (FAQ)</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Copyright Footer -->
                <div class="border-t border-white/20 mt-12 pt-8 text-center text-sm text-gray-300">
                    <p class="mb-3">Trang thông tin điện tử đấu giá trực tuyến <span class="font-bold text-white">vpa.com.vn</span> đã được Sở Tư pháp thành phố Hà Nội phê duyệt đủ điều kiện thực hiện hình thức đấu giá trực tuyến theo <span class="font-semibold">Quyết định số 226/QĐ-STP ngày 16/3/2023</span></p>
                    <p class="text-gray-400">Bản quyền thuộc về <span class="font-bold text-white">VPA©2023</span></p>
                </div>
            </div>
        </footer>
    `;

    const footer = createFromHTML(html);

    // Initialize Lucide icons
    initIcons(footer);

    return footer;
}

export default Footer;
