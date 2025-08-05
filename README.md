# Frontend Mentor - Conference ticket generator solution

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Complete the form with their details
- Receive form validation messages if:
  - Any field is missed
  - The email address is not formatted correctly
  - The avatar upload is too big or the wrong image format
- Complete the form only using their keyboard
- Have inputs, form field hints, and error messages announced on their screen reader
- See the generated conference ticket when they successfully submit the form
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

**Desktop**

![](https://i.ibb.co/rKKb6GDZ/screencapture-192-168-1-52-51651-index-html-2025-08-06-00-17-30.png)

**Mobile**

![](https://i.ibb.co/xqhXbHMW/screencapture-192-168-1-52-51651-index-html-2025-08-06-00-19-35.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Vanilla JavaScript
- File upload handling with drag and drop
- Form validation
- Accessibility features (ARIA labels, screen reader support)
- Responsive design

### What I learned

This project helped me strengthen my skills in several key areas:

**Form Validation & Error Handling**
```javascript
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
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('error');
}
```

**File Upload with Drag & Drop**
```javascript
function handleAvatarUpload(file) {
    const validation = validateImageFile(file);
    
    if (!validation.valid) {
        const avatarInfo = $('.avatar-info p');
        avatarInfo.textContent = validation.message;
        $('.avatar-info').style.color = 'var(--orange)';
        $('.avatar-container').classList.add('error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        selectedAvatar = e.target.result;
        // Display preview with remove/change buttons
    };
    reader.readAsDataURL(file);
}
```

**Accessibility Implementation**
```css
input.focused,
.avatar-container.focused {
    outline: 2px solid var(--orange);
    outline-offset: 2px;
}
```

**Responsive Design with CSS Custom Properties**
```css
:root {
    --font-family: "Inconsolata", monospace;
    --white: hsl(0, 0%, 100%);
    --gray-light: hsl(252, 6%, 83%);
    --orange: hsl(7, 88%, 67%);
    --orange-dark: hsl(7, 71%, 60%);
}
```

### Continued development

Areas I want to continue focusing on in future projects:

- **Advanced JavaScript Patterns**: Implementing more sophisticated state management and event handling patterns
- **Performance Optimization**: Learning techniques to optimize file uploads and image processing
- **Testing**: Adding unit tests and integration tests for form validation and user interactions
- **Animation & Micro-interactions**: Enhancing user experience with smooth transitions and feedback
- **Progressive Web App Features**: Adding offline capabilities and service workers

### Useful resources

- [MDN Web Docs - File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API) - Essential for understanding file upload handling and drag & drop functionality
- [Web.dev - Accessibility](https://web.dev/accessibility/) - Great resource for implementing proper accessibility features
- [CSS-Tricks - Custom Properties](https://css-tricks.com/a-complete-guide-to-custom-properties/) - Comprehensive guide to CSS custom properties for maintainable styling
- [Frontend Mentor](https://www.frontendmentor.io/) - Excellent platform for practicing real-world frontend development challenges

## Author

- Frontend Mentor - [@bitc0de](https://www.frontendmentor.io/profile/bitc0de)
- GitHub - [@bitc0de](https://github.com/bitc0de)
