"use client";

import { useEffect, useRef, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { profile } from "@/lib/data";

const links = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  // Below md the link row collapses, so without this panel the whole site is
  // unreachable on a phone except by scrolling.
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

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

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-content items-center justify-between gap-3 px-5 py-3">
        {/* Negative margin keeps the hit area comfortable without moving the mark */}
        <a href="#top" className="-m-2 p-2 font-display text-sm font-700 tracking-tight">
          <span style={{ color: "var(--accent)" }}>MS</span>
          <span className="text-muted">/</span>
          <span>sakib</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-1 text-sm text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={profile.resumeFile}
            download={profile.resumeDownloadName}
            className="hidden rounded-full border border-line px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-text sm:inline-block"
          >
            Résumé ↓
          </a>
          <ThemeSwitcher />

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors hover:text-text md:hidden"
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
          className="border-t border-line bg-bg/95 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto max-w-content px-5 py-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 text-sm text-muted transition-colors hover:text-text"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.resumeFile}
                download={profile.resumeDownloadName}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-600"
                style={{ color: "var(--accent)" }}
              >
                Download résumé ↓
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
