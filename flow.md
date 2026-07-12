# Portfolio Website Build Handoff

## Project Vision

I don't want a traditional developer portfolio.

I want an immersive, story-driven website that feels like an experience rather than a collection of pages. The site should introduce me through motion, typography, and storytelling. Every scroll should feel intentional.

The inspiration is somewhere between Apple product pages, Linear, Stripe, and award-winning portfolio websites, but without unnecessary visual noise.

The feeling should be:

* Minimal
* Cinematic
* Premium
* Quietly confident
* Smooth
* Memorable
* Modern
* Editorial

The design should rely heavily on typography, spacing, and animation rather than lots of colors or decorative graphics.

---

# Tech Stack

Use:

* Next.js (App Router)
* TypeScript
* Tailwind CSS v4
* shadcn/ui (where appropriate)
* GSAP
* ScrollTrigger
* Lenis (smooth scrolling)
* Framer Motion only where GSAP isn't the better choice
* Lucide Icons

Structure everything cleanly with reusable components.

Animations should be performant (60fps).

Respect prefers-reduced-motion.

No animation should feel gimmicky.

---

# Color Palette

Background:

Almost black

#0A0A0A

Text:

White

Muted gray

Very subtle gradients.

Accent color should only appear occasionally.

Possible accent:

Electric blue

or

Soft lime

No rainbow colors.

No glassmorphism.

No neon overload.

---

# Typography

Typography is the hero.

Large.
Bold.
Elegant.

The site should feel like it's designed around text.

Use modern fonts like:

* Geist
* Inter
* General Sans (if available)

Headings should often take up most of the screen.

Whitespace is critical.

---

# Overall Flow

The website is one long scrolling experience.

Not separate pages.

Each section transitions into the next naturally.

Scrolling should feel like moving through a story.

---

# SECTION 1 — Hero

Full viewport.

Everything starts on a black screen.

Nothing visible.

Then:

"Elliot"

animates in.

The letters should subtly separate before settling.

Very soft blur.

Very smooth easing.

No dramatic effects.

Underneath:

Cycle through:

Software Engineer

AI Engineer

Creative Technologist

Content Creator

Every 2–3 seconds.

Under that:

Building products.

Designing systems.

Creating experiences.

The hero should breathe.

No clutter.

---

# Hero Scroll Transition

As the user scrolls:

"Elliot"

moves toward the left side.

The camera almost feels like it follows it.

The movement should be smooth.

No snapping.

---

# SECTION 2 — Awe

Now:

Huge typography.

"Awe"

appears.

Beside it:

"Yes...

that's actually my surname."

Pause.

Then transition to:

"Hopefully by the end,

you'll understand why."

This should feel playful but premium.

---

# Typography Transformation

The letters in:

AWE

should slowly separate.

Each letter transforms into navigation.

A

→ About

W

→ Work

E

→ Experience

Instead of clicking navigation,

the transformation introduces the next sections naturally.

---

# About Section

Minimal.

Large statements.

Only one thought visible at a time.

Example:

"I build software that feels human."

Scroll.

"I teach machines to solve problems."

Scroll.

"I create content that makes technology understandable."

Each sentence fades into the next.

No large paragraphs.

---

# Skills Section

Do NOT use icon grids.

Instead:

Floating cloud of technologies.

Examples:

Next.js

React

TypeScript

Node.js

Python

AI Agents

MongoDB

Azure

OpenAI

n8n

Automation

Design

Motion

Storytelling

Hover:

Slight enlargement.

Click:

Reveal projects using that technology.

Subtle animations.

---

# Projects Section

Projects should feel premium.

NOT a basic grid.

Cards should float.

Very subtle parallax.

Cursor movement slightly tilts cards.

Opening a project expands it fullscreen.

Fullscreen project contains:

* Hero image/video
* Description
* Technologies
* Links
* Challenges
* Outcomes

Transitions should feel seamless.

---

# Timeline

Instead of a resume.

Vertical storytelling.

2022

Learned.

↓

2023

Built.

↓

2024

Freelanced.

↓

2025

Scaled.

↓

2026

Building AI.

Animate as the user scrolls.

---

# Philosophy

Huge typography again.

Technology

should disappear.

People

shouldn't notice

the engineering.

They should

remember

the experience.

This section should slow scrolling slightly.

Create emphasis.

---

# Fun Terminal Section

Terminal-inspired.

Commands like:

> favorite_stack

Next.js

TypeScript

AI

> current_obsession

Building useful AI agents

> coffee_level

█████████░

Playful.

Still premium.

---

# Contact

Everything fades.

Only one sentence remains.

"Let's build something people remember."

Primary CTA:

Start a conversation

Very minimal.

---

# Navigation

Floating minimal navigation.

Only appears after hero.

Very subtle.

Highlights current section.

Should auto-hide while scrolling down.

Reappear scrolling up.

---

# Cursor

Custom cursor.

Small.

Elegant.

Expands slightly on interactive elements.

No exaggerated cursor effects.

---

# Motion Principles

Every animation should feel intentional.

Use:

* opacity
* blur
* translate
* scale
* masking
* stagger
* parallax

Avoid:

* bouncing
* spinning
* excessive rotations
* cartoon animations

Motion should resemble Apple or Linear.

---

# Performance

Lazy-load everything possible.

Use dynamic imports where appropriate.

Avoid layout shift.

Images optimized.

Maintain excellent Lighthouse scores.

---

# Accessibility

Keyboard navigation.

Proper focus states.

Semantic HTML.

ARIA where needed.

Respect prefers-reduced-motion.

Maintain sufficient contrast.

---

# Mobile Experience

This is NOT a desktop-only experience.

The storytelling must adapt beautifully.

Typography scales intelligently.

Animations become lighter.

No horizontal overflow.

Touch interactions should feel natural.

---

# Folder Structure

Organize cleanly.

Example:

app/

components/

animations/

sections/

hooks/

lib/

styles/

types/

constants/

public/

Keep animation logic isolated.

Reusable components.

No giant files.

---

# Code Quality

* Strict TypeScript
* Clean architecture
* Reusable components
* Comments only where necessary
* No duplicated logic
* Strong naming conventions
* Easy to maintain

---

# Stretch Goals

If time allows, include tasteful enhancements such as:

* Subtle background grain.
* Soft ambient lighting behind hero text.
* Animated text masks during section transitions.
* Scroll progress indicator.
* View Transition API (where supported).
* Command palette (⌘K) for quick navigation.
* Theme-ready architecture, even if only the dark theme is shipped initially.
* Carefully designed page loading sequence.
* Custom 404 page matching the site's storytelling style.

---

# Success Criteria

The finished website should make visitors feel like they experienced a story instead of browsing a portfolio.

When someone closes the tab, I want them to remember:

* My name.
* My work.
* My design taste.
* My engineering ability.
* My attention to detail.

The portfolio should communicate that I don't just build software—I craft experiences. Every design choice, animation, and interaction should reinforce that message while remaining fast, accessible, and maintainable.
