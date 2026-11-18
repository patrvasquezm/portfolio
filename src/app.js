import { ICONS } from './icons.js';
import { PROFILE, STACK_GROUPS, CONTENT } from './data.js';

const state = {
  lang: localStorage.getItem('pv_lang') === 'en' ? 'en' : 'es',
  theme: localStorage.getItem('pv_theme') === 'light' ? 'light' : 'dark',
  copied: false,
  termOpen: false,
  termHistory: [],
  booted: false,
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

function runTermCmd(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;
  const t = CONTENT[state.lang];

  if (cmd === 'clear') {
    state.termHistory = [];
    render();
    focusTerm();
    return;
  }

  let out = '';
  if (cmd === 'whoami') {
    out = `${PROFILE.name} — ${t.role} (${t.footerLocation})`;
  } else if (cmd === 'stack') {
    out = STACK_GROUPS.map(g => `${state.lang === 'es' ? g.labelEs : g.labelEn}: ${g.items.map(i => i.name).join(', ')}`).join('\n');
  } else if (cmd === 'projects') {
    out = t.projects.map(p => `• ${p.title} (${p.meta})`).join('\n');
  } else if (cmd === 'contact') {
    out = `email: ${PROFILE.email}\nlinkedin: ${PROFILE.linkedin}\ngithub: ${PROFILE.github}`;
  } else if (cmd === 'cv') {
    window.open(PROFILE.cvUrl, '_blank', 'noopener');
    out = `Opening ${PROFILE.cvUrl}...`;
  } else {
    out = t.term.unknown;
  }

  state.termHistory.push({ cmd: raw.trim(), out });
  render();
  focusTerm();
}

function focusTerm() {
  requestAnimationFrame(() => {
    const body = document.getElementById('term-scroll');
    if (body) body.scrollTop = body.scrollHeight;
    const inp = document.getElementById('term-input');
    if (inp) inp.focus();
  });
}

function render() {
  const t = CONTENT[state.lang];
  const root = document.getElementById('root');
  if (!root) return;

  const localTime = getSantiagoTime();
  const a1 = state.booted ? '' : 'anim-1';
  const a2 = state.booted ? '' : 'anim-2';
  const a3 = state.booted ? '' : 'anim-3';

  root.innerHTML = `
    <div class="page">
      <header class="header ${a1}">
        <div class="identity-wrap">
          <div class="monogram" aria-hidden="true">${escapeHtml(PROFILE.monogram)}</div>
          <div class="identity">
            <h1>${escapeHtml(PROFILE.name)}</h1>
            <div class="identity-sub">
              <span>${escapeHtml(t.role)}</span>
              <span class="identity-sep">·</span>
              <span class="status-inline">
                <span class="status-dot"></span>
                ${escapeHtml(t.status)}
              </span>
            </div>
          </div>
        </div>

        <div class="controls">
          <button type="button" class="ctrl-btn ${state.termOpen ? 'active' : ''}" data-action="term" title="Terminal">
            ${ICONS.terminal}
          </button>
          <button type="button" class="ctrl-btn" data-action="lang" aria-label="Idioma">
            ${state.lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button type="button" class="ctrl-btn" data-action="theme" aria-label="Tema">
            ${state.theme === 'dark' ? ICONS.sun : ICONS.moon}
          </button>
        </div>
      </header>

      ${
        state.termOpen
          ? `
        <div class="term-box">
          <div class="term-head">
            <span>patricio@dev:~</span>
            <div class="term-cmds">
              ${['whoami', 'projects', 'stack', 'contact', 'clear']
                .map(c => `<button type="button" class="term-chip" data-cmd="${c}">${c}</button>`)
                .join('')}
            </div>
          </div>
          <div class="term-body" id="term-scroll">
            <div class="term-line" style="color: var(--fg-muted);">${escapeHtml(t.term.welcome)}</div>
            ${state.termHistory
              .map(
                h => `
              <div class="term-line"><span class="term-prompt">$ ${escapeHtml(h.cmd)}</span>\n${escapeHtml(h.out)}</div>
            `
              )
              .join('')}
          </div>
          <form class="term-input-row" id="term-form">
            <span class="term-prompt">$</span>
            <input id="term-input" class="term-input" type="text" autocomplete="off" spellcheck="false" placeholder="whoami" />
          </form>
        </div>
      `
          : ''
      }

      <section class="intro ${a1}">
        ${t.intro.map(p => `<p>${escapeHtml(p)}</p>`).join('')}

        <div class="action-row">
          <button type="button" class="pill-link" data-action="copy-email">
            ${state.copied ? ICONS.check : ICONS.copy}
            <span>${escapeHtml(PROFILE.email)}</span>
            ${state.copied ? `<span class="copied-tag">${escapeHtml(t.links.copied)}</span>` : ''}
          </button>

          <a href="${escapeHtml(PROFILE.cvUrl)}" target="_blank" rel="noopener" class="pill-link">
            ${ICONS.file}
            <span>${escapeHtml(t.links.cv)}</span>
            <span class="ext-arr">${ICONS.arrowUpRight}</span>
          </a>

          <a href="${escapeHtml(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer" class="pill-link">
            ${ICONS.linkedin}
            <span>LinkedIn</span>
            <span class="ext-arr">${ICONS.arrowUpRight}</span>
          </a>

          <a href="${escapeHtml(PROFILE.github)}" target="_blank" rel="noopener noreferrer" class="pill-link">
            ${ICONS.github}
            <span>GitHub</span>
            <span class="ext-arr">${ICONS.arrowUpRight}</span>
          </a>
        </div>
      </section>

      <section class="section ${a2}">
        <h2 class="section-label">${escapeHtml(t.headings.projects)}</h2>
        <div class="projects-grid">
          ${t.projects
            .map(
              p => `
            <article class="proj-card">
              <div class="proj-top">
                ${
                  p.url
                    ? `<a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer" class="proj-title">
                        <span>${escapeHtml(p.title)}</span>
                        ${ICONS.arrowUpRight}
                      </a>`
                    : `<h3 class="proj-title">${escapeHtml(p.title)}</h3>`
                }
                <span class="proj-meta">${escapeHtml(p.meta)}</span>
              </div>

              <p class="proj-desc">${escapeHtml(p.desc)}</p>

              <div class="proj-pipeline">
                ${p.flow
                  .map(
                    (step, idx) =>
                      `<span>${escapeHtml(step)}</span>${idx < p.flow.length - 1 ? '<span class="arr">→</span>' : ''}`
                  )
                  .join('')}
              </div>

              <div class="proj-tags">
                ${p.tech.map(item => `<span>${escapeHtml(item)}</span>`).join('')}
              </div>
            </article>
          `
            )
            .join('')}
        </div>
      </section>

      <section class="section ${a3}">
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

      <section class="section ${a3}">
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

      <section class="section ${a3}">
        <h2 class="section-label">${escapeHtml(t.headings.education)}</h2>
        <div class="ledger">
          <div class="row">
            <div class="row-meta">${escapeHtml(t.education.period)}</div>
            <div class="row-main">
              <div class="row-head">
                <h3 class="row-title">${escapeHtml(t.education.school)}</h3>
                <span class="row-sub">${escapeHtml(t.education.degree)}</span>
              </div>
              <p style="color: var(--fg-muted); font-size: 13.5px;">${escapeHtml(t.education.note)}</p>
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

  state.booted = true;
}

document.addEventListener('click', e => {
  const cmdChip = e.target.closest('[data-cmd]');
  if (cmdChip) {
    runTermCmd(cmdChip.dataset.cmd);
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
  } else if (action === 'term') {
    state.termOpen = !state.termOpen;
    render();
    if (state.termOpen) focusTerm();
  }
});

document.addEventListener('submit', e => {
  if (e.target && e.target.id === 'term-form') {
    e.preventDefault();
    const inp = document.getElementById('term-input');
    if (inp && inp.value) {
      runTermCmd(inp.value);
    }
  }
});

applyPrefs();
render();
