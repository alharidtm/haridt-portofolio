// Efek gulir halus saat klik menu navigasi
document.querySelectorAll('.nav-links a, .btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Efek bayangan saat gulir navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)';
    }
});
