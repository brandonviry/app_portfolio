'use client';

import { Button } from "../button/button";
import { Typography } from "../typography/typography";
import type { Project } from "@/lib/notion/projet_api";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <a 
      href={project.Lien}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block w-full h-full",
        "bg-surface-1 backdrop-blur-sm",
        "rounded-lg md:rounded-xl",
        "border border-border/10",
        "overflow-hidden",
        "transition-all duration-300",
        "hover:border-accent/20",
        "hover:shadow-lg hover:shadow-accent/5",
        "hover:translate-y-[-2px]",
        !project.Lien && "pointer-events-none opacity-80"
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full rounded-t-lg md:rounded-t-xl overflow-hidden">
        {project.Cover && !imageError ? (
          <div className="aspect-video">
            {isImageLoading && (
              <div className="absolute inset-0 bg-surface-2 animate-pulse" />
            )}
            <Image
              src={project.Cover}
              alt={project.titre}
              width={800}
              height={450}
              className={cn(
                "w-full h-full object-cover",
                "transition-transform duration-300",
                "group-hover:scale-105",
                isImageLoading && "opacity-0"
              )}
              onLoadingComplete={() => setIsImageLoading(false)}
              onError={() => {
                setIsImageLoading(false);
                setImageError(true);
              }}
              unoptimized
            />
          </div>
        ) : (
          <div className="aspect-video bg-surface-2" />
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 space-y-3">
        <Typography 
          level="h3"
          className={cn(
            "line-clamp-2 text-left",
            "text-base md:text-lg",
            "font-medium text-text-primary",
            "transition-colors duration-200",
            "group-hover:text-accent"
          )}
        >
          {project.titre}
        </Typography>
        
        <Typography 
          level="body2"
          className={cn(
            "line-clamp-3 text-left",
            "text-sm md:text-base",
            "text-text-secondary"
          )}
        >
          {project.Description}
        </Typography>

        {project.Lien && (
          <div className="pt-2 md:pt-3">
            <Button 
              variant="ghost" 
              size="sm"
              className={cn(
                "group/button",
                "text-text-secondary",
                "hover:text-accent"
              )}
            >
              <span>Voir le projet</span>
              <svg
                className={cn(
                  "ml-1 w-4 h-4",
                  "transition-transform duration-200",
                  "group-hover/button:translate-x-1"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </a>
  );
}
