"use client";

import { useEffect, useRef } from "react";
import { BookOpen, Hammer, Briefcase, TrendingUp, Rocket, type LucideIcon } from "lucide-react";
import { gsap } from "@/animations/gsap";
import { Reveal } from "@/animations/reveal";
import { TIMELINE_ITEMS } from "@/constants/content";

// One icon per beat of the story — a small visual anchor above each year,
// same idea as the reference gif: icon, then a dot on a horizontal line,
// then the label underneath. Kept local to this component (not
// constants.ts) so the data file stays framework/icon-agnostic.
const ICONS: LucideIcon[] = [BookOpen, Hammer, Briefcase, TrendingUp, Rocket];

// The dot sits where the icon badge (h-16 = 64px) plus its bottom margin
// (mb-6 = 24px) end, offset by half the dot's own height (h-3 = 12px).
// Hardcoded because every item shares identical badge/gap sizing, so the
// line only has to be told once where that seam falls.
const LINE_TOP = 64 + 24 + 6;

// GSAP's color tweens parse the target string directly (hex/rgb/hsl) rather
// than resolving CSS custom properties, so `var(--color-accent)` can't be
// used as a tween value — the literal hex (matches --color-accent in
// globals.css) is needed here even though Tailwind classes elsewhere use
// the CSS variable form.
const ACCENT = "#2f6fff";

export function Timeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ringRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const n = TIMELINE_ITEMS.length;
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
          gsap.set(iconRefs.current, { scale: 1, borderColor: "rgba(255,255,255,0.15)" });
          gsap.set(dotRefs.current, { scale: 1, backgroundColor: ACCENT });
          gsap.set(textRefs.current, { autoAlpha: 1, y: 0 });
          gsap.set(lineRef.current, { scaleX: 1 });
          return;
        }

        // Rest state: each stop starts dim/small and "activates" — icon pops
        // with a slight overshoot, dot fills and pings, label brightens —
        // as the connecting line's continuous draw reaches it.
        gsap.set(iconRefs.current, {
          scale: 0.82,
          borderColor: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.3)",
        });
        gsap.set(dotRefs.current, { scale: 0.6, backgroundColor: "rgba(255,255,255,0.15)" });
        gsap.set(ringRefs.current, { scale: 1, autoAlpha: 0 });
        gsap.set(textRefs.current, { autoAlpha: 0.25, y: 10 });
        gsap.set(lineRef.current, { scaleX: 0 });
        gsap.set(glowRef.current, { autoAlpha: isDesktop ? 1 : 0 });

        const tl = gsap.timeline({
          scrollTrigger: isDesktop
            ? {
                trigger: wrapperRef.current,
                start: "top top",
                end: `+=${n * 70}%`,
                scrub: 0.6,
                pin: true,
                refreshPriority: 3,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  gsap.set(glowRef.current, { left: `${self.progress * 100}%` });
                },
              }
            : {
                trigger: wrapperRef.current,
                start: "top 75%",
                end: "bottom 60%",
                scrub: 0.6,
                refreshPriority: 3,
              },
        });

        // Continuous draw across the whole sequence, in lockstep with
        // whichever ScrollTrigger drives this timeline above.
        tl.to(lineRef.current, { scaleX: 1, ease: "none", duration: n }, 0);

        TIMELINE_ITEMS.forEach((_, i) => {
          const beat = i; // one beat per item, evenly spaced along the tl
          tl.to(
            iconRefs.current[i],
            { scale: 1, borderColor: ACCENT, color: ACCENT, duration: 0.4, ease: "back.out(2.4)" },
            beat
          )
            .to(dotRefs.current[i], { scale: 1.3, backgroundColor: ACCENT, duration: 0.3, ease: "power2.out" }, beat)
            .to(dotRefs.current[i], { scale: 1, duration: 0.3, ease: "power2.out" }, beat + 0.3)
            .fromTo(
              ringRefs.current[i],
              { scale: 1, autoAlpha: 0.55 },
              { scale: 2.6, autoAlpha: 0, duration: 0.7, ease: "power2.out" },
              beat
            )
            .to(textRefs.current[i], { autoAlpha: 1, y: 0, duration: 0.4, ease: "power3.out" }, beat + 0.05);
        });
      },
      wrapperRef
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative min-h-[70vh] lg:min-h-screen py-32 lg:py-0 overflow-x-auto lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="lg:absolute lg:inset-0 flex lg:flex-col items-center justify-center px-6">
        <Reveal>
          <h2 className="text-xs tracking-[0.2em] uppercase text-white/30 mb-16 lg:mb-24 text-center">Timeline</h2>
        </Reveal>

        <div className="relative flex min-w-[720px] lg:min-w-0 lg:w-full lg:max-w-5xl px-4">
          <div className="absolute left-4 right-4 h-px bg-white/10" style={{ top: LINE_TOP }} />
          <div
            ref={lineRef}
            style={{ top: LINE_TOP, transformOrigin: "left" }}
            className="absolute left-4 right-4 h-px bg-(--color-accent) origin-left"
          />
          <div
            ref={glowRef}
            style={{ top: LINE_TOP }}
            className="absolute w-28 h-28 -ml-14 -mt-14 rounded-full bg-(--color-accent)/40 blur-[40px] pointer-events-none"
          />

          {TIMELINE_ITEMS.map(({ year, label }, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={year} className="relative flex-1 flex flex-col items-center text-center">
                <div
                  ref={(el) => {
                    iconRefs.current[i] = el;
                  }}
                  className="w-16 h-16 mb-6 rounded-2xl border bg-white/[0.03] flex items-center justify-center"
                >
                  <Icon size={24} strokeWidth={1.6} />
                </div>

                <span className="relative flex items-center justify-center mb-6">
                  <span
                    ref={(el) => {
                      ringRefs.current[i] = el;
                    }}
                    className="absolute w-3 h-3 rounded-full border border-(--color-accent)"
                  />
                  <span
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    className="w-3 h-3 rounded-full"
                  />
                </span>

                <div
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                >
                  <div className="font-mono text-xs text-white/40">{year}</div>
                  <div className="text-lg lg:text-2xl font-semibold text-white tracking-tight mt-1">{label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
