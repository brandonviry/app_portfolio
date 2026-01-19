"use client";

import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";

const contactInfo = [
  {
    title: "Email",
    value: "brandonviry@gmail.com",
    icon: "📧",
    href: "mailto:brandonviry@gmail.com"
  },
  {
    title: "LinkedIn",
    value: "linkedin.com/in/brandon-viry-81187b237",
    icon: "💼",
    href: "https://linkedin.com/in/brandon-viry-81187b237"
  },
  {
    title: "GitHub",
    value: "https://github.com/brandonviry/",
    icon: "💻",
    href: "https://github.com/brandonviry/"
  },
];

export function ContactInfo() {
  return (
    <div className={cn(
      "flex flex-col gap-4",
      "w-full max-w-2xl",
      "mx-auto"
    )}>
      {contactInfo.map((info) => (
        <Link
          key={info.title}
          href={info.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            // Base styles
            "group relative block w-full",
            "p-6",
            "bg-gradient-to-r from-surface-2/50 to-surface-1/30",
            "backdrop-blur-sm",
            "border-2 border-border/20",
            // Hover effects - CTA styling
            "hover:from-surface-2/70 hover:to-surface-1/50",
            "hover:border-cta/50",
            "hover:shadow-xl hover:shadow-cta/10",
            // Transitions
            "transition-all duration-500 ease-out",
            // Layout
            "overflow-hidden"
          )}
        >
          {/* Glowing effect - CTA color */}
          <div className={cn(
            "absolute inset-0",
            "bg-gradient-to-r from-cta/0 to-cta/0",
            "opacity-0 group-hover:opacity-10",
            "transition-opacity duration-500",
            "pointer-events-none"
          )} />

          <div className="relative flex items-center gap-6">
            {/* Icon */}
            <div className={cn(
              "flex-shrink-0",
              "w-12 h-12",
              "flex items-center justify-center",
              "",
              "bg-gradient-to-r from-surface-3/80 to-surface-2/50",
              "text-2xl",
              "shadow-lg shadow-accent/5",
              "group-hover:scale-110 group-hover:shadow-xl",
              "transition-all duration-500"
            )}>
              {info.icon}
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0">
              <Typography
                level="h6"
                className={cn(
                  "text-text-primary",
                  "group-hover:text-cta",
                  "transition-colors duration-300",
                  "whitespace-nowrap",
                  "text-lg font-semibold",
                  "mb-1"
                )}
              >
                {info.title}
              </Typography>
              
              <Typography 
                level="body2" 
                className={cn(
                  "text-text-secondary/80",
                  "text-sm",
                  "truncate",
                  "font-medium"
                )}
              >
                {info.value}
              </Typography>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
