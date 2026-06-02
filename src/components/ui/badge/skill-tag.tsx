import { cn } from "@/lib/utils";

interface SkillTagProps {
  label: string;
  className?: string;
}

export function SkillTag({ label, className }: SkillTagProps) {
  return (
    <span className={cn(
      "inline-block px-3 py-1",
      "text-xs font-medium tracking-wide uppercase",
      "border border-border/30 bg-surface-1/50",
      "text-text-secondary",
      "transition-colors duration-200",
      "hover:border-accent/50 hover:text-accent",
      className
    )}>
      {label}
    </span>
  );
}
