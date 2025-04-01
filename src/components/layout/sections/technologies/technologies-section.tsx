'use client';

import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";
import { getTechnologies, Technology } from "@/lib/data/technologies";
import { useEffect, useState } from "react";

// Composant pour le skeleton loading
function TechnologyCardSkeleton() {
  return (
    <div className={cn(
      "flex flex-col items-center",
      "p-6",
      "rounded-xl",
      "bg-surface-2/50",
      "border border-border/10",
      "animate-pulse"
    )}>
      {/* Icon skeleton */}
      <div className="w-8 h-8 rounded-full bg-surface-2 mb-3" />
      {/* Name skeleton */}
      <div className="w-16 h-4 rounded bg-surface-2" />
    </div>
  );
}

export function TechnologiesSection() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setIsLoading(true);
        const techs = await getTechnologies();
        setTechnologies(techs);
      } catch (error) {
        console.error('Error fetching technologies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTechnologies();
  }, []);

  return (
    <section className={cn(
      "relative",
      "py-16 md:py-24",
      "bg-surface-1/50"
    )}>
      {/* Background decoration */}
      <div className={cn(
        "absolute inset-0 -z-10",
        "bg-grid-pattern",
        "opacity-5"
      )} />

      <div className={cn(
        "container mx-auto",
        "px-4 sm:px-6"
      )}>
        {/* Header */}
        <div className={cn(
          "text-center",
          "mb-12"
        )}>
          <Typography 
            level="h2" 
            className={cn(
              "text-text-primary",
              "mb-4"
            )}
          >
            Technologies
          </Typography>
          <Typography 
            level="body1" 
            className={cn(
              "text-text-secondary",
              "max-w-2xl mx-auto"
            )}
          >
            Les technologies que j'utilise au quotidien pour créer des applications modernes et performantes
          </Typography>
        </div>

        {/* Technologies Grid */}
        <div className={cn(
          "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
          "gap-6",
          "max-w-6xl mx-auto"
        )}>
          {isLoading ? (
            // Afficher 12 skeletons pendant le chargement
            <>
              {[...Array(12)].map((_, index) => (
                <TechnologyCardSkeleton key={index} />
              ))}
            </>
          ) : technologies.map((tech) => (
            <div 
              key={tech.name}
              className={cn(
                "group",
                "flex flex-col items-center",
                "p-6",
                "rounded-xl",
                "bg-surface-2/50",
                "backdrop-blur-sm",
                "border border-border/10",
                "hover:border-accent/20",
                "transition-all duration-300",
                "hover:shadow-lg hover:shadow-accent/5",
                "hover:-translate-y-1"
              )}
            >
              <span className="text-2xl mb-3">{tech.icon}</span>
              <Typography 
                level="body2"
                className={cn(
                  "text-text-secondary",
                  "group-hover:text-text-primary",
                  "transition-colors duration-300"
                )}
              >
                {tech.name}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
