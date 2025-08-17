'use client';

import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";
import { Description } from "@/lib/notion/description_api";
import { useEffect, useState } from "react";
import Image from "next/image";

function ImagePlaceholder() {
  return (
    <div className="relative w-full aspect-square lg:aspect-[4/5] bg-surface-2/50">
      <div className="absolute inset-0 flex items-center justify-center text-text-secondary/20">
        <svg
          className="w-16 h-16"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v8l4-2 4 4 4-6 4 4V6H4zm0 13.828V16l4-2 4 4 4-6 4 4v1.828a.2.2 0 01-.2.2H4.2a.2.2 0 01-.2-.2zM8 11a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </div>
    </div>
  );
}

function DescriptionSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 animate-pulse max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ImagePlaceholder />
      <div className="space-y-8 lg:pr-8">
        <div className="h-12 bg-surface-2/50 rounded-sm w-2/3" />
        <div className="space-y-4">
          <div className="h-4 bg-surface-2/50 rounded-sm w-full" />
          <div className="h-4 bg-surface-2/50 rounded-sm w-full" />
          <div className="h-4 bg-surface-2/50 rounded-sm w-3/4" />
        </div>
      </div>
    </div>
  );
}

export function DescriptionSection() {
  const [description, setDescription] = useState<Description | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/description', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          cache: 'no-store'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch description');
        }

        const data = await response.json();
        if (!data) {
          throw new Error('No description found');
        }

        setDescription(data);
      } catch (error) {
        console.error('Error fetching description:', error);
        setError(error instanceof Error ? error.message : 'Failed to load description');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDescription();
  }, []);

  if (error) {
    return (
      <section className="w-full py-24 md:py-32 bg-surface-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Typography 
            level="body1" 
            className="text-error text-center"
          >
            {error}
          </Typography>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-24 md:py-32 bg-surface-1">
      {isLoading || !description ? (
        <DescriptionSkeleton />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-square lg:aspect-[4/5]">
            {!imageLoaded && <ImagePlaceholder />}
            <Image
              src="/images/avatar.webp"
              alt="logo"
              fill
              className={cn(
                "object-cover",
                "transition-all duration-300",
                !imageLoaded && "opacity-0"
              )}
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </div>

          <div className="space-y-8 lg:pl-8">
            <div className="text-center lg:text-left mb-8">
              <Typography 
                level="h2" 
                className={cn(
                  "text-text-primary",
                  "mb-4"
                )}
              >
                À propos de moi
              </Typography>
            </div>

            <Typography 
              level="body1" 
              className={cn(
                "text-text-secondary",
                "text-lg leading-relaxed",
                "font-light",
                "whitespace-pre-wrap",
                "max-w-xl"
              )}
            >
              {description.description}
            </Typography>
          </div>
        </div>
      )}
    </section>
  );
}
