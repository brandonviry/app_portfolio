'use client';

import { useMemo } from "react";
import { CategoryFilter } from "./category-filter";
import { TechnologyDropdown } from "../dropdown/technology-dropdown";
import { SortDropdown, type SortOption } from "../dropdown/sort-dropdown";
import { Typography } from "../typography/typography";
import { Button } from "../button/button";
import { InfoTooltip } from "../tooltip/info-tooltip";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import type { Project } from "@/store/projects_data";

interface ProjectFiltersProps {
  projects: Project[];
  selectedCategories: string[];
  selectedTechnologies: string[];
  sortBy: string;
  onCategoryToggle: (category: string) => void;
  onTechnologyToggle: (technology: string) => void;
  onSortChange: (sortBy: string) => void;
  onReset: () => void;
  className?: string;
}

const sortOptions: SortOption[] = [
  { value: 'default', label: 'Par défaut' },
  { value: 'title-asc', label: 'Titre (A-Z)' },
  { value: 'title-desc', label: 'Titre (Z-A)' },
  { value: 'category', label: 'Par catégorie' },
];

export function ProjectFilters({
  projects,
  selectedCategories,
  selectedTechnologies,
  sortBy,
  onCategoryToggle,
  onTechnologyToggle,
  onSortChange,
  onReset,
  className
}: ProjectFiltersProps) {
  // Compter le nombre de projets filtrés
  const filteredCount = useMemo(() => {
    if (selectedCategories.length === 0 && selectedTechnologies.length === 0) {
      return projects.length;
    }

    return projects.filter(project => {
      const matchesCategory = selectedCategories.length === 0 ||
        project.categories.some(cat => selectedCategories.includes(cat));

      const matchesTechnology = selectedTechnologies.length === 0 ||
        project.technologies.some(tech => selectedTechnologies.includes(tech));

      return matchesCategory && matchesTechnology;
    }).length;
  }, [projects, selectedCategories, selectedTechnologies]);

  const hasActiveFilters = selectedCategories.length > 0 || selectedTechnologies.length > 0 || sortBy !== 'default';

  // Message explicatif du filtrage
  const filterMessage = useMemo(() => {
    if (selectedCategories.length === 0 && selectedTechnologies.length === 0) {
      return null;
    }

    const parts: string[] = [];

    if (selectedCategories.length > 0) {
      const catText = selectedCategories.length === 1
        ? selectedCategories[0]
        : `${selectedCategories.length} catégories`;
      parts.push(catText);
    }

    if (selectedTechnologies.length > 0) {
      const techText = selectedTechnologies.length === 1
        ? selectedTechnologies[0]
        : `${selectedTechnologies.length} technologies`;
      parts.push(techText);
    }

    return parts.join(' • ');
  }, [selectedCategories, selectedTechnologies]);

  return (
    <div className={cn(
      "space-y-6",
      "py-6 md:py-8",
      "border-y-2 border-border/10",
      className
    )}>
      {/* Header : Résultats + Tri */}
      <div className={cn(
        "flex flex-col sm:flex-row",
        "gap-4 sm:gap-6",
        "items-start sm:items-center",
        "justify-between"
      )}>
        {/* Compteur de résultats */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <Typography
              level="h6"
              className={cn(
                "text-text-primary font-semibold",
                "text-base md:text-lg"
              )}
            >
              {filteredCount} {filteredCount > 1 ? 'projets' : 'projet'}
            </Typography>

            {(selectedCategories.length > 0 || selectedTechnologies.length > 0) && (
              <div className={cn(
                "px-2 py-0.5",
                "bg-accent/10 border border-accent/30",
                "text-accent text-xs font-bold"
              )}>
                FILTRÉS
              </div>
            )}
          </div>

          {/* Message explicatif */}
          {filterMessage && (
            <Typography
              level="body2"
              className="text-text-secondary text-xs"
            >
              {filterMessage}
            </Typography>
          )}
        </div>

        {/* Actions : Tri + Reset */}
        <div className="flex items-center gap-3">
          <SortDropdown
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
          />

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="group/reset"
            >
              <RotateCcw
                className={cn(
                  "w-4 h-4 mr-2",
                  "transition-transform duration-300",
                  "group-hover/reset:rotate-180"
                )}
                strokeWidth={2.5}
              />
              <span>Réinitialiser</span>
            </Button>
          )}
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Typography
            level="body2"
            className="text-text-secondary text-xs uppercase tracking-wider font-semibold"
          >
            Filtrer par catégorie
          </Typography>
          <InfoTooltip content="Sélectionnez une ou plusieurs catégories. Les projets qui ont au moins une des catégories sélectionnées seront affichés." />
        </div>

        <CategoryFilter
          projects={projects}
          selectedCategories={selectedCategories}
          onCategoryToggle={onCategoryToggle}
        />
      </div>

      {/* Filtres par technologie */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Typography
            level="body2"
            className="text-text-secondary text-xs uppercase tracking-wider font-semibold"
          >
            Filtrer par technologie
          </Typography>
          <InfoTooltip content="Sélectionnez une ou plusieurs technologies. Si des catégories sont aussi sélectionnées, seuls les projets correspondant aux deux critères seront affichés." />
        </div>

        <TechnologyDropdown
          projects={projects}
          selectedTechnologies={selectedTechnologies}
          onTechnologyToggle={onTechnologyToggle}
        />
      </div>

      {/* Message si aucun résultat */}
      {filteredCount === 0 && (
        <div className={cn(
          "py-8 text-center",
          "border-2 border-dashed border-border/20",
          "bg-surface-1/30"
        )}>
          <Typography
            level="body1"
            className="text-text-secondary"
          >
            Aucun projet ne correspond à ces filtres.
          </Typography>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="mt-4"
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  );
}
