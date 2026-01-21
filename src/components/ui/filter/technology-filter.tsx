'use client';

import { useMemo } from "react";
import { FilterChip } from "../chip/filter-chip";
import { cn } from "@/lib/utils";
import type { Project } from "@/store/projects_data";

interface TechnologyFilterProps {
  projects: Project[];
  selectedTechnologies: string[];
  onTechnologyToggle: (technology: string) => void;
  className?: string;
}

export function TechnologyFilter({
  projects,
  selectedTechnologies,
  onTechnologyToggle,
  className
}: TechnologyFilterProps) {
  // Calculer le nombre de projets par technologie
  const technologyCounts = useMemo(() => {
    const counts = new Map<string, number>();

    projects.forEach(project => {
      project.technologies.forEach(technology => {
        counts.set(technology, (counts.get(technology) || 0) + 1);
      });
    });

    // Trier par nombre décroissant, puis alphabétiquement
    return Array.from(counts.entries())
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1]; // Par count décroissant
        return a[0].localeCompare(b[0]); // Par nom alphabétique
      });
  }, [projects]);

  if (technologyCounts.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2 md:gap-3", className)}>
      {technologyCounts.map(([technology, count]) => {
        const isActive = selectedTechnologies.includes(technology);

        return (
          <FilterChip
            key={technology}
            label={technology}
            count={count}
            active={isActive}
            onClick={() => onTechnologyToggle(technology)}
            onRemove={isActive ? () => onTechnologyToggle(technology) : undefined}
          />
        );
      })}
    </div>
  );
}
