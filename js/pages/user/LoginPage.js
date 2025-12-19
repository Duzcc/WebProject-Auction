
import { createElement } from '../../utils/dom.js';
import { validateEmail, validatePassword, validateName, showError, clearError, validateForm } from '../../utils/validation.js';
import { login } from '../../utils/auth.js';
import { createElement } from '../../../shared/utils/dom.js';
import { validateEmail, validatePassword, validateName, showError, clearError, validateForm } from '../utils/validation.js';
import { login, register, authenticate } from '../utils/auth.js';

/**
 * LoginPage Component
 * Modern login/signup page with animations and validation
 */
export function LoginPage({ onLoginSuccess }) {
    const container = createElement('div', {
        className: 'min-h-screen w-full bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100 flex items-center justify-center p-4 overflow-hidden relative'
    });

    // Add animated background elements
    const bgDecoration = createElement('div', {
        className: 'absolute inset-0 overflow-hidden pointer-events-none'
    });
    bgDecoration.innerHTML = `
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div class="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    `;
    container.appendChild(bgDecoration);

    // Main container
    const mainContainer = createElement('div', {
        id: 'login-container',
        className: 'relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl min-h-[500px] overflow-hidden transition-all duration-700 ease-in-out'
    });

    // Sign Up Form
    const signUpForm = createSignUpForm();
    mainContainer.appendChild(signUpForm);

    // Sign In Form
    const signInForm = createSignInForm(onLoginSuccess);
    mainContainer.appendChild(signInForm);

    // Toggle Panel
    const togglePanel = createTogglePanel();
    mainContainer.appendChild(togglePanel);

    container.appendChild(mainContainer);

    // Setup event listeners
    setupEventListeners(mainContainer);

    return container;
}

/**
 * Tạo form đăng ký (Sign Up)
 * @returns {HTMLElement} Form container với input fields và validation
 * 
 * Form bao gồm:
 * - Input: Họ tên, Email, Mật khẩu
 * - Social login buttons
 * - Real-time validation khi blur
 * - Password visibility toggle
 */
function createSignUpForm() {
    const formContainer = createElement('div', {
        className: 'form-container sign-up absolute top-0 left-0 h-full w-1/2 opacity-0 z-10 transition-all duration-700 ease-in-out'
    });

    const form = createElement('form', {
        className: 'bg-white flex flex-col items-center justify-center px-10 h-full'
    });

    // Title
    const title = createElement('h1', {
        className: 'text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] bg-clip-text text-transparent'
    });
    title.textContent = 'Tạo Tài Khoản';
    form.appendChild(title);

    // Social icons
    const socialIcons = createSocialIcons();
    form.appendChild(socialIcons);

    // Divider text
    const divider = createElement('span', {
        className: 'text-xs text-gray-500 my-4'
    });
    divider.textContent = 'hoặc sử dụng email để đăng ký';
    form.appendChild(divider);

    // Name input
    const nameInput = createElement('input', {
        type: 'text',
        placeholder: 'Họ và tên',
        id: 'signup-name',
        className: 'bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 my-2 w-full text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-red-200 transition-all'
    });
    form.appendChild(nameInput);

    // Email input
    const emailInput = createElement('input', {
        type: 'email',
        placeholder: 'Email',
        id: 'signup-email',
        className: 'bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 my-2 w-full text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-red-200 transition-all'
    });
    form.appendChild(emailInput);

    // Password input container
    const passwordContainer = createElement('div', {
        className: 'relative w-full my-2'
    });

    const passwordInput = createElement('input', {
        type: 'password',
        placeholder: 'Mật khẩu',
        id: 'signup-password',
        className: 'bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 w-full text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-red-200 transition-all pr-10'
    });
    passwordContainer.appendChild(passwordInput);

    // Password toggle button
    const toggleBtn = createElement('button', {
        type: 'button',
        className: 'absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
    });
    toggleBtn.innerHTML = '<i data-lucide="eye" class="w-4 h-4"></i>';
    toggleBtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, toggleBtn));
    passwordContainer.appendChild(toggleBtn);

    form.appendChild(passwordContainer);

    // Submit button with ripple effect
    const submitBtn = createElement('button', {
        type: 'submit',
        className: 'bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 px-12 rounded-lg mt-4 uppercase text-xs tracking-wider hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-ripple'
    });
    submitBtn.textContent = 'Đăng Ký';
    form.appendChild(submitBtn);

    // Form submit handler
    form.addEventListener('submit', (e) => handleSignUpSubmit(e, form, submitBtn));

    // Real-time validation
    nameInput.addEventListener('blur', () => {
        const validation = validateName(nameInput.value);
        if (!validation.valid) {
            showError(nameInput, validation.message);
        } else {
            clearError(nameInput);
        }
    });

    emailInput.addEventListener('blur', () => {
        const validation = validateEmail(emailInput.value);
        if (!validation.valid) {
            showError(emailInput, validation.message);
        } else {
            clearError(emailInput);
        }
    });

    passwordInput.addEventListener('blur', () => {
        const validation = validatePassword(passwordInput.value, true);
        if (!validation.valid) {
            showError(passwordInput, validation.message);
        } else {
            clearError(passwordInput);
        }
    });

    formContainer.appendChild(form);
    return formContainer;
}

/**
 * Tạo form đăng nhập (Sign In)
 * @param {Function} onLoginSuccess - Callback được gọi khi đăng nhập thành công
 * @returns {HTMLElement} Form container với login functionality
 * 
 * Form bao gồm:
 * - Input: Email, Mật khẩu
 * - Remember me checkbox
 * - Forgot password link
 * - Real-time validation
 * - Password visibility toggle
 */
function createSignInForm(onLoginSuccess) {
    const formContainer = createElement('div', {
        className: 'form-container sign-in absolute top-0 left-0 h-full w-1/2 z-20 transition-all duration-700 ease-in-out'
    });

    const form = createElement('form', {
        className: 'bg-white flex flex-col items-center justify-center px-10 h-full'
    });

    // Title
    const title = createElement('h1', {
        className: 'text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] bg-clip-text text-transparent'
    });
    title.textContent = 'Đăng Nhập';
    form.appendChild(title);

    // Email input FIRST
    const emailInput = createElement('input', {
        type: 'email',
        placeholder: 'Email',
        id: 'signin-email',
        className: 'bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 my-2 w-full text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 transition-all'
    });
    form.appendChild(emailInput);

    // Password input container
    const passwordContainer = createElement('div', {
        className: 'relative w-full my-2'
    });

    const passwordInput = createElement('input', {
        type: 'password',
        placeholder: 'Mật khẩu',
        id: 'signin-password',
        className: 'bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 w-full text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-200 transition-all pr-10'
    });
    passwordContainer.appendChild(passwordInput);

    // Password toggle button
    const toggleBtn = createElement('button', {
        type: 'button',
        className: 'absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors'
    });
    toggleBtn.innerHTML = '<i data-lucide="eye" class="w-4 h-4"></i>';
    toggleBtn.addEventListener('click', () => togglePasswordVisibility(passwordInput, toggleBtn));
    passwordContainer.appendChild(toggleBtn);

    form.appendChild(passwordContainer);

    // Remember me and forgot password
    const optionsContainer = createElement('div', {
        className: 'flex items-center justify-between w-full my-2'
    });

    const rememberMe = createElement('label', {
        className: 'flex items-center text-xs text-gray-600 cursor-pointer hover:text-[#2563EB] transition-colors'
    });
    const checkbox = createElement('input', {
        type: 'checkbox',
        id: 'remember-me',
        className: 'mr-2 cursor-pointer'
    });
    rememberMe.appendChild(checkbox);
    rememberMe.appendChild(document.createTextNode('Ghi nhớ đăng nhập'));
    optionsContainer.appendChild(rememberMe);

    const forgotPassword = createElement('a', {
        href: '#',
        className: 'text-xs text-gray-600 hover:text-[#2563EB] transition-colors'
    });
    forgotPassword.textContent = 'Quên mật khẩu?';
    optionsContainer.appendChild(forgotPassword);

    form.appendChild(optionsContainer);

    // Submit button
    const submitBtn = createElement('button', {
        type: 'submit',
        className: 'bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white font-semibold py-3 px-12 rounded-lg mt-4 uppercase text-xs tracking-wider hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-ripple w-full'
    });
    submitBtn.textContent = 'Đăng Nhập';
    form.appendChild(submitBtn);

    // Divider - MOVED HERE (between submit and social)
    const divider = createElement('div', {
        className: 'flex items-center w-full my-6'
    });
    divider.innerHTML = `
        <div class="flex-1 h-px bg-gray-300"></div>
        <span class="px-4 text-xs text-gray-500">hoặc đăng nhập bằng</span>
        <div class="flex-1 h-px bg-gray-300"></div>
    `;
    form.appendChild(divider);

    // Social login buttons - NOW AT BOTTOM
    const socialButtons = createSocialButtons();
    form.appendChild(socialButtons);

    // Form submit handler
    form.addEventListener('submit', (e) => handleSignInSubmit(e, form, submitBtn, onLoginSuccess));

    // Real-time validation
    emailInput.addEventListener('blur', () => {
        const validation = validateEmail(emailInput.value);
        if (!validation.valid) {
            showError(emailInput, validation.message);
        } else {
            clearError(emailInput);
        }
    });

    passwordInput.addEventListener('blur', () => {
        const validation = validatePassword(passwordInput.value, false);
        if (!validation.valid) {
            showError(passwordInput, validation.message);
        } else {
            clearError(passwordInput);
        }
    });

    formContainer.appendChild(form);
    return formContainer;
}

/**
 * Tạo các nút đăng nhập qua mạng xã hội (official SVG logos)
 * @returns {HTMLElement} Container chứa các logo buttons
 */
function createSocialButtons() {
    const container = createElement('div', {
        className: 'flex justify-center gap-4 w-full'
    });

    const socials = [
        {
            name: 'Google',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>',
            bgColor: 'bg-white hover:bg-gray-50',
            borderColor: 'border-gray-300 hover:border-[#4285F4]'
        },
        {
            name: 'Facebook',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><linearGradient id="fb" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"/><stop offset="1" stop-color="#007ad9"/></linearGradient><path fill="url(#fb)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"/><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"/></svg>',
            bgColor: 'bg-white hover:bg-blue-50',
            borderColor: 'border-gray-300 hover:border-[#1877F2]'
        },
        {
            name: 'GitHub',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px"><path fill="#24292e" d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h0.04 c1.02,0.188,1.39-0.442,1.39-0.981c0-0.487-0.02-2.096-0.03-3.8c-5.57,1.209-6.74-2.366-6.74-2.366 c-0.93-2.364-2.27-2.993-2.27-2.993c-1.86-1.269,0.14-1.244,0.14-1.244c2.05,0.145,3.13,2.103,3.13,2.103 c1.82,3.12,4.78,2.219,5.94,1.697c0.18-1.32,0.71-2.219,1.29-2.729c-4.53-0.515-9.29-2.265-9.29-10.079 c0-2.227,0.79-4.045,2.1-5.467c-0.21-0.515-0.91-2.587,0.2-5.393c0,0,1.71-0.548,5.6,2.088c1.62-0.451,3.36-0.676,5.09-0.684 c1.73,0.008,3.47,0.233,5.09,0.684c3.89-2.636,5.6-2.088,5.6-2.088c1.11,2.806,0.41,4.878,0.2,5.393 c1.31,1.422,2.1,3.24,2.1,5.467c0,7.831-4.77,9.557-9.31,10.059c0.73,0.631,1.38,1.875,1.38,3.777 c0,2.729-0.03,4.931-0.03,5.598c0,0.546,0.37,1.18,1.4,0.981l0,0C38.201,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"/></svg>',
            bgColor: 'bg-white hover:bg-gray-50',
            borderColor: 'border-gray-300 hover:border-gray-400'
        }
    ];

    socials.forEach(social => {
        const button = createElement('button', {
            type: 'button',
            className: `flex items-center justify-center w-12 h-12 ${social.bgColor} border-2 ${social.borderColor} rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg`,
            title: `Đăng nhập bằng ${social.name}`
        });

        button.innerHTML = social.svg;

        button.addEventListener('click', () => {
            alert(`Đăng nhập bằng ${social.name} - Tính năng đang phát triển`);
        });
        container.appendChild(button);
    });

    return container;
}

// Sign-up form social icons (same SVG logos)
function createSocialIcons() {
    const container = createElement('div', {
        className: 'flex gap-3 my-4'
    });

    const socials = [
        {
            label: 'Google',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>',
            color: 'hover:bg-red-50 hover:border-red-400'
        },
        {
            label: 'Facebook',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px"><linearGradient id="fb2" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"/><stop offset="1" stop-color="#007ad9"/></linearGradient><path fill="url(#fb2)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"/><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"/></svg>',
            color: 'hover:bg-blue-50 hover:border-blue-400'
        },
        {
            label: 'GitHub',
            svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px"><path fill="#24292e" d="M24,4C12.954,4,4,12.954,4,24c0,8.887,5.801,16.411,13.82,19.016h0.04 c1.02,0.188,1.39-0.442,1.39-0.981c0-0.487-0.02-2.096-0.03-3.8c-5.57,1.209-6.74-2.366-6.74-2.366 c-0.93-2.364-2.27-2.993-2.27-2.993c-1.86-1.269,0.14-1.244,0.14-1.244c2.05,0.145,3.13,2.103,3.13,2.103 c1.82,3.12,4.78,2.219,5.94,1.697c0.18-1.32,0.71-2.219,1.29-2.729c-4.53-0.515-9.29-2.265-9.29-10.079 c0-2.227,0.79-4.045,2.1-5.467c-0.21-0.515-0.91-2.587,0.2-5.393c0,0,1.71-0.548,5.6,2.088c1.62-0.451,3.36-0.676,5.09-0.684 c1.73,0.008,3.47,0.233,5.09,0.684c3.89-2.636,5.6-2.088,5.6-2.088c1.11,2.806,0.41,4.878,0.2,5.393 c1.31,1.422,2.1,3.24,2.1,5.467c0,7.831-4.77,9.557-9.31,10.059c0.73,0.631,1.38,1.875,1.38,3.777 c0,2.729-0.03,4.931-0.03,5.598c0,0.546,0.37,1.18,1.4,0.981l0,0C38.201,40.411,44,32.887,44,24C44,12.954,35.046,4,24,4z"/></svg>',
            color: 'hover:bg-gray-100 hover:border-gray-400'
        }
    ];

    socials.forEach(social => {
        const link = createElement('a', {
            href: '#',
            className: `border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center ${social.color} hover:scale-110 transition-all duration-300`,
            'aria-label': `Login with ${social.label}`
        });
        link.innerHTML = social.svg;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`Đăng nhập bằng ${social.label} - Tính năng đang phát triển`);
        });
        container.appendChild(link);
    });

    return container;
}

/**
 * Tạo panel chuyển đổi giữa Sign In và Sign Up
 * @returns {HTMLElement} Toggle panel với animation
 * 
 * Panel bao gồm:
 * - Left panel: Hiển thị khi đang ở chế độ Sign Up, có nút chuyển sang Sign In
 * - Right panel: Hiển thị khi đang ở chế độ Sign In, có nút chuyển sang Sign Up
 * - Gradient background với animation mượt mà
 */
function createTogglePanel() {
    const toggleContainer = createElement('div', {
        className: 'toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out rounded-r-3xl z-[1000]'
    });

    const toggle = createElement('div', {
        className: 'toggle bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white relative left-[-100%] h-full w-[200%] transition-all duration-700 ease-in-out'
    });

    // Left panel (shown when sign up is active)
    const leftPanel = createElement('div', {
        className: 'toggle-panel toggle-left absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 -translate-x-[200%] transition-all duration-700 ease-in-out'
    });
    leftPanel.innerHTML = `
        <h1 class="text-3xl font-bold mb-4">Chào Mừng Trở Lại!</h1>
        <p class="text-sm mb-6 opacity-90">Đăng nhập để tiếp tục sử dụng các tính năng của chúng tôi</p>
        <button class="toggle-btn bg-transparent border-2 border-white text-white font-semibold py-2 px-10 rounded-lg uppercase text-xs tracking-wider hover:bg-white hover:text-[#2563EB] transition-all duration-300" id="login">Đăng Nhập</button>
    `;
    toggle.appendChild(leftPanel);

    // Right panel (shown when sign in is active)
    const rightPanel = createElement('div', {
        className: 'toggle-panel toggle-right absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 right-0 transition-all duration-700 ease-in-out'
    });
    rightPanel.innerHTML = `
        <h1 class="text-3xl font-bold mb-4">Xin Chào!</h1>
        <p class="text-sm mb-6 opacity-90">Đăng ký tài khoản để sử dụng đầy đủ các tính năng</p>
        <button class="toggle-btn bg-transparent border-2 border-white text-white font-semibold py-2 px-10 rounded-lg uppercase text-xs tracking-wider hover:bg-white hover:text-[#2563EB] transition-all duration-300" id="register">Đăng Ký</button>
    `;
    toggle.appendChild(rightPanel);

    toggleContainer.appendChild(toggle);
    return toggleContainer;
}

/**
 * Thiết lập event listeners cho các nút chuyển đổi form
 * @param {HTMLElement} container - Main container element
 * 
 * Xử lý:
 * - Nút "Đăng Ký": Thêm class 'active' để hiển thị form đăng ký
 * - Nút "Đăng Nhập": Xóa class 'active' để hiển thị form đăng nhập
 * - Khởi tạo Lucide icons sau khi render
 */
function setupEventListeners(container) {
    const registerBtn = container.querySelector('#register');
    const loginBtn = container.querySelector('#login');

    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

    // Initialize Lucide icons
    setTimeout(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, 0);
}

/**
 * Chuyển đổi hiển thị/ẩn mật khẩu
 * @param {HTMLInputElement} input - Input field chứa mật khẩu
 * @param {HTMLButtonElement} button - Nút toggle với icon
 * 
 * Chuyển đổi:
 * - type="password" <-> type="text"
 * - Icon eye <-> eye-off
 */
function togglePasswordVisibility(input, button) {
    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = '<i data-lucide="eye-off" class="w-4 h-4"></i>';
    } else {
        input.type = 'password';
        button.innerHTML = '<i data-lucide="eye" class="w-4 h-4"></i>';
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

/**
 * Xử lý submit form đăng ký
 * @param {Event} e - Submit event
 * @param {HTMLFormElement} form - Form element
 * @param {HTMLButtonElement} submitBtn - Nút submit
 * 
 * Quy trình:
 * 1. Validate tất cả input fields
 * 2. Hiển thị loading state
 * 3. Gọi API đăng ký (hiện tại đang mock)
 * 4. Chuyển sang form đăng nhập nếu thành công
 * 5. Reset form và khôi phục trạng thái nút
 */
async function handleSignUpSubmit(e, form, submitBtn) {
    e.preventDefault();

    const formData = {
        name: form.querySelector('#signup-name').value,
        email: form.querySelector('#signup-email').value,
        password: form.querySelector('#signup-password').value
    };

    // Validate form
    const validation = validateForm(formData, true);

    if (!validation.valid) {
        // Show errors
        Object.keys(validation.errors).forEach(field => {
            const input = form.querySelector(`#signup-${field}`);
            if (input) {
                showError(input, validation.errors[field]);
            }
        });
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang xử lý...';

    try {
        // Attempt registration
        const result = register(formData);

        if (!result.success) {
            // Show error
            alert(result.message);
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
        }

        // Success - show message
        alert(result.message);

        // Switch to sign in form
        const container = form.closest('#login-container');
        container.classList.remove('active');

        // Pre-fill email in login form
        const loginEmailInput = container.querySelector('#signin-email');
        if (loginEmailInput) {
            loginEmailInput.value = formData.email;
        }

        // Reset form
        form.reset();

    } catch (error) {
        console.error('Registration error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

/**
 * Xử lý submit form đăng nhập
 * @param {Event} e - Submit event
 * @param {HTMLFormElement} form - Form element
 * @param {HTMLButtonElement} submitBtn - Nút submit
 * @param {Function} onLoginSuccess - Callback khi đăng nhập thành công
 * 
 * Quy trình:
 * 1. Validate email và password
 * 2. Hiển thị loading state
 * 3. Gọi API đăng nhập (hiện tại đang mock)
 * 4. Lưu session vào localStorage
 * 5. Gọi callback onLoginSuccess để chuyển trang
 */
async function handleSignInSubmit(e, form, submitBtn, onLoginSuccess) {
    e.preventDefault();

    const formData = {
        email: form.querySelector('#signin-email').value,
        password: form.querySelector('#signin-password').value
    };

    // Validate form
    const validation = validateForm(formData, false);

    if (!validation.valid) {
        // Show errors
        Object.keys(validation.errors).forEach(field => {
            const input = form.querySelector(`#signin-${field}`);
            if (input) {
                showError(input, validation.errors[field]);
            }
        });
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Đang xử lý...';

    try {
        // Attempt authentication
        const result = authenticate(formData.email, formData.password);

        if (!result.success) {
            // Show error
            alert(result.message);
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            return;
        }

        // Success - create session
        login(result.user);

        // Force reload if on cart/payment pages to show restored data
        const currentHash = window.location.hash;
        const needsReload = currentHash.includes('cart') ||
            currentHash.includes('payment') ||
            currentHash.includes('checkout');

        if (needsReload) {
            // Reload current page to display restored cart
            setTimeout(() => {
                window.location.reload();
            }, 500);
            return;
        }

        // Call success callback (redirect to home)
        if (onLoginSuccess) {
            onLoginSuccess();
        }

    } catch (error) {
        console.error('Login error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại.');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}
