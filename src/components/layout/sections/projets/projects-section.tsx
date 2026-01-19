import { Typography } from "@/components/ui/typography/typography";
import { Project } from "@/store/projects_data";
import { ProjectsGrid } from "@/components/ui/grid/projects-grid";
import { Divider } from "@/components/ui/decoration/divider";
import { cn } from "@/lib/utils";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className={cn(
      "relative",
      "py-16 md:py-24",
      "overflow-hidden"
    )}>
      {/* Background decoration */}
      <div className={cn(
        "absolute inset-0 -z-10",
        "bg-gradient-radial from-accent/5 via-transparent to-transparent",
        "opacity-50"
      )} />

      <div className={cn(
        "container mx-auto",
        "px-4 sm:px-6"
      )}>
        {/* Header */}
        <div className={cn(
          "text-center",
          "max-w-2xl mx-auto",
          "mb-16",
          "space-y-4"
        )}>
          <Typography
            level="h2"
            className={cn(
              "text-accent",
              "text-3xl md:text-4xl lg:text-5xl",
              "font-bold tracking-tight"
            )}
          >
            Mes Projets
          </Typography>

          <Divider variant="gradient" align="center" className="mx-auto" />

          <Typography
            level="body1"
            className={cn(
              "text-text-secondary",
              "text-base md:text-lg",
              "leading-relaxed"
            )}
          >
            Découvrez une sélection de mes projets les plus récents, mettant en valeur
            mes compétences en développement web et mes réalisations techniques.
          </Typography>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
