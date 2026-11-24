"use client";

import { useEffect, useRef, useState } from "react";
import { workflows } from "@/lib/data";
import SectionHead from "./SectionHead";

/** Full-size view of one workflow screenshot, as a native modal dialog. */
function Lightbox({ item, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Guard: Strict Mode re-runs this effect, and showModal() throws on an
    // already-open dialog. Never close in cleanup — that fires a native close
    // event which would immediately clear the parent state.
    if (!dialog.open) dialog.showModal();

    const handleClose = () => closeRef.current();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-labelledby="lightbox-title"
      onClick={(e) => {
        // A click on the dialog itself is a click on the backdrop.
        if (e.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      <div className="lightbox-panel">
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <h3 id="lightbox-title" className="font-display text-lg font-semibold">
              {item.title}
            </h3>
            <p className="body-copy--tight mt-1 max-w-3xl">{item.description}</p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            aria-label="Close workflow preview"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:text-text"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="shot-body">
          <img
            src={item.image}
            alt={` n8n workflow`}
            width={item.imageWidth}
            height={item.imageHeight}
            className="img-outline h-auto w-full rounded-lg"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3">
          <span className="font-mono text-[11px] text-muted">
            {item.stack.join(" · ")}
          </span>
          <a
            href={item.image}
            target="_blank"
            rel="noreferrer"
            className="link-underline text-sm font-semibold"
          >
            Open image <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </dialog>
  );
}

function WorkflowRow({ item, index, onOpen }) {
  return (
    <div
      className="grid items-center gap-6 lg:grid-cols-[1.35fr_0.65fr]"
      data-reveal
      style={{ "--reveal-delay": `${index * 60}ms` }}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${item.title} workflow full size`}
        className="shot-frame block w-full text-left"
      >
        <span className="shot-bar" aria-hidden="true">
          <span className="shot-dot" />
          <span className="shot-dot" />
          <span className="shot-dot" />
          <span className="shot-url">n8n / {item.id}</span>
          <span className="shot-url" style={{ marginInlineStart: "auto" }}>
            ↗
          </span>
        </span>
        <span className="shot-body block">
          <img
            src={item.image}
            alt=""
            width={item.imageWidth}
            height={item.imageHeight}
            loading="lazy"
            className="img-outline h-auto w-full rounded-lg"
          />
        </span>
      </button>

      <div>
        <p className="eyebrow" style={{ color: "var(--accent)" }}>
          Workflow {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="h-card mt-3 text-[1.3rem]">{item.title}</h3>
        <p className="body-copy--tight mt-3">{item.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.stack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onOpen}
          className="link-underline mt-5 text-sm font-semibold"
        >
          Open full size <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section className="mx-auto max-w-content px-5 py-20">
      <SectionHead
        id="gallery"
        index="02"
        eyebrow="Automation gallery"
        title="Workflows, end to end."
        description="Real n8n builds — the joins, retries, dedup and delivery, not a diagram of them."
      />

      <div className="space-y-10">
        {workflows.map((item, i) => (
          <WorkflowRow
            key={item.id}
            item={item}
            index={i}
            onOpen={() => setActive(item)}
          />
        ))}
      </div>

      {active ? <Lightbox item={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
