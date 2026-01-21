'use client';

import { Typography } from "@/components/ui/typography/typography";
import { Button } from "@/components/ui/button/button";
import { StatusBadge } from "@/components/ui/badge/status-badge";
import { InfoItem } from "@/components/ui/info/info-item";
import { Divider } from "@/components/ui/decoration/divider";
import { Icon, LocationIcon, BriefcaseIcon, GithubIcon, MailIcon, PingIcon } from "@/components/ui/icon/icon";
import { cn } from "@/lib/utils";
import { descriptionData } from "@/store/description_data";
import { useState } from "react";
import Image from "next/image";
import { FolderGit2 } from 'lucide-react';

function ImagePlaceholder() {
  return (
    <div className="relative w-full aspect-square lg:aspect-[4/5] bg-surface-2/50 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-text-secondary/20">
        <svg
          className="w-16 h-16 md:w-20 md:h-20"
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
    <section className={cn(
      "relative w-full",
      "py-16 md:py-24 lg:py-32",
      "bg-surface-1"
    )}>
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className={cn(
        "max-w-7xl mx-auto",
        "px-4 sm:px-6 lg:px-8"
      )}>
        {/* Grid responsive */}
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2",
          "gap-8 md:gap-12 lg:gap-16 xl:gap-20",
          "items-center"
        )}>

          {/* Image - Ordre 2 sur mobile, 1 sur desktop */}
          <div className={cn(
            "relative w-full",
            "order-2 lg:order-1"
          )}>
            {/* Glow effect */}
            <div className={cn(
              "absolute inset-0",
              "bg-gradient-to-br from-accent/20 to-primary/20",
              "blur-3xl -z-10",
              "scale-105"
            )} />

            {/* Image container */}
            <div className={cn(
              "relative w-full",
              "aspect-square sm:aspect-[4/5] lg:aspect-square xl:aspect-[4/5]",
              "max-w-md lg:max-w-none mx-auto"
            )}>
              {!imageLoaded && <ImagePlaceholder />}
              <Image
                src={descriptionData.imageUrl}
                alt="Photo de profil"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className={cn(
                  "object-cover",
                  "transition-all duration-500 ease-out",
                  !imageLoaded && "opacity-0 scale-95",
                  imageLoaded && "opacity-100 scale-100"
                )}
                onLoadingComplete={() => setImageLoaded(true)}
                priority
              />

              {/* Border sharp rouge */}
              <div className={cn(
                "absolute inset-0",
                "border-2 border-cta",
                "pointer-events-none"
              )} />
            </div>
          </div>

          {/* Contenu texte - Ordre 1 sur mobile, 2 sur desktop */}
          <div className={cn(
            "space-y-6 md:space-y-8",
            "order-1 lg:order-2"
          )}>

            {/* En-tête */}
            <div className={cn(
              "text-center lg:text-left",
              "space-y-3 md:space-y-4"
            )}>
              {/* Status Badge */}
              <StatusBadge
                label="Développeur Web"
                icon={<PingIcon />}
                variant="default"
              />

              {/* Titre principal - Bleu accent (#00a8e8) selon branding */}
              <Typography
                level="h2"
                className={cn(
                  "text-accent",
                  "text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl",
                  "font-bold tracking-tight",
                  "leading-tight"
                )}
              >
                À propos de moi
              </Typography>

              {/* Divider */}
              <Divider align="center" variant="gradient" />
            </div>

            {/* Description */}
            <div className={cn(
              "prose prose-lg max-w-none",
              "text-text-secondary",
              "space-y-4"
            )}>
              <Typography
                level="body1"
                className={cn(
                  "text-text-secondary",
                  "text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl",
                  "leading-relaxed md:leading-relaxed lg:leading-loose",
                  "font-normal",
                  "whitespace-pre-wrap",
                  "text-center lg:text-left",
                  "tracking-normal",
                  "hyphens-auto"
                )}
              >
                {descriptionData.description}
              </Typography>
            </div>

            {/* Informations complémentaires */}
            <div className={cn(
              "pt-6 md:pt-8",
              "flex flex-wrap items-center justify-center lg:justify-start",
              "gap-4 md:gap-6 lg:gap-8"
            )}>
              <InfoItem
                icon={<Icon variant="accent"><LocationIcon /></Icon>}
                label="La Réunion 🇷🇪"
              />
              <InfoItem
                icon={<Icon variant="accent"><BriefcaseIcon /></Icon>}
                label="Ouvert aux opportunités"
              />
            </div>

            {/* Call-to-action */}
            <div className={cn(
              "pt-4 md:pt-6",
              "flex flex-col sm:flex-row items-center justify-center lg:justify-start",
              "gap-3 md:gap-4"
            )}>
              {/* CTA Primaire - Rouge */}
              <Button
                variant="cta"
                size="lg"
                href="/contact"
                fullWidth
                className={cn(
                  "gap-2",
                  "hover:scale-105",
                  "w-full sm:w-auto"
                )}
              >
                <Icon size="md">
                  <MailIcon />
                </Icon>
                Me contacter
              </Button>

              {/* CTA Secondaire - GitHub */}
              <Button
                variant="outline"
                size="lg"
                href="/projets"
                external
                fullWidth
                className={cn(
                  "gap-2",
                  "hover:scale-105",
                  "w-full sm:w-auto"
                )}
              >
                <Icon size="md">
                  <FolderGit2/>
                </Icon>
                
                Voir mes projets
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
