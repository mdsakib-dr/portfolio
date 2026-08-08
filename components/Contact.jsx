"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { getBrandIcon } from "@/lib/icons";
import BrandIcon from "./BrandIcon";
import SectionHead from "./SectionHead";

/** A brand name in running text, with its logo. Falls back to bare text. */
function Tech({ name }) {
  const icon = getBrandIcon(name);
  return (
    <span className="inline-flex items-center gap-1">
      {icon ? <BrandIcon icon={icon} size={12} /> : null}
      {name}
    </span>
  );
}

export default function Contact() {
  return (
    <section className="relative overflow-hidden">
      <div className="glow on-dark-only" style={{ background: "var(--accent)", width: 340, height: 340, bottom: -120, left: "40%" }} />
      <div className="relative z-10 mx-auto max-w-content px-5 py-24">
        <SectionHead id="contact" eyebrow="Contact" title="Let's build something reliable." />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-xl text-[15px] leading-relaxed text-muted"
        >
          Open to remote AI and automation roles, and to freelance builds — RAG systems,
          AI agents, MCP servers, and workflow automation. The fastest way to reach me is email.
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
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="rounded-full border border-line px-5 py-2.5 text-sm font-600 text-muted transition-colors hover:text-text">
            {profile.phone}
          </a>
        </div>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted">
          <span className="font-mono">© {new Date().getFullYear()} {profile.name}</span>
          <span className="flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono">
            Built with <Tech name="Next.js" /> · <Tech name="Framer Motion" /> · deployed on{" "}
            <Tech name="Vercel" />
          </span>
        </footer>
      </div>
    </section>
  );
}
