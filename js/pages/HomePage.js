/**
 * Ultra-Premium HomePage
 * Inspired by Sotheby's, Christie's - World-class auction experience
 * All components integrated inline for optimized code structure
 */

import { createElement, createFromHTML, initIcons } from '../utils/dom.js';
import { AuctionRegistrationModal } from './shared/AuctionRegistrationModal.js';

// =============================
// INTERNAL COMPONENTS
// =============================

/**
 * Hero Component - Main banner section
 */
function Hero({ registrationModal }) {
    const html = `
        <div class="relative w-full h-[500px] md:h-[600px] bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 overflow-hidden">
            <!-- Background decoration -->
            <div class="absolute inset-0 bg-[url('https://picsum.photos/seed/bgpattern/1920/1080')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
            
            <!-- Animated gradient orbs -->
            <div class="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div class="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div class="absolute bottom-0 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            
            <div class="container mx-auto px-4 h-full flex flex-col md:flex-row items-center relative z-10">
                <!-- Left Content -->
                <div class="w-full md:w-1/2 text-white pt-10 md:pt-0">
                    <div class="inline-block bg-white text-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-6 shadow-lg border-2 border-blue-200 backdrop-blur-sm">
                        🏆 Công ty Đấu giá Hợp danh Việt Nam
                    </div>
                    <h1 class="text-4xl md:text-6xl font-black mb-4 leading-tight">
                        <span class="block">Đấu giá</span>
                        <span class="block bg-gradient-to-r from-blue-200 to-blue-300 bg-clip-text text-transparent">Trực tuyến</span>
                    </h1>
                    <p class="text-lg md:text-xl text-blue-50 mb-8 max-w-lg">
                        Nền tảng đấu giá biển số uy tín, minh bạch và hiện đại nhất Việt Nam
                    </p>
                    <button id="hero-register-btn" class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-2xl transform transition hover:scale-105 hover:shadow-blue-500/50">
                        Bắt đầu ngay <i data-lucide="arrow-right" class="w-5 h-5"></i>
                    </button>
                </div>

                <!-- Right Content - Images/Banners -->
                <div class="w-full md:w-1/2 flex justify-center items-center h-full">
                    <div class="relative w-full max-w-lg">
                        <!-- Modern card design -->
                        <div class="bg-white/15 backdrop-blur-lg p-6 rounded-2xl border border-white/30 shadow-2xl transform hover:scale-105 transition duration-500">
                            <div class="flex flex-col items-center">
                                <div class="bg-gradient-to-r from-blue-400 to-blue-400 text-blue-900 font-black text-xl md:text-2xl px-6 py-2 rounded-full mb-4 shadow-lg uppercase tracking-wide">
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
        <div class="bg-[#fff9e6] py-16">
            <div class="container mx-auto px-4 flex flex-col lg:flex-row items-center">
                <!-- Left Text -->
                <div class="lg:w-1/3 mb-10 lg:mb-0 pr-0 lg:pr-10">
                    <h2 class="text-4xl font-bold text-gray-900 mb-6">Dịch vụ của chúng tôi</h2>
                    <p class="text-gray-700 text-lg leading-relaxed">
                        Công ty Đấu giá hợp danh Việt Nam (Vietnam Partnerships Auction) là tổ chức hoạt động chuyên nghiệp trong lĩnh vực đấu giá tài sản.
                    </p>
                </div>

                <!-- Right Cards -->
                <div class="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Card 1 -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm hover-lift cursor-pointer group animate-fade-in stagger-1" id="service-cars">
                        <div class="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <i data-lucide="car" class="w-7 h-7"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Đấu giá biển số xe</h3>
                        <p class="text-gray-600 text-sm">
                            Cơ hội sở hữu biển số xe đẹp, hợp phong thủy. Quy trình đấu giá công khai, tuân thủ quy định pháp luật.
                        </p>
                    </div>

                    <!-- Card 2 -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm hover-lift cursor-pointer group animate-fade-in stagger-2" id="service-assets">
                        <div class="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <i data-lucide="home" class="w-7 h-7"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">Đấu giá tài sản</h3>
                        <p class="text-gray-600 text-sm">
                            Đấu giá đa dạng các loại tài sản khác như: tang vật, phương tiện vi phạm hành chính, tài sản thi hành án...
                        </p>
                    </div>

                    <!-- Card 3 - Special Border -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm hover-lift border border-blue-600 cursor-pointer group animate-fade-in stagger-3">
                        <div class="w-14 h-14 bg-yellow-600 rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <i data-lucide="gavel" class="w-7 h-7"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">Dành cho các tổ chức</h3>
                        <p class="text-gray-600 text-sm">
                            Đăng ký sử dụng dịch vụ tổ chức đấu giá tài sản trực tuyến trên nền tảng của VPA.
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
        <div class="py-12 bg-blue-50">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold text-gray-900 mb-10">Đối tác</h2>
                
                <div class="flex items-center justify-center gap-4 md:gap-12 flex-wrap relative">
                    <!-- Navigation Buttons -->
                    <button class="absolute left-0 md:left-4 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-md hidden md:flex">
                        <i data-lucide="chevron-left" style="width: 24px; height: 24px;"></i>
                    </button>
                    
                    <div class="flex items-center gap-8 md:gap-16 overflow-x-auto no-scrollbar py-4 px-4 w-full justify-center">
                        <!-- Mock Logos -->
                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                            <span class="text-2xl font-black text-green-600 tracking-tighter">BIDV</span>
                            <span class="text-blue-500 ml-1">✦</span>
                        </div>
                        
                        <div class="h-16 w-16 bg-[#2563EB] rounded flex items-center justify-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100 text-white font-bold">
                            AGRIBANK
                        </div>

                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                            <span class="text-2xl font-black text-blue-600">VietinBank</span>
                        </div>

                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                            <span class="text-2xl font-bold text-green-700">Vietcombank</span>
                        </div>
                        
                        <div class="h-12 flex items-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100">
                            <span class="text-xl font-bold text-orange-500 flex items-center">▶ FPT Play</span>
                        </div>
                    </div>

                    <button class="absolute right-0 md:right-4 w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white hover:bg-blue-700 shadow-md hidden md:flex">
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

export function HomePage({ onNavigate }) {
    const container = createElement('div', { className: 'bg-pearl' });

    // Create registration modal
    const registrationModal = AuctionRegistrationModal();

    // Ultra-Premium Hero Section - VPA Theme
    const premiumHero = createFromHTML(`
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
            <!-- Animated Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23F59E0B\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
            </div>

            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>

            <!-- Content -->
            <div class="relative z-10 container mx-auto px-4 py-20 text-center">
                <!-- Logo Mark -->
                <div class="mb-8 animate-fade-in-up">
                    <div class="inline-block">
                        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/50">
                            <i data-lucide="gavel" class="w-10 h-10 text-white"></i>
                        </div>
                    </div>
                </div>

                <!-- Main Heading -->
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 animate-fade-in-up" style="animation-delay: 0.2s; font-family: 'Playfair Display', serif; letter-spacing: -0.02em;">
                    <span class="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 bg-clip-text text-transparent">
                        VIETNAM PROPERTY AUCTION
                    </span>
                </h1>
                <!-- Tagline -->
                <p class="text-xl md:text-2xl text-gray-200 mb-4 font-light animate-fade-in-up" style="animation-delay: 0.4s; font-family: 'Cormorant Garamond', serif; letter-spacing: 0.05em;">
                    Where Premium Meets Excellence
                </p>

                <p class="text-base md:text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-up" style="animation-delay: 0.6s;">
                    Discover Vietnam's most prestigious auction platform for premium license plates and exclusive assets
                </p>

                <!-- CTA Buttons with Ripple Effect -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style="animation-delay: 0.6s;">
                    <button class="explore-btn group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-lg overflow-hidden font-bold text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 btn-ripple">
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span class="relative z-10 flex items-center gap-2">
                            <i data-lucide="search" class="w-5 h-5"></i>
                            Khám phá ngay
                        </span>
                    </button>
                    <button class="learn-btn px-8 py-4 border-2 border-blue-400 text-blue-200 rounded-lg font-semibold hover:bg-blue-500/10 transition-all duration-300 flex items-center gap-2 btn-ripple">
                        <i data-lucide="info" class="w-5 h-5"></i>
                        Tìm hiểu thêm
                    </button>
                </div>

                <!-- Stats Counter -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto animate-fade-in-up" style="animation-delay: 1s;">
                    <div class="text-center">
                        <div class="text-4xl md:text-5xl font-black text-blue-400 mb-2" data-counter="10000">0</div>
                        <div class="text-sm text-gray-400 uppercase tracking-widest">Successful Auctions</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl md:text-5xl font-black text-blue-400 mb-2" data-counter="50000">0</div>
                        <div class="text-sm text-gray-400 uppercase tracking-widest">Registered Users</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl md:text-5xl font-black text-blue-400 mb-2" data-counter="99">0</div>
                        <div class="text-sm text-gray-400 uppercase tracking-widest">Satisfaction Rate %</div>
                    </div>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <i data-lucide="chevron-down" class="w-8 h-8 text-blue-400"></i>
            </div>
        </section>

        <!-- Add required styles -->
        <style>
            @keyframes fade-in-up {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .animate-fade-in-up {
                animation: fade-in-up 0.8s ease-out both;
            }
        </style>
    `);

    // Animated counter functionality
    setTimeout(() => {
        const counters = premiumHero.querySelectorAll('[data-counter]');
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
                    counter.textContent = target.toLocaleString() + (counter.dataset.counter === '99' ? '' : '+');
                }
            };
            updateCounter();
        });
    }, 1000);

    // Event listeners
    premiumHero.querySelector('.explore-btn').addEventListener('click', () => onNavigate('assets'));
    premiumHero.querySelector('.learn-btn').addEventListener('click', () => {
        document.getElementById('home-about')?.scrollIntoView({ behavior: 'smooth' });
    });

    container.appendChild(premiumHero);

    // Add Hero component
    container.appendChild(Hero({ registrationModal }));

    // Keep existing sections with updated styling
    container.appendChild(Services({ onNavigate }));

    // Premium CTA Banner - VPA Theme
    const ctaBanner = createFromHTML(`
        <div class="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20 text-white text-center overflow-hidden">
            <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.3\"%3E%3Cpath d=\"M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z\" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
            <div class="container mx-auto relative z-10 px-4">
                <h2 class="text-3xl md:text-4xl font-black mb-4" style="font-family: 'Playfair Display', serif;">
                    <span class="bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">Ready to Start Bidding?</span>
                </h2>
                <p class="text-lg mb-8 text-blue-50 max-w-2xl mx-auto">Discover thousands of premium license plates waiting for you</p>
                <button 
                    id="banner-contact-btn"
                    class="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-10 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3 shadow-2xl transform transition hover:scale-105 hover:shadow-blue-500/50">
                    View Auction Catalog
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
