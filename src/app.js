import { THEMES, PROFILE, STACK_GROUPS, CONTENT } from './data.js';

const savedTheme = localStorage.getItem('pv_tui_theme');
const state = {
  lang: localStorage.getItem('pv_lang') === 'en' ? 'en' : 'es',
  theme: THEMES.includes(savedTheme) ? savedTheme : 'ghostty',
  copied: false,
  history: [],
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

function renderPs1() {
  return `<span class="ps1"><span class="u">${esc(PROFILE.user)}@${esc(PROFILE.host)}</span>:<span class="p">~</span><span class="dlr">$</span></span>`;
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

function cycleTheme(specific) {
  if (specific && THEMES.includes(specific)) {
    state.theme = specific;
  } else {
    state.theme = THEMES[(THEMES.indexOf(state.theme) + 1) % THEMES.length];
  }
  localStorage.setItem('pv_tui_theme', state.theme);
  applyPrefs();
  render();
}

function toggleLang(specific) {
  state.lang = specific === 'es' || specific === 'en' ? specific : state.lang === 'es' ? 'en' : 'es';
  localStorage.setItem('pv_lang', state.lang);
  applyPrefs();
  render();
}

function runCommand(raw) {
  const input = raw.trim();
  if (!input) return;
  const cmd = input.toLowerCase();

  if (cmd === 'clear' || cmd === 'cls') {
    state.history = [];
    render(true);
    return;
  }

  let out = '';
  if (cmd === 'help' || cmd === '?') {
    out =
      state.lang === 'es'
        ? [
            'cv           abrir currículum en PDF',
            'email        copiar correo al portapapeles',
            'pectacular   abrir pectacular.cl en nueva pestaña',
            'theme        cambiar tema (ghostty, gruvbox, phosphor, paper)',
            'lang         cambiar idioma (ES / EN)',
            'clear        limpiar salida de consola',
          ].join('\n')
        : [
            'cv           open PDF resume',
            'email        copy email to clipboard',
            'pectacular   open pectacular.cl in new tab',
            'theme        cycle theme (ghostty, gruvbox, phosphor, paper)',
            'lang         switch language (ES / EN)',
            'clear        clear prompt output',
          ].join('\n');
  } else if (cmd === 'cv' || cmd === 'resume') {
    window.open(PROFILE.cvUrl, '_blank', 'noopener');
    out = `-> ${PROFILE.cvUrl}`;
  } else if (cmd === 'email' || cmd === 'contact') {
    copyEmail();
    out = `${PROFILE.email} (${CONTENT[state.lang].links.copied})`;
  } else if (cmd === 'pectacular' || cmd === 'open pectacular') {
    window.open('https://www.pectacular.cl', '_blank', 'noopener');
    out = '-> https://www.pectacular.cl';
  } else if (cmd.startsWith('theme')) {
    const arg = cmd.split(/\s+/)[1];
    cycleTheme(arg);
    out = `theme: ${state.theme}`;
  } else if (cmd.startsWith('lang')) {
    const arg = cmd.split(/\s+/)[1];
    toggleLang(arg);
    out = `lang: ${state.lang}`;
  } else if (cmd === 'whoami') {
    out = `${PROFILE.name} — ${CONTENT[state.lang].role}`;
  } else {
    out =
      state.lang === 'es'
        ? `comando no encontrado: ${input} (escribe 'help')`
        : `command not found: ${input} (type 'help')`;
  }

  state.history.push({ cmd: input, out });
  render(true);
}

function render(focusBottom = false) {
  const t = CONTENT[state.lang];
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div class="term-win">
      <header class="term-bar">
        <div class="term-title">
          <span class="win-dots" aria-hidden="true"><span></span><span></span><span></span></span>
          <span>${esc(PROFILE.user)}@${esc(PROFILE.host)}: ~</span>
        </div>

        <div class="term-controls">
          <button type="button" class="bar-btn" data-action="lang">
            lang:<span class="v">${esc(state.lang.toUpperCase())}</span>
          </button>
          <button type="button" class="bar-btn" data-action="theme">
            theme:<span class="v">${esc(state.theme)}</span>
          </button>
        </div>
      </header>

      <main class="term-body">
        <!-- 1. whoami -->
        <section class="cmd-block">
          <div class="prompt-line">
            ${renderPs1()}
            <span class="cmd-text">${esc(t.cmds.about)}</span>
          </div>

          <h1 class="who-name">${esc(PROFILE.name)}</h1>
          <div class="who-meta">
            <span class="who-role">${esc(t.role)}</span>
            <span>·</span>
            <span>${esc(t.location)}</span>
            <span>·</span>
            <span class="who-status">${esc(t.status)}</span>
          </div>

          ${t.bio.map(p => `<p class="bio-p">${esc(p)}</p>`).join('')}

          <div class="link-strip">
            <button type="button" class="cli-link ${state.copied ? 'copied' : ''}" data-action="copy-email">
              [${esc(state.copied ? t.links.copied : PROFILE.email)}]
            </button>
            <a href="${esc(PROFILE.cvUrl)}" target="_blank" rel="noopener" class="cli-link">
              [${esc(t.links.cv)} ↗]
            </a>
            <a href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer" class="cli-link">
              [linkedin ↗]
            </a>
            <a href="${esc(PROFILE.github)}" target="_blank" rel="noopener noreferrer" class="cli-link">
              [github ↗]
            </a>
          </div>
        </section>

        <!-- 2. projects -->
        <section class="cmd-block">
          <div class="prompt-line">
            ${renderPs1()}
            <span class="cmd-text">${esc(t.cmds.projects)}</span>
          </div>

          <div class="proj-list">
            ${t.projects
              .map(
                p => `
              <article class="proj-item">
                <div class="proj-head">
                  <div class="proj-head-left">
                    <span class="proj-idx">${esc(p.idx)}</span>
                    ${
                      p.url
                        ? `<a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" class="proj-title">${esc(p.title)} ↗</a>`
                        : `<h2 class="proj-title">${esc(p.title)}</h2>`
                    }
                  </div>
                  <span class="proj-ctx">${esc(p.ctx)}</span>
                </div>
                <p class="proj-desc">${esc(p.desc)}</p>
                <div class="proj-tags">
                  ${p.tags.map(tag => `<span>${esc(tag)}</span>`).join('')}
                </div>
              </article>
            `
              )
              .join('')}
          </div>
        </section>

        <!-- 3. stack -->
        <section class="cmd-block">
          <div class="prompt-line">
            ${renderPs1()}
            <span class="cmd-text">${esc(t.cmds.stack)}</span>
          </div>

          <div class="stack-rows">
            ${STACK_GROUPS.map(
              g => `
              <div class="stack-row">
                <span class="stack-key">${esc(state.lang === 'es' ? g.labelEs : g.labelEn)}</span>
                <div class="stack-vals">
                  ${g.items
                    .map(
                      it => `
                    <span class="stack-item">
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

        <!-- 4. experience & education -->
        <section class="cmd-block">
          <div class="prompt-line">
            ${renderPs1()}
            <span class="cmd-text">${esc(t.cmds.experience)}</span>
          </div>

          <div class="tl-list">
            ${t.timeline
              .map(
                item => `
              <div class="tl-item">
                <span class="tl-period">${esc(item.period)}</span>
                <div>
                  <div class="tl-org">${esc(item.org)}</div>
                  <div class="tl-role">${esc(item.role)}</div>
                  <ul class="tl-bullets">
                    ${item.bullets.map(b => `<li>${esc(b)}</li>`).join('')}
                  </ul>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </section>

        <!-- 5. Calm interactive prompt at the end -->
        <section class="live-shell">
          ${
            state.history.length > 0
              ? `
            <div class="shell-history">
              ${state.history
                .map(
                  h => `
                <div>
                  <div>${renderPs1()} <span class="cmd-text">${esc(h.cmd)}</span></div>
                  <div class="sh-out">${esc(h.out)}</div>
                </div>
              `
                )
                .join('')}
            </div>
          `
              : ''
          }

          <form class="prompt-form" id="prompt-form">
            ${renderPs1()}
            <input
              id="prompt-input"
              class="prompt-input"
              type="text"
              placeholder="${esc(t.promptPlaceholder)}"
              autocomplete="off"
              spellcheck="false"
            />
          </form>

          <div class="prompt-hints">
            <span>//</span>
            ${['help', 'cv', 'email', 'pectacular', 'theme', 'clear']
              .map(cmd => `<button type="button" class="hint-btn" data-cmd="${cmd}">${cmd}</button>`)
              .join('·')}
          </div>
        </section>
      </main>
    </div>
  `;

  if (focusBottom) {
    requestAnimationFrame(() => {
      const inp = document.getElementById('prompt-input');
      if (inp) {
        inp.focus();
        inp.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
}

document.addEventListener('click', e => {
  const cmdBtn = e.target.closest('[data-cmd]');
  if (cmdBtn) {
    runCommand(cmdBtn.dataset.cmd);
    return;
  }

  const act = e.target.closest('[data-action]');
  if (!act) return;
  const a = act.dataset.action;
  if (a === 'theme') cycleTheme();
  else if (a === 'lang') toggleLang();
  else if (a === 'copy-email') copyEmail();
});

document.addEventListener('submit', e => {
  if (e.target && e.target.id === 'prompt-form') {
    e.preventDefault();
    const inp = document.getElementById('prompt-input');
    if (inp && inp.value) runCommand(inp.value);
  }
});

applyPrefs();
render();
