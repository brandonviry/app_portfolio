"use client";

import { cn } from "@/lib/utils";
import { forwardRef, TextareaHTMLAttributes } from "react";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-text-primary mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={cn(
            "block w-full",
            "rounded-lg",
            "border border-border/10",
            "bg-background/50",
            "px-4 py-3",
            "text-black placeholder:text-text-secondary/50",
            "focus:outline-none focus:ring-2 focus:ring-accent/20",
            "transition duration-200",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
