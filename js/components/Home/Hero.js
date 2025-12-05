import { createFromHTML, initIcons } from '../../utils/dom.js';

export function Hero() {
    const html = `
        <div class="relative w-full h-[500px] md:h-[600px] bg-gradient-to-r from-orange-500 via-red-500 to-red-700 overflow-hidden">
            <!-- Background decoration -->
            <div class="absolute inset-0 bg-[url('https://picsum.photos/seed/bgpattern/1920/1080')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
            
            <div class="container mx-auto px-4 h-full flex flex-col md:flex-row items-center relative z-10">
                <!-- Left Content -->
                <div class="w-full md:w-1/2 text-white pt-10 md:pt-0">
                    <div class="inline-block bg-white text-[#be1e2d] px-4 py-1 rounded-full text-sm font-semibold mb-6 shadow-md border border-red-200">
                        Công ty Đấu giá Hợp danh Việt Nam
                    </div>
                    <h1 class="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase tracking-wide">
                        Đấu giá trực tuyến
                    </h1>
                    <button class="bg-[#a91823] hover:bg-[#8b121b] text-white px-8 py-3 rounded-md font-bold text-lg flex items-center gap-2 shadow-lg transform transition hover:scale-105">
                        Đăng ký <i data-lucide="arrow-up-right" class="w-5 h-5"></i>
                    </button>
                </div>

                <!-- Right Content - Images/Banners -->
                <div class="w-full md:w-1/2 flex justify-center items-end h-full pb-10">
                    <div class="relative w-full max-w-lg">
                        <!-- Mockup of phones/banners -->
                        <div class="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 transform rotate-1 hover:rotate-0 transition duration-500">
                            <div class="flex flex-col items-center">
                                <span class="text-yellow-300 font-bold text-2xl md:text-3xl drop-shadow-md mb-2 uppercase text-center">Đấu giá liên tay</span>
                                <span class="text-white font-black text-3xl md:text-4xl drop-shadow-md uppercase text-center mb-4">Rinh ngay biển đẹp</span>
                                <img 
                                    src="https://picsum.photos/seed/car_auction/600/300" 
                                    alt="Banner" 
                                    class="rounded-lg shadow-2xl w-full object-cover h-48 md:h-64"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom wave decoration simulation -->
            <div class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#fff9e6] to-transparent"></div>
        </div>
    `;

    const element = createFromHTML(html);

    initIcons(element);

    return element;
}
