"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export function PortfolioParallax() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Servers Rally 2025",
    link: "https://serversrally25.live",
    thumbnail:
      "/showcase/servers-rally.png",
  },
  {
    title: "Stanstead Company limited",
    link: "https://stanstead.vercel.app/",
    thumbnail:
      "/showcase/stanstead.png",
  },
  {
    title: "Lumo Sage",
    link: "https://lumo-sage.vercel.app",
    thumbnail:
      "/showcase/lumo.png",
  },

  {
    title: "Cany Visuals",
    link: "https://cany.vercel.app/",
    thumbnail:
      "/showcase/cany.png",
  },
  {
    title: "Email Calm",
    link: "https://emailcalm.vercel.app",
    thumbnail:
      "/showcase/emailcalm.png",
  },
  {
    title: "PartyO",
    link: "https://partyo.vercel.app",
    thumbnail:
      "/showcase/partyo.png",
  },
  {
    title: "Alle",
    link: "https://alle-one.vercel.app",
    thumbnail:
      "/showcase/alle.png",
  },
//   {
//     title: "Editrix AI",
//     link: "https://editrix.ai",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/editrix.png",
//   },
//   {
//     title: "Pixel Perfect",
//     link: "https://app.pixelperfect.quest",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
//   },

//   {
//     title: "Algochurn",
//     link: "https://algochurn.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
//   },
//   {
//     title: "Aceternity UI",
//     link: "https://ui.aceternity.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
//   },
//   {
//     title: "Tailwind Master Kit",
//     link: "https://tailwindmasterkit.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
//   },
//   {
//     title: "SmartBridge",
//     link: "https://smartbridgetech.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
//   },
//   {
//     title: "Renderwork Studio",
//     link: "https://renderwork.studio",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
//   },

//   {
//     title: "Creme Digital",
//     link: "https://cremedigital.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
//   },
//   {
//     title: "Golden Bells Academy",
//     link: "https://goldenbellsacademy.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
//   },
//   {
//     title: "Invoker Labs",
//     link: "https://invoker.lol",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/invoker.png",
//   },
//   {
//     title: "E Free Invoice",
//     link: "https://efreeinvoice.com",
//     thumbnail:
//       "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
//   },
];
