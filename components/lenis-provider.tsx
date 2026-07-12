"use client";

import { useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { ensureGsapRegistered, gsap, ScrollTrigger, prefersReducedMotion } from "@/animations/gsap";

/** Keeps ScrollTrigger's cached measurements in sync with Lenis's virtual scroll,
 *  and drives Lenis's RAF loop from GSAP's ticker so both stay on one clock. */
function GsapSync() {
  const lenis = useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    if (!lenis) return;
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  // Several sections (e.g. About) decide their pinned vs. fallback layout in
  // their own effect, which mounts the real (taller, pin-spacing-adding)
  // DOM one render tick after siblings below them have already registered
  // their own ScrollTriggers against the shorter, pre-decision layout. That
  // leaves later triggers (e.g. Projects' pin) cached against a stale page
  // height. One refresh after everything has settled recomputes all of
  // them against the final layout.
  useEffect(() => {
    let raf2 = 0;
    let cancelled = false;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    // Fonts swapping in late (display: swap) reflow text and shift the
    // height of every section below — one more authoritative refresh once
    // they've settled catches what the RAF pair above ran too early for.
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return null;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    ensureGsapRegistered();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Respect prefers-reduced-motion: fall back to native scroll entirely,
  // no Lenis smoothing / momentum to fight the user's OS setting.
  if (reduced || prefersReducedMotion()) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        autoRaf: false,
      }}
    >
      <GsapSync />
      {children}
    </ReactLenis>
  );
}
