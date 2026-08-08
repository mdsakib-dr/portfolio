"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import { getBrandIcon } from "@/lib/icons";
import BrandIcon from "./BrandIcon";
import SectionHead from "./SectionHead";

function Card({ p, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.06 }}
      className="group relative flex flex-col rounded-2xl border border-line bg-surface p-6 transition-colors"
    >
      {p.live && (
        <span
          className="absolute right-5 top-5 flex items-center gap-1.5 text-xs font-medium"
          style={{ color: "var(--accent2)" }}
        >
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
              style={{ background: "var(--accent2)" }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--accent2)" }} />
          </span>
          Live
        </span>
      )}

      <p className="font-mono text-xs uppercase tracking-wider text-muted">{p.category}</p>
      <h3 className="mt-2 font-display text-xl font-700 tracking-tight">{p.name}</h3>
      <p className="mt-1 text-sm font-500" style={{ color: "var(--accent)" }}>
        {p.tagline}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.map((s) => {
          // Same registry the Skills pills use, so a tool looks identical
          // wherever it appears. null → text-only pill.
          const icon = getBrandIcon(s);
          return (
            <li
              key={s}
              className="inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 font-mono text-[11px] leading-none text-muted"
            >
              {icon ? <BrandIcon icon={icon} size={13} /> : null}
              <span>{s}</span>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 flex gap-4 border-t border-line pt-4 text-sm font-600">
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" className="py-1 transition-colors hover:opacity-70" style={{ color: "var(--accent)" }}>
            Live ↗
          </a>
        )}
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="py-1 text-muted transition-colors hover:text-text">
            Code ↗
          </a>
        )}
        {!p.live && !p.repo && (
          <span className="text-muted">Internal — details on request</span>
        )}
      </div>
    </motion.article>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section className="mx-auto max-w-content px-5 py-20">
      <SectionHead id="work" eyebrow="Selected work" title="Live systems, shipped." />

      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => (
          <Card key={p.id} p={p} index={i} />
        ))}
      </div>

      <p className="mb-6 mt-14 font-mono text-xs uppercase tracking-[0.2em] text-muted term-prompt">
        More automation & data work
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {more.map((p, i) => (
          <Card key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
