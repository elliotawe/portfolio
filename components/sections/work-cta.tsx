"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/animations/gsap";
import { ChromeDots } from "@/components/chrome-dots";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { HOME_PROJECTS } from "@/constants/content";

/** Three faint "browser window" ghosts fanned out behind the CTA — the same
 *  chrome-window motif as the project cards above, so this reads as an
 *  extension of that grid rather than a new idea, without showing real
 *  content (they're a gesture, not a preview). */
const GHOSTS = [
  { rotate: -9, x: -520, y: -130, scale: 0.86 },
  { rotate: 8, x: 500, y: -80, scale: 0.9 },
  { rotate: -5, x: -430, y: 190, scale: 0.76 },
];

export function WorkCta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const ghostRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Base each ghost dead-center of its container (xPercent/yPercent
      // -50 self-centers regardless of the box's own size), then x/y (px)
      // fan them out from there — absolutely-positioned flex children have
      // no natural centered rest position, so this has to be explicit.
      gsap.set(ghostRefs.current, {
        autoAlpha: 0,
        scale: 0.7,
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: (i) => GHOSTS[i].y + 60,
      });
      gsap.set([eyebrowRef.current, headingRef.current, subRef.current, ctaRef.current], {
        autoAlpha: 0,
        y: 24,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
          refreshPriority: 3.5,
        },
      });

      tl.to(ghostRefs.current, {
        autoAlpha: 1,
        scale: (i) => GHOSTS[i].scale,
        x: (i) => GHOSTS[i].x,
        y: (i) => GHOSTS[i].y,
        rotate: (i) => GHOSTS[i].rotate,
        duration: 1.1,
        stagger: 0.1,
        ease: "power4.out",
      })
        .to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.7")
        .to(headingRef.current, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.45")
        .to(subRef.current, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");

      // Ghosts drift a little further apart as the section scrolls through —
      // a slow breathing parallax, not a hijack (no pin, tiny scrub range).
      ghostRefs.current.forEach((el, i) => {
        gsap.to(el, {
          y: `+=${i % 2 === 0 ? -22 : 18}`,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            refreshPriority: 3.5,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative py-40 px-6 overflow-hidden">
      {/* `isolate` forces this wrapper to establish its own stacking
          context, so the ghost windows' negative z-index below is scoped
          locally (behind the heading/CTA) instead of escaping all the way
          to the page root — where it would paint under the page's own
          opaque background and vanish entirely (z-index:auto here, without
          `isolate`, doesn't create a stacking context on its own). */}
      <div className="relative isolate max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Ghost windows sit behind the copy, absolutely centered so their
            fanned offsets read as "floating around" the statement. */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          {GHOSTS.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                ghostRefs.current[i] = el;
              }}
              className="absolute top-1/2 left-1/2 w-56 h-36 rounded-xl border border-white/[0.14] bg-white/[0.05] backdrop-blur-[1px] overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
                <ChromeDots />
              </div>
            </div>
          ))}
        </div>

        <p ref={eyebrowRef} className="text-xs tracking-[0.2em] uppercase text-white/30 mb-6 font-mono">
          {String(HOME_PROJECTS.length).padStart(2, "0")} projects — and counting
        </p>

        <h2
          ref={headingRef}
          className="text-[clamp(32px,6vw,72px)] font-semibold tracking-[-0.03em] leading-[1.1] text-white text-balance"
        >
          There&apos;s more where that came from.
        </h2>

        <p ref={subRef} className="mt-6 text-base md:text-lg text-white/50 max-w-lg text-balance">
          Full case studies, the problems behind them, and how each one got solved.
        </p>

        <Link ref={ctaRef} href="/projects" data-cursor-hover className="mt-12 group">
          <span className="inline-flex items-center gap-2 h-14 px-8 rounded-full border border-white/15 text-white text-sm font-medium group-hover:border-(--color-accent) group-hover:text-(--color-accent) transition-colors duration-300">
            View all projects
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </Link>
      </div>
    </section>
  );
}
