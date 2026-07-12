"use client";

import { MotionConfig } from "motion/react";
import { LenisProvider } from "@/components/lenis-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { FloatingNav } from "@/components/floating-nav";
import { Hero } from "@/components/sections/hero";
import { Awe } from "@/components/sections/awe";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { WorkCta } from "@/components/sections/work-cta";
import { Timeline } from "@/components/sections/timeline";
import { Philosophy } from "@/components/sections/philosophy";
import { Terminal } from "@/components/sections/terminal";
import { Contact } from "@/components/sections/contact";

export default function PortfolioV3() {
  return (
    <MotionConfig reducedMotion="user">
      <LenisProvider>
        <div className="bg-background text-foreground antialiased overflow-x-hidden cursor-default">
          <CustomCursor />
          <FloatingNav />
          <main>
            <Hero />
            <Awe />
            <About />
            <Skills />
            <Projects />
            <WorkCta />
            <Timeline />
            <Philosophy />
            <Terminal />
            <Contact />
          </main>
        </div>
      </LenisProvider>
    </MotionConfig>
  );
}
