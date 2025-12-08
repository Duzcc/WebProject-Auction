import { createFromHTML } from '../../utils/dom.js';

/**
 * PolicySections Component
 * Displays policy links and auction guide
 */
export function PolicySections() {
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
