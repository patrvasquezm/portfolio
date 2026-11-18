import { LOGOS } from './icons.js';

export const PROFILE = {
  name: 'Patricio Vásquez',
  coords: '33.45°S, 70.66°W',
  email: 'patriciovm04@gmail.com',
  linkedin: 'https://www.linkedin.com/in/patriciovm',
  github: 'https://github.com/patriciovm98',
  cvUrl: 'uploads/Patricio_Vasquez_CV.docx.pdf',
  domain: 'patriciovasquez.dev',
};

export const STACK_GROUPS = [
  {
    key: 'data',
    labelEs: 'Datos & BI',
    labelEn: 'Data & BI',
    items: [
      { name: 'Python', logo: LOGOS.python },
      { name: 'PostgreSQL', logo: LOGOS.postgresql },
      { name: 'BigQuery', logo: LOGOS.bigquery },
      { name: 'Power BI', logo: LOGOS.powerbi },
    ],
  },
  {
    key: 'ai',
    labelEs: 'Automatización & IA',
    labelEn: 'Automation & AI',
    items: [
      { name: 'n8n', logo: LOGOS.n8n },
      { name: 'Gemini / LLMs', logo: LOGOS.gemini },
      { name: 'Embeddings', logo: LOGOS.embeddings },
      { name: 'Webhooks', logo: LOGOS.webhook },
    ],
  },
  {
    key: 'dev',
    labelEs: 'Desarrollo',
    labelEn: 'Development',
    items: [
      { name: 'Django', logo: LOGOS.django },
      { name: 'Angular', logo: LOGOS.angular },
      { name: 'Node.js', logo: LOGOS.node },
    ],
  },
  {
    key: 'infra',
    labelEs: 'Cloud & Entorno',
    labelEn: 'Cloud & Infra',
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
    statementParts: {
      before: 'Construyendo ',
      italic1: 'pipelines de datos',
      mid: ', flujos de ',
      italic2: 'automatización',
      after: ' e IA aplicada a problemas reales.',
    },
    intro:
      'Ingeniero en Informática. Me muevo entre bases de datos, orquestación con n8n, modelos de lenguaje y desarrollo web para reemplazar trabajo manual repetitivo por sistemas confiables. Recientemente en Creditú (Fintech), modernizando reportería sobre BigQuery y automatizando validación documental.',
    links: {
      cv: 'CV.pdf',
      copied: 'copiado',
    },
    headings: {
      projects: 'Proyectos',
      experience: 'Experiencia',
      stack: 'Stack',
      education: 'Educación',
    },
    archToggle: {
      show: 'arquitectura +',
      hide: 'arquitectura −',
    },
    projects: [
      {
        id: 'pectacular',
        idx: '01',
        meta: 'Proyecto propio',
        title: 'Pectacular.cl',
        url: 'https://www.pectacular.cl',
        desc: 'Cotizador de perfumes entre retailers de Chile. Desarrollado end-to-end en Angular y Django, respaldado por un motor propio de Entity Matching que cruza catálogos dispares mediante embeddings vectoriales y un LLM como juez.',
        flow: ['Retailers', 'Embeddings', 'LLM Judge', 'PostgreSQL', 'Django + Angular'],
        archNote: 'Resuelve nombres, volúmenes y concentraciones inconsistentes entre tiendas sin reglas manuales frágiles.',
        tech: ['Angular', 'Django', 'Python', 'Embeddings', 'LLMs', 'PostgreSQL'],
      },
      {
        id: 'visado',
        idx: '02',
        meta: 'Creditú · 2026',
        title: 'Workflow de Visado IA',
        desc: 'Sistema interno de revisión documental semántica. Conecta un portal web propio (Django + Angular) con un motor en n8n impulsado por Gemini para contrastar documentos legales frente a datos de origen y dejar auditoría en Google Workspace.',
        flow: ['Portal Web', 'Webhook', 'Motor n8n', 'Gemini AI', 'Workspace Audit'],
        archNote: 'Trazabilidad completa por ejecución y validación cruzada automática para el equipo operativo.',
        tech: ['n8n', 'Gemini', 'Django', 'Angular', 'Google APIs'],
      },
      {
        id: 'mora',
        idx: '03',
        meta: 'Creditú · 2026',
        title: 'Reportería de Mora',
        desc: 'Pipeline ETL diario que extrae históricos desde PostgreSQL vía túneles SSH hacia BigQuery, alimentando dashboards en Power BI sobre el estado de carteras de crédito y morosidad para inversionistas.',
        flow: ['PostgreSQL', 'SSH + Python', 'Railway Cron', 'BigQuery', 'Power BI'],
        archNote: 'Eliminó extracciones manuales y centralizó la historia de carteras para análisis directo en BI.',
        tech: ['Python', 'PostgreSQL', 'BigQuery', 'Power BI', 'Railway'],
      },
    ],
    experience: [
      {
        period: '2026',
        company: 'Creditú',
        role: 'Data Engineering & Automatización (Práctica)',
        location: 'Santiago',
        bullets: [
          'Migración de reportería manual a pipeline ETL automatizado con Python y BigQuery sobre carteras de crédito.',
          'Desarrollo de plataforma y flujo de visado documental con n8n, Gemini y auditoría sobre Google Workspace.',
        ],
      },
    ],
    education: {
      period: '2022 — 2026',
      school: 'Duoc UC',
      degree: 'Ingeniería en Informática · Egresado',
      note: 'Inglés intermedio alto (B2)',
    },
    footerLocation: 'Santiago, CL',
  },

  en: {
    role: 'Data & AI Engineer',
    statementParts: {
      before: 'Building ',
      italic1: 'data pipelines',
      mid: ', workflow ',
      italic2: 'automation',
      after: ', and practical AI systems.',
    },
    intro:
      'Computer Engineer working across databases, n8n orchestration, language models, and full-stack web to replace repetitive manual work with dependable software. Recently at Creditú (Fintech), migrating credit reporting to BigQuery and automating legal document verification.',
    links: {
      cv: 'CV.pdf',
      copied: 'copied',
    },
    headings: {
      projects: 'Projects',
      experience: 'Experience',
      stack: 'Stack',
      education: 'Education',
    },
    archToggle: {
      show: 'architecture +',
      hide: 'architecture −',
    },
    projects: [
      {
        id: 'pectacular',
        idx: '01',
        meta: 'Side project',
        title: 'Pectacular.cl',
        url: 'https://www.pectacular.cl',
        desc: 'Fragrance price comparison across Chilean retailers. Built end-to-end in Angular and Django, powered by an Entity Matching engine that unifies disparate product catalogs using vector embeddings and an LLM judge.',
        flow: ['Retail Feeds', 'Embeddings', 'LLM Judge', 'PostgreSQL', 'Django + Angular'],
        archNote: 'Resolves inconsistent SKU naming, bottle sizes, and concentrations without brittle regex rules.',
        tech: ['Angular', 'Django', 'Python', 'Embeddings', 'LLMs', 'PostgreSQL'],
      },
      {
        id: 'visado',
        idx: '02',
        meta: 'Creditú · 2026',
        title: 'AI Document Validation',
        desc: 'Internal semantic document verification system. Pairs a custom Django + Angular portal with an n8n + Gemini workflow to cross-check legal files against source records and log audits in Google Workspace.',
        flow: ['Web Portal', 'Webhook', 'n8n Engine', 'Gemini AI', 'Workspace Audit'],
        archNote: 'Full per-execution traceability and automated cross-checking for operations managers.',
        tech: ['n8n', 'Gemini', 'Django', 'Angular', 'Google APIs'],
      },
      {
        id: 'mora',
        idx: '03',
        meta: 'Creditú · 2026',
        title: 'Delinquency ETL Pipeline',
        desc: 'Daily ETL pipeline extracting historical data from PostgreSQL over SSH tunnels into BigQuery, powering Power BI dashboards on credit portfolio health and delinquency for investors.',
        flow: ['PostgreSQL', 'SSH + Python', 'Railway Cron', 'BigQuery', 'Power BI'],
        archNote: 'Replaced manual spreadsheet exports and centralized historical portfolio snapshots.',
        tech: ['Python', 'PostgreSQL', 'BigQuery', 'Power BI', 'Railway'],
      },
    ],
    experience: [
      {
        period: '2026',
        company: 'Creditú',
        role: 'Data Engineering & Automation Intern',
        location: 'Santiago',
        bullets: [
          'Migrated manual reporting to an automated Python + BigQuery ETL pipeline for credit portfolio tracking.',
          'Built an intelligent document review workflow in n8n with Gemini and automated Google Workspace auditing.',
        ],
      },
    ],
    education: {
      period: '2022 — 2026',
      school: 'Duoc UC',
      degree: 'B.Eng. in Computer Engineering · Graduate',
      note: 'Upper-Intermediate English (B2)',
    },
    footerLocation: 'Santiago, CL',
  },
};
