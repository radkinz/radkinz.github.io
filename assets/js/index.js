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
  