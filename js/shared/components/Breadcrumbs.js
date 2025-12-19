/**
 * Breadcrumbs Component
 * Navigation breadcrumbs for better UX
 */

/**
 * Creates a breadcrumbs component
 * @param {Array} items - Breadcrumb items
 * @param {string} items[].label - Item label
 * @param {string} items[].href - Item link (optional, last item usually has no link)
 * @param {Function} items[].onClick - Click handler (optional)
 * @returns {HTMLElement} Breadcrumbs element
 */
export function Breadcrumbs(items = []) {
    const nav = document.createElement('nav');
    nav.className = 'breadcrumbs flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 py-4';
    nav.setAttribute('aria-label', 'Breadcrumb');

    const ol = document.createElement('ol');
    ol.className = 'flex items-center gap-2';

    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2';

        if (index === items.length - 1) {
            // Last item (current page)
            li.innerHTML = `<span class="font-semibold text-gray-900 dark:text-white">${item.label}</span>`;
        } else {
            // Clickable item
            if (item.onClick) {
                const button = document.createElement('button');
                button.className = 'hover:text-[#2563EB] transition-colors';
                button.textContent = item.label;
                button.addEventListener('click', item.onClick);
                li.appendChild(button);
            } else if (item.href) {
                const link = document.createElement('a');
                link.href = item.href;
                link.className = 'hover:text-[#2563EB] transition-colors';
                link.textContent = item.label;
                li.appendChild(link);
            } else {
                li.innerHTML = `<span>${item.label}</span>`;
            }

            // Separator
            li.innerHTML += '<i data-lucide="chevron-right" class="w-4 h-4 text-gray-400"></i>';
        }

        ol.appendChild(li);
    });

    nav.appendChild(ol);

    // Initialize Lucide icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    return nav;
}

export default Breadcrumbs;
