import { Typography } from "@/components/ui/typography/typography";
import { Divider } from "@/components/ui/decoration/divider";
import { SkillTag } from "@/components/ui/badge/skill-tag";
import { cn } from "@/lib/utils";
import { skillsData } from "@/store/skills_data";

export function TechnologiesSection() {
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
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <Typography
            level="h2"
            className="text-accent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Technologies & Outils
          </Typography>
          <Divider variant="gradient" align="center" className="mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillsData.map((pole) => (
            <div
              key={pole.id}
              className={cn(
                "relative flex flex-col gap-6 p-8",
                "border border-border/20 bg-surface-1",
                "transition-all duration-300",
                "hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5",
                "group"
              )}
            >
              {/* Coin décoratif top-left */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/40 group-hover:border-accent transition-colors duration-300" />
              {/* Coin décoratif bottom-right */}
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cta/30 group-hover:border-cta transition-colors duration-300" />

              {/* Titre du pôle */}
              <div className="space-y-2">
                <Typography
                  level="h3"
                  className="text-accent font-extrabold text-4xl tracking-widest"
                >
                  {pole.label}
                </Typography>
                <Typography
                  level="body2"
                  className="text-text-muted text-xs uppercase tracking-widest"
                >
                  {pole.description}
                </Typography>
                <Divider variant="gradient" align="left" />
              </div>

              {/* Tags outils */}
              <div className="flex flex-wrap gap-2">
                {pole.tools.map((tool) => (
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
