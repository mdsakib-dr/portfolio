"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { getBrandIcon } from "@/lib/icons";
import BrandIcon from "./BrandIcon";
import CursorTrail from "./CursorTrail";
import Nav from "./Nav";
import SectionHead from "./SectionHead";

// No initial hidden state: the content is readable before (and without) the
// in-view animation, so a slow or failed hydration never blanks the page.
const rise = {
  initial: false,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

/** One numbered engineering highlight. */
function Highlight({ item, index }) {
  return (
    <motion.div
      {...rise}
      transition={{ duration: 0.45, delay: (index % 3) * 0.05 }}
      className="card p-5"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display text-base font-bold">{item.title}</h3>
      </div>
      <p className="mt-3 body-copy--tight">{item.body}</p>
    </motion.div>
  );
}

export default function CaseStudy({ study }) {
  return (
    <main id="main">
      <Nav />

      <section className="relative overflow-hidden">
        <div className="glow on-dark-only" style={{ background: "var(--accent)", width: 360, height: 360, top: -100, left: -80 }} />
        <div className="glow on-dark-only" style={{ background: "var(--accent-2)", width: 300, height: 300, top: 20, right: -60 }} />

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
            className="term-prompt eyebrow mt-8"
            style={{ color: "var(--accent)" }}
          >
            {study.category} · {study.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 font-display text-[clamp(2.6rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.045em]"
          >
            {study.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hero-lede mt-5 max-w-3xl text-text"
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
              className="btn btn-primary"
            >
              Talk about this project
            </a>
            <a
              href="/#work"
              className="btn btn-ghost"
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
                <dd className="mt-2 text-sm font-medium leading-snug">{m.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* Problem, with an optional role card beside it */}
      <section className="mx-auto max-w-content px-5 py-16">
        {study.myRole ? (
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <SectionHead eyebrow="The problem" title={study.problemTitle || "The problem."} />
              <motion.p {...rise} className="body-copy">
                {study.problem}
              </motion.p>
            </div>
            <motion.div {...rise} className="card p-5">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted term-prompt">My role</h3>
              <p className="mt-3 body-copy--tight">{study.myRole}</p>
            </motion.div>
          </div>
        ) : (
          <div>
            <SectionHead eyebrow="Problem" title={study.problemTitle || "The problem."} />
            <motion.p {...rise} className="max-w-3xl body-copy">
              {study.problem}
            </motion.p>
          </div>
        )}
      </section>

      {/* Solution */}
      {study.solution && (
        <section className="mx-auto max-w-content px-5 py-16">
          <SectionHead eyebrow="Solution" title="How it works." />
          <motion.p {...rise} className="max-w-3xl body-copy">
            {study.solution}
          </motion.p>
        </section>
      )}

      {/* What it does */}
      {study.highlights && (
        <section className="mx-auto max-w-content px-5 py-16">
          <SectionHead eyebrow="What it does" title="An orchestration, safety, retrieval and data-integrity story." />
          <div className="grid gap-5 md:grid-cols-2">
            {study.highlights.map((item, i) => (
              <Highlight key={item.title} item={item} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Architecture */}
      {study.architecture && (
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

          <motion.p {...rise} className="mb-5 max-w-3xl body-copy--tight">
            {study.architecture.pipelineNote}
          </motion.p>

          <motion.div
            {...rise}
            className="overflow-hidden  card"
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent)" }} />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent-2)" }} />
              <span className="ml-2 font-mono text-[11px] text-muted">{study.name} / architecture</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-muted sm:p-6">
              {study.architecture.diagram}
            </pre>
          </motion.div>
        </section>
      )}

      {/* Hard problems */}
      {study.hardProblems && (
        <section className="mx-auto max-w-content px-5 py-16">
          <SectionHead eyebrow="Hard problems solved" title="What made it interesting." />
          <div className="grid gap-5 md:grid-cols-2">
            {study.hardProblems.map((item, i) => (
              <motion.div
                key={item.title}
                {...rise}
                transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
                className="card p-5"
              >
                <h3 className="font-display text-base font-bold" style={{ color: "var(--accent)" }}>
                  {item.title}
                </h3>
                <p className="mt-2 body-copy--tight">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* What the agent fixes */}
      {study.whatItFixes && (
        <section className="mx-auto max-w-content px-5 py-16">
          <SectionHead eyebrow="What the agent fixes" title="The fixes, grouped." />
          <div className="grid gap-5 md:grid-cols-2">
            {study.whatItFixes.map((group, i) => (
              <motion.div
                key={group.title}
                {...rise}
                transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
                className="card p-5"
              >
                <h3 className="font-display text-base font-bold" style={{ color: "var(--accent)" }}>
                  {group.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {group.items.map((it) => (
                    <li key={it} className="flex gap-2 body-copy--tight">
                      <span style={{ color: "var(--accent)" }}>▹</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Safety and control */}
      {study.safety && (
        <section className="mx-auto max-w-content px-5 py-16">
          <SectionHead eyebrow="Safety and control" title="How it stays safe on live sites." />
          <ul className="grid gap-3 md:grid-cols-3">
            {study.safety.map((line, i) => (
              <motion.li
                key={line}
                {...rise}
                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                className="card p-4 body-copy--tight"
              >
                {line}
              </motion.li>
            ))}
          </ul>
        </section>
      )}

      {/* Results / impact */}
      {(study.results || study.impact) && (
        <section className="mx-auto max-w-content px-5 py-16">
          <SectionHead eyebrow={study.results ? "Results" : "Impact"} title="Measured where it's measured." />
          <ul className="space-y-3">
            {(study.results || study.impact).map((line, i) => (
              <motion.li
                key={line}
                {...rise}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-3 card p-4 body-copy--tight"
              >
                <span style={{ color: "var(--accent)" }}>▹</span>
                <span>{line}</span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-xs text-muted">Bracketed placeholders are filled in from live telemetry.</p>
        </section>
      )}

      {/* What I learned */}
      {study.learned && (
        <section className="mx-auto max-w-content px-5 py-16">
          <SectionHead eyebrow="What I learned" title="Notes from shipping it." />
          <div className="max-w-3xl space-y-4">
            {study.learned.map((para, i) => (
              <motion.p
                key={i}
                {...rise}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="body-copy"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </section>
      )}

      {/* Stack */}
      <section className="mx-auto max-w-content px-5 py-16">
        <SectionHead eyebrow="Stack" title="Built with." />
        <ul className="flex flex-wrap gap-1.5">
          {study.stack.map((s) => {
            const icon = getBrandIcon(s);
            return (
              <li key={s} className="chip">
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
          <motion.p {...rise} className="max-w-xl body-copy">
            I can walk through the orchestration layer, the MCP approval bridge, or the
            anti-duplication design in detail. The fastest way to reach me is email.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <BrandIcon icon={getBrandIcon("LinkedIn")} size={15} />
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <BrandIcon icon={getBrandIcon("GitHub")} size={15} />
              GitHub <span aria-hidden="true">↗</span>
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
