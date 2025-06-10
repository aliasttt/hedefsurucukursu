// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
                input.classList.add('shake');
                setTimeout(() => input.classList.remove('shake'), 500);
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
            setTimeout(() => {
                alert('Form submitted successfully!');
                form.reset();
                submitBtn.innerHTML = 'Gönder';
            }, 1500);
        }
    });
}

// Initialize all forms
document.addEventListener('DOMContentLoaded', function() {
    validateForm('contactForm');
    validateForm('courseForm');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle with animation
const navbarToggler = document.querySelector('.navbar-toggler');
if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        navbarCollapse.classList.toggle('show');
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.style.maxHeight = navbarCollapse.scrollHeight + "px";
        } else {
            navbarCollapse.style.maxHeight = "0";
        }
    });
}

// FAQ Accordion with animation
const accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('collapsed');
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// Image lazy loading with fade effect and placeholder
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const placeholder = img.previousElementSibling; // Assuming placeholder is directly before img
                
                img.src = img.dataset.src;
                img.onload = function() {
                    img.classList.add('fade-in');
                    img.removeAttribute('data-src');
                    if (placeholder && placeholder.classList.contains('placeholder-img')) {
                        placeholder.style.display = 'none';
                    }
                    img.style.display = 'block'; // Show image on load
                    observer.unobserve(img);
                };
                img.onerror = function() {
                    if (placeholder && placeholder.classList.contains('placeholder-img')) {
                        placeholder.style.display = 'block';
                    }
                    img.style.display = 'none'; // Hide broken image icon
                    observer.unobserve(img);
                };
            }
        });
    });

    lazyImages.forEach(img => {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder-img';
        img.parentNode.insertBefore(placeholder, img);
        img.style.display = 'none'; // Hide image until loaded or error
        imageObserver.observe(img);
    });
});

// Add loading animation if it doesn't exist
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.loading')) {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = '<div class="loading-spinner"></div>';
        document.body.insertBefore(loading, document.body.firstChild);
    }
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--dark-gray)';
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const timerProgress = document.querySelector('.timer-progress');
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Reset and start timer
    timerProgress.style.width = '0';
    timerProgress.style.transition = 'none';
    setTimeout(() => {
        timerProgress.style.transition = 'width 5s linear';
        timerProgress.style.width = '100%';
    }, 50);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function startSlider() {
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, 5000);
}

// Initialize slider
if (slides.length > 0) {
    startSlider();
}

// Slider Navigation
document.querySelector('.slider-arrow.prev').addEventListener('click', () => {
    clearInterval(slideInterval);
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    startSlider();
});

document.querySelector('.slider-arrow.next').addEventListener('click', () => {
    clearInterval(slideInterval);
    nextSlide();
    startSlider();
});

// Dot Navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        currentSlide = index;
        showSlide(currentSlide);
        startSlider();
    });
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Scroll Animation with different directions
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const direction = entry.target.dataset.direction || 'up';
            entry.target.classList.add(`fade-in-${direction}`);
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// Add hover effect to cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        
        ripple.classList.add('active');
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Mobile Navbar Toggle Fix
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }

    // Add WhatsApp fixed button if it doesn't exist
    if (!document.querySelector('.whatsapp-fixed')) {
        const whatsappFixed = document.createElement('div');
        whatsappFixed.className = 'whatsapp-fixed';
        whatsappFixed.innerHTML = `
            <a href="https://wa.me/YOUR_PHONE_NUMBER" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-whatsapp"></i>
            </a>
        `;
        document.body.appendChild(whatsappFixed);
    }
});

// Loading Animation
window.addEventListener('load', function() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.classList.add('hidden');
    }
}); 