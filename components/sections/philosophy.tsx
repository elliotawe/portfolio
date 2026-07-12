"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/animations/gsap";
import { PHILOSOPHY_WORDS } from "@/constants/content";
import { PhilosophyBackdrop, type PhilosophyBackdropHandle } from "@/components/sections/philosophy-backdrop";

export function Philosophy() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const backdropRef = useRef<PhilosophyBackdropHandle>(null);

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

        if (reduceMotion) {
          gsap.set(wordRefs.current, { opacity: 1 });
          backdropRef.current?.setProgress(1);
          return;
        }

        gsap.set(wordRefs.current, { opacity: 0.08 });

        if (isDesktop) {
          gsap.to(wordRefs.current, {
            opacity: 1,
            stagger: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: "+=150%",
              scrub: 0.6,
              pin: true,
              refreshPriority: 2,
              invalidateOnRefresh: true,
              // The radiating backdrop tracks the same scrub progress as
              // the word-brighten, so the whole section reads as one
              // choreographed reveal instead of a text animation with a
              // separately-looping background behind it.
              onUpdate: (self) => backdropRef.current?.setProgress(self.progress),
            },
          });
        } else {
          const tween = gsap.to(wordRefs.current, {
            opacity: 1,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
              refreshPriority: 2,
            },
          });
          // Not scroll-scrubbed on mobile, so mirror the tween's own
          // playhead progress instead — same crescendo, timed to the
          // entrance rather than scroll position.
          tween.eventCallback("onUpdate", () => backdropRef.current?.setProgress(tween.progress()));
        }
      },
      wrapperRef
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="relative min-h-[70vh] lg:min-h-screen" ref={wrapperRef}>
      <PhilosophyBackdrop ref={backdropRef} />
      <div className="absolute inset-0 flex items-center justify-center px-6 py-24">
        <p className="text-[clamp(28px,5.5vw,72px)] font-medium tracking-[-0.02em] leading-[1.2] text-center max-w-5xl">
          {PHILOSOPHY_WORDS.map((word, i) => (
            <span
              key={i}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className="inline-block mr-[0.25em] text-white"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
