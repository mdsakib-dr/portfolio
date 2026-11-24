"use client";

import { useEffect, useState } from "react";
import { THEMES, THEME_ORDER, DEFAULT_THEME, applyTheme } from "@/lib/themes";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    const saved =
      (typeof window !== "undefined" && localStorage.getItem("theme")) ||
      DEFAULT_THEME;
    const resolved = THEMES[saved] ? saved : DEFAULT_THEME;
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  const choose = (key) => {
    const root = document.documentElement;
    root.classList.add("theme-switching");
    setTheme(key);
    applyTheme(key);
    try {
      localStorage.setItem("theme", key);
    } catch (e) {}
    requestAnimationFrame(() => {
      requestAnimationFrame(() => root.classList.remove("theme-switching"));
    });
  };

  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex items-center gap-0.5 rounded-full border border-line p-1 backdrop-blur"
      style={{
        background: "color-mix(in srgb, var(--surface) 70%, transparent)",
      }}
    >
      {THEME_ORDER.map((key) => {
        const active = theme === key;
        const { label, hint, icon } = THEMES[key];
        return (
          <button
            key={key}
            type="button"
            onClick={() => choose(key)}
            aria-pressed={active}
            aria-label={`${label} theme`}
            title={`${label} — ${hint}`}
            className="relative grid h-9 w-9 place-items-center rounded-full transition-colors duration-200"
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
