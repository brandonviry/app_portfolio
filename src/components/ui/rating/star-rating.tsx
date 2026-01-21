import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function StarRating({
  rating,
  maxRating = 5,
  className,
  size = "md"
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <div className={cn(
      "flex items-center gap-0.5",
      className
    )}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            "transition-colors duration-200",
            i < rating
              ? "fill-cta text-cta"
              : "fill-none text-border/30"
          )}
          strokeWidth={2}
        />
      ))}
    </div>
  );
}
