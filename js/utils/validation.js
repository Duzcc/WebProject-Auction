/**
 * Validation Utilities
 * Form validation for auth + Cart and Profile validation
 */

import toast from './toast.js';

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

/**
 * ============================================
 * CART & PROFILE VALIDATION
 * ============================================
 */

/**
 * Validate Vietnamese phone number
 * Supports formats: 0xxx xxx xxx or +84 xxx xxx xxx
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export function validatePhoneNumber(phone) {
    if (!phone || typeof phone !== 'string') {
        return false;
    }
    // Remove all spaces and dashes
    const cleaned = phone.replace(/[\s\-]/g, '');
    // Vietnamese phone: starts with 0 or +84, followed by 9-10 digits
    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
    return phoneRegex.test(cleaned);
}

/**
 * Validate cart item structure and data
 * @param {Object} item - Cart item to validate
 * @param {number} quantity - Quantity to add
 * @returns {Object} { valid: boolean, error: string }
 */
export function validateCartItem(item, quantity = 1) {
    // Check if item exists
    if (!item || typeof item !== 'object') {
        return {
            valid: false,
            error: 'Dữ liệu sản phẩm không hợp lệ'
        };
    }

    // Required fields
    const requiredFields = ['id', 'name', 'type'];
    for (const field of requiredFields) {
        if (!item[field]) {
            return {
                valid: false,
                error: `Thiếu thông tin bắt buộc: ${field}`
            };
        }
    }

    // Validate price (for non-registration items) or depositAmount (for registrations)
    if (item.type === 'registration') {
        if (typeof item.depositAmount !== 'number' || item.depositAmount <= 0) {
            return {
                valid: false,
                error: 'Tiền đặt cọc không hợp lệ'
            };
        }
    } else {
        if (typeof item.price !== 'number' || item.price <= 0) {
            return {
                valid: false,
                error: 'Giá sản phẩm không hợp lệ'
            };
        }
    }

    // Validate quantity
    if (typeof quantity !== 'number' || quantity < 1 || quantity > 99) {
        return {
            valid: false,
            error: 'Số lượng phải từ 1-99'
        };
    }

    // Validate type
    const validTypes = ['car', 'motorbike', 'asset', 'registration'];
    if (!validTypes.includes(item.type)) {
        return {
            valid: false,
            error: 'Loại sản phẩm không hợp lệ'
        };
    }

    return { valid: true };
}

/**
 * Profile field validators
 */
export const profileValidators = {
    fullName: (value) => {
        if (!value || typeof value !== 'string') {
            return 'Họ tên là bắt buộc';
        }
        const trimmed = value.trim();
        if (trimmed.length < 2) {
            return 'Họ tên phải có ít nhất 2 ký tự';
        }
        if (trimmed.length > 100) {
            return 'Họ tên không được quá 100 ký tự';
        }
        return null;
    },

    email: (value) => {
        if (!value) {
            return 'Email là bắt buộc';
        }
        const emailValidation = validateEmail(value);
        if (!emailValidation.valid) {
            return emailValidation.message;
        }
        return null;
    },

    phone: (value) => {
        if (!value) {
            return 'Số điện thoại là bắt buộc';
        }
        if (!validatePhoneNumber(value)) {
            return 'Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678)';
        }
        return null;
    },

    address: (value) => {
        if (!value || typeof value !== 'string') {
            return 'Địa chỉ là bắt buộc';
        }
        const trimmed = value.trim();
        if (trimmed.length < 10) {
            return 'Địa chỉ phải có ít nhất 10 ký tự';
        }
        if (trimmed.length > 200) {
            return 'Địa chỉ không được quá 200 ký tự';
        }
        return null;
    },

    city: (value) => {
        if (!value || typeof value !== 'string') {
            return 'Thành phố/Tỉnh là bắt buộc';
        }
        const trimmed = value.trim();
        if (trimmed.length < 2) {
            return 'Tên thành phố/tỉnh không hợp lệ';
        }
        return null;
    }
};

/**
 * Validate profile field
 * @param {string} field - Field name
 * @param {any} value - Field value
 * @returns {string|null} Error message or null if valid
 */
export function validateProfileField(field, value) {
    const validator = profileValidators[field];
    if (!validator) {
        return null; // No validator for this field
    }
    return validator(value);
}

/**
 * Validate profile update object
 * @param {Object} updates - Profile updates
 * @returns {Object} { valid: boolean, errors: Object }
 */
export function validateProfileUpdate(updates) {
    const errors = {};

    Object.entries(updates).forEach(([field, value]) => {
        // Skip avatar and non-validatable fields
        if (field === 'avatar' || field === 'updatedAt') {
            return;
        }

        const error = validateProfileField(field, value);
        if (error) {
            errors[field] = error;
        }
    });

    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}

/**
 * Sanitize profile input
 * @param {Object} updates - Profile updates
 * @returns {Object} Sanitized updates
 */
export function sanitizeProfileInput(updates) {
    const sanitized = {};

    Object.entries(updates).forEach(([field, value]) => {
        if (typeof value === 'string') {
            // Trim strings
            sanitized[field] = value.trim();

            // Normalize phone number (remove spaces and dashes)
            if (field === 'phone') {
                sanitized[field] = value.replace(/[\s\-]/g, '');
            }
        } else {
            sanitized[field] = value;
        }
    });

    return sanitized;
}

/**
 * Field name mappings for user-friendly messages
 */
export const fieldNames = {
    fullName: 'Họ và tên',
    email: 'Email',
    phone: 'Số điện thoại',
    address: 'Địa chỉ',
    city: 'Thành phố/Tỉnh',
    avatar: 'Ảnh đại diện'
};
