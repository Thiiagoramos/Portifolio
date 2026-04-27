# Thiago Ramos — Portfólio Pessoal

Site de portfólio profissional com foco em **dados e engenharia de computação**, desenvolvido com HTML, CSS e JavaScript puro. Design inspirado em interfaces de terminal com tema escuro.

🌐 **[thiiagoramos.github.io](https://thiiagoramos.github.io/Portifolio/)** 

---

## Funcionalidades

- **Navbar fixa** com scroll spy — destaca automaticamente a seção visível
- **Efeito de digitação** no hero com rotação de papéis profissionais
- **Projetos dinâmicos** via API pública do GitHub — sem atualização manual
- **Skeleton loader** enquanto os projetos carregam
- **Barras de habilidade animadas** separadas por categoria (dados vs. desenvolvimento)
- **Tecnologias em grupos** — dados em destaque, desenvolvimento como complemento
- **Formulário de contato** integrado ao Formspree
- **Design responsivo** — adaptado para mobile, tablet e desktop
- **Efeito scanlines** sutil no overlay para reforçar a estética terminal

---

## Estrutura do projeto

```
portfolio/
├── index.html
├── styles/
│   ├── vars.css          # tokens de cor e tipografia
│   ├── reset.css         # normalização base + scanlines
│   ├── navbar.css        # barra de navegação fixa no topo
│   ├── main.css          # layout base e componentes reutilizáveis
│   ├── hero.css          # seção inicial
│   ├── sobre.css         # bio, status, skills e ferramentas
│   ├── tecnologias.css   # grid de cards por categoria
│   ├── projetos.css      # cards estilo terminal + skeleton loader
│   ├── contato.css       # formulário e redes sociais
│   └── footer.css        # rodapé
└── js/
    ├── navbar.js         # toggle mobile e scroll spy
    ├── github.js         # integração com API do GitHub
    ├── typing.js         # efeito de digitação no hero
    ├── animations.js     # fade-in e barras de skill animadas
    └── form.js           # validação e envio via Formspree
```

---

## Configuração

### 1. Projetos automáticos via GitHub

Abra `js/github.js` e edite o bloco de configuração no topo do arquivo:

```js
const GITHUB_CONFIG = {
  username: 'seu-usuario-github', // <- seu usuário real aqui
  exclude:  ['seu-usuario-github'], // repositórios para ocultar
  sortBy:   'updated',              // 'updated' | 'stars' | 'created'
  limit:    6,                      // máximo de projetos exibidos
};
```

Os projetos são buscados automaticamente a cada carregamento da página. Para controlar o que aparece em cada card, use os **Topics** do repositório no GitHub — eles viram badges coloridos automaticamente.

### 2. Formulário de contato

O formulário usa o [Formspree](https://formspree.io). Para ativá-lo:

1. Crie uma conta gratuita em [formspree.io](https://formspree.io)
2. Crie um novo formulário e copie o ID gerado
3. Em `js/form.js`, substitua o endpoint:

```js
const response = await fetch('https://formspree.io/f/SEU_ID_AQUI', {
```

4. No painel do Formspree → **Integration** → **Allowed Domains**, adicione o domínio do seu portfólio

> O plano gratuito permite 50 envios por mês.

---

## Como rodar localmente

Você precisa de um servidor HTTP local — abrir o `index.html` direto no navegador (`file://`) impede o funcionamento da API do GitHub e do Formspree.

Com Python instalado, rode na pasta do projeto:

```bash
python -m http.server 8000
```

Acesse em seguida: [http://localhost:8000](http://localhost:8000)

---

## Como publicar no GitHub Pages

1. Crie um repositório com o nome `seu-usuario.github.io`
2. Faça o upload de todos os arquivos na raiz do repositório
3. Acesse **Settings → Pages**, selecione a branch `main` e salve
4. O site estará disponível em `https://seu-usuario.github.io` em alguns minutos

A cada novo `git push`, o site é atualizado automaticamente.

---

## Personalização

| O que mudar | Onde |
|---|---|
| Nome, bio e textos | `index.html` |
| Cores e fontes | `styles/vars.css` |
| Papéis no efeito de digitação | `js/typing.js` |
| Usuário do GitHub | `js/github.js` |
| Links do LinkedIn e GitHub | `index.html` — seção `#contato` |
| Endpoint do formulário | `js/form.js` |

---

## Tecnologias utilizadas

- **HTML5** — estrutura semântica
- **CSS3** — variáveis, grid, flexbox, animações e backdrop-filter
- **JavaScript** — Fetch API, IntersectionObserver, manipulação do DOM
- **GitHub API** — `api.github.com/users/:user/repos`
- **Formspree** — processamento do formulário de contato
- **JetBrains Mono** — tipografia principal (Google Fonts)
- **Devicon** — ícones de tecnologias

---

## Licença

Este projeto é de uso pessoal. Sinta-se livre para usar como referência ou base para o seu próprio portfólio.
