import { ProjectsSection } from "@/components/layout/sections/projets/projects-section";
import { getProjects } from "@/lib/notion/projet_api";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Projets | Portfolio",
  description: "Découvrez mes projets et réalisations en développement web.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsSection projects={projects} />;
}
