"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";

/**
 * Stylized portrait for the hero — reads as screen-printed vector art rather
 * than a pasted photo, and re-derives its colour from the active theme.
 *
 * The whole treatment lives in the #hero-duotone SVG filter below:
 *   1. desaturate, then a light blur to kill photo grain;
 *   2. posterize luminance to 7 flat steps — this is what makes it look drawn;
 *   3. knock out only the near-white end of the range, so a backdrop drops away
 *      while the subject stays intact — that is what makes this work whether the
 *      PNG is a transparent cut-out or a portrait shot on white;
 *   4. intersect with the source's own alpha, so a real cut-out stays a cut-out;
 *   5. flood the remaining shape with var(--accent) — see the feFlood rule in
 *      globals.css — then shade that ink by the photo's luminance so the tone
 *      stays right instead of reading as a negative. Because the ink colour is a
 *      CSS variable rather than a baked hex, bold / minimal / terminal each get
 *      their own portrait for free.
 *
 * Cropping and the right-edge fade are CSS (.hero-portrait* in globals.css).
 *
 * The filter is referenced from an inline style rather than the stylesheet on
 * purpose: url(#id) inside an external CSS file has historically resolved
 * against the stylesheet's URL instead of the document's in some engines.
 */
export default function HeroPortrait() {
  const reduceMotion = useReducedMotion();
  const imgRef = useRef(null);

  // "loading" → "ready" once the file decodes, "missing" if public/profile.png
  // isn't there yet — that unmounts the whole thing, so there is never a broken
  // image glyph or an orphaned block of accent colour.
  const [status, setStatus] = useState("loading");

  // A cached or SSR-complete image can finish before React hydrates, in which
  // case onLoad never fires and the fade-in would stay stuck at 0. Check the
  // element's own state once on mount to cover that case.
  useEffect(() => {
    const el = imgRef.current;
    if (!el || !el.complete) return;
    setStatus(el.naturalWidth > 0 ? "ready" : "missing");
  }, []);

  if (!profile.photoFile || status === "missing") return null;

  return (
    <motion.div
      className="hero-portrait"
      initial={{ opacity: 0 }}
      animate={{ opacity: status === "ready" ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeOut" }}
    >
      {/* Zero-size SVG: present in the document, paints nothing itself. */}
      <svg className="hero-portrait__defs" aria-hidden="true" focusable="false">
        <filter id="hero-duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" result="gray" />
          <feGaussianBlur in="gray" stdDeviation="0.6" result="soft" />
          <feComponentTransfer in="soft" result="poster">
            <feFuncR type="discrete" tableValues="0 0.16 0.34 0.52 0.7 0.86 1" />
            <feFuncG type="discrete" tableValues="0 0.16 0.34 0.52 0.7 0.86 1" />
            <feFuncB type="discrete" tableValues="0 0.16 0.34 0.52 0.7 0.86 1" />
          </feComponentTransfer>
          {/* Move luminance into the alpha channel so the next step can shape it. */}
          <feColorMatrix
            in="poster"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    1 0 0 0 0"
            result="luminanceAsAlpha"
          />
          {/* Knock out only the top of the range. Everything up to ~0.6 stays
              fully inked; near-white ramps to nothing. That is what lets a photo
              shot on white melt into var(--bg) while the subject stays intact —
              and it costs only the brightest speculars. */}
          <feComponentTransfer in="luminanceAsAlpha" result="coverage">
            <feFuncA type="table" tableValues="1 1 1 1 0.78 0" />
          </feComponentTransfer>
          {/* …intersected with the source's own alpha, so an already-transparent
              cut-out stays a cut-out instead of gaining a background. */}
          <feComposite in="coverage" in2="SourceGraphic" operator="in" result="inkAlpha" />

          {/* flood-color is set from CSS → var(--accent) */}
          <feFlood result="flood" />
          {/* Shade the ink by the photo's own luminance (0.28 + 0.72·L) so tone
              survives — lit planes of the face stay bright, hair and shirt go
              deep. Without this the portrait reads as a negative, since flat ink
              makes dark hair the lightest thing on a dark background. */}
          <feComposite
            in="flood"
            in2="poster"
            operator="arithmetic"
            k1="0.72"
            k2="0.28"
            k3="0"
            k4="0"
            result="shaded"
          />
          <feComposite in="shaded" in2="inkAlpha" operator="in" />
        </filter>
      </svg>

      {/* eslint-disable-next-line @next/next/no-img-element -- a plain <img>
          keeps this dependency-free and skips next/image's build-time file
          resolution, since the source is dropped into /public by hand. */}
      <img
        ref={imgRef}
        src={profile.photoFile}
        alt=""
        aria-hidden="true"
        draggable="false"
        decoding="async"
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("missing")}
        className="hero-portrait__img"
        style={{ filter: "url(#hero-duotone)" }}
      />
    </motion.div>
  );
}
