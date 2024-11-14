// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    if (section.id !== 'home') {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    }
});

// Add hover effect to experience items
document.querySelectorAll('.experience-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});

// Carousel Navigation
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const cards = Array.from(track.children);
    const cardWidth = 400 + 40; // card width + gap
    let currentIndex = 0;

    // Clone multiple cards for smoother infinite loop
    const numClones = 2; // Number of clones on each side
    
    // Add clones to the end
    for (let i = 0; i < numClones; i++) {
        cards.slice(0, numClones).forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Add clones to the beginning
    for (let i = 0; i < numClones; i++) {
        cards.slice(-numClones).reverse().forEach(card => {
            const clone = card.cloneNode(true);
            track.insertBefore(clone, track.firstChild);
        });
    }

    // Set initial position
    currentIndex = numClones;
    track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;

    function updateCarousel(direction) {
        track.style.transition = 'transform 0.5s ease-in-out';
        currentIndex += direction;
        track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;

        // Check if we need to jump to the other end
        track.addEventListener('transitionend', function jumpToEnd() {
            track.removeEventListener('transitionend', jumpToEnd);
            
            if (currentIndex <= numClones - 1) {
                // If we've gone too far left, jump to the right end
                track.style.transition = 'none';
                currentIndex = track.children.length - (numClones * 2) + (currentIndex - 1);
                track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
            } else if (currentIndex >= track.children.length - numClones) {
                // If we've gone too far right, jump to the left end
                track.style.transition = 'none';
                currentIndex = numClones + (currentIndex - (track.children.length - numClones));
                track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
            }
            
            // Re-enable transitions after the jump
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            }, 10);
        }, { once: true });
    }

    prevButton.addEventListener('click', () => updateCarousel(-1));
    nextButton.addEventListener('click', () => updateCarousel(1));
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    let menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    function toggleMenu() {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    navToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});
