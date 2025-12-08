import { createElement, createFromHTML } from '../utils/dom.js';
import { PageBanner } from '../components/Shared/PageBanner.js';
import { AuctionRegistrationModal } from '../components/Shared/AuctionRegistrationModal.js';
import { PlateDetailModal } from '../components/Shared/PlateDetailModal.js';
import { calculateDeposit, parseAuctionDate } from '../utils/plateHelpers.js';

/**
 * MotorbikeAuctionPage
 * Complex auction page for motorbike license plates with multiple tabs and filters
 */
export function MotorbikeAuctionPage({ motorbikePlates = [], officialMotorbikePlates = [], motorbikeAuctionResults = [] }) {
    // State
    const state = {
        activeTab: 'announced',
        searchTerm: '',
        selectedProvince: '',
        selectedTypes: [],
        selectedYears: [],
        selectedAvoids: [],
        startDate: '',
        endDate: '',
        openSections: {
            type: true,
            year: true,
            avoid: true
        }
    };

    const container = createElement('div', { id: 'motorbikes', className: 'bg-gray-50' });

    // Banner Header
    const banner = createElement('div', {
        className: 'relative h-80 bg-cover bg-center overflow-hidden'
    });
    banner.style.backgroundImage = 'url("images/banners/motorbike_auction.png")';
    banner.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div class="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">
                Đấu giá biển số xe máy
            </h1>
            <p class="text-xl text-white/90 max-w-2xl" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5)">
                Tham gia đấu giá biển số đẹp cho xe máy với quy trình minh bạch và chuyên nghiệp
            </p>
        </div>
    `;
    container.appendChild(banner);

    // Create registration modal instance (append to body, not container)
    const registrationModal = AuctionRegistrationModal();
    document.body.appendChild(registrationModal.element);

    // Create plate detail modal instance
    const plateDetailModal = PlateDetailModal();
    document.body.appendChild(plateDetailModal.element);

    // Constants
    const vietnameseProvinces = [
        "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh",
        "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau",
        "Cao Bằng", "Thành phố Cần Thơ", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên",
        "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Thành phố Hà Nội",
        "Hà Tĩnh", "Hải Dương", "Thành phố Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên",
        "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn",
        "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận",
        "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh",
        "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên",
        "Thanh Hóa", "Thành phố Hồ Chí Minh", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang",
        "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
    ];

    const availableTypes = ["Ngũ quý", "Sảnh tiến", "Tứ quý", "Tam hoa", "Thần tài", "Lộc phát", "Ông địa", "Số gánh", "Lặp đôi"];
    const availableYears = ["196x", "197x", "198x", "199x", "200x"];
    const availableAvoids = ["Tránh 4", "Tránh 7", "Tránh 49", "Tránh 53", "Tránh 13"];

    function render() {
        container.innerHTML = '';

        // Re-add Banner Header every render
        const banner = createElement('div', {
            className: 'relative h-80 bg-cover bg-center overflow-hidden'
        });
        banner.style.backgroundImage = 'url("images/banners/motorbike_auction.png")';
        banner.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            <div class="relative h-full container mx-auto px-4 flex flex-col justify-center">
                <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">
                    Đấu giá biển số xe máy
                </h1>
                <p class="text-xl text-white/90 max-w-2xl" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5)">
                    Tham gia đấu giá biển số đẹp cho xe máy với quy trình minh bạch và chuyên nghiệp
                </p>
            </div>
        `;
        container.appendChild(banner);

        // Content wrapper
        const contentWrapper = createElement('div', { className: 'bg-white border-b border-gray-100' });

        // Create inner container for content
        const innerContainer = createElement('div', { className: 'container mx-auto px-4 py-10' });

        // Title
        const title = createElement('h2', { className: 'text-[32px] font-bold text-gray-900 mb-6' }, 'Danh sách đấu giá');
        innerContainer.appendChild(title);

        // Tabs
        innerContainer.appendChild(createTabs());

        // Main content area
        const mainContent = createElement('div', { className: 'flex flex-col lg:flex-row gap-8' });

        // Left sidebar - Filters
        mainContent.appendChild(createFilters());

        // Right content - Table
        mainContent.appendChild(createTableArea());

        innerContainer.appendChild(mainContent);
        contentWrapper.appendChild(innerContainer);
        container.appendChild(contentWrapper);

        // Initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function createTabs() {
        const tabsContainer = createElement('div', { className: 'flex gap-1 mb-8 border-b border-gray-200' });

        const tabs = [
            { id: 'announced', label: 'Danh sách công bố' },
            { id: 'official', label: 'Danh sách chính thức' },
            { id: 'results', label: 'Kết quả đấu giá' }
        ];

        tabs.forEach(tab => {
            const isActive = state.activeTab === tab.id;
            const className = isActive
                ? 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors bg-[#2563EB] text-white'
                : 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors text-gray-500 hover:text-[#2563EB] hover:bg-gray-50';

            const button = createElement('button', { className }, tab.label);
            button.addEventListener('click', () => {
                state.activeTab = tab.id;
                render();
            });
            tabsContainer.appendChild(button);
        });

        return tabsContainer;
    }

    function createFilters() {
        const sidebar = createElement('div', { className: 'w-full lg:w-1/4 flex-shrink-0 space-y-5' });

        // Search input
        sidebar.appendChild(createSearchInput());

        // Dropdowns
        sidebar.appendChild(createPlateColorDropdown());
        sidebar.appendChild(createProvinceDropdown());

        // Date range (only for official/results)
        if (state.activeTab === 'official' || state.activeTab === 'results') {
            sidebar.appendChild(createDateInput('Từ ngày đấu giá', 'startDate'));
            sidebar.appendChild(createDateInput('Đến ngày đấu giá', 'endDate'));
        }

        // Accordions
        sidebar.appendChild(createAccordion('type', 'Loại biển', availableTypes, state.selectedTypes));
        sidebar.appendChild(createAccordion('year', 'Năm sinh', availableYears, state.selectedYears));
        sidebar.appendChild(createAccordion('avoid', 'Tránh số', availableAvoids, state.selectedAvoids));

        return sidebar;
    }

    function createSearchInput() {
        const html = `
            <div class="relative">
                <input 
                    type="text" 
                    placeholder="Nhập để tìm kiếm biển số xe" 
                    class="w-full border border-gray-300 rounded-[28px] py-4 pl-12 pr-4 text-base text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 focus:ring-0"
                    id="search-input"
                />
                <i data-lucide="search" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-600" style="width: 20px; height: 20px;"></i>
            </div>
        `;
        const element = createFromHTML(html);
        const input = element.querySelector('#search-input');

        // Preserve search term
        input.value = state.searchTerm;

        // Real-time search
        input.addEventListener('input', (e) => {
            state.searchTerm = e.target.value;
            updateTableOnly();
        });

        return element;
    }

    function createPlateColorDropdown() {
        const html = `
            <div class="relative">
                <select class="w-full border border-gray-300 rounded-[28px] py-4 px-5 appearance-none text-gray-700 text-base focus:outline-none focus:border-gray-400 bg-white cursor-pointer hover:border-gray-400 transition-colors">
                    <option>Chọn màu biển</option>
                    <option>Biển trắng</option>
                </select>
                <i data-lucide="chevron-down" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" style="width: 18px; height: 18px;"></i>
            </div>
        `;
        return createFromHTML(html);
    }

    function createProvinceDropdown() {
        const html = `
            <div class="relative">
                <select id="province-select" class="w-full border border-gray-300 rounded-[28px] py-4 px-5 appearance-none text-gray-700 text-base focus:outline-none focus:border-gray-400 bg-white cursor-pointer hover:border-gray-400 transition-colors">
                    <option value="">Chọn tỉnh, thành phố</option>
                    ${vietnameseProvinces.map(p => `<option value="${p}"${state.selectedProvince === p ? ' selected' : ''}>${p}</option>`).join('')}
                </select>
                <i data-lucide="chevron-down" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" style="width: 18px; height: 18px;"></i>
            </div>
        `;
        const element = createFromHTML(html);
        element.querySelector('#province-select').addEventListener('change', (e) => {
            state.selectedProvince = e.target.value;
            updateTableOnly();
        });
        return element;
    }

    function createDateInput(label, stateKey) {
        const html = `
            <div class="relative">
                <input
                    type="text"
                    placeholder="${label}"
                    value="${state[stateKey]}"
                    onfocus="this.type='date'"
                    onblur="if(!this.value)this.type='text'"
                    class="w-full border border-gray-300 rounded-[28px] py-4 pl-5 pr-12 text-base text-gray-700 focus:outline-none focus:border-gray-400 bg-white cursor-pointer hover:border-gray-400 transition-colors date-input-${stateKey}"
                />
                <i data-lucide="calendar" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none" style="width: 18px; height: 18px;"></i>
            </div>
        `;
        const element = createFromHTML(html);
        element.querySelector(`.date-input-${stateKey}`).addEventListener('change', (e) => {
            state[stateKey] = e.target.value;
            updateTableOnly();
        });
        return element;
    }

    function createAccordion(section, title, options, selectedOptions) {
        const isOpen = state.openSections[section];

        // VPA Official Style: Pink background with dark red text
        const accordion = createElement('div', { className: 'rounded-[16px] bg-rose-50 overflow-hidden' });

        // Header with pink background and dark red text
        const button = createElement('button', {
            className: 'w-full flex items-center justify-between px-5 py-4 text-red-900 text-base font-bold hover:bg-rose-100 transition-colors'
        });

        const buttonText = createElement('span', {}, title);
        const iconHtml = isOpen
            ? '<i data-lucide="chevron-up" style="width: 14px; height: 14px;"></i>'
            : '<i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>';
        const icon = createFromHTML(iconHtml);

        button.appendChild(buttonText);
        button.appendChild(icon);
        button.addEventListener('click', () => {
            state.openSections[section] = !state.openSections[section];
            render();
        });

        accordion.appendChild(button);

        // Checkbox list with proper spacing
        if (isOpen) {
            const content = createElement('div', { className: 'px-5 pb-5 pt-2 space-y-3' });

            options.forEach(option => {
                const checkbox = createCheckbox(option, selectedOptions.includes(option), (checked) => {
                    if (checked) {
                        selectedOptions.push(option);
                    } else {
                        const index = selectedOptions.indexOf(option);
                        if (index > -1) selectedOptions.splice(index, 1);
                    }
                    updateTableOnly();
                });
                content.appendChild(checkbox);
            });

            accordion.appendChild(content);
        }

        return accordion;
    }

    function createCheckbox(label, checked, onChange) {
        // VPA Official Style: Clear checkbox with readable text
        const html = `
            <label class="flex items-center gap-3 cursor-pointer text-base text-gray-900 hover:text-gray-700">
                <input 
                    type="checkbox" 
                    ${checked ? 'checked' : ''}
                    class="w-[18px] h-[18px] cursor-pointer rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span>${label}</span>
            </label>
        `;
        const element = createFromHTML(html);
        element.querySelector('input').addEventListener('change', (e) => onChange(e.target.checked));
        return element;
    }

    function createTableArea() {
        const tableArea = createElement('div', { className: 'w-full lg:w-3/4' });

        // Get filtered data
        const filteredData = getFilteredData();

        // Result count
        const resultCount = createElement('div', { className: 'flex justify-between items-center mb-4' });
        const displayCount = state.activeTab === 'announced' ? '115.256' : (state.activeTab === 'official' ? '80.000' : '99.882');
        resultCount.appendChild(createElement('span', { className: 'text-gray-500 text-sm' }, `Hiển thị ${filteredData.length} / ${displayCount} kết quả`));
        tableArea.appendChild(resultCount);

        // Table
        const tableWrapper = createElement('div', { className: 'overflow-x-auto rounded-t-lg border border-gray-200' });
        const table = createElement('table', { className: 'w-full text-sm text-left' });

        table.appendChild(createTableHeader());
        table.appendChild(createTableBody(filteredData));

        tableWrapper.appendChild(table);
        tableArea.appendChild(tableWrapper);

        // Pagination
        tableArea.appendChild(createPagination());

        return tableArea;
    }

    function getFilteredData() {
        let sourceData = [];
        if (state.activeTab === 'announced') sourceData = motorbikePlates;
        else if (state.activeTab === 'official') sourceData = officialMotorbikePlates;
        else if (state.activeTab === 'results') sourceData = motorbikeAuctionResults;

        return sourceData.filter(item => {
            const plateNumber = item.plateNumber.toLowerCase();

            // Search filter
            if (state.searchTerm && !plateNumber.includes(state.searchTerm.toLowerCase())) {
                return false;
            }

            // Province filter
            if (state.selectedProvince && item.province !== state.selectedProvince) {
                return false;
            }

            // Type filter
            if (state.selectedTypes.length > 0 && item.type && !state.selectedTypes.includes(item.type)) {
                return false;
            }

            // Year filter (last 2 digits)
            if (state.selectedYears.length > 0) {
                const lastFourDigits = plateNumber.slice(-4).replace('.', '');
                if (lastFourDigits.length === 4) {
                    const lastTwoDigits = parseInt(lastFourDigits.slice(-2));
                    const matchesYear = state.selectedYears.some(yearLabel => {
                        const prefix = yearLabel.match(/\d{3}/)?.[0];
                        if (!prefix) return false;
                        if (yearLabel.includes('200x')) {
                            return lastTwoDigits >= 0 && lastTwoDigits <= 9;
                        } else {
                            const startYear = parseInt(prefix.slice(1) + '0');
                            const endYear = parseInt(prefix.slice(1) + '9');
                            return lastTwoDigits >= startYear && lastTwoDigits <= endYear;
                        }
                    });
                    if (!matchesYear) return false;
                }
            }

            // Avoid filter
            if (state.selectedAvoids.length > 0) {
                const plateDigits = plateNumber.replace(/[^0-9]/g, '');
                const avoids = state.selectedAvoids.map(a => a.split(' ')[1]);
                const includesAvoid = avoids.some(avoid => plateDigits.includes(avoid));
                if (includesAvoid) return false;
            }

            // Date filter (for official/results)
            if ((state.activeTab === 'official' || state.activeTab === 'results') && (state.startDate || state.endDate)) {
                const auctionTimeString = item.auctionTime?.split(' ')[1];
                if (auctionTimeString) {
                    const [day, month, year] = auctionTimeString.split('/').map(Number);
                    const itemTime = new Date(Date.UTC(year, month - 1, day)).getTime();

                    if (state.startDate) {
                        const [sYear, sMonth, sDay] = state.startDate.split('-').map(Number);
                        const startTime = new Date(Date.UTC(sYear, sMonth - 1, sDay)).getTime();
                        if (itemTime < startTime) return false;
                    }

                    if (state.endDate) {
                        const [eYear, eMonth, eDay] = state.endDate.split('-').map(Number);
                        const endTime = new Date(Date.UTC(eYear, eMonth - 1, eDay)).getTime();
                        if (itemTime > endTime) return false;
                    }
                } else if (state.startDate || state.endDate) {
                    return false;
                }
            }

            return true;
        });
    }

    function createTableHeader() {
        const thead = createElement('thead', { className: 'bg-[#e5e5e5] text-gray-900 font-bold' });
        const tr = createElement('tr');

        if (state.activeTab === 'results') {
            tr.innerHTML = `
                <th class="px-6 py-4 w-16 text-center">STT</th>
                <th class="px-6 py-4">Biển số</th>
                <th class="px-6 py-4">Giá trúng đấu giá</th>
                <th class="px-6 py-4">Tỉnh, Thành phố</th>
                <th class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center gap-1">
                        Thời gian đấu giá
                        <i data-lucide="arrow-up-down" style="width: 14px; height: 14px;" class="text-gray-500"></i>
                    </div>
                </th>
                <th class="px-6 py-4">Lựa chọn</th>
            `;
        } else {
            tr.innerHTML = `
                <th class="px-6 py-4 w-16 text-center">STT</th>
                <th class="px-6 py-4">Biển số</th>
                <th class="px-6 py-4">Giá khởi điểm</th>
                <th class="px-6 py-4">Tỉnh, Thành phố</th>
                <th class="px-6 py-4">Loại biển</th>
                ${state.activeTab === 'official' ? `
                    <th class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center gap-1">
                            Thời gian đấu giá
                            <i data-lucide="arrow-up-down" style="width: 14px; height: 14px;" class="text-gray-500"></i>
                        </div>
                    </th>
                ` : ''}
                <th class="px-6 py-4">Lựa chọn</th>
            `;
        }

        thead.appendChild(tr);
        return thead;
    }

    function createTableBody(data) {
        const tbody = createElement('tbody', { className: 'divide-y divide-gray-100' });

        data.forEach((item, index) => {
            const tr = createElement('tr', { className: 'hover:bg-blue-50 transition-colors group' });

            if (state.activeTab === 'results') {
                tr.innerHTML = `
                    <td class="px-6 py-4 text-center font-medium text-gray-900">${index + 1}</td>
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <i data-lucide="star" class="text-blue-400 fill-yellow-400 cursor-pointer opacity-0" style="width: 18px; height: 18px;"></i>
                            <span class="font-bold border border-gray-200 px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap bg-white text-gray-800 group-hover:border-[#2563EB] cursor-pointer hover:bg-blue-50" data-plate-number="${item.plateNumber}">
                                ${item.plateNumber}
                            </span>
                        </div>
                    </td>
                    <td class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">${item.startPrice}</td>
                    <td class="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">${item.province}</td>
                    <td class="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">${item.auctionTime || ''}</td>
                    <td class="px-6 py-4"></td>
                `;
            } else {
                const plateBgClass = state.activeTab === 'official'
                    ? 'bg-[#eecc48] border-[#eecc48] text-gray-900'
                    : 'bg-white border-gray-200 text-gray-800 group-hover:border-[#2563EB]';

                tr.innerHTML = `
                    <td class="px-6 py-4 text-center font-medium text-gray-900">${index + 1}</td>
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <i data-lucide="star" class="text-blue-400 fill-yellow-400 cursor-pointer" style="width: 18px; height: 18px;"></i>
                            <span class="font-bold border px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap ${plateBgClass} cursor-pointer hover:bg-blue-50" data-plate-number="${item.plateNumber}">
                                ${item.plateNumber}
                            </span>
                        </div>
                    </td>
                    <td class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">${item.startPrice}</td>
                    <td class="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">${item.province}</td>
                    <td class="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">${item.type}</td>
                    ${state.activeTab === 'official' ? `<td class="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">${item.auctionTime || ''}</td>` : ''}
                    <td class="px-6 py-4">
                        <a href="#" class="text-[#2563EB] font-bold hover:underline decoration-2 underline-offset-2 whitespace-nowrap">Đăng ký đấu giá</a>
                    </td>
                `;
            }

            // Add event listener for registration link
            const registerLink = tr.querySelector('a[href="#"]');
            if (registerLink && state.activeTab !== 'results') {
                registerLink.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Open registration modal with plate data
                    registrationModal.open({
                        auctionId: `motorbike-plate-${item.plateNumber.replace(/[^a-zA-Z0-9]/g, '-')}`,
                        auctionName: `Biển số ${item.plateNumber}`,
                        auctionType: 'Biển số xe máy',
                        depositAmount: calculateDeposit(item.startPrice),
                        auctionDate: parseAuctionDate(item.auctionTime)
                    });
                });
            }

            // Add click handler for plate number
            const plateNumber = tr.querySelector('[data-plate-number]');
            if (plateNumber) {
                plateNumber.addEventListener('click', () => {
                    plateDetailModal.open({
                        ...item,
                        onRegister: () => {
                            // Open registration modal
                            registrationModal.open({
                                auctionId: `motorbike-plate-${item.plateNumber.replace(/[^a-zA-Z0-9]/g, '-')}`,
                                auctionName: `Biển số ${item.plateNumber}`,
                                auctionType: 'Biển số xe máy',
                                depositAmount: calculateDeposit(item.startPrice),
                                auctionDate: parseAuctionDate(item.auctionTime)
                            });
                        }
                    });
                });
            }

            tbody.appendChild(tr);
        });

        return tbody;
    }

    function createPagination() {
        const html = `
            <div class="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                <div class="flex items-center gap-2">
                    <span class="text-[#2563EB] font-bold text-sm">Xem</span>
                    <div class="relative">
                        <select class="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none appearance-none pr-8 bg-white text-[#2563EB] font-bold cursor-pointer">
                            <option>50</option>
                            <option>20</option>
                            <option>10</option>
                        </select>
                        <i data-lucide="chevron-down" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" style="width: 14px; height: 14px;"></i>
                    </div>
                </div>
                <div class="flex gap-1.5">
                    <button class="w-9 h-9 flex items-center justify-center rounded bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors">
                        <i data-lucide="chevron-left" style="width: 18px; height: 18px;"></i>
                    </button>
                    <button class="w-9 h-9 flex items-center justify-center rounded bg-[#2563EB] text-white font-bold text-sm shadow-sm">1</button>
                    <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 font-medium text-sm transition-colors">2</button>
                    <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 font-medium text-sm transition-colors">3</button>
                    <span class="w-9 h-9 flex items-center justify-center text-gray-400 pb-2">...</span>
                    <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 font-medium text-sm transition-colors">2000</button>
                    <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 hover:text-[#2563EB] transition-colors">
                        <i data-lucide="chevron-right" style="width: 18px; height: 18px;"></i>
                    </button>
                </div>
            </div>
        `;
        return createFromHTML(html);
    }

    // Update only table without full re-render (for real-time search)
    function updateTableOnly() {
        const tableWrapper = container.querySelector('.overflow-x-auto');
        if (!tableWrapper) return;

        const table = tableWrapper.querySelector('table');
        if (!table) return;

        // Get filtered data
        const filteredData = getFilteredData();

        // Update result count
        const resultCountEl = container.querySelector('.text-gray-500.text-sm');
        if (resultCountEl) {
            const displayCount = state.activeTab === 'announced' ? '115.256' : (state.activeTab === 'official' ? '80.000' : '99.882');
            resultCountEl.textContent = `Hiển thị ${filteredData.length} / ${displayCount} kết quả`;
        }

        // Re-create table body
        const oldTbody = table.querySelector('tbody');
        const newTbody = createTableBody(filteredData);

        if (oldTbody) {
            table.replaceChild(newTbody, oldTbody);
        }

        // Re-initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Initial render
    render();

    return container;
}
