'use client';

import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/store/projects_data";
import { TECHNOLOGY_GROUPS, type TechnologyGroupName } from "@/config/technology-groups";

interface TechnologyDropdownProps {
  projects: Project[];
  selectedTechnologies: string[];
  onTechnologyToggle: (technology: string) => void;
  className?: string;
}

export function TechnologyDropdown({
  projects,
  selectedTechnologies,
  onTechnologyToggle,
  className
}: TechnologyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Éviter l'erreur d'hydratation
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

    // Trier les groupes par popularité
    return Array.from(grouped.entries()).sort((a, b) => {
      const totalA = a[1].reduce((sum, [, count]) => sum + count, 0);
      const totalB = b[1].reduce((sum, [, count]) => sum + count, 0);
      return totalB - totalA;
    });
  }, [projects]);

  // Fermer le dropdown au click extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClearAll = () => {
    selectedTechnologies.forEach(tech => onTechnologyToggle(tech));
  };

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      {/* Bouton du dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3",
          "flex items-center justify-between",
          "border-2 border-border/20",
          "bg-surface-1/10 hover:bg-surface-1/20",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-accent/50",
          isOpen && "ring-2 ring-accent/50 bg-surface-1/20"
        )}
      >
        <span className={cn(
          "text-sm font-medium",
          selectedTechnologies.length > 0 ? "text-accent" : "text-text-secondary"
        )}>
          {selectedTechnologies.length > 0
            ? `${selectedTechnologies.length} technologie${selectedTechnologies.length > 1 ? 's' : ''} sélectionnée${selectedTechnologies.length > 1 ? 's' : ''}`
            : 'Sélectionner des technologies'}
        </span>

        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            isOpen ? "rotate-180 text-accent" : "text-text-secondary"
          )}
          strokeWidth={2}
        />
      </button>

      {/* Technologies sélectionnées (badges) - seulement côté client */}
      {isMounted && selectedTechnologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selectedTechnologies.map(tech => (
            <button
              key={tech}
              onClick={() => onTechnologyToggle(tech)}
              className={cn(
                "inline-flex items-center gap-1.5",
                "px-2.5 py-1",
                "bg-accent/10 border border-accent/30",
                "text-accent text-xs font-semibold",
                "hover:bg-accent/20",
                "transition-colors duration-150"
              )}
            >
              {tech}
              <X className="w-3 h-3" strokeWidth={2.5} />
            </button>
          ))}
          <button
            onClick={handleClearAll}
            className={cn(
              "px-2.5 py-1",
              "text-text-secondary text-xs font-semibold",
              "border border-border/30",
              "hover:bg-surface-1/20 hover:text-text-primary",
              "transition-colors duration-150"
            )}
          >
            Tout effacer
          </button>
        </div>
      )}

      {/* Menu dropdown - seulement côté client */}
      {isMounted && isOpen && (
        <div className={cn(
          "absolute z-50 w-full mt-2",
          "max-h-[400px] overflow-y-auto",
          "bg-background border-2 border-border/20 shadow-xl",
          "py-2"
        )}>
          {groupedTechnologies.map(([groupName, technologies]) => (
            <div key={groupName} className="px-2 py-1">
              {/* Header du groupe */}
              <div className="px-3 py-2">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">
                  {groupName}
                </span>
              </div>

              {/* Technologies du groupe */}
              <div className="space-y-0.5">
                {technologies.map(([technology, count]) => {
                  const isSelected = selectedTechnologies.includes(technology);

                  return (
                    <label
                      key={technology}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 cursor-pointer",
                        "hover:bg-surface-1/20 transition-colors duration-150",
                        isSelected && "bg-accent/5"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onTechnologyToggle(technology)}
                        className={cn(
                          "w-4 h-4 border-2",
                          "border-border/30",
                          "text-accent focus:ring-2 focus:ring-accent/50",
                          "cursor-pointer"
                        )}
                      />
                      <span className={cn(
                        "flex-1 text-sm",
                        isSelected ? "text-accent font-semibold" : "text-text-primary"
                      )}>
                        {technology}
                      </span>
                      <span className={cn(
                        "text-xs font-bold",
                        isSelected ? "text-accent" : "text-text-secondary"
                      )}>
                        {count}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
