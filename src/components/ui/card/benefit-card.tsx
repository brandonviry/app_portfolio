import { Typography } from "../typography/typography";
import type { Benefit } from "@/store/benefits_data";
import { cn } from "@/lib/utils";
import { Zap, Code2, Rocket, MessageSquare, CheckCircle2, ShieldCheck, Cpu, Handshake } from "lucide-react";

interface BenefitCardProps {
  benefit: Benefit;
}

// Mapping des noms d'icônes vers les composants Lucide
const iconMap: Record<string, typeof Zap> = {
  Zap,
  Code2,
  Rocket,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Handshake
};

export function BenefitCard({ benefit }: BenefitCardProps) {
  const IconComponent = benefit.icon ? iconMap[benefit.icon] : CheckCircle2;

  return (
    <div
      className={cn(
        "group/benefit",
        "relative",
        "flex flex-col",
        "w-full h-full",
        "bg-surface-1/50 backdrop-blur-sm",
        "border-2 border-border/20",
        "p-4 md:p-5",
        "transition-all duration-300",
        "hover:border-accent/50",
        "hover:shadow-lg hover:shadow-accent/10",
        "hover:-translate-y-1"
      )}
    >
      {/* Corner accents - Top left */}
      <div className={cn(
        "absolute top-0 left-0",
        "w-2 h-2",
        "border-t-2 border-l-2 border-accent",
        "opacity-0 group-hover/benefit:opacity-100",
        "transition-opacity duration-300",
        "z-10"
      )} />

      {/* Corner accent - Bottom right */}
      <div className={cn(
        "absolute bottom-0 right-0",
        "w-2 h-2",
        "border-b-2 border-r-2 border-cta",
        "opacity-0 group-hover/benefit:opacity-100",
        "transition-opacity duration-300",
        "z-10"
      )} />

      {/* Icon */}
      <div className={cn(
        "mb-4",
        "flex items-center justify-start"
      )}>
        <div className={cn(
          "relative",
          "w-10 h-10 md:w-11 md:h-11",
          "flex items-center justify-center",
          "border-2 border-accent",
          "bg-accent/10",
          "transition-all duration-300",
          "group-hover/benefit:border-accent",
          "group-hover/benefit:bg-accent/20"
        )}>
          <IconComponent
            className={cn(
              "w-5 h-5 md:w-6 md:h-6",
              "text-accent",
              "transition-colors duration-300"
            )}
            strokeWidth={2.5}
          />

          {/* Corner accent on icon */}
          <div className={cn(
            "absolute top-0 left-0",
            "w-1 h-1",
            "border-t-2 border-l-2 border-accent",
            "opacity-0 group-hover/benefit:opacity-100",
            "transition-opacity duration-300"
          )} />
        </div>
      </div>

      {/* Title */}
      <Typography
        level="h3"
        className={cn(
          "text-text-primary",
          "text-lg md:text-xl",
          "font-bold",
          "mb-2",
          "transition-colors duration-200",
          "group-hover/benefit:text-accent"
        )}
      >
        {benefit.title}
      </Typography>

      {/* Description */}
      <Typography
        level="body1"
        className={cn(
          "text-text-secondary",
          "text-xs md:text-sm",
          "leading-relaxed",
          "mb-4"
        )}
      >
        {benefit.description}
      </Typography>

      {/* Features list */}
      <ul className={cn(
        "space-y-1.5 md:space-y-2",
        "mb-4 flex-grow"
      )}>
        {benefit.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-start gap-1.5"
          >
            <CheckCircle2
              className={cn(
                "w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0",
                "text-accent",
                "mt-0.5"
              )}
              strokeWidth={2.5}
            />
            <Typography
              level="body2"
              className={cn(
                "text-text-secondary",
                "text-xs"
              )}
            >
              {feature}
            </Typography>
          </li>
        ))}
      </ul>

      {/* Scan line effect */}
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-b from-transparent via-accent/5 to-transparent",
        "translate-y-[-100%] group-hover/benefit:translate-y-[100%]",
        "transition-transform duration-1000 ease-out",
        "pointer-events-none"
      )} />
    </div>
  );
}
