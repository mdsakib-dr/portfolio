// ─────────────────────────────────────────────────────────────
// All portfolio content lives here. Edit this one file to update
// the whole site — no need to touch the components.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Md Sakib",
  // Tagline drafted from your resume
  tagline: "I build production AI systems — RAG pipelines, AI agents, and automation that removes real work.",
  location: "Dhaka, Bangladesh",
  availability: "Open to remote AI / automation roles",
  email: "mdsakibahmed848@gmail.com",
  phone: "+880 1825-264227",
  github: "https://github.com/mdsakib-dr",
  linkedin: "https://linkedin.com/in/md-sakib-4b7910211/",

  // ── Assets you drop into /public yourself ─────────────────────────────
  // These are the only places a filename is written down. Rename the PDF or
  // the portrait in /public and change the string here — Nav, Hero and the
  // portrait component all read from these, nothing hardcodes a path.
  resumeFile: "/Md_Sakib_Resume.pdf", // → public/Md_Sakib_Resume.pdf
  resumeDownloadName: "Md-Sakib-Resume.pdf", // name the browser saves it as
  photoFile: "/profile.png", // → public/profile.png (hero portrait source)
  // About drafted from your resume
  about: [
    "I'm an AI Automation Engineer who ships production systems, not just drag-and-drop flows. I build full-stack AI platforms on FastAPI and Next.js, custom MCP servers that expose real tools to LLM clients, RAG pipelines over pgvector, and end-to-end automation on n8n.",
    "My focus is reliability: dedup and idempotency, secure credential handling, retry/fallback on every external call, and verification layers that catch when an AI answer isn't grounded in real data. I care about automations that measurably remove manual work from business teams.",
    "Currently building AI products at AKIJ iBOS — including ChannelSync, an MCP-native omnichannel support platform — while shipping my own tools: multi-tenant RAG apps, MCP tool servers, and lead-management pipelines.",
  ],
};

export const stats = [
  { value: "6+", label: "Production AI systems shipped" },
  { value: "2", label: "Live MCP tool servers" },
  { value: "All", label: "Meta lead-gen pages automated" },
  {
    // `brands` doubles as the display labels and the lib/icons.js lookup keys.
    // Hero renders logos when it is present and falls back to `value` when not.
    value: "OpenAI · Claude · DeepSeek",
    brands: ["OpenAI", "Claude", "DeepSeek"],
    label: "LLMs in production",
  },
];

// Featured projects — live demos first, since those convert best.
export const projects = [
  {
    id: "channelsync",
    name: "ChannelSync",
    category: "Applied AI · AKIJ iBOS",
    tagline: "Unified omnichannel (voice + message) AI customer support.",
    description:
      "MCP-native, speech-to-speech support product with BYOK across any LLM, deployable on-prem for data residency and regulated, high-scale teams. Contributed backend/automation and frontend.",
    stack: ["MCP", "Speech-to-Speech", "BYOK LLMs", "On-prem", "Backend + Frontend"],
    live: "https://chanelsync.ibos.io/",
    repo: null,
    featured: true,
  },
  {
    id: "social-bot",
    name: "social_bot",
    category: "Full-Stack AI · RAG",
    tagline: "Multi-tenant AI customer-support platform with grounded auto-reply.",
    description:
      "Businesses connect Facebook Pages; messages stream into a real-time WebSocket inbox and per-page AI agents auto-reply with human-takeover. RAG pipeline (ingestion, chunking, embeddings, pgvector cosine retrieval) keeps answers grounded. Own JWT auth, Fernet-encrypted tokens, HMAC-verified webhooks.",
    stack: ["FastAPI", "Next.js 15", "PostgreSQL + pgvector", "OpenAI", "WebSocket", "Docker"],
    live: "https://social-bot-tan.vercel.app/",
    repo: "https://github.com/mdsakib-dr/social_bot",
    featured: true,
  },
  {
    id: "wordpress-mcp",
    name: "WordPress MCP Server",
    category: "AI Agents · MCP",
    tagline: "Lets any LLM client operate a self-hosted WordPress site.",
    description:
      "Remote MCP tool server exposing draft / publish / update / search actions so any MCP client (including Claude) can perform multi-step tasks on a WordPress site — no plugins, authenticated via Application Passwords, deployed on Prefect Horizon.",
    stack: ["FastMCP", "WordPress REST API", "App-Password auth", "Prefect Horizon"],
    live: "https://wordpress-mcp.fastmcp.app/mcp",
    repo: "https://github.com/mdsakib-dr/wordpress-mcp",
    featured: true,
  },
  {
    id: "seo-mcp",
    name: "SEO MCP Server",
    category: "AI Agents · MCP",
    tagline: "Gives LLM agents live GA4 + Ahrefs data as callable tools.",
    description:
      "MCP tool server that collects GA4 analytics and Ahrefs SEO data via API and exposes it as callable tools — giving LLM agents on-demand access to live traffic and SEO metrics for retrieval and analysis.",
    stack: ["FastMCP", "Ahrefs API", "GA4", "Prefect Horizon"],
    live: "https://seo-mcp.fastmcp.app/mcp",
    repo: "https://github.com/mdsakib-dr/seo-mcp",
    featured: true,
  },
  {
    id: "meta-leads",
    name: "Meta Ads Lead-Capture & CRM Automation",
    category: "Automation · n8n",
    tagline: "Webhook-driven lead management across all company Meta pages.",
    description:
      "Verifies Meta's handshake, ACKs instantly, fetches lead data from the Graph API, normalizes to Dhaka time, dedups, and pushes each lead into Google Sheets and the internal CRM — with retry/fallback on every external call.",
    stack: ["n8n", "Graph API", "Google Sheets", "CRM"],
    live: null,
    repo: null,
    featured: false,
  },
  {
    id: "ads-digest",
    name: "AI-Powered Daily Ads Reporting Digest",
    category: "Automation · n8n",
    tagline: "Multi-source ads digest with a hallucination guard.",
    description:
      "Scheduled Meta + Google Ads digest that fetches live spend/CPL/CPA, runs DeepSeek analysis with strict anomaly thresholds, and auto-emails an executive summary — guarded by a verification check that flags any run not backed by real tool data.",
    stack: ["n8n", "Meta Ads API", "Google Ads API", "DeepSeek", "Gmail API"],
    live: null,
    repo: null,
    featured: false,
  },
  {
    id: "leads-scraper",
    name: "Leads Scraper",
    category: "Data · Retrieval",
    tagline: "Sheet-triggered Google Maps lead engine, crash-safe.",
    description:
      "FastAPI service that polls a Google Sheet, scrapes Google Maps, and enriches emails/socials from business sites — persisting each lead on finalize (crash-safe) with DB-level dedup via a UNIQUE key (domain → phone → name+address).",
    stack: ["FastAPI", "Playwright", "PostgreSQL", "Google Sheets API", "async"],
    live: null,
    repo: "https://github.com/mdsakib-dr/leads-scrapper",
    featured: false,
  },
];

export const skills = [
  {
    group: "AI / LLM",
    items: ["OpenAI", "Anthropic Claude", "DeepSeek", "RAG pipelines", "Embeddings", "pgvector search", "Prompt engineering", "Hallucination reduction"],
  },
  {
    group: "AI Agents & MCP",
    items: ["FastMCP", "Custom MCP tool servers", "Multi-step agents", "Tool-calling", "Remote MCP deploy (Prefect Horizon)"],
  },
  {
    group: "Backend & APIs",
    items: ["Python", "FastAPI", "SQLAlchemy (async)", "REST APIs", "Graph / Ads APIs", "Webhooks", "JWT auth", "WebSockets"],
  },
  {
    group: "Automation",
    items: ["n8n", "Webhook pipelines", "Retry / fallback", "Error handling", "CRM integration", "Audit logging"],
  },
  {
    group: "Data & DevOps",
    items: ["PostgreSQL + pgvector", "Playwright", "Pandas", "Docker", "docker-compose", "Git / GitHub"],
  },
  {
    group: "Frontend",
    items: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS"],
  },
];

export const experience = [
  {
    company: "AKIJ iBOS",
    role: "AI & Automation Engineer (Intern)",
    period: "May 2026 — Present",
    location: "Dhaka, Bangladesh",
    points: [
      "Contributed backend/automation and frontend to ChannelSync — an MCP-native omnichannel (voice + message) support product with BYOK across any LLM.",
      "Minimized manual workload across marketing and other teams by automating reporting, lead handling, and publishing end-to-end.",
      "Built Python + n8n automation connecting LLM outputs to live enterprise systems via REST/Graph APIs, with validation and retry/fallback.",
    ],
  },
];

export const education = {
  school: "ZNRF University of Management Sciences, Dhaka",
  degree: "B.Eng. in Computer Science & Engineering",
  period: "Jul 2022 — Jul 2026",
  notes: ["Top 5% of batch", "ZNRF Trust Scholarship recipient"],
};

export const activities = [
  {
    group: "Leadership & Clubs",
    items: [
      "General Secretary — ZUMS Student Forum (2025)",
      "Office Secretary — ZUMS Biz-Tech Club",
      "Ex-Secretary — ZUMS English Club",
      "Executive Member — BASIS Student Forum ZUMS Chapter",
    ],
  },
  {
    group: "Competitions & Programs",
    items: [
      "Selected Participant — ICPC Dhaka Regional Onsite Contest 2023 (Rank 147)",
      "Participant — Imagin Ventures Youth Challenge 2024–25",
      "Selected — UIHP Innovation Hub Program",
      "Participant — NASA Space Apps Challenge (2023 & 2024)",
      "Participant — AI & Machine Learning Bootcamp, EATL Innovation Hub 2025",
      "Participant — National Conference on Intellectual Property & Commercialization (ICIPC) 2024",
    ],
  },
];
