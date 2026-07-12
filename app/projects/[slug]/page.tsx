import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { ProjectCaseStudyClient } from "@/components/pages/projects/project-case-study-client";

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) return {};

    const url = `https://elliotawe.co/projects/${project.slug}`;

    return {
        title: project.title,
        description: project.description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: `${project.title} | Elliot Awe`,
            description: project.description,
            url,
            type: "article",
            images: [{ url: project.thumbnail }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} | Elliot Awe`,
            description: project.description,
            images: [project.thumbnail],
        },
    };
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const url = `https://elliotawe.co/projects/${project.slug}`;

    // CreativeWork schema (not SoftwareApplication — these are case studies
    // about the work, not the shipped app itself), with an explicit
    // "about the challenge/approach/result" description block. AI answer
    // engines cite self-contained, fact-dense passages — this JSON-LD gives
    // them a clean structured summary alongside the page's own prose.
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url,
        image: `https://elliotawe.co${project.thumbnail}`,
        keywords: project.tags.join(", "),
        author: {
            "@type": "Person",
            name: "Elliot Awe",
            url: "https://elliotawe.co",
        },
        about: project.content.challenge,
        result: project.content.result,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProjectCaseStudyClient project={project} />
        </>
    );
}

