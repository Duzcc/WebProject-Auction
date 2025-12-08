import { createFromHTML } from '../../utils/dom.js';

/**
 * VpaStats Component
 * Displays key statistics about VPA
 */
export function VpaStats() {
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
