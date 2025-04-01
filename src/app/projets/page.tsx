import { getProjects } from "@/lib/notion/projet_api";
import { Metadata } from 'next'
import { getPageMetadata } from '@/config/metadata'
import { ProjectsSection } from "@/components/layout/sections/projets/projects-section";

export const metadata: Metadata = getPageMetadata('projects')

export default async function ProjectsPage() {
  const projects = await getProjects();

  return <ProjectsSection projects={projects} />;
}
