window.addEventListener('DOMContentLoaded', () => {
    const typedEl = document.querySelector('.typed');
    if (typedEl) {
        const items = typedEl.getAttribute('data-typed-items');
        if (items) {
            new Typed('.typed', {
                strings: items.split(',').map(s => s.trim()),
                typeSpeed: 80,
                backSpeed: 40,
                backDelay: 2000,
                loop: true
            });
        }
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

window.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('#name-animated span');
    letters.forEach((letter, i) => {
        letter.style.animationDelay = `${i * 0.08}s`;
    });
});

const nameArea = $('#name-animated-wrapper');
const bubble = $('#SpeechBubble');

nameArea.hover(
    () => bubble.css({ 'animation-name': 'expand-bounce', 'animation-duration': '0.25s' }),
    () => bubble.css({ 'animation-name': 'shrink', 'animation-duration': '0.1s' })
);

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

/**
 * Animate the skills items on reveal
 */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-up').forEach(el => {
    observer.observe(el);
});
// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {

    // Initialize Isotope
    const grid = document.querySelector('.isotope-container');
    const iso = new Isotope(grid, {
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.portfolio-sizer',
            gutter: 0,
            fitWidth: true
        }
    });

    // Wait for images to load before initial layout
    imagesLoaded(grid, () => {
        iso.layout();
    });

    // Filter buttons
    const filters = document.querySelectorAll('.portfolio-filters li');
    filters.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();

            const filterValue = e.target.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });

            // Refresh layout after image filtering
            imagesLoaded(grid, () => {
                iso.layout();
            });

            // Update UI active class
            filters.forEach(btn => btn.classList.remove('filter-active'));
            e.target.classList.add('filter-active');
        });
    });

    // Responsive relayout (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            iso.layout();
        }, 200);
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

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => preloader.style.display = 'none', 500);
    }
  });