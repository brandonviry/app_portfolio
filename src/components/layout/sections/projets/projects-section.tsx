'use client';

import { useState, useMemo } from "react";
import { Typography } from "@/components/ui/typography/typography";
import type { Project } from "@/lib/supabase";
import { ProjectsGrid } from "@/components/ui/grid/projects-grid";
import { ProjectFilters } from "@/components/ui/filter/project-filters";
import { Divider } from "@/components/ui/decoration/divider";
import { cn } from "@/lib/utils";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('default');

  // Toggle catégorie (multi-sélection)
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Toggle technologie (multi-sélection)
  const handleTechnologyToggle = (technology: string) => {
    setSelectedTechnologies(prev =>
      prev.includes(technology)
        ? prev.filter(t => t !== technology)
        : [...prev, technology]
    );
  };

  // Reset filtres
  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedTechnologies([]);
    setSortBy('default');
  };

  // Filtrage et tri des projets
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;

    // Filtrage par catégories sélectionnées
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(project =>
        project.categories.some(cat => selectedCategories.includes(cat))
      );
    }

    // Filtrage par technologies sélectionnées
    if (selectedTechnologies.length > 0) {
      filtered = filtered.filter(project =>
        project.technologies.some(tech => selectedTechnologies.includes(tech))
      );
    }

    // Tri
    const sorted = [...filtered];

    switch (sortBy) {
      case 'title-asc':
        sorted.sort((a, b) => a.titre.localeCompare(b.titre));
        break;

      case 'title-desc':
        sorted.sort((a, b) => b.titre.localeCompare(a.titre));
        break;

      case 'category':
        sorted.sort((a, b) => {
          const catA = a.categories[0] || '';
          const catB = b.categories[0] || '';
          return catA.localeCompare(catB);
        });
        break;

      case 'default':
      default:
        // Ordre par défaut (tel que dans le fichier)
        break;
    }

    return sorted;
  }, [projects, selectedCategories, selectedTechnologies, sortBy]);

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
          "mb-12",
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

        {/* Filtres */}
        <ProjectFilters
          projects={projects}
          selectedCategories={selectedCategories}
          selectedTechnologies={selectedTechnologies}
          sortBy={sortBy}
          onCategoryToggle={handleCategoryToggle}
          onTechnologyToggle={handleTechnologyToggle}
          onSortChange={setSortBy}
          onReset={handleReset}
        />

        {/* Grille de projets */}
        <div className="mt-8">
          <ProjectsGrid projects={filteredAndSortedProjects} />
        </div>
      </div>
    </section>
  );
}
