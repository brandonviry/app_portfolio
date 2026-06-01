"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className={cn("w-full", className)}>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            id={id}
            className={cn(
              "mt-0.5 h-4 w-4 shrink-0 cursor-pointer",
              "border border-border/50",
              "accent-accent"
            )}
            ref={ref}
            {...props}
          />
          <span className="text-sm leading-relaxed text-text-secondary group-hover:text-text-primary transition-colors duration-200">
            {label}
          </span>
        </label>
        {error && (
          <p className="text-red-500 text-sm mt-1 ml-7">{error}</p>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = "FormCheckbox";
