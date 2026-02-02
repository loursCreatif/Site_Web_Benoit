/**
 * Section Loader - Charge les sections HTML dynamiquement
 */

// Configuration des sections
const sections = [
    { id: 'header-section', file: 'sections/header.html' },
    { id: 'hero-section', file: 'sections/hero.html' },

    { id: 'services-section', file: 'sections/services.html' },
    { id: 'about-section', file: 'sections/about.html' },
    { id: 'gallery-section', file: 'sections/gallery.html' },
    { id: 'testimonials-section', file: 'sections/testimonials.html' },
    { id: 'faq-section', file: 'sections/faq.html' },
    { id: 'coverage-section', file: 'sections/coverage.html' },
    { id: 'footer-section', file: 'sections/footer.html' }
];

// Données dynamiques
const servicesData = {
    electric: [
        { title: 'Installation Électrique', text: 'Installation complète neuve, rénovation électrique et mise aux normes NF C 15-100.', link: '#contact', linkText: 'En savoir plus', icon: 'server', image: 'assets/images/services/installation.png' },
        { title: 'Dépannage Urgent', text: 'Intervention rapide 24h/24 pour toutes vos urgences électriques et recherches de pannes.', link: 'tel:+33749457923', linkText: 'Appeler maintenant', icon: 'alert-circle', image: 'assets/images/services/depannage.png' },
        { title: 'Tableaux Électriques', text: 'Installation et mise aux normes de tableaux électriques, remplacement de disjoncteurs.', link: '#contact', linkText: 'En savoir plus', icon: 'grid', image: 'assets/images/services/tableau.png' },
        { title: 'Éclairage & Domotique', text: "Installation d'éclairage LED, systèmes domotiques et volets roulants électriques.", link: '#contact', linkText: 'En savoir plus', icon: 'sun', image: 'assets/images/services/eclairage.png' }
    ],
    borne: [
        { title: 'Installation Résidentielle', text: 'Borne wallbox murale ou sur pied, installation intérieure/extérieure, optimisée pour votre habitation.', link: '#simulateur', linkText: 'Simuler mon devis', icon: 'home', image: 'assets/images/services/borne_residentielle.png' },
        { title: 'Copropriété & Collectif', text: 'Étude de faisabilité, installation de bornes partagées avec système de gestion de charge.', link: '#contact', linkText: 'Demander une étude', icon: 'users', image: 'assets/images/services/borne_copropriete.png' },
        { title: 'Commerces & Entreprises', text: "Bornes pour parking client, flotte d'entreprise, bornes rapides DC avec monitoring.", link: '#contact', linkText: 'Devis entreprise', icon: 'building', image: 'assets/images/services/borne_entreprise.png' },
        { title: 'Bornes Intelligentes', text: 'Gestion dynamique de puissance, programmation heures creuses, application mobile de contrôle.', link: '#contact', linkText: 'En savoir plus', icon: 'cpu', image: 'assets/images/services/borne_intelligente.png' }
    ]
};

const irveFeatures = [
    'Certification officielle IRVE',
    'Conformité normes NFC 15-100',
    'Garantie décennale incluse',
    "Éligibilité crédit d'impôt (500€)"
];

const galleryData = [
    { category: 'residentiel', title: 'Installation Wallbox Maison', location: 'La Hague', image: 'assets/images/portfolio/portfolio_ev_charger_wallbox_1769950807636.png', wide: true },
    { category: 'electricite', title: 'Rénovation Tableau', location: 'Cherbourg', image: 'assets/images/portfolio/portfolio_electrical_panel_1769950830736.png' },
    { category: 'electricite', title: 'Éclairage Cuisine LED', location: 'Valognes', image: 'assets/images/portfolio/portfolio_led_lighting_kitchen_1769950857292.png' },
    { category: 'commerce', title: 'Plateau Bureaux', location: 'Equeurdreville', image: 'assets/images/portfolio/portfolio_commercial_office_wiring_1769950886729.png', wide: true },
    { category: 'residentiel', title: 'Installation Récente', location: 'Beaumont', image: 'assets/images/portfolio/uploaded_media_1769948325878.png' },
    { category: 'electricite', title: 'Éclairage Extérieur', location: 'Barfleur', image: 'assets/images/portfolio/portfolio_outdoor_lighting_garden_1769951558414.png' },
    { category: 'commerce', title: 'Atelier Industriel', location: 'Tourlaville', image: 'assets/images/portfolio/portfolio_industrial_workshop_wiring_1769951574040.png' }
];

const testimonialsData = [
    { text: "Installation de ma borne Wallbox parfaite ! L'équipe a été professionnelle, rapide et m'a bien expliqué le fonctionnement. Je recommande vivement.", name: 'Marie L.', location: 'La Hague - Borne résidentielle', initials: 'ML', type: 'borne', rating: 5 },
    { text: "Nous avons fait installer 4 bornes dans notre copropriété. Le devis était clair, les travaux propres et dans les délais. Excellente expérience.", name: 'Pierre D.', location: 'Copropriété Les Pieux', initials: 'PD', type: 'borne', rating: 4 },
    { text: "Bornes de recharge installées pour nos clients. Service impeccable et suivi après-installation au top !", name: 'Sophie M.', location: 'Restaurant Cherbourg - Pro', initials: 'SM', type: 'borne', rating: 5 },
    { text: "Dépannage urgent un dimanche soir. Intervenu en 1h, problème résolu. Très réactif et professionnel.", name: 'Jean-Claude B.', location: 'Beaumont - Dépannage', initials: 'JB', type: 'depannage', rating: 5 },
    { text: "Rénovation électrique complète de notre maison des années 70. Travail soigné, conforme aux normes, et équipe très professionnelle.", name: 'Isabelle R.', location: 'Valognes - Rénovation', initials: 'IR', type: 'renovation', rating: 4 },
    { text: "Mise aux normes de notre tableau électrique + installation éclairage LED. Devis respecté, interventions rapides et propres.", name: 'Marc T.', location: 'Bricquebec - Mise aux normes', initials: 'MT', type: 'electricite', rating: 5 },
    { text: "Installation photovoltaïque couplée à une borne de recharge. Très satisfait du conseil et de la réalisation.", name: "Bernard K.", location: "Cherbourg - Solaire & IRVE", initials: "BK", type: "borne", rating: 5 },
    { text: "Réactivité exemplaire pour une remise en conformité avant vente immobilière. Merci Benoit !", name: "Catherine D.", location: "Les Pieux - Urgence", initials: "CD", type: "depannage", rating: 5 },
    { text: "Électricien sérieux, ponctuel et de bon conseil pour la mise aux normes de mon commerce.", name: "Jean-Pierre L.", location: "La Hague - Professionnel", initials: "JL", type: "electricite", rating: 4 },
    { text: "Très bon contact, devis rapide et prix compétitifs pour ma Wallbox. Je recommande les yeux fermés.", name: "Antoine S.", location: "Flamanville - Borne", initials: "AS", type: "borne", rating: 5 }
];

const cities = ['La Hague', 'Cherbourg', 'Les Pieux', 'Bricquebec', 'Flamanville'];

const coverageInfo = [
    { icon: 'clock', label: "Délai d'intervention Urgence", value: '24h/48h' },
    { icon: 'shield', label: 'Zone de couverture', value: '40 km autour de La Hague' },
    { icon: 'phone', label: 'Urgences 7j/7', value: '+33 7 49 45 79 23' }
];

const trustBadges = [
    { icon: 'shield', value: 'Certifié', label: 'IRVE' },
    { icon: 'file-text', value: 'Devis', label: 'Gratuit' },
    { icon: 'shield-check', value: 'Travail', label: 'Garanti' }
];

// Générateur de SVG star
function createStars(count = 5) {
    return Array(count).fill().map(() => `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
    `).join('');
}

// Icône SVG
function getIcon(name) {
    const icons = {
        'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>',
        'check': '<polyline points="20 6 9 17 4 12"></polyline>',
        'map-pin': '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>',
        'clock': '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
        'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
        'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>',
        'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>',
        'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
        'zoom-in': '<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line>'
    };
    return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[name] || ''}</svg>`;
}

// Charger une section
async function loadSection(section) {
    try {
        const response = await fetch(section.file);
        if (!response.ok) throw new Error(`Erreur chargement ${section.file}`);
        const html = await response.text();
        const container = document.getElementById(section.id);
        if (container) container.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

// Générer le contenu dynamique
function populateDynamicContent() {
    // Étoiles hero
    const heroStars = document.getElementById('hero-stars');
    if (heroStars) heroStars.innerHTML = createStars(5);

    // Services électriques
    const servicesElectric = document.getElementById('services-electric');
    if (servicesElectric) {
        servicesElectric.innerHTML = servicesData.electric.map((s, i) => `
            <article class="service-card service-card--electric reveal${i > 0 ? ` reveal--delay-${i}` : ''}">
                ${s.image ? `<div class="service-card__image"><img src="${s.image}" alt="${s.title}" loading="lazy"></div>` : ''}
                <h4 class="service-card__title">${s.title}</h4>
                <p class="service-card__text">${s.text}</p>
                <a href="${s.link}" class="service-card__link">${s.linkText} ${getIcon('arrow-right')}</a>
            </article>
        `).join('');
    }

    // Services bornes
    const servicesBorne = document.getElementById('services-borne');
    if (servicesBorne) {
        servicesBorne.innerHTML = servicesData.borne.map((s, i) => `
            <article class="service-card service-card--borne reveal${i > 0 ? ` reveal--delay-${i}` : ''}">
                ${s.image ? `<div class="service-card__image"><img src="${s.image}" alt="${s.title}" loading="lazy"></div>` : `<div class="service-card__icon">${getIcon(s.icon)}</div>`}
                <h4 class="service-card__title">${s.title}</h4>
                <p class="service-card__text">${s.text}</p>
                <a href="${s.link}" class="service-card__link">${s.linkText} ${getIcon('arrow-right')}</a>
            </article>
        `).join('');
    }

    // Liste IRVE
    const irveList = document.getElementById('irve-list');
    if (irveList) {
        irveList.innerHTML = irveFeatures.map(f => `
            <li class="services__specialty-item">${getIcon('check')} ${f}</li>
        `).join('');
    }

    // Galerie
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = galleryData.map(item => `
            <article class="gallery__item${item.wide ? ' gallery__item--wide' : ''} reveal" data-category="${item.category}">
                <img src="${item.image}" alt="${item.title}" class="gallery__image">
                <div class="gallery__overlay">
                    <span class="gallery__category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                    <h3 class="gallery__item-title">${item.title}</h3>
                    <p class="gallery__item-location">${getIcon('map-pin')} ${item.location}</p>
                </div>
                <div class="gallery__zoom">${getIcon('zoom-in')}</div>
            </article>
        `).join('');
    }

    // Témoignages
    const testimonialsSlides = document.getElementById('testimonials-slides');
    if (testimonialsSlides) {
        testimonialsSlides.innerHTML = testimonialsData.map(t => `
            <div class="testimonials__slide">
                <div class="testimonial-card">
                    <div class="testimonial-card__stars">${createStars(t.rating || 5)}</div>
                    <p class="testimonial-card__text">"${t.text}"</p>
                    <div class="testimonial-card__author">
                        <div class="testimonial-card__avatar">${t.initials}</div>
                        <div class="testimonial-card__info">
                            <div class="testimonial-card__name">${t.name}</div>
                            <div class="testimonial-card__location">${t.location}</div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Dots témoignages
    const testimonialsDots = document.getElementById('testimonials-dots');
    if (testimonialsDots) {
        testimonialsDots.innerHTML = testimonialsData.map((_, i) => `
            <button class="testimonials__dot${i === 0 ? ' testimonials__dot--active' : ''}" aria-label="Slide ${i + 1}"></button>
        `).join('');
    }

    // Trust badges
    const trustBadgesEl = document.getElementById('trust-badges');
    if (trustBadgesEl) {
        trustBadgesEl.innerHTML = trustBadges.map(b => `
            <div class="trust-badge">
                <div class="trust-badge__icon">${getIcon(b.icon)}</div>
                <div class="trust-badge__content">
                    <div class="trust-badge__value">${b.value}</div>
                    <div class="trust-badge__label">${b.label}</div>
                </div>
            </div>
        `).join('');
    }

    // Villes
    const citiesGrid = document.getElementById('cities-grid');
    if (citiesGrid) {
        citiesGrid.innerHTML = cities.map(c => `
            <div class="coverage__city" data-city="${c}">${getIcon('map-pin')} ${c}</div>
        `).join('');
    }

    // Info couverture
    const coverageInfoEl = document.getElementById('coverage-info');
    if (coverageInfoEl) {
        coverageInfoEl.innerHTML = coverageInfo.map(info => `
            <div class="coverage__info-item">
                <div class="coverage__info-icon">${getIcon(info.icon)}</div>
                <div class="coverage__info-content">
                    <div class="coverage__info-label">${info.label}</div>
                    <div class="coverage__info-value">${info.value}</div>
                </div>
            </div>
        `).join('');
    }
}

// Initialiser l'interactivité de la carte
function initCoverageInteractivity() {
    const cities = document.querySelectorAll('.coverage__city');
    const markers = document.querySelectorAll('.coverage__marker');

    function highlight(cityName) {
        // Reset
        cities.forEach(c => c.classList.remove('coverage__city--active'));
        markers.forEach(m => m.classList.remove('coverage__marker--active'));

        if (!cityName) return;

        // Highlight HTML element
        const cityEl = document.querySelector(`.coverage__city[data-city="${cityName}"]`);
        if (cityEl) cityEl.classList.add('coverage__city--active');

        // Highlight SVG marker
        const markerEl = document.querySelector(`.coverage__marker[data-city="${cityName}"]`);
        if (markerEl) markerEl.classList.add('coverage__marker--active');
    }

    cities.forEach(city => {
        city.addEventListener('mouseenter', () => highlight(city.dataset.city));
        city.addEventListener('mouseleave', () => highlight(null));
    });

    markers.forEach(marker => {
        marker.addEventListener('mouseenter', () => highlight(marker.dataset.city));
        marker.addEventListener('mouseleave', () => highlight(null));
    });
}

// Initialisation
async function init() {
    // Charger toutes les sections
    await Promise.all(sections.map(loadSection));

    // Générer le contenu dynamique
    populateDynamicContent();

    // Initialiser l'interactivité couverture
    initCoverageInteractivity();

    // Masquer le loader
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loader--hidden');
            setTimeout(() => loader.remove(), 500);
        }, 800);
    }

    // Réinitialiser les scripts existants
    if (typeof initNavigation === 'function') initNavigation();
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof initParticles === 'function') initParticles();
    if (typeof initCounters === 'function') initCounters();
    if (typeof initSmoothScroll === 'function') initSmoothScroll();
    if (typeof initBackToTop === 'function') initBackToTop();
    if (typeof ThemeManager !== 'undefined') ThemeManager.init();
    if (typeof initGallery === 'function') initGallery();
    if (typeof initAccordion === 'function') initAccordion();
    if (typeof initCarousel === 'function') initCarousel();
}

// Démarrer au chargement
document.addEventListener('DOMContentLoaded', init);
