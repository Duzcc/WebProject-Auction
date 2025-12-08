import { AboutIntro } from '../components/About/AboutIntro.js';
import { VpaStats } from '../components/About/VpaStats.js';
import { PolicySections } from '../components/About/PolicySections.js';
import { PageBanner } from '../components/Shared/PageBanner.js';
import { createElement } from '../utils/dom.js';

/**
 * AboutPage - Trang giới thiệu
 * Sử dụng lại các component đã tạo
 */
export function AboutPage() {
    const container = createElement('div', { className: 'bg-white min-h-[70vh] pb-16' });

    // Add banner
    container.appendChild(PageBanner({
        title: 'Giới thiệu',
        subtitle: 'Về chúng tôi',
        backgroundImage: '/images/banners/about_banner.png'
    }));

    const innerContainer = createElement('div', { className: 'container mx-auto px-4 py-10' });

    innerContainer.appendChild(AboutIntro());
    innerContainer.appendChild(VpaStats());
    innerContainer.appendChild(PolicySections());

    container.appendChild(innerContainer);
    return container;
}
