"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { EASE } from "@/animations/gsap";
import { Reveal } from "@/animations/reveal";
import { SKILL_TAGS } from "@/constants/content";

function SkillCloud({ onSelect }: { onSelect: (tag: string | null) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -10% 0px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (tag: string) => {
    const next = selected === tag ? null : tag;
    setSelected(next);
    onSelect(next);
  };

  return (
    <div
      ref={ref}
      className="flex flex-wrap justify-center gap-x-3 gap-y-4 md:gap-x-5 md:gap-y-6 max-w-4xl mx-auto"
    >
      {SKILL_TAGS.map((tag, i) => {
        const isHovered = hovered === tag;
        const isSelected = selected === tag;
        return (
          <motion.button
            key={tag}
            data-cursor-hover
            onMouseEnter={() => setHovered(tag)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(tag)}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: (i % 8) * 0.04 }}
            className={`font-mono text-sm md:text-base px-1 transition-all duration-200 ${
              isSelected
                ? "text-(--color-accent) scale-110"
                : isHovered
                ? "text-white scale-110"
                : "text-white/40 scale-100"
            }`}
          >
            {tag}
          </motion.button>
        );
      })}
    </div>
  );
}

export function Skills() {
  const [filter, setFilter] = useState<string | null>(null);

  return (
    <section className="py-32 px-6">
      <Reveal>
        <h2 className="text-center text-xs tracking-[0.2em] uppercase text-white/30 mb-16">Toolset</h2>
      </Reveal>
      <SkillCloud onSelect={setFilter} />
      <AnimatePresence>
        {filter && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center mt-10"
          >
            <a
              href="#work"
              className="text-sm text-white/50 hover:text-(--color-accent) transition-colors duration-200"
            >
              Showing projects using {filter} — jump to work ↓
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
