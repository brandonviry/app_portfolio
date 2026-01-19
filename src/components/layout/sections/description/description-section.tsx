'use client';

import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";
import { descriptionData } from "@/store/description_data";
import { useState } from "react";
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

export function DescriptionSection() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="w-full py-24 md:py-32 bg-surface-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-square lg:aspect-[4/5]">
          {!imageLoaded && <ImagePlaceholder />}
          <Image
            src={descriptionData.imageUrl}
            alt="Photo de profil"
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
            {descriptionData.description}
          </Typography>
        </div>
      </div>
    </section>
  );
}
