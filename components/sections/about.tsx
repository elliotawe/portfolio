"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/animations/gsap";
import { Reveal } from "@/animations/reveal";
import { ABOUT_STATEMENTS } from "@/constants/content";

/** Minimal, one-thought-at-a-time statements. Both the mobile (stacked,
 *  in-view reveal) and desktop (pinned, scroll-scrubbed cross-fade) markup
 *  are always mounted — CSS (`hidden lg:...` / `lg:hidden`) picks which is
 *  visible, and gsap.matchMedia() picks which gets animated. Nothing swaps
 *  in after mount, so the page's final height (and every ScrollTrigger
 *  below this section) is correct from the very first paint. */
export function About() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const statementRefs = useRef<(HTMLParagraphElement | null)[]>([]);

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

        gsap.set(statementRefs.current.slice(1), { autoAlpha: 0, y: 16, filter: "blur(6px)" });
        gsap.set(statementRefs.current[0], { autoAlpha: 1, y: 0, filter: "blur(0px)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: `+=${(ABOUT_STATEMENTS.length - 1) * 100}%`,
            scrub: 0.6,
            pin: true,
            refreshPriority: 6,
            invalidateOnRefresh: true,
          },
        });

        statementRefs.current.forEach((_, i) => {
          if (i === 0) return;
          tl.to(statementRefs.current[i - 1], { autoAlpha: 0, y: -16, filter: "blur(6px)", duration: 1 })
            .to(statementRefs.current[i], { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1 }, "<");
        });
      },
      wrapperRef
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="about" className="relative">
      {/* Mobile / reduced motion: normal-flow stack, each statement reveals
          as it scrolls into view. */}
      <div className="lg:hidden py-20">
        {ABOUT_STATEMENTS.map((text) => (
          <div key={text} className="min-h-[60vh] flex items-center justify-center px-6">
            <Reveal amount={0.4}>
              <p className="text-[clamp(28px,5vw,64px)] font-medium tracking-[-0.02em] text-center max-w-4xl leading-[1.15] text-white">
                {text}
              </p>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Desktop: pinned, cross-faded, exactly one statement visible at a time. */}
      <div ref={wrapperRef} className="hidden lg:block relative min-h-screen">
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="relative w-full max-w-4xl h-[1.6em] flex items-center justify-center">
            {ABOUT_STATEMENTS.map((text, i) => (
              <p
                key={text}
                ref={(el) => {
                  statementRefs.current[i] = el;
                }}
                className="absolute inset-0 flex items-center justify-center text-[clamp(28px,5vw,64px)] font-medium tracking-[-0.02em] text-center leading-[1.15] text-white"
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
