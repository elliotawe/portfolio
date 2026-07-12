"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register GSAP plugins exactly once, client-side only. */
export function ensureGsapRegistered() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  registered = true;
}

// Register at module load rather than inside a component effect: child
// section components' effects (Hero, Awe, Projects, ...) can run before a
// parent provider's effect fires, so relying on an effect to register
// ScrollTrigger races and leaves it undefined for early mounters.
ensureGsapRegistered();

/** Single shared easing curve — Framer Motion form (Apple/Linear-style, no bounce). */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** Same curve expressed as a GSAP ease string for parity across both engines. */
export const GSAP_EASE = "power3.out";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isDesktopViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(min-width: 1024px)").matches;
}

export { gsap, ScrollTrigger };
