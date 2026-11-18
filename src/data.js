import { LOGOS } from './icons.js';

export const THEMES = ['ghostty', 'gruvbox', 'phosphor', 'paper'];

export const PROFILE = {
  user: 'patricio',
  host: 'vasquez',
  name: 'Patricio Vásquez',
  email: 'patriciovm04@gmail.com',
  linkedin: 'https://www.linkedin.com/in/patriciovm',
  github: 'https://github.com/patriciovm98',
  cvUrl: 'uploads/Patricio_Vasquez_CV.docx.pdf',
  domain: 'patriciovasquez.dev',
};

export const STACK_GROUPS = [
  {
    labelEs: 'data & bi',
    labelEn: 'data & bi',
    items: [
      { name: 'Python', logo: LOGOS.python },
      { name: 'PostgreSQL', logo: LOGOS.postgresql },
      { name: 'BigQuery', logo: LOGOS.bigquery },
      { name: 'Power BI', logo: LOGOS.powerbi },
    ],
  },
  {
    labelEs: 'ia & flujos',
    labelEn: 'ai & flows',
    items: [
      { name: 'n8n', logo: LOGOS.n8n },
      { name: 'Gemini / LLMs', logo: LOGOS.gemini },
      { name: 'Embeddings', logo: LOGOS.embeddings },
      { name: 'Webhooks', logo: LOGOS.webhook },
    ],
  },
  {
    labelEs: 'desarrollo',
    labelEn: 'dev',
    items: [
      { name: 'Django', logo: LOGOS.django },
      { name: 'Angular', logo: LOGOS.angular },
      { name: 'Node.js', logo: LOGOS.node },
    ],
  },
  {
    labelEs: 'cloud & env',
    labelEn: 'cloud & env',
    items: [
      { name: 'GCP', logo: LOGOS.gcp },
      { name: 'Azure', logo: LOGOS.azure },
      { name: 'Railway', logo: LOGOS.railway },
      { name: 'Docker', logo: LOGOS.docker },
      { name: 'Linux', logo: LOGOS.linux },
      { name: 'Git', logo: LOGOS.git },
    ],
  },
];

export const CONTENT = {
  es: {
    role: 'Data & AI Engineer',
    location: 'Santiago, CL',
    status: 'disponible',
    bio: [
      'Ingeniero en Informática enfocado en Data Engineering y automatización de procesos. Construyo pipelines de datos, flujos en n8n e integraciones con modelos de lenguaje para resolver trabajo operativo real.',
      'Recientemente en Creditú (Fintech), migrando reportería manual hacia BigQuery + Power BI y desarrollando herramientas internas de validación documental con IA.',
    ],
    links: {
      cv: 'cv.pdf',
      copied: 'copiado!',
    },
    cmds: {
      about: 'whoami',
      projects: 'ls ./proyectos',
      stack: 'cat ./stack.conf',
      experience: 'cat ./trayectoria.log',
    },
    projects: [
      {
        idx: '01',
        title: 'Pectacular.cl',
        ctx: 'Proyecto propio',
        url: 'https://www.pectacular.cl',
        desc: 'Cotizador de perfumes entre retailers de Chile. Web end-to-end en Angular y Django con un motor de Entity Matching que unifica productos entre tiendas usando embeddings vectoriales y un LLM como juez.',
        tags: ['Angular', 'Django', 'Python', 'Embeddings', 'LLMs', 'PostgreSQL'],
      },
      {
        idx: '02',
        title: 'Workflow de Visado IA',
        ctx: 'Creditú · 2026',
        desc: 'Validación semántica documental para el equipo de operaciones. Conecta un portal web (Django + Angular) con un flujo en n8n y Gemini que contrasta documentos legales contra datos de origen y audita en Google Workspace.',
        tags: ['n8n', 'Gemini', 'Django', 'Angular', 'Google APIs'],
      },
      {
        idx: '03',
        title: 'Reportería de Mora',
        ctx: 'Creditú · 2026',
        desc: 'Pipeline ETL diario que extrae históricos desde PostgreSQL vía túneles SSH hacia BigQuery, alimentando dashboards en Power BI sobre morosidad y salud de carteras para inversionistas.',
        tags: ['Python', 'PostgreSQL', 'BigQuery', 'Power BI', 'Railway'],
      },
    ],
    timeline: [
      {
        period: '2026',
        org: 'Creditú',
        role: 'Practicante de Data Engineering y Automatización',
        bullets: [
          'Migración de reportería manual a pipeline ETL automatizado con Python y BigQuery para análisis de carteras de crédito.',
          'Desarrollo de flujo documental con n8n, Gemini y auditoría automatizada sobre Google Workspace.',
        ],
      },
      {
        period: '2022–2026',
        org: 'Duoc UC',
        role: 'Ingeniería en Informática (Egresado)',
        bullets: ['Inglés intermedio alto (B2).'],
      },
    ],
    promptPlaceholder: "escribe 'help' para comandos opcionales...",
    promptHint: 'comandos: help · cv · email · pectacular · theme · clear',
  },

  en: {
    role: 'Data & AI Engineer',
    location: 'Santiago, CL',
    status: 'open to work',
    bio: [
      'Computer Engineer focused on Data Engineering and process automation. I build cloud data pipelines, n8n workflows, and practical LLM integrations to solve real operational bottlenecks.',
      'Recently at Creditú (Fintech), migrating manual portfolio reporting to BigQuery + Power BI and building internal AI document verification tools.',
    ],
    links: {
      cv: 'cv.pdf',
      copied: 'copied!',
    },
    cmds: {
      about: 'whoami',
      projects: 'ls ./projects',
      stack: 'cat ./stack.conf',
      experience: 'cat ./career.log',
    },
    projects: [
      {
        idx: '01',
        title: 'Pectacular.cl',
        ctx: 'Side project',
        url: 'https://www.pectacular.cl',
        desc: 'Fragrance price comparison across Chilean retailers. Built end-to-end with Angular and Django, powered by an Entity Matching engine using vector embeddings and an LLM judge.',
        tags: ['Angular', 'Django', 'Python', 'Embeddings', 'LLMs', 'PostgreSQL'],
      },
      {
        idx: '02',
        title: 'AI Document Validation',
        ctx: 'Creditú · 2026',
        desc: 'Semantic document verification tool for operations. Pairs a Django + Angular portal with an n8n + Gemini workflow to cross-check legal files against source records and log audits in Google Workspace.',
        tags: ['n8n', 'Gemini', 'Django', 'Angular', 'Google APIs'],
      },
      {
        idx: '03',
        title: 'Delinquency ETL Pipeline',
        ctx: 'Creditú · 2026',
        desc: 'Daily Python ETL extracting historical records from PostgreSQL over SSH tunnels into BigQuery, powering investor Power BI dashboards on credit portfolio health.',
        tags: ['Python', 'PostgreSQL', 'BigQuery', 'Power BI', 'Railway'],
      },
    ],
    timeline: [
      {
        period: '2026',
        org: 'Creditú',
        role: 'Data Engineering & Automation Intern',
        bullets: [
          'Migrated manual reporting to an automated Python + BigQuery ETL pipeline for credit portfolio analysis.',
          'Built an intelligent document review workflow in n8n with Gemini and automated Google Workspace auditing.',
        ],
      },
      {
        period: '2022–2026',
        org: 'Duoc UC',
        role: 'B.Eng. in Computer Engineering (Graduate)',
        bullets: ['Upper-Intermediate English (B2).'],
      },
    ],
    promptPlaceholder: "type 'help' for optional commands...",
    promptHint: 'commands: help · cv · email · pectacular · theme · clear',
  },
};
