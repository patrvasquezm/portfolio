import { LOGOS } from './icons.js';

export const PROFILE = {
  name: 'Patricio Vásquez',
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
    intro: [
      'Ingeniero en Informática enfocado en Data Engineering y automatización de procesos. Trabajo construyendo pipelines de datos, flujos automatizados en n8n e integraciones con modelos de lenguaje aplicadas a problemas operativos reales.',
      'Recientemente completé mi práctica profesional en Creditú (sector Fintech), migrando reportería manual hacia arquitecturas en la nube con BigQuery y desarrollando herramientas internas de validación documental.',
    ],
    links: {
      cv: 'Currículum (PDF)',
      copied: 'copiado',
    },
    headings: {
      projects: 'Proyectos',
      experience: 'Experiencia',
      stack: 'Tecnologías',
      education: 'Educación',
    },
    projects: [
      {
        id: 'pectacular',
        meta: 'Proyecto propio',
        title: 'Pectacular.cl',
        url: 'https://www.pectacular.cl',
        desc: 'Cotizador de perfumes entre retailers de Chile. Construido end-to-end en Angular y Django, con un motor propio de Entity Matching que unifica productos entre catálogos distintos usando embeddings vectoriales y un LLM como juez para validar coincidencias.',
        tech: ['Angular', 'Django', 'Python', 'Embeddings', 'LLMs', 'PostgreSQL'],
      },
      {
        id: 'visado',
        meta: 'Creditú · 2026',
        title: 'Workflow de Visado IA',
        desc: 'Herramienta interna de validación semántica documental para el equipo de gestión. Combina un flujo en n8n con Gemini para contrastar documentos legales contra registros de origen, junto a una web en Django y Angular para cargar archivos y auditar ejecuciones en Google Workspace.',
        tech: ['n8n', 'Gemini', 'Django', 'Angular', 'Google APIs'],
      },
      {
        id: 'mora',
        meta: 'Creditú · 2026',
        title: 'Reportería de Mora',
        desc: 'Pipeline ETL diario que extrae datos históricos desde PostgreSQL vía túneles SSH y los centraliza en BigQuery, alimentando paneles en Power BI sobre el estado y morosidad de carteras de crédito para inversionistas.',
        tech: ['Python', 'PostgreSQL', 'BigQuery', 'Power BI', 'Railway'],
      },
    ],
    experience: [
      {
        period: '2026',
        company: 'Creditú',
        role: 'Practicante de Data Engineering y Automatización',
        location: 'Santiago',
        bullets: [
          'Migración de reportería manual a un pipeline ETL automatizado con Python y BigQuery para el seguimiento de carteras de crédito.',
          'Desarrollo de flujo documental con n8n, modelos de lenguaje y trazabilidad automatizada sobre Google Workspace.',
        ],
      },
    ],
    education: {
      period: '2022 — 2026',
      school: 'Duoc UC',
      degree: 'Ingeniería en Informática (Egresado)',
      note: 'Inglés intermedio alto (B2)',
    },
    footerLocation: 'Santiago, Chile',
  },

  en: {
    role: 'Data & AI Engineer',
    intro: [
      'Computer Engineer focused on Data Engineering and process automation. I build cloud data pipelines, automated workflows in n8n, and practical LLM integrations to solve day-to-day operational bottlenecks.',
      'Recently completed my internship at Creditú (Fintech), migrating manual credit portfolio reporting to Google BigQuery and building internal document verification tools.',
    ],
    links: {
      cv: 'Resume (PDF)',
      copied: 'copied',
    },
    headings: {
      projects: 'Projects',
      experience: 'Experience',
      stack: 'Technologies',
      education: 'Education',
    },
    projects: [
      {
        id: 'pectacular',
        meta: 'Side project',
        title: 'Pectacular.cl',
        url: 'https://www.pectacular.cl',
        desc: 'Fragrance price comparison across Chilean retailers. Built end-to-end with Angular and Django, backed by an Entity Matching pipeline that resolves product identity across catalogs using vector embeddings and an LLM judge.',
        tech: ['Angular', 'Django', 'Python', 'Embeddings', 'LLMs', 'PostgreSQL'],
      },
      {
        id: 'visado',
        meta: 'Creditú · 2026',
        title: 'AI Document Validation',
        desc: 'Internal semantic validation tool for the operations team. Pairs an n8n + Gemini engine that cross-checks legal documents against source records with a Django and Angular web portal and Google Workspace audit logs.',
        tech: ['n8n', 'Gemini', 'Django', 'Angular', 'Google APIs'],
      },
      {
        id: 'mora',
        meta: 'Creditú · 2026',
        title: 'Delinquency ETL Pipeline',
        desc: 'Scheduled daily ETL extracting historical data from PostgreSQL over SSH tunnels into BigQuery, feeding Power BI dashboards on credit portfolio delinquency for investors.',
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
          'Migrated manual spreadsheet reporting to an automated Python + BigQuery ETL pipeline for credit portfolio analysis.',
          'Built an intelligent document review workflow in n8n with LLMs and automated execution auditing in Google Workspace.',
        ],
      },
    ],
    education: {
      period: '2022 — 2026',
      school: 'Duoc UC',
      degree: 'B.Eng. in Computer Engineering (Graduate)',
      note: 'Upper-Intermediate English (B2)',
    },
    footerLocation: 'Santiago, Chile',
  },
};
