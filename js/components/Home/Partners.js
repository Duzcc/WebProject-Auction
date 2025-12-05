import { createFromHTML } from '../../utils/dom.js';

/**
 * Partners Component
 * Displays partner logos with navigation
 */
export function Partners() {
    const html = `
        <div class="py-12 bg-pink-50">
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
                            <span class="text-yellow-500 ml-1">✦</span>
                        </div>
                        
                        <div class="h-16 w-16 bg-[#be1e2d] rounded flex items-center justify-center grayscale hover:grayscale-0 transition opacity-70 hover:opacity-100 text-white font-bold">
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

                    <button class="absolute right-0 md:right-4 w-10 h-10 rounded-full bg-[#be1e2d] flex items-center justify-center text-white hover:bg-red-700 shadow-md hidden md:flex">
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
