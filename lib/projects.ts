export interface Project {
    slug: string;
    title: string;
    description: string;
    impact: string;
    thumbnail: string;
    tags: string[];
    link: string;
    github?: string;
    category: "AI" | "Frontend" | "Full-Stack" | "IoT";
    featured?: boolean;
    content: {
        challenge: string;
        approach: string;
        result: string;
        stack: string[];
    };
}

export const projects: Project[] = [
    {
        slug: "ai-trend-discovery",
        title: "AI Trend Discovery Engine",
        description: "An intelligent platform that scrapes and analyzes social media trends using LLMs to provide actionable content insights.",
        impact: "Analyzed 10k+ social trends with 95% accuracy in concept extraction.",
        thumbnail: "/showcase/servers-rally.png",
        tags: ["Azure AI", "OpenAI", "Next.js", "Apify"],
        link: "https://serversrally25.live",
        category: "AI",
        featured: true,
        content: {
            challenge: "Processing thousands of unstructured TikTok trends to find high-signal content concepts manually was impossible for the user.",
            approach: "Built a pipeline using Apify for scraping and OpenAI for concept extraction, grounding the AI in specific 'hook' patterns.",
            result: "Users can now generate a week's worth of content ideas in under 2 minutes, with built-in script generation.",
            stack: ["Next.js", "TypeScript", "OpenAI API", "Apify SDK", "Tailwind CSS"]
        }
    },
    {
        slug: "eco-logistics",
        title: "Eco-Friendly Logistics",
        description: "A smart routing and management platform for sustainable delivery companies, optimizing for distance and carbon footprint.",
        impact: "Reduced logistics waste by 15% through smart routing algorithms.",
        thumbnail: "/showcase/stanstead.png",
        tags: ["Laravel", "Google Maps API", "PHP", "MySQL"],
        link: "https://stanstead.vercel.app/",
        category: "Full-Stack",
        featured: true,
        content: {
            challenge: "Waitlist and route management was fragmented, leading to inefficient delivery paths and excessive carbon emissions.",
            approach: "Implemented an integrated routing system with a custom dashboard for real-time tracking and dispatch.",
            result: "Successfully handled thousands of deliveries with a documented decrease in fuel consumption per package.",
            stack: ["Laravel", "PHP", "MySQL", "Google Maps API", "Blade"]
        }
    },
    {
        slug: "lumo-sage",
        title: "Lumo Sage: AI Assistant",
        description: "A personalized learning companion that adapts to student needs using RAG (Retrieval-Augmented Generation).",
        impact: "Helped 500+ students improve test scores by an average of 22%.",
        thumbnail: "/showcase/lumo.png",
        tags: ["Next.js", "Supabase", "Vector DB", "LLMs"],
        link: "https://lumo-sage.vercel.app",
        category: "AI",
        featured: true,
        content: {
            challenge: "Students often feel overwhelmed by generic educational content that doesn't address their specific knowledge gaps.",
            approach: "Used Vector embeddings and RAG to allow students to query their specific course materials with AI context.",
            result: "High engagement rates and significant improvements in learning retention across pilot groups.",
            stack: ["Next.js", "React", "Supabase (Vectors)", "LangChain", "OpenAI"]
        }
    },
    {
        slug: "alle-crm",
        title: "Alle: Intelligent CRM",
        description: "A modern CRM designed for high-growth teams, featuring lead scoring and automated follow-up scheduling.",
        impact: "Boosted sales productivity by 25% for integrated teams.",
        thumbnail: "/showcase/alle.png",
        tags: ["React", "FastAPI", "PostgreSQL", "Tailwind"],
        link: "https://alle-one.vercel.app",
        category: "Full-Stack",
        featured: true,
        content: {
            challenge: "Sales teams were losing leads due to slow follow-up times and lack of lead prioritization.",
            approach: "Built a real-time CRM with automated lead scoring and an AI-assisted email composer.",
            result: "Reduced average response time from 4 hours to 15 minutes through automated sorting.",
            stack: ["React", "TypeScript", "FastAPI", "Postgres", "Redis"]
        }
    },
    {
        slug: "cany-visuals",
        title: "Cany Visuals",
        description: "A high-performance creative portfolio for visual artists with a focus on immersive imagery.",
        impact: "Achieved a 99 Lighthouse performance score with heavy image loads.",
        thumbnail: "/showcase/cany.png",
        tags: ["Next.js", "Framer Motion", "Cloudinary"],
        link: "https://cany.vercel.app/",
        category: "Frontend",
        content: {
            challenge: "Typical visual portfolios are slow to load and often compromise image quality for speed.",
            approach: "Implemented advanced image optimization and custom page transitions using Framer Motion.",
            result: "An award-worthy experience that feels like a native app while serving 4K assets.",
            stack: ["Next.js", "Framer Motion", "Cloudinary API", "Tailwind CSS"]
        }
    }
];
