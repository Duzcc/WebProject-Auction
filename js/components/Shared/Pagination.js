/**
 * Pagination Component
 * Professional pagination with page numbers, ellipsis, and navigation
 */

/**
 * Creates a pagination component
 * @param {Object} options - Configuration options
 * @param {number} options.currentPage - Current page number (1-indexed)
 * @param {number} options.totalPages - Total number of pages
 * @param {number} options.maxVisible - Maximum visible page numbers (default: 7)
 * @param {Function} options.onPageChange - Callback when page changes
 * @param {boolean} options.showFirstLast - Show first/last buttons (default: true)
 * @param {boolean} options.scrollToTop - Scroll to top on page change (default: true)
 * @returns {HTMLElement} Pagination element
 */
export function Pagination({
    currentPage = 1,
    totalPages = 1,
    maxVisible = 7,
    onPageChange = null,
    showFirstLast = true,
    scrollToTop = true
} = {}) {
    if (totalPages <= 1) {
        return document.createElement('div'); // Return empty div if only one page
    }

    const container = document.createElement('div');
    container.className = 'pagination flex items-center justify-center gap-2 my-8';

    // First page button
    if (showFirstLast && currentPage > 1) {
        container.appendChild(createPageButton({
            label: '<i data-lucide="chevrons-left" class="w-4 h-4"></i>',
            page: 1,
            onPageChange,
            scrollToTop,
            title: 'Trang đầu'
        }));
    }

    // Previous button
    if (currentPage > 1) {
        container.appendChild(createPageButton({
            label: '<i data-lucide="chevron-left" class="w-4 h-4"></i>',
            page: currentPage - 1,
            onPageChange,
            scrollToTop,
            title: 'Trang trước'
        }));
    }

    // Page numbers with ellipsis
    const pages = generatePageNumbers(currentPage, totalPages, maxVisible);

    pages.forEach(page => {
        if (page === '...') {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'px-3 py-2 text-gray-500';
            ellipsis.textContent = '...';
            container.appendChild(ellipsis);
        } else {
            container.appendChild(createPageButton({
                label: page.toString(),
                page,
                onPageChange,
                scrollToTop,
                isActive: page === currentPage
            }));
        }
    });

    // Next button
    if (currentPage < totalPages) {
        container.appendChild(createPageButton({
            label: '<i data-lucide="chevron-right" class="w-4 h-4"></i>',
            page: currentPage + 1,
            onPageChange,
            scrollToTop,
            title: 'Trang sau'
        }));
    }

    // Last page button
    if (showFirstLast && currentPage < totalPages) {
        container.appendChild(createPageButton({
            label: '<i data-lucide="chevrons-right" class="w-4 h-4"></i>',
            page: totalPages,
            onPageChange,
            scrollToTop,
            title: 'Trang cuối'
        }));
    }

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return container;
}

/**
 * Create a page button
 */
function createPageButton({ label, page, onPageChange, scrollToTop, isActive = false, title = '' }) {
    const button = document.createElement('button');

    const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200';
    const activeClasses = 'bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white shadow-md';
    const inactiveClasses = 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600';

    button.className = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    button.innerHTML = label;

    if (title) {
        button.title = title;
    }

    if (!isActive) {
        button.addEventListener('click', () => {
            if (onPageChange) {
                onPageChange(page);
            }

            if (scrollToTop) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    return button;
}

/**
 * Generate page numbers with ellipsis
 */
function generatePageNumbers(current, total, maxVisible) {
    const pages = [];

    if (total <= maxVisible) {
        // Show all pages
        for (let i = 1; i <= total; i++) {
            pages.push(i);
        }
    } else {
        // Show pages with ellipsis
        const halfVisible = Math.floor(maxVisible / 2);

        if (current <= halfVisible + 1) {
            // Near start
            for (let i = 1; i <= maxVisible - 2; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(total);
        } else if (current >= total - halfVisible) {
            // Near end
            pages.push(1);
            pages.push('...');
            for (let i = total - (maxVisible - 3); i <= total; i++) {
                pages.push(i);
            }
        } else {
            // Middle
            pages.push(1);
            pages.push('...');
            for (let i = current - halfVisible + 2; i <= current + halfVisible - 2; i++) {
                pages.push(i);
            }
            pages.push('...');
            pages.push(total);
        }
    }

    return pages;
}

/**
 * Create pagination info text
 * @param {number} currentPage - Current page
 * @param {number} itemsPerPage - Items per page
 * @param {number} totalItems - Total items
 * @returns {HTMLElement} Info element
 */
export function PaginationInfo(currentPage, itemsPerPage, totalItems) {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    const info = document.createElement('div');
    info.className = 'text-sm text-gray-600 dark:text-gray-400 text-center mb-4';
    info.textContent = `Hiển thị ${start}-${end} trong tổng số ${totalItems} kết quả`;

    return info;
}

export default Pagination;
