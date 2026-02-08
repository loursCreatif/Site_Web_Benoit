/**
 * GALERIE
 * Filtre dynamique et lightbox
 */

function initGallery() {
    const gallery = document.querySelector('.gallery__grid');
    if (!gallery) return;
    if (gallery.dataset.initialized === 'true') return;

    const items = gallery.querySelectorAll('.gallery__item');
    const filters = document.querySelectorAll('.gallery__filter');
    const hideTimers = new WeakMap();
    let filterToken = 0;

    function clearHideTimer(item) {
        const timerId = hideTimers.get(item);
        if (timerId) {
            clearTimeout(timerId);
            hideTimers.delete(item);
        }
    }

    // Filtres
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Mettre à jour le bouton actif
            filters.forEach(f => f.classList.remove('gallery__filter--active'));
            filter.classList.add('gallery__filter--active');

            const category = filter.dataset.filter;
            const currentToken = ++filterToken;

            // Filtrer les éléments
            items.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    clearHideTimer(item);
                    item.classList.remove('gallery__item--hidden');
                    item.style.display = '';
                } else {
                    clearHideTimer(item);
                    item.classList.add('gallery__item--hidden');
                    const timerId = setTimeout(() => {
                        // Ignore les timers obsolètes créés par un filtre précédent
                        if (currentToken !== filterToken) return;
                        if (item.classList.contains('gallery__item--hidden')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                    hideTimers.set(item, timerId);
                }
            });
        });
    });

    gallery.dataset.initialized = 'true';

    // Lightbox
    initLightbox();
}

function initLightbox() {
    const items = document.querySelectorAll('.gallery__item');
    if (!items.length) return;

    // Créer la lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
    <div class="lightbox__content">
      <button class="lightbox__close" aria-label="Fermer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
      <button class="lightbox__nav lightbox__nav--prev" aria-label="Précédent">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <button class="lightbox__nav lightbox__nav--next" aria-label="Suivant">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
      <img class="lightbox__image" src="" alt="">
      <div class="lightbox__info">
        <h3 class="lightbox__title"></h3>
        <p class="lightbox__meta"></p>
      </div>
    </div>
  `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxTitle = lightbox.querySelector('.lightbox__title');
    const lightboxMeta = lightbox.querySelector('.lightbox__meta');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
    const nextBtn = lightbox.querySelector('.lightbox__nav--next');

    let currentIndex = 0;
    let visibleItems = Array.from(items);

    function updateVisibleItems() {
        visibleItems = Array.from(items).filter(item =>
            !item.classList.contains('gallery__item--hidden') && item.style.display !== 'none'
        );
    }

    function openLightbox(index) {
        updateVisibleItems();
        if (!visibleItems.length || index < 0) return;
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('lightbox--open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('lightbox--open');
        document.body.style.overflow = '';
    }

    function updateLightboxContent() {
        const item = visibleItems[currentIndex];
        if (!item) return;

        const img = item.querySelector('.gallery__image');
        const title = item.querySelector('.gallery__item-title');
        const location = item.querySelector('.gallery__item-location');

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = title ? title.textContent : '';
        lightboxMeta.textContent = location ? location.textContent : '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightboxContent();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateLightboxContent();
    }

    // Événements
    items.forEach((item) => {
        item.addEventListener('click', () => {
            if (item.classList.contains('gallery__item--hidden') || item.style.display === 'none') return;
            updateVisibleItems();
            const visibleIndex = visibleItems.indexOf(item);
            openLightbox(visibleIndex);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Fermer au clic sur l'arrière-plan
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigation clavier
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('lightbox--open')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}
