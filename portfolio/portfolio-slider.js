// === PORTFOLIO SLIDER JS ===
function initSlider(slider) {
    const slides = slider.querySelector('.slides');
    const dotsContainer = slider.querySelector('.nav-dots');
    const total = slides.children.length;
    let index = 0;

    function updateSlide() {
        slides.style.transform = `translateX(-${index * 100}%)`;
        [...dotsContainer.children].forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    const prevBtn = slider.querySelector('.arrow.prev');
    const nextBtn = slider.querySelector('.arrow.next');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            index = (index - 1 + total) % total;
            updateSlide();
        });

        nextBtn.addEventListener('click', () => {
            index = (index + 1) % total;
            updateSlide();
        });
    }

    for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            index = i;
            updateSlide();
        });
        dotsContainer.appendChild(dot);
    }

    updateSlide();

    // ✅ Autoplay only if not disabled
    if (!slider.hasAttribute('data-disable-autoplay')) {
        slider.autoplayInterval = setInterval(() => {
            index = (index + 1) % total;
            updateSlide();
        }, 5000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slider').forEach((slider) => {
        initSlider(slider);
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.getElementById("scroll-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
function applyAnimations() {
    const elements = document.querySelectorAll(
        'h1, h2, h3, p, .project-card, .slide, .section, .page-title'
    );

    elements.forEach(el => {
        if (!el.closest('footer')) {
            el.classList.add('animate-fade-up');
        }
    });
}

function revealOnScroll() {
    const animated = document.querySelectorAll('.animate-fade-up');
    const triggerY = window.innerHeight; // or use full viewport height

    animated.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerY) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('load', () => {
    applyAnimations();

    // force a layout pass before triggering visibility
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            revealOnScroll(); // now guaranteed to fire with layout settled
        });
    });
});

document.addEventListener('scroll', revealOnScroll);

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => preloader.style.display = 'none', 500);
    }
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
