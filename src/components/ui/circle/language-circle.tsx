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
        "w-[180px] aspect-square",
        "p-1",
        "rounded-full",
        "transition-all duration-500",
        "hover:scale-105",
        "bg-gradient-to-br",
        gradientFrom,
        gradientTo,
        className
      )}
    >
      <div className={cn(
        "w-full h-full",
        "rounded-full",
        "bg-surface-1/90 backdrop-blur-sm",
        "flex flex-col items-center justify-center",
        "p-4",
        "relative"
      )}>
        {/* Language Icon */}
        <span className="text-4xl mb-2 transform transition-transform duration-500 group-hover:scale-110">
          {icon}
        </span>

        {/* Language Name */}
        <Typography 
          level="h6"
          className={cn(
            "font-medium text-sm mb-1 text-center",
            "w-full px-2",
            textColor
          )}
        >
          {name}
        </Typography>

        {/* Level Badge */}
        <div className="absolute -bottom-2">
          <LevelBadge level={level} color={textColor} />
        </div>

        {/* Decorative Ring */}
        <div className={cn(
          "absolute inset-0",
          "border-2 border-dashed rounded-full",
          "opacity-20",
          "animate-[spin_20s_linear_infinite]",
          textColor || 'border-text-secondary'
        )} />
      </div>
    </div>
  );
}
