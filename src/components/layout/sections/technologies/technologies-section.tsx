'use client';

import { Typography } from "@/components/ui/typography/typography";
import { Divider } from "@/components/ui/decoration/divider";
import { cn } from "@/lib/utils";
import { getTechnologiesByCategory } from "@/lib/data/technologies";

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
      "w-full h-full",
      "bg-gradient-to-br", gradient,
      "flex items-center justify-center",
      "text-white font-bold text-xs sm:text-sm",
      "shadow-lg",
      "border border-white/20"
    )}>
      {initials.toUpperCase()}
    </div>
  );
}

export function TechnologiesSection() {
  const categoriesData = getTechnologiesByCategory();

  return (
    <section className={cn(
      "relative",
      "py-16 md:py-24"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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
            Technologies & Compétences
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
            Les technologies que j&apos;utilise au quotidien pour créer des applications modernes et performantes
          </Typography>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categoriesData.map((category) => (
            <div key={category.category}>
              {/* Category title */}
              <Typography
                level="h3"
                className={cn(
                  "text-accent",
                  "mb-6",
                  "text-xl md:text-2xl",
                  "font-semibold"
                )}
              >
                {category.category}
              </Typography>

              {/* Technologies Grid */}
              <div className={cn(
                "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
                "gap-3 md:gap-4"
              )}>
                {category.technologies.map((tech) => (
                  <div
                    key={tech}
                    className={cn(
                      "group relative",
                      "p-4 md:p-5",
                      "bg-surface-1/50",
                      "border-2 border-border/20",
                      "backdrop-blur-sm",
                      "transition-all duration-300",
                      "hover:border-accent/50",
                      "hover:-translate-y-1",
                      "hover:shadow-lg hover:shadow-accent/10",
                      "cursor-pointer"
                    )}
                  >
                    {/* Corner accents - Top left */}
                    <div className={cn(
                      "absolute top-0 left-0",
                      "w-2 h-2",
                      "border-t-2 border-l-2 border-accent",
                      "opacity-0 group-hover:opacity-100",
                      "transition-opacity duration-300"
                    )} />

                    {/* Corner accents - Bottom right */}
                    <div className={cn(
                      "absolute bottom-0 right-0",
                      "w-2 h-2",
                      "border-b-2 border-r-2 border-cta",
                      "opacity-0 group-hover:opacity-100",
                      "transition-opacity duration-300"
                    )} />

                    {/* Scan line effect */}
                    <div className={cn(
                      "absolute inset-0",
                      "bg-gradient-to-b from-transparent via-accent/5 to-transparent",
                      "translate-y-[-100%] group-hover:translate-y-[100%]",
                      "transition-transform duration-1000 ease-out",
                      "pointer-events-none"
                    )} />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      {/* Icon container */}
                      <div className={cn(
                        "w-12 h-12 sm:w-14 sm:h-14",
                        "flex items-center justify-center",
                        "border-2 border-border/30",
                        "bg-surface-2/50",
                        "group-hover:border-accent/50",
                        "transition-all duration-300",
                        "overflow-hidden",
                        "relative"
                      )}>
                        <div className="w-8 h-8 sm:w-10 sm:h-10">
                          {generateTechIcon(tech)}
                        </div>

                        {/* Inner glow */}
                        <div className={cn(
                          "absolute inset-0",
                          "bg-accent/0 group-hover:bg-accent/5",
                          "transition-colors duration-300"
                        )} />
                      </div>

                      {/* Name */}
                      <Typography
                        level="body2"
                        className={cn(
                          "text-text-secondary text-center font-medium",
                          "group-hover:text-accent",
                          "transition-colors duration-300",
                          "text-xs sm:text-sm",
                          "leading-tight"
                        )}
                      >
                        {tech}
                      </Typography>
                    </div>

                    {/* Status indicator */}
                    <div className={cn(
                      "absolute top-2 right-2",
                      "w-1.5 h-1.5",
                      "bg-cta",
                      "opacity-0 group-hover:opacity-100",
                      "transition-opacity duration-300"
                    )} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
