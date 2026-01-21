'use client';

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Typography } from "../typography/typography";

interface LogoDisplayProps {
  imageUrl?: string | null;
  name: string;
  width: number;
  height: number;
  className?: string;
}

export function LogoDisplay({
  imageUrl,
  name,
  width,
  height,
  className
}: LogoDisplayProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "group relative",
        "flex items-center justify-center",
        "w-40 md:w-48",
        "h-20 md:h-24",
        "transition-all duration-300",
        "hover:-translate-y-1",
        className
      )}
    >
      {/* Logo container */}
      <div className={cn(
        "relative",
        "w-full h-full",
        "flex items-center justify-center",
        "border-2 border-border/20",
        "bg-white",
        "transition-all duration-300",
        "group-hover:border-accent/50",
        "group-hover:shadow-lg group-hover:shadow-accent/10"
      )}>
        {/* Corner accent - Top left */}
        <div className={cn(
          "absolute top-0 left-0",
          "w-2 h-2",
          "border-t-2 border-l-2 border-accent",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300",
          "z-10"
        )} />

        {/* Corner accent - Bottom right */}
        <div className={cn(
          "absolute bottom-0 right-0",
          "w-2 h-2",
          "border-b-2 border-r-2 border-cta",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-300",
          "z-10"
        )} />

        {/* Image ou Placeholder */}
        {imageUrl && !imageError ? (
          // Vraie image
          <div className={cn(
            "relative w-full h-full",
            "flex items-center justify-center",
            "p-4"
          )}>
            {isImageLoading && (
              <div className="absolute inset-0 bg-surface-2 animate-pulse" />
            )}
            <Image
              src={imageUrl}
              alt={name}
              width={width}
              height={height}
              className={cn(
                "object-contain",
                "max-w-full max-h-full",
                "transition-all duration-300",
                "filter brightness-0 contrast-100",
                "group-hover:brightness-100 group-hover:contrast-100",
                isImageLoading && "opacity-0"
              )}
              onLoadingComplete={() => setIsImageLoading(false)}
              onError={() => {
                setIsImageLoading(false);
                setImageError(true);
              }}
            />
          </div>
        ) : (
          // Placeholder
          <div className={cn(
            "w-full h-full",
            "flex items-center justify-center",
            "p-3"
          )}>
            <div className={cn(
              "w-full h-full",
              "bg-gradient-to-br from-border/10 to-border/5",
              "flex items-center justify-center",
              "transition-all duration-300",
              "group-hover:from-accent/10 group-hover:to-accent/5"
            )}>
              <Typography
                level="body2"
                className={cn(
                  "text-text-secondary/50",
                  "text-xs",
                  "font-mono",
                  "transition-colors duration-300",
                  "group-hover:text-accent/50"
                )}
              >
                {width} × {height}
              </Typography>
            </div>
          </div>
        )}

        {/* Scan line effect */}
        <div className={cn(
          "absolute inset-0",
          "bg-gradient-to-b from-transparent via-accent/5 to-transparent",
          "translate-y-[-100%] group-hover:translate-y-[100%]",
          "transition-transform duration-1000 ease-out",
          "pointer-events-none"
        )} />
      </div>
    </div>
  );
}
