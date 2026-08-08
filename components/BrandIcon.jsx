"use client";

/**
 * Brand glyph in its real brand colour, resolved by getBrandIcon() in
 * lib/icons.js.
 *
 * Each icon ships two hexes: the published brand colour, plus a lightness-shifted
 * variant for whichever theme background the original would sink into. Both are
 * handed to CSS as custom properties and picked up by the `.brand-icon` rules in
 * globals.css, so a logo is never invisible and never stops looking like itself.
 *
 * Decorative only: the pill that wraps it always carries the tool name as real
 * text, so screen readers and no-icon tools read identically.
 */
export default function BrandIcon({ icon, size = 14, className = "" }) {
  if (!icon || !icon.path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={`brand-icon shrink-0 ${className}`}
      style={{
        "--brand-on-dark": `#${icon.dark || icon.hex}`,
        "--brand-on-light": `#${icon.light || icon.hex}`,
      }}
    >
      <path d={icon.path} />
    </svg>
  );
}
