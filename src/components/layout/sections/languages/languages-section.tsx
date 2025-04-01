'use client';

import { cn } from "@/lib/utils";
import { getLanguages, Language } from "@/lib/data/languages";
import { useEffect, useState } from "react";
import { Typography } from "@/components/ui/typography/typography";
import { LanguageCircle } from "@/components/ui/circle/language-circle";

// Couleurs pour les différents niveaux
const levelColors: { [key: string]: { from: string; to: string; text: string } } = {
  'Maternel': {
    from: 'from-purple-500/20',
    to: 'to-purple-600/20',
    text: 'text-purple-500'
  },
  'Courant': {
    from: 'from-blue-500/20',
    to: 'to-blue-600/20',
    text: 'text-blue-500'
  },
  'Avancé': {
    from: 'from-green-500/20',
    to: 'to-green-600/20',
    text: 'text-green-500'
  },
};

// Composant pour le skeleton loading
function LanguageCircleSkeleton() {
  return (
    <div className={cn(
      "relative",
      "w-[180px] aspect-square",
      "rounded-full",
      "bg-surface-2/50",
      "animate-pulse"
    )}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
    </div>
  );
}

export function LanguagesSection() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setIsLoading(true);
        const langs = await getLanguages();
        setLanguages(langs);
      } catch (error) {
        console.error('Error fetching languages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  return (
    <section className={cn(
      "relative overflow-hidden",
      "py-16 md:py-24",
      "bg-surface-1/50"
    )}>
      {/* Background decoration */}
      <div className={cn(
        "absolute inset-0 -z-10",
        "bg-grid-pattern",
        "opacity-5"
      )} />

      <div className="container mx-auto px-4 sm:px-6">
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
            Langues
          </Typography>
          <Typography 
            level="body1" 
            className={cn(
              "text-text-secondary",
              "max-w-2xl mx-auto"
            )}
          >
            Mes compétences linguistiques
          </Typography>
        </div>

        {/* Languages Display */}
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {isLoading ? (
            // Afficher 3 skeletons pendant le chargement
            <>
              <LanguageCircleSkeleton />
              <LanguageCircleSkeleton />
              <LanguageCircleSkeleton />
            </>
          ) : languages.map((language, index) => {
            const colors = levelColors[language.level] || {
              from: 'from-gray-500/20',
              to: 'to-gray-600/20',
              text: 'text-text-secondary'
            };
            
            return (
              <LanguageCircle
                key={index}
                name={language.name}
                icon={language.icon}
                level={language.level}
                gradientFrom={colors.from}
                gradientTo={colors.to}
                textColor={colors.text}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
