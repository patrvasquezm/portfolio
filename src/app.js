import { ICONS } from './icons.js';
import { PROFILE, STACK_GROUPS, CONTENT } from './data.js';

const state = {
  lang: localStorage.getItem('pv_lang') === 'en' ? 'en' : 'es',
  theme: localStorage.getItem('pv_theme') === 'light' ? 'light' : 'dark',
  copied: false,
  booted: false,
};

let copyTimer = null;

function applyPrefs() {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.lang = state.lang;
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(PROFILE.email);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = PROFILE.email;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  state.copied = true;
  if (copyTimer) clearTimeout(copyTimer);
  render();
  copyTimer = setTimeout(() => {
    state.copied = false;
    render();
  }, 2000);
}

function render() {
  const t = CONTENT[state.lang];
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <main class="page ${state.booted ? '' : 'fade'}">
      <header class="header">
        <div class="identity">
          <h1>${esc(PROFILE.name)}</h1>
          <div class="subtitle">${esc(t.subtitle)}</div>
        </div>

        <div class="controls">
          <button type="button" class="ctrl-btn" data-action="lang" aria-label="Idioma">
            ${state.lang === 'es' ? 'EN' : 'ES'}
          </button>
          <span class="ctrl-sep">/</span>
          <button type="button" class="ctrl-btn" data-action="theme" aria-label="Tema">
            ${state.theme === 'dark' ? ICONS.sun : ICONS.moon}
          </button>
        </div>
      </header>

      <section class="intro">
        ${t.intro.map(p => `<p>${esc(p)}</p>`).join('')}

        <div class="links">
          <button type="button" class="link" data-action="copy-email">
            <span>${esc(PROFILE.email)}</span>
            ${state.copied ? ICONS.check : ICONS.copy}
            ${state.copied ? `<span class="copied-note">${esc(t.links.copied)}</span>` : ''}
          </button>

          <a href="${esc(PROFILE.cvUrl)}" target="_blank" rel="noopener" class="link">
            <span>${esc(t.links.cv)}</span>
            ${ICONS.arrowUpRight}
          </a>

          <a href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer" class="link">
            <span>LinkedIn</span>
            ${ICONS.arrowUpRight}
          </a>

          <a href="${esc(PROFILE.github)}" target="_blank" rel="noopener noreferrer" class="link">
            <span>GitHub</span>
            ${ICONS.arrowUpRight}
          </a>
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">${esc(t.headings.projects)}</h2>
        <div class="list focusable">
          ${t.projects
            .map(
              p => `
            <article class="item">
              <div class="item-meta">${esc(p.meta)}</div>
              <div>
                <div class="item-head">
                  ${
                    p.url
                      ? `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" class="item-title">
                          <span>${esc(p.title)}</span>
                          ${ICONS.arrowUpRight}
                        </a>`
                      : `<h3 class="item-title">${esc(p.title)}</h3>`
                  }
                </div>
                <p class="item-desc">${esc(p.desc)}</p>
                <div class="item-tech">
                  ${p.tech.map(item => `<span>${esc(item)}</span>`).join('')}
                </div>
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">${esc(t.headings.experience)}</h2>
        <div class="list">
          ${t.experience
            .map(
              xp => `
            <article class="item">
              <div class="item-meta">${esc(xp.period)}</div>
              <div>
                <div class="item-head">
                  <h3 class="item-title">${esc(xp.company)}</h3>
                  <span class="item-sub">${esc(xp.role)}</span>
                </div>
                <ul class="bullets">
                  ${xp.bullets.map(b => `<li>${esc(b)}</li>`).join('')}
                </ul>
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">${esc(t.headings.stack)}</h2>
        <div class="list">
          ${STACK_GROUPS.map(
            g => `
            <div class="item">
              <div class="item-meta">${esc(state.lang === 'es' ? g.labelEs : g.labelEn)}</div>
              <div class="stack-list">
                ${g.items
                  .map(
                    it => `
                  <span class="stack-entry">
                    <span class="stack-ico">${it.logo}</span>
                    <span>${esc(it.name)}</span>
                  </span>
                `
                  )
                  .join('')}
              </div>
            </div>
          `
          ).join('')}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">${esc(t.headings.education)}</h2>
        <div class="list">
          <div class="item">
            <div class="item-meta">${esc(t.education.period)}</div>
            <div>
              <div class="item-head">
                <h3 class="item-title">${esc(t.education.school)}</h3>
                <span class="item-sub">${esc(t.education.degree)}</span>
              </div>
              <p class="item-desc" style="color: var(--fg-muted); font-size: 13.5px;">${esc(t.education.note)}</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <span>${esc(PROFILE.name)}</span>
        <span>${esc(t.footerRight)}</span>
      </footer>
    </main>
  `;

  state.booted = true;
}

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;

  if (action === 'theme') {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('pv_theme', state.theme);
    applyPrefs();
    render();
  } else if (action === 'lang') {
    state.lang = state.lang === 'es' ? 'en' : 'es';
    localStorage.setItem('pv_lang', state.lang);
    applyPrefs();
    render();
  } else if (action === 'copy-email') {
    copyEmail();
  }
});

applyPrefs();
render();
