"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/animations/gsap";

/** Drives a "browser window" card's resting scatter tilt, and on hover
 *  straightens it flat + lifts it + adds a small cursor-follow rotateX/Y —
 *  the "picked up off the desk" feel. Extends useTilt's rotateX/Y/scale
 *  pattern with a rotationZ straighten/settle, which plain useTilt doesn't
 *  do. No-op under reduced motion (element stays at its static rest tilt). */
export function useWindowTilt(reduced: boolean, restRotation: number, maxTilt = 5) {
  const ref = useRef<HTMLDivElement>(null);
  const quickRef = useRef<{
    rotateX: ReturnType<typeof gsap.quickTo>;
    rotateY: ReturnType<typeof gsap.quickTo>;
    rotateZ: ReturnType<typeof gsap.quickTo>;
    y: ReturnType<typeof gsap.quickTo>;
    scale: ReturnType<typeof gsap.quickTo>;
  } | null>(null);

  useEffect(() => {
    if (reduced || !ref.current) return;
    gsap.set(ref.current, {
      transformPerspective: 900,
      transformStyle: "preserve-3d",
      rotateZ: restRotation,
    });
    quickRef.current = {
      rotateX: gsap.quickTo(ref.current, "rotateX", { duration: 0.5, ease: "power3.out" }),
      rotateY: gsap.quickTo(ref.current, "rotateY", { duration: 0.5, ease: "power3.out" }),
      rotateZ: gsap.quickTo(ref.current, "rotateZ", { duration: 0.5, ease: "power3.out" }),
      y: gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3.out" }),
      scale: gsap.quickTo(ref.current, "scale", { duration: 0.5, ease: "power3.out" }),
    };
  }, [reduced, restRotation]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current || !quickRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    quickRef.current.rotateX(y * -maxTilt);
    quickRef.current.rotateY(x * maxTilt);
  };

  const onMouseEnter = () => {
    if (reduced || !quickRef.current) return;
    quickRef.current.rotateZ(0);
    quickRef.current.y(-6);
    quickRef.current.scale(1.03);
  };

  const onMouseLeave = () => {
    if (reduced || !quickRef.current) return;
    quickRef.current.rotateX(0);
    quickRef.current.rotateY(0);
    quickRef.current.rotateZ(restRotation);
    quickRef.current.y(0);
    quickRef.current.scale(1);
  };

  return { ref, onMouseMove, onMouseEnter, onMouseLeave };
}
