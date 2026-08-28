"use client";

import { useEffect, useRef } from "react";

/**
 * A line that trails the cursor, in the theme accent.
 *
 * Built as a chain rather than a recording of raw pointer samples: node 0 eases
 * toward the pointer, and every node after it eases toward the node ahead of it.
 * That is what turns jittery mousemove events into one smooth line that whips and
 * settles — and it means a stalled pointer collapses the chain to a point, so the
 * trail only shows while you are actually moving.
 *
 * Segment geometry is written straight to attributes each frame instead of through
 * React state; re-rendering 24 elements at 60fps through the reconciler would be
 * pointless work. Opacity per segment is static and set once at render.
 *
 * Decorative and inert: aria-hidden, pointer-events: none, and it opts out
 * entirely for reduced-motion users and on touch devices (see globals.css).
 */

const SEGMENTS = 24; // chained segments in the tail
const EASE = 0.34; // how hard each node is pulled toward the one ahead of it
const MAX_OPACITY = 0.9; // opacity of the segment nearest the cursor

export default function CursorTrail() {
  const svgRef = useRef(null);

  useEffect(() => {
    // Pure decoration, so reduced-motion means don't run the loop at all.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const svg = svgRef.current;
    if (!svg) return;

    // Mouse trails the cursor persistently; touch trails the finger only while
    // it is on the screen. Both use the same pointer events, so a device with
    // both (touch laptop) keeps the mouse behaviour.
    const hasFine = window.matchMedia("(pointer: fine)").matches;
    const hasCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (!hasFine && !hasCoarse) return;

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
    const onUp = () => {
      // Touch has no persistent pointer — fade as soon as the finger lifts.
      if (hasCoarse && !hasFine) active = false;
    };
    const onLeave = () => {
      // Mouse left the window — fade until it comes back.
      if (hasFine) active = false;
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
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <svg ref={svgRef} className="cursor-trail" aria-hidden="true" focusable="false">
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <line key={i} strokeOpacity={((1 - i / SEGMENTS) * MAX_OPACITY).toFixed(3)} />
      ))}
    </svg>
  );
}
