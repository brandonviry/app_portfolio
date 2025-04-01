import { cn } from "@/lib/utils";

interface LevelBadgeProps {
  level: string;
  color?: string;
  className?: string;
}

export function LevelBadge({ level, color, className }: LevelBadgeProps) {
  return (
    <div className={cn(
      "px-3 py-0.5",
      "rounded-full",
      "text-xs font-medium",
      "bg-surface-1",
      "border border-border/10",
      "shadow-sm",
      color || 'text-text-secondary',
      className
    )}>
      {level}
    </div>
  );
}
