"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function PortfolioParallax() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "AI Trend Discovery Engine",
    link: "https://serversrally25.live",
    thumbnail: "/showcase/servers-rally.png",
    impact: "Analyzed 10k+ social trends using OpenAI"
  },
  {
    title: "Eco-Friendly Logistics Platform",
    link: "https://stanstead.vercel.app/",
    thumbnail: "/showcase/stanstead.png",
    impact: "Reduced logistics waste by 15% through smart routing"
  },
  {
    title: "Lumo Sage: AI Learning Assistant",
    link: "https://lumo-sage.vercel.app",
    thumbnail: "/showcase/lumo.png",
    impact: "Personalized learning paths for 500+ students"
  },
  {
    title: "Cany Visuals: Creative Portfolio",
    link: "https://cany.vercel.app/",
    thumbnail: "/showcase/cany.png",
    impact: "High-performance gallery with 99 Lighthouse score"
  },
  {
    title: "Email Calm: Inbox Peace",
    link: "https://emailcalm.vercel.app",
    thumbnail: "/showcase/emailcalm.png",
    impact: "Summarized 1M+ emails using NLP"
  },
  {
    title: "PartyO: Event Coordination AI",
    link: "https://partyo.vercel.app",
    thumbnail: "/showcase/partyo.png",
    impact: "Automated event planning workflows"
  },
  {
    title: "Alle: Intelligent CRM",
    link: "https://alle-one.vercel.app",
    thumbnail: "/showcase/alle.png",
    impact: "Boosted sales productivity by 25%"
  }
];
