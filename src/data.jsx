// Portfolio data — minimal, curated.

const LOGOS = {
  python: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" style="width:100%;height:100%;object-fit:contain;" />`,
  n8n: `<svg viewBox="0 0 32 32" fill="none"><circle cx="7" cy="16" r="3" fill="#ea4335"/><circle cx="25" cy="16" r="3" fill="#ea4335"/><circle cx="16" cy="16" r="2.5" stroke="#ea4335" stroke-width="1.8"/><path d="M10 16h3M19 16h3" stroke="#ea4335" stroke-width="1.5"/></svg>`,
  sql: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%;"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  bash: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" style="width:100%;height:100%;object-fit:contain;" />`,
  node: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" style="width:100%;height:100%;object-fit:contain;" />`,
  docker: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" style="width:100%;height:100%;object-fit:contain;" />`,
  django: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" style="width:100%;height:100%;object-fit:contain;" class="theme-invert-dark" />`,
  angular: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" style="width:100%;height:100%;object-fit:contain;" />`,
  azure: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" style="width:100%;height:100%;object-fit:contain;" />`,
  gcp: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" style="width:100%;height:100%;object-fit:contain;" />`,
  railway: `<img src="https://railway.app/brand/logo-light.svg" style="width:100%;height:100%;object-fit:contain;" class="theme-invert-light" />`,
  powerbi: `<img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" style="width:100%;height:100%;object-fit:contain;" />`,
  git: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" style="width:100%;height:100%;object-fit:contain;" />`,
  github: `<img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" style="width:100%;height:100%;object-fit:contain;" class="theme-invert-dark" />`
};

// Core stack — tight selection.
const STACK_CORE = [
  { name: 'Python', logo: LOGOS.python },
  { name: 'n8n', logo: LOGOS.n8n },
  { name: 'SQL', logo: LOGOS.sql },
  { name: 'Linux (Bash/Shell)', logo: LOGOS.bash },
  { name: 'Node.js', logo: LOGOS.node },
  { name: 'Docker', logo: LOGOS.docker },
];

const STACK_FRAMEWORKS = [
  { name: 'Django', logo: LOGOS.django },
  { name: 'Angular', logo: LOGOS.angular },
];

const STACK_CLOUD = [
  { name: 'Azure', logo: LOGOS.azure },
  { name: 'GCP', logo: LOGOS.gcp },
  { name: 'Railway', logo: LOGOS.railway },
];

const STACK_BI = [
  { name: 'Power BI', logo: LOGOS.powerbi },
];

const STACK_CICD = [
  { name: 'Git', logo: LOGOS.git },
  { name: 'GitHub', logo: LOGOS.github },
];


const PROJECTS = [
  {
    id: 'perfume',
    title: 'Pectacular.cl',
    link: 'https://www.pectacular.cl',
    summary: 'Proyecto Propio — Cotizador de perfumes entre retailers de Chile.',
    desc: 'Desarrollo End-to-End de la plataforma. La web fue construida con Angular y Django, respaldada por un motor inteligente de Entity Matching que resuelve la identidad de productos entre distintas fuentes masivas mediante embeddings vectoriales y el uso de un LLM como juez para validar las coincidencias.',
    tags: ['Angular', 'Django', 'Embeddings', 'LLMs', 'PostgreSQL'],
  },
  {
    id: 'visado',
    title: 'Workflow de Visado IA',
    summary: 'Creditú — Validación semántica documental.',
    desc: 'Desarrollo de una herramienta completa para el equipo de gestión. La lógica de comparación documental se construyó como un motor en n8n impulsado por Gemini, integrándose a la par con una plataforma web que desarrollé para que los gestores puedan cargar y administrar los documentos a evaluar.',
    tags: ['n8n', 'Gemini', 'Django', 'Angular'],
  },
  {
    id: 'mora',
    title: 'Reportería de Mora',
    summary: 'Creditú — Migración ETL a ecosistema BI moderno.',
    desc: 'Desarrollo de un pipeline programado diariamente que extrae datos históricos desde PostgreSQL y los carga en BigQuery, permitiendo visualizar en Power BI el estado de las carteras de crédito y su morosidad para reportar a inversionistas.',
    tags: ['BigQuery', 'PostgreSQL', 'Power BI', 'Railway'],
  },
];

const EXPERIENCE = [
  {
    period: '2026',
    company: 'Creditú',
    role: 'Data Engineering & Automatización (Práctica Profesional)',
    location: 'Santiago, CL · Fintech',
    highlights: [
      'Migración de reportería manual a pipeline ETL con BigQuery — redujo el time-to-insight sobre carteras de crédito.',
      'Workflow de visado IA en n8n con LLMs y auditoría automatizada sobre Google Workspace.',
    ],
  },
];

const EDUCATION = {
  school: 'Duoc UC',
  degree: 'Ingeniería en Informática - Egresado',
  period: '2022 — 2026',
};

const CONTACT = {
  email: 'patriciovm04@gmail.com',
  linkedin: 'linkedin.com/in/patriciovm',
  github: 'github.com/patriciovm98',
  location: 'Santiago, Chile',
};

Object.assign(window, { STACK_CORE, STACK_FRAMEWORKS, STACK_CLOUD, STACK_BI, STACK_CICD, PROJECTS, EXPERIENCE, EDUCATION, CONTACT });
