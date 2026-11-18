// Minimal inline SVGs — clean strokes, zero visual clutter

export const ICONS = {
  arrowUpRight: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 11.5L11.5 4.5"/><path d="M5.75 4.5H11.5v5.75"/></svg>`,
  copy: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5"/><path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5"/></svg>`,
  check: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l3 3 6-6.5"/></svg>`,
  sun: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="8" cy="8" r="2.8"/><path d="M8 1.8v1.5M8 12.7v1.5M14.2 8h-1.5M3.3 8H1.8M12.4 3.6l-1.1 1.1M4.7 11.3l-1.1 1.1M12.4 12.4l-1.1-1.1M4.7 4.7L3.6 3.6"/></svg>`,
  moon: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 10.2A5.8 5.8 0 1 1 5.8 2.5a4.7 4.7 0 0 0 7.7 7.7Z"/></svg>`,
};

export const LOGOS = {
  python: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="" />`,
  postgresql: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" alt="" />`,
  bigquery: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2.5L3.5 7.4v9.2L12 21.5l8.5-4.9V7.4L12 2.5Z" stroke="#4285F4" stroke-width="1.7"/><path d="M8.5 13.5v-3M11.5 14.5V8.5M14.5 13v-2.5" stroke="#669DF6" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  powerbi: `<svg viewBox="0 0 24 24" fill="none"><rect x="14.5" y="4" width="4.5" height="16" rx="1.3" fill="#F2C811"/><rect x="9.8" y="8.5" width="4.5" height="11.5" rx="1.3" fill="#E8A90E"/><rect x="5" y="13" width="4.5" height="7" rx="1.3" fill="#D68A00"/></svg>`,
  n8n: `<svg viewBox="0 0 32 32" fill="none"><circle cx="7" cy="16" r="3" fill="#EA4B71"/><circle cx="25" cy="11" r="3" fill="#EA4B71"/><circle cx="25" cy="21" r="3" fill="#EA4B71"/><circle cx="15.5" cy="16" r="2.8" stroke="#EA4B71" stroke-width="2.2"/><path d="M10 16h2.7M18.2 14.7l4-2.3M18.2 17.3l4 2.3" stroke="#EA4B71" stroke-width="2" stroke-linecap="round"/></svg>`,
  gemini: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2.5C12 7.75 7.75 12 2.5 12 7.75 12 12 16.25 12 21.5 12 16.25 16.25 12 21.5 12 16.25 12 12 7.75 12 2.5Z" fill="#7B93DB"/></svg>`,
  embeddings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="7" r="2.2"/><circle cx="11" cy="18" r="2.2"/><path d="M8 7l7.8-.2M7.2 8l3 8M16.6 9l-4.2 7"/></svg>`,
  webhook: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 16.5a3 3 0 1 1-2.6 4.5H9a3 3 0 1 1 0-6h1.5"/><path d="M9 7.5a3 3 0 1 1 5.6-1.5L17 11.5"/><path d="M6 16.5L9.5 10"/></svg>`,
  django: `<svg viewBox="0 0 24 24" fill="none"><rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="#092E20"/><path d="M10.9 6.5h2.1v8.7c-1.1.22-1.95.32-2.85.32-2.68 0-4.08-1.2-4.08-3.52 0-2.23 1.48-3.68 3.77-3.68.36 0 .64.03 1.06.12V6.5Zm0 3.76a2.38 2.38 0 0 0-.86-.14c-1.28 0-2.02.79-2.02 2.16 0 1.34.7 2.08 2.01 2.08.28 0 .54-.02.87-.07v-4.03Zm4.48-1.76h2.1v6.1c0 2.1-.16 3.1-.64 3.98-.45.86-1.05 1.4-2.28 1.99l-1.88-.9c1.22-.57 1.81-1.07 2.18-1.84.39-.8.52-1.72.52-3.44V8.5Zm0-2.1h2.1v1.65h-2.1V6.4Z" fill="#44B78B"/></svg>`,
  angular: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" alt="" />`,
  node: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="" />`,
  gcp: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" alt="" />`,
  azure: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" alt="" />`,
  railway: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.113 10.27A13.026 13.026 0 000 11.48h18.23c-.064-.125-.15-.237-.235-.347-3.117-4.027-4.793-3.677-7.19-3.78-.8-.034-1.34-.048-4.524-.048-1.704 0-3.555.005-5.358.01-.234.63-.459 1.24-.567 1.737h9.342v1.216H.113v.002zm18.26 2.426H.009c.02.326.05.645.094.961h16.955c.754 0 1.179-.429 1.315-.96zm-17.318 4.28s2.81 6.902 10.93 7.024c4.855 0 9.027-2.883 10.92-7.024H1.056zM11.988 0C7.5 0 3.593 2.466 1.531 6.108l4.75-.005v-.002c3.71 0 3.849.016 4.573.047l.448.016c1.563.052 3.485.22 4.996 1.364.82.621 2.007 1.99 2.712 2.965.654.902.842 1.94.396 2.934-.408.914-1.289 1.458-2.353 1.458H.391s.099.42.249.886h22.748A12.026 12.026 0 0024 12.005C24 5.377 18.621 0 11.988 0z"/></svg>`,
  docker: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="" />`,
  linux: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" alt="" />`,
  git: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="" />`,
};
