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

// ==========================================
// Projects Carousel - Horizontal folder stack
// ==========================================

const carouselCards = document.querySelectorAll('.carousel-stack .project-card');
const carouselDots = document.querySelectorAll('.carousel-dot');

let currentIndex = 0;
const totalCards = carouselCards.length;

function updateCarousel() {
    carouselCards.forEach((card, index) => {
        // Calculate position relative to current index
        let position = index - currentIndex;

        if (position === 0) {
            // Current card - front and center
            card.setAttribute('data-position', '0');
        } else if (position > 0 && position <= 3) {
            // Cards waiting on the right
            card.setAttribute('data-position', position.toString());
        } else if (position < 0 && position >= -1) {
            // Most recently viewed card - on the left
            card.setAttribute('data-position', 'viewed');
        } else {
            // All other cards hidden
            card.setAttribute('data-position', 'hidden');
        }
    });

    // Update dots
    carouselDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
}

// Initialize carousel
if (carouselCards.length > 0) {
    updateCarousel();

    // Click on card to cycle to next
    carouselCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            // Don't cycle if clicking a link inside the card
            if (e.target.tagName === 'A') return;
            nextSlide();
        });
    });

    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
}
