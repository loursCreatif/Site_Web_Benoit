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

    // Form Submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get values
            const name = form.querySelector('[name="name"]').value;
            const email = form.querySelector('[name="email"]').value;
            const phone = form.querySelector('[name="phone"]').value;
            const subject = form.querySelector('[name="subject"]').value;
            const requestObject = form.querySelector('[name="object"]').value; // "objet de la demande"

            // Construct email body
            const mailSubject = `[Demande Devis] ${subject} - ${name}`;
            const mailBody = `BONJOUR,\n\nVOICI MA DEMANDE :\n${requestObject}\n\n--------------------------------\nMES COORDONNÉES :\nNom Prénom : ${name}\nEmail : ${email}\nTéléphone : ${phone}\n\nCordialement,`;

            // Open Mail Client
            window.location.href = `mailto:contact@elecpro.fr?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

            // Optional: Close modal after a delay
            setTimeout(closeModal, 1000);
        });
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuoteModal);
} else {
    initQuoteModal();
}
