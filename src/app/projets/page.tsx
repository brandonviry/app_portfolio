import { ProjectsSection } from "@/components/layout/sections/projets/projects-section";
import { projectsData } from "@/store/projects_data";
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

export default function ProjectsPage() {
  return <ProjectsSection projects={projectsData} />;
}
