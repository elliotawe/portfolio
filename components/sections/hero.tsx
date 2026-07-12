"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE, gsap, ScrollTrigger } from "@/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { HERO_NAME, HERO_ROLES } from "@/constants/content";

function RotatingRole() {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_ROLES.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <span className="relative inline-block h-[1.3em] overflow-hidden align-bottom min-w-[280px] text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={HERO_ROLES[index]}
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? {} : { opacity: 0, y: -14 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute left-0 top-0 text-white/70"
        >
          {HERO_ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const roleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions as {
          isDesktop: boolean;
          reduceMotion: boolean;
        };

        if (reduceMotion) {
          gsap.set([letterRefs.current, roleRef.current, taglineRef.current, scrollCueRef.current], {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
          });
          return;
        }

        // One coordinated entrance timeline instead of independently-delayed
        // Framer tweens — letters settle, then role, tagline, scroll cue follow.
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          letterRefs.current,
          { autoAlpha: 0, y: 24, filter: "blur(10px)", x: (i: number) => (i % 2 === 0 ? -8 : 8) },
          { autoAlpha: 1, y: 0, x: 0, filter: "blur(0px)", duration: 1.1, stagger: 0.05 },
          0.2
        )
          .fromTo(roleRef.current, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.0)
          .fromTo(taglineRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.2)
          .fromTo(scrollCueRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 1.7);

        // Hero name "tracks" left and settles back as the camera follows it out.
        if (isDesktop) {
          gsap.to(nameRef.current, {
            x: () => -window.innerWidth * 0.18,
            scale: 0.82,
            autoAlpha: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
              refreshPriority: 8,
              invalidateOnRefresh: true,
            },
          });
        } else {
          gsap.to(nameRef.current, {
            x: () => -window.innerWidth * 0.06,
            scale: 0.92,
            autoAlpha: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
              refreshPriority: 8,
              invalidateOnRefresh: true,
            },
          });
        }

        return () => {
          tl.kill();
        };
      },
      heroRef
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      <div className="absolute inset-0 -z-10 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbHRlcj0idXJsKCNuKSIvPjwvc3ZnPg==')] bg-repeat" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(47,111,255,0.08),transparent)]" />

      <div ref={nameRef} className="will-change-transform">
        <div className="text-[clamp(72px,16vw,220px)] font-semibold leading-none tracking-[-0.04em] select-none text-white font-sans">
          {HERO_NAME.split("").map((letter, i) => (
            <span
              key={i}
              ref={(el) => {
                letterRefs.current[i] = el;
              }}
              className="inline-block"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div ref={roleRef} className="mt-8 text-lg md:text-2xl font-light text-white/70">
        <RotatingRole />
      </div>

      <p
        ref={taglineRef}
        className="mt-6 text-sm md:text-base text-white/40 tracking-wide"
      >
        Building products. Designing systems. Creating experiences.
      </p>

      <div
        ref={scrollCueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <span className="w-px h-8 bg-linear-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
