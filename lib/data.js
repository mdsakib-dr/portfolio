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
    id: "seo-agent",
    name: "SEO Agent",
    category: "AI Agent · AKIJ iBOS",
    tagline: "AI agent that audits 52 SEO checks and fixes WordPress and Next.js sites on its own.",
    description:
      "Runs a 52-check audit based on the HOTH SEO report and fixes meta titles and descriptions, headings, body copy, thin content, image alt text, WebPage schema, and internal links. Ships as the iBOS SEO Agent WordPress plugin (v1.8.0) and the @ibos/seo-agent package for Next.js. Skips page-builder pages for content, heading, and link changes, and can send every fix as a human-approved proposal. Optional GEO fixes add llms.txt, Organization schema, and answer and FAQ blocks. An off-page agent handles backlink outreach and tracks backlinks through Ahrefs and Google Search Console.",
    stack: ["AI Agents", "WordPress", "Next.js", "Technical SEO", "GEO", "Schema Markup", "Google PageSpeed API", "Ahrefs", "Google Search Console"],
    live: null,
    repo: null,
    featured: true,
    caseStudy: true,
  },
  {
    id: "marketing-os",
    name: "Marketing OS",
    category: "AI Agent Orchestration · Solo Project",
    tagline: "Desktop control tower that turns Claude Code, Codex, and OpenCode into scheduled, self-governing content agents.",
    description:
      "Electron desktop platform orchestrating multiple agent CLIs via real PTY sessions and headless autopilot runs. Custom MCP server (raw JSON-RPC, zero dependencies) streams permission requests to the UI with a 10-minute deny-by-default timeout. Governed pipeline: research → create → deduplicate → QC → gated publish, enforced by a single non-bypassable chokepoint. Multi-layer duplicate detection (SHA-256, pHash, source windows, optional semantic embeddings), RAG-style retrieval of past high-performing posts, and Facebook Graph API publishing with 6-hour performance polling stored as time-series. ~11K lines across Electron/Node.js, Python, and PostgreSQL.",
    stack: ["Electron", "Node.js", "Python", "PostgreSQL", "MCP", "JSON-RPC", "LLM Agents", "RAG", "Embeddings", "Perceptual Hashing", "Facebook Graph API", "AES-256-GCM"],
    live: null,
    repo: null,
    featured: true,
    // Flags a matching entry in `caseStudies` below. The Work card links to
    // /work/<id> when this is set instead of showing the "internal" fallback.
    caseStudy: true,
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

// Long-form case studies, keyed by project id. Any project with
// `caseStudy: true` gets a /work/<id> page rendered from its entry here.
// Prose is engineer-to-engineer: concrete, no fluff. Leave [X] as a literal
// placeholder anywhere a real metric is not yet measured.
export const caseStudies = {
  "marketing-os": {
    name: "Marketing OS",
    category: "AI Agent Orchestration",
    role: "Solo Developer",
    tagline:
      "An Electron control tower that turns Claude Code, Codex, and OpenCode into scheduled, self-governing content agents — with a PostgreSQL anti-duplication registry, QC gating, and Facebook publishing analytics.",
    oneLiner: "Scheduled, self-governing content agents with a governance registry that blocks anything unapproved from going live.",
    meta: [
      { label: "Role", value: "Sole designer & developer" },
      { label: "Codebase", value: "~11K lines · 46 files · 9 Python scripts" },
      { label: "Data", value: "5-table PostgreSQL schema" },
      { label: "Stack", value: "Electron · Node.js · Python · PostgreSQL · MCP" },
    ],

    problemTitle: "Hands-on content doesn't scale. Naive automation doesn't either.",
    problem:
      "Shipping content at volume means running the same loop by hand: research what's working, write something new, check it isn't a repeat, and only then publish. Manually it doesn't scale. Naively with an LLM it floods the page with near-duplicates and unvetted output. Marketing OS replaces that ad-hoc loop with a supervised, governed pipeline — a desktop control tower where the models do the work and a registry guarantees nothing duplicated or unapproved ever reaches production.",

    myRole:
      "Sole designer and developer. Architecture, the Electron app, the Python pipelines, the PostgreSQL schema, the MCP server, agent orchestration, and the Facebook integration were all built from scratch.",

    // The research → create → deduplicate → QC → publish flow the system enforces.
    pipeline: ["Research", "Create", "Deduplicate", "QC", "Gated publish"],

    highlights: [
      {
        title: "Agent orchestration layer",
        body: "Multiple agent CLIs — Claude Code, Codex, OpenCode — driven through one unified session model: real PTY sessions (node-pty + xterm.js) for human-in-the-loop work, headless stream-JSON runs for one-click autopilot, and a /-skill picker that injects any installed SKILL.md into a session's context.",
      },
      {
        title: "Custom MCP server for human-in-the-loop control",
        body: "A single harness_ask tool implemented in raw JSON-RPC on stdio, with zero third-party dependencies. When an agent needs approval it writes a request file, the server polls at 250ms, and the agent blocks until a human answers — supervised autonomy inside a GUI, with a deny-by-default 10-minute timeout.",
      },
      {
        title: "Tool-use safety & governance",
        body: "A single Python gate re-verifies both duplicate checks and the QC verdict before any publish call. Nothing ungoverned can reach production — one non-bypassable chokepoint, not a convention agents can skip.",
      },
      {
        title: "Retrieval + anti-duplication",
        body: "Four independent signals against repeating content: SHA-256 exact hashing, perceptual hashing (pHash) across keyframes, a rolling 14-day source-reuse window, and optional semantic similarity via embeddings — cosine similarity computed in-process, no pgvector or DB extension required.",
      },
      {
        title: "Closed feedback loop",
        body: "Past posts and their measured performance are embedded and surfaced as \"similar past posts\" context inside the generation loop, so agents optimise toward what actually worked rather than starting from zero.",
      },
    ],

    architecture: {
      pipelineNote:
        "Every run passes through the same governed sequence. The publish step re-checks dedup and QC, so it cannot be reached by anything that skipped them.",
      diagram: `Electron main   →  sessions (node-pty)  ·  runner (headless autopilot)  ·  schedulers  ·  ipc
                →  mcp/harness-mcp.js          (JSON-RPC human-in-the-loop approvals)
                →  registry · performance · fb · embed · fingerprint · scrapers
Renderer        →  xterm terminal · output gallery · Registry / Feedback / Performance dashboards
Python pipeline →  ytclip · memepipeline · caption · fbpost · fingerprint · registry · publish_gate
Data            →  PostgreSQL (content_registry, content_feedback, registry_checks,
                                post_performance, page_performance)
                   SQLite (local) · AES-256-GCM encrypted secrets
Agents          →  Claude Code · Codex · OpenCode
Integrations    →  Facebook Graph API · yt-dlp/YouTube · ffmpeg/Pillow
                   OpenAI / Gemini / Cohere embeddings`,
    },

    hardProblems: [
      {
        title: "Duplicate prevention across modalities",
        body: "Combined cryptographic, perceptual, temporal, and semantic signals instead of trusting any single one — so a re-encoded video or a lightly reworded caption still gets caught.",
      },
      {
        title: "RAG without infrastructure lock-in",
        body: "Embeddings stored as plain REAL[], cosine similarity computed in-process, and the embedding provider (OpenAI / Gemini / Cohere) swappable at runtime — no pgvector, no vendor lock.",
      },
      {
        title: "Supervised autonomy",
        body: "A dependency-free MCP bridge that lets agents pause mid-run for a human decision, then resume — approval mediated without any third-party framework.",
      },
      {
        title: "Secret safety",
        body: "Platform tokens encrypted at rest, injected only into each agent's environment scope, and never logged.",
      },
    ],

    impact: [
      "Cut a manual [~X hr/day] content workflow to [~Y min] oversight per channel.",
      "Blocked [N] duplicate / near-duplicate posts in [timeframe].",
      "Maintained a [Z]% QC pass rate across [N] published assets.",
      "Ran [N] scheduled autonomous generations at a [failure rate] error rate.",
    ],

    stack: [
      "AI Agents",
      "LLM Orchestration",
      "Model Context Protocol (MCP)",
      "JSON-RPC",
      "RAG",
      "Embeddings",
      "Cosine Similarity",
      "Perceptual Hashing",
      "Electron",
      "Node.js",
      "node-pty",
      "xterm.js",
      "Python",
      "PostgreSQL",
      "SQLite",
      "Facebook Graph API",
      "AES-256-GCM",
    ],
  },

  "seo-agent": {
    name: "SEO Agent",
    category: "AI SEO Automation",
    role: "Product Owner",
    tagline:
      "An AI agent that audits websites and fixes SEO issues on its own, on WordPress through the iBOS SEO Agent plugin (v1.8.0) and on Next.js through the @ibos/seo-agent package.",
    oneLiner: "An AI SEO agent that audits 52 checks and fixes issues on its own.",
    meta: [
      { label: "Role", value: "Product owner, fix logic, prompts, testing, rollout" },
      { label: "Audit", value: "52 checks based on the HOTH SEO report" },
      { label: "Platforms", value: "WordPress plugin v1.8.0 · @ibos/seo-agent for Next.js" },
      { label: "Tested", value: "Live SaaS site: B- overall, A in On-Page" },
    ],

    problem:
      "Most websites lose search traffic for small, repeatable reasons. Titles are weak, headings are out of order, pages have thin content, images have no alt text, and schema is missing. Fixing all of it by hand takes hours per page, and most teams never get through it. The work is important but repetitive, which makes it a good fit for an agent.",

    solution:
      "SEO Agent is an AI agent that audits a website and fixes SEO issues on its own. It runs on WordPress through the iBOS SEO Agent plugin (version 1.8.0), and it works on Next.js sites through the @ibos/seo-agent package. The audit runs 52 checks based on the HOTH SEO report. Of these, 33 are measured fully, 7 are measured partly, and 3 run through an AI-visibility (GEO) audit. After the audit, the agent applies fixes. On some setups, every fix is sent as a proposal for a person to approve first.",

    whatItFixes: [
      {
        title: "On-page content and structure",
        items: [
          "Rewrites meta titles and descriptions.",
          "Fixes H2 to H6 headings and heading structure.",
          "Rewrites titles, descriptions, and body copy around a focus keyword.",
          "Expands thin content gradually, up to 30 percent more per run.",
        ],
      },
      {
        title: "Media, schema, and links",
        items: [
          "Writes image alt text for featured images and the media library.",
          "Adds WebPage schema to pages that have none.",
          "Adds internal links to the site's own pages and improves anchor text.",
        ],
      },
      {
        title: "GEO and AI search, off by default",
        items: [
          "Publishes llms.txt.",
          "Adds Organization schema.",
          "Adds answer and FAQ blocks for AI answers.",
        ],
      },
      {
        title: "Off-page agent and performance",
        items: [
          "Handles backlink outreach.",
          "Tracks backlinks through Ahrefs and Google Search Console.",
          "Runs PageSpeed checks through the Google PageSpeed API.",
        ],
      },
    ],

    safety: [
      "Skips page-builder pages for content, heading, and link changes, so layouts do not break.",
      "On some setups, every fix is a proposal that a person approves before it goes live.",
      "Speed and mobile usability are measured, not fixed, by the agent.",
    ],

    results: [
      "Tested on a live SaaS site: B- overall audit grade and A in On-Page.",
      "[ADD METRIC] pages optimized.",
      "[ADD METRIC] hours saved per site.",
      "[ADD METRIC] ranking or traffic changes.",
    ],

    learned: [
      "Shipping an SEO agent means trusting it with live pages, so control matters as much as ability. Small, reviewable fixes were safer than large rewrites, and proposal mode let cautious sites adopt the agent without risk.",
      "Separating what the agent measures from what it can actually fix kept expectations honest. The agent measures site speed and mobile usability through PageSpeed but does not fix them, and stating that clearly is part of the product.",
    ],

    stack: [
      "AI Agents",
      "LLM Prompts",
      "WordPress Plugin",
      "Next.js",
      "Technical SEO",
      "GEO / AI Search",
      "Schema Markup",
      "Internal Linking",
      "Backlink Outreach",
      "Ahrefs",
      "Google Search Console",
      "Google PageSpeed API",
    ],
  },
};

export const skills = [
  {
    group: "AI / LLM",
    items: ["Anthropic Claude", "Claude Code", "OpenAI Codex", "OpenCode", "LLM orchestration", "Autonomous agents", "Agentic systems", "Tool use", "Function calling", "RAG", "Embeddings", "Vector similarity", "Cosine similarity", "Semantic search", "Prompt engineering", "Context injection", "Hallucination reduction"],
  },
  {
    group: "AI Agents & MCP",
    items: ["Model Context Protocol (MCP)", "JSON-RPC", "Custom MCP servers", "Multi-step agents", "Tool-calling", "Supervised autonomy", "Human-in-the-loop", "Scheduling/cron", "Time-series analytics", "Perceptual hashing (pHash)", "SHA-256"],
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
    location: "Dhaka, Bangladesh",
    positions: [
      {
        role: "Associate Developer",
        period: "Aug 2026 — Present",
        points: [
          "Contributed backend/automation and frontend to ChannelSync — a unified omnichannel (voice + message) customer-support product: speech-to-speech, MCP-native, BYOK across OpenAI, Claude, and other LLMs.",
          "Built AI automation on n8n for real business processes across marketing and other teams — automating lead handling, reporting, and publishing end-to-end, replacing hours of manual work with self-running pipelines.",
          "Integrated LLM outputs with live business tools (CRM, Google Sheets, Gmail) via REST/Graph APIs, with error logging, output validation, retry/fallback, and reusable integration components.",
        ],
      },
      {
        role: "AI & Automation Engineer (Intern)",
        period: "May 2026 — Jul 2026",
        points: [
          "Joined as an intern, then promoted to Associate Developer on 1 August 2026 after working on ChannelSync and n8n automation projects across marketing and other teams.",
        ],
      },
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
      "Ex-General Secretary — ZUMS Student Forum (2025)",
      "Ex-Office Secretary — ZUMS Biz-Tech Club",
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
