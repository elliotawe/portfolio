"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/** Small elegant dot cursor that expands slightly over interactive elements.
 *  Uses gsap.quickTo for a smooth, interruptible follow. Disabled on touch
 *  devices and under prefers-reduced-motion. */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !dotRef.current) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const moveX = gsap.quickTo(dotRef.current, "x", { duration: 0.15, ease: "power2.out" });
    const moveY = gsap.quickTo(dotRef.current, "y", { duration: 0.15, ease: "power2.out" });

    const move = (e: MouseEvent) => {
      setVisible(true);
      moveX(e.clientX);
      moveY(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={dotRef}
      className={`fixed top-0 left-0 z-100 pointer-events-none rounded-full mix-blend-difference bg-white transition-[width,height,opacity] duration-200 ease-out hidden md:block ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: hovering ? 36 : 10,
        height: hovering ? 36 : 10,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}
