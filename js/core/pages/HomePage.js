/**
 * Ultra-Premium HomePage
 * Inspired by Sotheby's, Christie's - World-class auction experience
 * All components integrated inline for optimized code structure
 */

import { createElement, createFromHTML, initIcons } from '../../shared/utils/dom.js';
import { AuctionRegistrationModal } from '../../features/auction-shared/components/AuctionRegistrationModal.js';

// =============================
// INTERNAL COMPONENTS
// =============================

/**
 * Hero Component - Main banner section
 */
function Hero({ registrationModal }) {
    const html = `
        <div class="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-[#8B7530] via-[#AA8C3C] to-[#7A6328] overflow-hidden">
            <!-- Background decoration -->
            <div class="absolute inset-0 bg-[url('https://picsum.photos/seed/bgpattern/1920/1080')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
            
            <!-- Animated gradient orbs -->
            <div class="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div class="absolute top-0 left-0 w-96 h-96 bg-[#C9A961] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div class="absolute bottom-0 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            
            <div class="container mx-auto px-4 h-full flex flex-col md:flex-row items-center relative z-10">
                <!-- Left Content -->
                <div class="w-full md:w-1/2 text-white pt-10 md:pt-0">
                    <div class="inline-block bg-white text-[#AA8C3C] px-4 py-1 rounded-full text-sm font-semibold mb-6 shadow-lg border-2 border-blue-200 backdrop-blur-sm">
                        🏆 Công ty Đấu giá Hợp danh Việt Nam
                    </div>
                    <h1 class="text-4xl md:text-6xl font-black mb-4 leading-tight">
                        <span class="block">Đấu giá</span>
                        <span class="block bg-gradient-to-r from-blue-200 to-blue-300 bg-clip-text text-transparent">Trực tuyến</span>
                    </h1>
                    <p class="text-lg md:text-xl text-blue-50 mb-8 max-w-lg">
                        Nền tảng đấu giá biển số uy tín, minh bạch và hiện đại nhất Việt Nam
                    </p>
                    <button id="hero-register-btn" class="bg-gradient-to-r from-[#AA8C3C] to-[#8B7530] hover:from-[#8B7530] hover:to-[#7A6328] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-2xl transform transition hover:scale-105 hover:shadow-[#AA8C3C]/50">
                        Bắt đầu ngay <i data-lucide="arrow-right" class="w-5 h-5"></i>
                    </button>
                </div>

                <!-- Right Content - Images/Banners -->
                <div class="w-full md:w-1/2 flex justify-center items-center h-full">
                    <div class="relative w-full max-w-lg">
                        <!-- Modern card design -->
                        <div class="bg-white/15 backdrop-blur-lg p-6 rounded-2xl border border-white/30 shadow-2xl transform hover:scale-105 transition duration-500">
                            <div class="flex flex-col items-center">
                                <div class="bg-gradient-to-r from-[#AA8C3C] to-[#C9A961] text-[#1a1a1a] font-black text-xl md:text-2xl px-6 py-2 rounded-full mb-4 shadow-lg uppercase tracking-wide">
                                    ⚡ Đấu giá HOT
                                </div>
                                <span class="text-white font-black text-3xl md:text-4xl drop-shadow-lg uppercase text-center mb-6">Rinh ngay biển đẹp</span>
                                <img 
                                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop" 
                                    alt="Auction Banner" 
                                    class="rounded-xl shadow-2xl w-full object-cover h-48 md:h-64 ring-4 ring-white/20"
                                />
                                <div class="mt-4 flex gap-3 w-full">
                                    <div class="flex-1 bg-blue-900/50 backdrop-blur-sm rounded-lg p-3 text-center">
                                        <div class="text-blue-300 font-bold text-2xl">1.000+</div>
                                        <div class="text-blue-100 text-xs">Biển số</div>
                                    </div>
                                    <div class="flex-1 bg-blue-900/50 backdrop-blur-sm rounded-lg p-3 text-center">
                                        <div class="text-blue-300 font-bold text-2xl">24/7</div>
                                        <div class="text-blue-100 text-xs">Hỗ trợ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom wave decoration -->
            <div class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
        </div>
    `;

    const element = createFromHTML(html);

    // Add event listener to register button
    const registerBtn = element.querySelector('#hero-register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            registrationModal.open();
        });
    }

    initIcons(element);
    return element;
}

/**
 * Services Component - Service cards section
 */
function Services({ onNavigate }) {
    const html = `
        <div class="bg-white py-16 md:py-20">
            <div class="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
                <!-- Left Text -->
                <div class="lg:w-1/3">
                    <h2 class="text-3xl md:text-4xl font-bold mb-6" style="font-family: 'Playfair Display', serif; color: var(--charcoal, #1A1A1A);">
                        Dịch vụ của chúng tôi
                    </h2>
                    <p class="text-gray-600 text-base md:text-lg leading-relaxed">
                        Công ty Đấu giá hợp danh Việt Nam (VPA) là tổ chức hoạt động chuyên nghiệp trong lĩnh vực đấu giá tài sản.
                    </p>
                </div>

                <!-- Right Cards -->
                <div class="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Card 1 - Cars -->
                    <div class="bg-white p-6 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer group" id="service-cars" style="box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);">
                            <i data-lucide="car" class="w-7 h-7"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3 transition-colors" style="color: var(--charcoal, #1A1A1A);">
                            Đấu giá biển số xe
                        </h3>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            Cơ hội sở hữu biển số xe đẹp, hợp phong thủy. Quy trình công khai, minh bạch.
                        </p>
                    </div>

                    <!-- Card 2 - Assets -->
                    <div class="bg-white p-6 rounded-2xl border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 cursor-pointer group" id="service-assets" style="box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);">
                            <i data-lucide="home" class="w-7 h-7"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3 transition-colors" style="color: var(--charcoal, #1A1A1A);">
                            Đấu giá tài sản
                        </h3>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            Đấu giá đa dạng tài sản: tang vật, phương tiện, tài sản thi hành án...
                        </p>
                    </div>

                    <!-- Card 3 - Organizations -->
                    <div class="bg-white p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl cursor-pointer group" style="border-color: var(--gold, #F59E0B); box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);">
                            <i data-lucide="gavel" class="w-7 h-7"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3 transition-colors" style="color: var(--charcoal, #1A1A1A);">
                            Dành cho tổ chức
                        </h3>
                        <p class="text-gray-600 text-sm leading-relaxed">
                            Đăng ký sử dụng dịch vụ tổ chức đấu giá tài sản trên nền tảng VPA.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    const element = createFromHTML(html);

    // Add event listeners
    const serviceCars = element.querySelector('#service-cars');
    if (serviceCars) {
        serviceCars.addEventListener('click', () => onNavigate('cars'));
    }

    const serviceAssets = element.querySelector('#service-assets');
    if (serviceAssets) {
        serviceAssets.addEventListener('click', () => onNavigate('assets'));
    }

    initIcons(element);
    return element;
}
/**
 * Partners Component - Partner logos
 */
function Partners() {
    const html = `
        <div class="py-12 md:py-16" style="background: var(--cream, #FAF9F6);">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl md:text-4xl font-bold mb-10" style="font-family: 'Playfair Display', serif; color: var(--charcoal, #1A1A1A);">
                    Đối tác
                </h2>
                
                <div class="flex items-center justify-center gap-4 md:gap-12 flex-wrap relative">
                    <!-- Navigation Buttons -->
                    <button class="absolute left-0 md:left-4 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center text-gray-600 hover:shadow-md transition hidden md:flex">
                        <i data-lucide="chevron-left" style="width: 24px; height: 24px;"></i>
                    </button>
                    
                    <div class="flex items-center gap-8 md:gap-16 overflow-x-auto no-scrollbar py-4 px-4 w-full justify-center">
                        <!-- Mock Logos -->
                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                            <span class="text-2xl font-black text-green-600 tracking-tighter">BIDV</span>
                            <span class="text-[#AA8C3C] ml-1">✦</span>
                        </div>
                        
                        <div class="h-16 w-16 rounded flex items-center justify-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100 text-white font-bold" style="background: #F59E0B;">
                            AGRIBANK
                        </div>

                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                            <span class="text-2xl font-black text-[#AA8C3C]">VietinBank</span>
                        </div>

                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                            <span class="text-2xl font-bold text-green-700">Vietcombank</span>
                        </div>
                        
                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                            <span class="text-xl font-bold text-orange-500 flex items-center">▶ FPT Play</span>
                        </div>
                    </div>

                    <button class="absolute right-0 md:right-4 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition hidden md:flex" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);">
                        <i data-lucide="chevron-right" style="width: 24px; height: 24px;"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    const element = createFromHTML(html);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return element;
}
/**
 * AboutIntro Component - Introduction text
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
 * VpaStats Component - Key statistics
 */
function VpaStats() {
    const html = `
        <div class="bg-gray-50 py-12">
            <div class="container mx-auto px-4">
                <h2 class="text-2xl font-bold text-gray-900 mb-8 text-center">Những con số nổi bật</h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    
                    <!-- Stat 1 -->
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-5xl font-black text-[#AA8C3C]">1.000 tỷ+</p>
                        <p class="text-gray-600">Giá trị tài sản đã đấu giá</p>
                    </div>

                    <!-- Stat 2 -->
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-5xl font-black text-[#AA8C3C]">500.000+</p>
                        <p class="text-gray-600">Biển số công bố đấu giá</p>
                    </div>
                    
                    <!-- Stat 3 -->
                    <div class="flex flex-col items-center justify-center">
                        <p class="text-5xl font-black text-[#AA8C3C]">17.000+</p>
                        <p class="text-gray-600">Cuộc đấu giá đã diễn ra</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    return createFromHTML(html);
}

/**
 * PolicySections Component - Policy links
 */
function PolicySections() {
    const html = `
        <div class="py-12 border-t border-gray-200">
            <div class="max-w-5xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 text-center mb-10">
                    <!-- Policy Card 1 -->
                    <div class="p-4 md:p-6 border-b border-gray-300 md:border-r md:border-b-0 last:border-r-0">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Chính sách bảo mật</h3>
                        <a href="#" class="text-[#AA8C3C] hover:underline transition-colors">
                            Chính sách bảo mật
                        </a>
                    </div>

                    <!-- Policy Card 2 -->
                    <div class="p-4 md:p-6 border-b border-gray-300 md:border-r md:border-b-0 last:border-r-0">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Điều khoản sử dụng</h3>
                        <a href="#" class="text-[#AA8C3C] hover:underline transition-colors">
                            Điều khoản sử dụng
                        </a>
                    </div>

                    <!-- Policy Card 3 -->
                    <div class="p-4 md:p-6 border-b border-gray-300 md:border-r md:border-b-0 last:border-r-0">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Quy chế hoạt động</h3>
                        <a href="#" class="text-[#AA8C3C] hover:underline transition-colors">
                            Quy chế hoạt động
                        </a>
                    </div>
                </div>

                <div class="border-t border-gray-300 pt-6 mt-6">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4 text-center">Hướng dẫn đấu giá</h2>
                    <p class="text-center text-[#AA8C3C] hover:underline cursor-pointer">Hướng dẫn đấu giá</p>
                </div>
            </div>
        </div>
    `;

    return createFromHTML(html);
}

// =============================
// MAIN PAGE EXPORT
// =============================

export function HomePage({ onNavigate }) {
    const container = createElement('div', { className: 'bg-pearl' });

    // Create registration modal
    const registrationModal = AuctionRegistrationModal();

    // ============================================
    // LUXURY HERO SECTION - "Where Value Meets Opportunity"
    // ============================================
    const luxuryHero = createFromHTML(`
        <section class="relative flex items-center overflow-hidden" style="min-height: 80vh; background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 50%, #3D3D3D 100%);">
            <!-- Subtle gradient overlays -->
            <div class="absolute top-0 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-20" style="background: #F59E0B;"></div>
            <div class="absolute bottom-0 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-10" style="background: #AA8C3C;"></div>
            
            <div class="container mx-auto px-4 py-12 md:py-16 relative z-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    
                    <!-- LEFT CONTENT -->
                    <div class="text-white">
                        <!-- Live Badge -->
                        <div class="inline-flex items-center gap-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 mb-6 animate-fade-in-up">
                            <span class="relative flex h-3 w-3">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <span class="text-sm font-semibold uppercase tracking-wider">ĐẤU GIÁ TRỰC TUYẾN ĐANG MỞ</span>
                        </div>
                        
                        <!-- Main Heading -->
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in-up" style="animation-delay: 0.2s; font-family: 'Playfair Display', serif; letter-spacing: -0.02em;">
                            <span class="block text-white">Nơi Giá Trị</span>
                            <span class="block text-white">Gặp Gỡ</span>
                            <span class="block italic" style="background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Cơ Hội</span>
                        </h1>
                        
                        <!-- Description -->
                        <p class="text-base md:text-lg mb-6 max-w-lg leading-relaxed animate-fade-in-up" style="animation-delay: 0.4s; color: #E5E7EB;">
                            Khám phá nền tảng đấu giá tài sản, biển số xe cao cấp và độc quyền. Tham gia thị trường đấu giá đáng tin cậy nhất Việt Nam.
                        </p>
                        
                        <!-- CTA Buttons -->
                        <div class="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style="animation-delay: 0.6s;">
                            <button id="browse-auctions-hero" class="group relative px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 shadow-xl transition-all duration-300 hover:scale-105" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: #1A1A1A; box-shadow: 0 10px 40px rgba(245, 158, 11, 0.3);">
                                <i data-lucide="search" class="w-5 h-5"></i>
                                <span>Khám Phá Đấu Giá</span>
                            </button>
                            <button id="start-selling-hero" class="group border-2 border-gray-600 hover:border-gray-500 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-800/50">
                                <i data-lucide="tag" class="w-5 h-5"></i>
                                <span>Đăng Ký Bán</span>
                            </button>
                        </div>
                        
                        <!-- Stats Counter -->
                        <div class="grid grid-cols-3 gap-8 animate-fade-in-up" style="animation-delay: 0.8s;">
                            <div class="text-center">
                                <div class="text-4xl font-black mb-1" data-counter="15000" style="background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">0</div>
                                <div class="text-sm uppercase tracking-wide" style="color: #D1D5DB;">Người Tham Gia</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-black mb-1" style="background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">45 Tỷ</div>
                                <div class="text-sm uppercase tracking-wide" style="color: #D1D5DB;">Giá Trị Giao Dịch</div>
                            </div>
                            <div class="text-center">
                                <div class="text-4xl font-black mb-1" data-counter="99" style="background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">0</div>
                                <div class="text-sm uppercase tracking-wide" style="color: #D1D5DB;">Tỷ Lệ Thành Công</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- RIGHT CONTENT - Gavel Showcase -->
                    <div class="relative flex items-center justify-center">
                        <!-- Main gavel frame with 3D effect -->
                        <div class="relative z-10 group">
                            <!-- Golden frame border -->
                            <div class="relative p-2 rounded-3xl backdrop-blur-sm transform transition duration-500 group-hover:scale-105" style="background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%); border: 4px solid rgba(245, 158, 11, 0.3);">
                                <!-- Dark inner frame -->
                                <div class="rounded-2xl overflow-hidden shadow-2xl" style="background: linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%);">
                                    <!-- Real Gavel Image -->
                                    <img 
                                        src="images/gavel-luxury.jpg" 
                                        alt="Luxury Gavel" 
                                        class="w-full h-auto object-cover"
                                        style="filter: drop-shadow(0 10px 30px rgba(245, 158, 11, 0.4)); max-height: 400px;"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <!-- Floating decorative icons -->
                        <div class="absolute top-10 right-10 hidden lg:block animate-float-slow">
                            <div class="bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-3 rounded-full shadow-xl">
                                <i data-lucide="landmark" class="w-6 h-6" style="color: #F59E0B;"></i>
                            </div>
                        </div>
                        
                        <div class="absolute bottom-32 right-16 hidden lg:block animate-float-medium">
                            <div class="bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-3 rounded-full shadow-xl">
                                <i data-lucide="dollar-sign" class="w-6 h-6" style="color: #F59E0B;"></i>
                            </div>
                        </div>
                        
                        <div class="absolute bottom-10 left-10 hidden lg:block animate-float-fast">
                            <div class="bg-gray-800/80 backdrop-blur-sm border border-gray-700 p-3 rounded-full shadow-xl">
                                <i data-lucide="trending-up" class="w-6 h-6" style="color: #F59E0B;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `);

    // Animated counter functionality
    setTimeout(() => {
        const counters = luxuryHero.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.counter);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target === 99 ? '99%' : target.toLocaleString() + '+';
                }
            };
            updateCounter();
        });
    }, 1000);

    // Event listeners for buttons
    luxuryHero.querySelector('#browse-auctions-hero').addEventListener('click', () => onNavigate('cars'));
    luxuryHero.querySelector('#start-selling-hero').addEventListener('click', () => onNavigate('assets'));

    container.appendChild(luxuryHero);

    // Keep existing sections with updated styling
    container.appendChild(Services({ onNavigate }));

    // ============================================
    // HOW IT WORKS SECTION - New luxury design
    // ============================================
    const howItWorks = createFromHTML(`
        <section class="py-16 md:py-20" style="background: var(--cream, #FAF9F6);">
            <div class="container mx-auto px-4">
                <!-- Section Header -->
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style="font-family: 'Playfair Display', serif; color: var(--charcoal, #1A1A1A);">
                        Cách Thức Hoạt Động
                    </h2>
                    <p class="text-base md:text-lg max-w-2xl mx-auto" style="color: #6B7280;">
                        Mua hay bán, nền tảng của chúng tôi khiến đấu giá trở nên đơn giản và minh bạch
                    </p>
                </div>

                <!-- Steps Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <!-- Step 1 -->
                    <div class="text-center group">
                        <div class="relative inline-block mb-6">
                            <!-- Circle with number -->
                            <div class="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-black transition-all duration-300 group-hover:scale-110" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: #1A1A1A; box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);">
                                <i data-lucide="user-plus" class="w-10 h-10 text-white"></i>
                            </div>
                            <!-- Step number badge -->
                            <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center font-bold text-sm" style="border-color: var(--gold, #F59E0B); color: var(--gold, #F59E0B);">
                                1
                            </div>
                        </div>
                        <h3 class="text-xl font-bold mb-3" style="color: #1A1A1A;">Tạo Tài Khoản</h3>
                        <p class="text-sm leading-relaxed" style="color: #6B7280;">
                            Đăng ký nhanh chóng và bảo mật để bắt đầu đấu giá tài sản cao cấp
                        </p>
                    </div>

                    <!-- Step 2 -->
                    <div class="text-center group">
                        <div class="relative inline-block mb-6">
                            <div class="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-black transition-all duration-300 group-hover:scale-110" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: #1A1A1A; box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);">
                                <i data-lucide="hand-coins" class="w-10 h-10 text-white"></i>
                            </div>
                            <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center font-bold text-sm" style="border-color: var(--gold, #F59E0B); color: var(--gold, #F59E0B);">
                                2
                            </div>
                        </div>
                        <h3 class="text-xl font-bold mb-3" style="color: #1A1A1A;">Đặt Giá Thầu</h3>
                        <p class="text-sm leading-relaxed" style="color: #6B7280;">
                            Duyệt các phiên đấu giá và đưa ra mức giá cạnh tranh theo thời gian thực
                        </p>
                    </div>

                    <!-- Step 3 -->
                    <div class="text-center group">
                        <div class="relative inline-block mb-6">
                            <div class="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-2xl font-black transition-all duration-300 group-hover:scale-110" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: #1A1A1A; box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);">
                                <i data-lucide="trophy" class="w-10 h-10 text-white"></i>
                            </div>
                            <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center font-bold text-sm" style="border-color: var(--gold, #F59E0B); color: var(--gold, #F59E0B);">
                                3
                            </div>
                        </div>
                        <h3 class="text-xl font-bold mb-3" style="color: #1A1A1A;">Thắng & Nhận Hàng</h3>
                        <p class="text-sm leading-relaxed" style="color: #6B7280;">
                            Thắng đấu giá và hoàn tất quy trình giao dịch bảo mật
                        </p>
                    </div>
                </div>
            </div>
        </section>
    `);
    initIcons(howItWorks);
    container.appendChild(howItWorks);

    // Premium CTA Banner - Luxury Gold Theme
    const ctaBanner = createFromHTML(`
        <div class="relative py-20 text-white text-center overflow-hidden" style="background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%);">
            <!-- Decorative elements -->
            <div class="absolute top-0 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-10" style="background: #F59E0B;"></div>
            <div class="absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-10" style="background: #F59E0B;"></div>
            
            <div class="container mx-auto relative z-10 px-4">
                <h2 class="text-3xl md:text-4xl font-black mb-4" style="font-family: 'Playfair Display', serif;">
                    <span style="background: linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Sẵn sàng bước vào?</span>
                </h2>
                <p class="text-lg mb-8 max-w-2xl mx-auto" style="color: #D1D5DB;">Tham gia cùng hàng ngàn nhà sưu tầm và nhà đầu tư trên nền tảng đấu giá uy tín nhất</p>
                <button 
                    id="banner-contact-btn"
                    class="relative px-10 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3 shadow-2xl transform transition hover:scale-105" 
                    style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: #1A1A1A; box-shadow: 0 10px 40px rgba(245, 158, 11, 0.3);">
                    Bắt Đầu Đấu Giá
                    <i data-lucide="arrow-right" class="w-5 h-5"></i>
                </button>
            </div>
        </div>
    `);
    ctaBanner.querySelector('#banner-contact-btn').addEventListener('click', () => onNavigate('assets'));
    container.appendChild(ctaBanner);



    // About Section
    const aboutSection = createElement('section', {
        id: 'home-about',
        className: 'bg-white border-t border-gray-100'
    });
    aboutSection.appendChild(AboutIntro());
    aboutSection.appendChild(VpaStats());
    aboutSection.appendChild(PolicySections());
    container.appendChild(aboutSection);

    container.appendChild(Partners());

    // Append modal to container
    container.appendChild(registrationModal.element);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}
