"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { EASE, gsap } from "@/animations/gsap";
import { AWE_LETTERS } from "@/constants/content";

/** Mobile / reduced-motion: a calm, timed reveal instead of the pinned
 *  scroll-scrub used on desktop. Driven by Framer's IntersectionObserver
 *  (useInView), not layout height, so it's safe to keep mounted (just
 *  CSS-hidden) at desktop widths. */
function AweFallback() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setStage(1), 1400);
    const t2 = setTimeout(() => setStage(2), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView]);

  return (
    <div ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: EASE }}
        className="text-[clamp(64px,14vw,180px)] font-semibold leading-none tracking-[-0.04em] text-white mb-8"
      >
        Awe
      </motion.h2>

      <div className="h-16 relative max-w-xl">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.p
              key="joke"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-lg md:text-xl text-white/60 font-light"
            >
              Yes... that's actually my surname.
            </motion.p>
          )}
          {stage === 1 && (
            <motion.p
              key="reveal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-lg md:text-xl text-white/60 font-light"
            >
              Hopefully by the end, you'll understand why.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={stage === 2 ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
        className="flex items-center gap-10 md:gap-16 mt-6"
      >
        {AWE_LETTERS.map(({ letter, label, href }, i) => (
          <motion.a
            key={letter}
            href={href}
            data-cursor-hover
            initial={{ opacity: 0, y: 16 }}
            animate={stage === 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
            className="group flex flex-col items-center gap-3"
          >
            <span className="text-[clamp(40px,6vw,72px)] font-semibold text-white/15 group-hover:text-(--color-accent) transition-colors duration-300">
              {letter}
            </span>
            <span className="text-xs tracking-[0.15em] uppercase text-white/30 group-hover:text-white/70 transition-colors duration-300">
              {label}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}

/** "Awe" section: mobile (timed Framer reveal) and desktop (pinned,
 *  scroll-scrubbed) markup are both always mounted — CSS picks which is
 *  visible (`lg:hidden` / `hidden lg:block`), gsap.matchMedia() picks which
 *  gets a ScrollTrigger. Nothing swaps in after mount, so page height (and
 *  every ScrollTrigger below this section) is correct from first paint. */
export function Awe() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const aweRef = useRef<HTMLDivElement>(null);
  const jokeRef = useRef<HTMLParagraphElement>(null);
  const revealRef = useRef<HTMLParagraphElement>(null);
  const groupRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;

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

        if (!isDesktop || reduceMotion) return;

        gsap.set([jokeRef.current, revealRef.current], { autoAlpha: 0 });
        gsap.set(labelRefs.current, { autoAlpha: 0, y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 0.6,
            pin: true,
            refreshPriority: 7,
            invalidateOnRefresh: true,
          },
        });

        const spread = [-64, 0, 64];

        tl.fromTo(aweRef.current, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1 })
          .to(jokeRef.current, { autoAlpha: 1, duration: 0.6 }, "+=0.1")
          .to(jokeRef.current, { autoAlpha: 0, duration: 0.5 }, "+=0.6")
          .to(revealRef.current, { autoAlpha: 1, duration: 0.6 })
          .to(revealRef.current, { autoAlpha: 0, duration: 0.5 }, "+=0.6")
          .to(
            groupRefs.current,
            { x: (i: number) => spread[i], duration: 1, ease: "power2.inOut" },
            "separate"
          )
          .to(labelRefs.current, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6 }, "separate+=0.3");
      },
      wrapperRef
    );

    return () => mm.revert();
  }, []);

  return (
    <>
      <div className="lg:hidden">
        <AweFallback />
      </div>

      <div ref={wrapperRef} className="hidden lg:block relative min-h-screen">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h2
            ref={aweRef}
            className="text-[clamp(64px,14vw,180px)] font-semibold leading-none tracking-[-0.04em] text-white mb-8"
          >
            {AWE_LETTERS.map(({ letter, label, href }, i) => (
              <a
                key={letter}
                href={href}
                data-cursor-hover
                ref={(el) => {
                  groupRefs.current[i] = el;
                }}
                className="group relative inline-block hover:text-(--color-accent) transition-colors duration-300"
              >
                <span className="inline-block">{letter.toLowerCase()}</span>
                <span
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-4 text-xs tracking-[0.15em] uppercase text-white/30 group-hover:text-white/70 transition-colors duration-300 whitespace-nowrap"
                >
                  {label}
                </span>
              </a>
            ))}
          </h2>

          <div className="relative h-16 w-full max-w-xl mx-auto">
            <p ref={jokeRef} className="absolute inset-x-0 text-center whitespace-nowrap text-lg md:text-xl text-white/60 font-light">
              Yes... that's actually my surname.
            </p>
            <p ref={revealRef} className="absolute inset-x-0 text-center whitespace-nowrap text-lg md:text-xl text-white/60 font-light">
              Hopefully by the end, you'll understand why.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
