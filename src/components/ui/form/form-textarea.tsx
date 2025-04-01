"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { Typography } from "../typography/typography";

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <Typography level="body2" className="text-foreground mb-1">
            {label}
          </Typography>
        )}
        <textarea
          id={id}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-border/50",
            "bg-background/50 px-3 py-2",
            "text-sm text-black",
            "ring-offset-background",
            "placeholder:text-foreground/40",
            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export { FormTextarea };
