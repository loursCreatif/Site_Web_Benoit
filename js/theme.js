/**
 * THEME MANAGER
 * Gestion du mode sombre/clair
 */

const ThemeManager = {
    init() {
        this.toggleBtn = document.getElementById('theme-toggle');
        this.setupTheme();
        this.bindEvents();
    },

    setupTheme() {
        const savedTheme = localStorage.getItem('theme');

        // Default to dark unless explicitly saved as light
        if (savedTheme === 'light') {
            this.setTheme('light');
        } else {
            this.setTheme('dark');
        }
    },

    bindEvents() {
        if (!this.toggleBtn) return;

        this.toggleBtn.addEventListener('click', () => {
            // Check if we are currently in light mode (attribute exists)
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const newTheme = isLight ? 'dark' : 'light';
            this.setTheme(newTheme);
        });
    },

    setTheme(theme) {
        // Appliquer sur html
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            this.updateIcons('light');
        } else {
            // Default is dark, so remove the attribute
            document.documentElement.removeAttribute('data-theme');
            this.updateIcons('dark');
        }

        // Sauvegarder
        localStorage.setItem('theme', theme);
    },

    updateIcons(theme) {
        if (!this.toggleBtn) return;

        const sunIcon = this.toggleBtn.querySelector('.theme-icon-sun');
        const moonIcon = this.toggleBtn.querySelector('.theme-icon-moon');

        if (!sunIcon || !moonIcon) return;

        if (theme === 'dark') {
            // In linear mode: Show Sun to indicate "Switch to Light"
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            // In light mode: Show Moon to indicate "Switch to Dark"
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }
};

// Export for use in loader.js
window.ThemeManager = ThemeManager;
