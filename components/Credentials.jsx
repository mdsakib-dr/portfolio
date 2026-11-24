"use client";

import { useEffect, useRef, useState } from "react";
import { credentials } from "@/lib/data";
import SectionHead from "./SectionHead";

/** Full-size certificate as a native modal dialog. */
function CertificateDialog({ item, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    const handleClose = () => closeRef.current();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-labelledby="certificate-title"
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      <div className="lightbox-panel">
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
          <div>
            <h3 id="certificate-title" className="font-display text-lg font-semibold">
              {item.title}
            </h3>
            <p className="body-copy--tight mt-1">
              {item.issuer} · {item.cohort} · {item.issued} · Credential {item.credentialId}
            </p>
          </div>
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            aria-label="Close certificate"
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
            alt={`${item.issuer} Certificate of Completion for ${item.title}, credential ${item.credentialId}`}
            width={item.imageWidth}
            height={item.imageHeight}
            className="img-outline h-auto w-full rounded-lg"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3">
          <span className="font-mono text-[11px] text-muted">
            Certificate ID {item.credentialId}
          </span>
          <a
            href={item.pdf}
            download
            className="link-underline text-sm font-semibold"
          >
            Download PDF <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </dialog>
  );
}

export default function Credentials() {
  const [active, setActive] = useState(null);

  return (
    <section className="mx-auto max-w-content px-5 py-20">
      <SectionHead
        id="credentials"
        index="04"
        eyebrow="Credentials"
        title="The certificate that started the path."
        description="Formal training earns its place when it changes what you can ship. This one did."
      />

      {credentials.map((item) => (
        <div
          key={item.id}
          className="grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12"
        >
          <figure className="shot-frame" data-reveal>
            <div className="shot-bar" aria-hidden="true">
              <span className="shot-dot" />
              <span className="shot-dot" />
              <span className="shot-dot" />
              <span className="shot-url">ostad / certificate</span>
              <span className="shot-url" style={{ marginInlineStart: "auto" }}>
                {item.credentialId}
              </span>
            </div>
            <div className="shot-body">
              <img
                src={item.image}
                alt={`${item.issuer} Certificate of Completion for ${item.title}, credential ${item.credentialId}`}
                width={item.imageWidth}
                height={item.imageHeight}
                loading="lazy"
                className="img-outline h-auto w-full rounded-lg"
              />
            </div>
          </figure>

          <div data-reveal style={{ "--reveal-delay": "80ms" }}>
            <p className="eyebrow" style={{ color: "var(--accent)" }}>
              {item.issuer} · {item.cohort} · {item.issued}
            </p>
            <h3 className="h-card mt-3 text-[1.35rem]">{item.title}</h3>
            <p className="body-copy mt-3">{item.summary}</p>
            <p className="body-copy--tight mt-3">{item.story}</p>

            <dl
              className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line"
              style={{ background: "var(--line)" }}
            >
              <div className="bg-surface p-3.5">
                <dt className="eyebrow">Issuer</dt>
                <dd className="mt-1.5 text-sm font-medium">{item.issuer}</dd>
              </div>
              <div className="bg-surface p-3.5">
                <dt className="eyebrow">Issued</dt>
                <dd className="mt-1.5 text-sm font-medium tnum">{item.issued}</dd>
              </div>
              <div className="bg-surface p-3.5">
                <dt className="eyebrow">Credential ID</dt>
                <dd className="mt-1.5 font-mono text-sm">{item.credentialId}</dd>
              </div>
              <div className="bg-surface p-3.5">
                <dt className="eyebrow">Cohort</dt>
                <dd className="mt-1.5 text-sm font-medium">{item.cohort}</dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setActive(item)}
                className="btn btn-primary"
              >
                View certificate
                <span aria-hidden="true">↗</span>
              </button>
              <a href={item.pdf} download className="btn btn-ghost">
                Download PDF
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      ))}

      {active ? (
        <CertificateDialog item={active} onClose={() => setActive(null)} />
      ) : null}
    </section>
  );
}
