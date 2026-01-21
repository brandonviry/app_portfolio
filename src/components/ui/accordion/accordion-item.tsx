'use client';

import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  badge?: string | number;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({
  title,
  isOpen,
  onToggle,
  badge,
  children,
  className
}: AccordionItemProps) {
  return (
    <div className={cn(
      "border border-border/20 rounded-lg overflow-hidden",
      "transition-all duration-200",
      isOpen ? "bg-surface-1/30" : "bg-transparent hover:bg-surface-1/10",
      className
    )}>
      {/* Header */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full px-4 py-3",
          "flex items-center justify-between",
          "text-left",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-inset"
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className={cn(
            "text-sm font-semibold",
            isOpen ? "text-accent" : "text-text-primary"
          )}>
            {title}
          </span>

          {badge !== undefined && (
            <span className={cn(
              "px-2 py-0.5 rounded text-xs font-bold",
              isOpen
                ? "bg-accent/20 text-accent border border-accent/30"
                : "bg-border/20 text-text-secondary"
            )}>
              {badge}
            </span>
          )}
        </div>

        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-300",
            isOpen ? "rotate-180 text-accent" : "rotate-0 text-text-secondary"
          )}
          strokeWidth={2}
        />
      </button>

      {/* Content */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
