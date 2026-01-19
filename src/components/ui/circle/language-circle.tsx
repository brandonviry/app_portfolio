import { Typography } from "@/components/ui/typography/typography";
import { LevelBadge } from "@/components/ui/badge/level-badge";
import { cn } from "@/lib/utils";

interface LanguageCircleProps {
  name: string;
  icon: string;
  level: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  className?: string;
}

export function LanguageCircle({
  name,
  icon,
  level,
  gradientFrom,
  gradientTo,
  textColor,
  className
}: LanguageCircleProps) {
  return (
    <div
      className={cn(
        "group relative",
        "w-[160px] md:w-[180px] aspect-square",
        "transition-all duration-500",
        "hover:scale-105",
        className
      )}
    >
      {/* Outer border with gradient */}
      <div className={cn(
        "absolute inset-0",
        "rounded-full",
        "p-[2px]",
        "bg-gradient-to-br",
        gradientFrom,
        gradientTo,
        "transition-all duration-500"
      )}>
        {/* Inner content */}
        <div className={cn(
          "w-full h-full",
          "rounded-full",
          "bg-background",
          "flex flex-col items-center justify-center",
          "gap-2",
          "relative",
          "border-2 border-border/10"
        )}>
          {/* Language Icon */}
          <span className={cn(
            "text-5xl md:text-6xl",
            "transform transition-transform duration-500",
            "group-hover:scale-110"
          )}>
            {icon}
          </span>

          {/* Language Name */}
          <Typography
            level="h6"
            className={cn(
              "font-bold text-sm md:text-base",
              "text-center",
              "text-text-primary"
            )}
          >
            {name}
          </Typography>

          {/* Glow effect on hover */}
          <div className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-br",
            gradientFrom,
            gradientTo,
            "opacity-0 group-hover:opacity-10",
            "transition-opacity duration-500",
            "pointer-events-none"
          )} />
        </div>
      </div>

      {/* Level Badge - positioned outside bottom */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
        <LevelBadge
          level={level}
          color={textColor}
          className="shadow-lg"
        />
      </div>
    </div>
  );
}
