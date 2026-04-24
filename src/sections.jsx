// Sections — Terminal Linux vibe
const { useState, useEffect, useRef } = React;

function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) { setInView(true); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    obs.observe(ref.current);
    const t = setTimeout(() => setInView(true), 500);
    return () => { obs.disconnect(); clearTimeout(t); };
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/* ------- Prompt + CmdLine primitives ------- */
function Prompt({ path = '~' }) {
  return (
    <span className="prompt">
      <span className="user">patricio</span><span className="at">@</span><span className="host">vasquez</span><span className="sep">:</span><span className="path">{path}</span><span className="sigil">$</span>
    </span>
  );
}

function CmdLine({ path, cmd, cursor = false, children }) {
  return (
    <div className="cmd-line">
      <Prompt path={path} />
      <span className="cmd">{cmd}{cursor && <span className="cursor" />}</span>
      {children}
    </div>
  );
}

/* ------- TERMINAL WINDOW CHROME ------- */
function TermBar({ active, onNav }) {
  const tabs = [
    { k: 'home',    i: '01', l: '~/' },
    { k: 'stack',   i: '02', l: 'stack/' },
    { k: 'projects',i: '03', l: 'projects/' },
    { k: 'experience',i: '04', l: 'experience/' },
    { k: 'contact', i: '05', l: 'contact/' },
  ];
  return (
    <div className="term-bar">
      <div className="dots"><span className="r" /><span className="y" /><span className="g" /></div>
      <div className="title">
        <span className="tick">●</span> patricio@vasquez: ~ &mdash; zsh &mdash; 142×48
      </div>
      <div className="tabs">
        {tabs.map(t => (
          <a key={t.k} className={`tab ${active === t.k ? 'on' : ''}`}
             href={`#${t.k}`} onClick={() => onNav(t.k)}>
            <span className="idx">{t.i}</span>{t.l}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ------- HERO ------- */
function Hero() {
  const [typed, setTyped] = useState('');
  const full = 'whoami --verbose';
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(t);
    }, 60);
    return () => clearInterval(t);
  }, []);

  const ascii = `    ____        __       _                  ___    ____
   / __ \\____ _/ /_____ _(_)   ____  ____   /   |  /  _/
  / / / / __ \`/ __/ __ \`/ /   / __ \\/ __ \\ / /| |  / /
 / /_/ / /_/ / /_/ /_/ / /   / /_/ / / / // ___ |_/ /
/_____/\\__,_/\\__/\\__,_/_/    \\____/_/ /_//_/  |_/___/`;

  return (
    <section className="hero wrap" id="home">
      <div className="boot">
        <div><span className="ok">[  OK  ]</span> Mounted /home/patricio</div>
        <div><span className="ok">[  OK  ]</span> Started data-engine.service</div>
        <div><span className="ok">[  OK  ]</span> Started llm-workflow.service</div>
        <div><span className="ok">[  OK  ]</span> Reached target Portfolio</div>
        <div className="dim">Welcome to Debian GNU/Linux · kernel 6.8.0 · patricio-tty1</div>
      </div>

      <CmdLine path="~" cmd={<><span>./{typed}</span><span className="cursor" /></>} />

      <pre className="ascii-sig">{ascii}</pre>

      <h1>
        Ingeniero de<br />
        <span className="hl">Datos & IA</span>{' '}<span className="ghost">—</span><br />
        <span className="ghost">optimización · automatización</span>
      </h1>

      <div className="lede">
        <div style={{ color: 'var(--fg-4)', marginBottom: 10, fontSize: 11, letterSpacing: '0.08em' }}>
          $ cat ~/about.md
        </div>
        Ingeniero en Informática enfocado en crear soluciones que aportan valor estratégico. 
        Me especializo en la <span className="hl">automatización de flujos de trabajo</span>, optimización de procesos 
        y desarrollo de pipelines de datos escalables.
      </div>

      <div className="meta-grid">
        <div className="cell">
          <span className="k">// status</span>
          <span className="v g"><span className="dot" />open_to_work</span>
        </div>
        <div className="cell">
          <span className="k">// location</span>
          <span className="v">Santiago, CL · remote</span>
        </div>
        <div className="cell">
          <span className="k">// focus</span>
          <span className="v">RAG · ETL · LLM_ops</span>
        </div>
        <div className="cell">
          <span className="k">// domain</span>
          <span className="v">fintech · data_platforms</span>
        </div>
      </div>
    </section>
  );
}

/* ------- STACK ------- */
function StackSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="section wrap" id="stack">
      <Reveal className="section-head">
        <CmdLine path="~/stack" cmd={<><span className="fl">ls</span>{' '}<span className="fl">--core</span>{' '}<span className="fl">--grep</span>=<span className="str">"active"</span></>} />
        <h2 style={{ marginTop: 16 }}>Stack técnico actual</h2>
        <div className="tail">Lo que uso hoy · {STACK_CORE.length} herramientas principales</div>
      </Reveal>

      <div className="core-grid">
        {STACK_CORE.map((t, i) => (
          <Reveal key={t.name} delay={i * 40}>
            <div className="core-card">
              <div className="logo" dangerouslySetInnerHTML={{ __html: t.logo }} />
              <div>
                <div className="cat">{t.cat}</div>
                <div className="name">{t.name}</div>
              </div>
              <div className="blurb">{t.blurb}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={150}>
        <div className={`more-box ${open ? 'open' : ''}`}>
          <div className="more-head" onClick={() => setOpen(!open)}>
            <span className="chev">▸</span>
            <span className="label">
              <span style={{ color: 'var(--fg-4)' }}>$ ls --more</span>{' '}
              Stack secundario & herramientas que conozco
            </span>
            <span className="count">[{STACK_MORE.length}]</span>
          </div>
          <div className="more-body">
            <div className="more-list">
              {STACK_MORE.map(t => (
                <div key={t.name} className="more-item">
                  <div className="logo" dangerouslySetInnerHTML={{ __html: t.logo }} />
                  <span className="n">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------- PROJECTS ------- */
function ProjectsSection() {
  const [openId, setOpenId] = useState('rag');
  return (
    <section className="section wrap" id="projects">
      <Reveal className="section-head">
        <CmdLine path="~/projects" cmd={<><span className="fl">find</span>{' '}.{' '}<span className="fl">-name</span>{' '}<span className="str">"*.featured"</span></>} />
        <h2 style={{ marginTop: 16 }}>Proyectos destacados</h2>
        <div className="tail">{PROJECTS.length} seleccionados · click para expandir</div>
      </Reveal>

      <div className="proj-grid">
        {PROJECTS.map((p, i) => {
          const isOpen = openId === p.id;
          return (
            <Reveal key={p.id} delay={i * 50}>
              <article className={`project ${isOpen ? 'open' : ''}`}>
                <div className="proj-head" onClick={() => setOpenId(isOpen ? null : p.id)}>
                  <span className="pnum">0{i + 1}/</span>
                  <div className="titles">
                    <div className="kind">{p.kind}</div>
                    <h3>{p.title}</h3>
                    <div className="sub">// {p.subtitle}</div>
                  </div>
                  <div className="tags-col">
                    {p.tags.slice(0, 4).map(t => <span key={t}>{t}</span>)}
                  </div>
                  <div className="chev">▸</div>
                </div>
                <div className="proj-body">
                  <div className="proj-body-inner">
                    <div className="desc">{p.desc}</div>
                    <ul className="bullets">
                      {p.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------- EXPERIENCE ------- */
function ExperienceSection() {
  return (
    <section className="section wrap" id="experience">
      <Reveal className="section-head">
        <CmdLine path="~/experience" cmd={<><span className="fl">cat</span>{' '}timeline.log</>} />
        <h2 style={{ marginTop: 16 }}>Experiencia profesional</h2>
        <div className="tail">Fintech · Data Platforms · Automation</div>
      </Reveal>

      {EXPERIENCE.map((xp, i) => (
        <Reveal key={i} className="xp-block">
          <div className="xp-meta">
            <span className="co">{xp.company}</span>
            {xp.period}
          </div>
          <div className="xp-role">
            <h3>{xp.role}</h3>
            <div className="loc">{xp.location}</div>
            {xp.items.map((it, j) => (
              <div key={j} className="xp-item">
                <div className="h">
                  <span className="arr">▸</span>
                  <span className="t">{it.title}</span>
                </div>
                <p>{it.desc}</p>
                <div className="xp-stack">
                  {it.stack.map(s => <span key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      ))}

      <Reveal className="xp-block" style={{ marginTop: 40, paddingTop: 32, borderTop: '1px dashed var(--line-2)' }}>
        <div className="xp-meta">
          <span className="co">{EDUCATION.school.split(' · ')[0]}</span>
          {EDUCATION.period}
        </div>
        <div className="xp-role">
          <h3>{EDUCATION.degree}</h3>
          <div className="loc">{EDUCATION.school} · {EDUCATION.location}</div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------- CONTACT ------- */
function ContactSection() {
  return (
    <section className="section wrap" id="contact" style={{ paddingBottom: 48 }}>
      <Reveal className="section-head">
        <CmdLine path="~/contact" cmd={<><span className="fl">curl</span>{' '}<span className="str">"patricio.vasquez/handshake"</span></>} />
        <h2 style={{ marginTop: 16 }}>Contacto</h2>
        <div className="tail">abierto a colaboraciones · respuesta &lt; 24h</div>
      </Reveal>

      <Reveal>
        <div className="contact-term">
          <div style={{ color: 'var(--fg-4)', marginBottom: 14, fontSize: 11 }}>
            &gt; connection established · 200 OK
          </div>
          <h2 className="hdr">
            ¿Tienes un pipeline atascado<br />
            en planillas? <span className="ghost">Conversemos.</span>
          </h2>

          <div className="divider">─────────────────────────────────────</div>

          <div className="out-line"><span className="k">email    </span> → <a className="v" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
          <div className="out-line"><span className="k">linkedin </span> → <a className="v" href={`https://${CONTACT.linkedin}`} target="_blank" rel="noreferrer">{CONTACT.linkedin}</a></div>
          <div className="out-line"><span className="k">github   </span> → <a className="v" href={`https://${CONTACT.github}`} target="_blank" rel="noreferrer">{CONTACT.github}</a></div>
          <div className="out-line"><span className="k">phone    </span> → <a className="v" href={`tel:${CONTACT.phone.replace(/\s/g,'')}`}>{CONTACT.phone}</a></div>
          <div className="out-line"><span className="k">location </span> → <span className="v">{CONTACT.location}</span></div>

          <div className="divider" style={{ marginTop: 14 }}>─────────────────────────────────────</div>
          <div style={{ color: 'var(--fg-4)', marginTop: 10, fontSize: 12 }}>
            <Prompt path="~/contact" />{' '}<span style={{ color: 'var(--fg)' }}>_</span><span className="cursor" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------- FOOTER ------- */
function Footer() {
  return (
    <div className="wrap">
      <footer>
        <div className="sig">
          <span className="d" />
          <span>PATRICIO.VASQUEZ · SANTIAGO.CL · {new Date().getFullYear()} · BUILT_WITH_CARE</span>
        </div>
        <div>deployed_on=github.pages · uptime=100%</div>
      </footer>
    </div>
  );
}

Object.assign(window, { Reveal, Prompt, CmdLine, TermBar, Hero, StackSection, ProjectsSection, ExperienceSection, ContactSection, Footer });
