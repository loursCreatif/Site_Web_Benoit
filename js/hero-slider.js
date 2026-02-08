function initHeroSlider() {
    const images = document.querySelectorAll('.hero__slider-img');
    if (images.length === 0) return false;

    const wrapper = images[0].closest('.hero__image-wrapper');
    if (!wrapper) return false;

    if (wrapper.dataset.sliderInitialized === 'true') return true;

    const intervalMs = 5000;
    let currentIndex = 0;
    let rafId = null;
    let lastSwitchAt = performance.now();

    function setActive(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    function tick(now) {
        if (!document.hidden) {
            const elapsed = now - lastSwitchAt;
            if (elapsed >= intervalMs) {
                const steps = Math.floor(elapsed / intervalMs);
                currentIndex = (currentIndex + steps) % images.length;
                setActive(currentIndex);
                lastSwitchAt += steps * intervalMs;
            }
        }

        rafId = requestAnimationFrame(tick);
    }

    function handleVisibilityChange() {
        if (!document.hidden) {
            lastSwitchAt = performance.now();
        }
    }

    setActive(currentIndex);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    rafId = requestAnimationFrame(tick);
    wrapper.dataset.sliderInitialized = 'true';

    return true;
}

function bootstrapHeroSlider() {
    if (initHeroSlider()) return;

    const observer = new MutationObserver(() => {
        if (initHeroSlider()) observer.disconnect();
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapHeroSlider);
} else {
    bootstrapHeroSlider();
}
