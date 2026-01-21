'use client';

import { useState, useEffect } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoTooltipProps {
  content: string;
  className?: string;
}

export function InfoTooltip({ content, className }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Éviter l'erreur d'hydratation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn("relative inline-block", className)}>
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className={cn(
          "inline-flex items-center justify-center",
          "w-4 h-4 rounded-full",
          "text-text-secondary hover:text-accent",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-accent/50"
        )}
        aria-label="Information"
      >
        <Info className="w-3.5 h-3.5" strokeWidth={2.5} />
      </button>

      {/* Tooltip - seulement côté client */}
      {isMounted && isVisible && (
        <div
          className={cn(
            "absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2",
            "w-64 px-3 py-2",
            "bg-surface-1 border-2 border-accent/30 rounded-lg shadow-xl",
            "text-xs text-text-primary leading-relaxed",
            "pointer-events-none"
          )}
        >
          {content}
          {/* Flèche */}
          <div className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 -mt-[2px]",
            "w-0 h-0",
            "border-l-[6px] border-l-transparent",
            "border-r-[6px] border-r-transparent",
            "border-t-[6px] border-t-accent/30"
          )} />
        </div>
      )}
    </div>
  );
}
