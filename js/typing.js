// =========================================
// TYPING.JS — Efeito de digitação no hero
// =========================================

const roles = [
  'Analista de Dados',
  'Engenheiro de Computação',
  'Engenheiro de Dados',
  'Desenvolvedor Python',
  'Entusiasta de Power BI',
];

let roleIdx  = 0;
let charIdx  = 0;
let deleting = false;

const typingEl = document.getElementById('typing-text');

function typeRole() {
  const current = roles[roleIdx];

  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeRole, 2200);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
    }
  }

  setTimeout(typeRole, deleting ? 45 : 80);
}

typeRole();