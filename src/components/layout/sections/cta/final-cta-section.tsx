import { Typography } from "@/components/ui/typography/typography";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className={cn(
      "relative",
      "py-20 md:py-28",
      "overflow-hidden"
    )}>
      {/* Background decoration */}
      <div className={cn(
        "absolute inset-0 -z-10",
        "bg-gradient-radial from-cta/5 via-transparent to-transparent",
        "opacity-50"
      )} />

      {/* Border accent top */}
      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2",
        "w-32 h-[2px]",
        "bg-gradient-to-r from-transparent via-cta to-transparent"
      )} />

      {/* Content */}
      <div className={cn(
        "max-w-4xl mx-auto",
        "px-4 sm:px-6",
        "text-center"
      )}>
        <div className={cn(
          "space-y-8",
          "relative"
        )}>
          {/* Corner accents - Top left */}
          <div className={cn(
            "absolute -top-4 -left-4",
            "w-8 h-8",
            "border-t-2 border-l-2 border-accent",
            "opacity-30"
          )} />

          {/* Corner accents - Bottom right */}
          <div className={cn(
            "absolute -bottom-4 -right-4",
            "w-8 h-8",
            "border-b-2 border-r-2 border-cta",
            "opacity-30"
          )} />

          {/* Short copy */}
          <div className="space-y-4">
            <Typography
              level="h2"
              className={cn(
                "text-accent",
                "text-3xl md:text-4xl lg:text-5xl",
                "font-bold tracking-tight"
              )}
            >
            Prêt à rejoindre votre équipe ?
            </Typography>

            <Typography
              level="body1"
              className={cn(
                "text-text-secondary",
                "text-lg md:text-xl",
                "max-w-2xl mx-auto",
                "leading-relaxed"
              )}
            >
              Mon profil vous intéresse ? Discutons de la manière dont je peux contribuer au succès de votre entreprise.
            </Typography>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              variant="cta"
              size="xl"
              href="/contact"
              className={cn(
                "group/cta",
                "min-w-[240px]",
                "hover:scale-105",
                "transition-transform duration-300"
              )}
            >
              <span>Me contacter</span>
              <ArrowRight
                className={cn(
                  "ml-2 w-5 h-5",
                  "transition-transform duration-200",
                  "group-hover/cta:translate-x-1"
                )}
                strokeWidth={2.5}
              />
            </Button>
          </div>

          {/* Status indicator */}
          <div className={cn(
            "flex items-center justify-center gap-2",
            "pt-6",
            "text-text-secondary text-sm"
          )}>
            <div className={cn(
              "w-2 h-2",
              "bg-cta",
              "animate-pulse"
            )} />
            <span>En recherche active</span>
          </div>
        </div>
      </div>

      {/* Border accent bottom */}
      <div className={cn(
        "absolute bottom-0 left-1/2 -translate-x-1/2",
        "w-32 h-[2px]",
        "bg-gradient-to-r from-transparent via-accent to-transparent"
      )} />
    </section>
  );
}
