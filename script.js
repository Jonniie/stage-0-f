document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    
    if (!timeElement) {
        console.error('Time element not found');
        return;
    }
    
    function updateTime() {
        const currentTime = Date.now();
        timeElement.textContent = currentTime.toString();
        timeElement.setAttribute('title', `Last updated: ${new Date(currentTime).toLocaleString()}`);
    }
    
    updateTime();
    
    const timeInterval = setInterval(updateTime, 1000);
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('social-list') && e.key === 'Enter') {
            const focusedLink = document.activeElement;
            if (focusedLink.tagName === 'A') {
                focusedLink.click();
            }
        }
    });
    
    const socialLinks = document.querySelectorAll('[data-testid^="test-user-social-"]');
    socialLinks.forEach(link => {
        link.setAttribute('aria-label', `Visit ${link.textContent} profile (opens in new tab)`);
        
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    const avatarContainer = document.querySelector('.avatar-container');
    const avatar = document.querySelector('#profile-avatar');
    const fileInput = document.querySelector('#avatar-upload');
    
    if (avatarContainer && fileInput && avatar) {
        avatarContainer.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (!file.type.startsWith('image/')) {
                    alert('Please select a valid image file.');
                    return;
                }
                
                if (file.size > 5 * 1024 * 1024) {
                    alert('Image size should be less than 5MB.');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatar.src = e.target.result;
                    avatar.alt = `Profile picture of ${document.querySelector('[data-testid="test-user-name"]').textContent}`;
                    
                    localStorage.setItem('profileAvatar', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
        
        const savedAvatar = localStorage.getItem('profileAvatar');
        if (savedAvatar) {
            avatar.src = savedAvatar;
        }
        
        avatar.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        avatar.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjIwIiBmaWxsPSIjQ0NDQ0NDIi8+CjxwYXRoIGQ9Ik01MCAxMTBMMTUwIDExMEwxMzAgMTMwTDIwIDEzMEw1MCAxMTBaIiBmaWxsPSIjQ0NDQ0NDIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIj5BdmF0YXI8L3RleHQ+Cjwvc3ZnPg==';
            this.alt = 'Default avatar image';
        });
        
        avatar.style.opacity = '1';
        avatar.style.transition = 'opacity 0.3s ease';
    }
    
    
    window.addEventListener('beforeunload', function() {
        clearInterval(timeInterval);
    });
    
});


function initializeContactForm() {
    const form = document.querySelector('[data-testid="test-contact-form"]');
    const successMessage = document.querySelector('[data-testid="test-contact-success"]');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        const isValid = validateForm();
        
        if (isValid) {
            showSuccessMessage();
            form.reset();
        }
    });
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm() {
    const form = document.querySelector('[data-testid="test-contact-form"]');
    const name = form.querySelector('[data-testid="test-contact-name"]');
    const email = form.querySelector('[data-testid="test-contact-email"]');
    const subject = form.querySelector('[data-testid="test-contact-subject"]');
    const message = form.querySelector('[data-testid="test-contact-message"]');
    
    let isValid = true;
    
    if (!validateField(name)) isValid = false;
    if (!validateField(email)) isValid = false;
    if (!validateField(subject)) isValid = false;
    if (!validateField(message)) isValid = false;
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('data-testid');
    const errorElement = document.querySelector(`[data-testid="test-contact-error-${fieldName.split('-').pop()}"]`);
    
    if (!value) {
        showFieldError(field, errorElement, 'This field is required');
        return false;
    }
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, errorElement, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (fieldName.includes('message') && value.length < 10) {
        showFieldError(field, errorElement, 'Message must be at least 10 characters long');
        return false;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, errorElement, message) {
    field.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    const fieldName = field.getAttribute('data-testid');
    const errorElement = document.querySelector(`[data-testid="test-contact-error-${fieldName.split('-').pop()}"]`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

function showSuccessMessage() {
    const successMessage = document.querySelector('[data-testid="test-contact-success"]');
    if (successMessage) {
        successMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        successMessage.classList.add('show');
        
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
}

window.ProfileCard = {
    updateTime: function() {
        const timeElement = document.querySelector('[data-testid="test-user-time"]');
        if (timeElement) {
            const currentTime = Date.now();
            
            timeElement.textContent = currentTime.toString();
            return currentTime;
        }
        return null;
    },
    
    getCurrentTime: function() {
        return Date.now();
    },
    
    uploadAvatar: function(file) {
        const avatar = document.querySelector('#profile-avatar');
        const fileInput = document.querySelector('#avatar-upload');
        
        if (avatar && fileInput) {
            // Create FileReader to convert file to URL
            const reader = new FileReader();
            reader.onload = function(e) {
                avatar.src = e.target.result;
                localStorage.setItem('profileAvatar', e.target.result);
            };
            reader.readAsDataURL(file);
            return true;
        }
        return false;
    },
    
    getAvatarSrc: function() {
        const avatar = document.querySelector('#profile-avatar');
        return avatar ? avatar.src : null;
    },
    
    getAllTestIds: function() {
        const testIds = [
            'test-profile-card',
            'test-user-name',
            'test-user-bio',
            'test-user-time',
            'test-user-avatar',
            'test-user-social-links',
            'test-user-social-twitter',
            'test-user-social-linkedin',
            'test-user-social-github',
            'test-user-hobbies',
            'test-user-dislikes'
        ];
        
        const foundElements = {};
        testIds.forEach(testId => {
            const element = document.querySelector(`[data-testid="${testId}"]`);
            foundElements[testId] = element !== null;
        });
        
        return foundElements;
    }
};

