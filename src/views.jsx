// Ensure React is available before JSX compilation
if (typeof React === 'undefined') throw new Error('React must load before this script');

const { useState, useEffect, useRef } = React;

function AboutView() {
  return (
    <div className="md">
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--fg-2)', marginBottom: 18 }}>
        <span style={{ color: 'var(--sx-comment)' }}>{`// README.md`}</span>
      </div>
      <h1>
        Patricio Vásquez<br />
        <span className="muted">Data & AI Engineer.</span>
      </h1>

      <p className="lede" style={{ marginTop: 24 }}>
        Ingeniero en Informática enfocado en crear soluciones que aportan valor estratégico. 
        Me especializo en la automatización de flujos de trabajo, optimización de procesos 
        y desarrollo de pipelines de datos escalables.
      </p>

      <div className="meta">
        <span className="pill status"><span className="d" />open to work</span>
        <span className="pill">Santiago, CL</span>
        <span className="pill">Fintech · Data Platforms</span>
      </div>

      <h2>Qué hago</h2>
      <p>
        Trabajo en proyectos que suman valor real al negocio. Automatizo flujos de trabajo 
        para optimizar tiempos y recursos, integrando distintas plataformas y servicios. 
        Diseño arquitecturas eficientes que permiten transformar procesos manuales en 
        sistemas ágiles y robustos.
      </p>

      <h2>Cómo empezar</h2>
      <p>
        Abre <code className="inline">stack.json</code> para ver el stack actual,{' '}
        <code className="inline">projects/</code> para los trabajos destacados, o{' '}
        <code className="inline">contact.yml</code> para conversar.
      </p>
    </div>
  );
}

function StackView() {
  return (
    <div className="md">
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--sx-comment)', marginBottom: 18 }}>
        {`// stack.json — Core stack & technologies`}
      </div>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Stack Técnico</h1>

      <div className="stack-grid">
        {STACK_CORE.map(s => (
          <div key={s.name} className="stack-pill">
            <div className="ico" dangerouslySetInnerHTML={{ __html: s.logo }} />
            <span className="name">{s.name}</span>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Frameworks</h2>
      <div className="stack-grid">
        {STACK_FRAMEWORKS.map(s => (
          <div key={s.name} className="stack-pill">
            <div className="ico" dangerouslySetInnerHTML={{ __html: s.logo }} />
            <span className="name">{s.name}</span>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>CI / CD</h2>
      <div className="stack-grid">
        {STACK_CICD.map(s => (
          <div key={s.name} className="stack-pill">
            <div className="ico" dangerouslySetInnerHTML={{ __html: s.logo }} />
            <span className="name">{s.name}</span>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Cloud</h2>
      <div className="stack-grid">
        {STACK_CLOUD.map(s => (
          <div key={s.name} className="stack-pill">
            <div className="ico" dangerouslySetInnerHTML={{ __html: s.logo }} />
            <span className="name">{s.name}</span>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 40, marginBottom: 16 }}>Herramientas BI</h2>
      <div className="stack-grid">
        {STACK_BI.map(s => (
          <div key={s.name} className="stack-pill">
            <div className="ico" dangerouslySetInnerHTML={{ __html: s.logo }} />
            <span className="name">{s.name}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

function ProjectsView() {
  return (
    <div className="md">
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--sx-comment)', marginBottom: 18 }}>
        {`// projects/index.md — ${PROJECTS.length} entries`}
      </div>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Proyectos</h1>

      <div className="proj-list">
        {PROJECTS.map(p => (
          <article key={p.id} className="proj-card">
            <div className="pc-head">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {p.title}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" title="Visitar proyecto" style={{ color: 'var(--fg-2)', display: 'inline-flex', alignItems: 'center' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                )}
              </h3>
              <div className="tags" style={{ marginBottom: 12 }}>
                {p.tags.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
            <div className="summary">{p.summary}</div>
            <div className="desc">{p.desc}</div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ExperienceView() {
  return (
    <div className="md">
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--sx-comment)', marginBottom: 18 }}>
        {`// experience.md`}
      </div>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Experiencia</h1>

      {EXPERIENCE.map((xp, i) => (
        <div key={i} className="xp">
          <div className="period">{xp.period}</div>
          <div>
            <h3>{xp.company}</h3>
            <div className="role">{xp.role} <span className="loc">· {xp.location}</span></div>
            <ul>
              {xp.highlights.map((h, j) => <li key={j}>{h}</li>)}
            </ul>
          </div>
        </div>
      ))}

      <div className="xp">
        <div className="period">{EDUCATION.period}</div>
        <div>
          <h3>{EDUCATION.school}</h3>
          <div className="role">{EDUCATION.degree}</div>
        </div>
      </div>
    </div>
  );
}

function ContactView() {
  return (
    <div className="md">
      <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--sx-comment)', marginBottom: 18 }}>
        {`# contact.yml`}
      </div>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Contacto</h1>
      <p style={{ maxWidth: 560, marginBottom: 24 }}>
        Abierto a oportunidades y colaboraciones en Data Engineering, IA y automatización.
      </p>

      <div className="yaml">
        <div><span className="yk">email</span><span className="yc">:</span> <a className="yv" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
        <div><span className="yk">linkedin</span><span className="yc">:</span> <a className="yv" href={`https://${CONTACT.linkedin}`} target="_blank" rel="noreferrer">{CONTACT.linkedin}</a></div>
        <div><span className="yk">github</span><span className="yc">:</span> <a className="yv" href={`https://${CONTACT.github}`} target="_blank" rel="noreferrer">{CONTACT.github}</a></div>
        <div><span className="yk">location</span><span className="yc">:</span> <span className="yv">"{CONTACT.location}"</span></div>
      </div>
    </div>
  );
}

Object.assign(window, { AboutView, StackView, ProjectsView, ExperienceView, ContactView });
