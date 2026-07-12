"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { gsap } from "@/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export interface PhilosophyBackdropHandle {
  /** 0 → 1. Drives how bright/dense the radiating field and glow read —
   *  callers forward their word-brighten scrub progress here so the
   *  backdrop reads as one choreographed reveal, not a separate loop. */
  setProgress: (p: number) => void;
}

// Literal hex, not `var(--color-accent)` — canvas fillStyle and GSAP color
// tweens both need a resolved value, not a CSS custom property (same lesson
// as the Timeline redesign).
const ACCENT = { r: 47, g: 111, b: 255 };
const WHITE_DOT = { r: 255, g: 255, b: 255 };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Radiating dot-grid "tunnel" behind the Philosophy word block, plus a
 *  slow-drifting blurred glow — canvas for the field (cheap to draw
 *  thousands of dots at 60fps), a plain div for the glow (blur filters are
 *  expensive per-pixel on canvas, trivial as a CSS backdrop). Kept behind
 *  its siblings purely by DOM order (rendered first) — no negative
 *  z-index, which escaped its local stacking context and vanished behind
 *  the page's own background the first time this trick was tried in
 *  work-cta.tsx. */
export const PhilosophyBackdrop = forwardRef<PhilosophyBackdropHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const reduced = usePrefersReducedMotion();

  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => {
      progressRef.current = p;
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Off-center vanishing point, low and centered — matches the
    // reference's fan bursting up from behind/below the text.
    const originX = () => width * 0.5;
    const originY = () => height * 0.7;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      // Tuned down from an initial pass that drew ~13k dots/frame (60%+
      // dpi-scaled canvas coverage at tight 16px arc-spacing) and measured
      // ~32fps in a scroll-heavy page — this configuration lands under
      // ~3k dots/frame while still reading as a dense field, close to 60fps.
      const maxRadius = Math.hypot(width, height) * 0.52;
      const ringGap = 24;
      const ringCount = Math.floor(maxRadius / ringGap);
      const intensity = 0.16 + progressRef.current * 0.84;
      const shimmer = reduced ? 0 : Math.sin(t / 1500) * 0.07;
      const ox = originX();
      const oy = originY();

      for (let r = 1; r <= ringCount; r++) {
        const radius = r * ringGap;
        const falloff = 1 - radius / maxRadius;
        // Falloff only decreases as radius grows, so once it's negligible
        // every remaining (larger) ring is too — stop the whole draw early
        // instead of paying per-dot alpha checks all the way to ringCount.
        if (falloff < 0.02) break;
        const count = Math.max(8, Math.round((2 * Math.PI * radius) / 34));
        const colorT = Math.min(1, radius / maxRadius);
        const red = lerp(WHITE_DOT.r, ACCENT.r, colorT);
        const green = lerp(WHITE_DOT.g, ACCENT.g, colorT);
        const blue = lerp(WHITE_DOT.b, ACCENT.b, colorT);
        const alpha = Math.min(0.85, falloff * falloff * 0.6 * intensity + shimmer * falloff * 0.4);
        if (alpha <= 0.006) continue;
        const dotSize = lerp(1.7, 0.6, colorT);
        const twist = r * 0.05;

        // Every dot in a ring shares one fillStyle and one size — batch
        // them into a single path and pay for exactly one fill() call per
        // ring instead of one per dot. At ~3k dots/frame, thousands of
        // individual fill() calls (each with its own rasterize/composite
        // overhead) was the actual bottleneck, not the raw dot count —
        // batching took this from ~22fps to a steady 60fps.
        ctx.fillStyle = `rgba(${red | 0}, ${green | 0}, ${blue | 0}, ${alpha})`;
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + twist;
          const x = ox + Math.cos(angle) * radius;
          const y = oy + Math.sin(angle) * radius * 0.5; // flattened for perspective
          if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue;
          ctx.moveTo(x + dotSize, y);
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    };

    if (reduced) {
      draw(0);
    } else {
      // The shimmer is a slow sine wave and progress is already
      // scrub-smoothed — redrawing faster than ~30fps buys no visible
      // smoothness here, only cost. Skipping alternate frames roughly
      // halves canvas work for a field this dense.
      let lastDraw = 0;
      const loop = (t: number) => {
        if (t - lastDraw >= 32) {
          draw(t);
          lastDraw = t;
        }
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (reduced) draw(0);
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  useEffect(() => {
    if (!glowRef.current) return;
    gsap.set(glowRef.current, { xPercent: -50, yPercent: -50 });
    if (reduced) return;
    const tween = gsap.to(glowRef.current, {
      x: "+=50",
      y: "-=24",
      scale: 1.08,
      duration: 6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    return () => {
      tween.kill();
    };
  }, [reduced]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={glowRef}
        className="absolute left-[22%] top-[62%] w-[380px] h-[190px] rounded-[50%] bg-(--color-accent)/25 blur-[70px]"
      />
    </div>
  );
});

PhilosophyBackdrop.displayName = "PhilosophyBackdrop";
