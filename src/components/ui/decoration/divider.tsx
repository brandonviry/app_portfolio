import { cn } from "@/lib/utils";

interface DividerProps {
  variant?: 'gradient' | 'solid' | 'cta';
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function Divider({ variant = 'gradient', align = 'center', className }: DividerProps) {
  const alignClasses = {
    left: 'mx-0',
    center: 'mx-auto lg:mx-0',
    right: 'ml-auto',
  };

  const variantClasses = {
    gradient: 'bg-gradient-to-r from-accent to-cta',
    solid: 'bg-accent',
    cta: 'bg-cta',
  };

  return (
    <div className={cn(
      "w-20 h-1",
      // Border-radius: 0 (sharp) - pas de rounded
      variantClasses[variant],
      alignClasses[align],
      className
    )} />
  );
}
