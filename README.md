# Md Sakib — Portfolio

A Next.js portfolio with **three switchable themes** (Bold / Minimal / Terminal), defaulting to Bold. Built for landing AI & automation roles — live project demos are the hero.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: **Next.js** (auto-detected). Click Deploy. Done.

Or from the CLI:

```bash
npm i -g vercel
vercel
```

## Edit your content

**Everything lives in one file: `lib/data.js`.**
Change your tagline, about text, projects, skills, experience, and education there — no need to touch components.

## Swap in your résumé

Replace the placeholder file at `public/Md_Sakib_Resume.pdf` with your real PDF (keep the same filename, or update `profile.resumeFile` in `lib/data.js`).

## Themes

Defined in `lib/themes.js` as CSS-variable sets. The default is `bold`. To change the default, edit `DEFAULT_THEME` there **and** the fallback in `app/layout.js` (the inline script that prevents a flash on load).

## Structure

```
app/
  layout.js      # fonts, metadata, no-flash theme script
  page.js        # composes the sections
  globals.css    # base styles + theme-aware effects
components/       # Nav, Hero, Work, Skills, About, Contact, ThemeSwitcher
lib/
  data.js        # ← YOUR CONTENT
  themes.js      # theme tokens
public/           # résumé PDF, any images
```

## Tech

Next.js 14 (App Router) · React 18 · Tailwind CSS · Framer Motion. Google Fonts: Space Grotesk, Inter, JetBrains Mono.
