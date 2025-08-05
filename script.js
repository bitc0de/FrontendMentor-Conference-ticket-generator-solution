import { $, $$ } from "./dom.js";

let selectedAvatar = null;

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(field, message) {
    let errorElement = field.parentNode.querySelector(`[data-field-error="${field.id || field.className}"]`);
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.setAttribute('data-field-error', field.id || field.className);
        errorElement.setAttribute('role', 'alert');
        errorElement.setAttribute('aria-live', 'polite');
    }
    
    errorElement.textContent = message;
    
    if (!field.parentNode.querySelector(`[data-field-error="${field.id || field.className}"]`)) {
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('error');
}

function clearError(field) {
    const errorElement = field.parentNode.querySelector(`[data-field-error="${field.id || field.className}"]`);
    if (errorElement) {
        errorElement.remove();
    }
    field.removeAttribute('aria-invalid');
    field.classList.remove('error');
}

function validateImageFile(file) {
    const maxSize = 500 * 1024;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    
    if (!allowedTypes.includes(file.type)) {
        return { valid: false, message: 'Only JPG or PNG files are allowed' };
    }
    
    if (file.size > maxSize) {
        return { valid: false, message: 'The file is too large (maximum 500KB)' };
    }
    
    return { valid: true };
}

function removeImage() {
    selectedAvatar = null;
    const avatarContainer = $('.avatar-container');
    avatarContainer.innerHTML = `
        <div class="upload-icon"></div>
        <p>Drag and drop or click to upload</p>
    `;
    
    const avatarInfo = $('.avatar-info p');
    avatarInfo.textContent = 'Upload your photo (JPG or PNG, max size: 500KB)';
    $('.avatar-info').style.color = 'var(--gray-light)';
    avatarContainer.classList.remove('error');
    
    setupInitialAvatarContainer();
}

function clearAvatarContainerListeners() {
    const avatarContainer = $('.avatar-container');
    
    const newContainer = avatarContainer.cloneNode(true);
    avatarContainer.parentNode.replaceChild(newContainer, avatarContainer);
    
    return newContainer;
}

function setupInitialAvatarContainer() {
    const avatarContainer = clearAvatarContainerListeners();
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        avatarContainer.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    avatarContainer.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleAvatarUpload(files[0]);
        }
    });
    
    avatarContainer.addEventListener('click', (e) => {
        if (!selectedAvatar) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/jpeg,image/jpg,image/png';
            input.onchange = (e) => {
                if (e.target.files.length > 0) {
                    handleAvatarUpload(e.target.files[0]);
                }
            };
            input.click();
        }
    });
}

function changeImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/jpg,image/png';
    input.onchange = (e) => {
        if (e.target.files.length > 0) {
            handleAvatarUpload(e.target.files[0]);
        }
    };
    input.click();
}

function handleAvatarUpload(file) {
    const validation = validateImageFile(file);
    
    if (!validation.valid) {
        const avatarInfo = $('.avatar-info p');
        avatarInfo.textContent = validation.message;
        
        $('.avatar-info').style.color = 'var(--orange)';
        
        $('.avatar-container').classList.add('error');
        return;
    }
    
    const avatarInfo = $('.avatar-info p');
    avatarInfo.textContent = 'Upload your photo (JPG or PNG, max size: 500KB)';
    $('.avatar-info').style.color = 'var(--gray-light)';
    $('.avatar-container').classList.remove('error');
    
    const reader = new FileReader();
    reader.onload = function(e) {
        selectedAvatar = e.target.result;
        
    const avatarPreview = $('.avatar-container');
    avatarPreview.innerHTML = `
        <img src="${selectedAvatar}" alt="Avatar preview" style="max-width: 100px; max-height: 100px; border-radius: 50%; margin-bottom: 10px;">
        <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
            <button class="remove-image-btn" style="
                background-color: transparent;
                border: 1px solid var(--gray);
                border-radius: 5px;
                padding: 5px 10px;
                color: var(--gray-light);
                font-size: 12px;
                cursor: pointer;
                font-weight: 500;
            ">Remove Image</button>
            <button class="change-image-btn" style="
                background-color: transparent;
                border: 1px solid var(--gray);
                border-radius: 5px;
                padding: 5px 10px;
                color: var(--gray-light);
                font-size: 12px;
                cursor: pointer;
                font-weight: 500;
            ">Change Image</button>
        </div>
    `;
    
    const removeBtn = $('.remove-image-btn');
    const changeBtn = $('.change-image-btn');
    
    removeBtn.replaceWith(removeBtn.cloneNode(true));
    changeBtn.replaceWith(changeBtn.cloneNode(true));
    
    $('.remove-image-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        removeImage();
    });
    $('.change-image-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        changeImage();
    });
    };
    reader.readAsDataURL(file);
}

function setupAvatarUpload() {
    const avatarContainer = $('.avatar-container');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        avatarContainer.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    avatarContainer.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleAvatarUpload(files[0]);
        }
    });
    
    avatarContainer.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/jpeg,image/jpg,image/png';
        input.onchange = (e) => {
            if (e.target.files.length > 0) {
                handleAvatarUpload(e.target.files[0]);
            }
        };
        input.click();
    });
}

function generateTicket(formData) {
    const avatarUrl = formData.avatar || './assets/images/image-avatar.jpg';
    
    const ticketHTML = `
        <div class="ticket">
            <div class="ticket-content">
                <div class="ticket-header">
                    <img src="./assets/images/logo-full.svg" alt="Logo" class="ticket-logo">
                    <span class="ticket-date">Jan 31, 2025 / Austin, TX</span>
                    <span class="ticket-number">#01609</span>
                </div>
                <div class="ticket-user-info">
                    <img src="${avatarUrl}" alt="User Avatar" class="user-avatar">
                    <div class="user-details">
                        <h3 class="user-name">${formData.name}</h3>
                        <p class="user-email">${formData.email}</p>
                        <div class="github-info">
                            <img src="./assets/images/icon-github.svg" alt="GitHub" class="github-icon">
                            <p class="github-username">${formData.github}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return ticketHTML;
}

function showTicket(ticketHTML) {
    $('form').style.display = 'none';
    
    const ticketContainer = document.createElement('div');
    ticketContainer.className = 'ticket-container';
    ticketContainer.innerHTML = ticketHTML;
        
    $('main').appendChild(ticketContainer);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: $(".name-input").value.trim(),
        email: $(".email-input").value.trim(),
        github: $(".github-input").value.trim(),
        avatar: selectedAvatar
    };
    
    clearError($(".name-input"));
    clearError($(".email-input"));
    clearError($(".github-input"));
    
    const avatarInfo = $('.avatar-info p');
    avatarInfo.textContent = 'Upload your photo (JPG or PNG, max size: 500KB)';
    $('.avatar-info').style.color = 'var(--gray-light)';
    $('.avatar-container').classList.remove('error');
    
    let hasErrors = false;
    
    if (!formData.name) {
        showError($(".name-input"), "The name is required");
        hasErrors = true;
    }
    
    if (!formData.email) {
        showError($(".email-input"), "The email is required");
        hasErrors = true;
    } else if (!isValidEmail(formData.email)) {
        showError($(".email-input"), "Invalid email format");
        hasErrors = true;
    }
    
    if (!formData.github) {
        showError($(".github-input"), "The GitHub username is required");
        hasErrors = true;
    }
    
    if (hasErrors) {
        return;
    }
    
    const ticketHTML = generateTicket(formData);
    showTicket(ticketHTML);
}

document.addEventListener('DOMContentLoaded', () => {
    setupInitialAvatarContainer();
    
    $(".submit-button").addEventListener("click", handleFormSubmit);
    
    const inputs = $$('input, button, .avatar-container');
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('submit-button')) {
                handleFormSubmit(e);
            }
        });
        
        if (input.type === 'text' || input.type === 'email') {
            const label = input.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                input.setAttribute('aria-labelledby', label.id || label.textContent);
            }
        }
    });
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.classList.remove('focused');
        });
    });
});