"use client";

import { useEffect, useRef, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

// Root-relative hashes so the same nav works on the homepage and on
// case-study subpages (/work/<id>).
const links = [
  { href: "/#work", label: "Work" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#skills", label: "Skills" },
  { href: "/#credentials", label: "Credentials" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  // Below md the link row collapses, so without this panel the whole site is
  // unreachable on a phone except by scrolling.
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);
  const frame = useRef(0);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (!panelRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Rotating a phone or dragging a window past the breakpoint would otherwise
  // leave the panel stranded open next to the restored desktop row.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // One rAF-throttled scroll listener drives both the hairline progress bar
  // and the subtle border the header gains once the page moves.
  useEffect(() => {
    const update = () => {
      frame.current = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 8);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className="nav-shell relative sticky top-0 z-50 backdrop-blur-xl"
      data-scrolled={scrolled}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between gap-3 px-5 py-2.5">
        <a href="/#top" className="-m-2 flex items-center gap-2.5 p-2">
          <span
            className="grid h-8 w-8 place-items-center rounded-lg font-display text-[11px] font-bold tracking-tight"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
            aria-hidden="true"
          >
            MS
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            sakib<span style={{ color: "var(--accent)" }}>.</span>
          </span>
        </a>

        <div className="hidden items-center gap-5 md:flex lg:gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSwitcher />

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-text md:hidden"
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
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Rendered only while open, so it is absent from the a11y tree when closed
          and no display rule has to fight Tailwind's md:hidden. */}
      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-line md:hidden"
          style={{ background: "color-mix(in srgb, var(--bg) 96%, transparent)" }}
        >
          <ul className="mx-auto max-w-content px-5 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-line py-3.5 text-sm text-muted transition-colors hover:text-text"
                >
                  {l.label}
                  <span aria-hidden="true" style={{ color: "var(--accent)" }}>
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <span
        className="nav-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </header>
  );
}
