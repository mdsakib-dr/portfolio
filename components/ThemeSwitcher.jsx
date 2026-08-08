"use client";

import { useEffect, useState } from "react";
import { THEMES, THEME_ORDER, DEFAULT_THEME, applyTheme } from "@/lib/themes";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    const saved =
      (typeof window !== "undefined" && localStorage.getItem("theme")) ||
      DEFAULT_THEME;
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const choose = (key) => {
    setTheme(key);
    applyTheme(key);
    try {
      localStorage.setItem("theme", key);
    } catch (e) {}
  };

  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1 backdrop-blur"
    >
      {THEME_ORDER.map((key) => {
        const active = theme === key;
        const { label, hint, icon } = THEMES[key];
        return (
          <button
            key={key}
            onClick={() => choose(key)}
            aria-pressed={active}
            // The glyph is decorative, so the name has to live on the button
            // itself — otherwise the control is unlabelled once the text is gone.
            aria-label={label}
            title={`${label} — ${hint}`}
            className="relative grid h-8 w-8 place-items-center rounded-full transition-colors"
            style={{
              color: active ? "var(--bg)" : "var(--muted)",
              background: active ? "var(--accent)" : "transparent",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="15"
              height="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              {icon.map((d) => (
                <path key={d} d={d} />
              ))}
            </svg>
          </button>
        );
      })}
    </div>
  );
}
