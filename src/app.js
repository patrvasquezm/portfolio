import { ICONS } from './icons.js';
import { PROFILE, STACK_GROUPS, CONTENT } from './data.js';

const state = {
  lang: localStorage.getItem('pv_lang') === 'en' ? 'en' : 'es',
  theme: localStorage.getItem('pv_theme') === 'light' ? 'light' : 'dark',
  copied: false,
  openArch: new Set(['pectacular']),
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
  const s = t.statementParts;

  root.innerHTML = `
    <div class="page">
      <div class="topbar">
        <div class="topbar-left">
          <span class="reg-mark" aria-hidden="true"></span>
          <span>${escapeHtml(t.footerLocation)}</span>
          <span class="coords-hide-sm">· ${escapeHtml(PROFILE.coords)}</span>
          ${localTime ? `<span>· ${escapeHtml(localTime)} CLT</span>` : ''}
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
      </div>

      <header class="hero">
        <div class="identity-row">
          <h1>${escapeHtml(PROFILE.name)}</h1>
          <span class="identity-role">${escapeHtml(t.role)}</span>
        </div>

        <p class="statement">
          ${escapeHtml(s.before)}<em>${escapeHtml(s.italic1)}</em>${escapeHtml(s.mid)}<em>${escapeHtml(s.italic2)}</em>${escapeHtml(s.after)}
        </p>

        <p class="bio">${escapeHtml(t.intro)}</p>

        <div class="action-strip">
          <button type="button" class="keycap ${state.copied ? 'copied' : ''}" data-action="copy-email">
            <span>${escapeHtml(state.copied ? `${PROFILE.email} (${t.links.copied})` : PROFILE.email)}</span>
            ${state.copied ? ICONS.check : ICONS.copy}
          </button>

          <a href="${escapeHtml(PROFILE.cvUrl)}" target="_blank" rel="noopener" class="keycap">
            <span>${escapeHtml(t.links.cv)}</span>
            ${ICONS.arrowUpRight}
          </a>

          <a href="${escapeHtml(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer" class="keycap">
            <span>LinkedIn</span>
            ${ICONS.arrowUpRight}
          </a>

          <a href="${escapeHtml(PROFILE.github)}" target="_blank" rel="noopener noreferrer" class="keycap">
            <span>GitHub</span>
            ${ICONS.arrowUpRight}
          </a>
        </div>
      </header>

      <section class="section">
        <div class="section-head">
          <h2 class="section-label">${escapeHtml(t.headings.projects)}</h2>
          <span class="section-rule"></span>
        </div>

        <div class="ledger interactive">
          ${t.projects
            .map(p => {
              const isOpen = state.openArch.has(p.id);
              return `
                <article class="row">
                  <div class="row-meta">
                    <span class="proj-idx">${escapeHtml(p.idx)}</span>
                    <span>${escapeHtml(p.meta)}</span>
                  </div>
                  <div class="row-main">
                    <div class="row-head">
                      <div class="row-head-left">
                        ${
                          p.url
                            ? `<a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer" class="row-title">
                                <span>${escapeHtml(p.title)}</span>
                                ${ICONS.arrowUpRight}
                              </a>`
                            : `<h3 class="row-title">${escapeHtml(p.title)}</h3>`
                        }
                      </div>
                      <button type="button" class="arch-btn ${isOpen ? 'open' : ''}" data-arch="${escapeHtml(p.id)}">
                        ${escapeHtml(isOpen ? t.archToggle.hide : t.archToggle.show)}
                      </button>
                    </div>

                    <p class="row-desc">${escapeHtml(p.desc)}</p>

                    ${
                      isOpen
                        ? `
                      <div class="schematic">
                        <div class="schematic-flow">
                          ${p.flow
                            .map(
                              (step, idx) =>
                                `<span class="flow-node">${escapeHtml(step)}</span>${
                                  idx < p.flow.length - 1 ? '<span class="flow-arrow">→</span>' : ''
                                }`
                            )
                            .join('')}
                        </div>
                        <div class="schematic-note">${escapeHtml(p.archNote)}</div>
                      </div>
                    `
                        : ''
                    }

                    <div class="row-tech">
                      ${p.tech.map(item => `<span>${escapeHtml(item)}</span>`).join('')}
                    </div>
                  </div>
                </article>
              `;
            })
            .join('')}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2 class="section-label">${escapeHtml(t.headings.experience)}</h2>
          <span class="section-rule"></span>
        </div>

        <div class="ledger">
          ${t.experience
            .map(
              xp => `
            <article class="row">
              <div class="row-meta">${escapeHtml(xp.period)}</div>
              <div class="row-main">
                <div class="row-head-left" style="margin-bottom: 6px;">
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
        <div class="section-head">
          <h2 class="section-label">${escapeHtml(t.headings.stack)}</h2>
          <span class="section-rule"></span>
        </div>

        <div class="ledger">
          ${STACK_GROUPS.map(
            g => `
            <div class="row">
              <div class="row-meta">${escapeHtml(state.lang === 'es' ? g.labelEs : g.labelEn)}</div>
              <div class="stack-items">
                ${g.items
                  .map(
                    it => `
                  <span class="stack-chip">
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
        <div class="section-head">
          <h2 class="section-label">${escapeHtml(t.headings.education)}</h2>
          <span class="section-rule"></span>
        </div>

        <div class="ledger">
          <div class="row">
            <div class="row-meta">${escapeHtml(t.education.period)}</div>
            <div class="row-main">
              <div class="row-head-left" style="margin-bottom: 4px;">
                <h3 class="row-title">${escapeHtml(t.education.school)}</h3>
                <span class="row-sub">${escapeHtml(t.education.degree)}</span>
              </div>
              <p class="row-desc" style="color: var(--fg-muted); font-size: 13.5px;">${escapeHtml(t.education.note)}</p>
            </div>
          </div>
        </div>
      </section>

      <footer class="footer">
        <span class="footer-sig">
          <span class="reg-mark" aria-hidden="true"></span>
          <span>${escapeHtml(PROFILE.name)} · ${new Date().getFullYear()}</span>
        </span>
        <span>${escapeHtml(PROFILE.domain)}</span>
      </footer>
    </div>
  `;
}

document.addEventListener('click', e => {
  const archBtn = e.target.closest('[data-arch]');
  if (archBtn) {
    const id = archBtn.dataset.arch;
    if (state.openArch.has(id)) state.openArch.delete(id);
    else state.openArch.add(id);
    render();
    return;
  }

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
