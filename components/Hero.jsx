import { profile, stats } from "@/lib/data";
import { getBrandIcon } from "@/lib/icons";
import BrandIcon from "./BrandIcon";
import HeroPortrait from "./HeroPortrait";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="glow on-dark-only"
        style={{ background: "var(--accent)", width: 420, height: 420, top: -140, left: -120 }}
        aria-hidden="true"
      />
      <div
        className="glow on-dark-only"
        style={{ background: "var(--accent-2)", width: 320, height: 320, top: 60, right: -100 }}
        aria-hidden="true"
      />

      <div className="hero-shell relative z-10 mx-auto max-w-content px-5">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,21rem)]">
          <div className="relative z-10">
            <div className="hero-in">
              <span className="status-pill">
                <span className="status-dot" aria-hidden="true" />
                {profile.availability}
              </span>
            </div>

            <h1 className="h-display hero-in mt-6" style={{ animationDelay: "40ms" }}>
              Md Sakib<span className="hero-name-dot">.</span>
            </h1>

            <p className="hero-lede hero-in" style={{ animationDelay: "90ms" }}>
              {profile.tagline}
            </p>

            <div
              className="hero-in mt-8 flex flex-wrap items-center gap-2.5"
              style={{ animationDelay: "140ms" }}
            >
              <a href="#work" className="btn btn-primary">
                See the work
                <svg
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                Email me
              </a>
            </div>

            <div
              className="hero-meta hero-in"
              style={{ animationDelay: "180ms" }}
            >
              <span>{profile.location}</span>
              <span aria-hidden="true" style={{ opacity: 0.4 }}>
                /
              </span>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="link-muted inline-flex items-center gap-1.5"
              >
                <BrandIcon icon={getBrandIcon("GitHub")} size={13} />
                GitHub
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="link-muted inline-flex items-center gap-1.5"
              >
                <BrandIcon icon={getBrandIcon("LinkedIn")} size={13} />
                LinkedIn
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Decorative: the portrait carries no information the copy doesn't. */}
          <div className="hero-portrait-slot" aria-hidden="true">
            <div className="hero-portrait-wrap">
              <HeroPortrait />
              <span className="hero-portrait-caption">Now / ChannelSync</span>
            </div>
          </div>
        </div>

        <div className="stat-strip hero-in" style={{ animationDelay: "220ms" }}>
          {stats.map((s, i) => (
            <div key={s.label} className="stat">
              {s.brands ? (
                <div
                  className="stat-brands"
                  role="img"
                  aria-label={s.brands.join(", ")}
                >
                  {s.brands.map((b) => (
                    <BrandIcon key={b} icon={getBrandIcon(b)} size={20} />
                  ))}
                </div>
              ) : (
                <div className={`stat-value ${i === 0 ? "stat-value--accent" : ""}`}>
                  {s.value}
                </div>
              )}
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
