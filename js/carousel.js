/**
 * CAROUSEL
 * Témoignages clients
 */

function initCarousel() {
    const carousel = document.querySelector('.testimonials__carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.testimonials__slides');
    const slides = carousel.querySelectorAll('.testimonials__slide');
    const prevBtn = carousel.querySelector('.testimonials__btn--prev');
    const nextBtn = carousel.querySelector('.testimonials__btn--next');
    const dots = carousel.querySelectorAll('.testimonials__dot');

    if (!slides.length) return;

    let currentSlide = 0;
    let autoplayInterval;
    const autoplayDelay = 5000;

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Mettre à jour les dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('testimonials__dot--active', i === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Événements
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Pause au survol
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Touch swipe
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Initialisation
    goToSlide(0);
    startAutoplay();
}
