'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { User } from "lucide-react";

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showCornerAccent?: boolean;
}

export function Avatar({
  src,
  alt,
  size = "md",
  className,
  showCornerAccent = false
}: AvatarProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-12 h-12 md:w-14 md:h-14",
    lg: "w-16 h-16 md:w-20 md:h-20"
  };

  const iconSizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div
      className={cn(
        "relative flex-shrink-0 overflow-hidden",
        "border-2 border-accent/20",
        "transition-colors duration-300",
        "group-hover:border-accent/50",
        sizeClasses[size],
        className
      )}
    >
      {src && !imageError ? (
        <>
          {isImageLoading && (
            <div className="absolute inset-0 bg-surface-2 animate-pulse" />
          )}
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 48px, 56px"
            className={cn(
              "object-cover",
              "transition-opacity duration-300",
              isImageLoading && "opacity-0"
            )}
            onLoadingComplete={() => setIsImageLoading(false)}
            onError={() => {
              setIsImageLoading(false);
              setImageError(true);
            }}
          />
        </>
      ) : (
        <div className={cn(
          "w-full h-full",
          "bg-surface-2",
          "flex items-center justify-center"
        )}>
          <User
            className={cn(
              iconSizeClasses[size],
              "text-text-secondary/30"
            )}
            strokeWidth={2}
          />
        </div>
      )}

      {/* Corner accent on avatar */}
      {showCornerAccent && (
        <div className={cn(
          "absolute top-0 left-0",
          "w-1 h-1",
          "border-t-2 border-l-2 border-cta",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300"
        )} />
      )}
    </div>
  );
}
