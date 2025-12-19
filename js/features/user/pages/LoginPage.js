import { createElement } from '../../../shared/utils/dom.js';
import { validateEmail, validatePassword, validateName, showError, clearError, validateForm } from '../utils/validation.js';
import { login, register, authenticate } from '../utils/auth.js';
import { createSignInForm } from '../components/SignInFormComponent.js';
import { createSignUpForm } from '../components/SignUpFormComponent.js';

/**
 * LoginPage Component
 * Combined login/signup page with toggle animation
 * Code is now modularized into separate components
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

    // Sign Up Form (using component)
    const signUpForm = createSignUpForm();
    mainContainer.appendChild(signUpForm);

    // Sign In Form (using component)
    const signInForm = createSignInForm(onLoginSuccess);
    mainContainer.appendChild(signInForm);

    // Toggle Panel
    const togglePanel = createTogglePanel();
    mainContainer.appendChild(togglePanel);

    container.appendChild(mainContainer);

    // Setup event listeners for toggle buttons
    setupEventListeners(mainContainer);

    return container;
}

/**
 * Create toggle panel
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
 * Setup event listeners for toggle buttons
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
        // Import register function
        const { register } = await import('../../utils/auth.js');

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
        // Import auth functions
        const { authenticate, login } = await import('../../utils/auth.js');

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
