import { ProjectCard } from "../card/project-card";
import { Project } from "@/types/project";
interface ProjectsGridProps {
  projects: Project[];
  className?: string;
}

export function ProjectsGrid({ projects, className = "" }: ProjectsGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {projects.map((project,index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
