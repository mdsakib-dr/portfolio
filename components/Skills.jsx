import { skills } from "@/lib/data";
import { getBrandIcon } from "@/lib/icons";
import BrandIcon from "./BrandIcon";
import SectionHead from "./SectionHead";

export default function Skills() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-content px-5 py-20">
        <SectionHead
          id="skills"
          index="03"
          eyebrow="Stack"
          title="The tools behind the systems."
          description="Grouped by how I actually use them, from agent orchestration down to the database."
        />

        <div className="ledger">
          {skills.map((s, i) => (
            <div
              key={s.group}
              className="ledger-row"
              data-reveal
              style={{ "--reveal-delay": `${Math.min(i * 45, 180)}ms` }}
            >
              <div>
                <div className="ledger-title">
                  <span className="section-index">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.group}</h3>
                  <span className="ledger-count" aria-hidden="true">
                    {String(s.items.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {s.items.map((it) => {
                  // null for concepts and in-house tooling (MCP, RAG, pgvector,
                  // FastMCP…) — those render as text-only chips by design.
                  const icon = getBrandIcon(it);
                  return (
                    <li key={it} className="chip">
                      {icon ? <BrandIcon icon={icon} /> : null}
                      <span>{it}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
