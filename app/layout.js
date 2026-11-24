import "./globals.css";
import { profile } from "@/lib/data";
import MotionProvider from "@/components/MotionProvider";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: `${profile.name} — AI Automation Engineer`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — AI Automation Engineer`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport = {
  themeColor: "#f7f6f2",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="image" href={profile.photoFile} />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var root = document.documentElement;
                try {
                  var t = localStorage.getItem('theme') || 'minimal';
                  var themes = ${JSON.stringify({
                    bold: {
                      "--bg": "#08080d", "--surface": "#111118", "--surface-2": "#16161f",
                      "--text": "#f5f4f8", "--muted": "#a3a2b8", "--accent": "#9a80ff",
                      "--accent-2": "#5eead4", "--line": "rgba(255,255,255,0.09)",
                      "--line-strong": "rgba(255,255,255,0.16)",
                      "--accent-soft": "rgba(154,128,255,0.13)",
                      "--font-display": "'Space Grotesk', system-ui, sans-serif",
                      "--font-body": "'Inter', system-ui, sans-serif",
                      "--font-mono": "'JetBrains Mono', ui-monospace, monospace"
                    },
                    minimal: {
                      "--bg": "#f7f6f2", "--surface": "#ffffff", "--surface-2": "#f0eee8",
                      "--text": "#16151a", "--muted": "#62606b", "--accent": "#1b4fd8",
                      "--accent-2": "#0f766e", "--line": "rgba(22,21,26,0.12)",
                      "--line-strong": "rgba(22,21,26,0.2)",
                      "--accent-soft": "rgba(27,79,216,0.08)",
                      "--font-display": "'Space Grotesk', system-ui, sans-serif",
                      "--font-body": "'Inter', system-ui, sans-serif",
                      "--font-mono": "'JetBrains Mono', ui-monospace, monospace"
                    },
                    terminal: {
                      "--bg": "#07100b", "--surface": "#0c1710", "--surface-2": "#102018",
                      "--text": "#d6ffe4", "--muted": "#86b39a", "--accent": "#46f596",
                      "--accent-2": "#46f596", "--line": "rgba(70,245,150,0.18)",
                      "--line-strong": "rgba(70,245,150,0.32)",
                      "--accent-soft": "rgba(70,245,150,0.1)",
                      "--font-display": "'JetBrains Mono', ui-monospace, monospace",
                      "--font-body": "'JetBrains Mono', ui-monospace, monospace",
                      "--font-mono": "'JetBrains Mono', ui-monospace, monospace"
                    }
                  })};
                  if (!themes[t]) t = 'minimal';
                  var vars = themes[t] || themes.minimal;
                  Object.keys(vars).forEach(function(k){ root.style.setProperty(k, vars[k]); });
                  root.setAttribute('data-theme', t);
                  root.style.colorScheme = t === 'minimal' ? 'light' : 'dark';
                } catch(e){}

                // Scroll reveals. The hidden state is applied before paint to
                // avoid a flash; components/ScrollReveal.jsx attaches the
                // observer after hydration. If hydration never completes, this
                // fallback removes the hidden state so the page still reads.
                try {
                  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                  if (!reduce && 'IntersectionObserver' in window) {
                    root.classList.add('reveal-ready');
                    setTimeout(function(){
                      if (!document.querySelector('[data-reveal].is-in')) {
                        root.classList.remove('reveal-ready');
                      }
                    }, 6000);
                  }
                } catch(e){}
              })();
            `,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <ScrollReveal />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
