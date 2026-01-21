'use client';

import { Typography } from "../typography/typography";
import { StarRating } from "../rating/star-rating";
import { Avatar } from "../avatar/avatar";
import type { Testimonial } from "@/store/testimonials_data";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {

  return (
    <div
      className={cn(
        "group/testimonial",
        "relative",
        "flex flex-col",
        "w-full h-full",
        "bg-surface-1/50 backdrop-blur-sm",
        "border-2 border-border/20",
        "p-6 md:p-8",
        "transition-all duration-300",
        "hover:border-accent/50",
        "hover:shadow-lg hover:shadow-accent/10",
        "hover:-translate-y-1"
      )}
    >
      {/* Corner accents - Top left */}
      <div className={cn(
        "absolute top-0 left-0",
        "w-2 h-2",
        "border-t-2 border-l-2 border-accent",
        "opacity-0 group-hover/testimonial:opacity-100",
        "transition-opacity duration-300",
        "z-10"
      )} />

      {/* Corner accent - Bottom right */}
      <div className={cn(
        "absolute bottom-0 right-0",
        "w-2 h-2",
        "border-b-2 border-r-2 border-cta",
        "opacity-0 group-hover/testimonial:opacity-100",
        "transition-opacity duration-300",
        "z-10"
      )} />

      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} size="md" />
      </div>

      {/* Content/Quote */}
      <div className="flex-grow mb-6">
        <Typography
          level="body1"
          className={cn(
            "text-text-secondary",
            "text-sm md:text-base",
            "leading-relaxed",
            "italic",
            "relative"
          )}
        >
          <span className={cn(
            "absolute -left-2 -top-1",
            "text-accent/30",
            "text-2xl font-bold"
          )}>
            "
          </span>
          {testimonial.content}
          <span className={cn(
            "text-accent/30",
            "text-2xl font-bold"
          )}>
            "
          </span>
        </Typography>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-4">
        {/* Photo using Avatar UI component */}
        <Avatar
          src={testimonial.photoUrl}
          alt={testimonial.name}
          size="md"
          showCornerAccent={true}
          className="group-hover/testimonial:border-accent/50"
        />

        {/* Name, role, company */}
        <div className="flex flex-col">
          <Typography
            level="h6"
            className={cn(
              "text-text-primary",
              "text-sm md:text-base",
              "font-semibold",
              "transition-colors duration-200",
              "group-hover/testimonial:text-accent"
            )}
          >
            {testimonial.name}
          </Typography>
          <Typography
            level="body2"
            className={cn(
              "text-text-secondary",
              "text-xs md:text-sm"
            )}
          >
            {testimonial.role} • {testimonial.company}
          </Typography>
        </div>
      </div>

      {/* Scan line effect */}
      <div className={cn(
        "absolute inset-0",
        "bg-gradient-to-b from-transparent via-accent/5 to-transparent",
        "translate-y-[-100%] group-hover/testimonial:translate-y-[100%]",
        "transition-transform duration-1000 ease-out",
        "pointer-events-none"
      )} />
    </div>
  );
}
