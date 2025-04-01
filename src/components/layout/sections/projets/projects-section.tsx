import { Typography } from "@/components/ui/typography/typography";
import { getProjects } from "@/lib/notion/projet_api";
import { Project } from "@/types/project";
import { ProjectsGrid } from "@/components/ui/grid/projects-grid";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="space-y-4 text-center mb-12">
          <Typography level="h2" className="text-accent">
            Mes Projets
          </Typography>
          <Typography level="body1" className="text-foreground/60 max-w-2xl mx-auto">
            Découvrez une sélection de mes projets les plus récents, mettant en valeur
            mes compétences en développement web et mes réalisations techniques.
          </Typography>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
