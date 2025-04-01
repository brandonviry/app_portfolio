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
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setIsLoading(true);
        const techs = await getTechnologies();
        setTechnologies(techs);
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Une erreur s&apos;est produite"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Typography level="h2" className="text-center text-foreground mb-4">
            Une erreur s&apos;est produite lors du chargement des technologies
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <section className={cn(
      "relative",
      "py-16 md:py-24"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <Typography
            level="h2"
            className={cn(
              "text-foreground",
              "mb-4"
            )}
          >
            Technologies
          </Typography>
          <Typography
            level="body1"
            className={cn(
              "text-foreground/60",
              "max-w-2xl mx-auto"
            )}
          >
            Les technologies que j&apos;utilise au quotidien pour créer des applications modernes et performantes
          </Typography>
        </div>

        {/* Grid */}
        <div className={cn(
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
          "gap-6"
        )}>
          {isLoading ? (
            // Afficher les skeletons pendant le chargement
            Array.from({ length: 10 }).map((_, index) => (
              <TechnologyCardSkeleton key={index} />
            ))
          ) : (
            // Afficher les technologies
            technologies.map((tech) => (
              <div
                key={tech.name}
                className={cn(
                  "flex flex-col items-center",
                  "p-6",
                  "rounded-xl",
                  "bg-surface-2/50",
                  "border border-border/10",
                  "transition-all duration-300",
                  "hover:scale-105 hover:shadow-lg"
                )}
              >
                {/* Icon */}
                <div className="w-8 h-8 mb-3">
                  {tech.icon}
                </div>
                {/* Name */}
                <Typography level="body2" className="text-foreground text-center">
                  {tech.name}
                </Typography>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
