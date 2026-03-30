"use client";

import { motion } from "motion/react";
import { projects } from "@/lib/projects";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Code2, BrainCircuit } from "lucide-react";

export function ProjectGallery() {
    const featured = projects.filter(p => p.featured).slice(0, 4);

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Recent Work</h2>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        A selection of projects where I've blended engineering and intelligence to solve real-world problems.
                    </p>
                </div>
                <Link href="/projects">
                    <button className="group flex items-center gap-2 px-6 py-3 rounded-full glass border-border hover:border-accent/50 transition-all font-medium text-sm">
                        View All Projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
                {/* Large Feature 1 */}
                <BentoCard
                    project={featured[0]}
                    className="md:col-span-8 md:row-span-2"
                    delay={0}
                />

                {/* Smaller Feature 2 */}
                <BentoCard
                    project={featured[1]}
                    className="md:col-span-4 md:row-span-1"
                    delay={0.1}
                    compact
                />

                {/* Smaller Feature 3 */}
                <BentoCard
                    project={featured[2]}
                    className="md:col-span-4 md:row-span-2"
                    delay={0.2}
                />

                {/* Feature 4 */}
                <BentoCard
                    project={featured[3]}
                    className="md:col-span-8 md:row-span-1"
                    delay={0.3}
                    compact
                />
            </div>
        </section>
    );
}

function BentoCard({ project, className, delay, compact = false }: any) {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            className={`group relative rounded-4xl overflow-hidden glass border-border/50 hover:border-accent/50 transition-all duration-500 ${className}`}
        >
            <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10" />

            {/* Background Graphic/Thumbnail */}
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent z-1" />
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-500"
                />
            </div>

            <div className="absolute inset-x-8 bottom-8 z-2 space-y-3">
                <div className="flex flex-wrap gap-2">
                    {project.category === "AI" ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider border border-accent/20">
                            <BrainCircuit size={10} /> {project.category}
                        </div>
                    ) : (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-wider border border-border">
                            <Code2 size={10} /> {project.category}
                        </div>
                    )}
                </div>

                <h3 className={`font-bold tracking-tight text-foreground transition-all duration-300 group-hover:text-accent ${compact ? "text-xl" : "text-3xl"}`}>
                    {project.title}
                </h3>

                {!compact && (
                    <p className="text-muted-foreground text-sm line-clamp-2 max-w-sm group-hover:text-foreground transition-colors">
                        {project.description}
                    </p>
                )}

                <div className="pt-2 flex items-center gap-2 text-accent text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0">
                    Explore Case Study <ArrowUpRight size={14} />
                </div>
            </div>
        </motion.div>
    );
}
