import { Typography } from "@/components/ui/typography/typography";
import { cn } from "@/lib/utils";

const roles = [
  { text: "Programmeur",                    color: "bg-accent" },
  { text: "Développeur web",               color: "bg-cta"   },
  { text: "Graphiste & Designer Visuel",   color: "bg-accent" },
  { text: "Full-Stack Product maker",      color: "bg-cta"   },
];

export function HeroAccueilSection() {
  return (
    <section className={cn(
      "relative min-h-[calc(100vh-4rem)]",
      "flex flex-col items-center justify-center",
      "py-16 md:py-24 overflow-hidden",
      "text-center"
    )}>

      {/* Grille de points */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(var(--accent) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Halo radial accent */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-accent/8 via-transparent to-transparent" />

      {/* Watermark */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span
          className="font-extrabold text-accent tracking-tighter leading-none"
          style={{ fontSize: "clamp(6rem, 28vw, 22rem)", opacity: 0.03 }}
        >
          VIRY
        </span>
      </div>

      {/* Coins géométriques — accent bleu (haut) */}
      <div className="absolute top-8 left-8 w-10 h-10 border-l-2 border-t-2 border-accent/60" />
      <div className="absolute top-8 right-8 w-10 h-10 border-r-2 border-t-2 border-accent/40" />
      {/* Coins géométriques — cta rouge (bas) */}
      <div className="absolute bottom-16 left-8 w-10 h-10 border-l-2 border-b-2 border-cta/40" />
      <div className="absolute bottom-16 right-8 w-10 h-10 border-r-2 border-b-2 border-cta/60" />

      {/* Décoration latérale gauche */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-accent/50" />
        <span
          className="text-[0.6rem] text-accent/60 tracking-[0.4em] uppercase font-medium"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Portfolio {new Date().getFullYear()}
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-accent/50 to-transparent" />
      </div>

      {/* Décoration latérale droite */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-cta/40" />
        <span
          className="text-[0.6rem] text-cta/50 tracking-[0.4em] uppercase font-medium"
          style={{ writingMode: "vertical-rl" }}
        >
          Design &amp; Dev
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-cta/40 to-transparent" />
      </div>

      {/* Contenu principal */}
      <div className="relative space-y-8 px-4 sm:px-6 max-w-4xl mx-auto">

        {/* Label au-dessus du nom */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-px bg-accent/60" />
          <span className="text-xs text-accent/80 tracking-[0.3em] uppercase font-medium">
            viry-brandon.fr
          </span>
          <div className="w-8 h-px bg-accent/60" />
        </div>

        {/* Nom */}
        <Typography
          level="h1"
          className={cn(
            "text-accent tracking-tight leading-none",
            "text-5xl md:text-7xl lg:text-8xl font-extrabold"
          )}
        >
          VIRY Brandon
          <span className="sr-only"> — Développeur Graphiste La Réunion</span>
        </Typography>

        {/* Rôles */}
        <div className="flex flex-col items-center gap-2.5">
          {roles.map((role) => (
            <div key={role.text} className="flex items-center gap-3">
              <div className={cn("w-1.5 h-1.5 shrink-0", role.color)} />
              <Typography
                level="h4"
                className="text-text-secondary font-normal tracking-wide"
              >
                {role.text}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[0.6rem] text-text-muted tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-text-muted/50 to-transparent" />
      </div>

    </section>
  );
}
