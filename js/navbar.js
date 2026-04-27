// =========================================
// NAVBAR.JS — Scroll spy, sombra e mobile
// =========================================

const navbar    = document.getElementById('navbar');
const navLinks  = document.querySelectorAll('.nav-link');
const navMenu   = document.getElementById('navbar-nav');
const toggle    = document.getElementById('menu-toggle');

// ── Sombra ao rolar ──
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Toggle mobile ──
function toggleMenu() {
  const isOpen = navMenu.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
}

// Fecha ao clicar num link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// Fecha ao clicar fora
document.addEventListener('click', (e) => {
  if (
    navMenu.classList.contains('open') &&
    !navMenu.contains(e.target) &&
    !toggle.contains(e.target)
  ) {
    navMenu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }
});

// ── Scroll spy — destaca link da seção visível ──
const sections = document.querySelectorAll('section[id]');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(
        `.nav-link[href="#${entry.target.id}"]`
      );
      if (active) active.classList.add('active');
    }
  });
}, {
  rootMargin: '-50% 0px -50% 0px', // dispara quando seção está no centro
  threshold: 0,
});

sections.forEach(s => spyObserver.observe(s));