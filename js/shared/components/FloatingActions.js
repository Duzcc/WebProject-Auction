// FloatingActions component
import { createFromHTML, initIcons } from '../utils/dom.js';

/**
 * Create FloatingActions component
 * @returns {HTMLElement} FloatingActions element
 */
export function FloatingActions() {
    const html = `
        <div class="fixed right-4 bottom-24 md:bottom-1/2 md:translate-y-1/2 flex flex-col gap-3 z-50">
            <a href="#" class="w-12 h-12 bg-[#AA8C3C] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <i data-lucide="facebook" class="w-6 h-6"></i>
            </a>
            <a href="#" class="w-12 h-12 bg-[#8B7530] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform font-bold text-[10px]">
                Zalo
            </a>
            <a href="#" class="w-12 h-12 bg-[#00cca3] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse">
                <i data-lucide="phone" class="w-6 h-6"></i>
            </a>
        </div>
    `;

    const floatingActions = createFromHTML(html);

    // Initialize Lucide icons
    initIcons(floatingActions);

    return floatingActions;
}

export default FloatingActions;
