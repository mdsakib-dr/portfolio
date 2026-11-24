/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  future: {
    // Tailwind 3 only applies hover: variants on pointer devices with this on.
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        // Driven by CSS variables so themes can swap them live
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        text: "var(--text)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        accent2: "var(--accent-2)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      maxWidth: {
        // Driven by --content-max so one media query in globals.css scales
        // every section at once (nav, hero, work, skills, about, contact).
        content: "var(--content-max)",
      },
      letterSpacing: {
        tightest: "-0.05em",
      },
    },
  },
  plugins: [],
};
