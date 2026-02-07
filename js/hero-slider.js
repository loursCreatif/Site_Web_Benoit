document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.hero__slider-img');
    if (images.length === 0) return;

    let currentIndex = 0;

    // Assurez-vous que la première image est active au démarrage
    images.forEach((img, index) => {
        if (index === 0) img.classList.add('active');
        else img.classList.remove('active');
    });

    setInterval(() => {
        // Enlever la classe active de l'image actuelle
        images[currentIndex].classList.remove('active');

        // Passer à l'image suivante
        currentIndex = (currentIndex + 1) % images.length;

        // Ajouter la classe active à la nouvelle image
        images[currentIndex].classList.add('active');
    }, 3000);
});
