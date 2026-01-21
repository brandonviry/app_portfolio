import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
  onRemove?: () => void; // Pour mode multi-sélection avec X
  className?: string;
  showCount?: boolean;
}

export function FilterChip({
  label,
  count,
  active,
  onClick,
  onRemove,
  className,
  showCount = true
}: FilterChipProps) {
  return (
    <div
      className={cn(
        // Base styles
        "group/chip",
        "relative inline-flex items-center gap-2",
        "px-3 py-1.5 md:px-4 md:py-2",
        "border-2",
        "transition-all duration-300",
        "font-medium text-sm",
        "cursor-pointer",
        // États
        active ? [
          "border-accent bg-accent/10",
          "text-accent",
          "shadow-md shadow-accent/20"
        ] : [
          "border-border/20 bg-surface-1/30",
          "text-text-secondary",
          "hover:border-accent/50 hover:text-accent",
          "hover:-translate-y-0.5"
        ],
        className
      )}
      onClick={onClick}
    >
      {/* Corner accent (top-left) - visible au hover ou si actif */}
      <div className={cn(
        "absolute top-0 left-0",
        "w-1 h-1",
        "border-t-2 border-l-2",
        active ? "border-accent opacity-100" : "border-accent/50 opacity-0",
        "group-hover/chip:opacity-100",
        "transition-opacity duration-300"
      )} />

      {/* Label */}
      <span className="select-none">{label}</span>

      {/* Count badge */}
      {showCount && count !== undefined && (
        <span className={cn(
          "inline-flex items-center justify-center",
          "min-w-[20px] h-5",
          "px-1.5",
          "text-xs font-bold",
          "border",
          active ? [
            "bg-accent text-white",
            "border-accent"
          ] : [
            "bg-surface-2 text-text-secondary",
            "border-border/30"
          ],
          "transition-colors duration-300"
        )}>
          {count}
        </span>
      )}

      {/* Remove button (X) pour mode multi-sélection */}
      {active && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={cn(
            "ml-1 p-0.5",
            "text-accent hover:text-cta",
            "transition-colors duration-200"
          )}
          aria-label={`Retirer le filtre ${label}`}
        >
          <X className="w-3 h-3" strokeWidth={3} />
        </button>
      )}

      {/* Scan line effect */}
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-r from-transparent via-accent/10 to-transparent",
        "translate-x-[-100%] group-hover/chip:translate-x-[100%]",
        "transition-transform duration-700 ease-out",
        "pointer-events-none"
      )} />
    </div>
  );
}
