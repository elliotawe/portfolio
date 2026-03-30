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

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: `${project.title} | Elliot Awe`,
            description: project.description,
            images: [{ url: project.thumbnail }],
        },
    };
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return <ProjectCaseStudyClient project={project} />;
}

