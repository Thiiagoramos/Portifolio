// =========================================
// GITHUB.JS — Busca projetos via API pública
// =========================================

// -------------------------------------------------------
// CONFIGURAÇÃO — altere apenas este bloco
// -------------------------------------------------------
const GITHUB_CONFIG = {
  username: 'Thiiagoramos',   // <- coloque seu usuário aqui

  // Repositórios para IGNORAR (fork, template, etc.)
  exclude: ['seu-usuario-github'],

  // Ordem dos cards: 'updated' | 'stars' | 'created'
  sortBy: 'updated',

  // Quantidade máxima de projetos exibidos
  limit: 6,

  // Mapeamento de linguagem para cor do badge
  languageColors: {
    Python:     '#4b8bbe',
    JavaScript: '#f7df1e',
    HTML:       '#e34f26',
    CSS:        '#264de4',
    TypeScript: '#3178c6',
    'C++':      '#f34b7d',
    C:          '#555555',
    Java:       '#b07219',
    default:    '#6b7894',
  },
};
// -------------------------------------------------------

const GITHUB_API = `https://api.github.com/users/${GITHUB_CONFIG.username}/repos?per_page=100&sort=${GITHUB_CONFIG.sortBy}`;

// Ponto de entrada — chamado ao carregar a página
async function loadGithubProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  renderSkeleton(container);

  try {
    const repos = await fetchRepos();
    const filtered = filterRepos(repos);
    renderProjects(container, filtered);
  } catch (err) {
    renderError(container, err);
  }
}

// ── Busca os repositórios ──
async function fetchRepos() {
  const res = await fetch(GITHUB_API, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (!res.ok) {
    if (res.status === 403) throw new Error('rate_limit');
    if (res.status === 404) throw new Error('user_not_found');
    throw new Error(`github_error_${res.status}`);
  }

  return res.json();
}

// ── Filtra e ordena os repositórios ──
function filterRepos(repos) {
  return repos
    .filter(r =>
      !r.fork &&
      !r.archived &&
      !GITHUB_CONFIG.exclude.includes(r.name) &&
      r.name !== GITHUB_CONFIG.username   // ignora repo de perfil
    )
    .sort((a, b) => {
      if (GITHUB_CONFIG.sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, GITHUB_CONFIG.limit);
}

// ── Renderiza os cards ──
function renderProjects(container, repos) {
  if (repos.length === 0) {
    container.innerHTML = `
      <p class="projects-empty">
        // Nenhum repositório público encontrado ainda.
      </p>`;
    return;
  }

  container.innerHTML = repos.map((repo, i) => buildCard(repo, i)).join('');

  // Anima os cards em cascata
  container.querySelectorAll('.project-card').forEach((card, i) => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(16px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity    = '1';
      card.style.transform  = 'none';
    }, i * 80);
  });
}

// ── Monta o HTML de um card ──
function buildCard(repo, index) {
  const featured  = index === 0 ? 'featured' : '';
  const desc      = repo.description || 'Sem descrição.';
  const language  = repo.language    || null;
  const stars     = repo.stargazers_count;
  const forks     = repo.forks_count;
  const updatedAt = formatDate(repo.updated_at);

  const langBadge = language
    ? `<span class="tag" style="border-color:${getLangColor(language)}40; color:${getLangColor(language)}">
         ${language}
       </span>`
    : '';

  const topicsBadges = (repo.topics || [])
    .slice(0, 3)
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  const demoLink = repo.homepage
    ? `<a href="${repo.homepage}" target="_blank" rel="noopener">
         ${iconExternal} Demo
       </a>`
    : '';

  return `
    <div class="project-card ${featured}">
      <div class="traffic-lights">
        <div class="tl tl-red"></div>
        <div class="tl tl-yellow"></div>
        <div class="tl tl-green"></div>
        <span class="project-path">~/${repo.name}</span>
      </div>

      <div class="project-name">
        <a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a>
      </div>

      <div class="project-desc">${desc}</div>

      <div class="project-tags">
        ${langBadge}
        ${topicsBadges}
      </div>

      <div class="project-meta">
        <span title="Stars">${iconStar} ${stars}</span>
        <span title="Forks">${iconFork} ${forks}</span>
        <span class="project-updated" title="Última atualização">atualizado ${updatedAt}</span>
      </div>

      <div class="project-links">
        <a href="${repo.html_url}" target="_blank" rel="noopener">
          ${iconGithub} Code
        </a>
        ${demoLink}
      </div>
    </div>`;
}

// ── Skeletons de carregamento ──
function renderSkeleton(container) {
  container.innerHTML = Array(GITHUB_CONFIG.limit).fill(`
    <div class="project-card skeleton">
      <div class="sk-line sk-short"></div>
      <div class="sk-line sk-title"></div>
      <div class="sk-line"></div>
      <div class="sk-line sk-medium"></div>
      <div class="sk-tags">
        <div class="sk-tag"></div>
        <div class="sk-tag"></div>
      </div>
    </div>`).join('');
}

// ── Mensagem de erro ──
function renderError(container, err) {
  const messages = {
    rate_limit:     'Limite da API do GitHub atingido. Tente novamente em alguns minutos.',
    user_not_found: 'Usuário do GitHub não encontrado. Verifique GITHUB_CONFIG.username.',
  };

  const msg = messages[err.message] || 'Não foi possível carregar os projetos agora.';

  container.innerHTML = `
    <div class="projects-error">
      <p>⚠ ${msg}</p>
      <button class="btn btn-ghost" onclick="loadGithubProjects()">
        $ tentar_novamente()
      </button>
    </div>`;
}

// ── Utilitários ──
function getLangColor(lang) {
  return GITHUB_CONFIG.languageColors[lang] || GITHUB_CONFIG.languageColors.default;
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const now  = new Date();
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60)          return 'agora';
  if (diff < 3600)        return `há ${Math.floor(diff / 60)}min`;
  if (diff < 86400)       return `há ${Math.floor(diff / 3600)}h`;
  if (diff < 2592000)     return `há ${Math.floor(diff / 86400)}d`;
  if (diff < 31536000)    return `há ${Math.floor(diff / 2592000)} ${Math.floor(diff / 2592000) === 1 ? 'mês' : 'meses'}`;
  return `há ${Math.floor(diff / 31536000)} ano(s)`;
}

// ── Ícones SVG inline ──
const iconGithub = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;

const iconExternal = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

const iconStar = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;

const iconFork = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><line x1="12" y1="12" x2="12" y2="15"/></svg>`;

// ── Inicializa ao carregar a página ──
document.addEventListener('DOMContentLoaded', loadGithubProjects);
