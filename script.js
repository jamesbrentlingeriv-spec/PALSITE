// script.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle the .active class on the menu
            navLinks.classList.toggle('active');
            
            // Optional: Animate the hamburger icon to an 'X'
            hamburger.classList.toggle('toggle');
        });
    }
});