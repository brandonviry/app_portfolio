'use client';

import { useMemo, useState, useEffect } from "react";
import { AccordionItem } from "../accordion/accordion-item";
import { FilterChip } from "../chip/filter-chip";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/supabase";
import { TECHNOLOGY_GROUPS, type TechnologyGroupName } from "@/config/technology-groups";

interface GroupedTechnologyFilterProps {
  projects: Project[];
  selectedTechnologies: string[];
  onTechnologyToggle: (technology: string) => void;
  className?: string;
}

export function GroupedTechnologyFilter({
  projects,
  selectedTechnologies,
  onTechnologyToggle,
  className
}: GroupedTechnologyFilterProps) {
  // État pour gérer les accordéons ouverts/fermés
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  // Calculer le nombre de projets par technologie et grouper
  const groupedTechnologies = useMemo(() => {
    const technologyCounts = new Map<string, number>();

    // Compter les occurrences de chaque technologie
    projects.forEach(project => {
      project.technologies.forEach(technology => {
        technologyCounts.set(technology, (technologyCounts.get(technology) || 0) + 1);
      });
    });

    // Grouper les technologies avec leurs counts
    const grouped = new Map<TechnologyGroupName | 'Non classées', Array<[string, number]>>();

    technologyCounts.forEach((count, technology) => {
      // Trouver le groupe de cette technologie
      let groupName: TechnologyGroupName | 'Non classées' = 'Non classées';

      for (const [gName, techs] of Object.entries(TECHNOLOGY_GROUPS)) {
        if ((techs as readonly string[]).includes(technology)) {
          groupName = gName as TechnologyGroupName;
          break;
        }
      }

      if (!grouped.has(groupName)) {
        grouped.set(groupName, []);
      }
      grouped.get(groupName)!.push([technology, count]);
    });

    // Trier les technologies dans chaque groupe par count décroissant puis alphabétiquement
    grouped.forEach((technologies) => {
      technologies.sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0].localeCompare(b[0]);
      });
    });

    return grouped;
  }, [projects]);

  // Auto-ouvrir les groupes qui contiennent des technologies sélectionnées (seulement au premier rendu avec sélections)
  useEffect(() => {
    if (selectedTechnologies.length > 0) {
      const groupsToOpen = new Set<string>();

      selectedTechnologies.forEach(tech => {
        for (const [groupName, technologies] of groupedTechnologies.entries()) {
          if (technologies.some(([t]) => t === tech)) {
            groupsToOpen.add(groupName);
          }
        }
      });

      // Fusionner avec les groupes déjà ouverts manuellement au lieu d'écraser
      setOpenGroups(prev => new Set([...prev, ...groupsToOpen]));
    } else {
      // Si aucune technologie sélectionnée, fermer tous les groupes
      setOpenGroups(new Set());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTechnologies.length, groupedTechnologies]);

  const toggleGroup = (groupName: string) => {
    setOpenGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  };

  if (groupedTechnologies.size === 0) {
    return null;
  }

  // Ordre d'affichage des groupes (les plus utilisés en premier)
  const groupOrder = Array.from(groupedTechnologies.entries())
    .sort((a, b) => {
      // Calculer le total de projets par groupe
      const totalA = a[1].reduce((sum, [, count]) => sum + count, 0);
      const totalB = b[1].reduce((sum, [, count]) => sum + count, 0);
      return totalB - totalA;
    });

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3", className)}>
      {groupOrder.map(([groupName, technologies]) => {
        const isOpen = openGroups.has(groupName);
        const selectedCount = technologies.filter(([tech]) =>
          selectedTechnologies.includes(tech)
        ).length;

        const badgeText = selectedCount > 0
          ? `${selectedCount} sélectionnée${selectedCount > 1 ? 's' : ''}`
          : `${technologies.length} technologie${technologies.length > 1 ? 's' : ''}`;

        return (
          <AccordionItem
            key={groupName}
            title={groupName}
            isOpen={isOpen}
            onToggle={() => toggleGroup(groupName)}
            badge={badgeText}
          >
            <div className="flex flex-wrap gap-2">
              {technologies.map(([technology, count]) => {
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
          </AccordionItem>
        );
      })}
    </div>
  );
}
