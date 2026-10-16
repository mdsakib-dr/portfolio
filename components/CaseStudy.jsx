"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { getBrandIcon } from "@/lib/icons";
import BrandIcon from "./BrandIcon";
import CursorTrail from "./CursorTrail";
import Nav from "./Nav";
import SectionHead from "./SectionHead";

const rise = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45 },
};

/** One numbered engineering highlight. */
function Highlight({ item, index }) {
  return (
    <motion.div
      {...rise}
      transition={{ duration: 0.45, delay: (index % 3) * 0.05 }}
      className="rounded-2xl border border-line bg-surface p-5"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-base font-700">{item.title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
    </motion.div>
  );
}

export default function CaseStudy({ study }) {
  return (
    <main>
      <Nav />

      <section className="relative overflow-hidden">
        <div className="glow on-dark-only" style={{ background: "var(--accent)", width: 360, height: 360, top: -100, left: -80 }} />
        <div className="glow on-dark-only" style={{ background: "var(--accent2)", width: 300, height: 300, top: 20, right: -60 }} />

        <div className="relative z-10 mx-auto max-w-content px-5 pb-16 pt-12 sm:pt-16">
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-text"
          >
            ← All work
          </motion.a>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="term-prompt mt-8 font-mono text-xs uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            {study.category} · {study.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 font-display text-[clamp(2rem,5.5vw,3.75rem)] font-700 leading-[1.05] tracking-tight"
          >
            {study.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 max-w-3xl font-display text-[clamp(1.05rem,1.8vw,1.4rem)] leading-snug text-text"
          >
            {study.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full px-5 py-2.5 text-sm font-600 transition-transform hover:scale-[1.03]"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              Talk about this project
            </a>
            <a
              href="/#work"
              className="rounded-full border border-line px-5 py-2.5 text-sm font-600 text-muted transition-colors hover:text-text"
            >
              More work
            </a>
          </motion.div>

          {/* Fact strip */}
          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line lg:grid-cols-4"
            style={{ background: "var(--line)" }}
          >
            {study.meta.map((m) => (
              <div key={m.label} className="bg-surface p-4 sm:p-5">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{m.label}</dt>
                <dd className="mt-2 text-sm font-500 leading-snug">{m.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* Problem + role */}
      <section className="mx-auto max-w-content px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHead eyebrow="The problem" title="Hands-on content doesn't scale. Naive automation doesn't either." />
            <motion.p {...rise} className="text-[15px] leading-relaxed text-muted">
              {study.problem}
            </motion.p>
          </div>
          <motion.div {...rise} className="rounded-2xl border border-line bg-surface p-5">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted term-prompt">My role</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{study.role}</p>
          </motion.div>
        </div>
      </section>

      {/* What it does */}
      <section className="mx-auto max-w-content px-5 py-16">
        <SectionHead eyebrow="What it does" title="An orchestration, safety, retrieval and data-integrity story." />
        <div className="grid gap-5 md:grid-cols-2">
          {study.highlights.map((item, i) => (
            <Highlight key={item.title} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="mx-auto max-w-content px-5 py-16">
        <SectionHead eyebrow="Architecture" title="One governed pipeline, one non-bypassable gate." />

        <motion.ol {...rise} className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-3">
          {study.pipeline.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted">
                {step}
              </span>
              {i < study.pipeline.length - 1 && (
                <span aria-hidden="true" style={{ color: "var(--accent)" }}>
                  →
                </span>
              )}
            </li>
          ))}
        </motion.ol>

        <motion.p {...rise} className="mb-5 max-w-3xl text-sm leading-relaxed text-muted">
          {study.architecture.pipelineNote}
        </motion.p>

        <motion.div
          {...rise}
          className="overflow-hidden rounded-2xl border border-line bg-surface"
        >
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent)" }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent2)" }} />
            <span className="ml-2 font-mono text-[11px] text-muted">marketing-os / architecture</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-muted sm:p-6">
            {study.architecture.diagram}
          </pre>
        </motion.div>
      </section>

      {/* Hard problems */}
      <section className="mx-auto max-w-content px-5 py-16">
        <SectionHead eyebrow="Hard problems solved" title="What made it interesting." />
        <div className="grid gap-5 md:grid-cols-2">
          {study.hardProblems.map((item, i) => (
            <motion.div
              key={item.title}
              {...rise}
              transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <h3 className="font-display text-base font-700" style={{ color: "var(--accent)" }}>
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="mx-auto max-w-content px-5 py-16">
        <SectionHead eyebrow="Impact" title="Measured where it's measured." />
        <ul className="space-y-3">
          {study.impact.map((line, i) => (
            <motion.li
              key={line}
              {...rise}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex gap-3 rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-muted"
            >
              <span style={{ color: "var(--accent)" }}>▹</span>
              <span>{line}</span>
            </motion.li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-xs text-muted">Placeholders marked [X] — filled in from live telemetry.</p>
      </section>

      {/* Stack */}
      <section className="mx-auto max-w-content px-5 py-16">
        <SectionHead eyebrow="Stack" title="Built with." />
        <ul className="flex flex-wrap gap-1.5">
          {study.stack.map((s) => {
            const icon = getBrandIcon(s);
            return (
              <li
                key={s}
                className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 font-mono text-[11px] leading-none text-muted"
              >
                {icon ? <BrandIcon icon={icon} size={13} /> : null}
                <span>{s}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="glow on-dark-only" style={{ background: "var(--accent)", width: 340, height: 340, bottom: -120, left: "40%" }} />
        <div className="relative z-10 mx-auto max-w-content px-5 py-24">
          <SectionHead eyebrow="Next" title="Want the full walkthrough?" />
          <motion.p {...rise} className="max-w-xl text-[15px] leading-relaxed text-muted">
            I can walk through the orchestration layer, the MCP approval bridge, or the
            anti-duplication design in detail. The fastest way to reach me is email.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full px-5 py-2.5 text-sm font-600 transition-transform hover:scale-[1.03]"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-600 text-text transition-colors hover:border-text">
              <BrandIcon icon={getBrandIcon("LinkedIn")} size={15} />
              LinkedIn ↗
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-600 text-muted transition-colors hover:text-text">
              <BrandIcon icon={getBrandIcon("GitHub")} size={15} />
              GitHub ↗
            </a>
          </div>

          <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted">
            <a href="/#work" className="font-mono transition-colors hover:text-text">
              ← Back to all work
            </a>
            <span className="font-mono">© {new Date().getFullYear()} {profile.name}</span>
          </footer>
        </div>
      </section>

      <CursorTrail />
    </main>
  );
}
