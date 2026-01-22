'use client';

import { useMemo } from "react";
import { FilterChip } from "../chip/filter-chip";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/supabase";

interface CategoryFilterProps {
  projects: Project[];
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  className?: string;
}

export function CategoryFilter({
  projects,
  selectedCategories,
  onCategoryToggle,
  className
}: CategoryFilterProps) {
  // Calculer le nombre de projets par catégorie
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    projects.forEach(project => {
      project.categories.forEach(category => {
        counts.set(category, (counts.get(category) || 0) + 1);
      });
    });

    // Trier par nombre décroissant, puis alphabétiquement
    return Array.from(counts.entries())
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1]; // Par count décroissant
        return a[0].localeCompare(b[0]); // Par nom alphabétique
      });
  }, [projects]);

  if (categoryCounts.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2 md:gap-3", className)}>
      {categoryCounts.map(([category, count]) => {
        const isActive = selectedCategories.includes(category);

        return (
          <FilterChip
            key={category}
            label={category}
            count={count}
            active={isActive}
            onClick={() => onCategoryToggle(category)}
            onRemove={isActive ? () => onCategoryToggle(category) : undefined}
          />
        );
      })}
    </div>
  );
}
