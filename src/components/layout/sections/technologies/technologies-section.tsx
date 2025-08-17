'use client';

import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";
import { getTechnologies, Technology } from "@/lib/data/technologies";
import { useEffect, useState } from "react";

// Fonction pour générer une icône dynamique basée sur le nom
function generateTechIcon(name: string) {
  // Couleurs basées sur le hash du nom
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500', 
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-blue-500',
    'from-rose-500 to-pink-500',
    'from-amber-500 to-orange-500'
  ];
  
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = hash % colors.length;
  const gradient = colors[colorIndex];
  
  // Première lettre ou premières lettres
  const initials = name.length > 1 ? 
    (name.includes('.') || name.includes(' ') ? 
      name.split(/[.\s]/).map(part => part[0]).join('').slice(0, 2) :
      name.slice(0, 2)
    ) : name[0];

  return (
    <div className={cn(
      "w-full h-full rounded-lg",
      "bg-gradient-to-br", gradient,
      "flex items-center justify-center",
      "text-white font-bold text-sm",
      "shadow-lg"
    )}>
      {initials.toUpperCase()}
    </div>
  );
}

// Composant pour le skeleton loading
function TechnologyCardSkeleton() {
  return (
    <div className={cn(
      "group relative",
      "p-6",
      "rounded-2xl",
      "bg-gradient-to-br from-surface-2/30 to-surface-2/10",
      "border border-border/20",
      "animate-pulse"
    )}>
      {/* Background glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0" />
      
      {/* Icon skeleton */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded-xl bg-surface-2/50 mb-4" />
        {/* Name skeleton */}
        <div className="w-20 h-4 rounded bg-surface-2/50" />
      </div>
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
        <div className="text-center mb-16">
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
          "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
          "gap-4 md:gap-6"
        )}>
          {isLoading ? (
            // Afficher les skeletons pendant le chargement
            Array.from({ length: 12 }).map((_, index) => (
              <TechnologyCardSkeleton key={index} />
            ))
          ) : (
            // Afficher les technologies
            technologies.map((tech) => (
              <div
                key={tech.name}
                className={cn(
                  "group relative",
                  "p-6",
                  "rounded-2xl",
                  "bg-gradient-to-br from-surface-2/30 to-surface-2/10",
                  "border border-border/20",
                  "transition-all duration-500 ease-out",
                  "hover:scale-105 hover:rotate-1",
                  "hover:shadow-2xl hover:shadow-primary/10",
                  "hover:border-primary/30",
                  "cursor-pointer",
                  "backdrop-blur-sm"
                )}
              >
                {/* Background glow effect */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl",
                  "bg-gradient-to-br from-primary/5 to-accent/5",
                  "opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-500"
                )} />
                
                {/* Shine effect */}
                <div className={cn(
                  "absolute inset-0 rounded-2xl",
                  "bg-gradient-to-r from-transparent via-white/5 to-transparent",
                  "translate-x-[-100%] group-hover:translate-x-[100%]",
                  "transition-transform duration-700 ease-out"
                )} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon container */}
                  <div className={cn(
                    "w-12 h-12 mb-4",
                    "flex items-center justify-center",
                    "rounded-xl",
                    "bg-gradient-to-br from-primary/10 to-accent/10",
                    "group-hover:from-primary/20 group-hover:to-accent/20",
                    "transition-all duration-300",
                    "group-hover:scale-110",
                    "overflow-hidden"
                  )}>
                    <div className="w-8 h-8">
                      {generateTechIcon(tech.name)}
                    </div>
                  </div>
                  
                  {/* Name */}
                  <Typography 
                    level="body2" 
                    className={cn(
                      "text-foreground/80 text-center font-medium",
                      "group-hover:text-foreground",
                      "transition-colors duration-300",
                      "text-xs sm:text-sm"
                    )}
                  >
                    {tech.name}
                  </Typography>
                </div>

                {/* Floating particles effect */}
                <div className={cn(
                  "absolute top-2 right-2 w-1 h-1",
                  "bg-primary/30 rounded-full",
                  "opacity-0 group-hover:opacity-100",
                  "animate-ping",
                  "transition-opacity duration-300"
                )} />
                <div className={cn(
                  "absolute bottom-3 left-3 w-0.5 h-0.5",
                  "bg-accent/40 rounded-full",
                  "opacity-0 group-hover:opacity-100",
                  "animate-pulse",
                  "transition-opacity duration-300 delay-100"
                )} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
