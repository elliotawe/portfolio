"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Sparkles, Code2, BrainCircuit, ArrowLeft } from "lucide-react"

import { useEffect, useState } from "react"

export default function AboutPage() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-foreground">
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        {/* Header */}
        <header className="py-12 sm:py-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Link href="/" className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors">
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <h1 className="text-4xl sm:text-7xl font-bold tracking-tighter">About <span className="text-accent italic">Me</span></h1>
          </motion.div>
        </header>

        <div className="space-y-24 pb-24">
          {/* Bio Section */}
          <motion.section
            {...fadeIn}
            className="border-b border-border pb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                <p className="text-xl sm:text-2xl font-medium leading-tight">
                  I am a Full-Stack & AI Engineer obsessed with the intersection of scalable systems and intelligent automation.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Based in Accra, Ghana, I serve as a co-organizer for <b>Global AI Accra</b>, helping bridge the gap between local enterprise needs and global AI advancements. My engineering background is rooted in full-stack excellence (Next.js, Laravel, Node.js), but my heart lies in building systems that can "think"—deploying LLMs, building vector-driven RAG systems, and automating high-value business logic.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether it's a real-time IoT dashboard for government portals or an AI-driven trend discovery engine, I build for impact first. I believe that engineering is a vessel for solving human problems, and I use the most efficient tools—from Remix to Supabase—to make that happen.
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-6 glass rounded-3xl border-accent/20 space-y-4">
                  <div className="text-xs font-mono text-accent uppercase font-bold tracking-widest">Available For</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" /> AI Strategy & Integration
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" /> Full-Stack Architecture
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" /> Custom Automation R&D
                    </li>
                  </ul>
                  <Link href="mailto:elliotawe@outlook.com" className="block">
                    <button className="w-full h-12 rounded-full bg-foreground text-background text-sm font-bold hover:opacity-90 transition-opacity">
                      Secure a Contract
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Expertise Section */}
          <motion.section
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="border-b border-border pb-20"
          >
            <div className="space-y-12">
              <h2 className="text-3xl font-bold tracking-tight">Core Expertise</h2>
              <div className="grid sm:grid-cols-2 gap-12">
                <ExpertiseCard
                  title="Full-Stack Development"
                  description="Scaling applications with Laravel, PHP, Node.js and modern React frameworks (Next.js, Remix). I handle everything from database schema design to real-time sync."
                  icon={<Code2 className="text-blue-500" size={24} />}
                />
                <ExpertiseCard
                  title="AI Engineering"
                  description="Leveraging LLMs, Vector Databases (Supabase, Pinecone), and agentic workflows to build features that solve complex data problems automatically."
                  icon={<BrainCircuit className="text-accent" size={24} />}
                />
                <ExpertiseCard
                  title="IoT & Real-Time"
                  description="Building low-latency dashboards that transform live sensor data into actionable business intelligence for enterprise and government clients."
                  icon={<Sparkles className="text-amber-500" size={24} />}
                />
                <ExpertiseCard
                  title="Automation Architecture"
                  description="Designing custom R&D pipelines that remove manual overhead from business processes, increasing productivity by orders of magnitude."
                  icon={<Sparkles className="text-emerald-500" size={24} />}
                />
              </div>
            </div>
          </motion.section>

          {/* Philosophy Section */}
          <motion.section
            {...fadeIn}
            transition={{ delay: 0.3 }}
            className="space-y-8 max-w-2xl"
          >
            <h2 className="text-3xl font-bold tracking-tight italic text-accent">The Invisible Engineer</h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                The best technology is the one you don't have to notice. My design philosophy revolves around high-utility simplicity. I believe that an interface should be so intuitive that it disappears, leaving the user alone with their goals.
              </p>
              <blockquote className="border-l-2 border-accent pl-6 py-2 italic text-2xl text-foreground font-light leading-snug">
                "Engineering is not about the code we write, but the frictionless value we deliver to the end user."
              </blockquote>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I approach every project with a dual-focus: <b>reliability</b> and <b>delight</b>. Reliability ensures the system never fails the user's trust, and delight ensures they enjoy the interaction.
              </p>
            </div>
          </motion.section>

          {/* Final CTA */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-12 glass rounded-[3rem] text-center space-y-8 border-accent/20"
          >
            <h2 className="text-4xl font-bold tracking-tight">Ready to build for <span className="text-accent">impact</span>?</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              I'm currently accepting selective contract opportunities for AI integration
              and full-stack system architecture.
            </p>
            <Link href="mailto:elliotawe@outlook.com">
              <button className="h-14 px-12 rounded-full bg-accent text-accent-foreground font-bold hover:opacity-90 transition-all shadow-xl shadow-accent/20">
                Start a Conversation
              </button>
            </Link>
          </motion.section>
        </div>

        {/* Footer */}
        <footer className="py-12 border-t border-border/50 text-center text-muted-foreground text-sm">
          © 2025 Elliot Awe. Accra, Ghana.
        </footer>
      </main>
    </div>
  )
}

function ExpertiseCard({ title, description, icon }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
