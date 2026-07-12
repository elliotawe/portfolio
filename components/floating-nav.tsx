"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/animations/gsap";
import { NAV_SECTIONS } from "@/constants/content";

/** Floating minimal nav: only appears after the hero, auto-hides on scroll
 *  down and reappears on scroll up, highlights the active section. */
export function FloatingNav() {
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const lastY = useRef(0);

  useEffect(() => {
    const heroHeight = window.innerHeight;
    const onScroll = () => {
      const y = window.scrollY;
      setShow(y > heroHeight * 0.6);
      setHidden(y > lastY.current && y > heroHeight);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{
        opacity: show ? (hidden ? 0 : 1) : 0,
        y: show ? (hidden ? -12 : 0) : -12,
        pointerEvents: show && !hidden ? "auto" : "none",
      }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl px-2 py-2"
    >
      {NAV_SECTIONS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className="relative px-4 py-1.5 text-xs tracking-wide text-white/50 hover:text-white transition-colors duration-200 rounded-full"
        >
          {active === id && (
            <motion.span
              layoutId="nav-active"
              className="absolute inset-0 rounded-full bg-white/5"
              transition={{ duration: 0.3, ease: EASE }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            {label}
            {active === id && <span className="w-1 h-1 rounded-full bg-(--color-accent)" />}
          </span>
        </a>
      ))}
    </motion.nav>
  );
}
