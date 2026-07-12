"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { EASE } from "@/animations/gsap";

/** Shared simple fade+rise reveal for content that just needs to appear once,
 *  in-view (non-scrubbed). Used for section labels, cards, and list items. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  amount = 0.3,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount, margin: "0px 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
