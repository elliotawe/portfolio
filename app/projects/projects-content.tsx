"use client";

import { projects } from "@/lib/projects";
import { ProjectGallery } from "@/components/pages/home/project-gallery";
import Link from "next/link";
import { ArrowLeft, BrainCircuit, Code2 } from "lucide-react";
import { motion } from "motion/react";

export default function ProjectsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-foreground">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 glass py-4">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <div className="text-xl font-bold tracking-tighter">
                        EA<span className="text-accent">.</span>
                    </div>
                    <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
                        About Me
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="max-w-2xl mb-16 space-y-6">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Archives & <br /><span className="text-accent italic">Case Studies</span></h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        A comprehensive list of my professional work, research experiments, and open-source contributions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                            className="group glass border-border/50 hover:border-accent/50 rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-500"
                        >
                            <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10" />
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="px-3 py-1 bg-background/80 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-wider border border-border">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">{project.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 pt-4">
                                    {project.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[10px] text-muted-foreground font-mono">#{tag.toLowerCase().replace(/\s/g, '')}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            <footer className="py-12 border-t border-border/50 text-center text-muted-foreground text-sm">
                © 2025 Elliot Awe. Always building.
            </footer>
        </div>
    );
}
