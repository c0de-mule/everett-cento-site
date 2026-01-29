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
        // Calculate position relative to current index (circular)
        let diff = index - currentIndex;

        // Wrap around for circular effect
        if (diff > totalCards / 2) diff -= totalCards;
        if (diff < -totalCards / 2) diff += totalCards;

        if (diff === 0) {
            // Current card - front and center
            card.setAttribute('data-position', '0');
        } else if (diff === 1 || (diff === -(totalCards - 1))) {
            // Next card (to the right)
            card.setAttribute('data-position', '1');
        } else if (diff === 2 || (diff === -(totalCards - 2))) {
            // Two ahead (further right)
            card.setAttribute('data-position', '2');
        } else if (diff === -1 || (diff === (totalCards - 1))) {
            // Previous card (to the left)
            card.setAttribute('data-position', 'viewed');
        } else {
            // All other cards hidden at the back
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

    // Click on card - direction depends on which side of screen you click
    carouselCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            // Don't cycle if clicking a link inside the card
            if (e.target.tagName === 'A') return;

            // Add pulse animation
            card.classList.add('clicked');
            setTimeout(() => {
                card.classList.remove('clicked');
            }, 400);

            // Determine direction based on click position relative to screen center
            const screenCenter = window.innerWidth / 2;
            if (e.clientX < screenCenter) {
                prevSlide(); // Click on left side - rotate left
            } else {
                nextSlide(); // Click on right side - rotate right
            }
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
