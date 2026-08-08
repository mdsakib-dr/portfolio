import "./globals.css";
import { profile } from "@/lib/data";

export const metadata = {
  title: `${profile.name} — AI Automation Engineer`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — AI Automation Engineer`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Set theme before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var t = localStorage.getItem('theme') || 'bold';
                  var themes = ${JSON.stringify({
                    bold: {
                      "--bg": "#0a0a12", "--surface": "#13131f", "--text": "#f4f4fb",
                      "--muted": "#9a9ab5", "--accent": "#7c5cff", "--accent2": "#00e0c6",
                      "--line": "rgba(255,255,255,0.09)",
                      "--font-display": "'Space Grotesk', system-ui, sans-serif",
                      "--font-body": "'Inter', system-ui, sans-serif",
                      "--font-mono": "'JetBrains Mono', ui-monospace, monospace"
                    },
                    minimal: {
                      "--bg": "#faf9f7", "--surface": "#ffffff", "--text": "#141414",
                      "--muted": "#6b6b6b", "--accent": "#1b4fd8", "--accent2": "#1b4fd8",
                      "--line": "rgba(0,0,0,0.10)",
                      "--font-display": "'Space Grotesk', system-ui, sans-serif",
                      "--font-body": "'Inter', system-ui, sans-serif",
                      "--font-mono": "'JetBrains Mono', ui-monospace, monospace"
                    },
                    terminal: {
                      "--bg": "#0b0f0c", "--surface": "#0f1511", "--text": "#c8f7d4",
                      "--muted": "#6f9a7d", "--accent": "#39ff9e", "--accent2": "#39ff9e",
                      "--line": "rgba(57,255,158,0.18)",
                      "--font-display": "'JetBrains Mono', ui-monospace, monospace",
                      "--font-body": "'JetBrains Mono', ui-monospace, monospace",
                      "--font-mono": "'JetBrains Mono', ui-monospace, monospace"
                    }
                  })};
                  var vars = themes[t] || themes.bold;
                  var root = document.documentElement;
                  Object.keys(vars).forEach(function(k){ root.style.setProperty(k, vars[k]); });
                  root.setAttribute('data-theme', t);
                } catch(e){}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
