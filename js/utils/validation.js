/**
 * Form Validation Utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {Object} - { valid: boolean, message: string }
 */
export function validateEmail(email) {
    if (!email || email.trim() === '') {
        return { valid: false, message: 'Email là bắt buộc' };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Email không hợp lệ' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @param {boolean} isSignUp - Whether this is for sign up (stricter validation)
 * @returns {Object} - { valid: boolean, message: string }
 */
export function validatePassword(password, isSignUp = false) {
    if (!password || password.trim() === '') {
        return { valid: false, message: 'Mật khẩu là bắt buộc' };
    }
    
    if (isSignUp) {
        if (password.length < 8) {
            return { valid: false, message: 'Mật khẩu phải có ít nhất 8 ký tự' };
        }
        
        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: 'Mật khẩu phải có ít nhất 1 chữ hoa' };
        }
        
        if (!/[a-z]/.test(password)) {
            return { valid: false, message: 'Mật khẩu phải có ít nhất 1 chữ thường' };
        }
        
        if (!/[0-9]/.test(password)) {
            return { valid: false, message: 'Mật khẩu phải có ít nhất 1 số' };
        }
    } else {
        // For sign in, just check it's not empty
        if (password.length < 6) {
            return { valid: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
        }
    }
    
    return { valid: true, message: '' };
}

/**
 * Validate name field
 * @param {string} name - Name to validate
 * @returns {Object} - { valid: boolean, message: string }
 */
export function validateName(name) {
    if (!name || name.trim() === '') {
        return { valid: false, message: 'Tên là bắt buộc' };
    }
    
    if (name.trim().length < 2) {
        return { valid: false, message: 'Tên phải có ít nhất 2 ký tự' };
    }
    
    if (name.trim().length > 50) {
        return { valid: false, message: 'Tên không được quá 50 ký tự' };
    }
    
    return { valid: true, message: '' };
}

/**
 * Show error message for an input field
 * @param {HTMLElement} inputElement - The input element
 * @param {string} message - Error message to display
 */
export function showError(inputElement, message) {
    // Remove any existing error
    clearError(inputElement);
    
    // Add error styling to input
    inputElement.classList.add('border-blue-500', 'border-2');
    inputElement.classList.remove('border-gray-200');
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-500 text-xs mt-1 error-message';
    errorDiv.textContent = message;
    
    // Insert error message after input
    inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
}

/**
 * Clear error message for an input field
 * @param {HTMLElement} inputElement - The input element
 */
export function clearError(inputElement) {
    // Remove error styling
    inputElement.classList.remove('border-blue-500', 'border-2');
    inputElement.classList.add('border-gray-200');
    
    // Remove error message if exists
    const errorMessage = inputElement.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

/**
 * Validate entire form
 * @param {Object} formData - Form data to validate
 * @param {boolean} isSignUp - Whether this is sign up form
 * @returns {Object} - { valid: boolean, errors: Object }
 */
export function validateForm(formData, isSignUp = false) {
    const errors = {};
    
    if (isSignUp) {
        const nameValidation = validateName(formData.name);
        if (!nameValidation.valid) {
            errors.name = nameValidation.message;
        }
    }
    
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) {
        errors.email = emailValidation.message;
    }
    
    const passwordValidation = validatePassword(formData.password, isSignUp);
    if (!passwordValidation.valid) {
        errors.password = passwordValidation.message;
    }
    
    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}
