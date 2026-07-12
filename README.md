# Elliot Awe — Portfolio

An immersive, story-driven portfolio site — one long scroll experience introducing
Elliot Awe through motion, typography, and storytelling rather than a traditional
page-by-page layout. Built with Next.js, GSAP/ScrollTrigger, and Lenis smooth
scrolling.

## Built with

- [Next.js](https://nextjs.org/) (App Router) — React framework
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [GSAP](https://gsap.com/) + ScrollTrigger — scroll-driven animation
- [Lenis](https://github.com/darkroomengineering/lenis) — smooth scrolling
- [Motion](https://motion.dev/) (Framer Motion) — component-level animation where GSAP isn't the better fit

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Structure

- `app/` — routes (home, `/about`, `/projects`, `/projects/[slug]`)
- `components/sections/` — one component per scroll section of the homepage
- `animations/` — shared GSAP setup and reveal helpers
- `constants/` — site copy and content data
- `lib/projects.ts` — project case-study data backing `/projects`
- `hooks/` — reduced-motion, tilt, and other shared behavior

See `flow.md` for the original design brief driving the site's structure and motion
language.
