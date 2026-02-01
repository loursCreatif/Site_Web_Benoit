/**
 * ÉLECTRICIEN PRO - Main JavaScript
 * Point d'entrée principal
 */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser tous les modules
    initLoader();
    initNavigation();
    initScrollAnimations();
    initParticles();
    initCounters();
    initSimulator();
    initGallery();
    initAccordion();
    initFormValidation();
    initBackToTop();
    initSmoothScroll();
});

/**
 * LOADER
 * Animation de chargement au démarrage
 */
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    // Masquer le loader après le chargement
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loader--hidden');

            // Supprimer du DOM après l'animation
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });
}

/**
 * NAVIGATION
 * Header sticky et menu mobile
 */
function initNavigation() {
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');

    // Header sticky au scroll
    if (header) {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // Menu mobile toggle
    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('nav__toggle--active');
            navList.classList.toggle('nav__list--open');
            document.body.classList.toggle('menu-open');
        });

        // Fermer le menu au clic sur un lien
        const navLinks = navList.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('nav__toggle--active');
                navList.classList.remove('nav__list--open');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Active link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav__link--active');
            }
        });
    }, { passive: true });
}

/**
 * SCROLL ANIMATIONS
 * Révélation des éléments au scroll
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * PARTICLES
 * Particules animées en arrière-plan
 */
function initParticles() {
    const containers = document.querySelectorAll('.particles-container');

    containers.forEach(container => {
        const particleCount = parseInt(container.dataset.particles) || 20;

        for (let i = 0; i < particleCount; i++) {
            createParticle(container);
        }
    });
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Position aléatoire
    const x = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 10 + Math.random() * 10;
    const size = 2 + Math.random() * 4;

    particle.style.left = `${x}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    // Couleur aléatoire (bleu ou vert néon)
    const colors = ['#00D4FF', '#39FF14'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    container.appendChild(particle);
}

/**
 * COUNTERS
 * Animation des compteurs de statistiques
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter[data-target]');

    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                counter.classList.add('counter--visible');
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * SMOOTH SCROLL
 * Défilement fluide pour les ancres
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * BACK TO TOP
 * Bouton retour en haut
 */
function initBackToTop() {
    const backToTop = document.querySelector('.footer__top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('footer__top--visible');
        } else {
            backToTop.classList.remove('footer__top--visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * RIPPLE EFFECT
 * Effet d'ondulation sur les boutons
 */
document.querySelectorAll('.ripple').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple__effect';

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

/**
 * UTILITY FUNCTIONS
 */

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format number with separators
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
