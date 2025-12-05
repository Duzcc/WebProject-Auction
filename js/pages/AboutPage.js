import { AboutIntro } from '../components/About/AboutIntro.js';
import { VpaStats } from '../components/About/VpaStats.js';
import { PolicySections } from '../components/About/PolicySections.js';
import { createElement } from '../utils/dom.js';

/**
 * AboutPage - Trang giới thiệu
 * Sử dụng lại các component đã tạo
 */
export function AboutPage() {
    const container = createElement('div', { className: 'bg-white min-h-[70vh] pb-16' });
    const innerContainer = createElement('div', { className: 'container mx-auto px-4' });

    innerContainer.appendChild(AboutIntro());
    innerContainer.appendChild(VpaStats());
    innerContainer.appendChild(PolicySections());

    container.appendChild(innerContainer);
    return container;
}
