import { createFromHTML } from '../utils/dom.js';

/**
 * PageBanner Component
 * Displays a banner at the top of pages with title and optional subtitle
 */
export function PageBanner({
    title,
    subtitle = '',
    backgroundImage = null,
    alignment = 'left'
}) {
    const textAlignmentClass = alignment === 'left' ? 'text-left' : 'text-center';
    const contentPaddingClass = alignment === 'left' ? 'py-10 md:py-12 pl-4 md:pl-0' : 'py-10 md:py-12';

    // If custom background image is provided, use it with overlay
    const backgroundStyle = backgroundImage
        ? `background-image: linear-gradient(rgba(37, 99, 235, 0.85), rgba(0, 90, 158, 0.85)), url('${backgroundImage}'); background-size: cover; background-position: center;`
        : '';

    const gradientClass = backgroundImage
        ? ''
        : 'bg-gradient-to-r from-[#8B7530] via-[#AA8C3C] to-[#AA8C3C]';

    const html = `
        <div class="relative ${gradientClass} text-white overflow-hidden shadow-lg" style="${backgroundStyle}">
            <!-- Background Pattern Overlay (only if no custom image) -->
            ${!backgroundImage ? `
            <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.4&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
            ` : ''}
            
            <!-- Gradient Accent (only if no custom image) -->
            ${!backgroundImage ? `
            <div class="absolute top-0 right-0 w-64 h-64 bg-[#C9A961] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            ` : ''}
            
            <!-- Content -->
            <div class="container mx-auto relative z-10 ${textAlignmentClass} ${contentPaddingClass}">
                ${subtitle ? `<span class="block text-sm font-semibold mb-2 text-blue-100 tracking-wide uppercase">${subtitle}</span>` : ''}
                <h1 class="text-3xl md:text-5xl font-black tracking-tight drop-shadow-lg">
                    <span class="bg-gradient-to-r from-white to-blue-50 bg-clip-text text-transparent">${title}</span>
                </h1>
            </div>
        </div>
    `;

    return createFromHTML(html);
}
