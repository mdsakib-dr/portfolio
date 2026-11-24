// Three switchable themes. Each sets CSS variables consumed by Tailwind
// (see tailwind.config.js) and globals.css. Default = bold.

// Switcher glyphs. Stroked paths on a 24×24 grid, drawn with currentColor so
// each button's active/inactive colour carries straight through to the icon.
// Kept here beside label and hint so a theme stays described in one place.

export const THEMES = {
  bold: {
    label: "Bold",
    hint: "Animated · dark · glow",
    // lightning bolt
    icon: ["M13.5 2.5 5 14h6l-1 7.5L19 10h-6z"],
    vars: {
      "--bg": "#08080d",
      "--surface": "#111118",
      "--surface-2": "#16161f",
      "--text": "#f5f4f8",
      "--muted": "#a3a2b8",
      "--accent": "#9a80ff",
      "--accent-2": "#5eead4",
      "--line": "rgba(255,255,255,0.09)",
      "--line-strong": "rgba(255,255,255,0.16)",
      "--accent-soft": "rgba(154,128,255,0.13)",
      "--font-display": "'Space Grotesk', system-ui, sans-serif",
      "--font-body": "'Inter', system-ui, sans-serif",
      "--font-mono": "'JetBrains Mono', ui-monospace, monospace",
    },
  },
  minimal: {
    label: "Minimal",
    hint: "Clean · light · typographic",
    // sun
    icon: [
      "M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
      "M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.4 5.4l1.4 1.4M17.2 17.2l1.4 1.4M18.6 5.4l-1.4 1.4M6.8 17.2l-1.4 1.4",
    ],
    vars: {
      "--bg": "#f7f6f2",
      "--surface": "#ffffff",
      "--surface-2": "#f0eee8",
      "--text": "#16151a",
      "--muted": "#62606b",
      "--accent": "#1b4fd8",
      "--accent-2": "#0f766e",
      "--line": "rgba(22,21,26,0.12)",
      "--line-strong": "rgba(22,21,26,0.2)",
      "--accent-soft": "rgba(27,79,216,0.08)",
      "--font-display": "'Space Grotesk', system-ui, sans-serif",
      "--font-body": "'Inter', system-ui, sans-serif",
      "--font-mono": "'JetBrains Mono', ui-monospace, monospace",
    },
  },
  terminal: {
    label: "Terminal",
    hint: "Mono · dark · dev",
    // terminal window with a prompt
    icon: ["M3.5 5.5h17v13h-17z", "M7.5 10.5l2 2-2 2", "M13 14.5h4"],
    vars: {
      "--bg": "#07100b",
      "--surface": "#0c1710",
      "--surface-2": "#102018",
      "--text": "#d6ffe4",
      "--muted": "#86b39a",
      "--accent": "#46f596",
      "--accent-2": "#46f596",
      "--line": "rgba(70,245,150,0.18)",
      "--line-strong": "rgba(70,245,150,0.32)",
      "--accent-soft": "rgba(70,245,150,0.1)",
      "--font-display": "'JetBrains Mono', ui-monospace, monospace",
      "--font-body": "'JetBrains Mono', ui-monospace, monospace",
      "--font-mono": "'JetBrains Mono', ui-monospace, monospace",
    },
  },
};

export const THEME_ORDER = ["bold", "minimal", "terminal"];
export const DEFAULT_THEME = "bold";

export function applyTheme(key) {
  const theme = THEMES[key] || THEMES[DEFAULT_THEME];
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute("data-theme", key);
}
