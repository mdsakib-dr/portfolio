"use client";

import { useEffect } from "react";

/**
 * Attaches the in-view observer after hydration, when the client tree is the
 * one that actually lives in the document. The hidden styles and the fallback
 * for a failed hydration are handled by the inline script in app/layout.js.
 */
export default function ScrollReveal() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("reveal-ready")) return;
    if (!("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("reveal-ready");
      return;
    }

    const nodes = Array.from(
      document.querySelectorAll("[data-reveal]:not(.is-in)")
    );
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    nodes.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
