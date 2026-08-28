"use client";

import { motion } from "framer-motion";
import { profile, stats } from "@/lib/data";
import { getBrandIcon } from "@/lib/icons";
import BrandIcon from "./BrandIcon";
import HeroPortrait from "./HeroPortrait";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient glows (fade out on minimal via CSS) */}
      <div className="glow on-dark-only" style={{ background: "var(--accent)", width: 380, height: 380, top: -80, left: -60 }} />
      <div className="glow on-dark-only" style={{ background: "var(--accent2)", width: 320, height: 320, top: 40, right: -40 }} />

      <div className="hero-shell relative z-10 mx-auto max-w-content px-5 pb-20 pt-16 sm:pt-24">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Copy left, portrait right from lg up. Below that the portrait drops
              out of flow and sits behind the copy as a faint watermark — see
              .hero-portrait-slot in globals.css. */}
          <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
            <div className="relative z-10">
              <motion.p
                variants={item}
                className="term-prompt mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted"
              >
                {profile.availability}
              </motion.p>

              <motion.h1
                variants={item}
                className="font-display text-[clamp(2.25rem,6.2vw,4.5rem)] font-700 leading-[1.05] tracking-tight"
              >
                {profile.name}
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-5 max-w-2xl font-display text-[clamp(1.125rem,2.1vw,1.6rem)] leading-snug text-text"
              >
                {profile.tagline}
              </motion.p>

              <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="rounded-full px-5 py-2.5 text-sm font-600 transition-transform hover:scale-[1.03]"
                  style={{ background: "var(--accent)", color: "var(--bg)" }}
                >
                  See the work
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-600 text-muted transition-colors hover:text-text"
                >
                  <BrandIcon icon={getBrandIcon("GitHub")} size={15} />
                  GitHub ↗
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-600 text-muted transition-colors hover:text-text"
                >
                  <BrandIcon icon={getBrandIcon("LinkedIn")} size={15} />
                  LinkedIn ↗
                </a>
              </motion.div>
            </div>

            {/* Decorative: the portrait carries no information the copy doesn't. */}
            <div className="hero-portrait-slot" aria-hidden="true">
              <HeroPortrait />
            </div>
          </div>

          {/* Stat strip */}
          <motion.div
            variants={item}
            className="relative z-10 mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line sm:grid-cols-4"
            style={{ background: "var(--line)" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-surface p-4 sm:p-5">
                {s.brands ? (
                  <div className="flex h-7 items-center gap-2">
                    {s.brands.map((b) => {
                      const icon = getBrandIcon(b);
                      return (
                        <span
                          key={b}
                          title={icon?.title || b}
                          className="inline-flex items-center"
                        >
                          <BrandIcon icon={icon} size={20} />
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className="font-display text-2xl font-700 leading-none"
                    style={{ color: "var(--accent)" }}
                  >
                    {s.value}
                  </div>
                )}
                <div className="mt-2 text-xs leading-snug text-muted">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
