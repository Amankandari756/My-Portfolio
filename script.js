// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class CSS
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #3182ce !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Contact form validation and submission
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Form validation functions
function validateName(name) {
    return name.trim().length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function showError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    
    errorElement.textContent = message;
    inputElement.style.borderColor = '#e53e3e';
}

function clearError(inputId) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    
    errorElement.textContent = '';
    inputElement.style.borderColor = '#e2e8f0';
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    if (!validateName(nameInput.value)) {
        showError('name', 'Name must be at least 2 characters long');
    } else {
        clearError('name');
    }
});

emailInput.addEventListener('blur', () => {
    if (!validateEmail(emailInput.value)) {
        showError('email', 'Please enter a valid email address');
    } else {
        clearError('email');
    }
});

messageInput.addEventListener('blur', () => {
    if (!validateMessage(messageInput.value)) {
        showError('message', 'Message must be at least 10 characters long');
    } else {
        clearError('message');
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    clearError('name');
    clearError('email');
    clearError('message');
    
    // Validate all fields
    let isValid = true;
    
    if (!validateName(nameInput.value)) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    if (!validateEmail(emailInput.value)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validateMessage(messageInput.value)) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate form submission
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .education-item, .certification-item');
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Typing effect for hero tagline
function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const tagline = document.querySelector('.hero-tagline');
    const originalText = tagline.textContent;
    
    setTimeout(() => {
        typeWriter(tagline, originalText, 80);
    }, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        const speed = scrolled * 0.5;
        heroContent.style.transform = `translateY(${speed}px)`;
    }
});

// Skills hover effect enhancement
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project card flip effect on mobile
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            this.classList.toggle('flipped');
        }
    });
});

// Add project card flip styles
const flipStyle = document.createElement('style');
flipStyle.textContent = `
    @media screen and (max-width: 768px) {
        .project-card {
            transition: transform 0.6s;
            transform-style: preserve-3d;
            cursor: pointer;
        }
        
        .project-card.flipped {
            transform: rotateY(180deg);
        }
        
        .project-card .project-links {
            transform: rotateY(180deg);
            backface-visibility: hidden;
        }
    }
`;
document.head.appendChild(flipStyle);

// Copyright year update
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} Aman Singh Kandari. All rights reserved.`;
    }
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #3182ce;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.backgroundColor = '#2c5aa0';
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.backgroundColor = '#3182ce';
    scrollToTopBtn.style.transform = 'scale(1)';
});

// Interactive mouse movement effects
document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 100;
    const mouseY = (e.clientY / window.innerHeight) * 100;
    
    // Update CSS custom properties for mouse position
    document.documentElement.style.setProperty('--mouse-x', mouseX + '%');
    document.documentElement.style.setProperty('--mouse-y', mouseY + '%');
    
    // Create subtle parallax effect on hero elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const moveX = (mouseX - 50) * 0.05;
        const moveY = (mouseY - 50) * 0.05;
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Dynamic background color shifts based on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    // Subtle shifts within professional blue range
    document.body.style.filter = `hue-rotate(${scrollPercent * 15}deg) brightness(${1 - scrollPercent * 0.1})`;
});

// Add floating particles
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 15}s linear infinite;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles when page loads
window.addEventListener('load', createParticles);

// Add ripple effect on click
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        transform: translate(-50%, -50%) scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add animation classes and observe elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .education-item, .certification-item, .resume-download');
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});
