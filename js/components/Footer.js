// Footer component
import { createFromHTML, initIcons } from '../utils/dom.js';

/**
 * Create Footer component
 * @returns {HTMLElement} Footer element
 */
export function Footer() {
    const html = `
        <footer class="bg-[#2a0a0a] text-white pt-16 pb-8 border-t-4 border-[#be1e2d]">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
                    
                    <!-- Company Info -->
                    <div class="lg:col-span-7">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-red-600 rounded-lg flex items-center justify-center transform rotate-45">
                                <div class="w-7 h-7 bg-[#2a0a0a] transform -rotate-45" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%)"></div>
                            </div>
                            <h2 class="text-4xl font-bold text-[#be1e2d]">VPA</h2>
                        </div>
                        
                        <h3 class="text-xl font-bold mb-6">Công ty Đấu giá Hợp danh Việt Nam</h3>
                        
                        <div class="space-y-4 text-sm text-gray-300">
                            <div class="flex items-start gap-3">
                                <div class="mt-1 w-8 h-8 rounded-full bg-[#be1e2d]/20 flex items-center justify-center text-[#fbb03b] flex-shrink-0">
                                    <i data-lucide="map-pin" class="w-4 h-4"></i>
                                </div>
                                <div>
                                    <span class="text-[#fbb03b] font-bold block mb-1">Trụ sở chính:</span>
                                    NO2-T4.03, tầng 4 tòa nhà NO2 - TNL Plaza Goldseason, số 47 Nguyễn Tuân, phường Thanh Xuân Trung, quận Thanh Xuân, thành phố Hà Nội
                                </div>
                            </div>
                            
                            <div class="flex items-start gap-3">
                                <div class="w-8 h-8 rounded-full bg-transparent flex-shrink-0"></div>
                                <div>
                                    <span class="text-[#fbb03b] font-bold block mb-1">Chi nhánh HCM:</span>
                                    Số 466 Hai Bà Trưng, phường Tân Định, Thành phố Hồ Chí Minh
                                </div>
                            </div>

                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-[#be1e2d]/20 flex items-center justify-center text-[#fbb03b] flex-shrink-0">
                                    <i data-lucide="phone" class="w-4 h-4"></i>
                                </div>
                                <div>
                                    <span class="text-[#fbb03b] font-bold">Hotline CSKH:</span> 1900.0555.15
                                </div>
                            </div>
                            <div class="pl-11 text-gray-400">
                                Các số gọi ra: 024.9995.5515, 024.9996.8888 hoặc các đầu số tên "DAU GIA VN".
                            </div>

                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-[#be1e2d]/20 flex items-center justify-center text-[#fbb03b] flex-shrink-0">
                                    <i data-lucide="mail" class="w-4 h-4"></i>
                                </div>
                                <div>
                                    <span class="text-[#fbb03b] font-bold">Đấu giá biển số:</span> dgbs@vpa.com.vn
                                </div>
                            </div>
                            <div class="pl-11">
                                <span class="text-[#fbb03b] font-bold">Đấu giá tài sản:</span> dgts@vpa.com.vn
                            </div>
                            <div class="pl-11">
                                <span class="text-[#fbb03b] font-bold">Liên hệ hợp tác:</span> info@vpa.com.vn
                            </div>
                        </div>

                        <div class="mt-8 text-sm text-gray-400">
                            <p>Đại diện: Bà Lâm Thị Mai Anh - Chức vụ: Giám Đốc</p>
                            <p>Giấy chứng nhận ĐKHĐ: 41/TP-ĐKHĐ do Sở Tư pháp Hà Nội cấp ngày 21/01/2019</p>
                        </div>
                    </div>

                    <!-- Social & Certs -->
                    <div class="lg:col-span-5 flex flex-col items-start lg:items-end">
                        <h3 class="text-lg font-bold mb-4">Theo dõi chúng tôi trên</h3>
                        <div class="flex gap-4 mb-8">
                            <a href="#" class="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">
                                <i data-lucide="facebook" class="w-6 h-6"></i>
                            </a>
                            <a href="#" class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition font-bold text-xs flex items-center justify-center w-10 h-10">
                                Zalo
                            </a>
                        </div>

                        <div class="mb-8 bg-white rounded p-1">
                            <div class="border border-red-500 flex items-center p-1 gap-2">
                                <div class="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">✓</div>
                                <div class="text-red-600 font-bold leading-tight text-xs uppercase">
                                    Đã đăng ký<br/>Bộ Công Thương
                                </div>
                            </div>
                        </div>

                        <div class="text-left w-full lg:text-right">
                            <h3 class="text-lg font-bold mb-4">Chính sách</h3>
                            <ul class="space-y-2 text-sm text-gray-300">
                                <li><a href="#" class="hover:text-white">• Chính sách bảo vệ dữ liệu cá nhân</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>Trang thông tin điện tử đấu giá trực tuyến vpa.com.vn đã được Sở Tư pháp thành phố Hà Nội phê duyệt đủ điều kiện thực hiện hình thức đấu giá trực tuyến theo Quyết định số 226/QĐ-STP ngày 16/3/2023</p>
                    <p class="mt-2 md:mt-0">Bản quyền thuộc về VPA@2023</p>
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
