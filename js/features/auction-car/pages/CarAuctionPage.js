import { createElement, createFromHTML } from '../../../shared/utils/dom.js';
import { PageBanner } from '../../../shared/components/PageBanner.js';
import { AuctionRegistrationModal } from '../../auction-shared/components/AuctionRegistrationModal.js';
import { PlateDetailModal } from '../../auction-shared/components/PlateDetailModal.js';
import { calculateDeposit, parseAuctionDate } from '../../auction-shared/utils/plateHelpers.js';

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
        selectedPlateColors: [], // NEW: Plate color filter
        startDate: '',
        endDate: '',
        // Pagination state
        currentPage: 1,
        itemsPerPage: 20,
        openSections: {
            type: true,
            year: true,
            avoid: true,
            plateColor: true // NEW
        }
    };

    const container = createElement('div', { id: 'cars', className: 'bg-gray-50' });

    // Banner Header
    const banner = createElement('div', {
        className: 'relative h-80 bg-cover bg-center overflow-hidden'
    });
    banner.style.backgroundImage = 'url("images/banners/car_auction.png")';
    banner.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div class="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">
                Đấu giá biển số xe ô tô
            </h1>
            <p class="text-xl text-white/90 max-w-2xl" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5)">
                Tham gia đấu giá biển số đẹp cho xe ô tô với quy trình minh bạch và chuyên nghiệp
            </p>
        </div>
    `;
    container.appendChild(banner);

    // Main content wrapper
    const contentWrapper = createElement('div', { className: 'bg-white border-b border-gray-100' });

    // Create registration modal instance (append to body, not container)
    const registrationModal = AuctionRegistrationModal();
    document.body.appendChild(registrationModal.element);

    // Create plate detail modal instance
    const plateDetailModal = PlateDetailModal();
    document.body.appendChild(plateDetailModal.element);

    // Constants - Province with license plate codes
    const vietnameseProvinces = [
        "An Giang-67", "Bà Rịa - Vũng Tàu-72", "Bắc Giang-98", "Bắc Kạn-97", "Bạc Liêu-95", "Bắc Ninh-99",
        "Bến Tre-71", "Bình Định-77", "Bình Dương-61", "Bình Phước-93", "Bình Thuận-86", "Cà Mau-69",
        "Cao Bằng-11", "Thành phố Cần Thơ-65", "Thành phố Đà Nẵng-43", "Đắk Lắk-47", "Đắk Nông-48", "Điện Biên-27",
        "Đồng Nai-60", "Đồng Tháp-66", "Gia Lai-81", "Hà Giang-23", "Hà Nam-90", "Thành phố Hà Nội-29/30/31/32/33/40",
        "Hà Tĩnh-38", "Hải Dương-34", "Thành phố Hải Phòng-15/16", "Hậu Giang-95", "Hòa Bình-28", "Hưng Yên-89",
        "Khánh Hòa-79", "Kiên Giang-68", "Kon Tum-82", "Lai Châu-25", "Lâm Đồng-49", "Lạng Sơn-12",
        "Lào Cai-24", "Long An-62", "Nam Định-18", "Nghệ An-37", "Ninh Bình-35", "Ninh Thuận-85",
        "Phú Thọ-19", "Phú Yên-78", "Quảng Bình-73", "Quảng Nam-92", "Quảng Ngãi-76", "Quảng Ninh-14",
        "Quảng Trị-74", "Sóc Trăng-83", "Sơn La-26", "Tây Ninh-70", "Thái Bình-17", "Thái Nguyên-20",
        "Thanh Hóa-36", "Thành phố Hồ Chí Minh-50/51/52/53/54/55/56/57/58/59", "Thừa Thiên Huế-75", "Tiền Giang-63", "Trà Vinh-84", "Tuyên Quang-22",
        "Vĩnh Long-64", "Vĩnh Phúc-88", "Yên Bái-21"
    ];

    const availableTypes = ["Ngũ quý", "Sảnh tiến", "Tứ quý", "Tam hoa", "Thần tài", "Lộc phát", "Ông địa", "Số gánh", "Lặp đôi"];
    const availableYears = ["196x", "197x", "198x", "199x", "200x"];
    const availableAvoids = ["Tránh 4", "Tránh 7", "Tránh 49", "Tránh 53", "Tránh 13"];

    // Render function
    function render() {
        container.innerHTML = '';

        // Re-add Banner Header every render
        const banner = createElement('div', {
            className: 'relative h-80 bg-cover bg-center overflow-hidden'
        });
        banner.style.backgroundImage = 'url("images/banners/car_auction.png")';
        banner.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            <div class="relative h-full container mx-auto px-4 flex flex-col justify-center">
                <h1 class="text-5xl md:text-6xl font-bold text-white mb-4" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">
                    Đấu giá biển số xe ô tô
                </h1>
                <p class="text-xl text-white/90 max-w-2xl" style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5)">
                    Tham gia đấu giá biển số đẹp cho xe ô tô với quy trình minh bạch và chuyên nghiệp
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
                ? 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors bg-blue-600 text-white'
                : 'px-6 py-3 font-bold text-sm rounded-t-lg transition-colors text-gray-500 hover:text-blue-600 hover:bg-gray-50';

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
        sidebar.appendChild(createAccordion('type', 'Loại biển số', availableTypes, state.selectedTypes));
        sidebar.appendChild(createAccordion('year', 'Năm sinh', availableYears, state.selectedYears));
        sidebar.appendChild(createAccordion('avoid', 'Tránh số', availableAvoids, state.selectedAvoids));
        sidebar.appendChild(createAccordion('plateColor', 'Loại biển', ['Biển trắng', 'Biển vàng'], state.selectedPlateColors));

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
            <div class="relative z-10">
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
            <div class="relative z-10">
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
            updateTableOnly(); // Changed from render()
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

    function createPagination() {
        const paginationInfo = getPaginatedData();
        const { totalPages, currentPage } = paginationInfo;

        const paginationWrapper = createElement('div', { className: 'flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 p-4 bg-gray-50 rounded-b-lg border border-t-0 border-gray-200' });

        // Items per page selector
        const itemsPerPageWrapper = createElement('div', { className: 'flex items-center gap-2' });


        // Create select element directly for better event handling
        const select = createElement('select', {
            id: 'items-per-page',
            className: 'border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 cursor-pointer'
        });

        [10, 20, 50].forEach(value => {
            const option = createElement('option', { value: value.toString() }, value.toString());
            if (state.itemsPerPage === value) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        select.addEventListener('change', (e) => {
            console.log('Pagination select changed!', e.target.value);
            state.itemsPerPage = parseInt(e.target.value);
            state.currentPage = 1;
            console.log('Calling render with new itemsPerPage:', state.itemsPerPage);
            render();
        });

        itemsPerPageWrapper.appendChild(select);

        // Page navigation
        const pageNav = createElement('div', { className: 'flex items-center gap-2' });

        // Previous button
        const prevBtn = createElement('button', {
            className: `px-3 py-1.5 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'} text-sm font-medium`
        }, '← Trước');
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                state.currentPage--;
                render();
            }
        });
        pageNav.appendChild(prevBtn);

        // Page numbers
        const pageNumbers = createElement('div', { className: 'flex gap-1' });
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // First page + ellipsis
        if (startPage > 1) {
            const firstPage = createPageButton(1, currentPage);
            pageNumbers.appendChild(firstPage);
            if (startPage > 2) {
                pageNumbers.appendChild(createElement('span', { className: 'px-2 py-1 text-gray-500' }, '...'));
            }
        }

        // Visible page range
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.appendChild(createPageButton(i, currentPage));
        }

        // Ellipsis + last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.appendChild(createElement('span', { className: 'px-2 py-1 text-gray-500' }, '...'));
            }
            const lastPage = createPageButton(totalPages, currentPage);
            pageNumbers.appendChild(lastPage);
        }

        pageNav.appendChild(pageNumbers);

        // Next button
        const nextBtn = createElement('button', {
            className: `px-3 py-1.5 rounded ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'} text-sm font-medium`
        }, 'Sau →');
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                state.currentPage++;
                render();
            }
        });
        pageNav.appendChild(nextBtn);

        paginationWrapper.appendChild(itemsPerPageWrapper);
        paginationWrapper.appendChild(pageNav);

        return paginationWrapper;
    }

    function createPageButton(pageNum, currentPage) {
        const isActive = pageNum === currentPage;
        const btn = createElement('button', {
            className: `px-3 py-1 rounded text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`
        }, pageNum.toString());

        if (!isActive) {
            btn.addEventListener('click', () => {
                state.currentPage = pageNum;
                render();
            });
        }

        return btn;
    }

    function createTableArea() {
        const tableArea = createElement('div', { className: 'w-full lg:w-3/4' });

        // Get paginated data
        const paginationInfo = getPaginatedData();
        const { data, totalItems, startIndex, endIndex } = paginationInfo;

        // Result count - removed for cleaner UI

        // Table
        const tableWrapper = createElement('div', { className: 'overflow-x-auto rounded-t-lg border border-gray-200' });
        const table = createElement('table', { className: 'w-full text-sm text-left' });

        table.appendChild(createTableHeader());
        table.appendChild(createTableBody(data));

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

            // Province filter - Check plate number prefix against province codes
            if (state.selectedProvince) {
                // Extract codes from format "Name-15/16" or "Name-29/30/31/32/33/40"
                const codes = state.selectedProvince.split('-')[1];
                if (codes) {
                    // Split multiple codes by '/'
                    const provinceCodes = codes.split('/');
                    // Extract plate prefix (first 2 digits before the letter)
                    const platePrefix = item.plateNumber.match(/^(\d+)/)?.[1];
                    // Check if plate prefix matches any of the province codes
                    if (!platePrefix || !provinceCodes.includes(platePrefix)) {
                        return false;
                    }
                }
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

            // NEW: Plate color filter
            if (state.selectedPlateColors.length > 0 && item.plateColor) {
                const colorMapping = {
                    'Biển trắng': 'white',
                    'Biển vàng': 'yellow'
                };
                const selectedColors = state.selectedPlateColors.map(c => colorMapping[c]);
                if (!selectedColors.includes(item.plateColor)) {
                    return false;
                }
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

    // NEW: Get paginated data
    function getPaginatedData() {
        const filtered = getFilteredData();
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / state.itemsPerPage);

        // Ensure currentPage is valid
        if (state.currentPage > totalPages && totalPages > 0) {
            state.currentPage = totalPages;
        }
        if (state.currentPage < 1) {
            state.currentPage = 1;
        }

        const startIndex = (state.currentPage - 1) * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        const paginatedData = filtered.slice(startIndex, endIndex);

        return {
            data: paginatedData,
            totalItems,
            totalPages,
            currentPage: state.currentPage,
            startIndex: startIndex + 1,
            endIndex: Math.min(endIndex, totalItems)
        };
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
                            <span class="font-bold border border-gray-200 px-3 py-1.5 rounded shadow-sm transition-colors whitespace-nowrap bg-white text-gray-800 group-hover:border-blue-600 cursor-pointer hover:bg-blue-50" data-plate-number="${item.plateNumber}">
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
                    : 'bg-white border-gray-200 text-gray-800 group-hover:border-blue-600';

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
                        <a href="#" class="text-blue-600 font-bold hover:underline decoration-2 underline-offset-2 whitespace-nowrap">Đăng ký đấu giá</a>
                    </td>
                `;
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
                                auctionId: `car-plate-${item.plateNumber.replace(/[^a-zA-Z0-9]/g, '-')}`,
                                auctionName: `Biển số ${item.plateNumber}`,
                                auctionType: 'Biển số xe ô tô',
                                depositAmount: calculateDeposit(item.startPrice),
                                auctionDate: parseAuctionDate(item.auctionTime)
                            });
                        }
                    });
                });
            }

            // Add event listener for registration link
            const registerLink = tr.querySelector('a[href="#"]');
            if (registerLink && state.activeTab !== 'results') {
                registerLink.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Open registration modal with plate data
                    registrationModal.open({
                        auctionId: `car-plate-${item.plateNumber.replace(/[^a-zA-Z0-9]/g, '-')}`,
                        auctionName: `Biển số ${item.plateNumber}`,
                        auctionType: 'Biển số xe ô tô',
                        depositAmount: calculateDeposit(item.startPrice),
                        auctionDate: parseAuctionDate(item.auctionTime)
                    });
                });
            }

            tbody.appendChild(tr);
        });

        return tbody;
    }

    // Update only table without full re-render (for real-time search)
    function updateTableOnly() {
        const tableWrapper = container.querySelector('.overflow-x-auto');
        // Reset to page 1 when filters change
        state.currentPage = 1;

        const paginationInfo = getPaginatedData();
        const { data, totalItems, startIndex, endIndex } = paginationInfo;

        // Result count element removed - no update needed

        // Update table body
        const table = container.querySelector('table');
        if (table) {
            const oldTbody = table.querySelector('tbody');
            const newTbody = createTableBody(data);
            if (oldTbody) {
                table.replaceChild(newTbody, oldTbody);
            }
        }

        // Update pagination
        const oldPagination = container.querySelector('.flex.flex-col.sm\\:flex-row');
        if (oldPagination) {
            const newPagination = createPagination();
            oldPagination.parentNode.replaceChild(newPagination, oldPagination);
        }

        // Reinitialize icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Initial render
    render();

    return container;
}
