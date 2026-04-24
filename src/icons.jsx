// SVG icons — plain HTML strings, not React components

const IconSvgs = {
  explorer: '<svg viewBox="0 0 24 24" fill="none"><path d="M3 5a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z" stroke="currentColor" strokeWidth="1.4"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>',
  git: '<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="18" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6 8.5v7M8.5 6h4a3 3 0 0 1 3 3v.5" stroke="currentColor" strokeWidth="1.4"/></svg>',
  debug: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="5" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7l-1.5-1.5M16 7l1.5-1.5M7 13H4M20 13h-3M12 18v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>',
  ext: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="13" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/><rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4"/><path d="M12 3v2M12 19v2M21 12h-2M5 12H3M18.4 5.6l-1.4 1.4M7 17l-1.4 1.4M18.4 18.4L17 17M7 7L5.6 5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>',
  chev: '<svg viewBox="0 0 16 16" fill="none" width="12" height="12"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  folder: '<svg viewBox="0 0 16 16" fill="none" width="14" height="14"><path d="M1.5 4.5a1 1 0 0 1 1-1h3.3l1.5 1.5h6.2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7.5z" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1.2"/></svg>',
};

const FileIconSvgs = {
  md: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="2.5" width="13" height="11" rx="1" stroke="#7aa2f7" strokeWidth="1.2"/><path d="M4 10V6l2 2 2-2v4M10 6v4M10 10l1.2 1.5L12.5 10" stroke="#7aa2f7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  json: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 2c-2 0-2 1.3-2 2.5V6c0 .8-.5 1.3-1.2 1.3H2v1.4h.8C3.5 8.7 4 9.2 4 10v1.5C4 12.7 4 14 6 14M10 2c2 0 2 1.3 2 2.5V6c0 .8.5 1.3 1.2 1.3H14v1.4h-.8c-.7 0-1.2.5-1.2 1.3v1.5c0 1.2 0 2.5-2 2.5" stroke="#f5c07a" strokeWidth="1.2" strokeLinecap="round"/></svg>',
  py: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2c-2 0-2 1.2-2 1.2V5h2.2v.4H4.5s-1.5-.2-1.5 2 1.3 2.2 1.3 2.2h.7V8.5S5 7 6.3 7h2.5s1.3 0 1.3-1.3V3.2S10.4 2 8 2zm-1.2.7a.4.4 0 1 1 0 .7.4.4 0 0 1 0-.7z" fill="#7aa2f7"/><path d="M8 14c2 0 2-1.2 2-1.2V11H7.8v-.4h3.7s1.5.2 1.5-2-1.3-2.2-1.3-2.2h-.7V7.5S11 9 9.7 9H7.2s-1.3 0-1.3 1.3v2.5S5.6 14 8 14zm1.2-.7a.4.4 0 1 1 0-.7.4.4 0 0 1 0 .7z" fill="#f5c07a"/></svg>',
  yml: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 3l3 5v5M9 3l-3 5M13 3l-3 5v5" stroke="#a6e3a1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>',
  ts: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="1" fill="#3178c6"/><path d="M9 7V6H4v1h2v5h1V7h2zM9.5 11.5c.5.4 1 .6 1.8.6 1 0 1.7-.5 1.7-1.4 0-.7-.4-1-1.3-1.3l-.5-.2c-.4-.2-.6-.3-.6-.6s.2-.5.6-.5.7.2 1 .4l.5-.7c-.4-.3-1-.5-1.5-.5-1 0-1.6.6-1.6 1.4 0 .8.4 1.1 1.3 1.4l.4.2c.5.2.7.3.7.6s-.3.5-.7.5c-.5 0-1-.3-1.3-.6l-.5.7z" fill="#fff"/></svg>',
  log: '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1" stroke="#8088a0" strokeWidth="1.2"/><path d="M4.5 6h7M4.5 8.5h5M4.5 11h6" stroke="#8088a0" strokeWidth="1"/></svg>',
};

window.IconSvgs = IconSvgs;
window.FileIconSvgs = FileIconSvgs;
