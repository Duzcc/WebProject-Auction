/**
 * AboutPage - Trang giới thiệu
 * All About components integrated inline for optimized code structure
 */

import { createElement, createFromHTML } from '../utils/dom.js';

// =============================
// INTERNAL COMPONENTS
// =============================

/**
 * PageBanner Component - Banner for page headers
 */
function PageBanner({ title, subtitle, backgroundImage }) {
    const html = `
        <div class="relative bg-gradient-to-br from-blue-800 via-blue-700 to-blue-900 text-white py-16 md:py-24 overflow-hidden">
            <!-- Background Image Overlay -->
            ${backgroundImage ? `
                <div class="absolute inset-0 bg-cover bg-center opacity-20" style="background-image: url('${backgroundImage}');"></div>
            ` : ''}
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
            
            <!-- Content -->
            <div class="container mx-auto px-4 relative z-10">
                <div class="max-w-2xl">
                    ${subtitle ? `<p class="text-blue-200 text-sm md:text-base font-semibold uppercase tracking-wider mb-2">${subtitle}</p>` : ''}
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-4">${title}</h1>
                    <div class="w-24 h-1 bg-blue-400 rounded-full"></div>
                </div>
            </div>

            <!-- Decorative Elements -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
            <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
        </div>
    `;

    return createFromHTML(html);
}

/**
 * AboutIntro Component - Introduction text about VPA
 */
function AboutIntro() {
    const html = `
        <div class="py-12 md:py-16">
            <h1 class="text-4xl md:text-5xl font-black text-gray-900 mb-8 text-center">
                Lời giới thiệu
            </h1>
            
            <div class="max-w-4xl mx-auto text-center space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                    Công ty Đấu giá hợp danh VPA xin gửi lời chào trân trọng nhất đến quý khách hàng.
                </p>
                <p>
                    Công ty Đấu giá hợp danh Việt Nam (Vietnam Partnerships Auction) - là một Tổ chức hoạt động chuyên nghiệp trong lĩnh vực dịch vụ tư vấn, tổ chức đấu giá tài sản, quyền tài sản, vật tư, thiết bị, hàng hóa và các dịch vụ khác liên quan đến đấu giá tài sản. Công ty Đấu giá hợp danh Việt Nam được nhiều Cơ quan, Tập đoàn, doanh nghiệp, đơn vị, tổ chức tin cậy, ký hợp đồng bán đấu giá tài sản, trong đó nhiều hợp đồng với tài sản có giá trị lớn, có tính chất phức tạp. Chúng tôi luôn nỗ lực không ngừng nghỉ, với mục tiêu luôn là tổ chức đấu giá tài sản thuộc hàng đầu tại Việt Nam. "Chuyên nghiệp, tin cậy, đặt quyền lợi của khách hàng lên trên quyền lợi của Công ty" là phương châm hoạt động của chúng tôi khi hợp tác cùng Quý khách hàng. Chúng tôi cam kết mang đến cho Quý khách hàng dịch vụ chuyên nghiệp, chất lượng và hiệu quả tối ưu trong lĩnh vực đấu giá tài sản.
                </p>
            </div>
        </div>
    `;

    return createFromHTML(html);
}

/**
 * VpaStats Component - Key statistics about VPA
 */
function VpaStats() {
    const html = `
        <div class="bg-gray-50 py-12">
            <div class="container mx-auto px-4">
                <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Những con số nổi bật</h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    
                    <!-- Stat 1 -->
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-5xl font-black text-[#2563EB]">1.000 tỷ+</p>
                        <p class="text-gray-600">Giá trị tài sản đã đấu giá</p>
                    </div>

                    <!-- Stat 2 -->
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-5xl font-black text-[#2563EB]">500.000+</p>
                        <p class="text-gray-600">Biển số công bố đấu giá</p>
                    </div>
                    
                    <!-- Stat 3 -->
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-5xl font-black text-[#2563EB]">17.000+</p>
                        <p class="text-gray-600">Cuộc đấu giá đã diễn ra</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    return createFromHTML(html);
}

/**
 * PolicySections Component - Policy links and auction guide
 */
function PolicySections() {
    const html = `
        <div class="py-12 border-t border-gray-200">
            <div class="max-w-5xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 text-center mb-10">
                    <!-- Policy Card 1 -->
                    <div class="p-4 md:p-6 border-b border-gray-300 md:border-r md:border-b-0 last:border-r-0">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Chính sách bảo mật</h3>
                        <a href="#" class="text-[#2563EB] hover:underline transition-colors">
                            Chính sách bảo mật
                        </a>
                    </div>

                    <!-- Policy Card 2 -->
                    <div class="p-4 md:p-6 border-b border-gray-300 md:border-r md:border-b-0 last:border-r-0">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Điều khoản sử dụng</h3>
                        <a href="#" class="text-[#2563EB] hover:underline transition-colors">
                            Điều khoản sử dụng
                        </a>
                    </div>

                    <!-- Policy Card 3 -->
                    <div class="p-4 md:p-6 border-b border-gray-300 md:border-r md:border-b-0 last:border-r-0">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Quy chế hoạt động</h3>
                        <a href="#" class="text-[#2563EB] hover:underline transition-colors">
                            Quy chế hoạt động
                        </a>
                    </div>
                </div>

                <div class="border-t border-gray-300 pt-6 mt-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">Hướng dẫn đấu giá</h2>
                    <p class="text-center text-[#2563EB] hover:underline cursor-pointer">Hướng dẫn đấu giá</p>
                </div>
            </div>
        </div>
    `;

    return createFromHTML(html);
}

// =============================
// MAIN PAGE EXPORT
// =============================

export function AboutPage() {
    const container = createElement('div', { className: 'bg-white min-h-[70vh] pb-16' });

    // Add banner
    container.appendChild(PageBanner({
        title: 'Giới thiệu',
        subtitle: 'Về chúng tôi',
        backgroundImage: '/images/banners/about_banner.png'
    }));

    const innerContainer = createElement('div', { className: 'container mx-auto px-4 py-10' });

    innerContainer.appendChild(AboutIntro());
    innerContainer.appendChild(VpaStats());
    innerContainer.appendChild(PolicySections());

    container.appendChild(innerContainer);
    return container;
}
