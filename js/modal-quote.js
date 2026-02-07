/**
 * Modal Devis Logic
 */
function initQuoteModal() {
    // Elements
    const modal = document.getElementById('quote-modal');
    const closeBtn = document.querySelector('.modal-close');
    const form = document.getElementById('quote-form');

    // Trigger buttons - select by specific class
    // We will add this class .js-open-quote-modal to the buttons

    // Function to open modal
    function openModal(e, button) {
        if (e) e.preventDefault();
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling

            // Présélectionner l'objet de la demande si spécifié
            if (button && button.hasAttribute('data-subject')) {
                const subjectValue = button.getAttribute('data-subject');
                const subjectSelect = document.getElementById('quote-subject');
                if (subjectSelect) {
                    subjectSelect.value = subjectValue;
                }
            }
        }
    }

    // Function to close modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Event Delegation for buttons (since they might be loaded dynamically)
    document.addEventListener('click', (e) => {
        const target = e.target.closest('.js-open-quote-modal');
        if (target) {
            openModal(e, target);
        }
    });

    // Close on click outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Form Submission - le formulaire utilise Web3Forms
    // On laisse le formulaire se soumettre normalement
    if (form) {
        form.addEventListener('submit', () => {
            // Le formulaire se soumet à Web3Forms
            // On ferme juste la modal après un délai
            setTimeout(closeModal, 500);
        });
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuoteModal);
} else {
    initQuoteModal();
}
