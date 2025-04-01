import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";
import { ActionButtons } from "../action/action-buttons";

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
          <Typography 
            level="h1" 
            className={cn(
              "text-text-primary",
              "animate-fade-in",
              "tracking-tight",
              "leading-tight"
            )}
          >
            Bienvenue sur mon Portfolio
          </Typography>
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

        {/* Subtitle */}
        <Typography 
          level="h4" 
          className={cn(
            "text-text-secondary",
            "animate-fade-in animation-delay-400",
            "max-w-2xl mx-auto",
            "leading-relaxed"
          )}
        >
          Je crée des expériences web innovantes et performantes
        </Typography>

        {/* Call to action */}
        <div className={cn(
          "animate-fade-in animation-delay-600",
          "pt-8"
        )}>
          <ActionButtons />
        </div>
      </div>
    </section>
  );
}
