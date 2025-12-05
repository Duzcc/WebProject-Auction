import { createFromHTML, initIcons } from '../../utils/dom.js';

export function Services({ onNavigate }) {
    const html = `
        <div class="bg-[#fff9e6] py-16">
            <div class="container mx-auto px-4 flex flex-col lg:flex-row items-center">
                <!-- Left Text -->
                <div class="lg:w-1/3 mb-10 lg:mb-0 pr-0 lg:pr-10">
                    <h2 class="text-4xl font-bold text-gray-900 mb-6">Dịch vụ của chúng tôi</h2>
                    <p class="text-gray-700 text-lg leading-relaxed">
                        Công ty Đấu giá hợp danh Việt Nam (Vietnam Partnerships Auction) là tổ chức hoạt động chuyên nghiệp trong lĩnh vực đấu giá tài sản.
                    </p>
                </div>

                <!-- Right Cards -->
                <div class="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <!-- Card 1 -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group" id="service-cars">
                        <div class="w-14 h-14 bg-[#be1e2d] rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <i data-lucide="car" class="w-7 h-7"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#be1e2d] transition-colors">Đấu giá biển số xe</h3>
                        <p class="text-gray-600 text-sm">
                            Cơ hội sở hữu biển số xe đẹp, hợp phong thủy. Quy trình đấu giá công khai, tuân thủ quy định pháp luật.
                        </p>
                    </div>

                    <!-- Card 2 -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group" id="service-assets">
                        <div class="w-14 h-14 bg-[#00cca3] rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <i data-lucide="home" class="w-7 h-7"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#00cca3] transition-colors">Đấu giá tài sản</h3>
                        <p class="text-gray-600 text-sm">
                            Đấu giá đa dạng các loại tài sản khác như: tang vật, phương tiện vi phạm hành chính, tài sản thi hành án...
                        </p>
                    </div>

                    <!-- Card 3 - Special Border -->
                    <div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-[#be1e2d] cursor-pointer group">
                        <div class="w-14 h-14 bg-[#ffc107] rounded-2xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform">
                            <i data-lucide="gavel" class="w-7 h-7"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#ffc107] transition-colors">Dành cho các tổ chức</h3>
                        <p class="text-gray-600 text-sm">
                            Đăng ký sử dụng dịch vụ tổ chức đấu giá tài sản trực tuyến trên nền tảng của VPA.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    const element = createFromHTML(html);

    // Add event listeners
    const serviceCars = element.querySelector('#service-cars');
    if (serviceCars) {
        serviceCars.addEventListener('click', () => onNavigate('cars'));
    }

    const serviceAssets = element.querySelector('#service-assets');
    if (serviceAssets) {
        serviceAssets.addEventListener('click', () => onNavigate('assets'));
    }

    initIcons(element);

    return element;
}
