const { useState, useEffect, useRef } = React;

/* Files registry — the "open tabs" and file tree */
const FILES = [
  { id: 'about',      name: 'README.md',      kind: 'md',   path: '~',            view: () => <AboutView /> },
  { id: 'stack',      name: 'stack.json',     kind: 'json', path: '~',            view: () => <StackView /> },
  { id: 'projects',   name: 'projects.md',    kind: 'md',   path: '~/projects',   view: () => <ProjectsView /> },
  { id: 'experience', name: 'experience.md',  kind: 'md',   path: '~',            view: () => <ExperienceView /> },
  { id: 'contact',    name: 'contact.yml',    kind: 'yml',  path: '~',            view: () => <ContactView /> },
];

function ActivityBar({ isDark, toggleTheme }) {
  return (
    <div className="activity">
      <button className="act-btn on" title="Explorer" dangerouslySetInnerHTML={{ __html: IconSvgs.explorer }} />
      <button className="act-btn" title="Search" dangerouslySetInnerHTML={{ __html: IconSvgs.search }} />
      <button className="act-btn" title="Source Control" dangerouslySetInnerHTML={{ __html: IconSvgs.git }} />
      <button className="act-btn" title="Run & Debug" dangerouslySetInnerHTML={{ __html: IconSvgs.debug }} />
      <button className="act-btn" title="Extensions" dangerouslySetInnerHTML={{ __html: IconSvgs.ext }} />
      <div className="act-spacer" />
      <button className="act-btn" title="Toggle Theme" onClick={toggleTheme} dangerouslySetInnerHTML={{ __html: isDark ? IconSvgs.sun : IconSvgs.moon }} />
      <button className="act-btn" title="Settings" dangerouslySetInnerHTML={{ __html: IconSvgs.settings }} />
    </div>
  );
}

function Sidebar({ active, onOpen, isMenuOpen }) {
  const [root, setRoot] = useState(true);
  const [projOpen, setProjOpen] = useState(true);

  return (
    <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
      <h4>Explorer</h4>
      <div className="explorer">
        <div className={`tree-folder ${root ? 'open' : ''}`} onClick={() => setRoot(!root)}>
          <span className="chev" dangerouslySetInnerHTML={{ __html: IconSvgs.chev }} />
          <span className="folder-ico" dangerouslySetInnerHTML={{ __html: IconSvgs.folder }} />
          <span>portfolio</span>
        </div>
        {root && (
          <div className="tree-children" style={{ display: 'block' }}>
            <div
              className={`tree-file ${active === 'about' ? 'active' : ''}`}
              onClick={() => onOpen('about')}
            >
              <span className="file-ico" dangerouslySetInnerHTML={{ __html: FileIconSvgs.md }} />
              <span className="label">README.md</span>
            </div>
            <div
              className={`tree-file ${active === 'stack' ? 'active' : ''}`}
              onClick={() => onOpen('stack')}
            >
              <span className="file-ico" dangerouslySetInnerHTML={{ __html: FileIconSvgs.json }} />
              <span className="label">stack.json</span>
            </div>

            <div className={`tree-folder ${projOpen ? 'open' : ''}`} style={{ paddingLeft: 28 }} onClick={() => setProjOpen(!projOpen)}>
              <span className="chev" dangerouslySetInnerHTML={{ __html: IconSvgs.chev }} />
              <span className="folder-ico" dangerouslySetInnerHTML={{ __html: IconSvgs.folder }} />
              <span>projects</span>
            </div>
            {projOpen && (
              <div style={{ display: 'block' }}>
                <div
                  className={`tree-file ${active === 'projects' ? 'active' : ''}`}
                  style={{ paddingLeft: 54 }}
                  onClick={() => onOpen('projects')}
                >
                  <span className="file-ico" dangerouslySetInnerHTML={{ __html: FileIconSvgs.md }} />
                  <span className="label">index.md</span>
                  <span className="badge">{PROJECTS.length}</span>
                </div>
              </div>
            )}

            <div
              className={`tree-file ${active === 'experience' ? 'active' : ''}`}
              onClick={() => onOpen('experience')}
            >
              <span className="file-ico" dangerouslySetInnerHTML={{ __html: FileIconSvgs.md }} />
              <span className="label">experience.md</span>
            </div>
            <div
              className={`tree-file ${active === 'contact' ? 'active' : ''}`}
              onClick={() => onOpen('contact')}
            >
              <span className="file-ico" dangerouslySetInnerHTML={{ __html: FileIconSvgs.yml }} />
              <span className="label">contact.yml</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function TabBar({ tabs, active, onSelect, onClose, toggleMenu }) {
  return (
    <div className="tabbar">
      <div className="menu-toggle" onClick={toggleMenu} dangerouslySetInnerHTML={{ __html: IconSvgs.menu }} />
      {tabs.map(id => {
        const f = FILES.find(x => x.id === id);
        if (!f) return null;
        const iconSvg = FileIconSvgs[f.kind];
        return (
          <div
            key={id}
            className={`tab ${active === id ? 'active' : ''}`}
            onClick={() => onSelect(id)}
          >
            <span className="file-ico" dangerouslySetInnerHTML={{ __html: iconSvg }} />
            <span className="lbl">{f.name}</span>
            <button
              className="close"
              onClick={(e) => { e.stopPropagation(); onClose(id); }}
              title="Close"
            >×</button>
          </div>
        );
      })}
    </div>
  );
}

function Breadcrumb({ file }) {
  if (!file) return <div className="breadcrumb" />;
  const parts = file.path === '~' ? ['portfolio'] : ['portfolio', ...file.path.replace(/^~\//, '').split('/')];
  const iconSvg = FileIconSvgs[file.kind];
  return (
    <div className="breadcrumb">
      {parts.map((p, i) => (
        <span key={i}>
          <span className="crumb">{p}</span>
          <span className="sep">›</span>
        </span>
      ))}
      <span className="crumb" style={{ color: 'var(--fg-0)' }}>
        <span dangerouslySetInnerHTML={{ __html: iconSvg }} style={{ display: 'inline-block', width: 14, height: 14, marginRight: 6, verticalAlign: 'middle' }} />
        {file.name}
      </span>
    </div>
  );
}

function Editor({ file }) {
  if (!file) return (
    <div className="editor" style={{ alignItems: 'center', justifyContent: 'center', color: 'var(--fg-3)' }}>
      <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 13 }}>
        No file open.<br />
        <span style={{ color: 'var(--fg-4)' }}>Select a file from the sidebar.</span>
      </div>
    </div>
  );

  const lineCount = 80;

  return (
    <div className="editor" key={file.id}>
      <div className="line-gutter">
        {Array.from({ length: lineCount }).map((_, i) => <span key={i}>{i + 1}</span>)}
      </div>
      <div className="editor-body">
        {file.view()}
      </div>
    </div>
  );
}

function StatusBar({ file }) {
  return (
    <div className="statusbar">
      <div className="sb-item brand">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" style={{ marginRight: 6 }}>
          <path d="M6 2l-3 3 3 3M10 14l3-3-3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        patricio.vasquez
      </div>
      <div className="sb-item">
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" style={{ marginRight: 6 }}>
          <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.2"/>
          <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M4 6v4a2 2 0 0 0 2 2h4" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
        main
      </div>
      <div className="sb-item">
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#a6e3a1', display: 'inline-block', marginRight: 6, boxShadow: '0 0 8px #a6e3a1' }} />
        live
      </div>
      <div className="sb-spacer" />
      <div className="sb-item">{file?.kind?.toUpperCase() || '—'}</div>
      <div className="sb-item">UTF-8</div>
      <div className="sb-item">LF</div>
      <div className="sb-item">Santiago, CL</div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState('about');
  const [tabs, setTabs] = useState(['about']);
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDark);
  }, [isDark]);

  const open = (id) => {
    setActive(id);
    setTabs(prev => prev.includes(id) ? prev : [...prev, id]);
    setIsMenuOpen(false);
  };

  const close = (id) => {
    const i = tabs.indexOf(id);
    const next = tabs.filter(t => t !== id);
    setTabs(next);
    if (active === id) {
      setActive(next[i] || next[i - 1] || next[0] || null);
    }
  };

  const file = FILES.find(f => f.id === active);

  return (
    <div className="ide">
      <ActivityBar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <Sidebar active={active} onOpen={open} isMenuOpen={isMenuOpen} />
      <div className="main">
        <TabBar tabs={tabs} active={active} onSelect={setActive} onClose={close} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
        <Breadcrumb file={file} />
        <Editor file={file} />
      </div>
      <StatusBar file={file} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
