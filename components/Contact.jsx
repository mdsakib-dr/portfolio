import { profile } from "@/lib/data";
import { getBrandIcon } from "@/lib/icons";
import BrandIcon from "./BrandIcon";

/** A brand name in running text, with its logo. Falls back to bare text. */
function Tech({ name }) {
  const icon = getBrandIcon(name);
  return (
    <span className="inline-flex items-center gap-1">
      {icon ? <BrandIcon icon={icon} size={12} /> : null}
      {name}
    </span>
  );
}

export default function Contact() {
  return (
    <section className="contact-shell relative">
      <div
        className="glow on-dark-only"
        style={{ background: "var(--accent)", width: 420, height: 420, bottom: -160, left: "47%" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-content px-5 pb-14 pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div id="contact" className="scroll-mt-24" data-reveal>
            <div className="flex items-center gap-3">
              <span className="section-index">06</span>
              <p className="eyebrow">Contact</p>
            </div>
            <h2 className="contact-title mt-5">
              Let&rsquo;s build something <em>reliable</em>.
            </h2>
            <p className="body-copy measure mt-6">
              Open to remote AI and automation roles, and to freelance builds — RAG
              systems, AI agents, MCP servers, and workflow automation. The fastest
              way to reach me is email.
            </p>
            <span className="status-pill mt-6">
              <span className="status-dot" aria-hidden="true" />
              {profile.availability}
            </span>
          </div>

          <div data-reveal style={{ "--reveal-delay": "90ms" }}>
            <a href={`mailto:${profile.email}`} className="email-link">
              {profile.email}
              <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-2 text-sm text-muted">Usually replies within a day.</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <BrandIcon icon={getBrandIcon("LinkedIn")} size={15} />
                LinkedIn
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <BrandIcon icon={getBrandIcon("GitHub")} size={15} />
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="btn btn-quiet tnum"
              >
                {profile.phone}
              </a>
            </div>
          </div>
        </div>

        <footer className="footer-shell mt-16 flex flex-col gap-4 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono tnum">
            © {new Date().getFullYear()} {profile.name}
          </span>

          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono">
            Built with <Tech name="Next.js" /> · <Tech name="Framer Motion" /> ·
            deployed on <Tech name="Vercel" />
          </span>

          <a href="#top" className="link-muted font-mono">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
