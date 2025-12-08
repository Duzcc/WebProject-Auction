/**
 * Ultra-Premium HomePage
 * Inspired by Sotheby's, Christie's - World-class auction experience
 */

import { createElement, createFromHTML } from '../utils/dom.js';
import { Hero } from '../components/Home/Hero.js';
import { Services } from '../components/Home/Services.js';
import { NewsSection } from '../components/Home/NewsSection.js';
import { Partners } from '../components/Home/Partners.js';
import { AboutIntro } from '../components/About/AboutIntro.js';
import { VpaStats } from '../components/About/VpaStats.js';
import { PolicySections } from '../components/About/PolicySections.js';
import { newsData, notifData } from '../data/constants.js';

export function HomePage({ onNavigate }) {
    const container = createElement('div', { className: 'bg-pearl' });

    // Ultra-Premium Hero Section - VPA Theme
    const premiumHero = createFromHTML(`
        <section class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
            <!-- Animated Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23F59E0B\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
            </div>

            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>

            <!-- Content -->
            <div class="relative z-10 container mx-auto px-4 py-20 text-center">
                <!-- Logo Mark -->
                <div class="mb-8 animate-fade-in-up">
                    <div class="inline-block">
                        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/50">
                            <i data-lucide="gavel" class="w-10 h-10 text-white"></i>
                        </div>
                    </div>
                </div>

                <!-- Main Heading -->
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-black mb-6 animate-fade-in-up" style="animation-delay: 0.2s; font-family: 'Playfair Display', serif; letter-spacing: -0.02em;">
                    <span class="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 bg-clip-text text-transparent">
                        VIETNAM PROPERTY AUCTION
                    </span>
                </h1>
                <!-- Tagline -->
                <p class="text-xl md:text-2xl text-gray-200 mb-4 font-light animate-fade-in-up" style="animation-delay: 0.4s; font-family: 'Cormorant Garamond', serif; letter-spacing: 0.05em;">
                    Where Premium Meets Excellence
                </p>

                <p class="text-base md:text-lg text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-up" style="animation-delay: 0.6s;">
                    Discover Vietnam's most prestigious auction platform for premium license plates and exclusive assets
                </p>

                <!-- CTA Buttons with Ripple Effect -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style="animation-delay: 0.6s;">
                    <button class="explore-btn group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-lg overflow-hidden font-bold text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-500 hover:scale-105 btn-ripple">
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <span class="relative z-10 flex items-center gap-2">
                            <i data-lucide="search" class="w-5 h-5"></i>
                            Khám phá ngay
                        </span>
                    </button>
                    <button class="learn-btn px-8 py-4 border-2 border-blue-400 text-blue-200 rounded-lg font-semibold hover:bg-blue-500/10 transition-all duration-300 flex items-center gap-2 btn-ripple">
                        <i data-lucide="info" class="w-5 h-5"></i>
                        Tìm hiểu thêm
                    </button>
                </div>

                <!-- Stats Counter -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto animate-fade-in-up" style="animation-delay: 1s;">
                    <div class="text-center">
                        <div class="text-4xl md:text-5xl font-black text-blue-400 mb-2" data-counter="10000">0</div>
                        <div class="text-sm text-gray-400 uppercase tracking-widest">Successful Auctions</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl md:text-5xl font-black text-blue-400 mb-2" data-counter="50000">0</div>
                        <div class="text-sm text-gray-400 uppercase tracking-widest">Registered Users</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl md:text-5xl font-black text-blue-400 mb-2" data-counter="99">0</div>
                        <div class="text-sm text-gray-400 uppercase tracking-widest">Satisfaction Rate %</div>
                    </div>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <i data-lucide="chevron-down" class="w-8 h-8 text-blue-400"></i>
            </div>
        </section>

        <!-- Add required styles -->
        <style>
            @keyframes fade-in-up {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .animate-fade-in-up {
                animation: fade-in-up 0.8s ease-out both;
            }
        </style>
    `);

    // Animated counter functionality
    setTimeout(() => {
        const counters = premiumHero.querySelectorAll('[data-counter]');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.counter);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString() + (counter.dataset.counter === '99' ? '' : '+');
                }
            };
            updateCounter();
        });
    }, 1000);

    // Event listeners
    premiumHero.querySelector('.explore-btn').addEventListener('click', () => onNavigate('assets'));
    premiumHero.querySelector('.learn-btn').addEventListener('click', () => {
        document.getElementById('home-about')?.scrollIntoView({ behavior: 'smooth' });
    });

    container.appendChild(premiumHero);

    // Keep existing sections with updated styling
    container.appendChild(Services({ onNavigate }));

    // Premium CTA Banner - VPA Theme
    const ctaBanner = createFromHTML(`
        <div class="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-20 text-white text-center overflow-hidden">
            <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,%3Csvg width=\"80\" height=\"80\" viewBox=\"0 0 80 80\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.3\"%3E%3Cpath d=\"M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z\" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
            <div class="container mx-auto relative z-10 px-4">
                <h2 class="text-3xl md:text-4xl font-black mb-4" style="font-family: 'Playfair Display', serif;">
                    <span class="bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">Ready to Start Bidding?</span>
                </h2>
                <p class="text-lg mb-8 text-blue-50 max-w-2xl mx-auto">Discover thousands of premium license plates waiting for you</p>
                <button 
                    id="banner-contact-btn"
                    class="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-10 py-4 rounded-xl font-bold text-lg inline-flex items-center gap-3 shadow-2xl transform transition hover:scale-105 hover:shadow-blue-500/50">
                    View Auction Catalog
                    <i data-lucide="arrow-right" class="w-5 h-5"></i>
                </button>
            </div>
        </div>
    `);
    ctaBanner.querySelector('#banner-contact-btn').addEventListener('click', () => onNavigate('assets'));
    container.appendChild(ctaBanner);

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

    container.appendChild(Partners());

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}
