// DOM manipulation utilities

/**
 * Create a DOM element with attributes and children
 * @param {string} tag - HTML tag name
 * @param {Object} props - Element properties (className, id, etc.)
 * @param {Array|string|Node} children - Child elements or text
 * @returns {HTMLElement} Created element
 */
export function createElement(tag, props = {}, children = []) {
    const element = document.createElement(tag);

    // Set properties
    Object.keys(props).forEach(key => {
        if (key === 'className') {
            element.className = props[key];
        } else if (key === 'style' && typeof props[key] === 'object') {
            Object.assign(element.style, props[key]);
        } else if (key.startsWith('on') && typeof props[key] === 'function') {
            // Event listeners
            const eventName = key.substring(2).toLowerCase();
            element.addEventListener(eventName, props[key]);
        } else {
            element.setAttribute(key, props[key]);
        }
    });

    // Append children
    const childArray = Array.isArray(children) ? children : [children];
    childArray.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });

    return element;
}

/**
 * Render a component to a container
 * @param {HTMLElement|Function} component - Component element or function
 * @param {HTMLElement} container - Container element
 */
export function render(component, container) {
    // Clear container
    container.innerHTML = '';

    // Append component
    if (typeof component === 'function') {
        container.appendChild(component());
    } else if (component instanceof Node) {
        container.appendChild(component);
    }
}

/**
 * Create element from HTML string
 * @param {string} html - HTML string
 * @returns {HTMLElement} Created element
 */
export function createFromHTML(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

/**
 * Add multiple event listeners to an element
 * @param {HTMLElement} element - Target element
 * @param {Object} events - Object with event names as keys and handlers as values
 */
export function addEventListeners(element, events) {
    Object.keys(events).forEach(eventName => {
        element.addEventListener(eventName, events[eventName]);
    });
}

/**
 * Initialize Lucide icons in a container
 * @param {HTMLElement} container - Container element
 */
export function initIcons(container = document.body) {
    if (window.lucide) {
        window.lucide.createIcons();
    }
}
