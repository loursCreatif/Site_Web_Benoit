/**
 * VALIDATION FORMULAIRE
 * Formulaire de contact avec validation en temps réel
 */

function initFormValidation() {
    const form = document.querySelector('.contact__form');
    if (!form) return;

    const inputs = form.querySelectorAll('.contact__input');
    const submitBtn = form.querySelector('.contact__submit');

    // Règles de validation
    const validators = {
        nom: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
            message: 'Veuillez entrer un nom valide (minimum 2 caractères)'
        },
        telephone: {
            required: true,
            pattern: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
            message: 'Veuillez entrer un numéro de téléphone valide'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Veuillez entrer une adresse email valide'
        },
        sujet: {
            required: true,
            message: 'Veuillez sélectionner un sujet'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Veuillez entrer un message (minimum 10 caractères)'
        }
    };

    // Validation d'un champ
    function validateField(input) {
        const name = input.name;
        const value = input.value.trim();
        const rules = validators[name];

        if (!rules) return { valid: true };

        let error = null;

        if (rules.required && !value) {
            error = 'Ce champ est requis';
        } else if (value) {
            if (rules.minLength && value.length < rules.minLength) {
                error = rules.message;
            } else if (rules.pattern && !rules.pattern.test(value)) {
                error = rules.message;
            }
        }

        return {
            valid: !error,
            error: error
        };
    }

    // Afficher/masquer l'erreur
    function showError(input, error) {
        const wrapper = input.closest('.contact__input-wrapper') || input.parentElement;
        let errorEl = wrapper.querySelector('.contact__error');

        if (error) {
            input.classList.add('contact__input--error');
            input.classList.remove('contact__input--success');

            if (!errorEl) {
                errorEl = document.createElement('span');
                errorEl.className = 'contact__error';
                wrapper.appendChild(errorEl);
            }

            errorEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        ${error}
      `;
        } else {
            input.classList.remove('contact__input--error');
            input.classList.add('contact__input--success');

            if (errorEl) {
                errorEl.remove();
            }
        }
    }

    // Validation en temps réel
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const result = validateField(input);
            showError(input, result.error);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('contact__input--error')) {
                const result = validateField(input);
                if (result.valid) {
                    showError(input, null);
                }
            }
        });
    });

    // Soumission du formulaire
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isValid = true;

        // Valider tous les champs
        inputs.forEach(input => {
            const result = validateField(input);
            showError(input, result.error);
            if (!result.valid) isValid = false;
        });

        // Vérifier le consentement
        const consent = form.querySelector('input[name="consent"]');
        if (consent && !consent.checked) {
            isValid = false;
            // Afficher un message pour le consentement
            const consentWrapper = consent.closest('.contact__consent');
            if (consentWrapper) {
                consentWrapper.style.color = 'var(--color-error)';
                setTimeout(() => {
                    consentWrapper.style.color = '';
                }, 3000);
            }
        }

        if (!isValid) {
            // Animation shake sur le formulaire
            form.classList.add('animate-shake');
            setTimeout(() => form.classList.remove('animate-shake'), 500);
            return;
        }

        // URL FormSubmit pour envoi réel
        const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/contact@btelectricite.fr';

        // Afficher le loader
        submitBtn.classList.add('contact__submit--loading');
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);

            // Ajouter l'email de confirmation automatique à l'expéditeur
            const userEmail = form.querySelector('input[name="email"]')?.value;
            if (userEmail) {
                formData.append('_autoresponse', 'Merci pour votre message ! Nous avons bien reçu votre demande et vous répondrons dans les plus brefs délais. - BT Électricité');
            }

            // Désactiver le captcha et la page de redirection
            formData.append('_captcha', 'false');
            formData.append('_template', 'table');

            const response = await fetch(FORMSUBMIT_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Afficher le message de succès
                showFormMessage('success', 'Votre message a été envoyé avec succès ! Un email de confirmation vous a été envoyé.');
                form.reset();

                // Réinitialiser les états de validation
                inputs.forEach(input => {
                    input.classList.remove('contact__input--error', 'contact__input--success');
                });
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }

        } catch (error) {
            console.error('Erreur formulaire:', error);
            showFormMessage('error', 'Une erreur est survenue. Veuillez réessayer ou me contacter directement par téléphone.');
        } finally {
            submitBtn.classList.remove('contact__submit--loading');
            submitBtn.disabled = false;
        }
    });

    // Afficher un message de succès/erreur
    function showFormMessage(type, message) {
        // Supprimer les messages existants
        const existingMessage = form.querySelector('.contact__message');
        if (existingMessage) existingMessage.remove();

        const messageEl = document.createElement('div');
        messageEl.className = `contact__message contact__message--${type}`;
        messageEl.innerHTML = `
      <svg class="contact__message-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${type === 'success'
                ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
                : '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>'
            }
      </svg>
      <p class="contact__message-text">${message}</p>
    `;

        form.appendChild(messageEl);

        // Scroll vers le message
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Supprimer après 5 secondes
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initFormValidation };
}
