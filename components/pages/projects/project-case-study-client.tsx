"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Code2, Sparkles, BrainCircuit } from "lucide-react";

export function ProjectCaseStudyClient({ project }: { project: any }) {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-foreground">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass py-4">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link href="/projects" className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                        <ArrowLeft size={16} /> All Projects
                    </Link>
                    <div className="text-xl font-bold tracking-tighter">
                        EA<span className="text-accent">.</span>
                    </div>
                    <Link href="/#connect" className="text-sm font-medium hover:text-accent transition-colors">
                        Hire Me
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
                {/* Hero Section */}
                <section className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2 text-accent font-mono text-xs tracking-widest uppercase">
                            {project.category === "AI" ? <BrainCircuit size={14} /> : <Code2 size={14} />}
                            {project.category} CASE STUDY
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                            {project.description}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="aspect-video rounded-3xl overflow-hidden glass border-border p-1"
                    >
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover rounded-[inherit] grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>
                </section>

                {/* Project Meta */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border/50">
                    <div>
                        <div className="text-xs font-mono text-muted-foreground uppercase mb-2">Impact</div>
                        <div className="text-sm font-medium">{project.impact}</div>
                    </div>
                    <div>
                        <div className="text-xs font-mono text-muted-foreground uppercase mb-2">Technologies</div>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag: string) => (
                                <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted border border-border">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-mono text-muted-foreground uppercase mb-2">Role</div>
                        <div className="text-sm font-medium">Lead Engineer</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link href={project.link} target="_blank" className="flex items-center gap-2 text-accent text-sm font-bold hover:gap-3 transition-all">
                            Live Project <ExternalLink size={14} />
                        </Link>
                        {project.github && (
                            <Link href={project.github} target="_blank" className="flex items-center gap-2 text-muted-foreground text-sm font-bold hover:text-foreground transition-all">
                                Source Code <Github size={14} />
                            </Link>
                        )}
                    </div>
                </section>

                {/* Case Study Content */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="md:col-span-2 space-y-12">
                        <CaseStudySection title="The Challenge" content={project.content.challenge} icon={<Sparkles className="text-accent" size={20} />} />
                        <CaseStudySection title="My Approach" content={project.content.approach} icon={<BrainCircuit className="text-blue-500" size={20} />} />
                        <CaseStudySection title="The Result" content={project.content.result} icon={<Code2 className="text-emerald-500" size={20} />} />
                    </div>

                    <aside className="space-y-8 h-fit md:sticky md:top-32">
                        <div className="glass p-8 rounded-3xl space-y-4">
                            <h3 className="font-bold text-lg">Tech Stack</h3>
                            <ul className="space-y-2">
                                {project.content.stack.map((s: string) => (
                                    <li key={s} className="text-sm text-muted-foreground flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-accent" /> {s}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 rounded-3xl bg-accent/5 border border-accent/20 space-y-4">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <Sparkles size={18} className="text-accent" /> Hire Elliot
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Impressed by this project? Let's build something equally impactful for your needs.
                            </p>
                            <Link href="mailto:elliotawe@outlook.com">
                                <button className="w-full h-11 rounded-full bg-accent text-accent-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                                    Let's Talk
                                </button>
                            </Link>
                        </div>
                    </aside>
                </section>
            </main>

            <footer className="py-12 border-t border-border/50 text-center text-muted-foreground text-sm">
                © 2025 Elliot Awe. Built for impact.
            </footer>
        </div>
    );
}

function CaseStudySection({ title, content, icon }: any) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3">
                {icon}
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {content}
            </p>
        </div>
    );
}
