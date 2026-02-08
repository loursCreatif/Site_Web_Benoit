/**
 * Modal Devis Logic
 * Envoi via Formspree (service fiable pour sites statiques)
 */
function initQuoteModal() {
    // Elements
    const modal = document.getElementById('quote-modal');
    const closeBtn = document.querySelector('.modal-close');
    const form = document.getElementById('quote-form');

    // URL FormSubmit - Service gratuit, pas d'inscription nécessaire
    // Au premier envoi, un email de confirmation sera envoyé à cette adresse
    const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/contact@btelectricite.fr';

    // Function to open modal
    function openModal(e, button) {
        if (e) e.preventDefault();
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Présélectionner l'objet de la demande si spécifié
            if (button && button.hasAttribute('data-subject')) {
                const subjectValue = button.getAttribute('data-subject');
                const subjectSelect = document.getElementById('quote-subject');
                if (subjectSelect) {
                    subjectSelect.value = subjectValue;
                }
            }

            // Reset état du formulaire
            resetFormState();
        }
    }

    // Function to close modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Reset form state
    function resetFormState() {
        const successMsg = modal?.querySelector('.form-success');
        const errorMsg = modal?.querySelector('.form-error');
        if (successMsg) successMsg.remove();
        if (errorMsg) errorMsg.remove();
        if (form) {
            form.style.display = 'block';
            const submitBtn = form.querySelector('.form-submit');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer ma demande';
            }
        }
    }

    // Show success message
    function showSuccess() {
        if (!form) return;
        form.style.display = 'none';

        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <div class="success-icon">
                <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" class="success-circle"></circle>
                    <path d="M9 12l2 2 4-4" class="success-check"></path>
                </svg>
            </div>
            <h3 class="success-title">Message envoyé !</h3>
            <p class="success-text">Merci pour votre demande. Je vous répondrai dans les plus brefs délais.</p>
            <button type="button" class="btn btn--primary" onclick="document.getElementById('quote-modal').classList.remove('active'); document.body.style.overflow = '';">
                Fermer
            </button>
        `;

        form.parentNode.insertBefore(successDiv, form.nextSibling);
    }

    // Show error message
    function showError(message) {
        const existingError = modal?.querySelector('.form-error');
        if (existingError) existingError.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.innerHTML = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span>${message}</span>
        `;

        form?.insertBefore(errorDiv, form.firstChild);

        // Auto-remove after 5s
        setTimeout(() => errorDiv.remove(), 5000);
    }

    // Event Delegation for buttons
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

    // Form Submission via AJAX
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('.form-submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Envoi en cours...';
            }

            const formData = new FormData(form);

            try {
                const response = await fetch(FORMSUBMIT_URL, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset();
                    showSuccess();
                } else {
                    const data = await response.json();
                    throw new Error(data.error || 'Erreur lors de l\'envoi');
                }
            } catch (error) {
                console.error('Erreur formulaire:', error);
                showError('Une erreur est survenue. Veuillez réessayer ou appeler directement au 07 49 45 79 23.');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Envoyer ma demande';
                }
            }
        });
    }
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuoteModal);
} else {
    initQuoteModal();
}
