/**
 * ACCORDÉON FAQ
 */

function initAccordion() {
    const accordion = document.querySelector('.faq__accordion');
    if (!accordion) return;

    const items = accordion.querySelectorAll('.faq__item');

    items.forEach(item => {
        const question = item.querySelector('.faq__question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('faq__item--active');

            // Fermer tous les autres items
            items.forEach(otherItem => {
                otherItem.classList.remove('faq__item--active');
            });

            // Ouvrir l'item cliqué s'il n'était pas déjà ouvert
            if (!isActive) {
                item.classList.add('faq__item--active');
            }
        });
    });

    // Filtres de catégories
    const categories = document.querySelectorAll('.faq__category');
    categories.forEach(category => {
        category.addEventListener('click', () => {
            categories.forEach(c => c.classList.remove('faq__category--active'));
            category.classList.add('faq__category--active');

            const filter = category.dataset.category;

            items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}
