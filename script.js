// ==========================================
// Mobile Navigation Toggle
// ==========================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close menu when clicking a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ==========================================
// Smooth Scroll for Safari
// ==========================================

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

// ==========================================
// Navbar Background on Scroll
// ==========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 11, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 11, 0.8)';
    }
});

// ==========================================
// Mobile Menu Animation
// ==========================================

const toggleSpans = navToggle.querySelectorAll('span');

navToggle.addEventListener('click', () => {
    if (navToggle.classList.contains('active')) {
        toggleSpans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        toggleSpans[1].style.opacity = '0';
        toggleSpans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        toggleSpans[0].style.transform = 'none';
        toggleSpans[1].style.opacity = '1';
        toggleSpans[2].style.transform = 'none';
    }
});

// ==========================================
// Dynamic Copyright Year
// ==========================================

const copyrightYear = document.getElementById('copyright-year');
if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
}
