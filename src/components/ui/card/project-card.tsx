'use client';

import { Button } from "../button/button";
import { Typography } from "../typography/typography";
import type { Project } from "@/lib/notion/projet_api";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

function ProjectCardSkeleton() {
  return (
    <div className={cn(
      "w-full h-full",
      "bg-surface-1 backdrop-blur-sm",
      "rounded-lg md:rounded-xl",
      "border border-border/10",
      "overflow-hidden",
      "transition-all duration-300",
      "hover:border-border/20",
      "hover:shadow-lg hover:shadow-accent/5"
    )}>
      {/* Thumbnail skeleton */}
      <div className="relative w-full rounded-t-lg md:rounded-t-xl overflow-hidden">
        <div className="aspect-video bg-surface-2 animate-pulse" />
      </div>
      {/* Content skeleton */}
      <div className="p-3 md:p-4 space-y-3">
        <div className="h-4 md:h-5 bg-surface-2 rounded-md w-4/5 animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 md:h-4 bg-surface-2/60 rounded-md w-full animate-pulse" />
          <div className="h-3 md:h-4 bg-surface-2/60 rounded-md w-2/3 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (project.Cover) {
      const img = new Image();
      img.src = project.Cover;
      img.onload = () => setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [project.Cover]);

  return (
    <>
      {isLoading ? (
        <ProjectCardSkeleton />
      ) : (
        <a 
          href={project.Lien}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            // Base styles
            "block w-full h-full",
            "bg-surface-1 backdrop-blur-sm",
            "rounded-lg md:rounded-xl",
            "border border-border/10",
            "overflow-hidden",
            // Transitions
            "transition-all duration-300",
            // Hover states
            "hover:border-accent/20",
            "hover:shadow-lg hover:shadow-accent/5",
            "hover:translate-y-[-2px]",
            // Disabled state
            !project.Lien && "pointer-events-none opacity-80"
          )}
        >
          {/* Thumbnail */}
          <div className="relative w-full rounded-t-lg md:rounded-t-xl overflow-hidden">
            {project.Cover && (
              <div className="aspect-video">
                <img
                  src={project.Cover}
                  alt={project.titre}
                  className={cn(
                    "w-full h-full object-cover",
                    "transition-transform duration-300",
                    "group-hover:scale-105"
                  )}
                  loading="lazy"
                />
              </div>
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
      )}
    </>
  );
}
