import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  label: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'accent' | 'success';
  className?: string;
}

export function StatusBadge({ label, icon, variant = 'default', className }: StatusBadgeProps) {
  const variants = {
    default: 'bg-transparent border-cta text-text-primary',
    accent: 'bg-transparent border-accent text-accent',
    success: 'bg-transparent border-green-500 text-green-500',
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-2",
      "px-3 py-1.5 md:px-4 md:py-2",
      "border-2",
      "text-xs md:text-sm font-medium",
      "transition-colors duration-200",
      variants[variant],
      className
    )}>
      {icon}
      {label}
    </div>
  );
}
