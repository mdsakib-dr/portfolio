import { profile, experience, education, activities } from "@/lib/data";
import SectionHead from "./SectionHead";

export default function About() {
  return (
    <section className="mx-auto max-w-content px-5 py-20">
      <SectionHead
        id="about"
        index="05"
        eyebrow="About"
        title="The engineer behind the work."
        description="A bias for systems that keep running after the demo."
      />

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <div className="space-y-4" data-reveal>
            {profile.about.map((para, i) => (
              <p key={i} className="body-copy">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-12">
            <div className="mb-6 flex items-center gap-4" data-reveal>
              <p className="eyebrow" style={{ color: "var(--text)" }}>
                Experience
              </p>
              <span className="section-rule" aria-hidden="true" />
            </div>

            <div className="timeline" data-reveal>
              {experience.map((e) => (
                <div key={e.company} className="timeline-item">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="h-card">{e.company}</h3>
                    <span className="font-mono text-xs text-muted tnum">{e.location}</span>
                  </div>

                  <div className="mt-4 space-y-5">
                    {e.positions.map((p) => (
                      <div key={p.role}>
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-sm font-semibold" style={{ color: "var(--accent)" }}>
                            {p.role}
                          </p>
                          <span className="font-mono text-xs text-muted tnum">{p.period}</span>
                        </div>
                        <ul className="mt-2 space-y-2">
                          {p.points.map((pt, j) => (
                            <li key={j} className="body-copy--tight flex gap-2">
                              <span style={{ color: "var(--accent)" }} aria-hidden="true">
                                ▹
                              </span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="card p-6" data-reveal>
            <p className="eyebrow" style={{ color: "var(--accent)" }}>
              Education
            </p>
            <h3 className="h-card mt-3 text-[1.05rem]">{education.school}</h3>
            <p className="body-copy--tight mt-1">{education.degree}</p>
            <p className="mt-2 font-mono text-xs text-muted tnum">{education.period}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {education.notes.map((n) => (
                <li
                  key={n}
                  className="chip"
                  style={{ color: "var(--accent)", borderColor: "var(--accent-soft)" }}
                >
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6" data-reveal style={{ "--reveal-delay": "70ms" }}>
            <p className="eyebrow" style={{ color: "var(--accent)" }}>
              Activities &amp; recognition
            </p>
            <div className="mt-4 space-y-5">
              {activities.map((group) => (
                <div key={group.group}>
                  <h4 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                    {group.group}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {group.items.map((a) => (
                      <li key={a} className="body-copy--tight flex gap-2 text-[0.875rem]">
                        <span style={{ color: "var(--accent)" }} aria-hidden="true">
                          ▹
                        </span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6" data-reveal style={{ "--reveal-delay": "140ms" }}>
            <p className="eyebrow" style={{ color: "var(--accent)" }}>
              Based in
            </p>
            <p className="mt-3 text-sm font-medium">{profile.location}</p>
            <p className="body-copy--tight mt-1 text-[0.875rem]">
              Remote-friendly, GMT+6. Open to AI, automation and product engineering roles.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="link-underline mt-4 text-sm font-semibold"
            >
              Start a conversation <span aria-hidden="true">→</span>
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
