import { Hero } from '../components/Home/Hero.js';
import { Services } from '../components/Home/Services.js';
import { NewsSection } from '../components/Home/NewsSection.js';
import { Partners } from '../components/Home/Partners.js';
import { AboutIntro } from '../components/About/AboutIntro.js';
import { VpaStats } from '../components/About/VpaStats.js';
import { PolicySections } from '../components/About/PolicySections.js';
import { createElement, createFromHTML } from '../utils/dom.js';
import { newsData, notifData } from '../data/constants.js';

export function HomePage({ onNavigate }) {
    const container = createElement('div');

    // Hero
    container.appendChild(Hero());

    // Services
    container.appendChild(Services({ onNavigate }));

    // Banner Strip
    const bannerHtml = `
        <div class="relative bg-gradient-to-r from-red-800 to-red-600 py-16 text-white text-center overflow-hidden">
            <div class="absolute inset-0 bg-[url('https://picsum.photos/seed/bg3/1920/400')] opacity-20 bg-cover mix-blend-overlay"></div>
            <div class="container mx-auto relative z-10 px-4">
                <span class="block text-sm font-medium mb-2 opacity-90">Công ty Đấu giá Hợp danh Việt Nam</span>
                <h2 class="text-4xl md:text-5xl font-black mb-6">Nâng tầm giá trị tài sản</h2>
                <button
                    id="banner-contact-btn"
                    class="bg-[#fbb03b] text-[#8b0000] px-6 py-3 rounded-md font-bold hover:bg-yellow-400 transition shadow-lg"
                >
                    Liên hệ đấu giá tài sản
                </button>
            </div>
        </div>
    `;
    const banner = createFromHTML(bannerHtml);
    banner.querySelector('#banner-contact-btn').addEventListener('click', () => onNavigate('assets'));
    container.appendChild(banner);

    // News Section
    container.appendChild(NewsSection({ newsData, notifData }));

    // About Section
    const aboutSection = createElement('section', {
        id: 'home-about',
        className: 'bg-white border-t border-gray-100'
    });
    aboutSection.appendChild(AboutIntro());
    aboutSection.appendChild(VpaStats());
    aboutSection.appendChild(PolicySections());
    container.appendChild(aboutSection);

    // Partners
    container.appendChild(Partners());

    return container;
}
