/**
 * Modal Devis Logic
 * Envoi via Formspree (service fiable pour sites statiques)
 */
function initQuoteModal() {
    // Elements
    const modal = document.getElementById('quote-modal');
    const closeBtn = document.querySelector('.modal-close');
    const form = document.getElementById('quote-form');

    // URL FormSubmit
    const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/contact@btelectricite.fr';

    // Anti-spam : timestamp du dernier envoi
    let lastSubmitTime = 0;
    const MIN_SUBMIT_INTERVAL = 5000; // 5 secondes minimum entre envois

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

        const modalHeader = modal?.querySelector('.modal-header');
        if (modalHeader) modalHeader.style.display = 'block';

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

        // Masquer l'en-tête pour un rendu plus propre
        const modalHeader = modal?.querySelector('.modal-header');
        if (modalHeader) modalHeader.style.display = 'none';

        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
            <div class="success-confetti" aria-hidden="true"></div>
            <div class="success-content">
                <div class="success-icon-wrapper">
                    <svg class="success-icon" viewBox="0 0 52 52">
                        <circle class="success-circle" cx="26" cy="26" r="25" fill="none"/>
                        <path class="success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                </div>
                <h3 class="success-title">Demande envoyée !</h3>
                <p class="success-text">Merci pour votre confiance.<br>Votre demande a bien été transmise.</p>
                <button type="button" class="btn btn--primary success-close-btn" onclick="document.getElementById('quote-modal').classList.remove('active'); document.body.style.overflow = '';">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Compris, merci !
                </button>
            </div>
        `;

        form.parentNode.insertBefore(successDiv, form.nextSibling);

        // Lancer les confettis
        createConfetti(successDiv.querySelector('.success-confetti'));
    }

    // Créer des confettis animés
    function createConfetti(container) {
        if (!container) return;
        const colors = ['#22c55e', '#00D4FF', '#FFD700', '#FF6B6B', '#A78BFA'];
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('span');
            confetti.className = 'confetti-piece';
            confetti.style.setProperty('--x', `${Math.random() * 200 - 100}px`);
            confetti.style.setProperty('--y', `${Math.random() * -250 - 50}px`);
            confetti.style.setProperty('--r', `${Math.random() * 720 - 360}deg`);
            confetti.style.setProperty('--delay', `${Math.random() * 0.3}s`);
            confetti.style.setProperty('--size', `${4 + Math.random() * 6}px`);
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(confetti);
        }
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

            // Anti-bot : vérifier le honeypot
            const honeyField = form.querySelector('input[name="website"]');
            if (honeyField && honeyField.value) {
                // C'est un bot, simuler un succès sans envoyer
                form.reset();
                showSuccess();
                return;
            }

            // Anti-spam : rate limiting
            const now = Date.now();
            if (now - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
                showError('Veuillez patienter quelques secondes avant de renvoyer.');
                return;
            }
            lastSubmitTime = now;

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
