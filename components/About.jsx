"use client";

import { motion } from "framer-motion";
import { profile, experience, education, activities } from "@/lib/data";
import SectionHead from "./SectionHead";

export default function About() {
  return (
    <section className="mx-auto max-w-content px-5 py-20">
      <SectionHead id="about" eyebrow="About" title="Who's behind the work." />

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* Bio */}
        <div className="space-y-4">
          {profile.about.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="text-[15px] leading-relaxed text-muted"
            >
              {para}
            </motion.p>
          ))}

          {/* Experience */}
          <div className="pt-4">
            {experience.map((e) => (
              <div key={e.company} className="rounded-2xl border border-line bg-surface p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-700">{e.company}</h3>
                  <span className="font-mono text-xs text-muted">{e.period}</span>
                </div>
                <p className="mt-0.5 text-sm" style={{ color: "var(--accent)" }}>
                  {e.role}
                </p>
                <ul className="mt-3 space-y-2">
                  {e.points.map((pt, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span style={{ color: "var(--accent)" }}>▹</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education / achievements */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <h3 className="font-display text-base font-700">{education.school}</h3>
            <p className="mt-0.5 text-sm text-muted">{education.degree}</p>
            <p className="mt-1 font-mono text-xs text-muted">{education.period}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {education.notes.map((n) => (
                <li key={n} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px]" style={{ color: "var(--accent)" }}>
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted term-prompt">
              Activities
            </h3>
            <div className="mt-4 space-y-5">
              {activities.map((group) => (
                <div key={group.group}>
                  <h4 className="text-sm font-600" style={{ color: "var(--accent)" }}>
                    {group.group}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {group.items.map((a) => (
                      <li key={a} className="flex gap-2 text-sm leading-relaxed text-muted">
                        <span style={{ color: "var(--accent)" }}>▹</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
