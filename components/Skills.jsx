"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import { getBrandIcon } from "@/lib/icons";
import BrandIcon from "./BrandIcon";
import SectionHead from "./SectionHead";

export default function Skills() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-content px-5 py-20">
        <SectionHead id="skills" eyebrow="Stack" title="What I build with." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <motion.div
              key={s.group}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <h3 className="font-display text-sm font-700" style={{ color: "var(--accent)" }}>
                {s.group}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((it) => {
                  // null for concepts and in-house tooling (MCP, RAG, pgvector,
                  // FastMCP…) — those render as text-only pills by design.
                  const icon = getBrandIcon(it);
                  return (
                    <li
                      key={it}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line px-2 py-1 font-mono text-[11px] leading-none text-muted"
                    >
                      {icon ? <BrandIcon icon={icon} /> : null}
                      <span>{it}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
