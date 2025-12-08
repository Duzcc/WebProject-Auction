import { createFromHTML, initIcons } from '../../utils/dom.js';
import { AuctionRegistrationModal } from '../Shared/AuctionRegistrationModal.js';

export function Hero() {
    // Create registration modal
    const registrationModal = AuctionRegistrationModal();

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

    // Append modal to element
    element.appendChild(registrationModal.element);

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
