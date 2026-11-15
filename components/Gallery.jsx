"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { workflows } from "@/lib/data";
import SectionHead from "./SectionHead";

/** Full-size view of one workflow screenshot. */
function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-full w-full max-w-6xl overflow-y-auto rounded-2xl border border-line bg-surface"
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <h3 className="font-display text-lg font-700">{item.title}</h3>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted">{item.description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            aria-label="Close workflow preview"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:text-text"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="bg-white p-2 sm:p-4">
          <img
            src={item.image}
            alt={`${item.title} n8n workflow`}
            className="h-auto w-full rounded-lg"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Card({ item, index, onOpen }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.06 }}
      className="group flex flex-col rounded-2xl border border-line bg-surface p-3 transition-colors"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${item.title} workflow`}
        className="overflow-hidden rounded-xl border border-line bg-white"
      >
        <img
          src={item.image}
          alt={`${item.title} n8n workflow`}
          loading="lazy"
          className="aspect-[16/9] w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </button>

      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-700 tracking-tight">{item.title}</h3>
          <button
            type="button"
            onClick={onOpen}
            className="shrink-0 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors hover:opacity-70"
            style={{ color: "var(--accent)" }}
          >
            View ↗
          </button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.stack.map((s) => (
            <li
              key={s}
              className="rounded-md border border-line px-2 py-1 font-mono text-[11px] leading-none text-muted"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section className="mx-auto max-w-content px-5 py-20">
      <SectionHead id="gallery" eyebrow="Automation gallery" title="n8n workflows, end to end." />

      <div className="grid gap-5 md:grid-cols-2">
        {workflows.map((item, i) => (
          <Card key={item.id} item={item} index={i} onOpen={() => setActive(item)} />
        ))}
      </div>

      <AnimatePresence>
        {active && <Lightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
