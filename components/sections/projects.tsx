"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { X } from "lucide-react";
import { EASE, gsap, ScrollTrigger } from "@/animations/gsap";
import { ChromeDots } from "@/components/chrome-dots";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useWindowTilt } from "@/hooks/use-window-tilt";
import { HOME_PROJECTS } from "@/constants/content";
import type { HomeProject } from "@/types";

/** The address bar is functional, not decorative — it shows the project's
 *  real destination. Falls back to a sane label for the two links that
 *  don't have a live site yet. */
function addressFor(project: HomeProject) {
  if (project.href === "#") return `localhost/${project.slug}`;
  try {
    return new URL(project.href).hostname;
  } catch {
    return project.slug;
  }
}

// Deterministic per-index scatter — alternating sign, varied magnitude and
// vertical offset, so windows read as left open on a desk rather than a
// grid, without random values that would mismatch between server and client.
// Applied as a transform (not margin), so it never disturbs the CSS Grid's
// row tracks — cards float in place without dragging neighbours out of row.
const REST_ROTATION = [-1.5, 2, -2.2, 1.2, 1.8, -1, 2.4];
const FLOAT_OFFSET = [0, 22, 12, 26, 8, 18, 0];

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: HomeProject;
  index: number;
  onOpen: (p: HomeProject) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const restRotation = REST_ROTATION[index % REST_ROTATION.length];
  const { ref: tiltRef, onMouseMove, onMouseEnter, onMouseLeave } = useWindowTilt(reduced, restRotation);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const floatOffset = FLOAT_OFFSET[index % FLOAT_OFFSET.length];

  useEffect(() => {
    if (reduced || !parallaxRef.current) return;
    const ctx = gsap.context(() => {
      // Rest position starts at the card's float offset, then the scroll
      // parallax nudges relative to that — both live on the same GSAP-tracked
      // `y`, so they compose instead of one clobbering the other.
      gsap.set(parallaxRef.current, { y: floatOffset });
      gsap.to(parallaxRef.current, {
        y: `+=${index % 3 === 1 ? -26 : index % 3 === 2 ? -14 : -8}`,
        ease: "none",
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          refreshPriority: 5,
          invalidateOnRefresh: true,
        },
      });
    }, parallaxRef);
    return () => ctx.revert();
  }, [reduced, index, floatOffset]);

  return (
    <div ref={parallaxRef}>
      <button
        data-reveal-card
        data-cursor-hover
        onClick={() => onOpen(project)}
        className="text-left group w-full block"
        style={{ transform: reduced ? `rotate(${restRotation}deg)` : undefined }}
      >
        <div
          ref={tiltRef}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="rounded-xl overflow-hidden bg-card border border-white/10 will-change-transform shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] group-hover:border-white/20 transition-colors duration-300"
        >
          <motion.div
            layoutId={`project-chrome-${project.slug}`}
            className="flex items-center gap-3 px-3.5 py-2.5 border-b border-white/10 bg-white/2"
          >
            <ChromeDots />
            <span className="font-mono text-[11px] text-white/35 truncate group-hover:text-white/55 transition-colors duration-300">
              {addressFor(project)}
            </span>
          </motion.div>
          <motion.div
            layoutId={`project-media-${project.slug}`}
            className="relative w-full aspect-4/3 bg-white/2"
          >
            <Image
              src={project.img}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </motion.div>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <h3 className="text-base font-medium text-white group-hover:text-(--color-accent) transition-colors duration-200">
            {project.title}
          </h3>
        </div>
        <p className="mt-1 text-xs text-white/35 font-mono">{project.tags.join(" · ")}</p>
      </button>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: HomeProject | null; onClose: () => void }) {
  const [mediaReady, setMediaReady] = useState(false);

  useEffect(() => {
    if (!project) {
      setMediaReady(false);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    let fallback: ReturnType<typeof setTimeout> | undefined;
    if (!project.video) {
      fallback = setTimeout(() => setMediaReady(true), 500);
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (fallback) clearTimeout(fallback);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-90 bg-black/95 backdrop-blur-sm flex flex-col"
        >
          <motion.div
            layoutId={`project-chrome-${project.slug}`}
            className="flex items-center gap-3 px-5 py-3.5 border-b border-white/10 bg-white/2 shrink-0"
          >
            <ChromeDots />
            <span className="font-mono text-xs text-white/50 truncate">{addressFor(project)}</span>
            <button
              onClick={onClose}
              data-cursor-hover
              aria-label="Close"
              className="ml-auto p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </motion.div>

          <div className="relative flex-1 overflow-y-auto">
            <motion.div
              layoutId={`project-media-${project.slug}`}
              className="relative w-full aspect-video max-h-[70vh]"
            >
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onPlaying={() => setMediaReady(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <motion.div
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <Image src={project.img} alt={project.title} fill className="object-cover object-top" />
                </motion.div>
              )}
            </motion.div>

            {/* Terminal-style panel: slides up once the media has had a beat
                to "load", matching the site's terminal-window signature. */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={mediaReady ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
              className="max-w-3xl mx-auto px-6 py-12 md:py-16"
            >
              <div className="rounded-xl bg-white/2 border border-white/10 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <ChromeDots />
                  <span className="font-mono text-[11px] text-white/30 ml-1">description.txt</span>
                </div>
                <div className="p-6 font-mono text-sm">
                  <h2 className="font-sans text-2xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                    {project.title}
                  </h2>

                  {project.desc && (
                    <p className="font-sans text-white/60 text-sm md:text-base leading-relaxed mb-6">
                      {project.desc}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-white/50 border border-white/10 rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.outcome && (
                    <p className="text-xs text-(--color-accent) mb-6">$ {project.outcome}</p>
                  )}

                  {project.href !== "#" && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener"
                      data-cursor-hover
                      className="font-sans inline-flex items-center gap-2 text-sm text-white border-b border-white/40 pb-1 hover:border-(--color-accent) hover:text-(--color-accent) transition-colors duration-200"
                    >
                      Visit live project →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Projects() {
  const [active, setActive] = useState<HomeProject | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !sectionRef.current || !headingRef.current || !gridRef.current) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-reveal-card]", gridRef.current);

    const mm = gsap.matchMedia();

    // matchMedia already creates and reverts its own context per condition —
    // no need to nest a separate gsap.context() inside each handler.
    mm.add("(min-width: 768px)", () => {
      gsap.set(headingRef.current, { y: "38vh", scale: 1.4, transformOrigin: "left top" });
      gsap.set(cards, { autoAlpha: 0, x: 140, y: 90, rotate: 8, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${175 + cards.length * 60}%`,
          scrub: 1,
          pin: true,
          refreshPriority: 4,
          invalidateOnRefresh: true,
        },
      });

      tl.to(headingRef.current, { y: 0, scale: 1, duration: 1, ease: "power2.out" });

      cards.forEach((card, i) => {
        const restRotation = REST_ROTATION[i % REST_ROTATION.length];
        tl.to(card, {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotate: restRotation,
          scale: 1,
          duration: 1,
          ease: "power4.out",
        });
      });
    });

    // Mobile: skip the pin/scrub — a pinned scroll-hijack doesn't suit a
    // touch viewport here. Fall back to the simpler batched entrance.
    mm.add("(max-width: 767px)", () => {
      gsap.set(cards, { autoAlpha: 0, x: 140, y: 90, rotate: 8, scale: 0.92 });
      const triggers = ScrollTrigger.batch(cards, {
        start: "top 88%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
          }),
        once: true,
      });
      return () => triggers.forEach((t) => t.kill());
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section id="work" ref={sectionRef} className="py-32 px-6 max-w-6xl mx-auto">
      <div ref={headingRef}>
        <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">Work</p>
        <h2 className="text-[clamp(32px,5vw,56px)] font-semibold tracking-tight text-white mb-16">
          Selected projects
        </h2>
      </div>
      {/* Real grid, not CSS columns — columns fill top-to-bottom per column
          (1,4,7 / 2,5,8 / 3,6,9), which reads as randomly stacked. Grid's
          row-major auto-flow keeps cards in true reading order (1,2,3 /
          4,5,6) at every breakpoint; each card's float/tilt personality
          comes from a transform now, so it never disturbs row alignment. */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 items-start">
        {HOME_PROJECTS.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} onOpen={setActive} />
        ))}
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
