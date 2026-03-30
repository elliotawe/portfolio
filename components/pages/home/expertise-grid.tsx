"use client";

import { motion } from "motion/react";
import { Code2, BrainCircuit, Layout, Database } from "lucide-react";

const expertise = [
    {
        title: "AI Engineering",
        description: "Building intelligent agents, fine-tuning LLMs, and integrating Azure AI Foundry into production apps.",
        icon: BrainCircuit,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "Frontend Excellence",
        description: "Crafting pixel-perfect, high-performance interfaces with React, Next.js, and Framer Motion.",
        icon: Layout,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        title: "Full-Stack Systems",
        description: "Designing scalable backends with Node.js and Laravel, ensuring seamless data flow and security.",
        icon: Code2,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
    },
    {
        title: "Data Architecture",
        description: "Optimizing database schemas and implementing real-time data pipelines for modern web apps.",
        icon: Database,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
];

export function ExpertiseGrid() {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Core Expertise</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Deep technical knowledge meets creative problem-solving across the entire stack.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {expertise.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="group p-8 rounded-3xl border border-border/50 bg-card hover:bg-accent/5 hover:border-accent/50 transition-all duration-300"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}>
                            <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
