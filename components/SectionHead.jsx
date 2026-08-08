"use client";

import { motion } from "framer-motion";

export default function SectionHead({ eyebrow, title, id }) {
  return (
    <div id={id} className="mb-8 scroll-mt-24">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
        className="term-prompt mb-2 font-mono text-xs uppercase tracking-[0.2em]"
        style={{ color: "var(--accent)" }}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-700 tracking-tight"
      >
        {title}
      </motion.h2>
    </div>
  );
}
