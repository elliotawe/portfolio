"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Brain, Sparkles } from "lucide-react";
import { EASE, gsap, ScrollTrigger } from "@/animations/gsap";
import { ChromeDots } from "@/components/chrome-dots";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const STEPS = [
  { label: "Data Ingestion", content: "Processing unstructured vectors..." },
  { label: "Vector Embedding", content: "Generating high-dimensional representations..." },
  { label: "Model Inference", content: "Optimizing for low-latency response..." },
  { label: "Result Synthesis", content: "Grounding output in factual data..." },
];

export function Terminal() {
  const [activeStep, setActiveStep] = useState(0);
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const colRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Cinematic entrance: the text column rises in while the terminal panel
  // slides in diagonally from the opposite corner, echoing the Projects
  // cards' "slid into place" signature rather than a plain fade.
  useEffect(() => {
    if (reduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.set(colRef.current, { autoAlpha: 0, y: 40 });
      gsap.set(panelRef.current, { autoAlpha: 0, x: 90, y: 50, rotate: -4, scale: 0.94 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true, refreshPriority: 1 },
      });
      tl.to(colRef.current, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out" }).to(
        panelRef.current,
        { autoAlpha: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 1, ease: "power4.out" },
        "-=0.6"
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={colRef} className="space-y-8">
          <div className="inline-flex items-center gap-2 text-(--color-accent) font-mono text-xs tracking-[0.2em] uppercase">
            <Sparkles size={14} />
            AI Experiment
          </div>
          <h2 className="text-[clamp(32px,5vw,48px)] font-semibold tracking-tight text-white">
            Bridging logic and <span className="text-(--color-accent) italic">intelligence</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-md">
            I don&apos;t just &ldquo;use&rdquo; AI, I build with it. From vector databases to custom agent
            architectures, I focus on systems that are reliable, ethical, and fast.
          </p>

          <div className="space-y-3 min-h-[340px]">
            {STEPS.map((step, i) => (
              <motion.div
                layout
                key={step.label}
                className={`p-4 rounded-xl border transition-colors duration-500 ${
                  i === activeStep ? "bg-white/2 border-white/15" : "border-transparent opacity-40"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${i === activeStep ? "bg-(--color-accent) animate-pulse" : "bg-white/30"}`}
                    />
                    <span className="font-medium text-white text-sm">{step.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider">
                    {i === activeStep ? "Active" : "Stable"}
                  </span>
                </div>
                {/* Fixed-height reserved slot for every step (not just the active
                    one) — only opacity toggles, so this never reflows the
                    document. A height-animated mount/unmount here would drift
                    every ScrollTrigger position below this section on each
                    3s cycle, since ScrollTrigger doesn't watch DOM resizes. */}
                <p
                  className={`text-xs text-(--color-accent) mt-2 font-mono pl-4 h-8 transition-opacity duration-400 ${
                    i === activeStep ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {step.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div ref={panelRef} className="relative">
          <div className="absolute inset-0 bg-accent/10 rounded-full blur-[100px] -z-10" />
          <div className="rounded-xl bg-white/2 border border-white/10 overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)]">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <ChromeDots />
              <span className="font-mono text-[11px] text-white/35 ml-1">agent_obsidian.log</span>
            </div>
            <div className="p-6 font-mono text-xs space-y-2 min-h-80">
              <p className="text-white/30">{"$ antigravity --init portfolio"}</p>
              <p className="text-white/60">{"[SYSTEM] Initializing intelligent agent bridge..."}</p>
              <p className="text-white/60">{"[DATA] Loading vector store: 1,420 dimensions"}</p>
              <p className="text-white">{"[AGENT] Searching for connections between 'Frontend' and 'AI'..."}</p>
              <div className="min-h-16 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-accent"
                  >
                    {`>> Analysis in progress: ${STEPS[activeStep].content}`}
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="text-white/30">{"[LOG] Memory usage: 124MB | Latency: 42ms"}</p>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 bg-(--color-accent) rounded-full animate-bounce" />
                <div className="h-1 w-1 bg-(--color-accent) rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="h-1 w-1 bg-(--color-accent) rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>

            <div className="absolute bottom-6 right-6 w-16 h-16 md:w-20 md:h-20 bg-accent/15 rounded-full flex items-center justify-center border border-accent/25 animate-spin-slow">
              <Brain className="text-(--color-accent) w-6 h-6 md:w-8 md:h-8 -rotate-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
