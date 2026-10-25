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

const fotoCarousel = document.querySelector('.foto-carousel');

if (fotoCarousel) {
    const track = fotoCarousel.querySelector('.foto-carousel-track');
    const slides = [...fotoCarousel.querySelectorAll('.foto-carousel-slide')];
    const dots = [...fotoCarousel.querySelectorAll('.foto-carousel-dot')];
    const counter = fotoCarousel.querySelector('.foto-carousel-count');
    let activeIndex = 0;
    let touchStartX = null;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const showSlide = index => {
        activeIndex = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${activeIndex * 100}%)`;
        dots.forEach((dot, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-pressed', String(isActive));
        });
        counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    };

    fotoCarousel.querySelectorAll('.foto-carousel-arrow').forEach(button => {
        button.addEventListener('click', () => {
            showSlide(activeIndex + Number(button.dataset.direction));
        });
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    window.setInterval(() => {
        if (
            reducedMotion.matches ||
            document.hidden ||
            fotoCarousel.matches(':hover') ||
            fotoCarousel.contains(document.activeElement)
        ) {
            return;
        }

        showSlide(activeIndex + 1);
    }, 4000);

    const viewport = fotoCarousel.querySelector('.foto-carousel-viewport');
    viewport.addEventListener('touchstart', event => {
        touchStartX = event.changedTouches[0]?.clientX ?? null;
    }, { passive: true });

    viewport.addEventListener('touchend', event => {
        if (touchStartX === null) return;

        const distance = event.changedTouches[0].clientX - touchStartX;
        if (Math.abs(distance) > 40) {
            showSlide(activeIndex + (distance < 0 ? 1 : -1));
        }
        touchStartX = null;
    }, { passive: true });

    viewport.addEventListener('touchcancel', () => {
        touchStartX = null;
    }, { passive: true });
}
