import { ICONS } from './icons.js';
import { PROFILE, STACK_GROUPS, CONTENT } from './data.js';

const state = {
  lang: localStorage.getItem('pv_lang') === 'en' ? 'en' : 'es',
  theme: localStorage.getItem('pv_theme') === 'light' ? 'light' : 'dark',
  copied: false,
};

let copyTimer = null;

function applyPrefs() {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.lang = state.lang;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getSantiagoTime() {
  try {
    return new Intl.DateTimeFormat('es-CL', {
      timeZone: 'America/Santiago',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return '';
  }
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

  const localTime = getSantiagoTime();

  root.innerHTML = `
    <div class="page">
      <header class="header">
        <div class="identity">
          <h1>${escapeHtml(PROFILE.name)}</h1>
          <div class="role">${escapeHtml(t.role)}</div>
        </div>

        <div class="controls">
          <button type="button" class="ctrl-btn" data-action="lang" aria-label="Cambiar idioma">
            ${state.lang === 'es' ? 'EN' : 'ES'}
          </button>
          <span class="ctrl-sep">/</span>
          <button type="button" class="ctrl-btn" data-action="theme" aria-label="Cambiar tema">
            ${state.theme === 'dark' ? ICONS.sun : ICONS.moon}
          </button>
        </div>
      </header>

      <section class="intro">
        ${t.intro.map(p => `<p>${escapeHtml(p)}</p>`).join('')}

        <div class="contact-links">
          <button type="button" class="inline-link copy-btn" data-action="copy-email">
            <span>${escapeHtml(PROFILE.email)}</span>
            ${state.copied ? ICONS.check : ICONS.copy}
            ${state.copied ? `<span class="copied-feedback">${escapeHtml(t.links.copied)}</span>` : ''}
          </button>

          <a href="${escapeHtml(PROFILE.cvUrl)}" target="_blank" rel="noopener" class="inline-link">
            <span>${escapeHtml(t.links.cv)}</span>
            ${ICONS.arrowUpRight}
          </a>

          <a href="${escapeHtml(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer" class="inline-link">
            <span>LinkedIn</span>
            ${ICONS.arrowUpRight}
          </a>

          <a href="${escapeHtml(PROFILE.github)}" target="_blank" rel="noopener noreferrer" class="inline-link">
            <span>GitHub</span>
            ${ICONS.arrowUpRight}
          </a>
        </div>
      </section>

      <section class="section">
        <h2 class="section-label">${escapeHtml(t.headings.projects)}</h2>
        <div class="ledger interactive">
          ${t.projects
            .map(
              p => `
            <article class="row">
              <div class="row-meta">${escapeHtml(p.meta)}</div>
              <div class="row-main">
                <div class="row-head">
                  ${
                    p.url
                      ? `<a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer" class="row-title">
                          <span>${escapeHtml(p.title)}</span>
                          ${ICONS.arrowUpRight}
                        </a>`
                      : `<h3 class="row-title">${escapeHtml(p.title)}</h3>`
                  }
                </div>
                <p class="row-desc">${escapeHtml(p.desc)}</p>
                <div class="row-tech">
                  ${p.tech.map(item => `<span>${escapeHtml(item)}</span>`).join('')}
                </div>
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </section>

      <section class="section">
        <h2 class="section-label">${escapeHtml(t.headings.experience)}</h2>
        <div class="ledger">
          ${t.experience
            .map(
              xp => `
            <article class="row">
              <div class="row-meta">${escapeHtml(xp.period)}</div>
              <div class="row-main">
                <div class="row-head">
                  <h3 class="row-title">${escapeHtml(xp.company)}</h3>
                  <span class="row-sub">${escapeHtml(xp.role)}</span>
                </div>
                <ul class="bullets">
                  ${xp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
                </ul>
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </section>

      <section class="section">
        <h2 class="section-label">${escapeHtml(t.headings.stack)}</h2>
        <div class="ledger">
          ${STACK_GROUPS.map(
            g => `
            <div class="row">
              <div class="row-meta">${escapeHtml(state.lang === 'es' ? g.labelEs : g.labelEn)}</div>
              <div class="stack-items">
                ${g.items
                  .map(
                    it => `
                  <span class="stack-item">
                    ${it.logo ? `<span class="stack-ico">${it.logo}</span>` : ''}
                    <span>${escapeHtml(it.name)}</span>
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
        <h2 class="section-label">${escapeHtml(t.headings.education)}</h2>
        <div class="ledger">
          <div class="row">
            <div class="row-meta">${escapeHtml(t.education.period)}</div>
            <div class="row-main">
              <div class="row-head">
                <h3 class="row-title">${escapeHtml(t.education.school)}</h3>
                <span class="row-sub">${escapeHtml(t.education.degree)}</span>
              </div>
              <p class="row-desc" style="color: var(--fg-muted); font-size: 13.5px;">${escapeHtml(t.education.note)}</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <span>${escapeHtml(t.footerLocation)}${localTime ? ` · ${escapeHtml(localTime)} CLT` : ''}</span>
        <span>${escapeHtml(PROFILE.domain)}</span>
      </footer>
    </div>
  `;
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
