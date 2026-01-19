'use client';

import { Button } from "../button/button";
import { Typography } from "../typography/typography";
import type { Project } from "@/store/projects_data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "group/card",
        "flex flex-col",
        "w-full h-full",
        "bg-surface-1 backdrop-blur-sm",
        "border-2 border-border/20",
        "overflow-hidden",
        "transition-all duration-300",
        "hover:border-cta/50",
        "hover:shadow-lg hover:shadow-cta/10",
        "hover:-translate-y-1",
        !project.Lien && "pointer-events-none opacity-80"
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full flex-shrink-0 overflow-hidden">
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
                "group-hover/card:scale-105",
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
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <div className="flex-grow space-y-3">
          <Typography
            level="h3"
            className={cn(
              "line-clamp-2 text-left",
              "text-base md:text-lg",
              "font-medium text-text-primary",
              "transition-colors duration-200",
              "group-hover/card:text-cta"
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
        </div>

        {project.Lien && (
          <div className="pt-3 md:pt-4 mt-auto">
            <Button
              variant="ghost"
              size="sm"
              href={project.Lien}
              external
              className={cn(
                "w-full",
                "group/button"
              )}
            >
              <span>Voir le projet</span>
              <ArrowRight
                className={cn(
                  "ml-1 w-4 h-4",
                  "transition-transform duration-200",
                  "group-hover/button:translate-x-1"
                )}
                strokeWidth={2.5}
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
