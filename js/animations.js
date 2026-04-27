// =========================================
// ANIMATIONS.JS — Fade-in e barras de skill
// =========================================

// ── Fade-in ao entrar na viewport ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Pequeno delay escalonado para grupos de cards
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


// ── Barras de habilidade animadas ──
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const sobreSection = document.getElementById('sobre');
if (sobreSection) skillObserver.observe(sobreSection);
