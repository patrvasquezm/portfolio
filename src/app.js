import { THEMES, PROFILE, STACK_PACKAGES, CONTENT } from './data.js';

const savedTheme = localStorage.getItem('pv_tui_theme');
const state = {
  lang: localStorage.getItem('pv_lang') === 'en' ? 'en' : 'es',
  theme: THEMES.includes(savedTheme) ? savedTheme : 'ghostty',
  window: 'overview',
  selectedProject: 'pectacular',
  stackFilter: 'all',
  copied: false,
  toastMsg: '',
  shellHistory: [],
  cmdHistory: [],
  cmdHistoryIdx: -1,
};

const COMMANDS = [
  'help',
  'ls',
  'whoami',
  'neofetch',
  'projects',
  'open pectacular',
  'stack',
  'career',
  'contact',
  'cv',
  'email',
  'theme',
  'lang',
  'uname -a',
  'sudo hire patricio',
  'clear',
];

let toastTimer = null;

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

function getSantiagoClock() {
  try {
    return new Intl.DateTimeFormat('es-CL', {
      timeZone: 'America/Santiago',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return '';
  }
}

function showToast(msg) {
  state.toastMsg = msg;
  if (toastTimer) clearTimeout(toastTimer);
  render();
  toastTimer = setTimeout(() => {
    state.toastMsg = '';
    render();
  }, 2400);
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
  const t = CONTENT[state.lang];
  showToast(`[ok] ${t.actions.copied} (${PROFILE.email})`);
  setTimeout(() => {
    state.copied = false;
  }, 2200);
}

function cycleTheme(specific) {
  if (specific && THEMES.includes(specific)) {
    state.theme = specific;
  } else {
    const idx = THEMES.indexOf(state.theme);
    state.theme = THEMES[(idx + 1) % THEMES.length];
  }
  localStorage.setItem('pv_tui_theme', state.theme);
  applyPrefs();
  showToast(`theme -> ${state.theme}`);
}

function toggleLang(specific) {
  if (specific === 'es' || specific === 'en') {
    state.lang = specific;
  } else {
    state.lang = state.lang === 'es' ? 'en' : 'es';
  }
  localStorage.setItem('pv_lang', state.lang);
  applyPrefs();
  showToast(`lang -> ${state.lang.toUpperCase()}`);
}

function executeCliCommand(raw) {
  const input = raw.trim();
  if (!input) return;

  state.cmdHistory.push(input);
  state.cmdHistoryIdx = state.cmdHistory.length;

  const cmd = input.toLowerCase();
  const t = CONTENT[state.lang];
  let out = '';

  if (cmd === 'clear' || cmd === 'cls') {
    state.shellHistory = [];
    render();
    focusPrompt();
    return;
  }

  if (cmd === 'help' || cmd === '?') {
    out =
      state.lang === 'es'
        ? [
            'Comandos disponibles:',
            '  whoami              resumen de perfil',
            '  projects / ls       abrir explorador de proyectos [ventana 2]',
            '  open pectacular     visitar pectacular.cl en nueva pestaña',
            '  stack               ver tabla de tecnologías [ventana 3]',
            '  career / git log    ver experiencia y educación [ventana 4]',
            '  contact             mostrar enlaces de contacto',
            '  email               copiar correo al portapapeles',
            '  cv                  abrir currículum en PDF',
            '  theme [nombre]      cambiar tema (ghostty, gruvbox, phosphor, paper)',
            '  lang [es|en]        alternar idioma español / inglés',
            '  clear               limpiar consola',
          ].join('\n')
        : [
            'Available commands:',
            '  whoami              profile summary',
            '  projects / ls       open project explorer [window 2]',
            '  open pectacular     launch pectacular.cl in new tab',
            '  stack               inspect tech stack [window 3]',
            '  career / git log    view experience & education [window 4]',
            '  contact             print contact endpoints',
            '  email               copy email to clipboard',
            '  cv                  open PDF resume',
            '  theme [name]        switch theme (ghostty, gruvbox, phosphor, paper)',
            '  lang [es|en]        switch Spanish / English',
            '  clear               clear console output',
          ].join('\n');
    state.window = 'shell';
  } else if (cmd === 'whoami') {
    out = `${PROFILE.name}\n${t.neofetch.map(r => `  ${r.k.padEnd(10)}: ${r.v}`).join('\n')}`;
    state.window = 'shell';
  } else if (cmd === 'neofetch' || cmd === '1' || cmd === 'home') {
    state.window = 'overview';
    out = 'switched -> [1:inicio]';
  } else if (cmd === 'projects' || cmd === 'proyectos' || cmd === 'ls' || cmd === 'cd projects' || cmd === '2') {
    state.window = 'projects';
    out = t.projects.map(p => `drwxr-xr-x  ${p.file.padEnd(16)} ${p.status.padEnd(8)} ${p.title}`).join('\n');
  } else if (cmd === 'open pectacular' || cmd === 'pectacular') {
    window.open('https://www.pectacular.cl', '_blank', 'noopener');
    out = 'opening https://www.pectacular.cl ...';
  } else if (cmd === 'stack' || cmd === '3') {
    state.window = 'stack';
    out = 'switched -> [3:stack]';
  } else if (cmd === 'career' || cmd === 'git log' || cmd === 'experience' || cmd === '4') {
    state.window = 'career';
    out = 'switched -> [4:git-log]';
  } else if (cmd === 'contact' || cmd === 'cat contact.yml') {
    out = [
      `email    : ${PROFILE.email}`,
      `linkedin : ${PROFILE.linkedin}`,
      `github   : ${PROFILE.github}`,
      `cv       : ${PROFILE.cvUrl}`,
    ].join('\n');
    state.window = 'shell';
  } else if (cmd === 'email') {
    copyEmail();
    out = `copied -> ${PROFILE.email}`;
  } else if (cmd === 'cv' || cmd === 'resume') {
    window.open(PROFILE.cvUrl, '_blank', 'noopener');
    out = `opening ${PROFILE.cvUrl} ...`;
  } else if (cmd.startsWith('theme')) {
    const arg = cmd.split(/\s+/)[1];
    cycleTheme(arg);
    out = `active theme: ${state.theme} (options: ${THEMES.join(', ')})`;
  } else if (cmd.startsWith('lang')) {
    const arg = cmd.split(/\s+/)[1];
    toggleLang(arg);
    out = `active language: ${state.lang}`;
  } else if (cmd === 'uname -a') {
    out = 'Linux santiago-dev 6.12.0-arch1 #1 SMP PREEMPT_DYNAMIC x86_64 Data/AI GNU/Linux';
    state.window = 'shell';
  } else if (cmd.startsWith('sudo')) {
    out =
      state.lang === 'es'
        ? `[sudo] acceso concedido -> envía un mensaje a ${PROFILE.email} o abre LinkedIn (${PROFILE.linkedinShort})`
        : `[sudo] access granted -> reach out at ${PROFILE.email} or LinkedIn (${PROFILE.linkedinShort})`;
    state.window = 'shell';
  } else {
    out =
      state.lang === 'es'
        ? `zsh: comando no encontrado: ${input}  (escribe 'help' para ver opciones)`
        : `zsh: command not found: ${input}  (type 'help' for available commands)`;
    state.window = 'shell';
  }

  state.shellHistory.push({ cmd: input, out });
  render();
  focusPrompt();
}

function focusPrompt() {
  requestAnimationFrame(() => {
    const log = document.getElementById('shell-log');
    if (log) log.scrollTop = log.scrollHeight;
    const inp = document.getElementById('cli-input');
    if (inp) inp.focus();
  });
}

/* ------- Window Renderers ------- */

function renderOverview(t) {
  const corePreview = STACK_PACKAGES.slice(0, 9);

  return `
    <div class="overview-grid">
      <!-- Left Column: neofetch + mini git log -->
      <div class="left-stack">
        <section class="pane focused">
          <div class="pane-title"><span class="idx-tag">[0]</span>neofetch --profile</div>
          <pre class="ascii-logo">${esc(PROFILE.asciiLogo)}</pre>
          <div class="nf-header">
            <span class="u">${esc(PROFILE.user)}</span>@<span class="h">${esc(PROFILE.host)}</span>
          </div>
          <div class="nf-rows">
            ${t.neofetch
              .map(
                r => `
              <div class="nf-row">
                <span class="nf-k">${esc(r.k)}</span>
                <span class="nf-v ${r.ok ? 'ok' : ''}">${esc(r.v)}</span>
              </div>
            `
              )
              .join('')}
          </div>

          <div class="ansi-swatches">
            <div class="swatch-row">
              <span class="swatch" style="background:var(--c-red)"></span>
              <span class="swatch" style="background:var(--c-amber)"></span>
              <span class="swatch" style="background:var(--c-green)"></span>
              <span class="swatch" style="background:var(--c-cyan)"></span>
              <span class="swatch" style="background:var(--c-blue)"></span>
              <span class="swatch" style="background:var(--c-magenta)"></span>
            </div>
            <button type="button" class="swatch-hint" data-action="theme">[t] ${esc(state.theme)}</button>
          </div>
        </section>

        <section class="pane">
          <div class="pane-title"><span class="idx-tag">[3]</span>${esc(t.miniCareerTitle)}</div>
          <div class="mini-log-list">
            ${t.commits
              .map(
                c => `
              <div class="mini-log-item">
                <span>* <span class="hash">${esc(c.hash)}</span>${esc(c.title.split('—')[0].trim())}</span>
                <span class="sub">${esc(c.title.split('—')[1]?.trim() || '')} (${esc(c.meta.split('·').pop().trim())})</span>
              </div>
            `
              )
              .join('')}
          </div>
          <div class="mini-link-row">
            <button type="button" class="mini-jump" data-win="career">${esc(t.miniCareerMore)}</button>
          </div>
        </section>
      </div>

      <!-- Right Column: README + Active Pipelines + Core Stack -->
      <div class="right-stack">
        <section class="pane">
          <div class="pane-title"><span class="idx-tag">[1]</span>${esc(t.bioTitle)}</div>
          ${t.bioParagraphs.map(p => `<p class="readme-p">${esc(p)}</p>`).join('')}

          <div class="tui-actions">
            <button type="button" class="tui-btn primary" data-win="projects">
              <span>▶ ${esc(t.actions.projects)}</span>
            </button>
            <a href="${esc(PROFILE.cvUrl)}" target="_blank" rel="noopener" class="tui-btn">
              <span class="k">[pdf]</span>
              <span>${esc(t.actions.cv)} ↗</span>
            </a>
            <button type="button" class="tui-btn" data-action="copy-email">
              <span class="k">[c]</span>
              <span>${esc(state.copied ? t.actions.copied : PROFILE.email)}</span>
            </button>
            <a href="${esc(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer" class="tui-btn">
              <span>linkedin ↗</span>
            </a>
            <a href="${esc(PROFILE.github)}" target="_blank" rel="noopener noreferrer" class="tui-btn">
              <span>github ↗</span>
            </a>
          </div>
        </section>

        <section class="pane">
          <div class="pane-title"><span class="idx-tag">[2]</span>${esc(t.servicesTitle)}</div>
          <div class="unit-list">
            ${t.projects
              .map(
                p => `
              <button type="button" class="unit-row" data-open-proj="${esc(p.id)}">
                <span class="unit-dot">●</span>
                <span class="unit-name">${esc(p.unit)}</span>
                <span class="unit-status">[${esc(p.status)}]</span>
                <span class="unit-ctx">${esc(p.summary)}</span>
                <span class="unit-go">inspect ↵</span>
              </button>
            `
              )
              .join('')}
          </div>
        </section>

        <section class="pane">
          <div class="pane-title"><span class="idx-tag">[4]</span>${esc(t.miniStackTitle)}</div>
          <div class="core-tags-wrap">
            ${corePreview
              .map(
                s => `
              <span class="core-pill">
                <span class="pkg-ico">${s.logo}</span>
                <span>${esc(s.pkg)}</span>
              </span>
            `
              )
              .join('')}
          </div>
          <div class="mini-link-row">
            <button type="button" class="mini-jump" data-win="stack">${esc(t.miniStackMore)}</button>
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderProjects(t) {
  const active = t.projects.find(p => p.id === state.selectedProject) || t.projects[0];

  return `
    <div class="projects-split">
      <aside class="pane focused">
        <div class="pane-title"><span class="idx-tag">[dir]</span>${esc(t.projectsPaneTitle)}</div>
        <div class="file-list">
          ${t.projects
            .map(p => {
              const sel = p.id === active.id;
              return `
                <button type="button" class="file-item ${sel ? 'selected' : ''}" data-select-proj="${esc(p.id)}">
                  <div class="file-item-top">
                    <span class="file-name">${sel ? '▸ ' : '  '}${esc(p.file)}</span>
                    <span class="file-badge">[${esc(p.status)}]</span>
                  </div>
                  <span class="file-sub">${esc(p.ctx)}</span>
                </button>
              `;
            })
            .join('')}
        </div>
      </aside>

      <section class="pane">
        <div class="pane-title"><span class="idx-tag">[spec]</span>${esc(t.projectsDetailTitle)} — ${esc(active.file)}</div>
        <div class="proj-detail-head">
          <div>
            <h2 class="proj-detail-title">${esc(active.title)}</h2>
            <div class="proj-ctx-line">// ${esc(active.ctx)}</div>
          </div>
          ${
            active.url
              ? `<a href="${esc(active.url)}" target="_blank" rel="noopener noreferrer" class="tui-btn primary">
                  <span>${esc(t.openSite)}</span>
                </a>`
              : ''
          }
        </div>

        <p class="proj-desc-p">${esc(active.desc)}</p>

        <pre class="ascii-box">${esc(active.asciiDiagram)}</pre>

        <ul class="tui-bullets">
          ${active.bullets.map(b => `<li>${esc(b)}</li>`).join('')}
        </ul>

        <div class="flag-tags">
          ${active.stack.map(s => `<span class="flag-tag">--${esc(s.toLowerCase().replace(/\s+/g, '-'))}</span>`).join('')}
        </div>
      </section>
    </div>
  `;
}

function renderStack(t) {
  const items =
    state.stackFilter === 'all'
      ? STACK_PACKAGES
      : STACK_PACKAGES.filter(p => p.cat === state.stackFilter);

  return `
    <section class="pane focused">
      <div class="pane-title"><span class="idx-tag">[pkg]</span>${esc(t.stackTitle)}</div>

      <div class="stack-filter-bar">
        ${t.stackFilters
          .map(
            f => `
          <button type="button" class="filter-tab ${state.stackFilter === f.id ? 'active' : ''}" data-stack-cat="${esc(f.id)}">
            [${esc(f.label)}]
          </button>
        `
          )
          .join('')}
      </div>

      <table class="pkg-table">
        <thead>
          <tr>
            <th>${esc(t.stackCols.pkg)}</th>
            <th class="pkg-cat-col">${esc(t.stackCols.cat)}</th>
            <th>${esc(t.stackCols.desc)}</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              it => `
            <tr>
              <td>
                <span class="pkg-cell-name">
                  <span class="pkg-ico">${it.logo}</span>
                  <span>${esc(it.pkg)}</span>
                </span>
              </td>
              <td class="pkg-cat pkg-cat-col">${esc(it.cat)}</td>
              <td class="pkg-use">${esc(state.lang === 'es' ? it.useEs : it.useEn)}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </section>
  `;
}

function renderCareer(t) {
  return `
    <section class="pane focused">
      <div class="pane-title"><span class="idx-tag">[git]</span>${esc(t.careerTitle)}</div>
      <div class="git-graph">
        ${t.commits
          .map(
            c => `
          <article class="commit-node">
            <div class="commit-head">
              <span class="commit-hash">commit ${esc(c.hash)}</span>
              <span class="commit-refs">(${esc(c.refs)})</span>
            </div>
            <h3 class="commit-title">${esc(c.title)}</h3>
            <div class="commit-meta">${esc(c.meta)}</div>
            <ul class="tui-bullets">
              ${c.body.map(line => `<li>${esc(line)}</li>`).join('')}
            </ul>
            <div class="flag-tags">
              ${c.tags.map(tag => `<span class="flag-tag">${esc(tag)}</span>`).join('')}
            </div>
          </article>
        `
          )
          .join('')}
      </div>

      <div class="tui-actions" style="margin-top: 18px;">
        <a href="${esc(PROFILE.cvUrl)}" target="_blank" rel="noopener" class="tui-btn primary">
          <span>↓ ${esc(t.actions.cv)} (Patricio_Vasquez_CV.pdf)</span>
        </a>
        <button type="button" class="tui-btn" data-action="copy-email">
          <span>[c] ${esc(PROFILE.email)}</span>
        </button>
      </div>
    </section>
  `;
}

function renderShell(t) {
  const quickCmds = ['help', 'whoami', 'ls', 'contact', 'cv', 'uname -a', 'sudo hire patricio', 'clear'];
  return `
    <section class="pane focused shell-pane">
      <div class="pane-title"><span class="idx-tag">[zsh]</span>${esc(PROFILE.user)}@${esc(PROFILE.host)}:~ — interactive shell</div>

      <div class="shell-shortcuts">
        ${quickCmds
          .map(c => `<button type="button" class="tui-btn" data-run-cmd="${esc(c)}">$ ${esc(c)}</button>`)
          .join('')}
      </div>

      <div class="shell-log" id="shell-log">
        <div style="color: var(--fg-dim);">
          ${t.shellWelcome.map(line => `<div># ${esc(line)}</div>`).join('')}
        </div>
        ${state.shellHistory
          .map(
            entry => `
          <div>
            <div class="shell-entry-cmd">${esc(PROFILE.user)}@${esc(PROFILE.host)}:~$ ${esc(entry.cmd)}</div>
            <div class="shell-entry-out">${esc(entry.out)}</div>
          </div>
        `
          )
          .join('')}
      </div>
    </section>
  `;
}

function render() {
  const t = CONTENT[state.lang];
  const root = document.getElementById('root');
  if (!root) return;

  const activeInputVal = document.getElementById('cli-input')?.value || '';
  const wasFocused = document.activeElement?.id === 'cli-input';

  let bodyHtml = '';
  if (state.window === 'overview') bodyHtml = renderOverview(t);
  else if (state.window === 'projects') bodyHtml = renderProjects(t);
  else if (state.window === 'stack') bodyHtml = renderStack(t);
  else if (state.window === 'career') bodyHtml = renderCareer(t);
  else bodyHtml = renderShell(t);

  root.innerHTML = `
    <div class="tui-viewport">
      <div class="tui-frame">
        <!-- Top tmux Status Bar -->
        <header class="tmux-top">
          <div class="tmux-left">
            <div class="tmux-session">[0] <span>${esc(PROFILE.domain)}</span></div>
            ${t.tabs
              .map(
                tab => `
              <button type="button" class="tmux-tab ${state.window === tab.id ? 'active' : ''}" data-win="${esc(tab.id)}">
                <span class="idx">${esc(tab.key)}:</span>${esc(tab.name)}${state.window === tab.id ? '*' : ''}
              </button>
            `
              )
              .join('')}
          </div>

          <div class="tmux-right">
            <button type="button" class="tmux-pill" data-action="lang" title="Switch language">
              lang:<span class="val">${esc(state.lang.toUpperCase())}</span>
            </button>
            <button type="button" class="tmux-pill" data-action="theme" title="Cycle TUI color scheme">
              theme:<span class="val">${esc(state.theme)}</span>
            </button>
            <div class="tmux-pill clock-pill" id="live-clock">${esc(getSantiagoClock())} CLT</div>
          </div>
        </header>

        <!-- Main Active TUI Window -->
        <main class="tui-body">
          ${bodyHtml}
        </main>

        <!-- Persistent Interactive CLI Prompt -->
        <form class="cli-bar" id="cli-form">
          <label for="cli-input" class="cli-ps1">
            <span class="u">${esc(PROFILE.user)}@${esc(PROFILE.host)}</span>:<span class="p">~/${esc(state.window === 'overview' ? '' : state.window)}</span>$
          </label>
          <input
            id="cli-input"
            class="cli-input"
            type="text"
            value="${esc(activeInputVal)}"
            placeholder="${esc(t.promptPlaceholder)}"
            autocomplete="off"
            spellcheck="false"
          />
          ${state.toastMsg ? `<span class="cli-toast">${esc(state.toastMsg)}</span>` : ''}
        </form>

        <!-- Bottom Keyhint Bar -->
        <footer class="keybar">
          <div class="keyhints">
            ${t.keyhints
              .map(h => `<span class="kh"><kbd>[${esc(h.k)}]</kbd>${esc(h.l)}</span>`)
              .join('')}
          </div>
          <span>utf-8 · zsh · santiago</span>
        </footer>
      </div>
    </div>
  `;

  if (wasFocused) {
    const inp = document.getElementById('cli-input');
    if (inp) {
      inp.focus();
      inp.setSelectionRange(inp.value.length, inp.value.length);
    }
  }
}

// Live clock tick without re-rendering DOM
setInterval(() => {
  const el = document.getElementById('live-clock');
  if (el) el.textContent = `${getSantiagoClock()} CLT`;
}, 1000);

// Click Handling
document.addEventListener('click', e => {
  const winBtn = e.target.closest('[data-win]');
  if (winBtn) {
    state.window = winBtn.dataset.win;
    render();
    return;
  }

  const openProj = e.target.closest('[data-open-proj]');
  if (openProj) {
    state.selectedProject = openProj.dataset.openProj;
    state.window = 'projects';
    render();
    return;
  }

  const selProj = e.target.closest('[data-select-proj]');
  if (selProj) {
    state.selectedProject = selProj.dataset.selectProj;
    render();
    return;
  }

  const stackCat = e.target.closest('[data-stack-cat]');
  if (stackCat) {
    state.stackFilter = stackCat.dataset.stackCat;
    render();
    return;
  }

  const runCmd = e.target.closest('[data-run-cmd]');
  if (runCmd) {
    executeCliCommand(runCmd.dataset.runCmd);
    return;
  }

  const act = e.target.closest('[data-action]');
  if (act) {
    const a = act.dataset.action;
    if (a === 'theme') cycleTheme();
    else if (a === 'lang') toggleLang();
    else if (a === 'copy-email') copyEmail();
  }
});

// Prompt Submit
document.addEventListener('submit', e => {
  if (e.target && e.target.id === 'cli-form') {
    e.preventDefault();
    const inp = document.getElementById('cli-input');
    if (!inp) return;
    const val = inp.value;
    inp.value = '';
    executeCliCommand(val);
  }
});

// Keyboard Navigation (TUI + Prompt Autocomplete & History)
document.addEventListener('keydown', e => {
  const inp = document.getElementById('cli-input');
  const inInput = document.activeElement === inp;

  if (inInput) {
    if (e.key === 'Escape') {
      inp.blur();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const cur = inp.value.trim().toLowerCase();
      if (!cur) return;
      const match = COMMANDS.find(c => c.startsWith(cur));
      if (match) inp.value = match;
    } else if (e.key === 'ArrowUp') {
      if (state.cmdHistory.length > 0) {
        e.preventDefault();
        state.cmdHistoryIdx = Math.max(0, state.cmdHistoryIdx - 1);
        inp.value = state.cmdHistory[state.cmdHistoryIdx] || '';
      }
    } else if (e.key === 'ArrowDown') {
      if (state.cmdHistory.length > 0) {
        e.preventDefault();
        state.cmdHistoryIdx = Math.min(state.cmdHistory.length, state.cmdHistoryIdx + 1);
        inp.value = state.cmdHistory[state.cmdHistoryIdx] || '';
      }
    }
    return;
  }

  if (e.metaKey || e.ctrlKey || e.altKey) return;

  const winMap = { '1': 'overview', '2': 'projects', '3': 'stack', '4': 'career', '5': 'shell' };
  if (winMap[e.key]) {
    e.preventDefault();
    state.window = winMap[e.key];
    render();
    if (e.key === '5') focusPrompt();
    return;
  }

  if (e.key === '/' || e.key === ':') {
    e.preventDefault();
    if (inp) inp.focus();
  } else if (e.key.toLowerCase() === 't') {
    e.preventDefault();
    cycleTheme();
  } else if (e.key.toLowerCase() === 'l') {
    e.preventDefault();
    toggleLang();
  } else if (e.key.toLowerCase() === 'c') {
    e.preventDefault();
    copyEmail();
  } else if (state.window === 'projects' && (e.key === 'j' || e.key === 'ArrowDown' || e.key === 'k' || e.key === 'ArrowUp')) {
    e.preventDefault();
    const ids = CONTENT[state.lang].projects.map(p => p.id);
    const cur = ids.indexOf(state.selectedProject);
    const delta = e.key === 'j' || e.key === 'ArrowDown' ? 1 : -1;
    state.selectedProject = ids[(cur + delta + ids.length) % ids.length];
    render();
  }
});

// Preload external SVG icons so [3:stack] renders instantaneously
STACK_PACKAGES.forEach(item => {
  const m = item.logo.match(/src="([^"]+)"/);
  if (m) {
    const img = new Image();
    img.src = m[1];
  }
});

applyPrefs();
render();
