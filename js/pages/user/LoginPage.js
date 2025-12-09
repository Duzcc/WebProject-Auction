import { createElement } from '../../utils/dom.js';
import { validateEmail, validatePassword, validateName, showError, clearError, validateForm } from '../../utils/validation.js';
import { login } from '../../utils/auth.js';

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

    // Social icons
    const socialIcons = createSocialIcons();
    form.appendChild(socialIcons);

    // Divider text
    const divider = createElement('span', {
        className: 'text-xs text-gray-500 my-4'
    });
    divider.textContent = 'hoặc sử dụng email và mật khẩu';
    form.appendChild(divider);

    // Email input
    const emailInput = createElement('input', {
        type: 'email',
        placeholder: 'Email',
        id: 'signin-email',
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
        id: 'signin-password',
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

    // Submit button with ripple effect
    const submitBtn = createElement('button', {
        type: 'submit',
        className: 'bg-gradient-to-r from-[#2563EB] to-[#1E40AF] text-white font-semibold py-3 px-12 rounded-lg mt-4 uppercase text-xs tracking-wider hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-ripple'
    });
    submitBtn.textContent = 'Đăng Nhập';
    form.appendChild(submitBtn);

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
 * Tạo các nút đăng nhập qua mạng xã hội
 * @returns {HTMLElement} Container chứa các icon social media
 * 
 * Hiển thị các nút:
 * - Google
 * - Facebook  
 * - GitHub
 * - LinkedIn
 */
function createSocialIcons() {
    const container = createElement('div', {
        className: 'flex gap-3 my-4'
    });

    const socials = [
        { icon: 'fa-google-plus-g', label: 'Google' },
        { icon: 'fa-facebook-f', label: 'Facebook' },
        { icon: 'fa-github', label: 'GitHub' },
        { icon: 'fa-linkedin-in', label: 'LinkedIn' }
    ];

    socials.forEach(social => {
        const link = createElement('a', {
            href: '#',
            className: 'border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center hover:border-[#2563EB] hover:text-[#2563EB] hover:scale-110 transition-all duration-300',
            'aria-label': `Login with ${social.label}`
        });
        link.innerHTML = `<i class="fab ${social.icon}"></i>`;
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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success
        alert('Đăng ký thành công! Vui lòng đăng nhập.');

        // Switch to sign in form
        const container = form.closest('#login-container');
        container.classList.remove('active');

        // Reset form
        form.reset();

    } catch (error) {
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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Save user session
        login({
            email: formData.email,
            name: formData.email.split('@')[0] // Extract name from email
        });

        // Success - call the callback
        if (onLoginSuccess) {
            onLoginSuccess();
        }

    } catch (error) {
        alert('Email hoặc mật khẩu không đúng.');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}
