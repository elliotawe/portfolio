"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { EASE } from "@/animations/gsap";
import { SOCIAL_LINKS } from "@/constants/content";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
        className="text-[clamp(32px,6vw,80px)] font-semibold tracking-[-0.03em] text-white max-w-4xl leading-[1.1]"
      >
        Let's build something people remember.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="mt-12"
      >
        <Link href="mailto:elliotawe@outlook.com" data-cursor-hover>
          <span className="inline-flex items-center gap-2 h-14 px-9 rounded-full bg-(--color-accent) text-white text-sm font-medium hover:opacity-85 transition-opacity duration-200">
            Start a conversation
          </span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
        className="mt-20 flex items-center gap-6 text-white/30 text-xs"
      >
        {SOCIAL_LINKS.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener"
            data-cursor-hover
            className="hover:text-white transition-colors duration-200"
          >
            {label}
          </a>
        ))}
        <span>© 2020–2025 Elliot Awe</span>
      </motion.div>
    </section>
  );
}
