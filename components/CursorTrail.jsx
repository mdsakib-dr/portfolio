"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer decoration that adapts to the input type:
 *
 * - Fine pointer (mouse): a line trails the cursor, built as an eased chain so
 *   jittery mousemove events become one smooth line. Segment geometry is written
 *   straight to attributes each frame rather than through React state.
 *
 * - Coarse pointer (touch): there is no persistent cursor, so a trail is
 *   pointless — instead each tap drops a water-style ripple that expands and
 *   fades from the touch point.
 *
 * Both are decorative and inert (aria-hidden, pointer-events: none) and opt out
 * entirely for reduced-motion users.
 */

const SEGMENTS = 24; // chained segments in the tail
const EASE = 0.34; // how hard each node is pulled toward the one ahead of it
const MAX_OPACITY = 0.9; // opacity of the segment nearest the cursor

export default function CursorTrail() {
  const svgRef = useRef(null);
  const ripplesRef = useRef(null);

  // ── Mouse trail (fine pointer only) ────────────────────────────────────
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const svg = svgRef.current;
    if (!svg) return;

    const lines = Array.from(svg.children);
    const xs = new Array(SEGMENTS + 1).fill(-100);
    const ys = new Array(SEGMENTS + 1).fill(-100);
    let pointerX = -100;
    let pointerY = -100;
    let active = false;
    let frame = 0;

    const collapse = () => {
      // Drop the chain onto the pointer first, or it whips in from the last spot.
      xs.fill(pointerX);
      ys.fill(pointerY);
    };

    const onMove = (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      if (!active) {
        collapse();
        active = true;
      }
    };
    const onDown = (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      collapse();
      active = true;
    };
    const onLeave = () => {
      active = false;
    };

    const tick = () => {
      xs[0] += (pointerX - xs[0]) * EASE;
      ys[0] += (pointerY - ys[0]) * EASE;
      for (let i = 1; i <= SEGMENTS; i++) {
        xs[i] += (xs[i - 1] - xs[i]) * EASE;
        ys[i] += (ys[i - 1] - ys[i]) * EASE;
      }

      for (let i = 0; i < SEGMENTS; i++) {
        const line = lines[i];
        line.setAttribute("x1", xs[i].toFixed(1));
        line.setAttribute("y1", ys[i].toFixed(1));
        line.setAttribute("x2", xs[i + 1].toFixed(1));
        line.setAttribute("y2", ys[i + 1].toFixed(1));
      }

      svg.style.opacity = active ? "1" : "0";
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // ── Touch water ripple (coarse pointer only) ───────────────────────────
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only on pure-touch devices; touch laptops keep the mouse trail.
    if (
      window.matchMedia("(pointer: fine)").matches ||
      !window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const container = ripplesRef.current;
    if (!container) return;

    const spawn = (x, y) => {
      // Two rings give the "water" feel: a fast inner ring and a lagging outer one.
      const inner = document.createElement("span");
      inner.className = "touch-ripple";
      inner.style.left = `${x}px`;
      inner.style.top = `${y}px`;
      container.appendChild(inner);

      const outer = document.createElement("span");
      outer.className = "touch-ripple touch-ripple--outer";
      outer.style.left = `${x}px`;
      outer.style.top = `${y}px`;
      container.appendChild(outer);

      const clean = () => {
        inner.remove();
        outer.remove();
      };
      inner.addEventListener("animationend", clean);
      setTimeout(clean, 1300);
    };

    const onDown = (e) => {
      if (e.pointerType !== "touch") return;
      spawn(e.clientX, e.clientY);
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <>
      <svg ref={svgRef} className="cursor-trail" aria-hidden="true" focusable="false">
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <line key={i} strokeOpacity={((1 - i / SEGMENTS) * MAX_OPACITY).toFixed(3)} />
        ))}
      </svg>
      <div ref={ripplesRef} className="touch-ripples" aria-hidden="true" />
    </>
  );
}
