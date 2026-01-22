import { Typography } from "@/components/ui/typography/typography";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { FolderGit2, Mail } from 'lucide-react';
import { Icon } from "@/components/ui/icon/icon";

export function HeroSection() {
  return (
    <section className={cn(
      "relative min-h-[calc(100vh-4rem)]",
      "flex flex-col items-center justify-center",
      "py-16 md:py-24",
      "text-center"
    )}>
      {/* Background decoration */}
      <div className={cn(
        "absolute inset-0 -z-10",
        "bg-gradient-radial from-accent/5 via-transparent to-transparent",
        "opacity-75"
      )} />

      {/* Content */}
      <div className={cn(
        "space-y-8",
        "px-4 sm:px-6",
        "max-w-4xl mx-auto"
      )}>
        {/* Main heading group */}
        <div className="space-y-4">
          {/* H1 - Bleu accent (#00a8e8) selon branding */}
          <Typography
            level="h1"
            className={cn(
              "text-accent",
              "animate-fade-in",
              "tracking-tight",
              "leading-tight"
            )}
          >
            Portfolio VIRY BRANDON - Développeur Full Stack
          </Typography>

          {/* H3 - Bleu accent (#00a8e8) selon branding */}
          <Typography
            level="h3"
            className={cn(
              "text-accent",
              "animate-fade-in animation-delay-200",
              "font-medium"
            )}
          >
            Développeur Full Stack Passionné
          </Typography>
        </div>

        {/* Subtitle - Texte blanc */}
        <Typography
          level="h4"
          className={cn(
            "text-text-primary",
            "animate-fade-in animation-delay-400",
            "max-w-2xl mx-auto",
            "leading-relaxed"
          )}
        >
        Création de solutions web modulaires et évolutives (monolithe ou microservices). Je privilégie un code propre et efficace, livré dans les temps. Discutons de vos besoins !
        </Typography>

        {/* Call to action - Atomique avec composants Button */}
        <div className={cn(
          "animate-fade-in animation-delay-600",
          "pt-8",
          "flex flex-wrap items-center justify-center",
          "gap-4 md:gap-6"
        )}>
          {/* CTA Primaire - Rouge */}
          <Button
            variant="cta"
            size="lg"
            href="/projets"
            className={cn(
              "min-w-[180px]",
              "hover:scale-105",
              "transition-transform duration-300",
              "gap-2"
            )}
          >
            <Icon size="md">
              <FolderGit2 />
            </Icon>
            Voir mes projets
          </Button>

          {/* CTA Secondaire - Outline avec border rouge */}
          <Button
            variant="outline"
            size="lg"
            href="/contact"
            className={cn(
              "min-w-[180px]",
              "hover:scale-105",
              "transition-transform duration-300",
              "gap-2"
            )}
          >
            <Icon size="md">
              <Mail />
            </Icon>
            Me contacter
          </Button>
        </div>
      </div>
    </section>
  );
}
