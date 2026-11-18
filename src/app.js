import { ICONS } from './icons.js';
import { PROFILE, STACK_ITEMS, CONTENT } from './data.js';

const state = {
  lang: localStorage.getItem('pv_lang') === 'en' ? 'en' : 'es',
  theme: localStorage.getItem('pv_theme') === 'light' ? 'light' : 'dark',
  activePipeline: 'matching',
  stackFilter: 'all',
  activeSection: '',
  mobileMenuOpen: false,
  copiedEmail: false,
  cmdOpen: false,
  cmdQuery: '',
  cmdIndex: 0,
};

let copyTimer = null;
let sectionObserver = null;

function applyDocumentPrefs() {
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

function getCommandItems(t) {
  return [
    {
      id: 'copy-email',
      group: t.cmdPalette.groups.actions,
      label: t.cmdPalette.items.copyEmail,
      hint: PROFILE.email,
      icon: ICONS.copy,
      run: () => copyEmail(),
    },
    {
      id: 'download-cv',
      group: t.cmdPalette.groups.actions,
      label: t.cmdPalette.items.downloadCv,
      hint: 'PDF',
      icon: ICONS.download,
      run: () => window.open(PROFILE.cvUrl, '_blank', 'noopener'),
    },
    {
      id: 'toggle-theme',
      group: t.cmdPalette.groups.actions,
      label: t.cmdPalette.items.toggleTheme,
      hint: state.theme === 'dark' ? 'Light' : 'Dark',
      icon: state.theme === 'dark' ? ICONS.sun : ICONS.moon,
      run: () => toggleTheme(),
    },
    {
      id: 'toggle-lang',
      group: t.cmdPalette.groups.actions,
      label: t.cmdPalette.items.toggleLang,
      hint: state.lang === 'es' ? 'EN' : 'ES',
      icon: ICONS.globe,
      run: () => toggleLang(),
    },
    {
      id: 'nav-projects',
      group: t.cmdPalette.groups.nav,
      label: t.nav.projects,
      hint: '#projects',
      icon: ICONS.sparkle,
      run: () => scrollToSection('projects'),
    },
    {
      id: 'nav-stack',
      group: t.cmdPalette.groups.nav,
      label: t.nav.stack,
      hint: '#stack',
      icon: ICONS.code,
      run: () => scrollToSection('stack'),
    },
    {
      id: 'nav-experience',
      group: t.cmdPalette.groups.nav,
      label: t.nav.experience,
      hint: '#experience',
      icon: ICONS.briefcase,
      run: () => scrollToSection('experience'),
    },
    {
      id: 'nav-contact',
      group: t.cmdPalette.groups.nav,
      label: t.nav.contact,
      hint: '#contact',
      icon: ICONS.mail,
      run: () => scrollToSection('contact'),
    },
    {
      id: 'ext-pectacular',
      group: t.cmdPalette.groups.links,
      label: t.cmdPalette.items.openPectacular,
      hint: 'pectacular.cl ↗',
      icon: ICONS.arrowUpRight,
      run: () => window.open('https://www.pectacular.cl', '_blank', 'noopener'),
    },
    {
      id: 'ext-linkedin',
      group: t.cmdPalette.groups.links,
      label: t.cmdPalette.items.openLinkedin,
      hint: 'in/patriciovm ↗',
      icon: ICONS.linkedin,
      run: () => window.open(PROFILE.linkedin, '_blank', 'noopener'),
    },
    {
      id: 'ext-github',
      group: t.cmdPalette.groups.links,
      label: t.cmdPalette.items.openGithub,
      hint: 'patriciovm98 ↗',
      icon: ICONS.github,
      run: () => window.open(PROFILE.github, '_blank', 'noopener'),
    },
  ];
}

function getFilteredCommands(t) {
  const all = getCommandItems(t);
  const q = state.cmdQuery.trim().toLowerCase();
  if (!q) return all;
  return all.filter(
    item =>
      item.label.toLowerCase().includes(q) ||
      item.hint.toLowerCase().includes(q) ||
      item.group.toLowerCase().includes(q)
  );
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('pv_theme', state.theme);
  applyDocumentPrefs();
  renderApp();
}

function toggleLang() {
  state.lang = state.lang === 'es' ? 'en' : 'es';
  localStorage.setItem('pv_lang', state.lang);
  applyDocumentPrefs();
  renderApp();
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
  state.copiedEmail = true;
  if (copyTimer) clearTimeout(copyTimer);
  renderApp();
  copyTimer = setTimeout(() => {
    state.copiedEmail = false;
    renderApp();
  }, 2400);
}

function scrollToSection(id) {
  state.mobileMenuOpen = false;
  renderApp();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function openCommandPalette() {
  state.cmdOpen = true;
  state.cmdQuery = '';
  state.cmdIndex = 0;
  renderApp();
  requestAnimationFrame(() => {
    const input = document.getElementById('cmd-search-input');
    if (input) input.focus();
  });
}

function closeCommandPalette() {
  if (!state.cmdOpen) return;
  state.cmdOpen = false;
  renderApp();
}

function renderPipelineBody(pipeline) {
  return `
    <div class="arch-meta-row">
      <span class="arch-project-name">${escapeHtml(pipeline.project)}</span>
      <span class="arch-metric">${escapeHtml(pipeline.metricLabel)}: <strong>${escapeHtml(pipeline.metricValue)}</strong></span>
    </div>
    <div class="arch-nodes">
      ${pipeline.nodes
        .map(
          n => `
        <div class="arch-node">
          <span class="arch-step">${escapeHtml(n.step)}</span>
          <div class="arch-node-info">
            <div class="arch-node-title">${escapeHtml(n.title)}</div>
            <div class="arch-node-detail">${escapeHtml(n.detail)}</div>
          </div>
          <span class="arch-node-pulse" aria-hidden="true"></span>
        </div>
      `
        )
        .join('')}
    </div>
    <div class="arch-codebar">
      <span class="prompt-sym">$</span>${escapeHtml(pipeline.code)}
    </div>
  `;
}

function renderCommandPaletteModal(t) {
  if (!state.cmdOpen) return '';
  const items = getFilteredCommands(t);
  let groupedHtml = '';
  if (items.length === 0) {
    groupedHtml = `<div class="cmd-empty">${escapeHtml(t.cmdPalette.empty)}</div>`;
  } else {
    let lastGroup = '';
    groupedHtml = items
      .map((item, idx) => {
        const groupHeader =
          item.group !== lastGroup
            ? `<div class="cmd-group-title">${escapeHtml(item.group)}</div>`
            : '';
        lastGroup = item.group;
        return `
          ${groupHeader}
          <button type="button" class="cmd-item ${idx === state.cmdIndex ? 'selected' : ''}" data-cmd-idx="${idx}">
            <span class="cmd-item-left">
              ${item.icon}
              <span>${escapeHtml(item.label)}</span>
            </span>
            <span class="kbd">${escapeHtml(item.hint)}</span>
          </button>
        `;
      })
      .join('');
  }

  return `
    <div class="cmd-backdrop" data-action="close-cmd-backdrop">
      <div class="cmd-dialog" role="dialog" aria-modal="true" aria-label="Command Palette">
        <div class="cmd-input-wrap">
          ${ICONS.search}
          <input
            id="cmd-search-input"
            class="cmd-input"
            type="text"
            value="${escapeHtml(state.cmdQuery)}"
            placeholder="${escapeHtml(t.cmdPalette.placeholder)}"
            autocomplete="off"
          />
          <button type="button" class="kbd" data-action="close-cmd">ESC</button>
        </div>
        <div class="cmd-list" id="cmd-results-list">
          ${groupedHtml}
        </div>
      </div>
    </div>
  `;
}

function renderApp() {
  const t = CONTENT[state.lang];
  const activePipe = t.pipelines.find(p => p.id === state.activePipeline) || t.pipelines[0];
  const filteredStack =
    state.stackFilter === 'all'
      ? STACK_ITEMS
      : STACK_ITEMS.filter(item => item.cat === state.stackFilter);

  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  const shortcutLabel = isMac ? '⌘K' : 'Ctrl K';

  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div class="ambient-bg" aria-hidden="true"></div>

    <header class="site-header">
      <div class="container nav-inner">
        <a href="#top" class="brand" aria-label="${escapeHtml(PROFILE.name)}">
          <span class="brand-mark">${escapeHtml(PROFILE.monogram)}</span>
          <span>${escapeHtml(PROFILE.name)}</span>
          <span class="brand-domain">/ ${escapeHtml(PROFILE.domain)}</span>
        </a>

        <nav class="nav-links" aria-label="Primary">
          <a href="#projects" class="nav-link ${state.activeSection === 'projects' ? 'active' : ''}">${escapeHtml(t.nav.projects)}</a>
          <a href="#stack" class="nav-link ${state.activeSection === 'stack' ? 'active' : ''}">${escapeHtml(t.nav.stack)}</a>
          <a href="#experience" class="nav-link ${state.activeSection === 'experience' ? 'active' : ''}">${escapeHtml(t.nav.experience)}</a>
          <a href="#contact" class="nav-link ${state.activeSection === 'contact' ? 'active' : ''}">${escapeHtml(t.nav.contact)}</a>
        </nav>

        <div class="nav-actions">
          <button type="button" class="cmd-trigger" data-action="open-cmd" title="${escapeHtml(t.nav.cmdHint)} (${shortcutLabel})">
            ${ICONS.search}
            <span>${escapeHtml(t.nav.cmdHint)}</span>
            <span class="kbd">${shortcutLabel}</span>
          </button>

          <button type="button" class="lang-btn" data-action="toggle-lang" title="ES / EN">
            ${state.lang === 'es' ? 'EN' : 'ES'}
          </button>

          <button type="button" class="icon-btn" data-action="toggle-theme" aria-label="Toggle theme" title="Toggle theme">
            ${state.theme === 'dark' ? ICONS.sun : ICONS.moon}
          </button>

          <button type="button" class="icon-btn mobile-menu-btn" data-action="toggle-mobile-menu" aria-label="Menu">
            ${state.mobileMenuOpen ? ICONS.close : ICONS.menu}
          </button>
        </div>
      </div>

      <div class="mobile-drawer ${state.mobileMenuOpen ? 'open' : ''}">
        <div class="mobile-drawer-links">
          <a href="#projects" data-nav="projects" class="${state.activeSection === 'projects' ? 'active' : ''}">${escapeHtml(t.nav.projects)}</a>
          <a href="#stack" data-nav="stack" class="${state.activeSection === 'stack' ? 'active' : ''}">${escapeHtml(t.nav.stack)}</a>
          <a href="#experience" data-nav="experience" class="${state.activeSection === 'experience' ? 'active' : ''}">${escapeHtml(t.nav.experience)}</a>
          <a href="#contact" data-nav="contact" class="${state.activeSection === 'contact' ? 'active' : ''}">${escapeHtml(t.nav.contact)}</a>
        </div>
      </div>
    </header>

    <main id="top">
      <!-- HERO -->
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-content">
            <div class="status-row">
              <span class="status-pill">
                <span class="status-dot"></span>
                ${escapeHtml(t.hero.availability)}
              </span>
              <span class="loc-pill">
                ${ICONS.location}
                ${escapeHtml(t.hero.locationBadge)}
              </span>
            </div>

            <div class="hero-eyebrow">${escapeHtml(t.hero.eyebrow)}</div>

            <h1 class="hero-title">
              ${escapeHtml(PROFILE.name)}
              <span class="role-line">${escapeHtml(t.hero.role)}.</span>
            </h1>

            <p class="hero-headline">${escapeHtml(t.hero.headline)}</p>
            <p class="hero-desc">${escapeHtml(t.hero.description)}</p>

            <div class="hero-ctas">
              <a href="#projects" class="btn btn-primary">
                <span>${escapeHtml(t.hero.ctaPrimary)}</span>
                ${ICONS.arrowRight}
              </a>
              <a href="${escapeHtml(PROFILE.cvUrl)}" target="_blank" rel="noopener" class="btn btn-secondary">
                ${ICONS.download}
                <span>${escapeHtml(t.hero.ctaCv)}</span>
              </a>
            </div>

            <div class="hero-quick-links">
              <button type="button" class="quick-chip ${state.copiedEmail ? 'copied' : ''}" data-action="copy-email">
                ${state.copiedEmail ? ICONS.check : ICONS.copy}
                <span>${escapeHtml(state.copiedEmail ? t.hero.copied : PROFILE.email)}</span>
              </button>
              <a href="${escapeHtml(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer" class="quick-chip">
                ${ICONS.linkedin}
                <span>LinkedIn</span>
              </a>
              <a href="${escapeHtml(PROFILE.github)}" target="_blank" rel="noopener noreferrer" class="quick-chip">
                ${ICONS.github}
                <span>GitHub</span>
              </a>
            </div>
          </div>

          <!-- Interactive Production Architecture Inspector -->
          <div class="arch-card" aria-label="${escapeHtml(t.hero.inspectorTitle)}">
            <div class="arch-header">
              <div class="arch-win-dots" aria-hidden="true"><span></span><span></span><span></span></div>
              <span class="arch-header-title">${escapeHtml(t.hero.inspectorTitle)}</span>
              <span class="arch-status-tag">${escapeHtml(activePipe.status)}</span>
            </div>

            <div class="arch-tabs" role="tablist">
              ${t.pipelines
                .map(
                  p => `
                <button
                  type="button"
                  role="tab"
                  aria-selected="${p.id === activePipe.id}"
                  class="arch-tab ${p.id === activePipe.id ? 'active' : ''}"
                  data-pipeline="${escapeHtml(p.id)}"
                >
                  ${escapeHtml(p.tab)}
                </button>
              `
                )
                .join('')}
            </div>

            <div class="arch-body">
              ${renderPipelineBody(activePipe)}
            </div>
          </div>
        </div>
      </section>

      <!-- ENGINEERING PILLARS -->
      <div class="pillars-section">
        <div class="container pillars-grid">
          ${t.pillars
            .map(
              pillar => `
            <article class="spotlight-card pillar-card">
              <div class="pillar-top">
                <span class="pillar-icon">${ICONS[pillar.icon] || ICONS.sparkle}</span>
                <span class="pillar-idx">${escapeHtml(pillar.index)}</span>
              </div>
              <h3>${escapeHtml(pillar.title)}</h3>
              <p>${escapeHtml(pillar.desc)}</p>
            </article>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- FEATURED PROJECTS -->
      <section class="section" id="projects">
        <div class="container">
          <div class="section-header">
            <span class="section-eyebrow">${escapeHtml(t.projectsSection.eyebrow)}</span>
            <h2 class="section-title">${escapeHtml(t.projectsSection.title)}</h2>
            <p class="section-subtitle">${escapeHtml(t.projectsSection.subtitle)}</p>
          </div>

          <div class="projects-list">
            ${t.projects
              .map(
                proj => `
              <article class="spotlight-card project-card">
                <div class="project-top">
                  <div class="project-meta">
                    <span class="project-num">${escapeHtml(proj.num)}</span>
                    <span class="project-context">${escapeHtml(proj.context)}</span>
                  </div>
                  ${
                    proj.link
                      ? `
                    <a href="${escapeHtml(proj.link)}" target="_blank" rel="noopener noreferrer" class="project-live-btn">
                      <span>${escapeHtml(proj.linkText || t.projectsSection.liveLabel)}</span>
                      ${ICONS.arrowUpRight}
                    </a>
                  `
                      : ''
                  }
                </div>

                <div class="project-grid">
                  <div>
                    <h3 class="project-title">${escapeHtml(proj.title)}</h3>
                    <p class="project-summary">${escapeHtml(proj.summary)}</p>
                    <p class="project-desc">${escapeHtml(proj.desc)}</p>

                    <ul class="project-highlights">
                      ${proj.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
                    </ul>

                    <div class="tag-list">
                      ${proj.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                  </div>

                  <div class="project-flow-box">
                    <div class="project-flow-label">${escapeHtml(t.projectsSection.flowLabel)}</div>
                    <div class="flow-steps">
                      ${proj.flow
                        .map(
                          (step, i) => `
                        <div class="flow-step">
                          <span class="flow-step-idx">0${i + 1}</span>
                          <span>${escapeHtml(step)}</span>
                        </div>
                      `
                        )
                        .join('')}
                    </div>
                  </div>
                </div>
              </article>
            `
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- TECH STACK -->
      <section class="section" id="stack">
        <div class="container">
          <div class="section-header">
            <span class="section-eyebrow">${escapeHtml(t.stackSection.eyebrow)}</span>
            <h2 class="section-title">${escapeHtml(t.stackSection.title)}</h2>
            <p class="section-subtitle">${escapeHtml(t.stackSection.subtitle)}</p>
          </div>

          <div class="stack-toolbar" role="tablist">
            ${t.stackSection.filters
              .map(
                f => `
              <button
                type="button"
                class="filter-pill ${state.stackFilter === f.id ? 'active' : ''}"
                data-stack-filter="${escapeHtml(f.id)}"
              >
                ${escapeHtml(f.label)}
              </button>
            `
              )
              .join('')}
          </div>

          <div class="stack-grid">
            ${filteredStack
              .map(
                item => `
              <div class="spotlight-card stack-card">
                <div class="stack-logo">${item.logo}</div>
                <div class="stack-info">
                  <div class="stack-name">${escapeHtml(item.name)}</div>
                  <div class="stack-role">${escapeHtml(state.lang === 'es' ? item.roleEs : item.roleEn)}</div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </section>

      <!-- EXPERIENCE & EDUCATION -->
      <section class="section" id="experience">
        <div class="container">
          <div class="section-header">
            <span class="section-eyebrow">${escapeHtml(t.experienceSection.eyebrow)}</span>
            <h2 class="section-title">${escapeHtml(t.experienceSection.title)}</h2>
          </div>

          <div class="career-grid">
            <div>
              <div class="sub-heading">
                ${ICONS.briefcase}
                <span>${escapeHtml(t.experienceSection.workHeading)}</span>
              </div>

              ${t.experienceSection.experience
                .map(
                  xp => `
                <article class="spotlight-card timeline-card">
                  <div class="xp-header">
                    <div class="xp-company-wrap">
                      <h3 class="xp-company">${escapeHtml(xp.company)}</h3>
                      <span class="xp-badge">${escapeHtml(xp.badge)}</span>
                    </div>
                    <span class="xp-period">${escapeHtml(xp.period)} · ${escapeHtml(xp.location)}</span>
                  </div>
                  <div class="xp-role">${escapeHtml(xp.role)}</div>
                  <ul class="xp-list">
                    ${xp.highlights.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
                  </ul>
                  <div class="tag-list">
                    ${xp.stack.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}
                  </div>
                </article>
              `
                )
                .join('')}
            </div>

            <div>
              <div class="sub-heading">
                ${ICONS.graduation}
                <span>${escapeHtml(t.experienceSection.eduHeading)}</span>
              </div>

              <article class="spotlight-card timeline-card">
                <div class="xp-header">
                  <h3 class="xp-company">${escapeHtml(t.experienceSection.education.school)}</h3>
                  <span class="xp-period">${escapeHtml(t.experienceSection.education.period)}</span>
                </div>
                <div class="xp-role" style="margin-bottom: 0;">
                  ${escapeHtml(t.experienceSection.education.degree)}
                </div>

                <div class="edu-extras">
                  ${t.experienceSection.education.extras
                    .map(
                      ex => `
                    <div class="edu-extra-row">
                      <span class="edu-extra-k">${escapeHtml(ex.k)}</span>
                      <span class="edu-extra-v">${escapeHtml(ex.v)}</span>
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTACT -->
      <section class="section" id="contact">
        <div class="container">
          <div class="spotlight-card contact-card">
            <div>
              <span class="section-eyebrow">${escapeHtml(t.contactSection.eyebrow)}</span>
              <h2 class="contact-title">${escapeHtml(t.contactSection.title)}</h2>
              <p class="contact-desc">${escapeHtml(t.contactSection.description)}</p>

              <div class="contact-actions">
                <a href="mailto:${escapeHtml(PROFILE.email)}" class="btn btn-primary">
                  ${ICONS.mail}
                  <span>${escapeHtml(t.contactSection.emailBtn)}</span>
                </a>
                <button type="button" class="btn btn-secondary" data-action="copy-email">
                  ${state.copiedEmail ? ICONS.check : ICONS.copy}
                  <span>${escapeHtml(state.copiedEmail ? t.hero.copied : t.contactSection.copyBtn)}</span>
                </button>
                <a href="${escapeHtml(PROFILE.cvUrl)}" target="_blank" rel="noopener" class="btn btn-secondary">
                  ${ICONS.download}
                  <span>${escapeHtml(t.contactSection.cvBtn)}</span>
                </a>
              </div>
            </div>

            <div class="contact-channels">
              <a href="mailto:${escapeHtml(PROFILE.email)}" class="channel-row">
                <span class="channel-left">
                  <span class="channel-ico">${ICONS.mail}</span>
                  <span>
                    <span class="channel-label">Email</span>
                    <span class="channel-val">${escapeHtml(PROFILE.email)}</span>
                  </span>
                </span>
                <span class="channel-arrow">${ICONS.arrowUpRight}</span>
              </a>

              <a href="${escapeHtml(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer" class="channel-row">
                <span class="channel-left">
                  <span class="channel-ico">${ICONS.linkedin}</span>
                  <span>
                    <span class="channel-label">LinkedIn</span>
                    <span class="channel-val">${escapeHtml(PROFILE.linkedinLabel)}</span>
                  </span>
                </span>
                <span class="channel-arrow">${ICONS.arrowUpRight}</span>
              </a>

              <a href="${escapeHtml(PROFILE.github)}" target="_blank" rel="noopener noreferrer" class="channel-row">
                <span class="channel-left">
                  <span class="channel-ico">${ICONS.github}</span>
                  <span>
                    <span class="channel-label">GitHub</span>
                    <span class="channel-val">${escapeHtml(PROFILE.githubLabel)}</span>
                  </span>
                </span>
                <span class="channel-arrow">${ICONS.arrowUpRight}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-left">
          <span>© ${new Date().getFullYear()} ${escapeHtml(PROFILE.name)}</span>
          <span>·</span>
          <span>${escapeHtml(t.footer.built)}</span>
        </div>
        <button type="button" class="footer-shortcut" data-action="open-cmd">
          <span>${escapeHtml(t.footer.shortcut)}</span>
          <span class="kbd">${shortcutLabel}</span>
        </button>
      </div>
    </footer>

    ${renderCommandPaletteModal(t)}

    <div class="toast ${state.copiedEmail ? 'visible' : ''}" role="status" aria-live="polite">
      ${ICONS.check}
      <span>${escapeHtml(t.hero.copied)} (${escapeHtml(PROFILE.email)})</span>
    </div>
  `;

  setupSectionObserver();
}

function updateCmdPaletteResultsOnly() {
  const t = CONTENT[state.lang];
  const listEl = document.getElementById('cmd-results-list');
  if (!listEl) return;
  const items = getFilteredCommands(t);
  if (state.cmdIndex >= items.length) state.cmdIndex = Math.max(0, items.length - 1);

  if (items.length === 0) {
    listEl.innerHTML = `<div class="cmd-empty">${escapeHtml(t.cmdPalette.empty)}</div>`;
    return;
  }

  let lastGroup = '';
  listEl.innerHTML = items
    .map((item, idx) => {
      const groupHeader =
        item.group !== lastGroup
          ? `<div class="cmd-group-title">${escapeHtml(item.group)}</div>`
          : '';
      lastGroup = item.group;
      return `
        ${groupHeader}
        <button type="button" class="cmd-item ${idx === state.cmdIndex ? 'selected' : ''}" data-cmd-idx="${idx}">
          <span class="cmd-item-left">
            ${item.icon}
            <span>${escapeHtml(item.label)}</span>
          </span>
          <span class="kbd">${escapeHtml(item.hint)}</span>
        </button>
      `;
    })
    .join('');
}

function setupSectionObserver() {
  if (sectionObserver) sectionObserver.disconnect();
  const ids = ['projects', 'stack', 'experience', 'contact'];
  sectionObserver = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          state.activeSection = entry.target.id;
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${state.activeSection}`);
          });
          break;
        }
      }
    },
    { rootMargin: '-25% 0px -55% 0px', threshold: 0.05 }
  );

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });
}

// Event Delegation & Global Listeners
document.addEventListener('click', e => {
  const actionEl = e.target.closest('[data-action]');
  if (actionEl) {
    const action = actionEl.dataset.action;
    if (action === 'toggle-theme') toggleTheme();
    else if (action === 'toggle-lang') toggleLang();
    else if (action === 'copy-email') copyEmail();
    else if (action === 'open-cmd') openCommandPalette();
    else if (action === 'close-cmd') closeCommandPalette();
    else if (action === 'toggle-mobile-menu') {
      state.mobileMenuOpen = !state.mobileMenuOpen;
      renderApp();
    } else if (action === 'close-cmd-backdrop' && e.target === actionEl) {
      closeCommandPalette();
    }
    return;
  }

  const pipeBtn = e.target.closest('[data-pipeline]');
  if (pipeBtn) {
    state.activePipeline = pipeBtn.dataset.pipeline;
    renderApp();
    return;
  }

  const filterBtn = e.target.closest('[data-stack-filter]');
  if (filterBtn) {
    state.stackFilter = filterBtn.dataset.stackFilter;
    renderApp();
    return;
  }

  const mobileNav = e.target.closest('[data-nav]');
  if (mobileNav) {
    state.mobileMenuOpen = false;
    renderApp();
    return;
  }

  const cmdItem = e.target.closest('[data-cmd-idx]');
  if (cmdItem) {
    const idx = Number(cmdItem.dataset.cmdIdx);
    const items = getFilteredCommands(CONTENT[state.lang]);
    const chosen = items[idx];
    closeCommandPalette();
    if (chosen) chosen.run();
  }
});

document.addEventListener('input', e => {
  if (e.target && e.target.id === 'cmd-search-input') {
    state.cmdQuery = e.target.value;
    state.cmdIndex = 0;
    updateCmdPaletteResultsOnly();
  }
});

document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (state.cmdOpen) closeCommandPalette();
    else openCommandPalette();
    return;
  }

  if (!state.cmdOpen) return;

  const items = getFilteredCommands(CONTENT[state.lang]);
  if (e.key === 'Escape') {
    e.preventDefault();
    closeCommandPalette();
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (items.length > 0) {
      state.cmdIndex = (state.cmdIndex + 1) % items.length;
      updateCmdPaletteResultsOnly();
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (items.length > 0) {
      state.cmdIndex = (state.cmdIndex - 1 + items.length) % items.length;
      updateCmdPaletteResultsOnly();
    }
  } else if (e.key === 'Enter' && items.length > 0) {
    e.preventDefault();
    const chosen = items[state.cmdIndex];
    closeCommandPalette();
    if (chosen) chosen.run();
  }
});

// Subtle Spotlight Hover Effect
document.addEventListener('pointermove', e => {
  const card = e.target.closest('.spotlight-card');
  if (!card) return;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  card.style.setProperty('--my', `${e.clientY - rect.top}px`);
});

// Boot
applyDocumentPrefs();
renderApp();
