'use client';

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

export type SortOption = {
  value: string;
  label: string;
};

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SortDropdown({
  options,
  value,
  onChange,
  className
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  // Fermer le dropdown au clic en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "group/dropdown",
          "relative inline-flex items-center justify-between gap-3",
          "px-4 py-2",
          "min-w-[180px]",
          "border-2 border-border/20",
          "bg-surface-1/50 backdrop-blur-sm",
          "text-text-primary text-sm font-medium",
          "transition-all duration-300",
          "hover:border-accent/50",
          isOpen && "border-accent/50"
        )}
      >
        {/* Label */}
        <span className="flex-1 text-left">
          {selectedOption?.label || 'Sélectionner...'}
        </span>

        {/* Chevron icon */}
        <ChevronDown
          className={cn(
            "w-4 h-4 flex-shrink-0",
            "text-text-secondary",
            "transition-transform duration-300",
            isOpen && "rotate-180 text-accent"
          )}
          strokeWidth={2.5}
        />

        {/* Corner accent */}
        <div className={cn(
          "absolute top-0 right-0",
          "w-1 h-1",
          "border-t-2 border-r-2",
          isOpen ? "border-accent opacity-100" : "border-accent/50 opacity-0",
          "group-hover/dropdown:opacity-100",
          "transition-opacity duration-300"
        )} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className={cn(
          "absolute top-full left-0 right-0",
          "mt-2 z-50",
          "border-2 border-accent/30",
          "bg-surface-1 backdrop-blur-md",
          "shadow-xl shadow-black/20",
          "animate-in fade-in slide-in-from-top-2 duration-200"
        )}>
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "group/option",
                  "w-full flex items-center justify-between gap-2",
                  "px-4 py-2.5",
                  "text-left text-sm",
                  "border-b border-border/10 last:border-0",
                  "transition-colors duration-200",
                  isSelected ? [
                    "bg-accent/10 text-accent",
                    "font-medium"
                  ] : [
                    "text-text-secondary",
                    "hover:bg-accent/5 hover:text-accent"
                  ]
                )}
              >
                <span>{option.label}</span>

                {isSelected && (
                  <Check className="w-4 h-4 text-accent" strokeWidth={2.5} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
