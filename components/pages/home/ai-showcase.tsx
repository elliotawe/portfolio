"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Brain, Sparkles, Cpu } from "lucide-react";

export function AIShowcase() {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
        { label: "Data Ingestion", status: "complete", content: "Processing unstructured vectors..." },
        { label: "Vector Embedding", status: "processing", content: "Generating high-dimensional representations..." },
        { label: "Model Inference", status: "pending", content: "Optimizing for low-latency response..." },
        { label: "Result Synthesis", status: "pending", content: "Grounding output in factual data..." },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 text-accent font-mono text-sm tracking-widest uppercase">
                        <Sparkles size={16} />
                        AI Experiment
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Bridging Logic and <br /> <span className="text-accent italic">Intelligence</span>
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        I don't just 'use' AI; I build with it. From vector databases to custom agent architectures,
                        I focus on creating systems that are reliable, ethical, and fast.
                    </p>

                    <div className="space-y-4 min-h-[380px] lg:min-h-[340px]">
                        {steps.map((step, i) => (
                            <motion.div
                                layout
                                key={step.label}
                                className={`p-4 rounded-xl border transition-all duration-500 ${i === activeStep ? "glass border-accent shadow-sm" : "border-transparent opacity-50"
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${i === activeStep ? "bg-accent animate-pulse" : "bg-muted"}`} />
                                        <span className="font-medium">{step.label}</span>
                                    </div>
                                    <span className="text-xs font-mono text-muted-foreground uppercase">{i === activeStep ? "Active" : "Stable"}</span>
                                </div>
                                <AnimatePresence mode="wait">
                                    {i === activeStep && (
                                        <motion.p
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="text-sm text-accent mt-2 font-mono"
                                        >
                                            {step.content}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-accent/20 rounded-full blur-[100px] -z-10" />
                    <div className="glass rounded-3xl p-2 shadow-2xl overflow-hidden aspect-square md:aspect-video relative flex flex-col">
                        <div className="bg-muted/30 p-2 border-b border-border flex items-center justify-between">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                            </div>
                            <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                                <Terminal size={10} /> agent_obsidian.log
                            </div>
                        </div>
                        <div className="flex-1 p-4 md:p-6 font-mono text-[10px] md:text-xs space-y-2 overflow-hidden text-accent">
                            <p className="opacity-50 text-foreground">{"$ antigravity --init portfolio"}</p>
                            <p>{"[SYSTEM] Initializing intelligent agent bridge..."}</p>
                            <p>{"[DATA] Loading vector store: 1,420 dimensions"}</p>
                            <p className="text-foreground">{"[AGENT] Searching for connections between 'Frontend' and 'AI'..."}</p>
                            <div className="min-h-[60px] flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeStep}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className="p-3 rounded bg-accent/10 border border-accent/20"
                                    >
                                        {`>> Analysis in progress: ${steps[activeStep].content}`}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            <p className="opacity-50">{"[LOG] Memory usage: 124MB | Latency: 42ms"}</p>
                            <div className="flex items-center gap-2">
                                <div className="h-1 w-1 bg-accent rounded-full animate-bounce" />
                                <div className="h-1 w-1 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                                <div className="h-1 w-1 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                            </div>
                        </div>

                        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-16 h-16 md:w-24 md:h-24 bg-accent/20 rounded-full flex items-center justify-center border border-accent/30 animate-spin-slow">
                            <Brain className="text-accent w-6 h-6 md:w-10 md:h-10 -rotate-12" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
