"use client";

import { motion } from "motion/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden py-20 px-6">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center max-w-4xl space-y-8"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-accent text-sm font-medium mb-4">
                    <Bot className="w-4 h-4" />
                    <span>Available for intelligent collaborations</span>
                </div>

                <h1 className="sr-only">
                    Elliot Awe - Full-Stack & AI Engineer in Accra, Ghana. Specialized in Next.js, AI Automation, and Scalable Systems.
                </h1>

                <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-balance leading-[1.1]">
                    Engineering <br />
                    <span className="text-accent italic font-light">Intelligent</span> Experiences
                </h2>

                <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
                    I'm <span className="text-foreground font-semibold">Elliot Awe</span>, a Frontend & AI Engineer
                    dedicated to building seamless, scalable, and AI-driven digital products that solve real problems.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link href="/projects" className={`h-14 px-8 text-lg gap-2 rounded-full! group ${buttonVariants({ size: "lg" })}`}>
                        Explore My Work
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/#contact" className={`h-14 px-8 text-lg rounded-full! glass! hover:text-white ${buttonVariants({ variant: "outline", size: "lg" })}`}>
                        Let's Connect
                    </Link>
                </div>
            </motion.div>

            {/* Floating Elements / Micro-animations */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 hidden lg:block"
            >
                <div className="glass p-4 rounded-2xl space-y-2 max-w-[200px]">
                    <div className="h-2 w-12 bg-accent/30 rounded" />
                    <div className="h-2 w-20 bg-muted/50 rounded" />
                    <div className="h-2 w-16 bg-muted/50 rounded" />
                </div>
            </motion.div>
        </section>
    );
}
