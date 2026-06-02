"use client";

import { useState } from "react";
import { Typography } from "@/components/ui/typography/typography";
import { Divider } from "@/components/ui/decoration/divider";
import { SkillTag } from "@/components/ui/badge/skill-tag";
import { cn } from "@/lib/utils";
import { skillsData } from "@/store/skills_data";

export function TechnologiesSection() {
  const [activeId, setActiveId] = useState(skillsData[0].id);
  const activePole = skillsData.find((p) => p.id === activeId)!;

  return (
    <section className={cn("relative py-16 md:py-24")}>
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(var(--accent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6">

        {/* Titre */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <Typography
            level="h2"
            className="text-accent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Savoir-faire
          </Typography>
          <Divider variant="gradient" align="center" className="mx-auto" />
        </div>

        {/* Onglets */}
        <div className="flex justify-center gap-2 mb-10">
          {skillsData.map((pole) => (
            <button
              key={pole.id}
              onClick={() => setActiveId(pole.id)}
              className={cn(
                "px-6 py-2 text-sm font-bold tracking-widest uppercase",
                "border-2 transition-all duration-200",
                activeId === pole.id
                  ? "bg-accent text-white border-accent"
                  : "bg-transparent text-text-secondary border-border/40 hover:border-accent/60 hover:text-accent"
              )}
            >
              {pole.label}
            </button>
          ))}
        </div>

        {/* Description du pôle actif */}
        <p className="text-center text-xs text-text-muted uppercase tracking-widest mb-10">
          {activePole.description}
        </p>

        {/* Grille des sous-groupes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {activePole.groups.map((group) => (
            <div
              key={group.title}
              className={cn(
                "relative p-5",
                "border border-border/20 bg-surface-1",
                "space-y-3"
              )}
            >
              {/* Coin décoratif */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent/50" />

              {/* Titre du groupe */}
              <p className="text-xs font-semibold uppercase tracking-widest text-accent border-l-2 border-accent pl-2">
                {group.title}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {group.tools.map((tool) => (
                  <SkillTag key={tool} label={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
