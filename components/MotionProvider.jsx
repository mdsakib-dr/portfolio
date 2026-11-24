"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes every framer-motion animation follow the system reduced-motion
 * preference. CSS transitions are already neutralised in globals.css; this
 * covers the JS-driven ones (hero entrance, portrait fade).
 */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
