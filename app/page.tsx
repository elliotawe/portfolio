"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/pages/home/hero";
import { ExpertiseGrid } from "@/components/pages/home/expertise-grid";
import { ProjectGallery } from "@/components/pages/home/project-gallery";
import { AIShowcase } from "@/components/pages/home/ai-showcase";
import Link from "next/link";
import Image from "next/image";
import { Mail, Moon, Sun, Sparkles, Code2 } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-foreground">
      {/* Header / Nav */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass py-4" : "py-8"}`}>
        <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            EA<span className="text-accent">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#work" className="hover:text-accent transition-colors">Work</Link>
            <Link href="#expertise" className="hover:text-accent transition-colors">Expertise</Link>
            <Link href="#about" className="hover:text-accent transition-colors">About</Link>
            <Link href="#contact" className="hover:text-accent transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link href="mailto:elliotawe@outlook.com">
              <button className="hidden sm:block px-5 py-2 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
                Resume
              </button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <Hero />

        <section id="expertise">
          <ExpertiseGrid />
        </section>

        <section id="ai-spotlight">
          <AIShowcase />
        </section>

        <section id="work" className="overflow-hidden">
          <ProjectGallery />
        </section>

        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-accent font-mono text-xs tracking-widest uppercase">
                Philosophy & Story
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Architecting with <br /><span className="text-accent italic">Purpose</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I bridge the gap between complex AI logic and intuitive user experiences.
                My philosophy is simple: engineering should be invisible, and intelligence should be useful.
                I don't just build features; I solve bottlenecks.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0 border border-accent/20">
                    <Sparkles size={18} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold">AI-First Mentality</h4>
                    <p className="text-sm text-muted-foreground">Integrating intelligence at the core, not as an afterthought.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center shrink-0 border border-blue-500/20">
                    <Code2 size={18} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-bold">Technical Precision</h4>
                    <p className="text-sm text-muted-foreground">Clean, scalable architectures that perform under pressure.</p>
                  </div>
                </div>
              </div>
              <Link href="/about">
                <button className="h-12 px-8 rounded-full bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
                  Learn more about my philosophy
                </button>
              </Link>
            </div>

            {/* <div className="relative aspect-square max-w-md mx-auto group"> */}
            {/* Decorative background glow */}
            {/* <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse" /> */}

            <div className="glass rounded-[3rem] w-full h-full p-4 border-border/50 rotate-3 transition-transform hover:rotate-0 duration-700 relative z-10">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                <Image
                  src="/portrait.jpeg"
                  alt="Elliot Awe Portrait"
                  fill
                  className="object-cover  object-top grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  priority
                />
                {/* Subtle glass overlay for depth */}
                <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent pointer-events-none" />
              </div>
            </div>
            {/* </div> */}
          </div>
        </section>

        <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Let's build something <br /> <span className="text-accent italic">remarkable</span> together.</h2>
          <p className="text-xl text-muted-foreground">
            I'm currently open to new opportunities and interesting projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="mailto:elliotawe@outlook.com">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full">
                Get in Touch
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-muted-foreground text-sm">
            © 2025 Elliot Awe. Built with intention.
          </div>

          <div className="flex items-center gap-6">
            <Link href="https://github.com/elliotawe" target="_blank" className="hover:text-accent transition-colors">
              <IconBrandGithub size={20} />
            </Link>
            <Link href="https://linkedin.com/in/elliot-awe" target="_blank" className="hover:text-accent transition-colors">
              <IconBrandLinkedin size={20} />
            </Link>
            <Link href="https://x.com/elliot_awe" target="_blank" className="hover:text-accent transition-colors">
              <IconBrandTwitter size={20} />
            </Link>
            <Link href="mailto:elliotawe@outlook.com" className="hover:text-accent transition-colors">
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </footer>

      {/* Decorative gradient for the bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none -z-10" />
    </div>
  );
}

// Inline Button component since it matches the look but avoids extra file overhead for now
function Button({ children, className = "", variant = "primary", size = "md" }: any) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 active:scale-95";
  const variants: any = {
    primary: "bg-foreground text-background hover:opacity-90",
    outline: "border border-border hover:bg-muted text-foreground",
    ghost: "hover:bg-muted text-foreground"
  };
  const sizes: any = {
    md: "h-11 px-6 rounded-full text-base",
    lg: "h-14 px-10 rounded-full text-lg"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
}
