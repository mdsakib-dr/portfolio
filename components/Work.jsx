import { projects } from "@/lib/data";
import { getBrandIcon } from "@/lib/icons";
import BrandIcon from "./BrandIcon";
import SectionHead from "./SectionHead";

function Stack({ items }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {items.map((s) => {
        // Same registry the Skills ledger uses, so a tool looks identical
        // wherever it appears. No entry → text-only chip.
        const icon = getBrandIcon(s);
        return (
          <li key={s} className="chip">
            {icon ? <BrandIcon icon={icon} size={13} /> : null}
            <span>{s}</span>
          </li>
        );
      })}
    </ul>
  );
}

function Card({ p, index, compact = false }) {
  return (
    <article
      className="card card-lift work-card h-full"
      data-reveal
      style={{ "--reveal-delay": `${(index % 2) * 70}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow">{p.category}</p>
        {p.live ? (
          <span className="live-pill">
            <span className="live-dot" aria-hidden="true" />
            Live
          </span>
        ) : null}
      </div>

      <h3 className={`h-card mt-4 ${compact ? "" : "text-[1.4rem]"}`}>{p.name}</h3>
      <p className="mt-2 text-sm font-medium" style={{ color: "var(--accent)" }}>
        {p.tagline}
      </p>
      <p
        className={`body-copy--tight mt-3 ${p.caseStudy && !compact ? "line-clamp-5" : ""}`}
      >
        {p.description}
      </p>

      <Stack items={p.stack} />

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 text-sm font-semibold">
        {p.caseStudy ? (
          <a href={`/work/${p.id}`} className="link-underline py-1">
            Case study <span aria-hidden="true">→</span>
          </a>
        ) : null}
        {p.live ? (
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            className="link-underline py-1"
          >
            Live <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        {p.repo ? (
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            className="link-muted py-1"
          >
            Code <span aria-hidden="true">↗</span>
          </a>
        ) : null}
        {!p.caseStudy && !p.live && !p.repo ? (
          <span className="font-normal text-muted">Internal — details on request</span>
        ) : null}
      </div>

      <span className="work-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
    </article>
  );
}

export default function Work() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section className="mx-auto max-w-content px-5 py-20">
      <SectionHead
        id="work"
        index="01"
        eyebrow="Selected work"
        title="Systems running in production."
        description="Live demos first. Every card links to something you can open, run, or read in full."
      />

      <div className="work-grid">
        {featured.map((p, i) => (
          <Card key={p.id} p={p} index={i} />
        ))}
      </div>

      <div className="mb-6 mt-16 flex items-center gap-4" data-reveal>
        <p className="eyebrow" style={{ color: "var(--text)" }}>
          More automation &amp; data work
        </p>
        <span className="section-rule" aria-hidden="true" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {more.map((p, i) => (
          <Card key={p.id} p={p} index={i} compact />
        ))}
      </div>
    </section>
  );
}
