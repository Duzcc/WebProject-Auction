import { createFromHTML } from '../../utils/dom.js';

/**
 * PageBanner Component
 * Displays a banner at the top of pages with title and optional subtitle
 */
export function PageBanner({
    title,
    subtitle = '',
    backgroundImage = 'https://picsum.photos/seed/auction_banner/1920/200',
    alignment = 'left'
}) {
    const textAlignmentClass = alignment === 'left' ? 'text-left' : 'text-center';
    const contentPaddingClass = alignment === 'left' ? 'py-10 md:py-12 pl-4 md:pl-0' : 'py-10 md:py-12';

    const html = `
        <div class="relative bg-gradient-to-r from-red-800 to-red-600 text-white overflow-hidden shadow-md">
            <!-- Background Image Overlay -->
            <div 
                class="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" 
                style="background-image: url('${backgroundImage}')"
            ></div>
            
            <!-- Content -->
            <div class="container mx-auto relative z-10 ${textAlignmentClass} ${contentPaddingClass}">
                ${subtitle ? `<span class="block text-sm font-medium mb-2 opacity-90">${subtitle}</span>` : ''}
                <h1 class="text-3xl md:text-4xl font-black">${title}</h1>
            </div>
        </div>
    `;

    return createFromHTML(html);
}
