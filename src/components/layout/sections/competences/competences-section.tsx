import { Typography } from "@/components/ui/typography/typography";
import { Button } from "@/components/ui/button/button";
import { Divider } from "@/components/ui/decoration/divider";
import { cn } from "@/lib/utils";

const competences = [
  {
    label: "DEV",
    description: "Développement web, architecture applicative et code propre.",
    href: "/projets",
    external: false,
  },
  {
    label: "CRAFT",
    description: "Full-Stack Product making : no-code, automatisation, outils digitaux.",
    href: "https://steadfast-firefly-f2f.notion.site/1cae9ab38297806f89ecdd95e68a9d2c?v=1cbe9ab382978017a5fe000c37c30f87",
    external: true,
  },
  {
    label: "GRAPH",
    description: "Identité visuelle, design graphique et création de contenus.",
    href: "https://www.behance.net/brandonviry",
    external: true,
  },
];

export function CompetencesSection() {
  return (
    <section className={cn("relative py-16 md:py-24")}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-surface-1/20 via-transparent to-surface-1/20 opacity-50" />

      <div className={cn("container mx-auto px-4 sm:px-6")}>
        <div className={cn("text-center max-w-2xl mx-auto mb-16 space-y-4")}>
          <Typography
            level="h2"
            className="text-accent text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            Création
          </Typography>
          <Divider variant="gradient" align="center" className="mx-auto" />
        </div>

        <div className={cn(
          "grid grid-cols-1 md:grid-cols-3 gap-6",
          "max-w-5xl mx-auto"
        )}>
          {competences.map((item) => (
            <div
              key={item.label}
              className={cn(
                "group flex flex-col items-center text-center gap-5",
                "p-8",
                "bg-surface-1 border border-border/20",
                "transition-all duration-300",
                "hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
              )}
            >
              <Typography
                level="h3"
                className="text-accent font-extrabold text-4xl tracking-widest"
              >
                {item.label}
              </Typography>
              <Typography
                level="body1"
                className="text-text-secondary leading-relaxed flex-grow"
              >
                {item.description}
              </Typography>
              <Button
                variant="outline"
                size="sm"
                href={item.href}
                external={item.external}
                className="mt-auto group-hover:border-accent group-hover:text-accent transition-colors duration-300"
              >
                En savoir plus
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
