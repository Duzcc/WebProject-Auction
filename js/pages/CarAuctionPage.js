import { createElement, createFromHTML } from '../utils/dom.js';
import { PageBanner } from '../components/Shared/PageBanner.js';

/**
 * CarAuctionPage
 * Complex auction page for car license plates with multiple tabs and filters
 */
export function CarAuctionPage({ carPlates = [], officialCarPlates = [], auctionResultsData = [] }) {
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

    const container = createElement('div', { id: 'cars', className: 'bg-white border-b border-gray-100' });

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

        // Banner
        container.appendChild(PageBanner({
            title: 'Đấu giá biển số xe ô tô',
            backgroundImage: 'https://picsum.photos/seed/car_banner/1920/200'
        }));

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
        container.appendChild(innerContainer);

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
                ? 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors bg-[#be1e2d] text-white'
                : 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors text-gray-500 hover:text-[#be1e2d] hover:bg-gray-50';

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
        const sidebar = createElement('div', { className: 'w-full lg:w-1/4 flex-shrink-0 space-y-4' });

        const filterTitle = createElement('h3', { className: 'font-medium text-gray-500 mb-2' }, 'Lọc kết quả');
        sidebar.appendChild(filterTitle);

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
                    value="${state.searchTerm}"
                    class="w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#be1e2d] focus:ring-1 focus:ring-[#be1e2d]"
                    id="search-input"
                />
                <i data-lucide="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#be1e2d]" style="width: 18px; height: 18px;"></i>
            </div>
        `;
        const element = createFromHTML(html);
        element.querySelector('#search-input').addEventListener('input', (e) => {
            state.searchTerm = e.target.value;
            render();
        });
        return element;
    }

    function createPlateColorDropdown() {
        const html = `
            <div class="relative">
                <select class="w-full border border-gray-300 rounded-lg py-2.5 px-4 appearance-none text-gray-500 text-sm focus:outline-none focus:border-[#be1e2d] bg-white cursor-pointer hover:border-gray-400 transition-colors">
                    <option>Chọn màu biển</option>
                    <option>Biển trắng</option>
                </select>
                <i data-lucide="chevron-down" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" style="width: 16px; height: 16px;"></i>
            </div>
        `;
        return createFromHTML(html);
    }

    function createProvinceDropdown() {
        const html = `
            <div class="relative">
                <select id="province-select" class="w-full border border-gray-300 rounded-lg py-2.5 px-4 appearance-none text-gray-500 text-sm focus:outline-none focus:border-[#be1e2d] bg-white cursor-pointer hover:border-gray-400 transition-colors">
                    <option value="">Chọn tỉnh, thành phố</option>
                    ${vietnameseProvinces.map(p => `<option value="${p}"${state.selectedProvince === p ? ' selected' : ''}>${p}</option>`).join('')}
                </select>
                <i data-lucide="chevron-down" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" style="width: 16px; height: 16px;"></i>
            </div>
        `;
        const element = createFromHTML(html);
        element.querySelector('#province-select').addEventListener('change', (e) => {
            state.selectedProvince = e.target.value;
            render();
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
                    class="w-full border border-gray-300 rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:border-[#be1e2d] bg-white cursor-pointer hover:border-gray-400 transition-colors date-input-${stateKey}"
                />
                <i data-lucide="calendar" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" style="width: 18px; height: 18px;"></i>
            </div>
        `;
        const element = createFromHTML(html);
        element.querySelector(`.date-input-${stateKey}`).addEventListener('change', (e) => {
            state[stateKey] = e.target.value;
            render();
        });
        return element;
    }

    function createAccordion(section, title, options, selectedOptions) {
        const isOpen = state.openSections[section];

        const accordion = createElement('div', { className: 'bg-red-50/50 rounded-lg border border-red-50 p-1' });

        const button = createElement('button', {
            className: 'w-full flex items-center justify-between p-3 bg-red-50 rounded-lg text-[#be1e2d] font-bold text-sm hover:bg-red-100 transition-colors'
        });

        const buttonText = createElement('span', {}, title);
        const iconHtml = isOpen
            ? '<i data-lucide="chevron-up" style="width: 18px; height: 18px;"></i>'
            : '<i data-lucide="chevron-down" style="width: 18px; height: 18px;"></i>';
        const icon = createFromHTML(iconHtml);

        button.appendChild(buttonText);
        button.appendChild(icon);
        button.addEventListener('click', () => {
            state.openSections[section] = !state.openSections[section];
            render();
        });

        accordion.appendChild(button);

        if (isOpen) {
            const content = createElement('div', { className: 'p-3 bg-white mt-1 rounded-md border border-gray-100 pl-4' });

            options.forEach(option => {
                const checkbox = createCheckbox(option, selectedOptions.includes(option), (checked) => {
                    if (checked) {
                        selectedOptions.push(option);
                    } else {
                        const index = selectedOptions.indexOf(option);
                        if (index > -1) selectedOptions.splice(index, 1);
                    }
                    render();
                });
                content.appendChild(checkbox);
            });

            accordion.appendChild(content);
        }

        return accordion;
    }

    function createCheckbox(label, checked, onChange) {
        const html = `
            <label class="flex items-center gap-3 py-1.5 cursor-pointer hover:bg-gray-50 rounded px-1 -mx-1">
                <div class="relative flex items-center">
                    <input 
                        type="checkbox" 
                        ${checked ? 'checked' : ''}
                        class="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 shadow-sm checked:border-[#be1e2d] checked:bg-[#be1e2d]"
                    />
                    <svg class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100" width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <span class="text-gray-600 text-[15px]">${label}</span>
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
        if (state.activeTab === 'announced') sourceData = carPlates;
        else if (state.activeTab === 'official') sourceData = officialCarPlates;
        else if (state.activeTab === 'results') sourceData = auctionResultsData;

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
            const tr = createElement('tr', { className: 'hover:bg-red-50 transition-colors group' });

            if (state.activeTab === 'results') {
                tr.innerHTML = `
                    <td class="px-6 py-4 text-center font-medium text-gray-900">${index + 1}</td>
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <i data-lucide="star" class="text-yellow-400 fill-yellow-400 cursor-pointer opacity-0" style="width: 18px; height: 18px;"></i>
                            <span class="font-bold border border-gray-200 px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap bg-white text-gray-800 group-hover:border-[#be1e2d]">
                                ${item.plateNumber}
                            </span>
                        </div>
                    </td>
                    <td class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">${item.startPrice}</td>
                    <td class="px-6 py-4 text-gray-700 whitespace-nowrap">${item.province}</td>
                    <td class="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">${item.auctionTime || ''}</td>
                    <td class="px-6 py-4"></td>
                `;
            } else {
                const plateBgClass = state.activeTab === 'official'
                    ? 'bg-[#eecc48] border-[#eecc48] text-gray-900'
                    : 'bg-white border-gray-200 text-gray-800 group-hover:border-[#be1e2d]';

                tr.innerHTML = `
                    <td class="px-6 py-4 text-center font-medium text-gray-900">${index + 1}</td>
                    <td class="px-6 py-4">
                        <div class="flex items-center gap-3">
                            <i data-lucide="star" class="text-yellow-400 fill-yellow-400 cursor-pointer" style="width: 18px; height: 18px;"></i>
                            <span class="font-bold border px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap ${plateBgClass}">
                                ${item.plateNumber}
                            </span>
                        </div>
                    </td>
                    <td class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">${item.startPrice}</td>
                    <td class="px-6 py-4 text-gray-700 whitespace-nowrap">${item.province}</td>
                    <td class="px-6 py-4 text-gray-700 whitespace-nowrap">${item.type}</td>
                    ${state.activeTab === 'official' ? `<td class="px-6 py-4 text-gray-900 font-medium whitespace-nowrap">${item.auctionTime || ''}</td>` : ''}
                    <td class="px-6 py-4">
                        <a href="#" class="text-[#be1e2d] font-bold hover:underline decoration-2 underline-offset-2 whitespace-nowrap">Đăng ký đấu giá</a>
                    </td>
                `;
            }

            tbody.appendChild(tr);
        });

        return tbody;
    }

    function createPagination() {
        const html = `
            <div class="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                <div class="flex items-center gap-2">
                    <span class="text-[#be1e2d] font-bold text-sm">Xem</span>
                    <div class="relative">
                        <select class="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none appearance-none pr-8 bg-white text-[#be1e2d] font-bold cursor-pointer">
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
                    <button class="w-9 h-9 flex items-center justify-center rounded bg-[#be1e2d] text-white font-bold text-sm shadow-sm">1</button>
                    <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 font-medium text-sm transition-colors">2</button>
                    <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 font-medium text-sm transition-colors">3</button>
                    <span class="w-9 h-9 flex items-center justify-center text-gray-400 pb-2">...</span>
                    <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 font-medium text-sm transition-colors">2000</button>
                    <button class="w-9 h-9 flex items-center justify-center rounded bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 hover:text-[#be1e2d] transition-colors">
                        <i data-lucide="chevron-right" style="width: 18px; height: 18px;"></i>
                    </button>
                </div>
            </div>
        `;
        return createFromHTML(html);
    }

    // Initial render
    render();

    return container;
}
